import type { Config } from '@measured/puck';
import { Hero, HeroProps } from './blocks/Hero';
import { Features, FeaturesProps } from './blocks/Features';
import { Testimonials, TestimonialsProps } from './blocks/Testimonials';
import { FAQ, FAQProps } from './blocks/FAQ';
import { Pricing, PricingProps } from './blocks/Pricing';
import { CTA, CTAProps } from './blocks/CTA';
import { AdmissionForm, AdmissionFormProps } from './blocks/AdmissionForm';
import { Text, TextProps } from './blocks/Text';
import { Image, ImageProps } from './blocks/Image';
import { Spacer, SpacerProps } from './blocks/Spacer';

type Components = {
  Hero: HeroProps;
  Features: FeaturesProps;
  Testimonials: TestimonialsProps;
  FAQ: FAQProps;
  Pricing: PricingProps;
  CTA: CTAProps;
  AdmissionForm: AdmissionFormProps;
  Text: TextProps;
  Image: ImageProps;
  Spacer: SpacerProps;
};

export const puckConfig: Config<Components> = {
  categories: {
    layout: {
      title: 'Layout',
      components: ['Hero', 'CTA', 'Spacer'],
    },
    content: {
      title: 'Conteudo',
      components: ['Features', 'Testimonials', 'FAQ', 'Pricing', 'Text', 'Image'],
    },
    forms: {
      title: 'Formularios',
      components: ['AdmissionForm'],
    },
  },
  components: {
    Hero: {
      label: 'Hero Section',
      fields: {
        title: {
          type: 'text',
          label: 'Titulo',
        },
        subtitle: {
          type: 'textarea',
          label: 'Subtitulo',
        },
        backgroundImage: {
          type: 'text',
          label: 'URL da Imagem de Fundo',
        },
        backgroundOverlay: {
          type: 'radio',
          label: 'Overlay escuro',
          options: [
            { value: true, label: 'Sim' },
            { value: false, label: 'Nao' },
          ],
        },
        ctaText: {
          type: 'text',
          label: 'Texto do Botao',
        },
        ctaLink: {
          type: 'text',
          label: 'Link do Botao',
        },
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
        title: 'Bem-vindo a Nossa Instituicao',
        subtitle: 'Transforme seu futuro com educacao de qualidade',
        backgroundImage: '',
        backgroundOverlay: true,
        ctaText: 'Inscreva-se Agora',
        ctaLink: '#form',
        alignment: 'center',
        height: 'large',
      },
      render: Hero,
    },

    Features: {
      label: 'Features/Beneficios',
      fields: {
        title: {
          type: 'text',
          label: 'Titulo da Secao',
        },
        subtitle: {
          type: 'textarea',
          label: 'Subtitulo',
        },
        features: {
          type: 'array',
          label: 'Features',
          arrayFields: {
            icon: {
              type: 'text',
              label: 'Icone (nome do Lucide)',
            },
            title: {
              type: 'text',
              label: 'Titulo',
            },
            description: {
              type: 'textarea',
              label: 'Descricao',
            },
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
          { icon: 'GraduationCap', title: 'Corpo Docente', description: 'Professores qualificados e experientes' },
          { icon: 'BookOpen', title: 'Metodologia', description: 'Ensino pratico e dinamico' },
          { icon: 'Award', title: 'Certificacao', description: 'Diploma reconhecido pelo MEC' },
        ],
        columns: '3',
      },
      render: Features,
    },

    Testimonials: {
      label: 'Depoimentos',
      fields: {
        title: {
          type: 'text',
          label: 'Titulo',
        },
        testimonials: {
          type: 'array',
          label: 'Depoimentos',
          arrayFields: {
            name: {
              type: 'text',
              label: 'Nome',
            },
            role: {
              type: 'text',
              label: 'Cargo/Curso',
            },
            quote: {
              type: 'textarea',
              label: 'Depoimento',
            },
            avatar: {
              type: 'text',
              label: 'URL do Avatar',
            },
          },
        },
      },
      defaultProps: {
        title: 'O que nossos alunos dizem',
        testimonials: [
          {
            name: 'Maria Silva',
            role: 'Formada em Administracao',
            quote: 'A melhor decisao da minha carreira foi estudar aqui.',
            avatar: '',
          },
        ],
      },
      render: Testimonials,
    },

    FAQ: {
      label: 'Perguntas Frequentes',
      fields: {
        title: {
          type: 'text',
          label: 'Titulo',
        },
        items: {
          type: 'array',
          label: 'Perguntas',
          arrayFields: {
            question: {
              type: 'text',
              label: 'Pergunta',
            },
            answer: {
              type: 'textarea',
              label: 'Resposta',
            },
          },
        },
      },
      defaultProps: {
        title: 'Perguntas Frequentes',
        items: [
          {
            question: 'Quais formas de pagamento sao aceitas?',
            answer: 'Aceitamos cartao de credito, boleto bancario e PIX.',
          },
        ],
      },
      render: FAQ,
    },

    Pricing: {
      label: 'Precos/Planos',
      fields: {
        title: {
          type: 'text',
          label: 'Titulo',
        },
        subtitle: {
          type: 'textarea',
          label: 'Subtitulo',
        },
        plans: {
          type: 'array',
          label: 'Planos',
          arrayFields: {
            name: {
              type: 'text',
              label: 'Nome do Plano',
            },
            price: {
              type: 'text',
              label: 'Preco',
            },
            period: {
              type: 'text',
              label: 'Periodo',
            },
            features: {
              type: 'textarea',
              label: 'Features (uma por linha)',
            },
            highlighted: {
              type: 'radio',
              label: 'Destacado',
              options: [
                { value: true, label: 'Sim' },
                { value: false, label: 'Nao' },
              ],
            },
            ctaText: {
              type: 'text',
              label: 'Texto do Botao',
            },
          },
        },
      },
      defaultProps: {
        title: 'Nossos Planos',
        subtitle: 'Escolha o plano ideal para voce',
        plans: [
          {
            name: 'Basico',
            price: 'R$ 199',
            period: '/mes',
            features: 'Acesso ao curso\nMaterial didatico\nCertificado',
            highlighted: false,
            ctaText: 'Escolher Plano',
          },
        ],
      },
      render: Pricing,
    },

    CTA: {
      label: 'Call to Action',
      fields: {
        title: {
          type: 'text',
          label: 'Titulo',
        },
        description: {
          type: 'textarea',
          label: 'Descricao',
        },
        buttonText: {
          type: 'text',
          label: 'Texto do Botao',
        },
        buttonLink: {
          type: 'text',
          label: 'Link',
        },
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
        title: 'Pronto para comecar?',
        description: 'Inscreva-se agora e de o primeiro passo para o seu futuro.',
        buttonText: 'Quero me inscrever',
        buttonLink: '#form',
        variant: 'primary',
      },
      render: CTA,
    },

    AdmissionForm: {
      label: 'Formulario de Admission',
      fields: {
        processId: {
          type: 'text',
          label: 'ID do Processo (Orchestra)',
        },
        title: {
          type: 'text',
          label: 'Titulo (opcional)',
        },
        description: {
          type: 'textarea',
          label: 'Descricao (opcional)',
        },
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
        title: 'Inscreva-se Agora',
        description: 'Preencha o formulario abaixo e entraremos em contato.',
        backgroundColor: 'muted',
        padding: 'lg',
      },
      render: AdmissionForm,
    },

    Text: {
      label: 'Texto',
      fields: {
        content: {
          type: 'textarea',
          label: 'Conteudo',
        },
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
        src: {
          type: 'text',
          label: 'URL da Imagem',
        },
        alt: {
          type: 'text',
          label: 'Texto Alternativo',
        },
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
