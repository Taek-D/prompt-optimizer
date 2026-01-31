export interface SensitiveMatch {
    type: 'email' | 'phone' | 'credit_card' | 'rrn' | 'api_key' | 'other';
    match: string;
    index: number;
}

const PATTERNS = {
    email: /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g,
    phone: /(01[016789]-?\d{3,4}-?\d{4})|(\d{2,3}-?\d{3,4}-?\d{4})/g,
    rrn: /\d{6}-?[1-4]\d{6}/g,
    api_key: /(sk-[a-zA-Z0-9]{20,})|(AIzA[a-zA-Z0-9_-]{35})|([a-zA-Z0-9]{32,40})/g, // OpenAI, Google, Generic Hash
};

export const detectSensitiveData = (text: string): SensitiveMatch[] => {
    const matches: SensitiveMatch[] = [];

    // Email
    let m;
    while ((m = PATTERNS.email.exec(text)) !== null) {
        matches.push({ type: 'email', match: m[0], index: m.index });
    }

    // Phone
    // Reset lastIndex for reusable regexes if needed (global)
    // PATTERNS.phone.lastIndex = 0; // if reused instance
    while ((m = PATTERNS.phone.exec(text)) !== null) {
        matches.push({ type: 'phone', match: m[0], index: m.index });
    }

    // RRN
    while ((m = PATTERNS.rrn.exec(text)) !== null) {
        matches.push({ type: 'rrn', match: m[0], index: m.index });
    }

    // API Key
    while ((m = PATTERNS.api_key.exec(text)) !== null) {
        // Exclude common words false positives if needed, but for MVP strict
        if (m[0].length > 20) { // Simple filter
            matches.push({ type: 'other', match: m[0], index: m.index }); // Type 'other' or add 'api_key' to type def
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
