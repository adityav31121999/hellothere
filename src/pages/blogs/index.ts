import type { ComponentType } from 'react';
import { BlogPost } from '../../types';
import { FirstEntryPage } from './FirstEntryPage';

type BlogDetailPageProps = {
  blog: BlogPost;
  currentTextColor: string;
  currentBorder: string;
  currentSurface: string;
  style: { accentColor: string };
  onBack: () => void;
};

export const blogPageRegistry: Record<string, ComponentType<BlogDetailPageProps>> = {
  'first-entry': FirstEntryPage,
};
