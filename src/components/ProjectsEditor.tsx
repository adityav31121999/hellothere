import { useState } from 'react';
import { AdityaProject } from '../types';
import { Code, Plus, Trash2, ChevronDown, ChevronUp, Zap, HelpCircle } from 'lucide-react';

interface ProjectsEditorProps {
  projects: AdityaProject[];
  onChange: (projects: AdityaProject[]) => void;
}

export default function ProjectsEditor({ projects, onChange }: ProjectsEditorProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const handleToggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const handleUpdateProject = (id: string, updatedFields: Partial<AdityaProject>) => {
    onChange(
      projects.map((proj) => (proj.id === id ? { ...proj, ...updatedFields } : proj))
    );
  };

  const handleAddProject = () => {
    const newId = `proj-${Date.now()}`;
    const newProj: AdityaProject = {
      id: newId,
      name: 'new-experiment',
      description: 'An experimental computer science, math, or physics concept.',
      status: 'completed',
      vibeCoded: false,
    };
    onChange([...projects, newProj]);
    setExpandedId(newId); // auto expand
  };

  const handleDeleteProject = (id: string) => {
    onChange(projects.filter((proj) => proj.id !== id));
    if (expandedId === id) setExpandedId(null);
  };

  return (
    <div className="space-y-4 animate-fade-in" id="projects-editor-container">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <Code className="w-4 h-4 text-sky-400" />
          <h3 className="text-sm font-semibold tracking-wider uppercase text-slate-400 font-mono">My Projects</h3>
        </div>
        <button
          onClick={handleAddProject}
          className="flex items-center gap-1.5 bg-sky-600 hover:bg-sky-500 text-white text-xs px-3 py-1.5 rounded-lg transition-all font-semibold font-mono cursor-pointer"
          id="btn-add-project"
        >
          <Plus className="w-3.5 h-3.5" />
          ADD PROJECT
        </button>
      </div>

      <div className="space-y-2">
        {projects.length === 0 ? (
          <div className="text-center py-6 border border-slate-900 bg-slate-950 rounded-xl text-slate-500 text-sm">
            No projects added. Click "ADD PROJECT" to add experiments!
          </div>
        ) : (
          projects.map((proj, index) => {
            const isExpanded = expandedId === proj.id;
            return (
              <div
                key={proj.id}
                className={`border rounded-lg transition-all ${
                  isExpanded ? 'bg-slate-900/60 border-slate-700' : 'bg-slate-950/40 border-slate-800 hover:border-slate-700'
                }`}
                id={`project-card-${proj.id}`}
              >
                {/* Expandable Header */}
                <div
                  onClick={() => handleToggleExpand(proj.id)}
                  className="flex items-center justify-between p-3 cursor-pointer select-none"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <span className="text-xs font-mono text-slate-500 w-5">#{index + 1}</span>
                    <p className="font-bold text-slate-200 font-mono text-sm truncate">{proj.name}</p>
                    <div className="flex items-center gap-2">
                      {proj.hardcoded && (
                        <span className="flex items-center gap-0.5 text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-1.5 py-0.5 rounded font-mono font-bold">
                          <Code className="w-2.5 h-2.5" /> HARDCODED
                        </span>
                      )}
                      {proj.vibeCoded && (
                        <span className="flex items-center gap-0.5 text-[10px] bg-amber-500/10 text-amber-400 border border-amber-500/20 px-1.5 py-0.5 rounded font-mono font-bold">
                          <Zap className="w-2.5 h-2.5" /> VIBE
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteProject(proj.id);
                      }}
                      className="text-slate-500 hover:text-red-400 p-1 rounded hover:bg-slate-800/50 transition-colors"
                      title="Delete project"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                    {isExpanded ? (
                      <ChevronUp className="w-4 h-4 text-slate-400" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-slate-400" />
                    )}
                  </div>
                </div>

                {/* Expanded Fields Form */}
                {isExpanded && (
                  <div className="p-4 border-t border-slate-800 space-y-3 bg-slate-950/40">
                    {/* Project Name */}
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-slate-400">Project Name</label>
                      <input
                        type="text"
                        value={proj.name}
                        onChange={(e) => handleUpdateProject(proj.id, { name: e.target.value })}
                        className="w-full bg-slate-950 border border-slate-800 focus:border-sky-500/50 rounded-lg py-1.5 px-3 text-xs text-slate-200 outline-none transition-all font-mono"
                      />
                    </div>

                    {/* Description */}
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-slate-400">Description</label>
                      <textarea
                        value={proj.description}
                        onChange={(e) => handleUpdateProject(proj.id, { description: e.target.value })}
                        rows={3}
                        className="w-full bg-slate-950 border border-slate-800 focus:border-sky-500/50 rounded-lg p-2.5 text-xs text-slate-200 outline-none transition-all resize-y font-sans"
                      />
                    </div>

                    {/* Badges / Tags Checkboxes */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 py-1.5">
                      {/* Hardcoded Checkbox */}
                      <div>
                        <label className="flex items-center gap-2 cursor-pointer select-none">
                          <input
                            type="checkbox"
                            checked={!!proj.hardcoded}
                            onChange={(e) => handleUpdateProject(proj.id, { hardcoded: e.target.checked })}
                            className="rounded border-slate-800 bg-slate-950 text-emerald-500 focus:ring-emerald-500/30 w-4 h-4 cursor-pointer"
                          />
                          <span className="text-xs font-semibold text-slate-300 flex items-center gap-1">
                            <Code className="w-3.5 h-3.5 text-emerald-400" /> Hardcoded tag (written manually)
                          </span>
                        </label>
                      </div>

                      {/* Vibe Coded Checkbox */}
                      <div>
                        <label className="flex items-center gap-2 cursor-pointer select-none">
                          <input
                            type="checkbox"
                            checked={!!proj.vibeCoded}
                            onChange={(e) => handleUpdateProject(proj.id, { vibeCoded: e.target.checked })}
                            className="rounded border-slate-800 bg-slate-950 text-amber-500 focus:ring-amber-500/30 w-4 h-4 cursor-pointer"
                          />
                          <span className="text-xs font-semibold text-slate-300 flex items-center gap-1">
                            <Zap className="w-3.5 h-3.5 text-amber-400" /> Vibe Coded tag (built with AI/LLMs)
                          </span>
                        </label>
                      </div>
                    </div>

                    {/* URLs */}
                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <label className="text-xs font-semibold text-slate-400">GitHub Repository URL</label>
                        <input
                          type="text"
                          value={proj.githubUrl || ''}
                          onChange={(e) => handleUpdateProject(proj.id, { githubUrl: e.target.value })}
                          placeholder="https://github.com/..."
                          className="w-full bg-slate-950 border border-slate-800 focus:border-sky-500/50 rounded-lg py-1.5 px-3 text-xs text-slate-200 outline-none transition-all font-mono"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs font-semibold text-slate-400">Live Demo URL (optional)</label>
                        <input
                          type="text"
                          value={proj.demoUrl || ''}
                          onChange={(e) => handleUpdateProject(proj.id, { demoUrl: e.target.value })}
                          placeholder="https://..."
                          className="w-full bg-slate-950 border border-slate-800 focus:border-sky-500/50 rounded-lg py-1.5 px-3 text-xs text-slate-200 outline-none transition-all font-mono"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
