import { OptimizeInput, OptimizeResult } from './types';

export interface HistoryItem {
    id: string;
    timestamp: number;
    title: string;
    input: OptimizeInput;
    result: OptimizeResult;
}

const STORAGE_KEY = 'prompt_optimizer_history_v1';
const MAX_ITEMS = 10;

export const getHistory = (): HistoryItem[] => {
    if (typeof window === 'undefined') return [];
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        return raw ? JSON.parse(raw) : [];
    } catch (e) {
        console.error('Failed to load history', e);
        return [];
    }
};

export const saveHistory = (input: OptimizeInput, result: OptimizeResult): HistoryItem[] => {
    if (typeof window === 'undefined') return [];

    const history = getHistory();
    const newItem: HistoryItem = {
        id: Date.now().toString(),
        timestamp: Date.now(),
        title: input.rawPrompt.slice(0, 30) + (input.rawPrompt.length > 30 ? '...' : ''),
        input,
        result
    };

    const updated = [newItem, ...history].slice(0, MAX_ITEMS);

    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch (e) {
        console.error('Failed to save history', e);
    }

    return updated;
};

export const clearHistory = (): void => {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(STORAGE_KEY);
};

export const deleteHistoryItem = (id: string): HistoryItem[] => {
    const history = getHistory();
    const updated = history.filter(item => item.id !== id);
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch (e) {
        console.error('Failed to delete history item', e);
    }
    return updated;
};
