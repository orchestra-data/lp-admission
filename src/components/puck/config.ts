import type { Config } from '@measured/puck';
import { Hero, HeroProps } from './blocks/Hero';
import { VideoHero, VideoHeroProps } from './blocks/VideoHero';
import { Features, FeaturesProps } from './blocks/Features';
import { Testimonials, TestimonialsProps } from './blocks/Testimonials';
import { FAQ, FAQProps } from './blocks/FAQ';
import { Pricing, PricingProps } from './blocks/Pricing';
import { CTA, CTAProps } from './blocks/CTA';
import { AdmissionForm, AdmissionFormProps } from './blocks/AdmissionForm';
import { Text, TextProps } from './blocks/Text';
import { Image, ImageProps } from './blocks/Image';
import { Spacer, SpacerProps } from './blocks/Spacer';
import { Stats, StatsProps } from './blocks/Stats';
import { Countdown, CountdownProps } from './blocks/Countdown';
import { LogoCloud, LogoCloudProps } from './blocks/LogoCloud';

// Root Props for global theming
interface RootProps {
  primaryColor: string;
  secondaryColor: string;
  backgroundColor: string;
  textColor: string;
  fontFamily: string;
}

type Components = {
  Hero: HeroProps;
  VideoHero: VideoHeroProps;
  Features: FeaturesProps;
  Testimonials: TestimonialsProps;
  FAQ: FAQProps;
  Pricing: PricingProps;
  CTA: CTAProps;
  AdmissionForm: AdmissionFormProps;
  Text: TextProps;
  Image: ImageProps;
  Spacer: SpacerProps;
  Stats: StatsProps;
  Countdown: CountdownProps;
  LogoCloud: LogoCloudProps;
};

