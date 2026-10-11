import { Code, ExternalLink, Zap } from 'lucide-react';
import { SiteBuilderData } from '../types';

type CodePageProps = {
  projects: SiteBuilderData['projects'];
  currentTextColor: string;
  currentMutedColor: string;
  currentBorder: string;
  currentSurface: string;
  style: SiteBuilderData['style'];
};

export function CodePage({ projects, currentTextColor, currentMutedColor, currentBorder, currentSurface, style }: CodePageProps) {
  const completedProjects = projects.filter((project) => project.status === 'completed');

  return (
    <div className="space-y-6">
      <section className="py-2 space-y-1 border-b pb-4" style={{ borderColor: currentBorder }}>
        <span className="text-xs uppercase tracking-widest font-mono font-bold" style={{ color: style.accentColor }}>
          Open Source
        </span>
        <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight" style={{ color: currentTextColor }}>
          Public repositories and experiments.
        </h1>
      </section>

      <div className="grid grid-cols-1 gap-4">
        {completedProjects.map((project) => (
          <div key={project.id} className="border rounded-2xl p-5 md:p-6 space-y-3.5 shadow-sm" style={{ backgroundColor: currentSurface, borderColor: currentBorder }}>
            <div className="flex items-start justify-between gap-4 flex-wrap">
              <div>
                <span className="font-extrabold text-sm sm:text-base font-mono uppercase tracking-wide" style={{ color: style.accentColor }}>
                  {project.name}
                </span>
              </div>
              <div className="flex gap-1.5 select-none">
                {project.hardcoded && (
                  <span className="flex items-center gap-1 text-[9px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded-lg font-mono font-bold uppercase">
                    <Code className="w-2.5 h-2.5" /> HARDCODED
                  </span>
                )}
                {project.vibeCoded && (
                  <span className="flex items-center gap-1 text-[9px] bg-amber-500/10 text-amber-400 border border-amber-500/20 px-2 py-0.5 rounded-lg font-mono font-bold uppercase">
                    <Zap className="w-2.5 h-2.5" /> VIBE
                  </span>
                )}
              </div>
            </div>

            <p className="text-xs sm:text-sm leading-relaxed" style={{ color: currentMutedColor }}>
              {project.description}
            </p>

            {project.githubUrl && (
              <div className="pt-2 select-none">
                <a href={project.githubUrl} target="_blank" rel="noreferrer" className="text-xs font-bold font-mono text-sky-400 hover:text-sky-300 hover:underline inline-flex items-center gap-1 bg-sky-500/5 px-2.5 py-1.5 rounded-lg border border-sky-500/10">
                  <span>Explore Code</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
