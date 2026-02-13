export interface OptimizationItem {
  original: string;
  improved: string;
  reasoning: string;
}

export interface MatchResult {
  matchScore: number;
  missingKeywords: string[];
  contentOptimization: OptimizationItem[];
  atsCompatibilityCheck: string[];
  summary: string;
}

export interface AnalysisState {
  isLoading: boolean;
  result: MatchResult | null;
  error: string | null;
}

export interface HistoryItem {
  id: string;
  timestamp: number;
  jdText: string;
  resumeText: string;
  result: MatchResult;
}

export enum UserView {
  LANDING = 'LANDING',
  DASHBOARD = 'DASHBOARD',
}