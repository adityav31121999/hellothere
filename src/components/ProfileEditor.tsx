import { AdityaProfile } from '../types';
import { User, Mail, MapPin, Sparkles, Brain } from 'lucide-react';

interface ProfileEditorProps {
  profile: AdityaProfile;
  onChange: (profile: AdityaProfile) => void;
}

export default function ProfileEditor({ profile, onChange }: ProfileEditorProps) {
  const handleChange = (field: keyof AdityaProfile, value: any) => {
    onChange({
      ...profile,
      [field]: value,
    });
  };

  const handleEmailsChange = (val: string) => {
    const list = val.split(',').map(e => e.trim()).filter(Boolean);
    handleChange('emails', list);
  };

  const handleInterestsChange = (val: string) => {
    const list = val.split(',').map(i => i.trim()).filter(Boolean);
    handleChange('interests', list);
  };

  return (
    <div className="space-y-4 animate-fade-in" id="profile-editor-container">
      <div className="flex items-center gap-2 mb-2">
        <User className="w-4 h-4 text-sky-400" />
        <h3 className="text-sm font-semibold tracking-wider uppercase text-slate-400 font-mono">Profile Details</h3>
      </div>

      <div className="space-y-3">
        {/* Name Input */}
        <div className="space-y-1">
          <label className="text-xs font-semibold text-slate-400">Full Name</label>
          <div className="relative">
            <span className="absolute left-3 top-2.5"><User className="w-4 h-4 text-slate-500" /></span>
            <input
              type="text"
              value={profile.name}
              onChange={(e) => handleChange('name', e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 focus:border-sky-500/50 rounded-lg py-2 pl-9 pr-4 text-sm text-slate-200 outline-none transition-all font-sans"
              id="profile-input-name"
            />
          </div>
        </div>

        {/* Username Input */}
        <div className="space-y-1">
          <label className="text-xs font-semibold text-slate-400">GitHub Username</label>
          <div className="relative">
            <span className="absolute left-3 top-2.5"><Sparkles className="w-4 h-4 text-slate-500" /></span>
            <input
              type="text"
              value={profile.username}
              onChange={(e) => handleChange('username', e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 focus:border-sky-500/50 rounded-lg py-2 pl-9 pr-4 text-sm text-slate-200 outline-none transition-all font-mono"
              id="profile-input-username"
            />
          </div>
        </div>

        {/* Tagline Input */}
        <div className="space-y-1">
          <label className="text-xs font-semibold text-slate-400">Tagline</label>
          <input
            type="text"
            value={profile.tagline}
            onChange={(e) => handleChange('tagline', e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 focus:border-sky-500/50 rounded-lg py-2 px-3 text-sm text-slate-200 outline-none transition-all"
            id="profile-input-tagline"
          />
        </div>

        {/* Emails Input */}
        <div className="space-y-1">
          <label className="text-xs font-semibold text-slate-400">Contact Emails (comma-separated)</label>
          <div className="relative">
            <span className="absolute left-3 top-2.5"><Mail className="w-4 h-4 text-slate-500" /></span>
            <input
              type="text"
              value={profile.emails.join(', ')}
              onChange={(e) => handleEmailsChange(e.target.value)}
              placeholder="e.g. adityav31121999@zohomail.in, info@dvyamsha.in"
              className="w-full bg-slate-950 border border-slate-800 focus:border-sky-500/50 rounded-lg py-2 pl-9 pr-4 text-sm text-slate-200 outline-none transition-all font-mono"
              id="profile-input-emails"
            />
          </div>
        </div>

        {/* Location Input */}
        <div className="space-y-1">
          <label className="text-xs font-semibold text-slate-400">Location</label>
          <div className="relative">
            <span className="absolute left-3 top-2.5"><MapPin className="w-4 h-4 text-slate-500" /></span>
            <input
              type="text"
              value={profile.location}
              onChange={(e) => handleChange('location', e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 focus:border-sky-500/50 rounded-lg py-2 pl-9 pr-4 text-sm text-slate-200 outline-none transition-all"
              id="profile-input-location"
            />
          </div>
        </div>

        {/* Bio Input */}
        <div className="space-y-1">
          <label className="text-xs font-semibold text-slate-400">Bio Description</label>
          <textarea
            value={profile.bio}
            onChange={(e) => handleChange('bio', e.target.value)}
            rows={4}
            className="w-full bg-slate-950 border border-slate-800 focus:border-sky-500/50 rounded-lg p-3 text-sm text-slate-200 outline-none transition-all resize-y font-sans"
            id="profile-input-bio"
          />
        </div>
      </div>
    </div>
  );
}
