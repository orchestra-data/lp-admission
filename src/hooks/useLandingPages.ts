import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import type { Data } from '@measured/puck';
import type {
  LandingPage,
  CreateLandingPageInput,
  UpdateLandingPageInput,
  LandingPageListResponse,
} from '@/types/landing-page';

const QUERY_KEY = 'landing-pages';

async function fetchLandingPages(
  apiBaseUrl: string,
  page = 1,
  limit = 10
): Promise<LandingPageListResponse> {
  const response = await fetch(`${apiBaseUrl}/landing-pages?page=${page}&limit=${limit}`);
  if (!response.ok) throw new Error('Failed to fetch landing pages');
  return response.json();
}

async function fetchLandingPage(apiBaseUrl: string, id: string): Promise<LandingPage> {
  const response = await fetch(`${apiBaseUrl}/landing-pages/${id}`);
  if (!response.ok) throw new Error('Failed to fetch landing page');
  return response.json();
}

async function createLandingPage(
  apiBaseUrl: string,
  input: CreateLandingPageInput
): Promise<LandingPage> {
  const response = await fetch(`${apiBaseUrl}/landing-pages`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(input),
  });
  if (!response.ok) throw new Error('Failed to create landing page');
  return response.json();
}

async function updateLandingPage(
  apiBaseUrl: string,
  id: string,
  input: UpdateLandingPageInput
): Promise<LandingPage> {
  const response = await fetch(`${apiBaseUrl}/landing-pages/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(input),
  });
  if (!response.ok) throw new Error('Failed to update landing page');
  return response.json();
}

async function deleteLandingPage(apiBaseUrl: string, id: string): Promise<void> {
  const response = await fetch(`${apiBaseUrl}/landing-pages/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) throw new Error('Failed to delete landing page');
}

async function publishLandingPage(apiBaseUrl: string, id: string): Promise<LandingPage> {
  const response = await fetch(`${apiBaseUrl}/landing-pages/${id}/publish`, {
    method: 'POST',
  });
  if (!response.ok) throw new Error('Failed to publish landing page');
  return response.json();
}

async function unpublishLandingPage(apiBaseUrl: string, id: string): Promise<LandingPage> {
  const response = await fetch(`${apiBaseUrl}/landing-pages/${id}/unpublish`, {
    method: 'POST',
  });
  if (!response.ok) throw new Error('Failed to unpublish landing page');
  return response.json();
}

async function duplicateLandingPage(apiBaseUrl: string, id: string): Promise<LandingPage> {
  const response = await fetch(`${apiBaseUrl}/landing-pages/${id}/duplicate`, {
    method: 'POST',
  });
  if (!response.ok) throw new Error('Failed to duplicate landing page');
  return response.json();
}

export function useLandingPages(apiBaseUrl: string, page = 1, limit = 10) {
  return useQuery({
    queryKey: [QUERY_KEY, page, limit],
    queryFn: () => fetchLandingPages(apiBaseUrl, page, limit),
  });
}

export function useLandingPage(apiBaseUrl: string, id: string | undefined) {
  return useQuery({
    queryKey: [QUERY_KEY, id],
    queryFn: () => fetchLandingPage(apiBaseUrl, id!),
    enabled: !!id,
  });
}

export function useCreateLandingPage(apiBaseUrl: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: CreateLandingPageInput) => createLandingPage(apiBaseUrl, input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });
    },
  });
}

export function useUpdateLandingPage(apiBaseUrl: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, input }: { id: string; input: UpdateLandingPageInput }) =>
      updateLandingPage(apiBaseUrl, id, input),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY, id] });
    },
  });
}

export function useDeleteLandingPage(apiBaseUrl: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteLandingPage(apiBaseUrl, id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });
    },
  });
}

export function usePublishLandingPage(apiBaseUrl: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => publishLandingPage(apiBaseUrl, id),
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY, id] });
    },
  });
}

export function useUnpublishLandingPage(apiBaseUrl: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => unpublishLandingPage(apiBaseUrl, id),
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY, id] });
    },
  });
}

export function useDuplicateLandingPage(apiBaseUrl: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => duplicateLandingPage(apiBaseUrl, id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });
    },
  });
}

export function useSavePuckData(apiBaseUrl: string, id: string) {
  const updateMutation = useUpdateLandingPage(apiBaseUrl);

  return (data: Data) => {
    updateMutation.mutate({ id, input: { puckData: data } });
  };
}
