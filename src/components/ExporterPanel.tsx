import { useState } from 'react';
import { SiteBuilderData } from '../types';
import { compileAllSiteFiles } from '../exporter';
import { Download, Copy, Check, ExternalLink, HelpCircle, FileCode, Folder, File, ChevronRight, ChevronDown } from 'lucide-react';
import JSZip from 'jszip';

interface ExporterPanelProps {
  data: SiteBuilderData;
}

export default function ExporterPanel({ data }: ExporterPanelProps) {
  const [copiedFile, setCopiedFile] = useState<string | null>(null);
  const [showGuide, setShowGuide] = useState(true);
  const [selectedFileKey, setSelectedFileKey] = useState<string>('index.html');
  const [selectedBlogId, setSelectedBlogId] = useState<string>(data.blogs[0]?.id || '');
  const [isZipping, setIsZipping] = useState(false);

  // Compile all files dynamically!
  const compiledFiles = compileAllSiteFiles(data);

  // Get active file content based on selection
  const getSelectedFileContent = () => {
    if (selectedFileKey === 'blog-posts' && selectedBlogId) {
      return compiledFiles.blogs[`blog/${selectedBlogId}.html`] || '';
    }
    return compiledFiles[selectedFileKey as keyof typeof compiledFiles] as string || '';
  };

  const getSelectedFileName = () => {
    if (selectedFileKey === 'blog-posts') {
      return `blog/${selectedBlogId}.html`;
    }
    return selectedFileKey;
  };

  const activeContent = getSelectedFileContent();
  const activeFileName = getSelectedFileName();

  const handleCopy = () => {
    navigator.clipboard.writeText(activeContent);
    setCopiedFile(activeFileName);
    setTimeout(() => setCopiedFile(null), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([activeContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    // Download with clean filename
    link.download = activeFileName.split('/').pop() || activeFileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleDownloadAll = async () => {
    setIsZipping(true);
    try {
      const zip = new JSZip();

      // Root pages
      zip.file('index.html', compiledFiles['index.html']);
      zip.file('about.html', compiledFiles['about.html']);
      zip.file('blog.html', compiledFiles['blog.html']);
      zip.file('code.html', compiledFiles['code.html']);

      // GitHub Actions workflow
      zip.file('.github/workflows/pages.yml', compiledFiles['.github/workflows/pages.yml']);
      zip.file('.github/workflows/pages.yaml', compiledFiles['.github/workflows/pages.yaml']);

      // Assets
      zip.file('assets/css/site.css', compiledFiles['assets/css/site.css']);
      zip.file('assets/js/main.js', compiledFiles['assets/js/main.js']);
      zip.file('assets/js/repos.js', compiledFiles['assets/js/repos.js']);

      // Individual blogs
      Object.entries(compiledFiles.blogs).forEach(([path, content]) => {
        zip.file(path, content);
      });

      // Generate ZIP blob
      const content = await zip.generateAsync({ type: 'blob' });
      const url = URL.createObjectURL(content);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${data.profile.username || 'adityav'}-website.zip`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error('Error generating website ZIP package:', err);
    } finally {
      setIsZipping(false);
    }
  };

  return (
    <div className="space-y-5 animate-fade-in" id="exporter-panel-container">
      {/* File Selection Hub */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-4 space-y-4 shadow-md">
        <div className="flex items-center gap-2 mb-1">
          <FileCode className="w-4 h-4 text-sky-400" />
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 font-mono">Export Workspace</h4>
        </div>

        <p className="text-xs text-slate-400 leading-relaxed">
          Compile and download individual custom assets. No framework boilerplate is required to publish this site on GitHub Pages.
        </p>

        {/* Custom File Selector */}
        <div className="space-y-2">
          <label className="text-[11px] font-bold text-slate-400 block font-mono">Select File to View / Download</label>
          <div className="grid grid-cols-2 gap-1.5">
            {[
              { key: 'index.html', label: 'index.html (Home)' },
              { key: 'about.html', label: 'about.html (About)' },
              { key: 'blog.html', label: 'blog.html (Writing)' },
              { key: 'code.html', label: 'code.html (Projects)' },
              { key: 'assets/css/site.css', label: 'assets/css/site.css' },
              { key: 'assets/js/main.js', label: 'assets/js/main.js' },
              { key: 'assets/js/repos.js', label: 'assets/js/repos.js' },
              { key: '.github/workflows/pages.yml', label: 'pages.yml (GitHub)' },
              { key: '.github/workflows/pages.yaml', label: 'pages.yaml (GitHub)' },
              { key: 'blog-posts', label: '📂 Individual Blogs' },
            ].map((file) => {
              const isSelected = selectedFileKey === file.key;
              return (
                <button
                  key={file.key}
                  onClick={() => setSelectedFileKey(file.key)}
                  className={`text-[11px] font-mono p-2 rounded-lg border text-left transition-all cursor-pointer flex items-center justify-between ${
                    isSelected
                      ? 'bg-sky-500/10 border-sky-400 text-sky-300 font-bold'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <span className="truncate">{file.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Sub-selector for blog posts if selected */}
        {selectedFileKey === 'blog-posts' && (
          <div className="space-y-1.5 animate-fade-in bg-slate-950 p-3 rounded-lg border border-slate-800">
            <label className="text-[10px] font-bold text-slate-400 block font-mono">Select BlogPost Page</label>
            <select
              value={selectedBlogId}
              onChange={(e) => setSelectedBlogId(e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 text-xs text-slate-300 rounded p-1.5 outline-none font-mono"
            >
              {data.blogs.map((b) => (
                <option key={b.id} value={b.id}>
                  blog/{b.id}.html
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Action Panel for selected file */}
        <div className="bg-slate-950/80 border border-slate-800 rounded-lg p-3 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono text-slate-400 truncate max-w-[180px]">
              Viewing: <strong className="text-sky-300 font-bold">{activeFileName}</strong>
            </span>
            <div className="flex gap-1.5">
              <button
                onClick={handleCopy}
                className="p-1 px-2.5 bg-slate-900 hover:bg-slate-800 text-[10px] rounded font-semibold transition-all border border-slate-800 flex items-center gap-1 cursor-pointer"
              >
                {copiedFile === activeFileName ? (
                  <>
                    <Check className="w-3 h-3 text-emerald-400" />
                    <span className="text-emerald-400">COPIED</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3 text-slate-400" />
                    <span>COPY</span>
                  </>
                )}
              </button>
              <button
                onClick={handleDownload}
                className="p-1 px-2 bg-sky-600 hover:bg-sky-500 text-white text-[10px] rounded font-semibold transition-all flex items-center gap-1 cursor-pointer"
              >
                <Download className="w-3 h-3" />
                <span>DOWNLOAD</span>
              </button>
            </div>
          </div>

          {/* Quick Preview Area */}
          <pre className="text-[10px] font-mono text-slate-500 bg-slate-950 p-2 rounded max-h-32 overflow-y-auto whitespace-pre border border-slate-900 leading-normal scrollbar-thin">
            {activeContent}
          </pre>
        </div>

        {/* Master Download Package */}
        <div className="pt-2">
          <button
            onClick={handleDownloadAll}
            disabled={isZipping}
            className={`w-full flex items-center justify-center gap-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 text-xs py-3 px-3 rounded-xl font-extrabold transition-all shadow-md cursor-pointer font-mono ${isZipping ? 'opacity-70 cursor-not-allowed' : ''}`}
          >
            <Download className="w-4 h-4 shrink-0" />
            <span>{isZipping ? 'COMPILING ZIP ARCHIVE...' : 'DOWNLOAD ENTIRE SITE AS ZIP'}</span>
          </button>
          <p className="text-[10px] text-slate-500 text-center mt-1.5 font-mono">
            Creates a single ZIP file containing all required pages, css, js, and folders intact!
          </p>
        </div>
      </div>

      {/* Deployment Guide toggle tab */}
      <button
        onClick={() => setShowGuide(!showGuide)}
        className="flex items-center justify-between w-full p-3 bg-slate-950/40 border border-slate-900 rounded-lg text-xs text-slate-400 hover:text-slate-300 transition-all cursor-pointer font-mono"
        id="btn-toggle-guide"
      >
        <span className="flex items-center gap-2 font-semibold">
          <HelpCircle className="w-4 h-4 text-amber-400" />
          Deployment Guide (How to avoid Blank Pages)
        </span>
        <span className="text-[10px] bg-slate-800 px-2 py-0.5 rounded text-slate-400 font-mono">
          {showGuide ? 'HIDE' : 'SHOW'}
        </span>
      </button>

      {/* Deployment Steps Guide details */}
      {showGuide && (
        <div className="bg-slate-950/80 border border-slate-900 rounded-xl p-4 space-y-4 shadow-inner">
          <div className="space-y-3.5 text-xs text-slate-400 leading-relaxed">
            {/* Step 1 */}
            <div className="flex gap-3">
              <span className="w-5 h-5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 font-mono font-bold flex items-center justify-center shrink-0">1</span>
              <div>
                <p className="font-bold text-slate-200">Setup GitHub Pages Repo</p>
                <p className="mt-0.5">
                  Create a public GitHub repository named{' '}
                  <span className="font-mono text-amber-300 bg-slate-900 px-1 py-0.5 rounded">
                    {data.profile.username || 'username'}.github.io
                  </span>
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex gap-3">
              <span className="w-5 h-5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 font-mono font-bold flex items-center justify-center shrink-0">2</span>
              <div>
                <p className="font-bold text-slate-200">Extract ZIP & Upload CONTENTS (Not Folder)</p>
                <p className="mt-0.5">
                  Extract the downloaded <span className="text-amber-300 font-semibold font-mono">.zip</span> file on your computer.
                </p>
                <p className="mt-1 text-rose-400 font-bold bg-rose-500/5 border border-rose-500/10 p-2 rounded">
                  ⚠️ CRITICAL: Upload only the CONTENTS of the extracted folder directly to the root of your GitHub repository. Do NOT drag-and-drop the outer folder (like "adityav-website") itself. Your <code>index.html</code> must live at the very top level of your GitHub repo, otherwise your page will show as a blank 404!
                </p>
                <p className="mt-1.5 font-mono text-[10px] text-slate-500">
                  Perfect Repo Root Hierarchy:
                </p>
                <pre className="text-[10px] leading-snug font-mono text-slate-400 bg-slate-900 p-2 rounded mt-1 border border-slate-800">
                  {`/.github/workflows/pages.yml   (Auto-deploy script included!)
/index.html                     (Must be at repository root)
/about.html
/blog.html
/code.html
/assets/css/site.css
/assets/js/main.js
/assets/js/repos.js
/blog/first-entry.html`}
                </pre>
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex gap-3">
              <span className="w-5 h-5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-mono font-bold flex items-center justify-center shrink-0">3</span>
              <div>
                <p className="font-bold text-slate-200">Automatic Deployment!</p>
                <p className="mt-0.5">
                  Because we packaged a pre-configured <span className="font-mono text-amber-300 font-semibold">pages.yml</span> workflow inside the ZIP, GitHub will automatically trigger a build and publish your beautiful portfolio live at:{' '}
                  <a
                    href={`https://${data.profile.username || 'username'}.github.io`}
                    target="_blank"
                    rel="noreferrer"
                    className="text-emerald-400 underline font-mono inline-flex items-center gap-0.5"
                  >
                    {data.profile.username || 'username'}.github.io <ExternalLink className="w-3 h-3" />
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
