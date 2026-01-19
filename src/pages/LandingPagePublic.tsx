import * as React from 'react';
import { useParams } from 'react-router-dom';
import type { Data } from '@measured/puck';
import { Loader2 } from 'lucide-react';
import { PuckRenderer } from '@/components/puck/PuckRenderer';

interface LandingPagePublicProps {
  apiBaseUrl?: string;
}

interface PublicLandingPage {
  id: string;
  name: string;
  slug: string;
  puckData: Data;
  seoTitle?: string;
  seoDescription?: string;
  seoImage?: string;
  customCss?: string;
  customScripts?: string;
}

export function LandingPagePublic({ apiBaseUrl = '/api' }: LandingPagePublicProps) {
  const { slug } = useParams<{ slug: string }>();
  const [landingPage, setLandingPage] = React.useState<PublicLandingPage | null>(null);
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    const fetchLandingPage = async () => {
      try {
        const response = await fetch(`${apiBaseUrl}/public/lp/${slug}`);
        if (!response.ok) {
          if (response.status === 404) {
            setError('Pagina nao encontrada');
          } else {
            setError('Erro ao carregar pagina');
          }
          return;
        }
        const data = await response.json();
        setLandingPage(data);

        // Update page title
        if (data.seoTitle) {
          document.title = data.seoTitle;
        }

        // Add meta description
        if (data.seoDescription) {
          let metaDesc = document.querySelector('meta[name="description"]');
          if (!metaDesc) {
            metaDesc = document.createElement('meta');
            metaDesc.setAttribute('name', 'description');
            document.head.appendChild(metaDesc);
          }
          metaDesc.setAttribute('content', data.seoDescription);
        }

        // Add custom CSS
        if (data.customCss) {
          const style = document.createElement('style');
          style.innerHTML = data.customCss;
          document.head.appendChild(style);
        }

        // Add custom scripts
        if (data.customScripts) {
          const script = document.createElement('script');
          script.innerHTML = data.customScripts;
          document.body.appendChild(script);
        }

        // Track page view
        fetch(`${apiBaseUrl}/public/lp/${slug}/view`, { method: 'POST' }).catch(() => {});
      } catch (err) {
        setError('Erro ao carregar pagina');
      } finally {
        setIsLoading(false);
      }
    };

    if (slug) {
      fetchLandingPage();
    }
  }, [slug, apiBaseUrl]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-4xl font-bold mb-4">404</h1>
        <p className="text-muted-foreground">{error}</p>
      </div>
    );
  }

  if (!landingPage) {
    return null;
  }

  return <PuckRenderer data={landingPage.puckData} />;
}

export default LandingPagePublic;
