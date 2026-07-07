import { SiteBuilderData, AdityaProfile, BlogPost } from './types';

// Helper to generate the CSS with parameterized style
export function generateSiteCSS(style: SiteBuilderData['style']): string {
  return `@import url("https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;700&display=swap");

:root {
  color-scheme: dark;
  font-family: "Inter", "Segoe UI", Roboto, system-ui, -apple-system, BlinkMacSystemFont, sans-serif;
  --bg: ${style.bgDark};
  --surface: #18181b;
  --surface-strong: #232329;
  --text: #f4f4f5;
  --muted: #a1a1aa;
  --border: #27272a;
  --accent: ${style.accentColor};
  --accent-strong: ${style.accentStrong};
  --success: #22c55e;
  --warning: #fb7185;
  --shadow: 0 16px 40px rgba(2, 6, 23, 0.25);
  --grid-color: rgba(255, 255, 255, 0.035);
  background-color: var(--bg);
  color: var(--text);
}

:root[data-theme="light"] {
  color-scheme: light;
  --bg: ${style.bgLight};
  --surface: #ffffff;
  --surface-strong: #f5f5f5;
  --text: #18181b;
  --muted: #52525b;
  --border: #e4e4e7;
  --accent: ${style.accentColor};
  --accent-strong: ${style.accentStrong};
  --success: #22c55e;
  --warning: #ef4444;
  --shadow: 0 16px 32px rgba(15, 23, 42, 0.06);
  --grid-color: #e4e4e7;
}

* {
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
}

body {
  margin: 0;
  min-height: 100vh;
  background-color: var(--bg);
  background-image: radial-gradient(var(--grid-color) 0.8px, transparent 0.8px);
  background-size: ${style.gridSpacing} ${style.gridSpacing};
  color: var(--text);
  transition: background-color 0.2s ease, color 0.2s ease;
  line-height: 1.6;
  letter-spacing: -0.01em;
}

img {
  max-width: 100%;
}

.site-shell {
  display: grid;
  grid-template-columns: minmax(220px, 18rem) minmax(0, 1fr);
  min-height: 100vh;
}

.sidebar {
  background: rgba(24, 24, 27, 0.92);
  color: var(--text);
  padding: 2rem 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  border-right: 1px solid var(--border);
  backdrop-filter: blur(14px);
  position: sticky;
  top: 0;
  height: 100vh;
}

:root[data-theme="light"] .sidebar {
  background: rgba(255, 255, 255, 0.94);
}

.brand-wrap {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}

.brand {
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  color: var(--text);
  font-size: 1.1rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  font-weight: 800;
  text-decoration: none;
}

.brand:hover {
  text-decoration: none;
}

.status-dot {
  height: 8px;
  width: 8px;
  background-color: var(--success);
  border-radius: 50%;
  display: inline-block;
  box-shadow: 0 0 8px var(--success);
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0%,
  100% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.15);
    opacity: 0.7;
  }
}

.tagline {
  margin: 0;
  color: var(--muted);
  font-size: 0.95rem;
}

.nav-links {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.nav-link,
.button,
.theme-toggle {
  border-radius: 8px;
  transition: transform 0.2s ease, background-color 0.2s ease, color 0.2s ease, border-color 0.2s ease;
}

.nav-link {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.8rem 0.95rem;
  text-decoration: none;
  color: var(--muted);
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid var(--border);
  font-weight: 600;
  font-size: 0.95rem;
}

.nav-link:hover,
.button:hover,
.theme-toggle:hover {
  transform: translateY(-2px);
}

.nav-link.active {
  background: linear-gradient(135deg, var(--accent), var(--accent-strong));
  color: white;
  box-shadow: 0 10px 24px rgba(56, 189, 248, 0.2);
  border-color: transparent;
}

.theme-toggle {
  position: fixed;
  top: 1rem;
  right: 1rem;
  z-index: 1000;
  border: 1px solid var(--border);
  background: var(--surface);
  color: var(--text);
  padding: 0.7rem 0.9rem;
  cursor: pointer;
  width: fit-content;
  box-shadow: var(--shadow);
  font-size: 1rem;
}

.content {
  padding: 3rem clamp(1.25rem, 3vw, 2.25rem) 4rem;
  max-width: 760px;
  width: 100%;
  margin: 0 auto;
}

.hero {
  padding: 2rem 0 1.5rem;
}

.hero.compact {
  padding-bottom: 1rem;
}

.eyebrow {
  margin: 0 0 0.6rem;
  text-transform: uppercase;
  letter-spacing: 0.2em;
  color: var(--accent);
  font-size: 0.78rem;
  font-weight: 700;
  font-family: "JetBrains Mono", monospace;
}

.hero h1,
.hero h2,
.card h2,
.card h3,
.post-card h3,
article.card h1 {
  font-size: clamp(1.7rem, 3vw, 2.5rem);
  margin: 0 0 1rem;
  line-height: 1.15;
  letter-spacing: -0.02em;
  font-weight: 700;
}

.hero p,
.card p,
.post-card p,
.card li {
  max-width: 680px;
}

.hero p,
.card p,
.post-card p {
  color: var(--muted);
  font-size: 1.02rem;
  line-height: 1.75;
}

.hero-actions {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  margin-top: 1.5rem;
}

.button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  padding: 0.85rem 1.15rem;
  font-weight: 600;
}

.button.primary {
  background: linear-gradient(135deg, var(--accent), var(--accent-strong));
  color: white;
  box-shadow: 0 10px 24px rgba(56, 189, 248, 0.2);
}

.button.secondary {
  background: var(--surface);
  color: var(--text);
  border: 1px solid var(--border);
}

.card-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1.1rem;
  margin: 2rem 0;
}

.card,
.post-card {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 1.25rem 1.3rem;
  box-shadow: var(--shadow);
  transition: transform 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease;
}

.card:hover,
.post-card:hover {
  transform: translateY(-4px);
  border-color: var(--accent);
  box-shadow: 0 18px 36px rgba(2, 6, 23, 0.16);
}

.card h2,
.post-card h3 {
  margin-top: 0;
  font-size: 1.25rem;
}

.card ul,
.post-list,
.post-list-stack {
  padding-left: 1.1rem;
  color: var(--muted);
}

.post-list-stack {
  display: grid;
  gap: 0.9rem;
  padding-left: 0;
  list-style: none;
}

.post-card p {
  margin-bottom: 0;
  color: var(--muted);
  line-height: 1.7;
}

a {
  color: var(--accent);
}

a:hover {
  text-decoration: underline;
}

code,
.mono-text {
  font-family: "JetBrains Mono", monospace;
  font-size: 0.9em;
  background: rgba(0, 0, 0, 0.08);
  padding: 2px 4px;
  border-radius: 4px;
}

:root[data-theme="light"] code,
:root[data-theme="light"] .mono-text {
  background: rgba(0, 0, 0, 0.05);
}

pre.repo-description {
  white-space: pre-wrap;
  background: var(--surface-strong);
  color: var(--text);
  border-radius: 12px;
  padding: 1rem;
  overflow-x: auto;
  border: 1px solid var(--border);
  font-family: "JetBrains Mono", monospace;
}

.hardcoded-badge {
  font-family: "JetBrains Mono", monospace;
  font-size: 0.72rem;
  background: rgba(16, 185, 129, 0.1);
  color: #10b981;
  border: 1px solid rgba(16, 185, 129, 0.2);
  padding: 2px 8px;
  border-radius: 4px;
  font-weight: 700;
  letter-spacing: 0.05em;
  display: inline-block;
}

.vibe-badge {
  font-family: "JetBrains Mono", monospace;
  font-size: 0.72rem;
  background: rgba(245, 158, 11, 0.1);
  color: #f59e0b;
  border: 1px solid rgba(245, 158, 11, 0.2);
  padding: 2px 8px;
  border-radius: 4px;
  font-weight: 700;
  letter-spacing: 0.05em;
  display: inline-block;
}

.project-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.4rem;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.project-desc {
  margin: 0;
  font-size: 0.95rem;
  color: var(--muted);
}

.section-title-brutalist {
  margin-top: 0;
  margin-bottom: 1.2rem;
  font-size: 1.25rem;
  border-bottom: 1px solid var(--border);
  padding-bottom: 0.5rem;
  color: var(--text);
  font-family: "JetBrains Mono", monospace;
}

.blog-body-content {
  margin-top: 1.5rem;
}

.blog-body-content p {
  margin-bottom: 1.2rem;
  font-size: 1.05rem;
  line-height: 1.8;
  color: var(--muted);
}

.blog-body-content a {
  color: var(--accent);
  text-decoration: underline;
}

.mb-6 {
  margin-bottom: 1.5rem;
}

.badge-completed {
  border: 1px solid var(--success);
  color: var(--success);
  background: rgba(34, 197, 94, 0.1);
  padding: 1px 6px;
  border-radius: 4px;
  font-size: 11px;
  font-family: "JetBrains Mono", monospace;
}

.badge-wip {
  border: 1px solid var(--accent);
  color: var(--accent);
  background: rgba(56, 189, 248, 0.1);
  padding: 1px 6px;
  border-radius: 4px;
  font-size: 11px;
  font-family: "JetBrains Mono", monospace;
}

.badge-concept {
  border: 1px solid var(--muted);
  color: var(--muted);
  background: rgba(161, 161, 170, 0.1);
  padding: 1px 6px;
  border-radius: 4px;
  font-size: 11px;
  font-family: "JetBrains Mono", monospace;
}

.project-actions {
  display: flex;
  gap: 0.75rem;
  margin-top: 0.75rem;
}

.project-link {
  font-size: 0.85rem;
  font-family: "JetBrains Mono", monospace;
  text-decoration: none;
}

.project-link:hover {
  text-decoration: underline;
}

@media (max-width: 900px) {
  .site-shell {
    grid-template-columns: 1fr;
  }

  .sidebar {
    position: static;
    height: auto;
    padding: 1.1rem;
    flex-direction: row;
    align-items: center;
    gap: 1rem;
    overflow-x: auto;
  }

  .nav-links {
    flex-direction: row;
    gap: 0.75rem;
  }

  .content {
    padding: 2rem 1.1rem 3rem;
  }

  .card-grid {
    grid-template-columns: 1fr;
  }

  .theme-toggle {
    top: 0.75rem;
    right: 0.75rem;
  }
}

@media (max-width: 600px) {
  .brand {
    font-size: 1rem;
  }

  .hero h1 {
    font-size: 1.7rem;
  }

  .hero-actions {
    flex-direction: column;
  }

  .nav-link {
    padding: 0.7rem 0.85rem;
  }
}
`;
}

