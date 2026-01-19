import { Render, type Data } from '@measured/puck';
import { puckConfig } from './config';

interface PuckRendererProps {
  data: Data;
}

export function PuckRenderer({ data }: PuckRendererProps) {
  return <Render config={puckConfig} data={data} />;
}

export default PuckRenderer;
