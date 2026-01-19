-- LP Admission Module - Database Schema
-- Orchestra Admin
-- Version: 1.0.0

-- ============================================
-- LANDING PAGES TABLE
-- ============================================

CREATE TABLE IF NOT EXISTS landing_pages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  -- Multi-tenancy (padrao Orchestra)
  tenant_id UUID REFERENCES company(id),
  company_id UUID NOT NULL REFERENCES company(id),

  -- Identificacao
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) NOT NULL,
  description TEXT,

  -- Conteudo (Puck JSON)
  puck_data JSONB NOT NULL DEFAULT '{"content": [], "root": {"props": {}}}',

  -- SEO
  seo_title VARCHAR(255),
  seo_description TEXT,
  seo_image VARCHAR(500),

  -- Customizacao
  custom_css TEXT,
  custom_scripts TEXT,

  -- Status
  status VARCHAR(50) NOT NULL DEFAULT 'draft'
    CHECK (status IN ('draft', 'published', 'archived')),
  published_at TIMESTAMPTZ,

  -- Configuracao do Formulario
  form_config JSONB NOT NULL DEFAULT '{
    "enabled": true,
    "notificationEmails": [],
    "webhookUrl": null,
    "integrations": {}
  }',
  redirect_url VARCHAR(500),
  thank_you_message TEXT DEFAULT 'Inscricao enviada com sucesso! Entraremos em contato em breve.',

  -- Metricas
  views_count INTEGER NOT NULL DEFAULT 0,
  submissions_count INTEGER NOT NULL DEFAULT 0,

  -- Versionamento
  version INTEGER NOT NULL DEFAULT 1,

  -- Auditoria (padrao Orchestra)
  created_by UUID REFERENCES "user"(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  deleted_at TIMESTAMPTZ,

  -- Constraints
  CONSTRAINT landing_pages_company_slug_unique UNIQUE (company_id, slug)
);

-- Indices
CREATE INDEX IF NOT EXISTS idx_landing_pages_company ON landing_pages(company_id);
CREATE INDEX IF NOT EXISTS idx_landing_pages_tenant ON landing_pages(tenant_id);
CREATE INDEX IF NOT EXISTS idx_landing_pages_slug ON landing_pages(slug);
CREATE INDEX IF NOT EXISTS idx_landing_pages_status ON landing_pages(status);
CREATE INDEX IF NOT EXISTS idx_landing_pages_created_at ON landing_pages(created_at);
CREATE INDEX IF NOT EXISTS idx_landing_pages_deleted_at ON landing_pages(deleted_at) WHERE deleted_at IS NULL;

-- Trigger para updated_at
CREATE OR REPLACE FUNCTION update_landing_pages_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_landing_pages_updated_at
  BEFORE UPDATE ON landing_pages
  FOR EACH ROW
  EXECUTE FUNCTION update_landing_pages_updated_at();


-- ============================================
-- LANDING PAGE VERSIONS TABLE (Historico)
-- ============================================

CREATE TABLE IF NOT EXISTS landing_page_versions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  landing_page_id UUID NOT NULL REFERENCES landing_pages(id) ON DELETE CASCADE,

  version INTEGER NOT NULL,
  puck_data JSONB NOT NULL,

  -- Auditoria
  created_by UUID REFERENCES "user"(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  -- Constraint de unicidade
  CONSTRAINT landing_page_versions_unique UNIQUE (landing_page_id, version)
);

-- Indices
CREATE INDEX IF NOT EXISTS idx_lp_versions_landing_page ON landing_page_versions(landing_page_id);
CREATE INDEX IF NOT EXISTS idx_lp_versions_created_at ON landing_page_versions(created_at);


-- ============================================
-- TRIGGER PARA CRIAR VERSAO AUTOMATICAMENTE
-- ============================================

CREATE OR REPLACE FUNCTION create_landing_page_version()
RETURNS TRIGGER AS $$
BEGIN
  -- Criar nova versao quando puck_data muda
  IF OLD.puck_data IS DISTINCT FROM NEW.puck_data THEN
    INSERT INTO landing_page_versions (landing_page_id, version, puck_data, created_by)
    VALUES (NEW.id, NEW.version, OLD.puck_data, NEW.created_by);

    NEW.version = NEW.version + 1;
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_landing_page_version
  BEFORE UPDATE ON landing_pages
  FOR EACH ROW
  WHEN (OLD.puck_data IS DISTINCT FROM NEW.puck_data)
  EXECUTE FUNCTION create_landing_page_version();


-- ============================================
-- COMMENTS
-- ============================================

COMMENT ON TABLE landing_pages IS 'Landing pages para admission/matricula';
COMMENT ON COLUMN landing_pages.puck_data IS 'JSON do editor Puck com estrutura da pagina';
COMMENT ON COLUMN landing_pages.form_config IS 'Configuracoes do formulario de admission';
COMMENT ON COLUMN landing_pages.status IS 'Status: draft, published, archived';

COMMENT ON TABLE landing_page_versions IS 'Historico de versoes das landing pages';
