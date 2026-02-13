import { MatchResult, HistoryItem } from '../types';

const STORAGE_KEY = 'matchly_history';

export const getHistory = (): HistoryItem[] => {
  if (typeof window === 'undefined') return [];
  try {
    const item = localStorage.getItem(STORAGE_KEY);
    return item ? JSON.parse(item) : [];
  } catch (e) {
    console.error("Failed to parse history", e);
    return [];
  }
};

export const saveScan = (resumeText: string, jdText: string, result: MatchResult): HistoryItem[] => {
  const history = getHistory();
  const newItem: HistoryItem = {
    id: Date.now().toString(),
    timestamp: Date.now(),
    jdText,
    resumeText,
    result
  };
  
  // Keep latest 10
  const updatedHistory = [newItem, ...history].slice(0, 10);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedHistory));
  return updatedHistory;
};

export const clearHistory = () => {
  localStorage.removeItem(STORAGE_KEY);
};

export const deleteHistoryItem = (id: string): HistoryItem[] => {
    const history = getHistory();
    const updated = history.filter(item => item.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return updated;
};