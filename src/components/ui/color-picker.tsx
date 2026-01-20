import * as React from 'react';
import { cn } from '@/lib/utils';

interface ColorPickerProps {
  value: string;
  onChange: (color: string) => void;
  label?: string;
  presets?: ColorPreset[];
}

interface ColorPreset {
  name: string;
  value: string;
}

// Cores baseadas no Orchestra Design System
const orchestraColors: ColorPreset[] = [
  // Cores primárias Orchestra
  { name: 'Azul Orchestra', value: '#3B9EEB' },
  { name: 'Azul Escuro', value: '#2563EB' },
  { name: 'Azul Royal', value: '#1E40AF' },
  { name: 'Azul Navy', value: '#1E3A8A' },

  // Roxos e Violetas
  { name: 'Indigo', value: '#4F46E5' },
  { name: 'Violeta', value: '#7C3AED' },
  { name: 'Roxo', value: '#9333EA' },
  { name: 'Fuchsia', value: '#C026D3' },

  // Cores quentes
  { name: 'Vermelho', value: '#DC2626' },
  { name: 'Rosa', value: '#DB2777' },
  { name: 'Laranja', value: '#EA580C' },
  { name: 'Amber', value: '#D97706' },

  // Cores neutras quentes
  { name: 'Amarelo', value: '#CA8A04' },
  { name: 'Lima', value: '#65A30D' },

  // Verdes
  { name: 'Verde', value: '#16A34A' },
  { name: 'Esmeralda', value: '#059669' },

  // Cores frias
  { name: 'Teal', value: '#0D9488' },
  { name: 'Ciano', value: '#0891B2' },
  { name: 'Sky', value: '#0284C7' },

  // Neutros
  { name: 'Preto', value: '#000000' },
  { name: 'Slate 900', value: '#0F172A' },
  { name: 'Slate 700', value: '#334155' },
  { name: 'Slate 500', value: '#64748B' },
  { name: 'Slate 300', value: '#CBD5E1' },
  { name: 'Branco', value: '#FFFFFF' },
];

export function ColorPicker({
  value,
  onChange,
  label,
  presets = orchestraColors,
}: ColorPickerProps) {
  const [inputValue, setInputValue] = React.useState(value || '#2563EB');

  React.useEffect(() => {
    setInputValue(value || '#2563EB');
  }, [value]);

  const handleInputChange = (newValue: string) => {
    setInputValue(newValue);
    // Aplica apenas se for um hex válido
    if (/^#[0-9A-Fa-f]{6}$/.test(newValue)) {
      onChange(newValue);
    }
  };

  const handleColorPickerChange = (newValue: string) => {
    setInputValue(newValue);
    onChange(newValue);
  };

  // Agrupa cores por categoria
  const colorCategories = [
    { name: 'Azuis', colors: presets.slice(0, 4) },
    { name: 'Roxos', colors: presets.slice(4, 8) },
    { name: 'Quentes', colors: presets.slice(8, 14) },
    { name: 'Verdes', colors: presets.slice(14, 18) },
    { name: 'Neutros', colors: presets.slice(18) },
  ];

  return (
    <div className="space-y-3">
      {label && <label className="text-sm font-medium">{label}</label>}

      {/* Cor atual + input */}
      <div className="flex items-center gap-2">
        <div className="relative">
          <input
            type="color"
            value={inputValue}
            onChange={(e) => handleColorPickerChange(e.target.value)}
            className="w-12 h-12 rounded-lg cursor-pointer border-2 border-gray-200 hover:border-gray-300"
            style={{ padding: 0 }}
          />
        </div>
        <div className="flex-1">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => handleInputChange(e.target.value)}
            placeholder="#2563EB"
            className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm font-mono uppercase"
          />
        </div>
      </div>

      {/* Paleta de cores */}
      <div className="space-y-2">
        {colorCategories.map((category) => (
          <div key={category.name}>
            <p className="text-xs text-muted-foreground mb-1">{category.name}</p>
            <div className="flex flex-wrap gap-1">
              {category.colors.map((preset) => (
                <button
                  key={preset.value}
                  type="button"
                  onClick={() => {
                    onChange(preset.value);
                    setInputValue(preset.value);
                  }}
                  className={cn(
                    'w-7 h-7 rounded-md border-2 transition-all hover:scale-110',
                    value === preset.value
                      ? 'border-primary ring-2 ring-primary/50 ring-offset-1'
                      : 'border-gray-200 hover:border-gray-400'
                  )}
                  style={{ backgroundColor: preset.value }}
                  title={`${preset.name} (${preset.value})`}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Componente adaptado para usar como field customizado no Puck
export function PuckColorField({
  value,
  onChange,
  field,
}: {
  value: string;
  onChange: (value: string) => void;
  field: { label?: string };
}) {
  return (
    <ColorPicker
      value={value || '#2563EB'}
      onChange={onChange}
      label={field.label}
    />
  );
}

export default ColorPicker;