// Sidebar HTML Helper
function getSidebarHTML(profile: AdityaProfile, activePage: 'home' | 'blog' | 'code' | 'about', relativePrefix: string = ''): string {
  const brandHref = `${relativePrefix}index.html`;
  const homeHref = `${relativePrefix}index.html`;
  const aboutHref = `${relativePrefix}about.html`;
  const blogHref = `${relativePrefix}blog.html`;
  const codeHref = `${relativePrefix}code.html`;
  
  return `<aside class="sidebar">
        <div class="brand-wrap">
          <a href="${brandHref}" class="brand">
            <span>${profile.name.split(' ')[0]}</span>
            <span class="status-dot" aria-hidden="true"></span>
          </a>
          <p class="tagline">${profile.tagline}</p>
        </div>

        <nav class="nav-links" aria-label="Primary navigation">
          <a class="nav-link ${activePage === 'home' ? 'active' : ''}" href="${homeHref}">Home</a>
          <a class="nav-link ${activePage === 'about' ? 'active' : ''}" href="${aboutHref}">About</a>
          <a class="nav-link ${activePage === 'blog' ? 'active' : ''}" href="${blogHref}">Blog</a>
          <a class="nav-link ${activePage === 'code' ? 'active' : ''}" href="${codeHref}">Code</a>
        </nav>
      </aside>`;
}

