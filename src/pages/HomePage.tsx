import { ArrowRight, Code, ExternalLink } from 'lucide-react';
import { SiteBuilderData } from '../types';

type HomePageProps = {
  profile: SiteBuilderData['profile'];
  projects: SiteBuilderData['projects'];
  blogs: SiteBuilderData['blogs'];
  style: SiteBuilderData['style'];
  currentTextColor: string;
  currentMutedColor: string;
  currentBorder: string;
  currentBg: string;
  onNav: (page: 'blog' | 'code') => void;
  onBlogClick: (blogId: string) => void;
};

export function HomePage({
  profile,
  projects,
  blogs,
  style,
  currentTextColor,
  currentMutedColor,
  currentBorder,
  currentBg,
  onNav,
  onBlogClick,
}: HomePageProps) {
  const completedProjects = projects.filter((project) => project.status === 'completed');

  return (
    <div className="space-y-10">
      <section className="space-y-5 pt-5 md:pt-10 pb-2">
        <span className="text-[10px] uppercase tracking-wider font-mono font-bold" style={{ color: style.accentStrong }}>
          Personal research notebook
        </span>
        <h1 className="font-display text-4xl sm:text-5xl leading-[1.08] max-w-2xl" style={{ color: currentTextColor }}>
          Curious experiments,<br className="hidden sm:block" /> thoughtful notes, and public code.
        </h1>
        <p className="text-sm sm:text-base leading-relaxed max-w-2xl" style={{ color: currentMutedColor }}>
          I’m <strong className="font-semibold" style={{ color: currentTextColor }}>{profile.name}</strong>. I explore computation across mathematics, physics, machine learning, and systems.
        </p>

        <div className="flex flex-wrap gap-5 pt-2 select-none">
          <button
            onClick={() => onNav('blog')}
            className="text-xs font-bold py-2 cursor-pointer transition-colors flex items-center gap-2 hover:underline underline-offset-4"
            style={{ color: currentTextColor }}
          >
            <span>Read the blog</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => onNav('code')}
            className="text-xs font-bold py-2 cursor-pointer transition-colors flex items-center gap-2 hover:underline underline-offset-4"
            style={{ color: currentMutedColor }}
          >
            <span>Browse my code</span>
            <Code className="w-3.5 h-3.5" />
          </button>
        </div>
      </section>

      <section aria-labelledby="recent-work-heading">
        <div className="flex items-center justify-between border-b pb-3 mb-1" style={{ borderColor: currentBorder }}>
          <h2 id="recent-work-heading" className="text-[10px] uppercase tracking-wider font-mono font-bold" style={{ color: currentMutedColor }}>
            Recent work
          </h2>
          <button onClick={() => onNav('code')} className="text-[10px] font-mono hover:underline flex items-center gap-1 cursor-pointer" style={{ color: currentMutedColor }}>
            {String(completedProjects.length).padStart(2, '0')} projects <ArrowRight className="w-3 h-3" />
          </button>
        </div>
        {completedProjects.length ? (
          completedProjects.slice(0, 3).map((project, index) => (
            <article key={project.id} className="grid grid-cols-[2rem_minmax(0,1fr)] sm:grid-cols-[2.5rem_minmax(0,1fr)_auto] gap-x-3 py-5 border-b" style={{ borderColor: currentBorder }}>
              <span className="font-mono text-[11px] pt-1" style={{ color: style.accentStrong }}>{String(index + 1).padStart(2, '0')}</span>
              <div className="min-w-0">
                <h3 className="font-mono font-bold uppercase text-sm" style={{ color: currentTextColor }}>{project.name}</h3>
                <p className="text-xs leading-relaxed mt-1.5 max-w-xl" style={{ color: currentMutedColor }}>{project.description}</p>
                {project.name.toLowerCase().includes('float12') && (
                  <div className="grid grid-cols-[1fr_5fr_6fr] max-w-sm mt-4 border font-mono text-[9px] text-center" style={{ borderColor: currentBorder }} aria-label="12-bit format: 1 sign bit, 5 exponent bits, 6 mantissa bits">
                    <div className="p-2 border-r" style={{ borderColor: currentBorder }}><span className="block" style={{ color: currentMutedColor }}>SIGN</span><strong style={{ color: style.accentStrong }}>1b</strong></div>
                    <div className="p-2 border-r" style={{ borderColor: currentBorder }}><span className="block" style={{ color: currentMutedColor }}>EXPONENT</span><strong style={{ color: '#2563eb' }}>5b</strong></div>
                    <div className="p-2"><span className="block" style={{ color: currentMutedColor }}>MANTISSA</span><strong style={{ color: '#7c3aed' }}>6b</strong></div>
                  </div>
                )}
                <div className="flex flex-wrap gap-x-3 gap-y-1 mt-3 text-[9px] font-mono uppercase" style={{ color: currentMutedColor }}>
                  <span>{project.status}</span><span>Open source</span>
                  {project.hardcoded && <span style={{ color: '#059669' }}>Handwritten</span>}
                </div>
              </div>
              {project.githubUrl && (
                <a href={project.githubUrl} target="_blank" rel="noreferrer" aria-label={`Explore ${project.name} on GitHub`} className="hidden sm:inline-flex items-center gap-1 self-start text-[10px] font-mono hover:underline" style={{ color: currentMutedColor }}>
                  Explore <ExternalLink className="w-3 h-3" />
                </a>
              )}
            </article>
          ))
        ) : (
          <p className="py-5 text-xs" style={{ color: currentMutedColor }}>No projects published yet.</p>
        )}
      </section>

      <section aria-labelledby="recent-notes-heading">
        <div className="flex items-center justify-between border-b pb-3 mb-1" style={{ borderColor: currentBorder }}>
          <h2 id="recent-notes-heading" className="text-[10px] uppercase tracking-wider font-mono font-bold" style={{ color: currentMutedColor }}>
            Recent notes
          </h2>
          <button onClick={() => onNav('blog')} className="text-[10px] font-mono hover:underline flex items-center gap-1 cursor-pointer" style={{ color: currentMutedColor }}>
            {String(blogs.length).padStart(2, '0')} notes <ArrowRight className="w-3 h-3" />
          </button>
        </div>
        {blogs.length ? (
          blogs.slice(0, 4).map((blog) => (
            <button key={blog.id} onClick={() => onBlogClick(blog.id)} className="group w-full text-left grid grid-cols-1 sm:grid-cols-[7.5rem_minmax(0,1fr)_auto] gap-1 sm:gap-4 items-center py-4 border-b cursor-pointer" style={{ borderColor: currentBorder }}>
              <span className="text-[9px] font-mono uppercase" style={{ color: style.accentStrong }}>{blog.date}</span>
              <span className="text-xs sm:text-sm font-medium group-hover:underline" style={{ color: currentTextColor }}>{blog.title}</span>
              <ArrowRight className="hidden sm:block w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" style={{ color: currentMutedColor }} />
            </button>
          ))
        ) : (
          <p className="py-5 text-xs" style={{ color: currentMutedColor }}>No notes published yet.</p>
        )}
      </section>
    </div>
  );
}
