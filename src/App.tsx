import { useState, useEffect } from 'react';
import { initialSiteData } from './initialData';
import { SiteBuilderData } from './types';
import { motion, AnimatePresence } from 'motion/react';
import { Github, MapPin, Sun, Moon, BookOpen, Code, User, Sparkles, Brain } from 'lucide-react';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { BlogPage } from './pages/BlogPage';
import { CodePage } from './pages/CodePage';
import { LocalAIsePage } from './pages/LocalAIsePage';
import { blogPageRegistry } from './pages/blogs';

const LOCAL_STORAGE_KEY = 'aditya_site_builder_data_v3';

export default function App() {
  const [data, setData] = useState<SiteBuilderData>(initialSiteData);
  const [activePage, setActivePage] = useState<'about' | 'home' | 'blog' | 'code' | 'localAIse'>('home');
  const [activeBlogPostId, setActiveBlogPostId] = useState<string | null>(null);
  const [localTheme, setLocalTheme] = useState<'dark' | 'light'>(() => {
    const savedTheme = localStorage.getItem('aditya_site_theme');
    return (savedTheme as 'dark' | 'light') || 'light';
  });
  const [copiedEmail, setCopiedEmail] = useState<string | null>(null);

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

  useEffect(() => {
    localStorage.setItem('aditya_site_theme', localTheme);
  }, [localTheme]);

  const { profile, projects, blogs, style } = data;

  const currentBg = localTheme === 'dark' ? style.bgDark : style.bgLight;
  const currentTextColor = localTheme === 'dark' ? '#f4f4f5' : '#18181b';
  const currentMutedColor = localTheme === 'dark' ? '#a1a1aa' : '#64748b';
  const currentSurface = localTheme === 'dark' ? '#111214' : '#ffffff';
  const currentBorder = localTheme === 'dark' ? '#27272a' : '#e2e8f0';
  const currentGridColor = localTheme === 'dark' ? 'rgba(255, 255, 255, 0.025)' : 'rgba(15, 23, 42, 0.075)';

  const handleNavClick = (page: 'about' | 'home' | 'blog' | 'code' | 'localAIse') => {
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

  const renderPage = () => {
    if (activeBlogPostId) {
      const blog = blogs.find((entry) => entry.id === activeBlogPostId);
      if (!blog) {
        return <p className="text-xs font-mono">Post not found.</p>;
      }

      const BlogDetailPage = blogPageRegistry[blog.id];
      if (BlogDetailPage) {
        return (
          <BlogDetailPage
            blog={blog}
            currentTextColor={currentTextColor}
            currentBorder={currentBorder}
            currentSurface={currentSurface}
            style={{ accentColor: style.accentColor }}
            onBack={() => setActiveBlogPostId(null)}
          />
        );
      }

      return (
        <div className="rounded-2xl border p-6 md:p-8 shadow-xl space-y-6" style={{ backgroundColor: currentSurface, borderColor: currentBorder }}>
          <button onClick={() => setActiveBlogPostId(null)} className="flex items-center gap-2 text-xs font-bold font-mono hover:underline cursor-pointer tracking-wider" style={{ color: style.accentColor }}>
            Back to blog
          </button>
          <h1 className="text-2xl md:text-3xl font-extrabold" style={{ color: currentTextColor }}>{blog.title}</h1>
          <div className="text-sm md:text-base leading-relaxed" dangerouslySetInnerHTML={{ __html: blog.content }} />
        </div>
      );
    }

    switch (activePage) {
      case 'about':
        return (
          <AboutPage
            profile={profile}
            currentTextColor={currentTextColor}
            currentMutedColor={currentMutedColor}
            currentBorder={currentBorder}
            currentBg={currentBg}
            currentSurface={currentSurface}
            style={style}
            copiedEmail={copiedEmail}
            onCopyEmail={copyEmailToClipboard}
          />
        );
      case 'blog':
        return (
          <BlogPage
            blogs={blogs}
            currentTextColor={currentTextColor}
            currentMutedColor={currentMutedColor}
            currentBorder={currentBorder}
            currentSurface={currentSurface}
            style={style}
            onBlogClick={handleBlogClick}
          />
        );
      case 'code':
        return (
          <CodePage
            projects={projects}
            currentTextColor={currentTextColor}
            currentMutedColor={currentMutedColor}
            currentBorder={currentBorder}
            currentSurface={currentSurface}
            style={style}
          />
        );
      case 'localAIse':
        return (
          <LocalAIsePage
            style={style}
            currentTextColor={currentTextColor}
            currentMutedColor={currentMutedColor}
            currentBorder={currentBorder}
            currentBg={currentBg}
            currentSurface={currentSurface}
          />
        );
      default:
        return (
          <HomePage
            profile={profile}
            projects={projects}
            blogs={blogs}
            style={style}
            currentTextColor={currentTextColor}
            currentMutedColor={currentMutedColor}
            currentBorder={currentBorder}
            currentBg={currentBg}
            onNav={handleNavClick}
            onBlogClick={handleBlogClick}
          />
        );
    }
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
      <div className="absolute top-6 right-6 z-10">
        <button
          onClick={() => setLocalTheme(localTheme === 'dark' ? 'light' : 'dark')}
          className="p-2.5 rounded-full border transition-colors duration-200 cursor-pointer flex items-center justify-center"
          style={{
            backgroundColor: currentSurface,
            borderColor: currentBorder,
            color: currentTextColor,
          }}
          title={localTheme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          aria-label={localTheme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          {localTheme === 'dark' ? <Sun className="w-4 h-4 text-amber-500" /> : <Moon className="w-4 h-4" />}
        </button>
      </div>

      <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 py-12 md:py-24 min-h-screen flex flex-col md:flex-row gap-12 lg:gap-20">
        <aside className="w-full md:w-60 shrink-0 flex flex-col justify-between gap-8 md:sticky md:top-16 md:h-[calc(100vh-8rem)]">
          <div className="space-y-7">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-extrabold tracking-widest uppercase font-display" style={{ color: currentTextColor }}>
                  {profile.name.split(' ')[0]}
                </span>
                <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
              </div>
              <p className="text-xs font-medium mt-1.5" style={{ color: currentMutedColor }}>
                {profile.tagline}
              </p>
            </div>

            <div className="space-y-5 font-mono">
              <section>
                <h2 className="text-[10px] uppercase tracking-wider font-bold mb-2" style={{ color: currentMutedColor }}>Currently</h2>
                <p className="text-[11px] leading-relaxed" style={{ color: currentTextColor }}>{profile.status}</p>
              </section>
              <section>
                <h2 className="text-[10px] uppercase tracking-wider font-bold mb-2" style={{ color: currentMutedColor }}>Focus</h2>
                <ol className="space-y-1.5">
                  {profile.interests.slice(0, 3).map((interest, index) => (
                    <li key={interest} className="flex items-baseline gap-2 text-[11px]">
                      <span style={{ color: style.accentColor }}>{String(index + 1).padStart(2, '0')}</span>
                      <span style={{ color: currentTextColor }}>{interest}</span>
                    </li>
                  ))}
                </ol>
              </section>
            </div>

            <nav aria-label="Main navigation" className="flex flex-row md:flex-col gap-1 overflow-x-auto md:overflow-visible shrink-0 select-none border-y py-2 md:border-y-0 md:py-0">
              {[
                { id: 'home', label: 'Home', icon: <User className="w-3.5 h-3.5" /> },
                { id: 'about', label: 'About', icon: <Sparkles className="w-3.5 h-3.5" /> },
                { id: 'blog', label: 'Blog', icon: <BookOpen className="w-3.5 h-3.5" /> },
                { id: 'code', label: 'Code', icon: <Code className="w-3.5 h-3.5" /> },
              { id: 'localAIse', label: 'LocalAIse', icon: <Brain className="w-3.5 h-3.5" /> },
              ].map((item) => {
                const isActive = activePage === item.id && !activeBlogPostId;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id as 'about' | 'home' | 'blog' | 'code' | 'localAIse')}
                    className="flex-1 md:flex-initial flex items-center justify-center md:justify-start gap-2 px-2.5 py-2 text-xs font-semibold border-l-2 transition-colors duration-150 cursor-pointer text-center md:text-left shrink-0"
                    style={{
                      backgroundColor: isActive ? `${style.accentColor}12` : 'transparent',
                      borderColor: isActive ? style.accentColor : 'transparent',
                      color: isActive ? currentTextColor : currentMutedColor,
                    }}
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>

          <div className="text-[11px] font-mono space-y-2 mt-4 md:mt-0 pt-5 border-t" style={{ borderColor: currentBorder, color: currentMutedColor }}>
            <div className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5" />
              <span>{profile.location}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Github className="w-3.5 h-3.5" />
              <a href={`https://github.com/${profile.username}`} target="_blank" rel="noopener noreferrer" className="hover:underline">
                github.com/{profile.username}
              </a>
            </div>
          </div>
        </aside>

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
              {renderPage()}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}
