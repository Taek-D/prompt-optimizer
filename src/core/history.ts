import { OptimizeInput, OptimizeResult } from './types';

export interface HistoryItem {
    id: string;
    timestamp: number;
    title: string;
    input: OptimizeInput;
    result: OptimizeResult;
    schemaVersion?: number;
}

const STORAGE_KEY = 'prompt_optimizer_history_v1';
const MAX_ITEMS = 10;

export const getHistory = (): HistoryItem[] => {
    if (typeof window === 'undefined') return [];
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (!raw) return [];

        const parsed = JSON.parse(raw);
        if (!Array.isArray(parsed)) throw new Error('Invalid history format');

        // Basic schema validation / cleaning
        return parsed.filter(item => item && typeof item.id === 'string' && item.input && item.result);
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
        result,
        schemaVersion: 1
    };

    const updated = [newItem, ...history].slice(0, MAX_ITEMS);

    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch (e: unknown) {
        console.error('Failed to save history', e);
        // Specialized Quota Handling
        const err = e as { name?: string; code?: number };
        if (err.name === 'QuotaExceededError' || err.code === 22 || err.code === 1014 || err.name === 'NS_ERROR_DOM_QUOTA_REACHED') {
            alert('비상! 브라우저 저장 공간이 부족하여 히스토리를 저장할 수 없습니다.\n오래된 항목을 정리해주세요.');
        }
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
