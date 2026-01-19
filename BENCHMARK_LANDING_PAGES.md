# Benchmark: Soluções Open Source para Landing Pages

**Projeto:** LP Admission - Orchestra Admin
**Data:** 2026-01-19
**Objetivo:** Construir módulo de landing page para formulário de admission

---

## 1. Contexto

O Orchestra Admin precisa de uma nova aba para gerenciar landing pages de admission. Os usuários poderão criar e editar landing pages com formulários de cadastro de forma visual.

---

## 2. Soluções Analisadas

### 2.1 Builders com Editor Visual

#### GrapesJS
| Atributo | Detalhes |
|----------|----------|
| **Repositório** | https://github.com/GrapesJS/grapesjs |
| **Tecnologia** | JavaScript puro (framework-agnostic) |
| **GitHub Stars** | 22,000+ |
| **Licença** | BSD 3-Clause |
| **Status** | Ativo (2025/2026) |

**Features:**
- Editor visual drag-and-drop completo
- Style Manager para CSS visual
- Layer Manager para gerenciar elementos
- Asset Manager para upload de imagens
- Exporta HTML/CSS/JS limpo
- Plugin para React (@grapesjs/react)
- Suporte a formulários via plugins
- Extensível com plugins customizados

**Prós:** Maduro, grande comunidade, muito extensível
**Contras:** Curva de aprendizado maior, mais pesado

---

#### Puck (ESCOLHIDO)
| Atributo | Detalhes |
|----------|----------|
| **Repositório** | https://github.com/puckeditor/puck |
| **Tecnologia** | React / Next.js |
| **GitHub Stars** | 10,300+ |
| **Licença** | MIT |
| **Status** | Muito ativo (Janeiro 2026) |

**Features:**
- Editor visual específico para React
- Output em JSON (facilita persistência)
- AI page generation (v0.21)
- Rich text fields
- Sistema de plugins
- Compatível com qualquer headless CMS
- Self-hosted (componente React)

**Prós:** Nativo React, output JSON, leve, MIT license
**Contras:** Menos componentes prontos que GrapesJS

---

#### Craft.js
| Atributo | Detalhes |
|----------|----------|
| **Repositório** | https://github.com/prevwong/craft.js |
| **Tecnologia** | React |
| **GitHub Stars** | 8,500+ |
| **Licença** | MIT |
| **Status** | Ativo |

**Features:**
- Framework para criar page editors customizados
- Drag-and-drop extensível
- Serialização em JSON
- Controle total sobre UI do editor

**Prós:** Flexível, customizável
**Contras:** Requer mais setup inicial

---

#### Builder.io SDK
| Atributo | Detalhes |
|----------|----------|
| **Repositório** | https://github.com/BuilderIO/builder |
| **Tecnologia** | React, Vue, Svelte, Qwik |
| **GitHub Stars** | 8,500+ |
| **Licença** | MIT |
| **Status** | Ativo |

**Features:**
- Visual builder multi-framework
- AI Visual Copilot (Figma to code)
- A/B testing e personalização
- Suporte a React Server Components

**Prós:** Multi-framework, AI features
**Contras:** Parte do ecossistema Builder.io (SaaS)

---

#### Destack
| Atributo | Detalhes |
|----------|----------|
| **Repositório** | https://github.com/LiveDuo/destack |
| **Tecnologia** | Next.js + Tailwind CSS |
| **GitHub Stars** | 1,500+ |
| **Licença** | MIT |
| **Status** | Moderadamente ativo |

**Features:**
- Page builder para Next.js
- Centenas de blocos pré-construídos
- Suporte nativo a formulários
- Zero-config deployment

**Prós:** Simples, muitos blocos prontos
**Contras:** Menos ativo, menos flexível

---

### 2.2 Templates (Alternativas)

| Template | Stars | Tech | Form Nativo |
|----------|-------|------|-------------|
| AstroWind | 4.5k | Astro + Tailwind | Não |
| Landy React | 1.9k | React + TypeScript | Sim |
| SaaS Boilerplate | 4k | Next.js + Shadcn | Sim |
| Cruip Open | 2k | Next.js + Tailwind v4 | Não |

