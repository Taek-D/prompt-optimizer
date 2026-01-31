import { ModelType } from './types';

export const estimateTokens = (text: string): number => {
    if (!text) return 0;
    // Crude heuristic: English ~4 chars/token, Korean ~2 chars/token
    // We'll detect if >50% chars are non-ascii to switch mode? 
    // Or just use a weighted average.

    const len = text.length;
    let nonAsciiCount = 0;
    for (let i = 0; i < len; i++) {
        if (text.charCodeAt(i) > 127) nonAsciiCount++;
    }
    const asciiCount = len - nonAsciiCount;

    // Requested Heuristic:
    // Korean (non-ascii) ~ 2 chars/token
    // English (ascii) ~ 4 chars/token

    // Total tokens = (nonAscii / 2) + (ascii / 4)
    return Math.ceil((nonAsciiCount / 2.0) + (asciiCount / 4.0));
};

export const getContextLimit = (model: ModelType): number => {
    switch (model) {
        case 'openai': return 4096; // Standard 4k/8k/128k - MVP Default conservative
        case 'claude': return 100000; // 100k+
        case 'gemini': return 32000; // 32k+
        default: return 4096;
    }
};
