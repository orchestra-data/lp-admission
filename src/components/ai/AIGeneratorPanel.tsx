import * as React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Sparkles, Plus, X, AlertCircle } from 'lucide-react';
import { generateLandingPage, type GenerationPrompt } from '@/lib/ai-generator';
import type { Data } from '@measured/puck';

interface AIGeneratorPanelProps {
  onGenerate: (data: Data) => void;
  onClose?: () => void;
}

export function AIGeneratorPanel({ onGenerate, onClose }: AIGeneratorPanelProps) {
  const [isGenerating, setIsGenerating] = React.useState(false);
  const [suggestions, setSuggestions] = React.useState<string[]>([]);

  const [formData, setFormData] = React.useState<GenerationPrompt>({
    institutionName: '',
    courseType: '',
    targetAudience: '',
    mainBenefits: [''],
    differentials: [''],
    testimonials: [],
    stats: [],
    tone: 'casual',
    primaryColor: '#2563EB',
    secondaryColor: '#EA580C',
  });

  const [newTestimonial, setNewTestimonial] = React.useState({
    name: '',
    role: '',
    quote: '',
  });

  const [newStat, setNewStat] = React.useState({
    value: '',
    label: '',
  });

  const updateBenefit = (index: number, value: string) => {
    const newBenefits = [...formData.mainBenefits];
    newBenefits[index] = value;
    setFormData({ ...formData, mainBenefits: newBenefits });
  };

  const addBenefit = () => {
    setFormData({
      ...formData,
      mainBenefits: [...formData.mainBenefits, ''],
    });
  };

  const removeBenefit = (index: number) => {
    const newBenefits = formData.mainBenefits.filter((_, i) => i !== index);
    setFormData({ ...formData, mainBenefits: newBenefits });
  };

  const updateDifferential = (index: number, value: string) => {
    const newDiffs = [...formData.differentials];
    newDiffs[index] = value;
    setFormData({ ...formData, differentials: newDiffs });
  };

  const addDifferential = () => {
    setFormData({
      ...formData,
      differentials: [...formData.differentials, ''],
    });
  };

  const removeDifferential = (index: number) => {
    const newDiffs = formData.differentials.filter((_, i) => i !== index);
    setFormData({ ...formData, differentials: newDiffs });
  };

  const addTestimonial = () => {
    if (newTestimonial.name && newTestimonial.quote) {
      setFormData({
        ...formData,
        testimonials: [...(formData.testimonials || []), { ...newTestimonial }],
      });
      setNewTestimonial({ name: '', role: '', quote: '' });
    }
  };

  const removeTestimonial = (index: number) => {
    const newTestimonials = (formData.testimonials || []).filter((_, i) => i !== index);
    setFormData({ ...formData, testimonials: newTestimonials });
  };

  const addStat = () => {
    if (newStat.value && newStat.label) {
      setFormData({
        ...formData,
        stats: [...(formData.stats || []), { ...newStat }],
      });
      setNewStat({ value: '', label: '' });
    }
  };

  const removeStat = (index: number) => {
    const newStats = (formData.stats || []).filter((_, i) => i !== index);
    setFormData({ ...formData, stats: newStats });
  };

  const handleGenerate = async () => {
    setIsGenerating(true);
    setSuggestions([]);

    try {
      // Simulate async operation for UX
      await new Promise(resolve => setTimeout(resolve, 800));

      const result = generateLandingPage({
        ...formData,
        mainBenefits: formData.mainBenefits.filter(b => b.trim() !== ''),
        differentials: formData.differentials.filter(d => d.trim() !== ''),
      });

      setSuggestions(result.suggestions);
      onGenerate(result.data);
    } catch (error) {
      console.error('Error generating LP:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const isValid = formData.institutionName && formData.courseType && formData.targetAudience;

  return (
    <div className="h-full overflow-y-auto p-4 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-primary" />
          <h2 className="text-lg font-semibold">Gerador de LP com IA</h2>
        </div>
        {onClose && (
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>

      <p className="text-sm text-muted-foreground">
        Preencha as informações abaixo e a IA irá gerar uma landing page otimizada para conversão.
      </p>

      {/* Basic Info */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Informações Básicas</CardTitle>
          <CardDescription>Dados essenciais sobre o programa</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="institutionName">Nome da Instituição *</Label>
            <Input
              id="institutionName"
              placeholder="Ex: Universidade ABC"
              value={formData.institutionName}
              onChange={e => setFormData({ ...formData, institutionName: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="courseType">Tipo de Curso *</Label>
            <Input
              id="courseType"
              placeholder="Ex: MBA em Gestão de Projetos"
              value={formData.courseType}
              onChange={e => setFormData({ ...formData, courseType: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="targetAudience">Público-Alvo *</Label>
            <Input
              id="targetAudience"
              placeholder="Ex: profissionais de TI em busca de promoção"
              value={formData.targetAudience}
              onChange={e => setFormData({ ...formData, targetAudience: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="tone">Tom da Comunicação</Label>
            <Select
              value={formData.tone}
              onValueChange={(value: GenerationPrompt['tone']) =>
                setFormData({ ...formData, tone: value })
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="formal">Formal - Institucional e profissional</SelectItem>
                <SelectItem value="casual">Casual - Amigável e acessível</SelectItem>
                <SelectItem value="urgente">Urgente - Escassez e ação imediata</SelectItem>
                <SelectItem value="inspirador">Inspirador - Transformação e sonhos</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Benefits */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Benefícios Principais</CardTitle>
          <CardDescription>O que o aluno ganha com o curso</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {formData.mainBenefits.map((benefit, index) => (
            <div key={index} className="flex gap-2">
              <Input
                placeholder="Ex: Metodologia prática com projetos reais"
                value={benefit}
                onChange={e => updateBenefit(index, e.target.value)}
              />
              {formData.mainBenefits.length > 1 && (
                <Button variant="ghost" size="icon" onClick={() => removeBenefit(index)}>
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>
          ))}
          <Button variant="outline" size="sm" onClick={addBenefit}>
            <Plus className="h-4 w-4 mr-1" /> Adicionar benefício
          </Button>
        </CardContent>
      </Card>

      {/* Differentials */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Diferenciais</CardTitle>
          <CardDescription>O que diferencia sua instituição</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {formData.differentials.map((diff, index) => (
            <div key={index} className="flex gap-2">
              <Input
                placeholder="Ex: Corpo docente com experiência de mercado"
                value={diff}
                onChange={e => updateDifferential(index, e.target.value)}
              />
              {formData.differentials.length > 1 && (
                <Button variant="ghost" size="icon" onClick={() => removeDifferential(index)}>
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>
          ))}
          <Button variant="outline" size="sm" onClick={addDifferential}>
            <Plus className="h-4 w-4 mr-1" /> Adicionar diferencial
          </Button>
        </CardContent>
      </Card>

      {/* Stats */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Estatísticas</CardTitle>
          <CardDescription>Números que impressionam (opcional)</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {(formData.stats || []).map((stat, index) => (
            <div key={index} className="flex items-center gap-2">
              <Badge variant="secondary">
                {stat.value} - {stat.label}
              </Badge>
              <Button variant="ghost" size="icon" onClick={() => removeStat(index)}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}
          <div className="flex gap-2">
            <Input
              placeholder="Valor (ex: 97%)"
              value={newStat.value}
              onChange={e => setNewStat({ ...newStat, value: e.target.value })}
              className="w-32"
            />
            <Input
              placeholder="Label (ex: Empregabilidade)"
              value={newStat.label}
              onChange={e => setNewStat({ ...newStat, label: e.target.value })}
            />
            <Button variant="outline" size="icon" onClick={addStat}>
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Testimonials */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Depoimentos</CardTitle>
          <CardDescription>Histórias de sucesso (opcional)</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {(formData.testimonials || []).map((t, index) => (
            <div key={index} className="p-3 bg-muted rounded-lg relative">
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-1 right-1 h-6 w-6"
                onClick={() => removeTestimonial(index)}
              >
                <X className="h-3 w-3" />
              </Button>
              <p className="text-sm font-medium">{t.name}</p>
              <p className="text-xs text-muted-foreground">{t.role}</p>
              <p className="text-sm mt-1 italic">"{t.quote}"</p>
            </div>
          ))}
          <div className="space-y-2 p-3 border rounded-lg">
            <Input
              placeholder="Nome"
              value={newTestimonial.name}
              onChange={e => setNewTestimonial({ ...newTestimonial, name: e.target.value })}
            />
            <Input
              placeholder="Cargo/Função"
              value={newTestimonial.role}
              onChange={e => setNewTestimonial({ ...newTestimonial, role: e.target.value })}
            />
            <Textarea
              placeholder="Depoimento"
              value={newTestimonial.quote}
              onChange={e => setNewTestimonial({ ...newTestimonial, quote: e.target.value })}
              rows={2}
            />
            <Button variant="outline" size="sm" onClick={addTestimonial}>
              <Plus className="h-4 w-4 mr-1" /> Adicionar depoimento
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Urgency (for urgent tone) */}
      {formData.tone === 'urgente' && (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Urgência</CardTitle>
            <CardDescription>Configurações de escassez</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="space-y-2">
              <Label htmlFor="deadline">Data Limite</Label>
              <Input
                id="deadline"
                type="date"
                value={formData.deadline || ''}
                onChange={e => setFormData({ ...formData, deadline: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="urgencyMessage">Mensagem de Urgência</Label>
              <Input
                id="urgencyMessage"
                placeholder="Ex: Últimas 10 vagas disponíveis!"
                value={formData.urgencyMessage || ''}
                onChange={e => setFormData({ ...formData, urgencyMessage: e.target.value })}
              />
            </div>
          </CardContent>
        </Card>
      )}

      {/* Colors */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Cores</CardTitle>
          <CardDescription>Personalização visual</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex gap-4">
            <div className="space-y-2 flex-1">
              <Label htmlFor="primaryColor">Cor Primária</Label>
              <div className="flex gap-2">
                <Input
                  id="primaryColor"
                  type="color"
                  value={formData.primaryColor}
                  onChange={e => setFormData({ ...formData, primaryColor: e.target.value })}
                  className="w-12 h-10 p-1"
                />
                <Input
                  value={formData.primaryColor}
                  onChange={e => setFormData({ ...formData, primaryColor: e.target.value })}
                />
              </div>
            </div>
            <div className="space-y-2 flex-1">
              <Label htmlFor="secondaryColor">Cor Secundária</Label>
              <div className="flex gap-2">
                <Input
                  id="secondaryColor"
                  type="color"
                  value={formData.secondaryColor}
                  onChange={e => setFormData({ ...formData, secondaryColor: e.target.value })}
                  className="w-12 h-10 p-1"
                />
                <Input
                  value={formData.secondaryColor}
                  onChange={e => setFormData({ ...formData, secondaryColor: e.target.value })}
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Suggestions */}
      {suggestions.length > 0 && (
        <Card className="border-amber-200 bg-amber-50">
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <AlertCircle className="h-4 w-4 text-amber-600" />
              Sugestões de Melhoria
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {suggestions.map((suggestion, index) => (
                <li key={index} className="text-sm text-amber-800">
                  • {suggestion}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}

      {/* Generate Button */}
      <Button
        className="w-full"
        size="lg"
        onClick={handleGenerate}
        disabled={!isValid || isGenerating}
      >
        {isGenerating ? (
          <>
            <Sparkles className="h-4 w-4 mr-2 animate-spin" />
            Gerando...
          </>
        ) : (
          <>
            <Sparkles className="h-4 w-4 mr-2" />
            Gerar Landing Page
          </>
        )}
      </Button>
    </div>
  );
}

export default AIGeneratorPanel;
