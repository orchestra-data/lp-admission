import * as React from 'react';
import { cn } from '@/lib/utils';
import { FileText, Loader2, CheckCircle, AlertCircle, User, MapPin, GraduationCap, Upload, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export interface AdmissionFormProps {
  processId: string;
  title?: string;
  description?: string;
  institutionName?: string;
  backgroundColor: 'white' | 'muted' | 'primary';
  padding: 'sm' | 'md' | 'lg';
  mockMode?: boolean;
  accentColor?: string;
  buttonColor?: string;
}

// Tipos do Orchestra (FormConfig)
interface FormComponent {
  id: string;
  type: 'dados-pessoais' | 'campos' | 'documentos' | 'pagamento' | 'avaliacao' | 'contrato';
  label: string;
  config: {
    title?: string;
    description?: string;
    required?: boolean;
    fieldType?: 'text' | 'email' | 'number' | 'date' | 'select' | 'textarea';
    placeholder?: string;
    options?: string[];
    customFields?: CustomField[];
  };
}

interface CustomField {
  id: string;
  label: string;
  type: string;
  required: boolean;
  placeholder?: string;
  options?: string[];
}

interface FormUnit {
  id: string;
  name: string;
  isFixed: boolean;
  order: number;
  components: FormComponent[];
}

interface FormConfig {
  units: FormUnit[];
}

interface OrchestraProcess {
  id: string;
  name: string;
  description?: string;
  formConfig: FormConfig;
  isActive: boolean;
}

const bgClasses = {
  white: 'bg-background',
  muted: 'bg-muted/30',
  primary: 'bg-primary/5',
};

const paddingClasses = {
  sm: 'py-8 px-4',
  md: 'py-12 px-4',
  lg: 'py-16 px-4',
};

// Mock form data structure
interface MockFormData {
  fullName: string;
  email: string;
  phone: string;
  cpf: string;
  birthDate: string;
  cep: string;
  street: string;
  number: string;
  city: string;
  state: string;
  previousInstitution: string;
  degree: string;
  graduationYear: string;
}

const mockSteps = ['Dados Pessoais', 'Endereco', 'Formacao', 'Documentos', 'Confirmacao'];

export function AdmissionForm({
  processId,
  title,
  description,
  institutionName,
  backgroundColor,
  padding,
  mockMode = false,
  accentColor,
  buttonColor,
}: AdmissionFormProps) {
  const accent = accentColor || '#3B9EEB';
  const btnColor = buttonColor || '#3B9EEB';

  const [process, setProcess] = React.useState<OrchestraProcess | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [formData, setFormData] = React.useState<Record<string, string>>({});
  const [currentStep, setCurrentStep] = React.useState(0);

  // Mock form state
  const [mockFormData, setMockFormData] = React.useState<MockFormData>({
    fullName: '',
    email: '',
    phone: '',
    cpf: '',
    birthDate: '',
    cep: '',
    street: '',
    number: '',
    city: '',
    state: '',
    previousInstitution: '',
    degree: '',
    graduationYear: '',
  });

  const updateMockField = (field: keyof MockFormData, value: string) => {
    setMockFormData(prev => ({ ...prev, [field]: value }));
  };

  // Carregar formulário do Orchestra
  React.useEffect(() => {
    if (!processId) return;

    const loadProcess = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch(`/api/public/processes/${processId}`);
        if (!response.ok) {
          throw new Error('Formulário não encontrado');
        }
        const data = await response.json();
        setProcess(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erro ao carregar formulário');
      } finally {
        setIsLoading(false);
      }
    };

    loadProcess();
  }, [processId]);

  const handleFieldChange = (fieldId: string, value: string) => {
    setFormData((prev) => ({ ...prev, [fieldId]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!process) return;

    setIsSubmitting(true);
    try {
      // Captura UTM params
      const urlParams = new URLSearchParams(window.location.search);

      const response = await fetch('/api/public/applications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          processId,
          formData,
          fullName: formData.fullName || formData.name,
          email: formData.email,
          phoneE164: formData.phone,
          cpf: formData.cpf,
          birthDate: formData.birthDate,
          // UTM tracking
          utmSource: urlParams.get('utm_source'),
          utmMedium: urlParams.get('utm_medium'),
          utmCampaign: urlParams.get('utm_campaign'),
        }),
      });

      if (response.ok) {
        setIsSuccess(true);
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Erro ao enviar inscrição');
      }
    } catch (err) {
      setError('Erro ao enviar inscrição. Tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // ==========================================
  // MOCK MODE - Formulario de demonstracao
  // ==========================================
  if (mockMode || !processId) {
    const StepIcon = ({ step }: { step: number }) => {
      const icons = [User, MapPin, GraduationCap, Upload, Check];
      const Icon = icons[step] || FileText;
      return <Icon className="h-4 w-4" />;
    };

    // Progress Indicator
    const ProgressIndicator = () => (
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          {mockSteps.map((step, index) => (
            <div key={index} className="flex flex-col items-center flex-1">
              <div
                className={cn(
                  'w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-all',
                  index < currentStep
                    ? 'text-white'
                    : index === currentStep
                    ? 'text-white'
                    : 'bg-gray-200 text-gray-500'
                )}
                style={{
                  backgroundColor: index <= currentStep ? accent : undefined,
                }}
              >
                {index < currentStep ? (
                  <Check className="h-5 w-5" />
                ) : (
                  <StepIcon step={index} />
                )}
              </div>
              <span
                className={cn(
                  'text-xs mt-2 text-center hidden sm:block',
                  index <= currentStep ? 'font-medium' : 'text-gray-400'
                )}
                style={{ color: index <= currentStep ? accent : undefined }}
              >
                {step}
              </span>
            </div>
          ))}
        </div>
        <div className="relative h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="absolute h-full transition-all duration-300"
            style={{
              width: `${(currentStep / (mockSteps.length - 1)) * 100}%`,
              backgroundColor: accent,
            }}
          />
        </div>
      </div>
    );

    // Step 1: Dados Pessoais
    const PersonalDataStep = () => (
      <div className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="md:col-span-2">
            <Label htmlFor="fullName">Nome Completo *</Label>
            <Input
              id="fullName"
              value={mockFormData.fullName}
              onChange={(e) => updateMockField('fullName', e.target.value)}
              placeholder="Seu nome completo"
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="email">E-mail *</Label>
            <Input
              id="email"
              type="email"
              value={mockFormData.email}
              onChange={(e) => updateMockField('email', e.target.value)}
              placeholder="seu@email.com"
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="phone">Telefone *</Label>
            <Input
              id="phone"
              value={mockFormData.phone}
              onChange={(e) => updateMockField('phone', e.target.value)}
              placeholder="(11) 99999-9999"
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="cpf">CPF *</Label>
            <Input
              id="cpf"
              value={mockFormData.cpf}
              onChange={(e) => updateMockField('cpf', e.target.value)}
              placeholder="000.000.000-00"
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="birthDate">Data de Nascimento *</Label>
            <Input
              id="birthDate"
              type="date"
              value={mockFormData.birthDate}
              onChange={(e) => updateMockField('birthDate', e.target.value)}
              className="mt-1"
            />
          </div>
        </div>
      </div>
    );

    // Step 2: Endereco
    const AddressStep = () => (
      <div className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <Label htmlFor="cep">CEP *</Label>
            <Input
              id="cep"
              value={mockFormData.cep}
              onChange={(e) => updateMockField('cep', e.target.value)}
              placeholder="00000-000"
              className="mt-1"
            />
          </div>
          <div className="md:col-span-2">
            <Label htmlFor="street">Endereco *</Label>
            <Input
              id="street"
              value={mockFormData.street}
              onChange={(e) => updateMockField('street', e.target.value)}
              placeholder="Rua, Avenida..."
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="number">Numero *</Label>
            <Input
              id="number"
              value={mockFormData.number}
              onChange={(e) => updateMockField('number', e.target.value)}
              placeholder="123"
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="city">Cidade *</Label>
            <Input
              id="city"
              value={mockFormData.city}
              onChange={(e) => updateMockField('city', e.target.value)}
              placeholder="Sao Paulo"
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="state">Estado *</Label>
            <Input
              id="state"
              value={mockFormData.state}
              onChange={(e) => updateMockField('state', e.target.value)}
              placeholder="SP"
              className="mt-1"
            />
          </div>
        </div>
      </div>
    );

    // Step 3: Formacao
    const EducationStep = () => (
      <div className="space-y-4">
        <div className="grid gap-4">
          <div>
            <Label htmlFor="previousInstitution">Instituicao Anterior</Label>
            <Input
              id="previousInstitution"
              value={mockFormData.previousInstitution}
              onChange={(e) => updateMockField('previousInstitution', e.target.value)}
              placeholder="Nome da instituicao"
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="degree">Grau de Escolaridade *</Label>
            <select
              id="degree"
              value={mockFormData.degree}
              onChange={(e) => updateMockField('degree', e.target.value)}
              className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
            >
              <option value="">Selecione...</option>
              <option value="fundamental">Ensino Fundamental</option>
              <option value="medio">Ensino Medio</option>
              <option value="tecnico">Ensino Tecnico</option>
              <option value="superior">Ensino Superior</option>
              <option value="pos">Pos-Graduacao</option>
            </select>
          </div>
          <div>
            <Label htmlFor="graduationYear">Ano de Conclusao</Label>
            <Input
              id="graduationYear"
              value={mockFormData.graduationYear}
              onChange={(e) => updateMockField('graduationYear', e.target.value)}
              placeholder="2020"
              className="mt-1"
            />
          </div>
        </div>
      </div>
    );

    // Step 4: Documentos
    const DocumentsStep = () => (
      <div className="space-y-4">
        <div
          className="border-2 border-dashed rounded-lg p-8 text-center cursor-pointer hover:border-opacity-70 transition-colors"
          style={{ borderColor: accent }}
        >
          <Upload className="h-12 w-12 mx-auto mb-4 opacity-50" style={{ color: accent }} />
          <p className="text-lg font-medium mb-2">Arraste seus documentos aqui</p>
          <p className="text-sm text-muted-foreground mb-4">
            ou clique para selecionar arquivos
          </p>
          <Button
            variant="outline"
            type="button"
            style={{ borderColor: accent, color: accent }}
          >
            Selecionar Arquivos
          </Button>
        </div>
        <div className="text-sm text-muted-foreground">
          <p className="font-medium mb-2">Documentos necessarios:</p>
          <ul className="list-disc list-inside space-y-1">
            <li>RG ou CNH (frente e verso)</li>
            <li>CPF</li>
            <li>Comprovante de residencia</li>
            <li>Historico escolar</li>
            <li>Foto 3x4</li>
          </ul>
        </div>
      </div>
    );

    // Step 5: Confirmacao
    const ConfirmationStep = () => (
      <div className="space-y-6">
        <div className="bg-gray-50 rounded-lg p-6 space-y-4">
          <h4 className="font-semibold text-lg">Revise suas informacoes</h4>
          <div className="grid gap-4 md:grid-cols-2 text-sm">
            <div>
              <span className="text-muted-foreground">Nome:</span>
              <p className="font-medium">{mockFormData.fullName || '-'}</p>
            </div>
            <div>
              <span className="text-muted-foreground">E-mail:</span>
              <p className="font-medium">{mockFormData.email || '-'}</p>
            </div>
            <div>
              <span className="text-muted-foreground">Telefone:</span>
              <p className="font-medium">{mockFormData.phone || '-'}</p>
            </div>
            <div>
              <span className="text-muted-foreground">CPF:</span>
              <p className="font-medium">{mockFormData.cpf || '-'}</p>
            </div>
            <div className="md:col-span-2">
              <span className="text-muted-foreground">Endereco:</span>
              <p className="font-medium">
                {mockFormData.street ? `${mockFormData.street}, ${mockFormData.number} - ${mockFormData.city}/${mockFormData.state}` : '-'}
              </p>
            </div>
            <div>
              <span className="text-muted-foreground">Escolaridade:</span>
              <p className="font-medium">{mockFormData.degree || '-'}</p>
            </div>
          </div>
        </div>
        <div className="flex items-start gap-2">
          <input type="checkbox" id="terms" className="mt-1" />
          <label htmlFor="terms" className="text-sm text-muted-foreground">
            Li e concordo com os <a href="#" className="underline" style={{ color: accent }}>Termos de Uso</a> e{' '}
            <a href="#" className="underline" style={{ color: accent }}>Politica de Privacidade</a>.
            Autorizo o uso dos meus dados conforme a LGPD.
          </label>
        </div>
      </div>
    );

    // Success State
    const SuccessState = () => (
      <div className="text-center py-12">
        <div
          className="w-20 h-20 rounded-full mx-auto mb-6 flex items-center justify-center"
          style={{ backgroundColor: `${accent}20` }}
        >
          <Check className="h-10 w-10" style={{ color: accent }} />
        </div>
        <h3 className="text-2xl font-bold mb-2">Inscricao Enviada!</h3>
        <p className="text-muted-foreground mb-6 max-w-md mx-auto">
          Sua inscricao foi recebida com sucesso.
          Voce recebera um e-mail de confirmacao em breve.
        </p>
        <div className="bg-gray-50 rounded-lg p-4 max-w-sm mx-auto">
          <p className="text-sm text-muted-foreground">Numero do protocolo:</p>
          <p className="text-lg font-mono font-bold" style={{ color: accent }}>
            ADM-{Date.now().toString(36).toUpperCase()}
          </p>
        </div>
      </div>
    );

    const renderMockStep = () => {
      if (isSuccess) return <SuccessState />;
      switch (currentStep) {
        case 0: return <PersonalDataStep />;
        case 1: return <AddressStep />;
        case 2: return <EducationStep />;
        case 3: return <DocumentsStep />;
        case 4: return <ConfirmationStep />;
        default: return <PersonalDataStep />;
      }
    };

    const handleMockSubmit = () => {
      setIsSubmitting(true);
      setTimeout(() => {
        setIsSubmitting(false);
        setIsSuccess(true);
      }, 1500);
    };

    const nextStep = () => currentStep < mockSteps.length - 1 && setCurrentStep(prev => prev + 1);
    const prevStep = () => currentStep > 0 && setCurrentStep(prev => prev - 1);

    return (
      <section
        id="form"
        className={cn(bgClasses[backgroundColor], paddingClasses[padding])}
      >
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            {institutionName && (
              <p className="text-sm font-medium mb-2" style={{ color: accent }}>
                {institutionName}
              </p>
            )}
            {title && <h2 className="text-3xl font-bold mb-2">{title}</h2>}
            {description && <p className="text-muted-foreground">{description}</p>}
          </div>

          {/* Form Card */}
          <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 border">
            {!isSuccess && <ProgressIndicator />}

            {/* Step Title */}
            {!isSuccess && (
              <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
                <StepIcon step={currentStep} />
                {mockSteps[currentStep]}
              </h3>
            )}

            {/* Step Content */}
            {renderMockStep()}

            {/* Navigation */}
            {!isSuccess && (
              <div className="flex justify-between mt-8 pt-6 border-t">
                <Button
                  variant="outline"
                  onClick={prevStep}
                  disabled={currentStep === 0}
                  type="button"
                >
                  Voltar
                </Button>

                {currentStep === mockSteps.length - 1 ? (
                  <Button
                    onClick={handleMockSubmit}
                    disabled={isSubmitting}
                    style={{ backgroundColor: btnColor }}
                    type="button"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Enviando...
                      </>
                    ) : (
                      'Enviar Inscricao'
                    )}
                  </Button>
                ) : (
                  <Button
                    onClick={nextStep}
                    style={{ backgroundColor: btnColor }}
                    type="button"
                  >
                    Proximo
                  </Button>
                )}
              </div>
            )}
          </div>

          {/* Footer Info */}
          <p className="text-center text-xs text-muted-foreground mt-6">
            Seus dados estao protegidos conforme a LGPD (Lei Geral de Protecao de Dados).
          </p>
        </div>
      </section>
    );
  }

  // ==========================================
  // ORCHESTRA MODE - Formulario real
  // ==========================================

  // Estado de sucesso
  if (isSuccess) {
    return (
      <section
        id="form"
        className={cn(bgClasses[backgroundColor], paddingClasses[padding])}
      >
        <div className="max-w-xl mx-auto text-center">
          <div className="bg-background rounded-lg p-8 shadow-sm border">
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-4">Inscrição Enviada!</h2>
            <p className="text-muted-foreground">
              Sua inscrição foi recebida com sucesso. Você receberá um e-mail com as próximas instruções.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      id="form"
      className={cn(bgClasses[backgroundColor], paddingClasses[padding])}
    >
      <div className="max-w-xl mx-auto">
        <div className="bg-background rounded-lg p-8 shadow-sm border">
          {(title || description) && (
            <div className="text-center mb-8">
              {title && <h2 className="text-2xl font-bold mb-2">{title}</h2>}
              {description && <p className="text-muted-foreground">{description}</p>}
            </div>
          )}

          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
          ) : error ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <AlertCircle className="h-12 w-12 text-destructive mb-4" />
              <p className="text-destructive">{error}</p>
            </div>
          ) : process ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Renderiza campos do Orchestra */}
              {process.formConfig.units.map((unit, unitIndex) => (
                <div key={unit.id} className={cn(unitIndex !== currentStep && 'hidden')}>
                  <h3 className="font-semibold mb-4">{unit.name}</h3>

                  {unit.components.map((component) => (
                    <div key={component.id} className="space-y-4">
                      {/* Dados Pessoais (campos fixos) */}
                      {component.type === 'dados-pessoais' && (
                        <>
                          <div>
                            <label className="block text-sm font-medium mb-2">
                              Nome Completo <span className="text-destructive">*</span>
                            </label>
                            <Input
                              value={formData.fullName || ''}
                              onChange={(e) => handleFieldChange('fullName', e.target.value)}
                              placeholder="Digite seu nome completo"
                              required
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-2">
                              E-mail <span className="text-destructive">*</span>
                            </label>
                            <Input
                              type="email"
                              value={formData.email || ''}
                              onChange={(e) => handleFieldChange('email', e.target.value)}
                              placeholder="seu@email.com"
                              required
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-2">
                              Telefone <span className="text-destructive">*</span>
                            </label>
                            <Input
                              type="tel"
                              value={formData.phone || ''}
                              onChange={(e) => handleFieldChange('phone', e.target.value)}
                              placeholder="(11) 99999-9999"
                              required
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-2">CPF</label>
                            <Input
                              value={formData.cpf || ''}
                              onChange={(e) => handleFieldChange('cpf', e.target.value)}
                              placeholder="000.000.000-00"
                            />
                          </div>
                        </>
                      )}

                      {/* Campos Customizados */}
                      {component.type === 'campos' && component.config.customFields?.map((field) => (
                        <div key={field.id}>
                          <label className="block text-sm font-medium mb-2">
                            {field.label}
                            {field.required && <span className="text-destructive ml-1">*</span>}
                          </label>
                          {field.type === 'select' ? (
                            <select
                              value={formData[field.id] || ''}
                              onChange={(e) => handleFieldChange(field.id, e.target.value)}
                              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                              required={field.required}
                            >
                              <option value="">Selecione...</option>
                              {field.options?.map((opt) => (
                                <option key={opt} value={opt}>{opt}</option>
                              ))}
                            </select>
                          ) : field.type === 'textarea' ? (
                            <textarea
                              value={formData[field.id] || ''}
                              onChange={(e) => handleFieldChange(field.id, e.target.value)}
                              className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm min-h-[100px]"
                              placeholder={field.placeholder}
                              required={field.required}
                            />
                          ) : (
                            <Input
                              type={field.type === 'email' ? 'email' : field.type === 'number' ? 'number' : 'text'}
                              value={formData[field.id] || ''}
                              onChange={(e) => handleFieldChange(field.id, e.target.value)}
                              placeholder={field.placeholder}
                              required={field.required}
                            />
                          )}
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              ))}

              {/* Navegação entre steps */}
              {process.formConfig.units.length > 1 && (
                <div className="flex items-center justify-between pt-4 border-t">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setCurrentStep((s) => Math.max(0, s - 1))}
                    disabled={currentStep === 0}
                  >
                    Anterior
                  </Button>
                  <span className="text-sm text-muted-foreground">
                    Etapa {currentStep + 1} de {process.formConfig.units.length}
                  </span>
                  {currentStep < process.formConfig.units.length - 1 ? (
                    <Button
                      type="button"
                      onClick={() => setCurrentStep((s) => s + 1)}
                    >
                      Próximo
                    </Button>
                  ) : (
                    <Button type="submit" disabled={isSubmitting}>
                      {isSubmitting ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Enviando...
                        </>
                      ) : (
                        'Enviar Inscrição'
                      )}
                    </Button>
                  )}
                </div>
              )}

              {/* Botão único para formulários de uma etapa */}
              {process.formConfig.units.length === 1 && (
                <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Enviando...
                    </>
                  ) : (
                    'Enviar Inscrição'
                  )}
                </Button>
              )}
            </form>
          ) : (
            <div className="space-y-4 opacity-50">
              <div className="h-10 bg-muted rounded animate-pulse" />
              <div className="h-10 bg-muted rounded animate-pulse" />
              <div className="h-10 bg-muted rounded animate-pulse" />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default AdmissionForm;
