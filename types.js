
export enum AssetStage {
  DESIRE = 'Desire',
  ENTRY = 'Entry',
  SERVICE = 'Service',
  IDLE = 'Idle',
  EXIT = 'Exit'
}

export type Language = 'en' | 'zh';
export type AppTheme = 'cyber' | 'panyuliang' | 'pancanvas' | 'panjade';

export interface AppState {
  language: Language;
  theme: AppTheme;
  isPhilosophyOpen: boolean;
  isBetaOpen: boolean;
  setLanguage: (lang: Language) => void;
  setTheme: (theme: AppTheme) => void;
  setPhilosophyOpen: (isOpen: boolean) => void;
  setBetaOpen: (isOpen: boolean) => void;
}

export interface RoadmapItem {
  phase: string;
  name: string;
  description: string;
  status: 'completed' | 'current' | 'planned' | 'future';
  date: string;
}
