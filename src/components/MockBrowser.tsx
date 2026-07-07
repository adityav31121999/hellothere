import { useState } from 'react';
import { SiteBuilderData } from '../types';
import { Eye, Code, ArrowUpRight, Zap, ArrowLeft, Mail, MapPin } from 'lucide-react';

interface MockBrowserProps {
  data: SiteBuilderData;
  onFocusSection?: (section: string) => void;
}

export default function MockBrowser({ data, onFocusSection }: MockBrowserProps) {
  const { profile, projects, blogs, style } = data;
  const [activePage, setActivePage] = useState<'home' | 'about' | 'blog' | 'code'>('home');
  const [activeBlogPostId, setActiveBlogPostId] = useState<string | null>(null);
  const [localTheme, setLocalTheme] = useState<'dark' | 'light'>('dark');

  const currentBg = localTheme === 'dark' ? style.bgDark : style.bgLight;
  const currentTextColor = localTheme === 'dark' ? '#f4f4f5' : '#18181b';
  const currentMutedColor = localTheme === 'dark' ? '#a1a1aa' : '#52525b';
  const currentSurface = localTheme === 'dark' ? '#18181b' : '#ffffff';
  const currentBorder = localTheme === 'dark' ? '#27272a' : '#e4e4e7';
  const currentGridColor = localTheme === 'dark' ? 'rgba(255, 255, 255, 0.035)' : '#e4e4e7';

  const completedProjects = projects.filter(p => p.status === 'completed');
  const wipProjects = projects.filter(p => p.status === 'wip');
  const conceptProjects = projects.filter(p => p.status === 'concept');

  const handleNavClick = (page: 'home' | 'about' | 'blog' | 'code') => {
    setActivePage(page);
    setActiveBlogPostId(null);
  };

  const handleBlogClick = (blogId: string) => {
    setActiveBlogPostId(blogId);
  };

  return (
    <div className="flex flex-col h-full bg-[#0b0f19] border border-slate-800 rounded-xl overflow-hidden shadow-2xl" id="mock-browser-wrapper">
      {/* Browser Top Chrome Header */}
      <div className="bg-[#0f131a] px-4 py-3 flex items-center justify-between border-b border-slate-800 select-none">
        <div className="flex items-center gap-1.5 shrink-0">
          <span className="w-3 h-3 rounded-full bg-[#ff5f56]"></span>
          <span className="w-3 h-3 rounded-full bg-[#ffbd2e]"></span>
          <span className="w-3 h-3 rounded-full bg-[#27c93f]"></span>
        </div>

        {/* URL Address Bar */}
        <div className="flex-1 max-w-md mx-4">
          <div className="bg-slate-950 border border-slate-800/80 rounded-lg py-1 px-3.5 text-[11px] text-slate-400 font-mono text-center flex items-center justify-center gap-1.5 truncate">
            <span className="text-slate-600">https://</span>
            <span className="text-slate-300">{profile.username || 'username'}.github.io</span>
            <span className="text-slate-300">
              {activeBlogPostId ? `/blog/${activeBlogPostId}.html` : `/${activePage}.html`}
            </span>
          </div>
        </div>

        {/* Live Preview Indicator badge */}
        <div className="flex items-center gap-2 shrink-0">
          <span className="text-[10px] font-bold font-mono bg-sky-500/10 text-sky-400 border border-sky-500/20 px-2 py-0.5 rounded-full flex items-center gap-1">
            <Eye className="w-3 h-3 animate-pulse" />
            LIVE PREVIEW
          </span>
        </div>
      </div>

      {/* Embedded Render Sandbox Container */}
      <div
        className="flex-1 overflow-y-auto relative select-text flex flex-col md:flex-row"
        style={{
          backgroundColor: currentBg,
          color: currentTextColor,
          backgroundImage: `radial-gradient(${currentGridColor} 0.8px, transparent 0.8px)`,
          backgroundSize: `${style.gridSpacing} ${style.gridSpacing}`,
          transition: 'background-color 0.2s ease, color 0.2s ease',
        }}
        id="browser-scrollable-content"
      >
        {/* Simulating Theme Toggle inside mock page */}
        <button
          onClick={() => setLocalTheme(localTheme === 'dark' ? 'light' : 'dark')}
          className="absolute top-4 right-4 border cursor-pointer font-sans shadow-md text-xs rounded-lg py-1.5 px-2.5 transition-all"
          style={{
            backgroundColor: currentSurface,
            color: currentTextColor,
            borderColor: currentBorder,
          }}
        >
          {localTheme === 'dark' ? '☀️ Light' : '🌙 Dark'}
        </button>

        {/* Simulated Sidebar */}
        <aside
          className="w-full md:w-56 shrink-0 p-6 flex flex-col gap-6 md:sticky md:top-0 md:h-full"
          style={{
            borderRight: `1px solid ${currentBorder}`,
            backgroundColor: localTheme === 'dark' ? 'rgba(24, 24, 27, 0.9)' : 'rgba(255, 255, 255, 0.9)',
            backdropFilter: 'blur(10px)',
          }}
        >
          <div className="brand-wrap">
            <div
              className="brand font-extrabold tracking-widest text-sm uppercase flex items-center gap-1.5"
              style={{ color: currentTextColor }}
            >
              <span>{profile.name.split(' ')[0]}</span>
              <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block shadow-[0_0_8px_rgba(34,197,94,0.8)] animate-pulse"></span>
            </div>
            <p className="text-xs mt-1 leading-snug" style={{ color: currentMutedColor }}>
              {profile.tagline}
            </p>
          </div>

          {/* Nav links */}
          <nav className="flex flex-row md:flex-col gap-2 flex-wrap md:flex-initial">
            {[
              { id: 'home', label: 'Home' },
              { id: 'about', label: 'About' },
              { id: 'blog', label: 'Blog' },
              { id: 'code', label: 'Code' },
            ].map((p) => {
              const isActive = activePage === p.id && !activeBlogPostId;
              return (
                <button
                  key={p.id}
                  onClick={() => handleNavClick(p.id as any)}
                  className={`flex-1 md:flex-initial text-left px-3 py-1.5 text-xs font-semibold rounded-lg border transition-all cursor-pointer ${
                    isActive
                      ? 'text-white'
                      : ''
                  }`}
                  style={{
                    background: isActive ? `linear-gradient(135deg, ${style.accentColor}, ${style.accentStrong})` : 'transparent',
                    borderColor: isActive ? 'transparent' : currentBorder,
                    color: isActive ? '#ffffff' : currentMutedColor,
                  }}
                >
                  {p.label}
                </button>
              );
            })}
          </nav>

          {/* Small Footer metadata inside side rail */}
          <div className="hidden md:block mt-auto text-[10px] font-mono" style={{ color: currentMutedColor }}>
            <div className="flex items-center gap-1"><MapPin className="w-3 h-3 text-sky-400" /> {profile.location}</div>
            <div className="mt-1 truncate" title={profile.emails[0]}><Mail className="w-3 h-3 text-indigo-400 inline" /> {profile.emails[0]}</div>
          </div>
        </aside>

        {/* Simulated main content panel */}
        <main className="flex-1 p-6 max-w-2xl mx-auto w-full">
          {activeBlogPostId ? (
            /* BLOG POST DETAIL VIEW */
            (() => {
              const bIndex = blogs.findIndex(b => b.id === activeBlogPostId);
              const blog = blogs[bIndex];
              if (!blog) return <p className="text-xs font-mono">Post not found.</p>;

              return (
                <article className="rounded-xl border p-5 shadow-lg space-y-4" style={{ backgroundColor: currentSurface, borderColor: currentBorder }}>
                  <button
                    onClick={() => setActiveBlogPostId(null)}
                    className="flex items-center gap-1.5 text-xs font-mono hover:underline cursor-pointer"
                    style={{ color: style.accentColor }}
                  >
                    <ArrowLeft className="w-3.5 h-3.5" /> BACK TO BLOG
                  </button>

                  <div>
                    <span className="text-[10px] uppercase tracking-widest font-mono font-bold" style={{ color: style.accentColor }}>
                      {blog.date}
                    </span>
                    <h1 className="text-2xl font-extrabold tracking-tight mt-1" style={{ color: currentTextColor }}>
                      {blog.title}
                    </h1>
                  </div>

                  <div
                    className="text-sm space-y-3 leading-relaxed font-sans blog-content-preview border-t pt-4"
                    style={{ borderColor: currentBorder }}
                    dangerouslySetInnerHTML={{ __html: blog.content }}
                  />
                </article>
              );
            })()
          ) : activePage === 'home' ? (
            /* HOME VIEW */
            <div className="space-y-6">
              {/* Hero pitch */}
              <section className="py-4 space-y-3">
                <span className="text-[10px] uppercase tracking-widest font-mono font-bold" style={{ color: style.accentColor }}>
                  Personal site
                </span>
                <h1 className="text-3xl font-black tracking-tight leading-none" style={{ color: currentTextColor }}>
                  Curious experiments, thoughtful notes, and public code.
                </h1>
                <p className="text-sm leading-relaxed" style={{ color: currentMutedColor }}>
                  I’m {profile.name}, {profile.bio}
                </p>
                <div className="flex gap-3 pt-2">
                  <button
                    onClick={() => handleNavClick('blog')}
                    className="text-xs font-bold py-2 px-4 rounded-lg cursor-pointer"
                    style={{
                      background: `linear-gradient(135deg, ${style.accentColor}, ${style.accentStrong})`,
                      color: 'white',
                    }}
                  >
                    Read the blog
                  </button>
                  <button
                    onClick={() => handleNavClick('code')}
                    className="text-xs font-bold py-2 px-4 rounded-lg border cursor-pointer"
                    style={{
                      backgroundColor: currentSurface,
                      borderColor: currentBorder,
                      color: currentTextColor,
                    }}
                  >
                    Browse my code
                  </button>
                </div>
              </section>

              {/* Recent posts */}
              <section className="border rounded-xl p-4 shadow-sm" style={{ backgroundColor: currentSurface, borderColor: currentBorder }}>
                <h3 className="text-xs uppercase font-mono font-bold tracking-wider mb-3" style={{ color: style.accentColor }}>
                  Recent posts
                </h3>
                <ul className="text-xs space-y-2 font-semibold">
                  {blogs.map((b) => (
                    <li key={b.id}>
                      <button
                        onClick={() => handleBlogClick(b.id)}
                        className="hover:underline text-left cursor-pointer transition-colors"
                        style={{ color: style.accentColor }}
                      >
                        {b.title}
                      </button>
                    </li>
                  ))}
                </ul>
              </section>
            </div>
          ) : activePage === 'about' ? (
            /* ABOUT ME VIEW */
            <div className="space-y-6">
              <section className="py-2 space-y-1 border-b pb-4" style={{ borderColor: currentBorder }}>
                <span className="text-[10px] uppercase tracking-widest font-mono font-bold" style={{ color: style.accentColor }}>
                  About Me
                </span>
                <h1 className="text-2xl font-extrabold tracking-tight" style={{ color: currentTextColor }}>
                  A bit about myself.
                </h1>
                <p className="text-xs" style={{ color: currentMutedColor }}>
                  {profile.tagline}
                </p>
              </section>

              <section className="border rounded-xl p-5 shadow-sm space-y-3" style={{ backgroundColor: currentSurface, borderColor: currentBorder }}>
                <h2 className="text-sm font-bold uppercase font-mono tracking-wider border-b pb-1.5" style={{ borderColor: currentBorder, color: currentTextColor }}>
                  Who I Am
                </h2>
                <p className="text-xs leading-relaxed" style={{ color: currentMutedColor }}>
                  {profile.bio}
                </p>
              </section>

              <section className="border rounded-xl p-5 shadow-sm space-y-4" style={{ backgroundColor: currentSurface, borderColor: currentBorder }}>
                <h2 className="text-sm font-bold uppercase font-mono tracking-wider border-b pb-1.5" style={{ borderColor: currentBorder, color: currentTextColor }}>
                  Contact &amp; Details
                </h2>
                <p className="text-xs leading-relaxed" style={{ color: currentMutedColor }}>
                  Feel free to reach out to me regarding any mathematics, physics, computation or open-source projects!
                </p>
                <div className="space-y-2 text-xs font-mono">
                  <div className="flex items-center gap-2">
                    <span className="font-bold" style={{ color: style.accentColor }}>Location:</span>
                    <span style={{ color: currentTextColor }}>{profile.location}</span>
                  </div>
                  {profile.emails.map((email, idx) => (
                    <div key={idx} className="flex items-center gap-2 flex-wrap">
                      <span className="font-bold" style={{ color: style.accentColor }}>Email:</span>
                      <a href={`mailto:${email}`} className="underline hover:opacity-85" style={{ color: currentTextColor }}>
                        {email}
                      </a>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          ) : activePage === 'blog' ? (
            /* BLOG HUB VIEW */
            <div className="space-y-6">
              <section className="py-2 space-y-1 border-b pb-4" style={{ borderColor: currentBorder }}>
                <span className="text-[10px] uppercase tracking-widest font-mono font-bold" style={{ color: style.accentColor }}>
                  Writing
                </span>
                <h1 className="text-2xl font-extrabold tracking-tight" style={{ color: currentTextColor }}>
                  Notes, thoughts, and experiments.
                </h1>
                <p className="text-xs" style={{ color: currentMutedColor }}>
                  These posts are written as simple HTML files so they stay easy to browse and publish.
                </p>
              </section>

              <div className="space-y-4">
                {blogs.length === 0 ? (
                  <p className="text-xs font-mono" style={{ color: currentMutedColor }}>No posts published yet.</p>
                ) : (
                  blogs.map((b) => (
                    <article
                      key={b.id}
                      onClick={() => handleBlogClick(b.id)}
                      className="border rounded-xl p-4 hover:translate-y-[-2px] transition-all cursor-pointer shadow-sm"
                      style={{ backgroundColor: currentSurface, borderColor: currentBorder }}
                    >
                      <h3 className="text-sm font-bold hover:underline mb-1" style={{ color: style.accentColor }}>
                        {b.title}
                      </h3>
                      <p className="text-xs" style={{ color: currentMutedColor }}>
                        {b.excerpt}
                      </p>
                    </article>
                  ))
                )}
              </div>
            </div>
          ) : (
            /* CODE HUB VIEW */
            <div className="space-y-6">
              <section className="py-2 space-y-1 border-b pb-4" style={{ borderColor: currentBorder }}>
                <span className="text-[10px] uppercase tracking-widest font-mono font-bold" style={{ color: style.accentColor }}>
                  Open source
                </span>
                <h1 className="text-2xl font-extrabold tracking-tight" style={{ color: currentTextColor }}>
                  Public repositories and experiments.
                </h1>
                <p className="text-xs" style={{ color: currentMutedColor }}>
                  Here are my active mathematical, physics, and computing experiments.
                </p>
              </section>

              {/* Completed Projects card list */}
              <section className="border rounded-xl p-4 shadow-sm space-y-3" style={{ backgroundColor: currentSurface, borderColor: currentBorder }}>
                <h2 className="text-xs font-bold uppercase font-mono tracking-wider border-b pb-1.5" style={{ borderColor: currentBorder, color: currentTextColor }}>
                  Projects
                </h2>
                <div className="space-y-3">
                  {completedProjects.map((p) => (
                    <div key={p.id} className="border-b last:border-b-0 pb-2 last:pb-0" style={{ borderColor: currentBorder }}>
                      <div className="flex items-center justify-between flex-wrap gap-2">
                        <span className="font-bold text-xs" style={{ color: style.accentColor }}>{p.name}</span>
                        <div className="flex gap-2">
                          {p.hardcoded && (
                            <span className="flex items-center gap-0.5 text-[8px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-1 rounded font-mono font-bold">
                              <Code className="w-2.5 h-2.5" /> HARDCODED
                            </span>
                          )}
                          {p.vibeCoded && (
                            <span className="flex items-center gap-0.5 text-[8px] bg-amber-500/10 text-amber-400 border border-amber-500/20 px-1 rounded font-mono font-bold">
                              <Zap className="w-2.5 h-2.5" /> VIBE
                            </span>
                          )}
                        </div>
                      </div>
                      <p className="text-xs mt-1" style={{ color: currentMutedColor }}>{p.description}</p>
                      {p.githubUrl && (
                        <a href={p.githubUrl} target="_blank" rel="noreferrer" className="text-[10px] font-mono text-indigo-400 hover:underline mt-1 inline-flex items-center gap-0.5">
                          Repository ↗ <ArrowUpRight className="w-3 h-3" />
                        </a>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            </div>
          )}
        </main>
      </div>

      {/* Interactive notification tip overlay at the absolute bottom */}
      <div className="bg-[#0c0e15] border-t border-slate-800 px-4 py-2.5 text-[10px] text-slate-400 flex items-center justify-between select-none shrink-0 font-mono">
        <span>SIMULATING: Multi-page Jekyll Site Layout</span>
        <span className="hidden sm:inline">💡 Try clicking the navigation tabs or individual blogs!</span>
      </div>
    </div>
  );
}
