# LP Admission - Documento de Arquitetura

**Módulo:** Landing Page Admission
**Projeto:** Orchestra Admin
**Data:** 2026-01-19
**Versão:** 1.0.0

---

## 1. Visão Geral

O módulo LP Admission é uma nova aba do Orchestra Admin que permite criar e gerenciar landing pages para formulários de admission (matrícula/inscrição) de forma visual usando o editor Puck.

### 1.1 Objetivos

- Criar landing pages de admission sem necessidade de código
- Editor visual drag-and-drop integrado ao Orchestra Admin
- Formulários de admission configuráveis
- Publicação e gerenciamento de múltiplas LPs
- Integração com sistema de leads/CRM do Orchestra

---

## 2. Stack Tecnológico

### 2.1 Alinhamento com Orchestra

| Tecnologia | Versão | Justificativa |
|------------|--------|---------------|
| **React** | 18.2.0+ | Padrão Orchestra |
| **TypeScript** | 5.x | Padrão Orchestra |
| **Vite** | 5.0+ | Padrão Orchestra (alternativa: Next.js para SSR) |
| **TailwindCSS** | 3.3.5+ | Padrão Orchestra |
| **Puck** | 0.21+ | Page builder escolhido (benchmark) |
| **Shadcn/ui** | Latest | Padrão Orchestra (design-system) |
| **Zod** | 4.3.5+ | Padrão Orchestra (validação) |
| **React Hook Form** | 7.x | Forms |
| **TanStack Query** | 5.0+ | Padrão Orchestra (state management) |
| **Lucide React** | 0.294.0+ | Padrão Orchestra (ícones) |
| **Zustand** | 4.x | UI state local |

### 2.2 Backend

| Tecnologia | Versão | Uso |
|------------|--------|-----|
| **Express.js** | 4.18.2 | API REST |
| **PostgreSQL** | 15+ | Database |
| **Prisma** | 5.x | ORM (opcional, pode usar SQL direto) |

---

## 3. Estrutura do Projeto

```
LP Admission/
├── README.md
├── BENCHMARK_LANDING_PAGES.md
├── ARCHITECTURE.md
├── package.json
├── tsconfig.json
├── vite.config.ts
├── tailwind.config.js
├── postcss.config.js
│
├── src/
│   ├── main.tsx                    # Entry point
│   ├── App.tsx                     # Componente raiz
│   ├── index.tsx                   # Exports do módulo
│   │
│   ├── components/
│   │   ├── puck/
│   │   │   ├── PuckEditor.tsx      # Wrapper do editor Puck
│   │   │   ├── PuckRenderer.tsx    # Renderizador de páginas
│   │   │   ├── config.ts           # Configuração Puck
│   │   │   └── blocks/
│   │   │       ├── index.ts        # Export de todos os blocos
│   │   │       ├── Hero/
│   │   │       │   ├── Hero.tsx
│   │   │       │   └── Hero.styles.ts
│   │   │       ├── Features/
│   │   │       │   ├── Features.tsx
│   │   │       │   └── Features.styles.ts
│   │   │       ├── Testimonials/
│   │   │       │   ├── Testimonials.tsx
│   │   │       │   └── Testimonials.styles.ts
│   │   │       ├── CTA/
│   │   │       │   ├── CTA.tsx
│   │   │       │   └── CTA.styles.ts
│   │   │       ├── FAQ/
│   │   │       │   ├── FAQ.tsx
│   │   │       │   └── FAQ.styles.ts
│   │   │       ├── Pricing/
│   │   │       │   ├── Pricing.tsx
│   │   │       │   └── Pricing.styles.ts
│   │   │       └── AdmissionForm/
│   │   │           ├── AdmissionForm.tsx
│   │   │           ├── AdmissionForm.schema.ts
│   │   │           └── AdmissionForm.styles.ts
│   │   │
│   │   └── ui/                     # Shadcn/ui components
│   │       ├── button.tsx
│   │       ├── input.tsx
│   │       ├── card.tsx
│   │       ├── dialog.tsx
│   │       ├── dropdown-menu.tsx
│   │       └── ...
│   │
│   ├── pages/
│   │   ├── LandingPageList.tsx     # Lista de LPs
│   │   ├── LandingPageEditor.tsx   # Editor (Puck)
│   │   ├── LandingPagePreview.tsx  # Preview
│   │   └── LandingPagePublic.tsx   # Renderização pública
│   │
│   ├── lib/
│   │   ├── utils.ts                # Utilidades gerais
│   │   ├── cn.ts                   # Classname helper
│   │   └── puck/
│   │       ├── initialData.ts      # Dados iniciais para nova LP
│   │       └── templates.ts        # Templates pré-definidos
│   │
│   ├── api/
│   │   ├── client.ts               # Cliente HTTP
│   │   ├── landingPages.ts         # API de landing pages
│   │   └── admissions.ts           # API de admissions
│   │
│   ├── hooks/
│   │   ├── useLandingPages.ts      # Hook para CRUD de LPs
│   │   ├── useAdmissions.ts        # Hook para submissions
│   │   └── usePuckEditor.ts        # Hook para estado do editor
│   │
│   ├── types/
│   │   ├── index.ts
│   │   ├── landing-page.ts         # Tipos de LP
│   │   ├── admission.ts            # Tipos de admission
│   │   └── puck.ts                 # Tipos do Puck
│   │
│   └── styles/
│       └── globals.css             # Estilos globais
│
├── backend/
│   ├── server.js                   # Express server
│   ├── routes/
│   │   ├── landingPages.js         # CRUD de LPs
│   │   └── admissions.js           # Submissions de formulários
│   └── middleware/
│       └── auth.js                 # Autenticação
│
├── database/
│   ├── 001_landing_pages_schema.sql
│   └── 002_admissions_schema.sql
│
└── public/
    └── assets/                     # Assets estáticos
```

