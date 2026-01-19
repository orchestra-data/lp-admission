export type SubmissionStatus = 'new' | 'contacted' | 'qualified' | 'enrolled' | 'rejected';

// FormField vem do Orchestra - aqui apenas referenciamos
export interface OrchestraFormReference {
  formId: string;
  formName?: string;
}

export interface AdmissionSubmission {
  id: string;
  tenantId?: string;
  companyId: string;
  landingPageId: string;
  landingPageName?: string;
  formData: Record<string, unknown>;
  ipAddress?: string;
  userAgent?: string;
  referrer?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmTerm?: string;
  utmContent?: string;
  status: SubmissionStatus;
  notes?: string;
  createdAt: string;
  updatedAt: string;
  processedAt?: string;
  processedBy?: string;
}

export interface SubmitAdmissionInput {
  formData: Record<string, unknown>;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmTerm?: string;
  utmContent?: string;
}

export interface AdmissionListResponse {
  data: AdmissionSubmission[];
  total: number;
  page: number;
  limit: number;
}

export interface AdmissionStats {
  total: number;
  byStatus: Record<SubmissionStatus, number>;
  conversionRate: number;
  todayCount: number;
  weekCount: number;
  monthCount: number;
}
