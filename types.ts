export interface GridItemType {
  id: number;
  imageSrc: string | null;
}

export interface Highlight {
  id: number;
  label: string;
  imageSrc: string | null;
}

export interface Bio {
  name: string;
  pronouns: string;
  category: string;
  description: string;
  link: string;
}

export interface Stats {
  posts: string;
  followers: string;
  following: string;
}

// Fix: Add missing SplitHistoryItem type, which is used in SplitHistoryModal.tsx.
export interface SplitHistoryItem {
  id: number;
  originalSrc: string;
  splitImages: string[];
}