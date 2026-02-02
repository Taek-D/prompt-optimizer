export interface SensitiveMatch {
    type: 'email' | 'phone' | 'credit_card' | 'rrn' | 'api_key' | 'other';
    match: string;
    index: number;
}

const PATTERNS = {
    email: /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g,
    phone: /(01[016789]-?\d{3,4}-?\d{4})|(\d{2,3}-?\d{3,4}-?\d{4})/g,
    rrn: /\d{6}-?[1-4]\d{6}/g,
    api_key: /(sk-[a-zA-Z0-9]{20,})|(AIzA[a-zA-Z0-9_-]{35})/g, // OpenAI, Google (Strict)
};

export const detectSensitiveData = (text: string): SensitiveMatch[] => {
    const matches: SensitiveMatch[] = [];

    // Email
    let m;
    PATTERNS.email.lastIndex = 0;
    while ((m = PATTERNS.email.exec(text)) !== null) {
        matches.push({ type: 'email', match: m[0], index: m.index });
    }

    // Phone
    PATTERNS.phone.lastIndex = 0;
    while ((m = PATTERNS.phone.exec(text)) !== null) {
        matches.push({ type: 'phone', match: m[0], index: m.index });
    }

    // RRN
    PATTERNS.rrn.lastIndex = 0;
    while ((m = PATTERNS.rrn.exec(text)) !== null) {
        matches.push({ type: 'rrn', match: m[0], index: m.index });
    }

    // API Key
    PATTERNS.api_key.lastIndex = 0;
    while ((m = PATTERNS.api_key.exec(text)) !== null) {
        // Exclude common words false positives if needed, but for MVP strict
        if (m[0].length > 20) { // Simple filter
            matches.push({ type: 'api_key', match: m[0], index: m.index });
        }
    }

    return matches;
};

export const maskSensitiveData = (text: string): string => {
    let masked = text;
    masked = masked.replace(PATTERNS.email, '[EMAIL_REDACTED]');
    masked = masked.replace(PATTERNS.phone, '[PHONE_REDACTED]');
    masked = masked.replace(PATTERNS.rrn, '[RRN_REDACTED]');
    masked = masked.replace(PATTERNS.api_key, '[API_KEY_REDACTED]');
    return masked;
};