---

## 3. Tabela Comparativa

| Solução | Stars | Tech | Form | Editor Visual | Manutenção | Complexidade |
|---------|-------|------|------|---------------|------------|--------------|
| **GrapesJS** | 22k+ | JS | Sim | Sim | Excelente | Média |
| **Puck** | 10k+ | React | Sim | Sim | Excelente | Baixa |
| **Craft.js** | 8.5k | React | Custom | Sim | Boa | Alta |
| **Builder.io** | 8.5k | Multi | Sim | Sim | Excelente | Média |
| **Destack** | 1.5k | Next.js | Sim | Sim | Moderada | Baixa |

---

## 4. Decisão: Puck

### Justificativa

1. **Stack Alinhado:** React/Next.js é o padrão do Orchestra Admin
2. **Output JSON:** Facilita salvar/carregar configurações no banco
3. **Licença MIT:** Sem restrições de uso comercial
4. **Componentes Custom:** Podemos criar o formulário de admission como componente React
5. **Comunidade Ativa:** Atualizações frequentes, bom suporte
6. **Curva de Aprendizado:** Mais simples que alternativas
7. **Performance:** Leve, sem dependências pesadas

### Stack Definido

```
Framework:     Next.js 14+
Page Builder:  Puck
Styling:       Tailwind CSS
Componentes:   Shadcn/ui
Formulários:   React Hook Form + Zod
Estado:        Zustand ou Context API
```

---

## 5. Arquitetura Proposta

```
LP Admission/
├── src/
│   ├── app/
│   │   ├── admin/
│   │   │   └── landing-pages/     # Área de gestão
│   │   │       ├── page.tsx       # Lista de LPs
│   │   │       ├── [id]/
│   │   │       │   └── edit/      # Editor Puck
│   │   │       └── new/           # Criar nova LP
│   │   └── lp/
│   │       └── [slug]/            # Renderização pública
│   │           └── page.tsx
│   ├── components/
│   │   ├── puck/
│   │   │   ├── blocks/            # Blocos customizados
│   │   │   │   ├── Hero.tsx
│   │   │   │   ├── Features.tsx
│   │   │   │   ├── Testimonials.tsx
│   │   │   │   └── AdmissionForm.tsx  # Formulário principal
│   │   │   └── config.ts          # Configuração Puck
│   │   └── ui/                    # Shadcn components
│   ├── lib/
│   │   ├── puck/
│   │   └── validations/
│   └── types/
├── public/
├── prisma/                        # Se usar Prisma
│   └── schema.prisma
└── package.json
```

---

## 6. Funcionalidades Planejadas

### MVP (Fase 1)
- [ ] Criar nova landing page
- [ ] Editor visual com Puck
- [ ] Blocos básicos (Hero, Features, CTA)
- [ ] Bloco de formulário de admission
- [ ] Salvar/carregar configuração
- [ ] Preview da página
- [ ] Publicar/despublicar

### Fase 2
- [ ] Templates pré-definidos
- [ ] Histórico de versões
- [ ] Duplicar landing page
- [ ] Analytics básico
- [ ] A/B testing

### Fase 3
- [ ] Integração com CRM
- [ ] Automações (email, webhook)
- [ ] Multi-idioma
- [ ] Domínios customizados

---

## 7. Referências

- [Puck Documentation](https://puckeditor.com/docs)
- [Puck GitHub](https://github.com/puckeditor/puck)
- [Shadcn/ui](https://ui.shadcn.com/)
- [React Hook Form](https://react-hook-form.com/)
- [Tailwind CSS](https://tailwindcss.com/)

---

## 8. Próximos Passos

1. Consultar agente ORCH para padrões de arquitetura do Orchestra Admin
2. Definir schema do banco para landing pages
3. Configurar projeto Next.js com Puck
4. Criar blocos customizados
5. Implementar formulário de admission
6. Integrar com backend do Orchestra

---

*Documento gerado pelo Agente Analista - LP Admission Project*
