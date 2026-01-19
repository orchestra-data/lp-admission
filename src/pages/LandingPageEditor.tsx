import * as React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import type { Data } from '@measured/puck';
import { Loader2 } from 'lucide-react';
import { PuckEditor } from '@/components/puck/PuckEditor';
import {
  useLandingPage,
  useCreateLandingPage,
  useUpdateLandingPage,
} from '@/hooks/useLandingPages';
import { slugify } from '@/lib/utils';

interface LandingPageEditorProps {
  institution?: {
    id: string;
    name: string;
  };
  apiBaseUrl?: string;
}

export function LandingPageEditor({ apiBaseUrl = '/api' }: LandingPageEditorProps) {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isNew = !id;

  const { data: landingPage, isLoading } = useLandingPage(apiBaseUrl, id);
  const createMutation = useCreateLandingPage(apiBaseUrl);
  const updateMutation = useUpdateLandingPage(apiBaseUrl);

  const [hasChanges, setHasChanges] = React.useState(false);

  // Handle Puck publish (save)
  const handlePublish = async (data: Data) => {
    if (isNew) {
      // Prompt for name
      const name = prompt('Digite o nome da landing page:');
      if (!name) return;

      const slug = slugify(name);

      try {
        const created = await createMutation.mutateAsync({
          name,
          slug,
          puckData: data,
        });
        navigate(`/${created.id}/edit`, { replace: true });
      } catch (error) {
        console.error('Error creating landing page:', error);
        alert('Erro ao criar landing page');
      }
    } else {
      try {
        await updateMutation.mutateAsync({
          id,
          input: { puckData: data },
        });
        setHasChanges(false);
        alert('Landing page salva com sucesso!');
      } catch (error) {
        console.error('Error updating landing page:', error);
        alert('Erro ao salvar landing page');
      }
    }
  };

  // Handle changes
  const handleChange = () => {
    setHasChanges(true);
  };

  // Warn before leaving with unsaved changes
  React.useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (hasChanges) {
        e.preventDefault();
        e.returnValue = '';
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [hasChanges]);

  if (!isNew && isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  const initialData = landingPage?.puckData || {
    content: [],
    root: { props: {} },
  };

  return (
    <PuckEditor
      initialData={initialData as Data}
      onPublish={handlePublish}
      onChange={handleChange}
    />
  );
}

export default LandingPageEditor;
