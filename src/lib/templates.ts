import type { Data } from '@measured/puck';

// Função para gerar IDs únicos
const generateId = () => `puck-${Math.random().toString(36).substring(2, 11)}`;

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

// Template Processo Seletivo / Admissao
export const admissionTemplate: Data = {
  root: {
    props: {
      primaryColor: '#3B9EEB',
      secondaryColor: '#10B981',
      backgroundColor: '#F8FAFC',
      textColor: '#1E293B',
      fontFamily: 'Inter, sans-serif',
    },
  },
  content: [
    {
      type: 'Hero',
      props: {
        title: 'Processo Seletivo 2026',
        subtitle: 'Inscricoes abertas para o primeiro semestre. De o primeiro passo para transformar sua carreira com a melhor instituicao do pais.',
        backgroundImage: '',
        backgroundColor: '#3B9EEB',
        textColor: '#FFFFFF',
        buttonColor: '#10B981',
        backgroundOverlay: false,
        ctaText: 'Iniciar Inscricao',
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
          { value: '15.000', label: 'Alunos formados', prefix: '+', suffix: '' },
          { value: '98', label: 'Empregabilidade', prefix: '', suffix: '%' },
          { value: '45', label: 'Anos de historia', prefix: '', suffix: '' },
          { value: 'A', label: 'Nota MEC', prefix: '', suffix: '' },
        ],
        columns: '4',
        customBgColor: '#1E3A5F',
        customTextColor: '#FFFFFF',
      },
    },
    {
      type: 'Features',
      props: {
        title: 'Por que escolher nossa instituicao?',
        subtitle: 'Oferecemos uma formacao completa que prepara voce para os desafios do mercado',
        features: [
          { icon: 'GraduationCap', title: 'Excelencia Academica', description: 'Corpo docente altamente qualificado com experiencia de mercado' },
          { icon: 'Target', title: 'Foco no Mercado', description: 'Curriculo atualizado com as demandas das melhores empresas' },
          { icon: 'Users', title: 'Networking', description: 'Conexao com profissionais e empresas parceiras' },
          { icon: 'Award', title: 'Reconhecimento', description: 'Diploma valorizado e reconhecido pelo MEC' },
          { icon: 'Rocket', title: 'Carreira', description: 'Programa de orientacao profissional e estagios' },
          { icon: 'Shield', title: 'Suporte', description: 'Acompanhamento personalizado durante toda a jornada' },
        ],
        columns: '3',
      },
    },
    {
      type: 'Testimonials',
      props: {
        title: 'O que nossos alunos dizem',
        testimonials: [
          {
            name: 'Ana Carolina Silva',
            role: 'Formada em 2024 - Analista no Banco XYZ',
            quote: 'A formacao foi essencial para minha carreira. O estagio que consegui atraves da faculdade virou meu emprego dos sonhos.',
            avatar: '',
          },
          {
            name: 'Pedro Henrique Costa',
            role: 'Formado em 2023 - Desenvolvedor na Tech Corp',
            quote: 'Os projetos praticos e o contato com empresas parceiras fizeram toda a diferenca. Sai preparado para o mercado.',
            avatar: '',
          },
          {
            name: 'Mariana Santos',
            role: 'Formada em 2024 - Empreendedora',
            quote: 'A metodologia de ensino e inovadora. Aprendi nao so a teoria, mas como aplicar na pratica. Hoje tenho meu proprio negocio.',
            avatar: '',
          },
        ],
      },
    },
    {
      type: 'FAQ',
      props: {
        title: 'Duvidas sobre o Processo Seletivo',
        items: [
          { question: 'Como funciona o processo seletivo?', answer: 'O processo e 100% online. Voce preenche o formulario, envia os documentos e aguarda o resultado em ate 5 dias uteis.' },
          { question: 'Quais documentos preciso enviar?', answer: 'RG ou CNH, CPF, comprovante de residencia, historico escolar e foto 3x4. Todos podem ser enviados digitalmente.' },
          { question: 'Existem bolsas de estudo?', answer: 'Sim! Oferecemos bolsas de ate 50% baseadas em desempenho e necessidade. Informe seu interesse no formulario.' },
          { question: 'Quando comecam as aulas?', answer: 'As aulas do primeiro semestre de 2026 iniciam em fevereiro. Faca sua inscricao agora e garanta sua vaga.' },
          { question: 'Posso estudar a distancia?', answer: 'Oferecemos modalidades presencial, hibrida e EAD para varios cursos. Consulte a disponibilidade.' },
        ],
      },
    },
    {
      type: 'AdmissionForm',
      props: {
        mockMode: true,
        processId: '',
        institutionName: 'Universidade Orchestra',
        title: 'Faca sua Inscricao',
        description: 'Preencha o formulario abaixo para iniciar seu processo de admissao. E rapido e facil!',
        backgroundColor: 'white',
        padding: 'lg',
        accentColor: '#3B9EEB',
        buttonColor: '#10B981',
      },
    },
    {
      type: 'CTA',
      props: {
        title: 'Ainda tem duvidas?',
        description: 'Nossa equipe esta pronta para ajudar voce a dar o proximo passo na sua carreira.',
        buttonText: 'Falar com um Consultor',
        buttonLink: '#form',
        backgroundColor: '#1E3A5F',
        textColor: '#FFFFFF',
        buttonColor: '#3B9EEB',
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

// Função para adicionar IDs únicos aos templates quando carregados
export function prepareTemplateData(template: Data): Data {
  return {
    ...template,
    content: template.content.map((item, index) => ({
      ...item,
      props: {
        ...item.props,
        id: generateId(),
      },
    })),
  };
}

export const templates = {
  'processo-seletivo': {
    name: 'Processo Seletivo',
    description: 'Landing page completa para admissao de alunos',
    data: admissionTemplate,
  },
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

// Função para obter um template com IDs únicos
export function getTemplate(key: keyof typeof templates): Data {
  const template = templates[key];
  if (!template) {
    throw new Error(`Template '${key}' not found`);
  }
  return prepareTemplateData(template.data);
}

export default templates;
