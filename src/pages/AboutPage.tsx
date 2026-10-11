import { Check, Copy, Mail, Sparkles } from 'lucide-react';
import { SiteBuilderData } from '../types';

type AboutPageProps = {
  profile: SiteBuilderData['profile'];
  currentTextColor: string;
  currentMutedColor: string;
  currentBorder: string;
  currentBg: string;
  currentSurface: string;
  style: SiteBuilderData['style'];
  copiedEmail: string | null;
  onCopyEmail: (email: string) => void;
};

export function AboutPage({
  profile,
  currentTextColor,
  currentMutedColor,
  currentBorder,
  currentBg,
  currentSurface,
  style,
  copiedEmail,
  onCopyEmail,
}: AboutPageProps) {
  return (
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

      <section className="border rounded-2xl p-6 shadow-sm space-y-4" style={{ backgroundColor: currentSurface, borderColor: currentBorder }}>
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-amber-400" />
          <h2 className="text-sm uppercase font-mono font-bold tracking-wider" style={{ color: style.accentColor }}>
            Areas of Interest
          </h2>
        </div>
        <div className="flex flex-wrap gap-2">
          {profile.interests.map((interest, idx) => (
            <span key={idx} className="text-[10px] font-mono font-semibold px-2.5 py-1 rounded-lg border" style={{ backgroundColor: currentBg, borderColor: currentBorder, color: currentTextColor }}>
              {interest}
            </span>
          ))}
        </div>
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
              <button onClick={() => onCopyEmail(email)} className="p-1.5 hover:bg-slate-500/10 rounded-lg transition-colors cursor-pointer shrink-0" title="Copy email to clipboard">
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
  );
}
