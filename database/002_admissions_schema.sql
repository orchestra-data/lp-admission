-- LP Admission Module - Admissions Schema
-- Orchestra Admin
-- Version: 1.0.0

-- ============================================
-- ADMISSION SUBMISSIONS TABLE
-- ============================================

CREATE TABLE IF NOT EXISTS admission_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  -- Multi-tenancy
  tenant_id UUID REFERENCES company(id),
  company_id UUID NOT NULL REFERENCES company(id),

  -- Vinculo com Landing Page
  landing_page_id UUID NOT NULL REFERENCES landing_pages(id),

  -- Dados do formulario (dinamico)
  form_data JSONB NOT NULL,

  -- Dados de contexto
  ip_address VARCHAR(45),
  user_agent TEXT,
  referrer VARCHAR(500),

  -- UTM Parameters
  utm_source VARCHAR(100),
  utm_medium VARCHAR(100),
  utm_campaign VARCHAR(100),
  utm_term VARCHAR(100),
  utm_content VARCHAR(100),

  -- Status do lead
  status VARCHAR(50) NOT NULL DEFAULT 'new'
    CHECK (status IN ('new', 'contacted', 'qualified', 'enrolled', 'rejected')),
  notes TEXT,

  -- Auditoria
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  processed_at TIMESTAMPTZ,
  processed_by UUID REFERENCES "user"(id)
);

-- Indices
CREATE INDEX IF NOT EXISTS idx_submissions_company ON admission_submissions(company_id);
CREATE INDEX IF NOT EXISTS idx_submissions_tenant ON admission_submissions(tenant_id);
CREATE INDEX IF NOT EXISTS idx_submissions_landing_page ON admission_submissions(landing_page_id);
CREATE INDEX IF NOT EXISTS idx_submissions_status ON admission_submissions(status);
CREATE INDEX IF NOT EXISTS idx_submissions_created_at ON admission_submissions(created_at);
CREATE INDEX IF NOT EXISTS idx_submissions_utm_source ON admission_submissions(utm_source);
CREATE INDEX IF NOT EXISTS idx_submissions_utm_campaign ON admission_submissions(utm_campaign);

-- Indice GIN para busca em form_data
CREATE INDEX IF NOT EXISTS idx_submissions_form_data ON admission_submissions USING GIN (form_data);

-- Trigger para updated_at
CREATE OR REPLACE FUNCTION update_submissions_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_submissions_updated_at
  BEFORE UPDATE ON admission_submissions
  FOR EACH ROW
  EXECUTE FUNCTION update_submissions_updated_at();


-- ============================================
-- TRIGGER PARA ATUALIZAR CONTADOR NA LP
-- ============================================

CREATE OR REPLACE FUNCTION update_landing_page_submissions_count()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE landing_pages
    SET submissions_count = submissions_count + 1
    WHERE id = NEW.landing_page_id;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_lp_submissions_count
  AFTER INSERT ON admission_submissions
  FOR EACH ROW
  EXECUTE FUNCTION update_landing_page_submissions_count();


-- ============================================
-- VIEW PARA ESTATISTICAS
-- ============================================

CREATE OR REPLACE VIEW admission_stats_view AS
SELECT
  company_id,
  landing_page_id,
  status,
  COUNT(*) as count,
  DATE_TRUNC('day', created_at) as date
FROM admission_submissions
GROUP BY company_id, landing_page_id, status, DATE_TRUNC('day', created_at);


-- ============================================
-- FUNCAO PARA OBTER ESTATISTICAS
-- ============================================

CREATE OR REPLACE FUNCTION get_admission_stats(p_company_id UUID)
RETURNS TABLE (
  total BIGINT,
  new_count BIGINT,
  contacted_count BIGINT,
  qualified_count BIGINT,
  enrolled_count BIGINT,
  rejected_count BIGINT,
  today_count BIGINT,
  week_count BIGINT,
  month_count BIGINT,
  conversion_rate NUMERIC
) AS $$
BEGIN
  RETURN QUERY
  SELECT
    COUNT(*)::BIGINT as total,
    COUNT(*) FILTER (WHERE status = 'new')::BIGINT as new_count,
    COUNT(*) FILTER (WHERE status = 'contacted')::BIGINT as contacted_count,
    COUNT(*) FILTER (WHERE status = 'qualified')::BIGINT as qualified_count,
    COUNT(*) FILTER (WHERE status = 'enrolled')::BIGINT as enrolled_count,
    COUNT(*) FILTER (WHERE status = 'rejected')::BIGINT as rejected_count,
    COUNT(*) FILTER (WHERE created_at >= CURRENT_DATE)::BIGINT as today_count,
    COUNT(*) FILTER (WHERE created_at >= CURRENT_DATE - INTERVAL '7 days')::BIGINT as week_count,
    COUNT(*) FILTER (WHERE created_at >= CURRENT_DATE - INTERVAL '30 days')::BIGINT as month_count,
    CASE
      WHEN COUNT(*) > 0
      THEN ROUND((COUNT(*) FILTER (WHERE status = 'enrolled')::NUMERIC / COUNT(*)) * 100, 2)
      ELSE 0
    END as conversion_rate
  FROM admission_submissions
  WHERE company_id = p_company_id;
END;
$$ LANGUAGE plpgsql;


-- ============================================
-- COMMENTS
-- ============================================

COMMENT ON TABLE admission_submissions IS 'Submissions de formularios de admission';
COMMENT ON COLUMN admission_submissions.form_data IS 'Dados dinamicos do formulario em JSON';
COMMENT ON COLUMN admission_submissions.status IS 'Status do lead: new, contacted, qualified, enrolled, rejected';
COMMENT ON FUNCTION get_admission_stats IS 'Retorna estatisticas de admissions por empresa';
