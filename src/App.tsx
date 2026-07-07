import { useState, useEffect } from 'react';
import { initialSiteData } from './initialData';
import { SiteBuilderData } from './types';
import { motion, AnimatePresence } from 'motion/react';
import {
  Github,
  MapPin,
  Mail,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  Zap,
  Code,
  Copy,
  Check,
  Sun,
  Moon,
  ExternalLink,
  BookOpen,
  User,
  Compass
} from 'lucide-react';

const LOCAL_STORAGE_KEY = 'aditya_site_builder_data_v3';

export default function App() {
  const [data, setData] = useState<SiteBuilderData>(initialSiteData);
  const [activePage, setActivePage] = useState<'home' | 'about' | 'blog' | 'code'>('home');
  const [activeBlogPostId, setActiveBlogPostId] = useState<string | null>(null);
  const [localTheme, setLocalTheme] = useState<'dark' | 'light'>(() => {
    const savedTheme = localStorage.getItem('aditya_site_theme');
    return (savedTheme as 'dark' | 'light') || 'dark';
  });
  const [copiedEmail, setCopiedEmail] = useState<string | null>(null);

  // Load saved state from LocalStorage if user previously adjusted profile details
  useEffect(() => {
    try {
      const savedData = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (savedData) {
        const parsed = JSON.parse(savedData) as SiteBuilderData;
        setData(parsed);
      }
    } catch (e) {
      console.error('Failed to load saved state, using defaults', e);
    }
  }, []);

  // Save theme selection
  useEffect(() => {
    localStorage.setItem('aditya_site_theme', localTheme);
  }, [localTheme]);

  const { profile, projects, blogs, style } = data;

  const currentBg = localTheme === 'dark' ? style.bgDark : style.bgLight;
  const currentTextColor = localTheme === 'dark' ? '#f4f4f5' : '#18181b';
  const currentMutedColor = localTheme === 'dark' ? '#9ca3af' : '#4b5563';
  const currentSurface = localTheme === 'dark' ? '#11131c' : '#ffffff';
  const currentBorder = localTheme === 'dark' ? '#1e293b' : '#e2e8f0';
  const currentGridColor = localTheme === 'dark' ? 'rgba(255, 255, 255, 0.02)' : 'rgba(0, 0, 0, 0.02)';

  const completedProjects = projects.filter(p => p.status === 'completed');

  const handleNavClick = (page: 'home' | 'about' | 'blog' | 'code') => {
    setActivePage(page);
    setActiveBlogPostId(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBlogClick = (blogId: string) => {
    setActiveBlogPostId(blogId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const copyEmailToClipboard = (email: string) => {
    navigator.clipboard.writeText(email);
    setCopiedEmail(email);
    setTimeout(() => setCopiedEmail(null), 2000);
  };

  return (
    <div
      className="min-h-screen relative font-sans transition-colors duration-200"
      style={{
        backgroundColor: currentBg,
        color: currentTextColor,
        backgroundImage: `radial-gradient(${currentGridColor} 1px, transparent 1px)`,
        backgroundSize: `${style.gridSpacing} ${style.gridSpacing}`,
      }}
      id="portfolio-real-site"
    >
      {/* Absolute theme toggle */}
      <div className="absolute top-6 right-6 z-10">
        <button
          onClick={() => setLocalTheme(localTheme === 'dark' ? 'light' : 'dark')}
          className="p-2.5 rounded-xl border shadow-md transition-all duration-200 hover:scale-105 cursor-pointer flex items-center justify-center gap-2"
          style={{
            backgroundColor: currentSurface,
            borderColor: currentBorder,
            color: currentTextColor,
          }}
          title={localTheme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        >
          {localTheme === 'dark' ? (
            <>
              <Sun className="w-4 h-4 text-amber-400" />
              <span className="text-xs font-semibold pr-1">Light</span>
            </>
          ) : (
            <>
              <Moon className="w-4 h-4 text-indigo-500" />
              <span className="text-xs font-semibold pr-1">Dark</span>
            </>
          )}
        </button>
      </div>

      {/* Main Container Layout */}
      <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 py-12 md:py-24 min-h-screen flex flex-col md:flex-row gap-12 lg:gap-20">
        
        {/* Left Column: Fixed/Sticky Side Panel */}
        <aside className="w-full md:w-64 shrink-0 flex flex-col justify-between gap-8 md:sticky md:top-24 md:h-[calc(100vh-12rem)]">
          <div className="space-y-8">
            {/* Branding Logo & Title */}
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-extrabold tracking-widest uppercase font-display" style={{ color: currentTextColor }}>
                  {profile.name.split(' ')[0]}
                </span>
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(34,197,94,0.8)] animate-pulse"></span>
              </div>
              <p className="text-xs font-medium mt-1.5" style={{ color: currentMutedColor }}>
                {profile.tagline}
              </p>
            </div>

            {/* Custom Status Segment */}
            <div 
              className="p-3.5 rounded-xl border text-[11px] leading-relaxed font-mono"
              style={{ backgroundColor: currentSurface, borderColor: currentBorder }}
            >
              <div className="flex items-center gap-1.5 mb-1.5 text-xs font-semibold font-sans" style={{ color: style.accentColor }}>
                <Compass className="w-3.5 h-3.5" />
                <span>Currently</span>
              </div>
              <span style={{ color: currentTextColor }}>{profile.status}</span>
            </div>

            {/* Navigation Tabs */}
            <nav className="flex flex-row md:flex-col gap-1.5 p-1 md:p-0 rounded-xl bg-slate-950/5 md:bg-transparent overflow-x-auto md:overflow-visible shrink-0 select-none">
              {[
                { id: 'home', label: 'Home', icon: <User className="w-3.5 h-3.5" /> },
                { id: 'about', label: 'About', icon: <Sparkles className="w-3.5 h-3.5" /> },
                { id: 'blog', label: 'Blog', icon: <BookOpen className="w-3.5 h-3.5" /> },
                { id: 'code', label: 'Code', icon: <Code className="w-3.5 h-3.5" /> },
              ].map((p) => {
                const isActive = activePage === p.id && !activeBlogPostId;
                return (
                  <button
                    key={p.id}
                    onClick={() => handleNavClick(p.id as any)}
                    className="flex-1 md:flex-initial flex items-center justify-center md:justify-start gap-2 px-3.5 py-2 text-xs font-bold rounded-lg border transition-all duration-150 cursor-pointer text-center md:text-left shrink-0"
                    style={{
                      background: isActive ? `linear-gradient(135deg, ${style.accentColor}, ${style.accentStrong})` : 'transparent',
                      borderColor: isActive ? 'transparent' : currentBorder,
                      color: isActive ? '#ffffff' : currentMutedColor,
                    }}
                  >
                    {p.icon}
                    <span>{p.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Sidebar Footer Metadata */}
          <div className="text-[11px] font-mono space-y-2 mt-4 md:mt-0 pt-6 border-t md:border-t-0 border-dashed" style={{ borderColor: currentBorder, color: currentMutedColor }}>
            <div className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-emerald-500/80" /> 
              <span>{profile.location}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Github className="w-3.5 h-3.5 text-sky-500/80" />
              <a 
                href={`https://github.com/${profile.username}`} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hover:underline hover:text-sky-400"
              >
                github.com/{profile.username}
              </a>
            </div>
          </div>
        </aside>

        {/* Right Column: Main Pages Content Panel */}
        <main className="flex-1 min-w-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={activePage + (activeBlogPostId || '')}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="space-y-8"
            >
              {activeBlogPostId ? (
                /* BLOG POST DETAIL VIEW */
                (() => {
                  const blog = blogs.find(b => b.id === activeBlogPostId);
                  if (!blog) return <p className="text-xs font-mono">Post not found.</p>;

                  return (
                    <article 
                      className="rounded-2xl border p-6 md:p-8 shadow-xl space-y-6" 
                      style={{ backgroundColor: currentSurface, borderColor: currentBorder }}
                    >
                      <button
                        onClick={() => setActiveBlogPostId(null)}
                        className="flex items-center gap-2 text-xs font-bold font-mono hover:underline cursor-pointer tracking-wider"
                        style={{ color: style.accentColor }}
                      >
                        <ArrowLeft className="w-4 h-4" /> BACK TO BLOG
                      </button>

                      <div className="space-y-2">
                        <span className="text-xs uppercase tracking-widest font-mono font-bold" style={{ color: style.accentColor }}>
                          {blog.date}
                        </span>
                        <h1 className="text-2xl md:text-3.5xl font-extrabold tracking-tight" style={{ color: currentTextColor }}>
                          {blog.title}
                        </h1>
                      </div>

                      <div
                        className="text-sm md:text-base space-y-4 leading-relaxed font-sans blog-content-preview border-t pt-6"
                        style={{ borderColor: currentBorder }}
                        dangerouslySetInnerHTML={{ __html: blog.content }}
                      />
                    </article>
                  );
                })()
              ) : activePage === 'home' ? (
                /* HOME VIEW */
                <div className="space-y-10">
                  {/* Hero Intro Pitch */}
                  <section className="space-y-4 py-2">
                    <span className="text-xs uppercase tracking-widest font-mono font-bold" style={{ color: style.accentColor }}>
                      Welcome to my space
                    </span>
                    <h1 className="text-3xl sm:text-4.5xl font-black tracking-tight leading-none" style={{ color: currentTextColor }}>
                      Curious experiments, thoughtful notes, and public code.
                    </h1>
                    <p className="text-base sm:text-lg leading-relaxed max-w-2xl font-light" style={{ color: currentMutedColor }}>
                      I’m <strong className="font-semibold" style={{ color: currentTextColor }}>{profile.name}</strong>. {profile.bio}
                    </p>
                    
                    <div className="flex flex-wrap gap-3 pt-4 select-none">
                      <button
                        onClick={() => handleNavClick('blog')}
                        className="text-xs font-bold py-2.5 px-5 rounded-xl cursor-pointer shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-2"
                        style={{
                          background: `linear-gradient(135deg, ${style.accentColor}, ${style.accentStrong})`,
                          color: 'white',
                        }}
                      >
                        <span>Read the blog</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleNavClick('code')}
                        className="text-xs font-bold py-2.5 px-5 rounded-xl border cursor-pointer hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-2"
                        style={{
                          backgroundColor: currentSurface,
                          borderColor: currentBorder,
                          color: currentTextColor,
                        }}
                      >
                        <span>Browse my code</span>
                        <Code className="w-3.5 h-3.5 text-sky-500/80" />
                      </button>
                    </div>
                  </section>

                  {/* Highlights Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Recent posts */}
                    <section 
                      className="border rounded-2xl p-5 shadow-sm space-y-4" 
                      style={{ backgroundColor: currentSurface, borderColor: currentBorder }}
                    >
                      <div className="flex items-center gap-2">
                        <BookOpen className="w-4 h-4 text-emerald-400" />
                        <h3 className="text-xs uppercase font-mono font-bold tracking-wider" style={{ color: style.accentColor }}>
                          Recent Blog Posts
                        </h3>
                      </div>
                      <ul className="space-y-3">
                        {blogs.slice(0, 3).map((b) => (
                          <li key={b.id} className="group">
                            <button
                              onClick={() => handleBlogClick(b.id)}
                              className="text-left cursor-pointer text-xs md:text-sm font-semibold group-hover:underline group-hover:opacity-90 transition-all flex items-center gap-1.5"
                              style={{ color: style.accentColor }}
                            >
                              <span>{b.title}</span>
                              <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                            </button>
                            <p className="text-[11px] mt-0.5" style={{ color: currentMutedColor }}>{b.date}</p>
                          </li>
                        ))}
                      </ul>
                    </section>

                    {/* Scientific Focus tags */}
                    <section 
                      className="border rounded-2xl p-5 shadow-sm space-y-4" 
                      style={{ backgroundColor: currentSurface, borderColor: currentBorder }}
                    >
                      <div className="flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-amber-400" />
                        <h3 className="text-xs uppercase font-mono font-bold tracking-wider" style={{ color: style.accentColor }}>
                          Areas of Interest
                        </h3>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {profile.interests.map((interest, idx) => (
                          <span 
                            key={idx} 
                            className="text-[10px] font-mono font-semibold px-2.5 py-1 rounded-lg border"
                            style={{ backgroundColor: currentBg, borderColor: currentBorder, color: currentTextColor }}
                          >
                            {interest}
                          </span>
                        ))}
                      </div>
                    </section>
                  </div>
                </div>
              ) : activePage === 'about' ? (
                /* ABOUT ME VIEW */
                <div className="space-y-6">
                  <section className="py-2 space-y-1 border-b pb-4" style={{ borderColor: currentBorder }}>
                    <span className="text-xs uppercase tracking-widest font-mono font-bold" style={{ color: style.accentColor }}>
                      About Me
                    </span>
                    <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight" style={{ color: currentTextColor }}>
                      A bit about myself.
                    </h1>
                  </section>

                  <section className="border rounded-2xl p-6 shadow-sm space-y-3" style={{ backgroundColor: currentSurface, borderColor: currentBorder }}>
                    <h2 className="text-sm font-bold uppercase font-mono tracking-wider border-b pb-2" style={{ borderColor: currentBorder, color: currentTextColor }}>
                      Who I Am
                    </h2>
                    <p className="text-sm leading-relaxed" style={{ color: currentMutedColor }}>
                      {profile.bio}
                    </p>
                  </section>

                  <section className="border rounded-2xl p-6 shadow-sm space-y-5" style={{ backgroundColor: currentSurface, borderColor: currentBorder }}>
                    <h2 className="text-sm font-bold uppercase font-mono tracking-wider border-b pb-2" style={{ borderColor: currentBorder, color: currentTextColor }}>
                      Contact &amp; Collaboration
                    </h2>
                    <p className="text-xs leading-relaxed" style={{ color: currentMutedColor }}>
                      I am always excited to discuss computational math, physics, open-source projects, and new innovations. Feel free to copy or click to reach out.
                    </p>
                    <div className="space-y-3 text-xs md:text-sm font-mono">
                      {profile.emails.map((email, idx) => (
                        <div key={idx} className="flex items-center justify-between p-3 rounded-xl border gap-4" style={{ backgroundColor: currentBg, borderColor: currentBorder }}>
                          <div className="flex items-center gap-2 truncate">
                            <Mail className="w-4 h-4 text-sky-500/80 shrink-0" />
                            <a href={`mailto:${email}`} className="underline hover:opacity-85 truncate" style={{ color: currentTextColor }}>
                              {email}
                            </a>
                          </div>
                          <button
                            onClick={() => copyEmailToClipboard(email)}
                            className="p-1.5 hover:bg-slate-500/10 rounded-lg transition-colors cursor-pointer shrink-0"
                            title="Copy email to clipboard"
                          >
                            {copiedEmail === email ? (
                              <Check className="w-4 h-4 text-emerald-500" />
                            ) : (
                              <Copy className="w-4 h-4 text-slate-400 hover:text-slate-200" />
                            )}
                          </button>
                        </div>
                      ))}
                    </div>
                  </section>
                </div>
              ) : activePage === 'blog' ? (
                /* BLOG HUB VIEW */
                <div className="space-y-6">
                  <section className="py-2 space-y-1 border-b pb-4" style={{ borderColor: currentBorder }}>
                    <span className="text-xs uppercase tracking-widest font-mono font-bold" style={{ color: style.accentColor }}>
                      Writing
                    </span>
                    <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight" style={{ color: currentTextColor }}>
                      Notes, thoughts, and experiments.
                    </h1>
                  </section>

                  <div className="grid grid-cols-1 gap-4">
                    {blogs.length === 0 ? (
                      <p className="text-sm font-mono" style={{ color: currentMutedColor }}>No posts published yet.</p>
                    ) : (
                      blogs.map((b) => (
                        <article
                          key={b.id}
                          onClick={() => handleBlogClick(b.id)}
                          className="border rounded-2xl p-5 md:p-6 hover:-translate-y-0.5 hover:shadow-lg transition-all duration-200 cursor-pointer shadow-sm group"
                          style={{ backgroundColor: currentSurface, borderColor: currentBorder }}
                        >
                          <div className="flex items-center justify-between gap-4">
                            <span className="text-[10px] font-mono uppercase tracking-wider font-bold" style={{ color: style.accentColor }}>
                              {b.date}
                            </span>
                          </div>
                          <h3 className="text-base sm:text-lg font-bold group-hover:underline mt-1.5 mb-2" style={{ color: currentTextColor }}>
                            {b.title}
                          </h3>
                          <p className="text-xs sm:text-sm leading-relaxed" style={{ color: currentMutedColor }}>
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
                    <span className="text-xs uppercase tracking-widest font-mono font-bold" style={{ color: style.accentColor }}>
                      Open Source
                    </span>
                    <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight" style={{ color: currentTextColor }}>
                      Public repositories and experiments.
                    </h1>
                  </section>

                  {/* Completed Projects card list */}
                  <div className="grid grid-cols-1 gap-4">
                    {completedProjects.map((p) => (
                      <div 
                        key={p.id} 
                        className="border rounded-2xl p-5 md:p-6 space-y-3.5 shadow-sm" 
                        style={{ backgroundColor: currentSurface, borderColor: currentBorder }}
                      >
                        <div className="flex items-start justify-between gap-4 flex-wrap">
                          <div>
                            <span className="font-extrabold text-sm sm:text-base font-mono uppercase tracking-wide" style={{ color: style.accentColor }}>
                              {p.name}
                            </span>
                          </div>
                          <div className="flex gap-1.5 select-none">
                            {p.hardcoded && (
                              <span className="flex items-center gap-1 text-[9px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded-lg font-mono font-bold uppercase">
                                <Code className="w-2.5 h-2.5" /> HARDCODED
                              </span>
                            )}
                            {p.vibeCoded && (
                              <span className="flex items-center gap-1 text-[9px] bg-amber-500/10 text-amber-400 border border-amber-500/20 px-2 py-0.5 rounded-lg font-mono font-bold uppercase">
                                <Zap className="w-2.5 h-2.5" /> VIBE
                              </span>
                            )}
                          </div>
                        </div>

                        <p className="text-xs sm:text-sm leading-relaxed" style={{ color: currentMutedColor }}>
                          {p.description}
                        </p>

                        {p.githubUrl && (
                          <div className="pt-2 select-none">
                            <a 
                              href={p.githubUrl} 
                              target="_blank" 
                              rel="noreferrer" 
                              className="text-xs font-bold font-mono text-sky-400 hover:text-sky-300 hover:underline inline-flex items-center gap-1 bg-sky-500/5 px-2.5 py-1.5 rounded-lg border border-sky-500/10"
                            >
                              <span>Explore Code</span>
                              <ExternalLink className="w-3 h-3" />
                            </a>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </main>

      </div>
    </div>
  );
}