---

## 4. Schema do Banco de Dados

### 4.1 Tabela: landing_pages

```sql
CREATE TABLE landing_pages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  -- Multi-tenancy (padrão Orchestra)
  tenant_id UUID REFERENCES company(id),
  company_id UUID NOT NULL REFERENCES company(id),

  -- Identificação
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) NOT NULL,
  description TEXT,

  -- Conteúdo (Puck JSON)
  puck_data JSONB NOT NULL DEFAULT '{}',

  -- Configurações
  seo_title VARCHAR(255),
  seo_description TEXT,
  seo_image VARCHAR(500),
  custom_css TEXT,
  custom_scripts TEXT,

  -- Status
  status VARCHAR(50) DEFAULT 'draft', -- draft, published, archived
  published_at TIMESTAMPTZ,

  -- Formulário vinculado
  form_config JSONB DEFAULT '{}',
  redirect_url VARCHAR(500),
  thank_you_message TEXT,

  -- Métricas
  views_count INTEGER DEFAULT 0,
  submissions_count INTEGER DEFAULT 0,

  -- Versionamento
  version INTEGER DEFAULT 1,

  -- Auditoria (padrão Orchestra)
  created_by UUID REFERENCES "user"(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  deleted_at TIMESTAMPTZ,

  -- Constraints
  UNIQUE (company_id, slug)
);

-- Índices
CREATE INDEX idx_landing_pages_company ON landing_pages(company_id);
CREATE INDEX idx_landing_pages_slug ON landing_pages(slug);
CREATE INDEX idx_landing_pages_status ON landing_pages(status);
```

### 4.2 Tabela: landing_page_versions

```sql
CREATE TABLE landing_page_versions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  landing_page_id UUID NOT NULL REFERENCES landing_pages(id) ON DELETE CASCADE,

  version INTEGER NOT NULL,
  puck_data JSONB NOT NULL,

  created_by UUID REFERENCES "user"(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),

  UNIQUE (landing_page_id, version)
);
```

### 4.3 Tabela: admission_submissions

