
import React from 'react';
interface PromptInputProps {
    value: string;
    onChange: (val: string) => void;
    maxLength?: number;
}

export const PromptInput: React.FC<PromptInputProps> = ({ value, onChange, maxLength = 3000 }) => {
    return (
        <div className="relative mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">Original Prompt</label>
            <textarea
                data-testid="raw-prompt-input"
                className="w-full h-40 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                placeholder="Paste your rough prompt here..."
                value={value}
                onChange={(e) => onChange(e.target.value)}
                maxLength={maxLength}
            />
            <div className="absolute bottom-3 right-3 text-xs text-gray-400">
                {value.length} / {maxLength}
            </div>
        </div>
    );
};
