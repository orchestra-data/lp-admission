import { useParams, Link } from 'react-router-dom';
import type { Data } from '@measured/puck';
import { ArrowLeft, Pencil, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PuckRenderer } from '@/components/puck/PuckRenderer';
import { useLandingPage } from '@/hooks/useLandingPages';

interface LandingPagePreviewProps {
  apiBaseUrl?: string;
}

export function LandingPagePreview({ apiBaseUrl = '/api' }: LandingPagePreviewProps) {
  const { id } = useParams<{ id: string }>();
  const { data: landingPage, isLoading, error } = useLandingPage(apiBaseUrl, id);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (error || !landingPage) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <p className="text-destructive mb-4">Landing page nao encontrada</p>
        <Button asChild variant="outline">
          <Link to="/">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Voltar
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <div>
      {/* Preview Toolbar */}
      <div className="fixed top-0 left-0 right-0 bg-background border-b z-50 px-4 py-2">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center gap-4">
            <Button asChild variant="ghost" size="sm">
              <Link to="/">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Voltar
              </Link>
            </Button>
            <span className="text-sm text-muted-foreground">
              Preview: {landingPage.name}
            </span>
          </div>
          <Button asChild size="sm">
            <Link to={`/${id}/edit`}>
              <Pencil className="mr-2 h-4 w-4" />
              Editar
            </Link>
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="pt-14">
        <PuckRenderer data={landingPage.puckData as Data} />
      </div>
    </div>
  );
}

export default LandingPagePreview;
