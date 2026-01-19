import type { Data } from '@measured/puck';

// Template de Alta Conversão para Admission
export const highConversionTemplate: Data = {
  root: {
    props: {
      primaryColor: '#2563EB',
      secondaryColor: '#EA580C',
      backgroundColor: '#FFFFFF',
      textColor: '#1E293B',
      fontFamily: 'Inter, sans-serif',
    },
  },
  content: [
    {
      type: 'Hero',
      props: {
        title: 'Transforme sua carreira em 6 meses',
        subtitle: 'Programa reconhecido pelo MEC com metodologia pratica e 97% de empregabilidade. Vagas limitadas para a proxima turma.',
        backgroundImage: '',
        backgroundOverlay: true,
        ctaText: 'Quero MINHA vaga',
        ctaLink: '#form',
        alignment: 'center',
        height: 'large',
      },
    },
    {
      type: 'Stats',
      props: {
        title: '',
        stats: [
          { value: '12.000', label: 'Alunos formados', prefix: '+', suffix: '' },
          { value: '97', label: 'Empregabilidade', prefix: '', suffix: '%' },
          { value: '1', label: 'Ranking Brasil', prefix: '#', suffix: '' },
          { value: '4.9', label: 'Avaliacao', prefix: '', suffix: '/5' },
        ],
        columns: '4',
        backgroundColor: 'primary',
      },
    },
    {
      type: 'Features',
      props: {
        title: 'Por que escolher nossa instituicao?',
        subtitle: 'Diferenciais que fazem a diferenca na sua carreira',
        features: [
          { icon: 'GraduationCap', title: 'Corpo Docente', description: 'Professores com experiencia de mercado e titulacao' },
          { icon: 'Target', title: 'Metodologia Pratica', description: 'Aprenda fazendo com projetos reais de empresas' },
          { icon: 'Award', title: 'Reconhecimento MEC', description: 'Diploma reconhecido e valorizado no mercado' },
        ],
        columns: '3',
      },
    },
    {
      type: 'Testimonials',
      props: {
        title: 'Historias de transformacao',
        testimonials: [
          {
            name: 'Maria Silva',
            role: 'MBA 2023 - Gerente na Empresa X',
            quote: 'Estava estagnada ha 3 anos como analista. O curso me deu as ferramentas e rede de contatos que precisava. Em 6 meses apos formar, fui promovida a gerente com 40% de aumento.',
            avatar: '',
          },
          {
            name: 'Joao Santos',
            role: 'Pos-Graduacao 2023 - Diretor de TI',
            quote: 'A metodologia pratica fez toda diferenca. Consegui aplicar o conhecimento imediatamente no trabalho e isso acelerou minha carreira.',
            avatar: '',
          },
          {
            name: 'Ana Costa',
            role: 'MBA 2022 - Empreendedora',
            quote: 'O networking foi tao valioso quanto o conteudo. Conheci meus socios no curso e hoje temos uma startup de sucesso.',
            avatar: '',
          },
        ],
      },
    },
    {
      type: 'LogoCloud',
      props: {
        title: 'Empresas que contratam nossos alunos',
        subtitle: '',
        logos: [
          { name: 'Google', imageUrl: 'https://placehold.co/150x50?text=Google' },
          { name: 'Microsoft', imageUrl: 'https://placehold.co/150x50?text=Microsoft' },
          { name: 'Amazon', imageUrl: 'https://placehold.co/150x50?text=Amazon' },
          { name: 'Meta', imageUrl: 'https://placehold.co/150x50?text=Meta' },
        ],
        grayscale: true,
      },
    },
    {
      type: 'FAQ',
      props: {
        title: 'Perguntas Frequentes',
        items: [
          { question: 'Qual o valor do investimento?', answer: 'Temos opcoes a partir de R$ 599/mes. Entre em contato para conhecer nossas opcoes de pagamento e bolsas disponiveis.' },
          { question: 'Qual a duracao do curso?', answer: 'O curso tem duracao de 12 meses, com aulas semanais online ao vivo.' },
          { question: 'O diploma e reconhecido pelo MEC?', answer: 'Sim, somos reconhecidos pelo MEC e nosso diploma tem validade nacional.' },
          { question: 'Posso conciliar com trabalho?', answer: 'Sim! As aulas sao noturnas e temos flexibilidade para quem trabalha.' },
        ],
      },
    },
    {
      type: 'AdmissionForm',
      props: {
        processId: '',
        title: 'Garanta sua vaga na proxima turma',
        description: 'Preencha o formulario e receba mais informacoes sobre o programa',
        backgroundColor: 'muted',
        padding: 'lg',
      },
    },
    {
      type: 'Countdown',
      props: {
        title: 'Inscricoes encerram em breve!',
        description: 'Ultimas vagas com 15% de desconto para pagamento a vista',
        targetDate: '2026-02-28',
        ctaText: 'Garantir MINHA vaga agora',
        ctaLink: '#form',
        backgroundColor: 'gradient',
      },
    },
  ],
};

