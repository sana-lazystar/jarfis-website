import showcaseData from '@/data/showcase.json';

export interface ShowcaseItem {
  id: string;
  name: string;
  description: string;
  url: string;
  repoUrl?: string;
  thumbnail: string;
  tags: string[];
  featured: boolean;
  addedDate: string;
}

export function getShowcaseItems(): ShowcaseItem[] {
  return showcaseData as ShowcaseItem[];
}

export function getFeaturedShowcaseItems(): ShowcaseItem[] {
  return (showcaseData as ShowcaseItem[]).filter((item) => item.featured);
}
