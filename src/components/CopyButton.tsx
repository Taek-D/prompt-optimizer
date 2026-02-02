import React, { useState } from 'react';

interface CopyButtonProps {
    text: string;
    className?: string;
    onCopy?: () => void;
}

export const CopyButton: React.FC<CopyButtonProps> = ({ text, className = '', onCopy }) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(text);
            setCopied(true);
            if (onCopy) onCopy();
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy', err);
        }
    };

    return (
        <button
            onClick={handleCopy}
            className={`px-4 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm transition-colors ${className}`}
        >
            {copied ? 'Copied!' : 'Copy'}
        </button>
    );
};
