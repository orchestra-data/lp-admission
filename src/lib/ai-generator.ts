import type { Data } from '@measured/puck';
import { templates } from './templates';

// Types for AI generation
export interface GenerationPrompt {
  institutionName: string;
  courseType: string;
  targetAudience: string;
  mainBenefits: string[];
  differentials: string[];
  testimonials?: {
    name: string;
    role: string;
    quote: string;
  }[];
  stats?: {
    value: string;
    label: string;
  }[];
  urgencyMessage?: string;
  deadline?: string;
  primaryColor?: string;
  secondaryColor?: string;
  tone: 'formal' | 'casual' | 'urgente' | 'inspirador';
}

export interface GenerationResult {
  data: Data;
  suggestions: string[];
}

// Map tone to template style
const toneToTemplate: Record<string, keyof typeof templates> = {
  'formal': 'minimalista',
  'casual': 'video',
  'urgente': 'alta-conversao',
  'inspirador': 'alta-conversao',
};

// Icon mapping for benefits/features
const benefitIcons: Record<string, string> = {
  'pratico': 'Target',
  'metodologia': 'BookOpen',
  'networking': 'Users',
  'carreira': 'Rocket',
  'certificado': 'Award',
  'diploma': 'GraduationCap',
  'mercado': 'TrendingUp',
  'flexibilidade': 'Clock',
  'suporte': 'HeadphonesIcon',
  'qualidade': 'Star',
  'tecnologia': 'Laptop',
  'inovacao': 'Lightbulb',
  'default': 'CheckCircle',
};

function findIconForBenefit(benefit: string): string {
  const lowerBenefit = benefit.toLowerCase();
  for (const [keyword, icon] of Object.entries(benefitIcons)) {
    if (lowerBenefit.includes(keyword)) {
      return icon;
    }
  }
  return benefitIcons.default;
}

function generateHeroTitle(prompt: GenerationPrompt): string {
  const toneMessages: Record<string, string[]> = {
    'formal': [
      `Excelência em ${prompt.courseType}`,
      `${prompt.institutionName}: Formação de Alto Nível`,
      `Prepare-se para liderar em ${prompt.courseType}`,
    ],
    'casual': [
      `Transforme sua carreira com ${prompt.courseType}`,
      `O ${prompt.courseType} que vai mudar sua vida`,
      `Descubra o poder do ${prompt.courseType}`,
    ],
    'urgente': [
      `Última chance: ${prompt.courseType} com vagas limitadas`,
      `Não perca: Inscrições abertas para ${prompt.courseType}`,
      `Garanta sua vaga em ${prompt.courseType} - Poucas restantes!`,
    ],
    'inspirador': [
      `Realize seu sonho com ${prompt.courseType}`,
      `Sua jornada de sucesso começa aqui`,
      `Transforme potencial em conquistas reais`,
    ],
  };

  const messages = toneMessages[prompt.tone] || toneMessages['casual'];
  return messages[Math.floor(Math.random() * messages.length)];
}

function generateSubtitle(prompt: GenerationPrompt): string {
  const benefits = prompt.mainBenefits.slice(0, 2).join(' e ');
  const audience = prompt.targetAudience;

  return `Programa desenvolvido para ${audience} que buscam ${benefits}. ${prompt.institutionName} oferece a formação que o mercado valoriza.`;
}

function generateCTAText(tone: string): string {
  const ctaTexts: Record<string, string> = {
    'formal': 'Solicitar Informações',
    'casual': 'Quero saber mais',
    'urgente': 'GARANTIR MINHA VAGA',
    'inspirador': 'Começar minha transformação',
  };
  return ctaTexts[tone] || 'Inscreva-se agora';
}