export const puckConfig: Config<Components, RootProps> = {
  // ========================================
  // ROOT - Global Theme Configuration
  // ========================================
  root: {
    fields: {
      primaryColor: {
        type: 'text',
        label: 'Cor Primaria (hex)',
      },
      secondaryColor: {
        type: 'text',
        label: 'Cor Secundaria (hex)',
      },
      backgroundColor: {
        type: 'text',
        label: 'Cor de Fundo (hex)',
      },
      textColor: {
        type: 'text',
        label: 'Cor do Texto (hex)',
      },
      fontFamily: {
        type: 'select',
        label: 'Fonte',
        options: [
          { value: 'Inter, sans-serif', label: 'Inter' },
          { value: 'Roboto, sans-serif', label: 'Roboto' },
          { value: 'Open Sans, sans-serif', label: 'Open Sans' },
          { value: 'Montserrat, sans-serif', label: 'Montserrat' },
          { value: 'Poppins, sans-serif', label: 'Poppins' },
        ],
      },
    },
    defaultProps: {
      primaryColor: '#2563EB',
      secondaryColor: '#EA580C',
      backgroundColor: '#FFFFFF',
      textColor: '#1E293B',
      fontFamily: 'Inter, sans-serif',
    },
    render: ({ children, primaryColor, secondaryColor, backgroundColor, textColor, fontFamily }) => {
      return (
        <div
          style={{
            ['--lp-primary' as string]: primaryColor,
            ['--lp-secondary' as string]: secondaryColor,
            ['--lp-background' as string]: backgroundColor,
            ['--lp-text' as string]: textColor,
            fontFamily,
            backgroundColor,
            color: textColor,
            minHeight: '100vh',
          }}
        >
          <style>{`
            :root {
              --primary: ${primaryColor};
              --secondary: ${secondaryColor};
            }
            .bg-primary { background-color: ${primaryColor} !important; }
            .text-primary { color: ${primaryColor} !important; }
            .border-primary { border-color: ${primaryColor} !important; }
            .bg-secondary { background-color: ${secondaryColor} !important; }
          `}</style>
          {children}
        </div>
      );
    },
  },

  // ========================================
  // CATEGORIES
  // ========================================
  categories: {
    hero: {
      title: 'Hero',
      components: ['Hero', 'VideoHero'],
    },
    social: {
      title: 'Social Proof',
      components: ['Testimonials', 'Stats', 'LogoCloud'],
    },
    content: {
      title: 'Conteudo',
      components: ['Features', 'FAQ', 'Pricing', 'Text', 'Image'],
    },
    conversion: {
      title: 'Conversao',
      components: ['CTA', 'Countdown', 'AdmissionForm'],
    },
    layout: {
      title: 'Layout',
      components: ['Spacer'],
    },
  },

  // ========================================
  // COMPONENTS
  // ========================================
  components: {
    // -------------------- HERO --------------------
    Hero: {
      label: 'Hero Section',
      fields: {
        title: { type: 'text', label: 'Titulo' },
        subtitle: { type: 'textarea', label: 'Subtitulo' },
        backgroundImage: { type: 'text', label: 'URL da Imagem de Fundo' },
        backgroundOverlay: {
          type: 'radio',
          label: 'Overlay escuro',
          options: [
            { value: true, label: 'Sim' },
            { value: false, label: 'Nao' },
          ],
        },
        ctaText: { type: 'text', label: 'Texto do Botao' },
        ctaLink: { type: 'text', label: 'Link do Botao' },
        alignment: {
          type: 'select',
          label: 'Alinhamento',
          options: [
            { value: 'left', label: 'Esquerda' },
            { value: 'center', label: 'Centro' },
            { value: 'right', label: 'Direita' },
          ],
        },
        height: {
          type: 'select',
          label: 'Altura',
          options: [
            { value: 'small', label: 'Pequena' },
            { value: 'medium', label: 'Media' },
            { value: 'large', label: 'Grande' },
            { value: 'full', label: 'Tela Cheia' },
          ],
        },
      },
      defaultProps: {
        title: 'Transforme sua carreira em 6 meses',
        subtitle: 'Programa reconhecido pelo MEC com metodologia pratica e 97% de empregabilidade',
        backgroundImage: '',
        backgroundOverlay: true,
        ctaText: 'Quero MINHA vaga',
        ctaLink: '#form',
        alignment: 'center',
        height: 'large',
      },
      render: Hero,
    },

    VideoHero: {
      label: 'Hero com Video',
      fields: {
        title: { type: 'text', label: 'Titulo' },
        subtitle: { type: 'textarea', label: 'Subtitulo' },
        videoUrl: { type: 'text', label: 'URL do Video (YouTube embed)' },
        thumbnailUrl: { type: 'text', label: 'URL da Thumbnail' },
        ctaText: { type: 'text', label: 'Texto do CTA' },
        ctaLink: { type: 'text', label: 'Link do CTA' },
        secondaryCtaText: { type: 'text', label: 'Texto CTA Secundario' },
        secondaryCtaLink: { type: 'text', label: 'Link CTA Secundario' },
        alignment: {
          type: 'select',
          label: 'Layout',
          options: [
            { value: 'left', label: 'Texto + Video' },
            { value: 'center', label: 'Centralizado' },
          ],
        },
      },
      defaultProps: {
        title: 'Descubra como transformar sua carreira',
        subtitle: 'Assista ao video e conheca nossa metodologia exclusiva',
        videoUrl: '',
        thumbnailUrl: 'https://placehold.co/800x450',
        ctaText: 'Comecar agora',
        ctaLink: '#form',
        secondaryCtaText: '',
        secondaryCtaLink: '',
        alignment: 'left',
      },
      render: VideoHero,
    },

    // -------------------- SOCIAL PROOF --------------------
    Stats: {
      label: 'Numeros/Estatisticas',
      fields: {
        title: { type: 'text', label: 'Titulo (opcional)' },
        stats: {
          type: 'array',
          label: 'Estatisticas',
          arrayFields: {
            value: { type: 'text', label: 'Valor' },
            label: { type: 'text', label: 'Label' },
            prefix: { type: 'text', label: 'Prefixo (ex: +, R$)' },
            suffix: { type: 'text', label: 'Sufixo (ex: %, +)' },
          },
        },
        columns: {
          type: 'select',
          label: 'Colunas',
          options: [
            { value: '2', label: '2 Colunas' },
            { value: '3', label: '3 Colunas' },
            { value: '4', label: '4 Colunas' },
          ],
        },
        backgroundColor: {
          type: 'select',
          label: 'Cor de Fundo',
          options: [
            { value: 'white', label: 'Branco' },
            { value: 'muted', label: 'Cinza' },
            { value: 'primary', label: 'Primaria' },
            { value: 'dark', label: 'Escuro' },
          ],
        },
      },
      defaultProps: {
        title: '',
        stats: [
          { value: '12.000', label: 'Alunos formados', prefix: '+', suffix: '' },
          { value: '97', label: 'Empregabilidade', prefix: '', suffix: '%' },
          { value: '1', label: 'Ranking Brasil', prefix: '#', suffix: '' },
        ],
        columns: '3',
        backgroundColor: 'primary',
      },
      render: Stats,
    },

    Testimonials: {
      label: 'Depoimentos',
      fields: {
        title: { type: 'text', label: 'Titulo' },
        testimonials: {
          type: 'array',
          label: 'Depoimentos',
          arrayFields: {
            name: { type: 'text', label: 'Nome' },
            role: { type: 'text', label: 'Cargo/Curso' },
            quote: { type: 'textarea', label: 'Depoimento' },
            avatar: { type: 'text', label: 'URL do Avatar' },
          },
        },
      },
      defaultProps: {
        title: 'O que nossos alunos dizem',
        testimonials: [
          {
            name: 'Maria Silva',
            role: 'MBA 2023 - Gerente na Empresa X',
            quote: 'Estava estagnada ha 3 anos. O curso me deu as ferramentas e rede de contatos que precisava. Em 6 meses, fui promovida com 40% de aumento.',
            avatar: '',
          },
          {
            name: 'Joao Santos',
            role: 'Pos-Graduacao 2023',
            quote: 'A metodologia pratica fez toda diferenca. Consegui aplicar o conhecimento imediatamente no trabalho.',
            avatar: '',
          },
        ],
      },
      render: Testimonials,
    },

    LogoCloud: {
      label: 'Logos de Parceiros',
      fields: {
        title: { type: 'text', label: 'Titulo (opcional)' },
        subtitle: { type: 'text', label: 'Subtitulo (opcional)' },
        logos: {
          type: 'array',
          label: 'Logos',
          arrayFields: {
            name: { type: 'text', label: 'Nome da Empresa' },
            imageUrl: { type: 'text', label: 'URL do Logo' },
          },
        },
        grayscale: {
          type: 'radio',
          label: 'Escala de Cinza',
          options: [
            { value: true, label: 'Sim' },
            { value: false, label: 'Nao' },
          ],
        },
      },
      defaultProps: {
        title: 'Empresas que contratam nossos alunos',
        subtitle: '',
        logos: [
          { name: 'Empresa 1', imageUrl: 'https://placehold.co/150x50?text=Logo1' },
          { name: 'Empresa 2', imageUrl: 'https://placehold.co/150x50?text=Logo2' },
          { name: 'Empresa 3', imageUrl: 'https://placehold.co/150x50?text=Logo3' },
        ],
        grayscale: true,
      },
      render: LogoCloud,
    },

    // -------------------- CONTENT --------------------
    Features: {
      label: 'Features/Beneficios',
      fields: {
        title: { type: 'text', label: 'Titulo da Secao' },
        subtitle: { type: 'textarea', label: 'Subtitulo' },
        features: {
          type: 'array',
          label: 'Features',
          arrayFields: {
            icon: { type: 'text', label: 'Icone (GraduationCap, BookOpen, Award, Star, Users, Zap, Shield, Heart, Target, Lightbulb, Trophy, Rocket)' },
            title: { type: 'text', label: 'Titulo' },
            description: { type: 'textarea', label: 'Descricao' },
          },
        },
        columns: {
          type: 'select',
          label: 'Colunas',
          options: [
            { value: '2', label: '2 Colunas' },
            { value: '3', label: '3 Colunas' },
            { value: '4', label: '4 Colunas' },
          ],
        },
      },
      defaultProps: {
        title: 'Por que nos escolher?',
        subtitle: 'Descubra os diferenciais que fazem da nossa instituicao a melhor escolha',
        features: [
          { icon: 'GraduationCap', title: 'Corpo Docente', description: 'Professores com experiencia de mercado' },
          { icon: 'Target', title: 'Metodologia Pratica', description: 'Aprenda fazendo com projetos reais' },
          { icon: 'Award', title: 'Reconhecimento MEC', description: 'Diploma reconhecido nacionalmente' },
        ],
        columns: '3',
      },
      render: Features,
    },

    FAQ: {
      label: 'Perguntas Frequentes',
      fields: {
        title: { type: 'text', label: 'Titulo' },
        items: {
          type: 'array',
          label: 'Perguntas',
          arrayFields: {
            question: { type: 'text', label: 'Pergunta' },
            answer: { type: 'textarea', label: 'Resposta' },
          },
        },
      },
      defaultProps: {
        title: 'Perguntas Frequentes',
        items: [
          { question: 'Qual o valor do investimento?', answer: 'Entre em contato para conhecer nossas opcoes de pagamento e bolsas disponiveis.' },
          { question: 'Qual a duracao do curso?', answer: 'O curso tem duracao de 12 meses, com aulas semanais.' },
          { question: 'O diploma e reconhecido?', answer: 'Sim, somos reconhecidos pelo MEC e nosso diploma tem validade nacional.' },
        ],
      },
      render: FAQ,
    },

    Pricing: {
      label: 'Precos/Planos',
      fields: {
        title: { type: 'text', label: 'Titulo' },
        subtitle: { type: 'textarea', label: 'Subtitulo' },
        plans: {
          type: 'array',
          label: 'Planos',
          arrayFields: {
            name: { type: 'text', label: 'Nome' },
            price: { type: 'text', label: 'Preco' },
            period: { type: 'text', label: 'Periodo' },
            features: { type: 'textarea', label: 'Features (uma por linha)' },
            highlighted: {
              type: 'radio',
              label: 'Destacado',
              options: [
                { value: true, label: 'Sim' },
                { value: false, label: 'Nao' },
              ],
            },
            ctaText: { type: 'text', label: 'Texto do Botao' },
          },
        },
      },
      defaultProps: {
        title: 'Investimento',
        subtitle: 'Escolha a melhor opcao para voce',
        plans: [
          {
            name: 'A Vista',
            price: 'R$ 9.990',
            period: '',
            features: '15% de desconto\nMaterial incluso\nCertificado',
            highlighted: false,
            ctaText: 'Escolher',
          },
          {
            name: 'Parcelado',
            price: 'R$ 599',
            period: '/mes',
            features: '18x sem juros\nMaterial incluso\nCertificado',
            highlighted: true,
            ctaText: 'Escolher',
          },
        ],
      },
      render: Pricing,
    },

    Text: {
      label: 'Texto',
      fields: {
        content: { type: 'textarea', label: 'Conteudo' },
        align: {
          type: 'select',
          label: 'Alinhamento',
          options: [
            { value: 'left', label: 'Esquerda' },
            { value: 'center', label: 'Centro' },
            { value: 'right', label: 'Direita' },
          ],
        },
        size: {
          type: 'select',
          label: 'Tamanho',
          options: [
            { value: 'sm', label: 'Pequeno' },
            { value: 'base', label: 'Normal' },
            { value: 'lg', label: 'Grande' },
            { value: 'xl', label: 'Extra Grande' },
          ],
        },
      },
      defaultProps: {
        content: 'Digite seu texto aqui...',
        align: 'left',
        size: 'base',
      },
      render: Text,
    },

    Image: {
      label: 'Imagem',
      fields: {
        src: { type: 'text', label: 'URL da Imagem' },
        alt: { type: 'text', label: 'Texto Alternativo' },
        width: {
          type: 'select',
          label: 'Largura',
          options: [
            { value: 'auto', label: 'Auto' },
            { value: 'full', label: '100%' },
            { value: 'half', label: '50%' },
          ],
        },
        rounded: {
          type: 'radio',
          label: 'Bordas Arredondadas',
          options: [
            { value: true, label: 'Sim' },
            { value: false, label: 'Nao' },
          ],
        },
      },
      defaultProps: {
        src: 'https://placehold.co/800x400',
        alt: 'Imagem',
        width: 'full',
        rounded: true,
      },
      render: Image,
    },

    // -------------------- CONVERSION --------------------
    CTA: {
      label: 'Call to Action',
      fields: {
        title: { type: 'text', label: 'Titulo' },
        description: { type: 'textarea', label: 'Descricao' },
        buttonText: { type: 'text', label: 'Texto do Botao' },
        buttonLink: { type: 'text', label: 'Link' },
        variant: {
          type: 'select',
          label: 'Estilo',
          options: [
            { value: 'primary', label: 'Primario' },
            { value: 'secondary', label: 'Secundario' },
            { value: 'gradient', label: 'Gradiente' },
          ],
        },
      },
      defaultProps: {
        title: 'Pronto para transformar sua carreira?',
        description: 'Vagas limitadas para a proxima turma. Garanta a sua agora!',
        buttonText: 'Quero MINHA vaga',
        buttonLink: '#form',
        variant: 'gradient',
      },
      render: CTA,
    },

    Countdown: {
      label: 'Countdown/Urgencia',
      fields: {
        title: { type: 'text', label: 'Titulo' },
        description: { type: 'textarea', label: 'Descricao' },
        targetDate: { type: 'text', label: 'Data Alvo (YYYY-MM-DD)' },
        ctaText: { type: 'text', label: 'Texto do Botao' },
        ctaLink: { type: 'text', label: 'Link' },
        backgroundColor: {
          type: 'select',
          label: 'Cor de Fundo',
          options: [
            { value: 'white', label: 'Branco' },
            { value: 'muted', label: 'Cinza' },
            { value: 'primary', label: 'Primaria' },
            { value: 'gradient', label: 'Gradiente' },
            { value: 'dark', label: 'Escuro' },
          ],
        },
      },
      defaultProps: {
        title: 'Inscricoes encerram em breve!',
        description: 'Ultimas vagas com desconto de 15%',
        targetDate: '2026-02-28',
        ctaText: 'Garantir MINHA vaga agora',
        ctaLink: '#form',
        backgroundColor: 'gradient',
      },
      render: Countdown,
    },

    AdmissionForm: {
      label: 'Formulario de Admission',
      fields: {
        processId: { type: 'text', label: 'ID do Processo (Orchestra)' },
        title: { type: 'text', label: 'Titulo (opcional)' },
        description: { type: 'textarea', label: 'Descricao (opcional)' },
        backgroundColor: {
          type: 'select',
          label: 'Cor de Fundo',
          options: [
            { value: 'white', label: 'Branco' },
            { value: 'muted', label: 'Cinza Claro' },
            { value: 'primary', label: 'Cor Primaria' },
          ],
        },
        padding: {
          type: 'select',
          label: 'Espacamento',
          options: [
            { value: 'sm', label: 'Pequeno' },
            { value: 'md', label: 'Medio' },
            { value: 'lg', label: 'Grande' },
          ],
        },
      },
      defaultProps: {
        processId: '',
        title: 'Garanta sua vaga na proxima turma',
        description: 'Preencha o formulario e receba mais informacoes',
        backgroundColor: 'muted',
        padding: 'lg',
      },
      render: AdmissionForm,
    },

    // -------------------- LAYOUT --------------------
    Spacer: {
      label: 'Espacador',
      fields: {
        size: {
          type: 'select',
          label: 'Tamanho',
          options: [
            { value: 'sm', label: 'Pequeno (16px)' },
            { value: 'md', label: 'Medio (32px)' },
            { value: 'lg', label: 'Grande (64px)' },
            { value: 'xl', label: 'Extra Grande (96px)' },
          ],
        },
      },
      defaultProps: {
        size: 'md',
      },
      render: Spacer,
    },
  },
};

export default puckConfig;