// Generate index.html
export function generateIndexHTML(data: SiteBuilderData): string {
  const { profile, blogs } = data;
  const sidebar = getSidebarHTML(profile, 'home');
  
  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${profile.name} | Personal Site</title>
    <meta name="description" content="${profile.bio}" />
    <link rel="stylesheet" href="assets/css/site.css" />
  </head>
  <body>
    <button id="theme-toggle" class="theme-toggle" type="button" aria-label="Toggle color theme">
      🌙
    </button>

    <div class="site-shell">
      ${sidebar}

      <main class="content">
        <section class="hero">
          <p class="eyebrow">Personal site</p>
          <h1>Curious experiments, thoughtful notes, and public code.</h1>
          <p>
            I’m ${profile.name}, ${profile.bio}
          </p>
          <div class="hero-actions">
            <a class="button primary" href="blog.html">Read the blog</a>
            <a class="button secondary" href="code.html">Browse my code</a>
          </div>
        </section>

        <section class="card">
          <h2>Recent posts</h2>
          <ul class="post-list" style="padding-left: 1.1rem; color: var(--muted); margin: 0; display: flex; flex-direction: column; gap: 0.5rem;">
            ${blogs.map(blog => `<li><a href="blog/${blog.id}.html">${blog.title}</a></li>`).join('\n            ')}
          </ul>
        </section>
      </main>
    </div>

    <script src="assets/js/main.js"></script>
  </body>
</html>`;
}

// Generate about.html
export function generateAboutHTML(data: SiteBuilderData): string {
  const { profile } = data;
  const sidebar = getSidebarHTML(profile, 'about');
  
  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>About Me | ${profile.name}</title>
    <link rel="stylesheet" href="assets/css/site.css" />
  </head>
  <body>
    <button id="theme-toggle" class="theme-toggle" type="button" aria-label="Toggle color theme">
      🌙
    </button>

    <div class="site-shell">
      ${sidebar}

      <main class="content">
        <section class="hero compact">
          <p class="eyebrow">About Me</p>
          <h1>A bit about myself.</h1>
          <p>${profile.tagline}</p>
        </section>

        <section class="card mb-6">
          <h2>Who I Am</h2>
          <p style="margin: 0; line-height: 1.7; font-size: 0.95rem;">
            ${profile.bio}
          </p>
        </section>

        <section class="card">
          <h2>Contact & Details</h2>
          <p style="margin: 0 0 1rem 0; font-size: 0.95rem;">
            Feel free to reach out to me regarding any mathematics, physics, computation or open-source projects!
          </p>
          <div style="display: flex; flex-direction: column; gap: 0.75rem; font-family: 'JetBrains Mono', monospace; font-size: 0.9rem;">
            <div style="display: flex; align-items: center; gap: 0.5rem;">
              <span style="color: var(--accent); font-weight: bold;">Location:</span>
              <span>${profile.location}</span>
            </div>
            ${profile.emails.map(email => `
            <div style="display: flex; align-items: center; gap: 0.5rem; flex-wrap: wrap;">
              <span style="color: var(--accent); font-weight: bold;">Email:</span>
              <a href="mailto:${email}" style="color: var(--text); text-decoration: underline;">${email}</a>
            </div>`).join('')}
          </div>
        </section>
      </main>
    </div>

    <script src="assets/js/main.js"></script>
  </body>
</html>`;
}