export function generateLandingPage(prompt: GenerationPrompt): GenerationResult {
  const suggestions: string[] = [];

  // Start with base template
  const baseTemplateKey = toneToTemplate[prompt.tone] || 'alta-conversao';
  const baseTemplate = JSON.parse(JSON.stringify(templates[baseTemplateKey].data)) as Data;

  // Apply colors
  if (baseTemplate.root?.props) {
    baseTemplate.root.props.primaryColor = prompt.primaryColor || '#2563EB';
    baseTemplate.root.props.secondaryColor = prompt.secondaryColor || '#EA580C';
  }

  // Generate content array
  const content: Data['content'] = [];

  // 1. Hero Section
  content.push({
    type: 'Hero',
    props: {
      title: generateHeroTitle(prompt),
      subtitle: generateSubtitle(prompt),
      backgroundImage: '',
      backgroundOverlay: true,
      ctaText: generateCTAText(prompt.tone),
      ctaLink: '#form',
      alignment: 'center',
      height: prompt.tone === 'urgente' ? 'large' : 'medium',
    },
  });

  // 2. Stats Section (if provided)
  if (prompt.stats && prompt.stats.length > 0) {
    content.push({
      type: 'Stats',
      props: {
        title: '',
        stats: prompt.stats.map(stat => ({
          value: stat.value,
          label: stat.label,
          prefix: stat.value.startsWith('+') ? '+' : '',
          suffix: stat.value.includes('%') ? '%' : '',
        })),
        columns: String(Math.min(prompt.stats.length, 4)),
        backgroundColor: 'primary',
      },
    });
  } else {
    suggestions.push('Adicione estatísticas para aumentar credibilidade (ex: número de alunos, taxa de empregabilidade)');
  }

  // 3. Features/Benefits Section
  if (prompt.mainBenefits.length > 0 || prompt.differentials.length > 0) {
    const allFeatures = [...prompt.mainBenefits, ...prompt.differentials].slice(0, 6);
    content.push({
      type: 'Features',
      props: {
        title: `Por que escolher ${prompt.institutionName}?`,
        subtitle: 'Diferenciais que fazem a diferença na sua carreira',
        features: allFeatures.map((feature, index) => ({
          icon: findIconForBenefit(feature),
          title: feature.split(':')[0] || feature,
          description: feature.split(':')[1] || `Desenvolva habilidades em ${feature.toLowerCase()}`,
        })),
        columns: String(Math.min(allFeatures.length, 3)),
      },
    });
  }

  // 4. Testimonials Section (if provided)
  if (prompt.testimonials && prompt.testimonials.length > 0) {
    content.push({
      type: 'Testimonials',
      props: {
        title: 'Histórias de transformação',
        testimonials: prompt.testimonials.map(t => ({
          name: t.name,
          role: t.role,
          quote: t.quote,
          avatar: '',
        })),
      },
    });
  } else {
    suggestions.push('Adicione depoimentos de alunos para aumentar a confiança dos visitantes');
  }

  // 5. FAQ Section
  content.push({
    type: 'FAQ',
    props: {
      title: 'Perguntas Frequentes',
      items: [
        {
          question: 'Qual o valor do investimento?',
          answer: 'Entre em contato para conhecer nossas opções de pagamento e bolsas disponíveis.',
        },
        {
          question: 'Qual a duração do curso?',
          answer: `O ${prompt.courseType} tem cronograma flexível. Solicite mais informações.`,
        },
        {
          question: 'O diploma é reconhecido?',
          answer: `Sim, ${prompt.institutionName} oferece certificação reconhecida pelo mercado.`,
        },
        {
          question: 'Posso conciliar com trabalho?',
          answer: 'Sim! Temos flexibilidade para profissionais que trabalham.',
        },
      ],
    },
  });

  // 6. Admission Form
  content.push({
    type: 'AdmissionForm',
    props: {
      processId: '',
      title: 'Garanta sua vaga',
      description: 'Preencha o formulário e receba mais informações sobre o programa',
      backgroundColor: 'muted',
      padding: 'lg',
    },
  });
  suggestions.push('Configure o processId do formulário com o ID do processo de admissão do Orchestra');

  // 7. Countdown (for urgent tone)
  if (prompt.tone === 'urgente' && prompt.deadline) {
    content.push({
      type: 'Countdown',
      props: {
        title: prompt.urgencyMessage || 'Inscrições encerram em breve!',
        description: 'Não perca esta oportunidade',
        targetDate: prompt.deadline,
        ctaText: 'GARANTIR MINHA VAGA AGORA',
        ctaLink: '#form',
        backgroundColor: 'gradient',
      },
    });
  } else if (prompt.tone === 'urgente') {
    suggestions.push('Defina uma data limite (deadline) para ativar o contador de urgência');
  }

  baseTemplate.content = content;

  return {
    data: baseTemplate,
    suggestions,
  };
}

// Helper function to create a simple LP from minimal input
export function quickGenerate(
  institutionName: string,
  courseType: string,
  tone: 'formal' | 'casual' | 'urgente' | 'inspirador' = 'casual'
): Data {
  const result = generateLandingPage({
    institutionName,
    courseType,
    targetAudience: 'profissionais',
    mainBenefits: ['Metodologia prática', 'Networking de qualidade', 'Certificação reconhecida'],
    differentials: ['Corpo docente especializado', 'Aulas flexíveis'],
    tone,
  });

  return result.data;
}

export default generateLandingPage;