// Template Minimalista
export const minimalTemplate: Data = {
  root: {
    props: {
      primaryColor: '#000000',
      secondaryColor: '#6B7280',
      backgroundColor: '#FFFFFF',
      textColor: '#111827',
      fontFamily: 'Inter, sans-serif',
    },
  },
  content: [
    {
      type: 'Hero',
      props: {
        title: 'Aprenda. Evolua. Conquiste.',
        subtitle: 'Educacao de qualidade para profissionais que buscam excelencia',
        backgroundImage: '',
        backgroundOverlay: false,
        ctaText: 'Conhecer o programa',
        ctaLink: '#form',
        alignment: 'center',
        height: 'medium',
      },
    },
    {
      type: 'Features',
      props: {
        title: 'O que voce vai encontrar',
        subtitle: '',
        features: [
          { icon: 'BookOpen', title: 'Conteudo Atualizado', description: 'Curriculo alinhado com as demandas do mercado' },
          { icon: 'Users', title: 'Networking', description: 'Conexao com profissionais de alto nivel' },
          { icon: 'Rocket', title: 'Carreira', description: 'Suporte para seu crescimento profissional' },
        ],
        columns: '3',
      },
    },
    {
      type: 'AdmissionForm',
      props: {
        processId: '',
        title: 'Interesse em saber mais?',
        description: '',
        backgroundColor: 'white',
        padding: 'lg',
      },
    },
  ],
};

// Template com Video
export const videoTemplate: Data = {
  root: {
    props: {
      primaryColor: '#7C3AED',
      secondaryColor: '#F59E0B',
      backgroundColor: '#FFFFFF',
      textColor: '#1F2937',
      fontFamily: 'Poppins, sans-serif',
    },
  },
  content: [
    {
      type: 'VideoHero',
      props: {
        title: 'Descubra como transformar sua carreira',
        subtitle: 'Assista ao video e conheca a metodologia que ja transformou mais de 10.000 carreiras',
        videoUrl: '',
        thumbnailUrl: 'https://placehold.co/800x450?text=Video',
        ctaText: 'Quero comecar agora',
        ctaLink: '#form',
        secondaryCtaText: 'Falar com consultor',
        secondaryCtaLink: '#form',
        alignment: 'left',
      },
    },
    {
      type: 'Stats',
      props: {
        title: '',
        stats: [
          { value: '10.000', label: 'Alunos', prefix: '+', suffix: '' },
          { value: '95', label: 'Satisfacao', prefix: '', suffix: '%' },
          { value: '50', label: 'Cursos', prefix: '+', suffix: '' },
        ],
        columns: '3',
        backgroundColor: 'muted',
      },
    },
    {
      type: 'Testimonials',
      props: {
        title: 'Depoimentos em video',
        testimonials: [
          {
            name: 'Carlos Mendes',
            role: 'Diretor de Marketing',
            quote: 'O curso mudou completamente minha visao de mercado. Recomendo para todos que querem evoluir na carreira.',
            avatar: '',
          },
        ],
      },
    },
    {
      type: 'AdmissionForm',
      props: {
        processId: '',
        title: 'Comece sua transformacao',
        description: 'Preencha seus dados e um consultor entrara em contato',
        backgroundColor: 'muted',
        padding: 'lg',
      },
    },
  ],
};

export const templates = {
  'alta-conversao': {
    name: 'Alta Conversao',
    description: 'Template otimizado para maximizar conversoes',
    data: highConversionTemplate,
  },
  'minimalista': {
    name: 'Minimalista',
    description: 'Design limpo e direto ao ponto',
    data: minimalTemplate,
  },
  'video': {
    name: 'Video Hero',
    description: 'Destaque para conteudo em video',
    data: videoTemplate,
  },
};

export default templates;