```sql
CREATE TABLE admission_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  -- Multi-tenancy
  tenant_id UUID REFERENCES company(id),
  company_id UUID NOT NULL REFERENCES company(id),

  -- Vínculo com LP
  landing_page_id UUID NOT NULL REFERENCES landing_pages(id),

  -- Dados do lead
  form_data JSONB NOT NULL,

  -- Dados de contexto
  ip_address VARCHAR(45),
  user_agent TEXT,
  referrer VARCHAR(500),
  utm_source VARCHAR(100),
  utm_medium VARCHAR(100),
  utm_campaign VARCHAR(100),
  utm_term VARCHAR(100),
  utm_content VARCHAR(100),

  -- Status do lead
  status VARCHAR(50) DEFAULT 'new', -- new, contacted, qualified, enrolled, rejected
  notes TEXT,

  -- Auditoria
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  processed_at TIMESTAMPTZ,
  processed_by UUID REFERENCES "user"(id)
);

-- Índices
CREATE INDEX idx_submissions_company ON admission_submissions(company_id);
CREATE INDEX idx_submissions_landing_page ON admission_submissions(landing_page_id);
CREATE INDEX idx_submissions_status ON admission_submissions(status);
CREATE INDEX idx_submissions_created ON admission_submissions(created_at);
```

---

## 5. API Endpoints

### 5.1 Landing Pages

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/api/landing-pages` | Listar LPs da empresa |
| GET | `/api/landing-pages/:id` | Obter LP por ID |
| POST | `/api/landing-pages` | Criar nova LP |
| PUT | `/api/landing-pages/:id` | Atualizar LP |
| DELETE | `/api/landing-pages/:id` | Soft delete LP |
| POST | `/api/landing-pages/:id/publish` | Publicar LP |
| POST | `/api/landing-pages/:id/unpublish` | Despublicar LP |
| POST | `/api/landing-pages/:id/duplicate` | Duplicar LP |
| GET | `/api/landing-pages/:id/versions` | Histórico de versões |

### 5.2 Admissions (Público)

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/api/public/lp/:slug` | Obter LP pública por slug |
| POST | `/api/public/lp/:slug/submit` | Submeter formulário |

### 5.3 Admissions (Admin)

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/api/admissions` | Listar submissions |
| GET | `/api/admissions/:id` | Obter submission |
| PUT | `/api/admissions/:id/status` | Atualizar status |
| GET | `/api/admissions/export` | Exportar CSV/Excel |

### 5.4 Health Check

```
GET /api/landing-pages/health

Response:
{
  "status": "ok",
  "module": "landing-pages",
  "version": "1.0.0",
  "features": {
    "editor": true,
    "templates": true,
    "analytics": false
  }
}
```

---

## 6. Configuração do Puck

### 6.1 Blocos Disponíveis

```typescript
// src/components/puck/config.ts
import { Config } from "@measured/puck";

