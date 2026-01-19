import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import type {
  AdmissionSubmission,
  SubmissionStatus,
  AdmissionListResponse,
  AdmissionStats,
} from '@/types/admission';

const QUERY_KEY = 'admissions';

async function fetchAdmissions(
  apiBaseUrl: string,
  page = 1,
  limit = 10,
  landingPageId?: string,
  status?: SubmissionStatus
): Promise<AdmissionListResponse> {
  const params = new URLSearchParams({
    page: String(page),
    limit: String(limit),
  });
  if (landingPageId) params.append('landingPageId', landingPageId);
  if (status) params.append('status', status);

  const response = await fetch(`${apiBaseUrl}/admissions?${params}`);
  if (!response.ok) throw new Error('Failed to fetch admissions');
  return response.json();
}

async function fetchAdmission(apiBaseUrl: string, id: string): Promise<AdmissionSubmission> {
  const response = await fetch(`${apiBaseUrl}/admissions/${id}`);
  if (!response.ok) throw new Error('Failed to fetch admission');
  return response.json();
}

async function updateAdmissionStatus(
  apiBaseUrl: string,
  id: string,
  status: SubmissionStatus,
  notes?: string
): Promise<AdmissionSubmission> {
  const response = await fetch(`${apiBaseUrl}/admissions/${id}/status`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ status, notes }),
  });
  if (!response.ok) throw new Error('Failed to update admission status');
  return response.json();
}

async function fetchAdmissionStats(apiBaseUrl: string): Promise<AdmissionStats> {
  const response = await fetch(`${apiBaseUrl}/admissions/stats`);
  if (!response.ok) throw new Error('Failed to fetch admission stats');
  return response.json();
}

async function exportAdmissions(
  apiBaseUrl: string,
  format: 'csv' | 'xlsx',
  landingPageId?: string
): Promise<Blob> {
  const params = new URLSearchParams({ format });
  if (landingPageId) params.append('landingPageId', landingPageId);

  const response = await fetch(`${apiBaseUrl}/admissions/export?${params}`);
  if (!response.ok) throw new Error('Failed to export admissions');
  return response.blob();
}

export function useAdmissions(
  apiBaseUrl: string,
  page = 1,
  limit = 10,
  landingPageId?: string,
  status?: SubmissionStatus
) {
  return useQuery({
    queryKey: [QUERY_KEY, page, limit, landingPageId, status],
    queryFn: () => fetchAdmissions(apiBaseUrl, page, limit, landingPageId, status),
  });
}

export function useAdmission(apiBaseUrl: string, id: string | undefined) {
  return useQuery({
    queryKey: [QUERY_KEY, id],
    queryFn: () => fetchAdmission(apiBaseUrl, id!),
    enabled: !!id,
  });
}

export function useUpdateAdmissionStatus(apiBaseUrl: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, status, notes }: { id: string; status: SubmissionStatus; notes?: string }) =>
      updateAdmissionStatus(apiBaseUrl, id, status, notes),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY, id] });
    },
  });
}

export function useAdmissionStats(apiBaseUrl: string) {
  return useQuery({
    queryKey: [QUERY_KEY, 'stats'],
    queryFn: () => fetchAdmissionStats(apiBaseUrl),
  });
}

export function useExportAdmissions(apiBaseUrl: string) {
  return useMutation({
    mutationFn: ({ format, landingPageId }: { format: 'csv' | 'xlsx'; landingPageId?: string }) =>
      exportAdmissions(apiBaseUrl, format, landingPageId),
    onSuccess: (blob, { format }) => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `admissions.${format}`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    },
  });
}
