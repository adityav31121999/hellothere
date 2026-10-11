import { ArrowLeft } from 'lucide-react';
import { BlogPost } from '../types';

type BlogPostPageProps = {
  blog: BlogPost;
  currentTextColor: string;
  currentBorder: string;
  currentSurface: string;
  style: { accentColor: string };
  onBack: () => void;
};

export function BlogPostPage({ blog, currentTextColor, currentBorder, currentSurface, style, onBack }: BlogPostPageProps) {
  return (
    <article className="rounded-2xl border p-6 md:p-8 shadow-xl space-y-6" style={{ backgroundColor: currentSurface, borderColor: currentBorder }}>
      <button onClick={onBack} className="flex items-center gap-2 text-xs font-bold font-mono hover:underline cursor-pointer tracking-wider" style={{ color: style.accentColor }}>
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

      <div className="text-sm md:text-base space-y-4 leading-relaxed font-sans blog-content-preview border-t pt-6" style={{ borderColor: currentBorder }} dangerouslySetInnerHTML={{ __html: blog.content }} />
    </article>
  );
}