export const puckConfig: Config = {
  components: {
    Hero: {
      label: "Hero Section",
      fields: {
        title: { type: "text", label: "Título" },
        subtitle: { type: "textarea", label: "Subtítulo" },
        backgroundImage: { type: "text", label: "URL da Imagem" },
        ctaText: { type: "text", label: "Texto do Botão" },
        ctaLink: { type: "text", label: "Link do Botão" },
        alignment: {
          type: "select",
          label: "Alinhamento",
          options: [
            { value: "left", label: "Esquerda" },
            { value: "center", label: "Centro" },
            { value: "right", label: "Direita" },
          ],
        },
      },
      defaultProps: {
        title: "Bem-vindo à Nossa Instituição",
        subtitle: "Transforme seu futuro com educação de qualidade",
        ctaText: "Inscreva-se Agora",
        alignment: "center",
      },
      render: HeroBlock,
    },

    Features: {
      label: "Features/Benefícios",
      fields: {
        title: { type: "text", label: "Título da Seção" },
        features: {
          type: "array",
          label: "Features",
          arrayFields: {
            icon: { type: "text", label: "Ícone (Lucide)" },
            title: { type: "text", label: "Título" },
            description: { type: "textarea", label: "Descrição" },
          },
        },
        columns: {
          type: "select",
          label: "Colunas",
          options: [
            { value: "2", label: "2 Colunas" },
            { value: "3", label: "3 Colunas" },
            { value: "4", label: "4 Colunas" },
          ],
        },
      },
      render: FeaturesBlock,
    },

    Testimonials: {
      label: "Depoimentos",
      fields: {
        title: { type: "text", label: "Título" },
        testimonials: {
          type: "array",
          label: "Depoimentos",
          arrayFields: {
            name: { type: "text", label: "Nome" },
            role: { type: "text", label: "Cargo/Curso" },
            quote: { type: "textarea", label: "Depoimento" },
            avatar: { type: "text", label: "URL do Avatar" },
          },
        },
      },
      render: TestimonialsBlock,
    },

    FAQ: {
      label: "Perguntas Frequentes",
      fields: {
        title: { type: "text", label: "Título" },
        items: {
          type: "array",
          label: "Perguntas",
          arrayFields: {
            question: { type: "text", label: "Pergunta" },
            answer: { type: "textarea", label: "Resposta" },
          },
        },
      },
      render: FAQBlock,
    },

    Pricing: {
      label: "Preços/Planos",
      fields: {
        title: { type: "text", label: "Título" },
        plans: {
          type: "array",
          label: "Planos",
          arrayFields: {
            name: { type: "text", label: "Nome do Plano" },
            price: { type: "text", label: "Preço" },
            period: { type: "text", label: "Período" },
            features: { type: "textarea", label: "Features (uma por linha)" },
            highlighted: { type: "radio", label: "Destacado", options: [
              { value: true, label: "Sim" },
              { value: false, label: "Não" },
            ]},
          },
        },
      },
      render: PricingBlock,
    },

    CTA: {
      label: "Call to Action",
      fields: {
        title: { type: "text", label: "Título" },
        description: { type: "textarea", label: "Descrição" },
        buttonText: { type: "text", label: "Texto do Botão" },
        buttonLink: { type: "text", label: "Link" },
        variant: {
          type: "select",
          label: "Estilo",
          options: [
            { value: "primary", label: "Primário" },
            { value: "secondary", label: "Secundário" },
            { value: "gradient", label: "Gradiente" },
          ],
        },
      },
      render: CTABlock,
    },

    AdmissionForm: {
      label: "Formulário de Matrícula",
      fields: {
        title: { type: "text", label: "Título" },
        description: { type: "textarea", label: "Descrição" },
        fields: {
          type: "array",
          label: "Campos do Formulário",
          arrayFields: {
            name: { type: "text", label: "Nome do Campo" },
            label: { type: "text", label: "Label" },
            type: {
              type: "select",
              label: "Tipo",
              options: [
                { value: "text", label: "Texto" },
                { value: "email", label: "Email" },
                { value: "tel", label: "Telefone" },
                { value: "cpf", label: "CPF" },
                { value: "select", label: "Select" },
                { value: "textarea", label: "Área de Texto" },
              ],
            },
            required: { type: "radio", label: "Obrigatório", options: [
              { value: true, label: "Sim" },
              { value: false, label: "Não" },
            ]},
            placeholder: { type: "text", label: "Placeholder" },
            options: { type: "textarea", label: "Opções (para select, uma por linha)" },
          },
        },
        submitText: { type: "text", label: "Texto do Botão" },
        successMessage: { type: "textarea", label: "Mensagem de Sucesso" },
      },
      defaultProps: {
        title: "Inscreva-se Agora",
        submitText: "Enviar Inscrição",
        fields: [
          { name: "name", label: "Nome Completo", type: "text", required: true },
          { name: "email", label: "E-mail", type: "email", required: true },
          { name: "phone", label: "Telefone", type: "tel", required: true },
          { name: "course", label: "Curso de Interesse", type: "select", required: true },
        ],
      },
      render: AdmissionFormBlock,
    },
  },

  categories: {
    layout: {
      title: "Layout",
      components: ["Hero", "CTA"],
    },
    content: {
      title: "Conteúdo",
      components: ["Features", "Testimonials", "FAQ", "Pricing"],
    },
    forms: {
      title: "Formulários",
      components: ["AdmissionForm"],
    },
  },
};
```

---

## 7. Integração com Orchestra Admin

### 7.1 Export do Módulo

```typescript
// src/index.tsx
export { LandingPageEditor } from './pages/LandingPageEditor';
export { LandingPageList } from './pages/LandingPageList';
export { LandingPagePublic } from './pages/LandingPagePublic';
export { puckConfig } from './components/puck/config';

