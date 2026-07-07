import { useState } from 'react';
import { BlogPost } from '../types';
import { FileText, Plus, Trash2, ChevronDown, ChevronUp, Calendar, BookOpen } from 'lucide-react';

interface BlogsEditorProps {
  blogs: BlogPost[];
  onChange: (blogs: BlogPost[]) => void;
}

export default function BlogsEditor({ blogs, onChange }: BlogsEditorProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const handleToggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const handleUpdateBlog = (id: string, updatedFields: Partial<BlogPost>) => {
    onChange(
      blogs.map((b) => (b.id === id ? { ...b, ...updatedFields } : b))
    );
  };

  const handleAddBlog = () => {
    const formattedDate = new Date().toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
    const newId = `post-${Date.now()}`;
    const newBlog: BlogPost = {
      id: newId,
      title: 'A new post on science and computation',
      date: formattedDate,
      excerpt: 'A brief summary explaining what this experiment teaches us.',
      content: `<p>\n  When we dive into experiments, we often find simple truths that large textbooks gloss over.\n</p>\n<p>\n  This is a customizable blog post block where you can write about your findings in number theory, float representation, or neural networks.\n</p>`
    };
    onChange([...blogs, newBlog]);
    setExpandedId(newId);
  };

  const handleDeleteBlog = (id: string) => {
    onChange(blogs.filter((b) => b.id !== id));
    if (expandedId === id) setExpandedId(null);
  };

  return (
    <div className="space-y-4 animate-fade-in" id="blogs-editor-container">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-sky-400" />
          <h3 className="text-sm font-semibold tracking-wider uppercase text-slate-400 font-mono">My Blog Posts</h3>
        </div>
        <button
          onClick={handleAddBlog}
          className="flex items-center gap-1.5 bg-sky-600 hover:bg-sky-500 text-white text-xs px-3 py-1.5 rounded-lg transition-all font-semibold font-mono cursor-pointer"
          id="btn-add-blog"
        >
          <Plus className="w-3.5 h-3.5" />
          ADD POST
        </button>
      </div>

      <div className="space-y-2">
        {blogs.length === 0 ? (
          <div className="text-center py-6 border border-slate-900 bg-slate-950 rounded-xl text-slate-500 text-sm">
            No posts created yet. Click "ADD POST" to write your thoughts!
          </div>
        ) : (
          blogs.map((blog, index) => {
            const isExpanded = expandedId === blog.id;
            return (
              <div
                key={blog.id}
                className={`border rounded-lg transition-all ${
                  isExpanded ? 'bg-slate-900/60 border-slate-700' : 'bg-slate-950/40 border-slate-800 hover:border-slate-700'
                }`}
                id={`blog-card-${blog.id}`}
              >
                {/* Accordion Trigger Header */}
                <div
                  onClick={() => handleToggleExpand(blog.id)}
                  className="flex items-center justify-between p-3 cursor-pointer select-none"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <span className="text-xs font-mono text-slate-500 w-5">#{index + 1}</span>
                    <p className="font-bold text-slate-200 font-mono text-sm truncate">{blog.title}</p>
                    <span className="text-[10px] font-mono text-sky-400 bg-sky-500/10 border border-sky-500/10 px-1.5 py-0.5 rounded flex items-center gap-1 shrink-0">
                      <Calendar className="w-2.5 h-2.5" /> {blog.date}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteBlog(blog.id);
                      }}
                      className="text-slate-500 hover:text-red-400 p-1 rounded hover:bg-slate-800/50 transition-colors"
                      title="Delete post"
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

                {/* Expansion Body */}
                {isExpanded && (
                  <div className="p-4 border-t border-slate-800 space-y-3 bg-slate-950/40">
                    {/* Blog Title */}
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-slate-400">Post Title</label>
                      <input
                        type="text"
                        value={blog.title}
                        onChange={(e) => handleUpdateBlog(blog.id, { title: e.target.value })}
                        className="w-full bg-slate-950 border border-slate-800 focus:border-sky-500/50 rounded-lg py-1.5 px-3 text-xs text-slate-200 outline-none transition-all font-sans font-bold"
                      />
                    </div>

                    {/* Blog Filename ID */}
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-slate-400">File slug / ID (for URL name, e.g. "first-entry")</label>
                      <input
                        type="text"
                        value={blog.id}
                        onChange={(e) => handleUpdateBlog(blog.id, { id: e.target.value.toLowerCase().replace(/[^a-z0-9_-]/g, '-') })}
                        placeholder="e.g. why-experiments-matter"
                        className="w-full bg-slate-950 border border-slate-800 focus:border-sky-500/50 rounded-lg py-1.5 px-3 text-xs text-slate-200 outline-none transition-all font-mono"
                      />
                      <p className="text-[10px] text-slate-500 font-mono">This maps to the filename: <code>blog/{blog.id || 'slug'}.html</code></p>
                    </div>

                    {/* Blog Date */}
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-slate-400">Post Date</label>
                      <input
                        type="text"
                        value={blog.date}
                        onChange={(e) => handleUpdateBlog(blog.id, { date: e.target.value })}
                        placeholder="e.g. July 7, 2026"
                        className="w-full bg-slate-950 border border-slate-800 focus:border-sky-500/50 rounded-lg py-1.5 px-3 text-xs text-slate-200 outline-none transition-all font-sans"
                      />
                    </div>

                    {/* Excerpt Summary */}
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-slate-400">Excerpt / Intro Summary</label>
                      <textarea
                        value={blog.excerpt}
                        onChange={(e) => handleUpdateBlog(blog.id, { excerpt: e.target.value })}
                        rows={2}
                        className="w-full bg-slate-950 border border-slate-800 focus:border-sky-500/50 rounded-lg p-2.5 text-xs text-slate-200 outline-none transition-all resize-y font-sans"
                      />
                    </div>

                    {/* Detailed HTML Content */}
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-slate-400 flex items-center justify-between">
                        <span>Post Body Content (Plain text or HTML)</span>
                        <span className="text-[10px] text-sky-400 font-mono font-bold">RAW HTML ALLOWED</span>
                      </label>
                      <textarea
                        value={blog.content}
                        onChange={(e) => handleUpdateBlog(blog.id, { content: e.target.value })}
                        rows={6}
                        className="w-full bg-slate-950 border border-slate-800 focus:border-sky-500/50 rounded-lg p-3 text-xs text-slate-200 outline-none transition-all resize-y font-mono"
                        placeholder="e.g. <p>Hello world!</p>"
                      />
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
