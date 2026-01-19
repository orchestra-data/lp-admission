import * as React from 'react';
import { cn } from '@/lib/utils';

interface ColorPickerProps {
  value: string;
  onChange: (color: string) => void;
  label?: string;
  presets?: string[];
}

const defaultPresets = [
  '#2563EB', // Blue (primary)
  '#EA580C', // Orange
  '#DC2626', // Red
  '#16A34A', // Green
  '#7C3AED', // Purple
  '#0891B2', // Cyan
  '#CA8A04', // Yellow
  '#1E293B', // Slate
  '#FFFFFF', // White
  '#000000', // Black
];

export function ColorPicker({
  value,
  onChange,
  label,
  presets = defaultPresets,
}: ColorPickerProps) {
  return (
    <div className="space-y-2">
      {label && <label className="text-sm font-medium">{label}</label>}

      <div className="flex items-center gap-2">
        <input
          type="color"
          value={value || '#2563EB'}
          onChange={(e) => onChange(e.target.value)}
          className="w-10 h-10 rounded cursor-pointer border-0"
        />
        <input
          type="text"
          value={value || ''}
          onChange={(e) => onChange(e.target.value)}
          placeholder="#2563EB"
          className="flex-1 h-10 px-3 rounded-md border border-input bg-background text-sm"
        />
      </div>

      <div className="flex flex-wrap gap-1">
        {presets.map((preset) => (
          <button
            key={preset}
            type="button"
            onClick={() => onChange(preset)}
            className={cn(
              'w-6 h-6 rounded border-2 transition-transform hover:scale-110',
              value === preset ? 'border-primary ring-2 ring-primary/30' : 'border-transparent'
            )}
            style={{ backgroundColor: preset }}
            title={preset}
          />
        ))}
      </div>
    </div>
  );
}

export default ColorPicker;