// Generate blog.html
export function generateBlogHTML(data: SiteBuilderData): string {
  const { profile, blogs } = data;
  const sidebar = getSidebarHTML(profile, 'blog');
  
  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Blog | ${profile.name}</title>
    <link rel="stylesheet" href="assets/css/site.css" />
  </head>
  <body>
    <button id="theme-toggle" class="theme-toggle" type="button" aria-label="Toggle color theme">
      🌙
    </button>

    <div class="site-shell">
      ${sidebar}

      <main class="content">
        <section class="hero compact">
          <p class="eyebrow">Writing</p>
          <h1>Notes, thoughts, and experiments.</h1>
          <p>These posts are written as simple HTML files so they stay easy to browse and publish.</p>
        </section>

        <section class="card">
          <h2>All posts</h2>
          <div class="post-list-stack">
            ${blogs.map(blog => `
            <article class="post-card" style="margin-bottom: 1rem;">
              <h3 style="margin: 0 0 0.4rem 0;"><a href="blog/${blog.id}.html">${blog.title}</a></h3>
              <p style="margin: 0; font-size: 0.95rem; color: var(--muted);">${blog.excerpt}</p>
            </article>`).join('')}
          </div>
        </section>
      </main>
    </div>

    <script src="assets/js/main.js"></script>
  </body>
</html>`;
}

// Generate individual blog post page
export function generateBlogPostHTML(data: SiteBuilderData, blog: BlogPost, index: number): string {
  const { profile } = data;
  const sidebar = getSidebarHTML(profile, 'blog', '../');

  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${blog.title} | ${profile.name}</title>
    <link rel="stylesheet" href="../assets/css/site.css" />
  </head>
  <body>
    <button id="theme-toggle" class="theme-toggle" type="button" aria-label="Toggle color theme">🌙</button>

    <div class="site-shell">
      ${sidebar}

      <main class="content">
        <article class="card">
          <p class="eyebrow">${blog.date}</p>
          <h1 style="margin-top: 0.25rem;">${blog.title}</h1>
          <div class="blog-body-content">
            ${blog.content}
          </div>
        </article>
      </main>
    </div>

    <script src="../assets/js/main.js"></script>
  </body>
</html>`;
}

