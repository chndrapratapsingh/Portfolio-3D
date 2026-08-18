import React from 'react';
import { GraphicSettings } from '../../types';
import { Canvas } from '@react-three/fiber';
import { HeroObject } from './HeroObject';
import { soundManager } from '../../utils/sound';
import { Sparkles, Sliders, Eye, RefreshCw, Palette } from 'lucide-react';

interface Playground3DProps {
  settings: GraphicSettings;
  onUpdateSettings: (newSettings: Partial<GraphicSettings>) => void;
}

export const Playground3D: React.FC<Playground3DProps> = ({ settings, onUpdateSettings }) => {
  const geometries: { id: GraphicSettings['activeGeometry']; label: string }[] = [
    { id: 'torusKnot', label: 'Torus Knot' },
    { id: 'icosahedron', label: 'Icosahedron' },
    { id: 'dodecahedron', label: 'Dodecahedron' },
    { id: 'cyberCube', label: 'Cyber Cube' },
    { id: 'sphere', label: 'Sphere' },
  ];

  const colorPalettes = [
    { primary: '#6366f1', secondary: '#06b6d4', label: 'Indigo Cyan' },
    { primary: '#ec4899', secondary: '#8b5cf6', label: 'Pink Violet' },
    { primary: '#10b981', secondary: '#3b82f6', label: 'Emerald Blue' },
    { primary: '#f59e0b', secondary: '#ef4444', label: 'Amber Red' },
  ];

  return (
    <div id="lab" className="w-full rounded-2xl bg-slate-900/80 border border-slate-800 p-6 md:p-8 backdrop-blur-xl shadow-2xl relative overflow-hidden">
      {/* Glow highlight background */}
      <div
        className="absolute -top-24 -right-24 w-72 h-72 rounded-full blur-3xl opacity-20 pointer-events-none transition-all duration-500"
        style={{ backgroundColor: settings.primaryColor }}
      />

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-indigo-400 font-mono text-xs uppercase tracking-wider mb-1">
            <Sliders className="w-4 h-4" /> 3D Interactive Lab
          </div>
          <h3 className="text-2xl font-bold text-white">Customize 3D Graphics Engine</h3>
          <p className="text-sm text-slate-400">
            Tweak shaders, change geometry, adjust particle density, and test real-time WebGL rendering parameters.
          </p>
        </div>

        <button
          onClick={() => {
            soundManager.playClick();
            onUpdateSettings({
              activeGeometry: 'torusKnot',
              enableWireframe: false,
              enableParticles: true,
              autoRotate: true,
              primaryColor: '#6366f1',
              secondaryColor: '#06b6d4',
            });
          }}
          className="self-start md:self-auto flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-mono transition-colors"
        >
          <RefreshCw className="w-3.5 h-3.5" /> Reset Default
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left: 3D Viewport Box */}
        <div className="lg:col-span-7 h-[360px] md:h-[420px] rounded-xl bg-slate-950/90 border border-slate-800 relative overflow-hidden shadow-inner">
          <Canvas camera={{ position: [0, 0, 4.5], fov: 50 }}>
            <HeroObject settings={settings} />
          </Canvas>

          <div className="absolute bottom-3 left-3 bg-slate-900/90 px-3 py-1.5 rounded-md border border-slate-800 text-xs font-mono text-slate-300 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            Geometry: <span className="text-indigo-400 capitalize">{settings.activeGeometry}</span>
          </div>
        </div>

        {/* Right: Controls Panel */}
        <div className="lg:col-span-5 space-y-6">
          {/* Geometry Selectors */}
          <div>
            <label className="text-xs font-mono uppercase tracking-wider text-slate-400 block mb-2.5">
              Mesh Geometry
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {geometries.map((g) => (
                <button
                  key={g.id}
                  onClick={() => {
                    soundManager.playClick();
                    onUpdateSettings({ activeGeometry: g.id });
                  }}
                  className={`px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                    settings.activeGeometry === g.id
                      ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30 font-semibold'
                      : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700 border border-slate-700/50'
                  }`}
                >
                  {g.label}
                </button>
              ))}
            </div>
          </div>

          {/* Color Palettes */}
          <div>
            <label className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-2.5 flex items-center gap-1.5">
              <Palette className="w-3.5 h-3.5 text-indigo-400" /> Color Preset
            </label>
            <div className="grid grid-cols-2 gap-2">
              {colorPalettes.map((p) => (
                <button
                  key={p.label}
                  onClick={() => {
                    soundManager.playClick();
                    onUpdateSettings({ primaryColor: p.primary, secondaryColor: p.secondary });
                  }}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg border text-xs font-medium transition-all ${
                    settings.primaryColor === p.primary
                      ? 'border-indigo-500 bg-slate-800 text-white shadow'
                      : 'border-slate-800 bg-slate-900/60 text-slate-400 hover:bg-slate-800'
                  }`}
                >
                  <div className="flex items-center -space-x-1">
                    <span className="w-3.5 h-3.5 rounded-full" style={{ backgroundColor: p.primary }} />
                    <span className="w-3.5 h-3.5 rounded-full" style={{ backgroundColor: p.secondary }} />
                  </div>
                  <span>{p.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Toggles */}
          <div className="space-y-3 pt-2 border-t border-slate-800">
            <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-950/60 border border-slate-800">
              <span className="text-xs text-slate-300 font-medium flex items-center gap-2">
                <Eye className="w-4 h-4 text-indigo-400" /> Wireframe Shader
              </span>
              <button
                onClick={() => {
                  soundManager.playClick();
                  onUpdateSettings({ enableWireframe: !settings.enableWireframe });
                }}
                className={`w-11 h-6 rounded-full transition-colors relative p-0.5 ${
                  settings.enableWireframe ? 'bg-indigo-600' : 'bg-slate-700'
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-full bg-white transition-transform ${
                    settings.enableWireframe ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-950/60 border border-slate-800">
              <span className="text-xs text-slate-300 font-medium flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-cyan-400" /> Particle Sparkles
              </span>
              <button
                onClick={() => {
                  soundManager.playClick();
                  onUpdateSettings({ enableParticles: !settings.enableParticles });
                }}
                className={`w-11 h-6 rounded-full transition-colors relative p-0.5 ${
                  settings.enableParticles ? 'bg-indigo-600' : 'bg-slate-700'
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-full bg-white transition-transform ${
                    settings.enableParticles ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-950/60 border border-slate-800">
              <span className="text-xs text-slate-300 font-medium flex items-center gap-2">
                <RefreshCw className="w-4 h-4 text-purple-400" /> Continuous Auto-Rotation
              </span>
              <button
                onClick={() => {
                  soundManager.playClick();
                  onUpdateSettings({ autoRotate: !settings.autoRotate });
                }}
                className={`w-11 h-6 rounded-full transition-colors relative p-0.5 ${
                  settings.autoRotate ? 'bg-indigo-600' : 'bg-slate-700'
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-full bg-white transition-transform ${
                    settings.autoRotate ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
