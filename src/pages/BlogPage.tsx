import { SiteBuilderData } from '../types';

type BlogPageProps = {
  blogs: SiteBuilderData['blogs'];
  currentTextColor: string;
  currentMutedColor: string;
  currentBorder: string;
  currentSurface: string;
  style: SiteBuilderData['style'];
  onBlogClick: (blogId: string) => void;
};

export function BlogPage({ blogs, currentTextColor, currentMutedColor, currentBorder, currentSurface, style, onBlogClick }: BlogPageProps) {
  return (
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
          blogs.map((blog) => (
            <article
              key={blog.id}
              onClick={() => onBlogClick(blog.id)}
              className="border rounded-2xl p-5 md:p-6 hover:-translate-y-0.5 hover:shadow-lg transition-all duration-200 cursor-pointer shadow-sm group"
              style={{ backgroundColor: currentSurface, borderColor: currentBorder }}
            >
              <div className="flex items-center justify-between gap-4">
                <span className="text-[10px] font-mono uppercase tracking-wider font-bold" style={{ color: style.accentColor }}>
                  {blog.date}
                </span>
              </div>
              <h3 className="text-base sm:text-lg font-bold group-hover:underline mt-1.5 mb-2" style={{ color: currentTextColor }}>
                {blog.title}
              </h3>
              <p className="text-xs sm:text-sm leading-relaxed" style={{ color: currentMutedColor }}>
                {blog.excerpt}
              </p>
            </article>
          ))
        )}
      </div>
    </div>
  );
}
