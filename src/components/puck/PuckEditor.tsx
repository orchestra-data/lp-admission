import { Puck, type Data } from '@measured/puck';
import '@measured/puck/puck.css';
import { puckConfig } from './config';

interface PuckEditorProps {
  initialData?: Data;
  onPublish?: (data: Data) => void;
  onChange?: (data: Data) => void;
}

export function PuckEditor({ initialData, onPublish, onChange }: PuckEditorProps) {
  const defaultData: Data = {
    content: [],
    root: { props: {} },
  };

  return (
    <div className="h-screen">
      <Puck
        config={puckConfig}
        data={initialData || defaultData}
        onPublish={onPublish}
        onChange={onChange}
        headerTitle="Editor de Landing Page"
        headerPath="/"
      />
    </div>
  );
}

export default PuckEditor;