// Default export para importação simples
export { default } from './App';
```

### 7.2 Integração no Orchestra (apps/web)

```typescript
// apps/web/src/pages/Admin/LandingPages.tsx
import { LandingPageEditor, LandingPageList } from '@orchestra/lp-admission';
import { useCompanyContext } from '@/hooks/useCompanyContext';

export function LandingPagesPage() {
  const { currentCompany } = useCompanyContext();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Landing Pages</h1>
      <LandingPageList
        institution={currentCompany}
        apiBaseUrl="/api/landing-pages"
      />
    </div>
  );
}

// apps/web/src/routes/admin.tsx
{
  path: 'landing-pages',
  element: <LandingPagesPage />,
  children: [
    { path: 'new', element: <LandingPageEditorPage /> },
    { path: ':id/edit', element: <LandingPageEditorPage /> },
  ]
}
```

---

## 8. Fluxo de Dados

```
┌─────────────────────────────────────────────────────────────────┐
│                        ORCHESTRA ADMIN                           │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌──────────────┐    ┌──────────────┐    ┌──────────────┐      │
│  │   LP List    │───►│  Puck Editor │───►│   Preview    │      │
│  │   (CRUD)     │    │   (Design)   │    │   (View)     │      │
│  └──────────────┘    └──────────────┘    └──────────────┘      │
│         │                   │                   │               │
│         ▼                   ▼                   ▼               │
│  ┌─────────────────────────────────────────────────────┐       │
│  │                    API Layer                         │       │
│  │  GET/POST/PUT /api/landing-pages                    │       │
│  └─────────────────────────────────────────────────────┘       │
│                            │                                    │
└────────────────────────────┼────────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│                       POSTGRESQL                                 │
│  ┌──────────────┐  ┌──────────────────┐  ┌──────────────────┐  │
│  │landing_pages │  │landing_page_     │  │admission_        │  │
│  │              │  │versions          │  │submissions       │  │
│  └──────────────┘  └──────────────────┘  └──────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│                     PÁGINA PÚBLICA                               │
│  ┌──────────────────────────────────────────────────────┐      │
│  │  GET /api/public/lp/:slug                            │      │
│  │  POST /api/public/lp/:slug/submit                    │      │
│  └──────────────────────────────────────────────────────┘      │
│                                                                  │
│  ┌──────────────┐    ┌──────────────┐    ┌──────────────┐      │
│  │    Hero      │    │   Features   │    │ Admission    │      │
│  │   Section    │    │   Section    │    │    Form      │      │
│  └──────────────┘    └──────────────┘    └──────────────┘      │
└─────────────────────────────────────────────────────────────────┘
```

---

## 9. Funcionalidades por Fase

### Fase 1 - MVP
- [x] Estrutura do projeto
- [ ] CRUD de landing pages
- [ ] Editor Puck básico
- [ ] Blocos: Hero, Features, CTA
- [ ] Bloco: AdmissionForm
- [ ] Salvar/carregar configuração
- [ ] Preview
- [ ] Publicar/despublicar
- [ ] API de submissions

### Fase 2 - Melhorias
- [ ] Templates pré-definidos
- [ ] Histórico de versões
- [ ] Duplicar LP
- [ ] Blocos: Testimonials, FAQ, Pricing
- [ ] Customização de cores/fontes
- [ ] Upload de imagens

### Fase 3 - Analytics
- [ ] Dashboard de métricas
- [ ] Contagem de views
- [ ] Taxa de conversão
- [ ] Exportar leads (CSV/Excel)

### Fase 4 - Avançado
- [ ] A/B testing
- [ ] Integração com CRM
- [ ] Webhooks
- [ ] Multi-idioma
- [ ] Domínios customizados

---

## 10. Próximos Passos

1. **Inicializar projeto** com Vite + React + TypeScript
2. **Instalar dependências** (Puck, Tailwind, Shadcn, etc)
3. **Criar estrutura de pastas**
4. **Implementar blocos básicos**
5. **Configurar Puck**
6. **Criar páginas de gerenciamento**
7. **Implementar API backend**
8. **Criar schema do banco**
9. **Integrar com Orchestra Admin**
10. **Testes e documentação**

---

*Documento de Arquitetura - LP Admission v1.0.0*
*Orchestra Admin Module*
