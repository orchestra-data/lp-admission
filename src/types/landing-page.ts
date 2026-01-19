import type { Data } from '@measured/puck';

export type LandingPageStatus = 'draft' | 'published' | 'archived';

export interface LandingPage {
  id: string;
  tenantId?: string;
  companyId: string;
  name: string;
  slug: string;
  description?: string;
  puckData: Data;
  seoTitle?: string;
  seoDescription?: string;
  seoImage?: string;
  customCss?: string;
  customScripts?: string;
  status: LandingPageStatus;
  publishedAt?: string;
  formConfig: FormConfig;
  redirectUrl?: string;
  thankYouMessage?: string;
  viewsCount: number;
  submissionsCount: number;
  version: number;
  createdBy?: string;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string;
}

export interface FormConfig {
  enabled: boolean;
  notificationEmails?: string[];
  webhookUrl?: string;
  integrations?: {
    crm?: string;
    mailchimp?: string;
  };
}

export interface CreateLandingPageInput {
  name: string;
  slug: string;
  description?: string;
  puckData?: Data;
  seoTitle?: string;
  seoDescription?: string;
}

export interface UpdateLandingPageInput {
  name?: string;
  slug?: string;
  description?: string;
  puckData?: Data;
  seoTitle?: string;
  seoDescription?: string;
  seoImage?: string;
  customCss?: string;
  customScripts?: string;
  formConfig?: FormConfig;
  redirectUrl?: string;
  thankYouMessage?: string;
}

export interface LandingPageVersion {
  id: string;
  landingPageId: string;
  version: number;
  puckData: Data;
  createdBy?: string;
  createdAt: string;
}

export interface LandingPageListResponse {
  data: LandingPage[];
  total: number;
  page: number;
  limit: number;
}