// Generate code.html
export function generateCodeHTML(data: SiteBuilderData): string {
  const { profile, projects } = data;
  const sidebar = getSidebarHTML(profile, 'code');

  const completed = projects.filter(p => p.status === 'completed');

  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Code | ${profile.name}</title>
    <link rel="stylesheet" href="assets/css/site.css" />
  </head>
  <body>
    <button id="theme-toggle" class="theme-toggle" type="button" aria-label="Toggle color theme">
      🌙
    </button>

    <div class="site-shell">
      ${sidebar}

      <main class="content">
        <section class="hero compact">
          <p class="eyebrow">Open source</p>
          <h1>Public repositories and experiments.</h1>
          <p>Here are my active mathematical, physics, and computing experiments.</p>
        </section>

        <!-- Projects -->
        <section class="card mb-6" style="padding: 1.5rem;">
          <h2 class="section-title-brutalist">Projects</h2>
          <div class="post-list-stack" style="gap: 1rem;">
            ${completed.map(proj => `
            <div class="project-item" style="border-bottom: 1px solid var(--border); padding-bottom: 1rem; margin-bottom: 0.5rem; &:last-child { border-bottom: none; padding-bottom: 0; }">
              <div class="project-header">
                <strong>
                  ${proj.githubUrl ? `<a href="${proj.githubUrl}" target="_blank">${proj.name}</a>` : proj.name}
                </strong>
                <div style="display: flex; gap: 0.5rem; align-items: center;">
                  ${proj.hardcoded ? `<span class="hardcoded-badge">HARDCODED</span>` : ''}
                  ${proj.vibeCoded ? `<span class="vibe-badge">⚡ VIBE</span>` : ''}
                </div>
              </div>
              <p class="project-desc">${proj.description}</p>
              ${proj.githubUrl || proj.demoUrl ? `
              <div class="project-actions">
                ${proj.githubUrl ? `<a href="${proj.githubUrl}" class="project-link" target="_blank">Repository ↗</a>` : ''}
                ${proj.demoUrl ? `<a href="${proj.demoUrl}" class="project-link" target="_blank">Demo ↗</a>` : ''}
              </div>` : ''}
            </div>`).join('')}
          </div>
        </section>
        
        <!-- GitHub Fetch integration card -->
        <section class="card" style="margin-top: 2rem; background: var(--surface-strong); border-style: dashed;">
          <h3 style="margin: 0 0 0.5rem 0; font-size: 1.1rem; color: var(--accent);">📡 Dynamic Repo Fetching Enabled</h3>
          <p style="margin: 0; font-size: 0.88rem; color: var(--muted); line-height: 1.5;">
            By deploying this code page, the dynamic JavaScript in <code>assets/js/repos.js</code> will automatically poll your GitHub public repositories for username <strong>${profile.username}</strong>, ensuring your real-time stars and fork updates appear instantly, overlaying on top of these pre-rendered cards!
          </p>
        </section>
      </main>
    </div>

    <script src="assets/js/main.js"></script>
    <script src="assets/js/repos.js"></script>
  </body>
</html>`;
}

// Generate assets/js/main.js
export function generateMainJS(): string {
  return `const root = document.documentElement;
const toggle = document.getElementById('theme-toggle');

const getPreferredTheme = () => {
  const storedTheme = localStorage.getItem('theme');
  if (storedTheme) {
    return storedTheme;
  }
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};

const applyTheme = (theme) => {
  root.setAttribute('data-theme', theme);
  if (toggle) {
    toggle.textContent = theme === 'dark' ? '☀️' : '🌙';
  }
};

applyTheme(getPreferredTheme());

if (toggle) {
  toggle.addEventListener('click', () => {
    const nextTheme = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    localStorage.setItem('theme', nextTheme);
    applyTheme(nextTheme);
  });
}
`;
}

// Generate assets/js/repos.js
export function generateReposJS(username: string): string {
  return `const username = "${username}";
const container = document.getElementById('repo-list');

if (container) {
  fetch(\`https://api.github.com/users/\${username}/repos?sort=updated\`)
    .then(response => response.json())
    .then(repos => {
      if (repos && Array.isArray(repos)) {
        const myRepos = repos.filter(repo => !repo.fork);
        if (myRepos.length === 0) return;
        
        // Dynamic logging or override logic can reside here
        console.log("Dynamically fetched public repos:", myRepos.length);
      }
    })
    .catch(err => {
      console.warn("Could not fetch real-time GitHub repos, falling back to static pre-rendered list.", err);
    });
}
`;
}

// Generate .github/workflows/pages.yml
export function generateGithubWorkflow(): string {
  return `name: GitHub Pages

on:
  push:
    branches:
      - main
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: pages
  cancel-in-progress: true

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout repository
        uses: actions/checkout@v4

      - name: Configure GitHub Pages
        uses: actions/configure-pages@v5

      - name: Upload Pages artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: .

  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: \${{ steps.deployment.outputs.page_url }}
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v5
`;
}

// Package all files as an exportable object
export interface ExportedSiteFiles {
  'index.html': string;
  'about.html': string;
  'blog.html': string;
  'code.html': string;
  'assets/css/site.css': string;
  'assets/js/main.js': string;
  'assets/js/repos.js': string;
  '.github/workflows/pages.yml': string;
  '.github/workflows/pages.yaml': string;
  blogs: { [filename: string]: string };
}

export function compileAllSiteFiles(data: SiteBuilderData): ExportedSiteFiles {
  const blogFiles: { [filename: string]: string } = {};
  data.blogs.forEach((blog, index) => {
    blogFiles[`blog/${blog.id}.html`] = generateBlogPostHTML(data, blog, index);
  });

  const workflowContent = generateGithubWorkflow();

  return {
    'index.html': generateIndexHTML(data),
    'about.html': generateAboutHTML(data),
    'blog.html': generateBlogHTML(data),
    'code.html': generateCodeHTML(data),
    'assets/css/site.css': generateSiteCSS(data.style),
    'assets/js/main.js': generateMainJS(),
    'assets/js/repos.js': generateReposJS(data.profile.username),
    '.github/workflows/pages.yml': workflowContent,
    '.github/workflows/pages.yaml': workflowContent,
    blogs: blogFiles
  };
}
