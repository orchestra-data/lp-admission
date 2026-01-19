import * as React from 'react';
import { cn } from '@/lib/utils';
import { FileText, Loader2, CheckCircle, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export interface AdmissionFormProps {
  processId: string;
  title?: string;
  description?: string;
  backgroundColor: 'white' | 'muted' | 'primary';
  padding: 'sm' | 'md' | 'lg';
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

export function AdmissionForm({
  processId,
  title,
  description,
  backgroundColor,
  padding,
}: AdmissionFormProps) {
  const [process, setProcess] = React.useState<OrchestraProcess | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [formData, setFormData] = React.useState<Record<string, string>>({});
  const [currentStep, setCurrentStep] = React.useState(0);

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

  // Placeholder quando não há processId selecionado (modo editor)
  if (!processId) {
    return (
      <section
        id="form"
        className={cn(bgClasses[backgroundColor], paddingClasses[padding])}
      >
        <div className="max-w-xl mx-auto">
          <div className="bg-background rounded-lg p-8 shadow-sm border border-dashed border-muted-foreground/30">
            <div className="flex flex-col items-center justify-center text-center text-muted-foreground">
              <FileText className="h-12 w-12 mb-4 opacity-50" />
              <p className="font-medium">Nenhum formulário selecionado</p>
              <p className="text-sm">Insira o ID do Processo (processId) nas configurações</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

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
