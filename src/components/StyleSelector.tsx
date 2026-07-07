import { SiteStyleConfig } from '../types';
import { Palette, Maximize, Sliders, Sun, Moon } from 'lucide-react';

interface StyleSelectorProps {
  style: SiteStyleConfig;
  onChange: (newStyle: SiteStyleConfig) => void;
}

export default function StyleSelector({ style, onChange }: StyleSelectorProps) {
  const handleColorChange = (key: keyof SiteStyleConfig, val: string) => {
    onChange({ ...style, [key]: val });
  };

  const presets = [
    { name: 'Default Cyan', accent: '#38bdf8', strong: '#0ea5e9' },
    { name: 'Retro Amber', accent: '#fbbf24', strong: '#d97706' },
    { name: 'Emerald Moss', accent: '#34d399', strong: '#059669' },
    { name: 'Math Purple', accent: '#c084fc', strong: '#9333ea' },
    { name: 'Brutalist Rose', accent: '#f43f5e', strong: '#be123c' },
  ];

  return (
    <div className="space-y-5 animate-fade-in" id="style-selector-container">
      <div className="flex items-center gap-2 mb-1">
        <Palette className="w-4 h-4 text-sky-400" />
        <h3 className="text-sm font-semibold tracking-wider uppercase text-slate-400">Design Customizer</h3>
      </div>

      {/* Preset Accent Colors */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-4 space-y-3">
        <span className="text-xs font-bold text-slate-400 flex items-center gap-1.5">
          <Sliders className="w-3.5 h-3.5 text-sky-400" /> Theme Presets
        </span>
        <div className="flex flex-wrap gap-2">
          {presets.map((preset) => (
            <button
              key={preset.name}
              onClick={() => onChange({
                ...style,
                accentColor: preset.accent,
                accentStrong: preset.strong
              })}
              className={`text-xs px-2.5 py-1.5 rounded-lg border transition-all cursor-pointer ${
                style.accentColor === preset.accent
                  ? 'bg-sky-500/10 border-sky-400 text-sky-300'
                  : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              {preset.name}
            </button>
          ))}
        </div>
      </div>

      {/* Manual Colors */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-4 space-y-4">
        <span className="text-xs font-bold text-slate-400 flex items-center gap-1.5">
          🎨 Accent &amp; Canvas Settings
        </span>
        
        <div className="grid grid-cols-2 gap-4">
          {/* Accent Color picker */}
          <div className="space-y-1">
            <label className="text-[11px] font-bold text-slate-400 block font-mono">Accent Soft</label>
            <div className="flex items-center gap-2 bg-slate-950 p-1.5 rounded-lg border border-slate-800">
              <input
                type="color"
                value={style.accentColor}
                onChange={(e) => handleColorChange('accentColor', e.target.value)}
                className="w-8 h-8 rounded border-0 cursor-pointer bg-transparent"
              />
              <span className="text-xs font-mono text-slate-300 uppercase">{style.accentColor}</span>
            </div>
          </div>

          {/* Accent Strong picker */}
          <div className="space-y-1">
            <label className="text-[11px] font-bold text-slate-400 block font-mono">Accent Strong</label>
            <div className="flex items-center gap-2 bg-slate-950 p-1.5 rounded-lg border border-slate-800">
              <input
                type="color"
                value={style.accentStrong}
                onChange={(e) => handleColorChange('accentStrong', e.target.value)}
                className="w-8 h-8 rounded border-0 cursor-pointer bg-transparent"
              />
              <span className="text-xs font-mono text-slate-300 uppercase">{style.accentStrong}</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {/* Background Dark picker */}
          <div className="space-y-1">
            <label className="text-[11px] font-bold text-slate-400 block font-mono flex items-center gap-1"><Moon className="w-3 h-3 text-indigo-400" /> BG Dark</label>
            <div className="flex items-center gap-2 bg-slate-950 p-1.5 rounded-lg border border-slate-800">
              <input
                type="color"
                value={style.bgDark}
                onChange={(e) => handleColorChange('bgDark', e.target.value)}
                className="w-8 h-8 rounded border-0 cursor-pointer bg-transparent"
              />
              <span className="text-xs font-mono text-slate-300 uppercase">{style.bgDark}</span>
            </div>
          </div>

          {/* Background Light picker */}
          <div className="space-y-1">
            <label className="text-[11px] font-bold text-slate-400 block font-mono flex items-center gap-1"><Sun className="w-3 h-3 text-amber-400" /> BG Light</label>
            <div className="flex items-center gap-2 bg-slate-950 p-1.5 rounded-lg border border-slate-800">
              <input
                type="color"
                value={style.bgLight}
                onChange={(e) => handleColorChange('bgLight', e.target.value)}
                className="w-8 h-8 rounded border-0 cursor-pointer bg-transparent"
              />
              <span className="text-xs font-mono text-slate-300 uppercase">{style.bgLight}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Grid Spacing Slider */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-4 space-y-3">
        <div className="flex justify-between items-center text-xs font-bold text-slate-400">
          <span className="flex items-center gap-1.5"><Maximize className="w-3.5 h-3.5 text-sky-400" /> Grid Dot Spacing</span>
          <span className="font-mono text-sky-400">{style.gridSpacing}</span>
        </div>
        <input
          type="range"
          min="12"
          max="36"
          step="2"
          value={parseInt(style.gridSpacing) || 24}
          onChange={(e) => handleColorChange('gridSpacing', `${e.target.value}px`)}
          className="w-full accent-sky-400 bg-slate-950 rounded-lg appearance-none h-2 cursor-pointer border border-slate-800"
        />
        <div className="flex justify-between text-[10px] text-slate-500 font-mono">
          <span>Fine Grid (12px)</span>
          <span>Spacious Grid (36px)</span>
        </div>
      </div>
    </div>
  );
}
