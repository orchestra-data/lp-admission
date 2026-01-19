import * as React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Plus,
  MoreHorizontal,
  Eye,
  Pencil,
  Copy,
  Trash2,
  Globe,
  Lock,
  Loader2,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  useLandingPages,
  useDeleteLandingPage,
  usePublishLandingPage,
  useUnpublishLandingPage,
  useDuplicateLandingPage,
} from '@/hooks/useLandingPages';
import { formatRelativeTime, getStatusColor, getStatusLabel, cn } from '@/lib/utils';
import type { LandingPage } from '@/types/landing-page';

interface LandingPageListProps {
  institution?: {
    id: string;
    name: string;
  };
  apiBaseUrl?: string;
}

export function LandingPageList({ apiBaseUrl = '/api' }: LandingPageListProps) {
  const navigate = useNavigate();
  const [page, setPage] = React.useState(1);
  const [openMenu, setOpenMenu] = React.useState<string | null>(null);

  const { data, isLoading, error } = useLandingPages(apiBaseUrl, page);
  const deleteMutation = useDeleteLandingPage(apiBaseUrl);
  const publishMutation = usePublishLandingPage(apiBaseUrl);
  const unpublishMutation = useUnpublishLandingPage(apiBaseUrl);
  const duplicateMutation = useDuplicateLandingPage(apiBaseUrl);

  const handleDelete = (id: string) => {
    if (confirm('Tem certeza que deseja excluir esta landing page?')) {
      deleteMutation.mutate(id);
    }
    setOpenMenu(null);
  };

  const handlePublish = (id: string) => {
    publishMutation.mutate(id);
    setOpenMenu(null);
  };

  const handleUnpublish = (id: string) => {
    unpublishMutation.mutate(id);
    setOpenMenu(null);
  };

  const handleDuplicate = (id: string) => {
    duplicateMutation.mutate(id);
    setOpenMenu(null);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-destructive">Erro ao carregar landing pages</p>
      </div>
    );
  }

  const landingPages = data?.data || [];

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Landing Pages</h1>
          <p className="text-muted-foreground">
            Gerencie suas landing pages de admission
          </p>
        </div>
        <Button asChild>
          <Link to="/new">
            <Plus className="mr-2 h-4 w-4" />
            Nova Landing Page
          </Link>
        </Button>
      </div>

      {landingPages.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Globe className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">Nenhuma landing page</h3>
            <p className="text-muted-foreground mb-4">
              Crie sua primeira landing page para comecar a captar leads.
            </p>
            <Button asChild>
              <Link to="/new">
                <Plus className="mr-2 h-4 w-4" />
                Criar Landing Page
              </Link>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {landingPages.map((lp: LandingPage) => (
            <Card key={lp.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className="font-semibold">{lp.name}</h3>
                      <span
                        className={cn(
                          'px-2 py-0.5 rounded-full text-xs font-medium',
                          getStatusColor(lp.status)
                        )}
                      >
                        {getStatusLabel(lp.status)}
                      </span>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>/{lp.slug}</span>
                      <span>{lp.viewsCount} visualizacoes</span>
                      <span>{lp.submissionsCount} inscricoes</span>
                      <span>Atualizado {formatRelativeTime(lp.updatedAt)}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => navigate(`/${lp.id}/preview`)}
                      title="Visualizar"
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => navigate(`/${lp.id}/edit`)}
                      title="Editar"
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>

                    <div className="relative">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setOpenMenu(openMenu === lp.id ? null : lp.id)}
                      >
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>

                      {openMenu === lp.id && (
                        <div className="absolute right-0 top-full mt-1 bg-background border rounded-md shadow-lg z-10 min-w-[160px]">
                          {lp.status === 'published' ? (
                            <button
                              onClick={() => handleUnpublish(lp.id)}
                              className="flex items-center gap-2 w-full px-3 py-2 text-sm hover:bg-muted"
                            >
                              <Lock className="h-4 w-4" />
                              Despublicar
                            </button>
                          ) : (
                            <button
                              onClick={() => handlePublish(lp.id)}
                              className="flex items-center gap-2 w-full px-3 py-2 text-sm hover:bg-muted"
                            >
                              <Globe className="h-4 w-4" />
                              Publicar
                            </button>
                          )}
                          <button
                            onClick={() => handleDuplicate(lp.id)}
                            className="flex items-center gap-2 w-full px-3 py-2 text-sm hover:bg-muted"
                          >
                            <Copy className="h-4 w-4" />
                            Duplicar
                          </button>
                          <button
                            onClick={() => handleDelete(lp.id)}
                            className="flex items-center gap-2 w-full px-3 py-2 text-sm hover:bg-muted text-destructive"
                          >
                            <Trash2 className="h-4 w-4" />
                            Excluir
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {data && data.total > data.limit && (
        <div className="flex justify-center gap-2 mt-6">
          <Button
            variant="outline"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
          >
            Anterior
          </Button>
          <Button
            variant="outline"
            onClick={() => setPage((p) => p + 1)}
            disabled={page * data.limit >= data.total}
          >
            Proximo
          </Button>
        </div>
      )}
    </div>
  );
}

export default LandingPageList;
