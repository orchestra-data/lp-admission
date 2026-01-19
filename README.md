# LP Admission

Modulo de Landing Pages para Admission do Orchestra Admin.

## Overview

Este modulo permite criar e gerenciar landing pages para captura de leads de admission (matricula/inscricao) usando um editor visual drag-and-drop baseado no [Puck](https://puckeditor.com/).

## Stack

- **React 18** + **TypeScript**
- **Vite** - Build tool
- **Puck** - Page builder
- **TailwindCSS** - Styling
- **Shadcn/ui** - Components
- **React Hook Form** + **Zod** - Forms/Validation
- **TanStack Query** - Data fetching
- **Lucide React** - Icons

## Quick Start

```bash
# Instalar dependencias
npm install

# Rodar em desenvolvimento
npm run dev

# Build para producao
npm run build
```

## Estrutura do Projeto

```
src/
├── components/
│   ├── puck/
│   │   ├── PuckEditor.tsx      # Wrapper do editor
│   │   ├── PuckRenderer.tsx    # Renderizador
│   │   ├── config.ts           # Configuracao dos blocos
│   │   └── blocks/             # Blocos customizados
│   │       ├── Hero.tsx
│   │       ├── Features.tsx
│   │       ├── Testimonials.tsx
│   │       ├── FAQ.tsx
│   │       ├── Pricing.tsx
│   │       ├── CTA.tsx
│   │       └── AdmissionForm.tsx
│   └── ui/                     # Componentes base
├── pages/
│   ├── LandingPageList.tsx     # Lista de LPs
│   ├── LandingPageEditor.tsx   # Editor Puck
│   ├── LandingPagePreview.tsx  # Preview
│   └── LandingPagePublic.tsx   # Pagina publica
├── hooks/
│   ├── useLandingPages.ts      # CRUD de LPs
│   └── useAdmissions.ts        # Submissions
├── types/
│   ├── landing-page.ts
│   └── admission.ts
└── lib/
    └── utils.ts
```

## Blocos Disponiveis

| Bloco | Descricao |
|-------|-----------|
| **Hero** | Secao principal com titulo, subtitulo e CTA |
| **Features** | Grid de features/beneficios com icones |
| **Testimonials** | Depoimentos de alunos |
| **FAQ** | Perguntas frequentes (accordion) |
| **Pricing** | Tabela de precos/planos |
| **CTA** | Call to action |
| **AdmissionForm** | Formulario de matricula configuravel |
| **Text** | Bloco de texto simples |
| **Image** | Imagem com opcoes de layout |
| **Spacer** | Espacador vertical |

## Integracao com Orchestra Admin

```tsx
// apps/web/src/pages/Admin/LandingPages.tsx
import { LandingPageList, LandingPageEditor } from '@orchestra/lp-admission';

export function LandingPagesPage() {
  const { currentCompany } = useCompanyContext();

  return (
    <LandingPageList
      institution={currentCompany}
      apiBaseUrl="/api/landing-pages"
    />
  );
}
```

## API Endpoints

### Landing Pages (Admin)

| Metodo | Endpoint | Descricao |
|--------|----------|-----------|
| GET | `/api/landing-pages` | Listar LPs |
| GET | `/api/landing-pages/:id` | Obter LP |
| POST | `/api/landing-pages` | Criar LP |
| PUT | `/api/landing-pages/:id` | Atualizar LP |
| DELETE | `/api/landing-pages/:id` | Excluir LP |
| POST | `/api/landing-pages/:id/publish` | Publicar |
| POST | `/api/landing-pages/:id/unpublish` | Despublicar |
| POST | `/api/landing-pages/:id/duplicate` | Duplicar |

### Landing Pages (Publico)

| Metodo | Endpoint | Descricao |
|--------|----------|-----------|
| GET | `/api/public/lp/:slug` | Obter LP publica |
| POST | `/api/public/lp/:slug/submit` | Enviar formulario |
| POST | `/api/public/lp/:slug/view` | Registrar view |

### Admissions (Admin)

| Metodo | Endpoint | Descricao |
|--------|----------|-----------|
| GET | `/api/admissions` | Listar submissions |
| GET | `/api/admissions/:id` | Obter submission |
| PUT | `/api/admissions/:id/status` | Atualizar status |
| GET | `/api/admissions/stats` | Estatisticas |
| GET | `/api/admissions/export` | Exportar CSV/Excel |

## Database

O schema do banco esta em `database/`:

- `001_landing_pages_schema.sql` - Tabela de landing pages
- `002_admissions_schema.sql` - Tabela de submissions

## Documentacao

- [Benchmark de Landing Pages](./BENCHMARK_LANDING_PAGES.md)
- [Arquitetura do Modulo](./ARCHITECTURE.md)
- [Puck Documentation](https://puckeditor.com/docs)

## Roadmap

### MVP (Fase 1)
- [x] Estrutura do projeto
- [x] Configuracao Puck
- [x] Blocos basicos
- [x] Formulario de admission
- [ ] Backend API
- [ ] Integracao Orchestra

### Fase 2
- [ ] Templates pre-definidos
- [ ] Historico de versoes
- [ ] Upload de imagens
- [ ] Customizacao de cores/fontes

### Fase 3
- [ ] Dashboard de analytics
- [ ] A/B testing
- [ ] Integracoes (CRM, email)

## Licenca

MIT - Orchestra Team
