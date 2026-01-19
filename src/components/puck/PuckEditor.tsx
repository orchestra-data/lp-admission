import * as React from 'react';
import { Puck, type Data } from '@measured/puck';
import '@measured/puck/puck.css';
import { puckConfig } from './config';
import { AIGeneratorPanel } from '@/components/ai/AIGeneratorPanel';
import { Button } from '@/components/ui/button';
import { Sparkles, ChevronLeft, FileText } from 'lucide-react';
import { templates } from '@/lib/templates';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface PuckEditorProps {
  initialData?: Data;
  onPublish?: (data: Data) => void;
  onChange?: (data: Data) => void;
}

export function PuckEditor({ initialData, onPublish, onChange }: PuckEditorProps) {
  const [showAIPanel, setShowAIPanel] = React.useState(false);
  const [editorData, setEditorData] = React.useState<Data>(
    initialData || { content: [], root: { props: {} } }
  );
  const [key, setKey] = React.useState(0); // Force re-render when data changes externally

  const defaultData: Data = {
    content: [],
    root: { props: {} },
  };

  const handleAIGenerate = (data: Data) => {
    setEditorData(data);
    setKey(prev => prev + 1); // Force Puck to re-render with new data
    setShowAIPanel(false);
  };

  const handleTemplateSelect = (templateKey: string) => {
    const template = templates[templateKey as keyof typeof templates];
    if (template) {
      setEditorData(template.data);
      setKey(prev => prev + 1);
    }
  };

  const handleChange = (data: Data) => {
    setEditorData(data);
    onChange?.(data);
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
          onPublish={onPublish}
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
              </div>
            ),
          }}
        />
      </div>
    </div>
  );
}

export default PuckEditor;
