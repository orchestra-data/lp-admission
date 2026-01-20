import * as React from 'react';
import { Puck, Render, type Data } from '@measured/puck';
import '@measured/puck/puck.css';
import { puckConfig } from './config';
import { AIGeneratorPanel } from '@/components/ai/AIGeneratorPanel';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Sparkles, ChevronLeft, FileText, Eye, Upload, ExternalLink, Copy, Check } from 'lucide-react';
import { templates, getTemplate, prepareTemplateData } from '@/lib/templates';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface PuckEditorProps {
  initialData?: Data;
  onPublish?: (data: Data) => void;
  onChange?: (data: Data) => void;
  landingPageId?: string;
  landingPageSlug?: string;
}

export function PuckEditor({
  initialData,
  onPublish,
  onChange,
  landingPageId,
  landingPageSlug,
}: PuckEditorProps) {
  const [showAIPanel, setShowAIPanel] = React.useState(false);
  const [editorData, setEditorData] = React.useState<Data>(() => {
    if (initialData && initialData.content && initialData.content.length > 0) {
      return prepareTemplateData(initialData);
    }
    return { content: [], root: { props: {} } };
  });
  const [key, setKey] = React.useState(0);

  // Modal states
  const [showPreview, setShowPreview] = React.useState(false);
  const [showPublish, setShowPublish] = React.useState(false);
  const [isPublishing, setIsPublishing] = React.useState(false);
  const [publishSuccess, setPublishSuccess] = React.useState(false);
  const [slug, setSlug] = React.useState(landingPageSlug || '');
  const [copied, setCopied] = React.useState(false);

  const defaultData: Data = {
    content: [],
    root: { props: {} },
  };

  const handleAIGenerate = (data: Data) => {
    const preparedData = prepareTemplateData(data);
    setEditorData(preparedData);
    setKey(prev => prev + 1);
    setShowAIPanel(false);
  };

  const handleTemplateSelect = (templateKey: string) => {
    try {
      const templateData = getTemplate(templateKey as keyof typeof templates);
      setEditorData(templateData);
      setKey(prev => prev + 1);
    } catch (e) {
      console.error('Template not found:', templateKey);
    }
  };

  const handleChange = (data: Data) => {
    setEditorData(data);
    onChange?.(data);
  };

  const handlePublish = async () => {
    setIsPublishing(true);
    try {
      // Chama a API para publicar
      const response = await fetch(`/api/landing-pages/${landingPageId || 'new'}`, {
        method: landingPageId ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          puckData: editorData,
          slug: slug,
          status: 'published',
          publishedAt: new Date().toISOString(),
        }),
      });

      if (response.ok) {
        setPublishSuccess(true);
        onPublish?.(editorData);
      }
    } catch (error) {
      console.error('Erro ao publicar:', error);
    } finally {
      setIsPublishing(false);
    }
  };

  const publicUrl = `${window.location.origin}/apply/${slug}`;

  const copyUrl = () => {
    navigator.clipboard.writeText(publicUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="h-screen flex">
      {/* AI Panel (Sidebar) */}
      {showAIPanel && (
        <div className="w-96 border-r bg-background flex flex-col">
          <div className="p-3 border-b flex items-center gap-2">
            <Button variant="ghost" size="sm" onClick={() => setShowAIPanel(false)}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span className="font-medium">Gerador com IA</span>
          </div>
          <div className="flex-1 overflow-hidden">
            <AIGeneratorPanel
              onGenerate={handleAIGenerate}
              onClose={() => setShowAIPanel(false)}
            />
          </div>
        </div>
      )}

      {/* Puck Editor */}
      <div className="flex-1 h-full">
        <Puck
          key={key}
          config={puckConfig}
          data={editorData || defaultData}
          onPublish={() => setShowPublish(true)}
          onChange={handleChange}
          headerTitle="Editor de Landing Page"
          headerPath="/"
          overrides={{
            headerActions: () => (
              <div className="flex items-center gap-2">
                {/* Templates Dropdown */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm">
                      <FileText className="h-4 w-4 mr-2" />
                      Templates
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    {Object.entries(templates).map(([key, template]) => (
                      <DropdownMenuItem key={key} onClick={() => handleTemplateSelect(key)}>
                        <div>
                          <div className="font-medium">{template.name}</div>
                          <div className="text-xs text-muted-foreground">{template.description}</div>
                        </div>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>

                {/* AI Generator Button */}
                <Button
                  variant={showAIPanel ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setShowAIPanel(!showAIPanel)}
                >
                  <Sparkles className="h-4 w-4 mr-2" />
                  Gerar com IA
                </Button>

                {/* Preview Button */}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowPreview(true)}
                >
                  <Eye className="h-4 w-4 mr-2" />
                  Preview
                </Button>

                {/* Publish Button */}
                <Button
                  size="sm"
                  onClick={() => setShowPublish(true)}
                >
                  <Upload className="h-4 w-4 mr-2" />
                  Publicar
                </Button>
              </div>
            ),
          }}
        />
      </div>

      {/* Preview Modal */}
      <Dialog open={showPreview} onOpenChange={setShowPreview}>
        <DialogContent className="max-w-[95vw] w-[1400px] h-[90vh] p-0 gap-0">
          <DialogHeader className="p-4 border-b">
            <DialogTitle className="flex items-center gap-2">
              <Eye className="h-5 w-5" />
              Preview da Landing Page
            </DialogTitle>
            <DialogDescription>
              Visualize como sua landing page ficara antes de publicar
            </DialogDescription>
          </DialogHeader>
          <div className="flex-1 overflow-auto bg-gray-100">
            <div className="min-h-full bg-white mx-auto max-w-[1200px] shadow-xl">
              <Render config={puckConfig} data={editorData || defaultData} />
            </div>
          </div>
          <DialogFooter className="p-4 border-t">
            <Button variant="outline" onClick={() => setShowPreview(false)}>
              Fechar
            </Button>
            <Button onClick={() => { setShowPreview(false); setShowPublish(true); }}>
              <Upload className="h-4 w-4 mr-2" />
              Publicar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Publish Modal */}
      <Dialog open={showPublish} onOpenChange={(open) => {
        setShowPublish(open);
        if (!open) {
          setPublishSuccess(false);
        }
      }}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Upload className="h-5 w-5" />
              {publishSuccess ? 'Publicado com Sucesso!' : 'Publicar Landing Page'}
            </DialogTitle>
            <DialogDescription>
              {publishSuccess
                ? 'Sua landing page esta no ar e pronta para receber visitantes.'
                : 'Configure as opcoes de publicacao da sua landing page.'
              }
            </DialogDescription>
          </DialogHeader>

          {!publishSuccess ? (
            <>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="slug">URL da Landing Page</Label>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">/apply/</span>
                    <Input
                      id="slug"
                      value={slug}
                      onChange={(e) => setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '-'))}
                      placeholder="minha-landing-page"
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    URL completa: {publicUrl}
                  </p>
                </div>

                {/* Preview pequeno */}
                <div className="space-y-2">
                  <Label>Preview</Label>
                  <div className="border rounded-lg overflow-hidden h-48 bg-gray-50">
                    <div className="transform scale-[0.25] origin-top-left w-[400%] h-[400%]">
                      <Render config={puckConfig} data={editorData || defaultData} />
                    </div>
                  </div>
                </div>
              </div>

              <DialogFooter>
                <Button variant="outline" onClick={() => setShowPublish(false)}>
                  Cancelar
                </Button>
                <Button onClick={handlePublish} disabled={isPublishing || !slug}>
                  {isPublishing ? (
                    <>
                      <span className="animate-spin mr-2">⏳</span>
                      Publicando...
                    </>
                  ) : (
                    <>
                      <Upload className="h-4 w-4 mr-2" />
                      Publicar Agora
                    </>
                  )}
                </Button>
              </DialogFooter>
            </>
          ) : (
            <>
              <div className="space-y-4 py-4">
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
                  <div className="text-4xl mb-2">✓</div>
                  <p className="text-green-800 font-medium">Landing Page Publicada!</p>
                </div>

                <div className="space-y-2">
                  <Label>URL Publica</Label>
                  <div className="flex items-center gap-2">
                    <Input value={publicUrl} readOnly className="flex-1" />
                    <Button variant="outline" size="icon" onClick={copyUrl}>
                      {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                    </Button>
                    <Button variant="outline" size="icon" asChild>
                      <a href={publicUrl} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    </Button>
                  </div>
                </div>
              </div>

              <DialogFooter>
                <Button variant="outline" onClick={() => setShowPublish(false)}>
                  Fechar
                </Button>
                <Button asChild>
                  <a href={publicUrl} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Abrir Landing Page
                  </a>
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default PuckEditor;
