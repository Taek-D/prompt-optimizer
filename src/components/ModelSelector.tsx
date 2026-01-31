import React from 'react';
import { ModelType } from '@/core/types';

interface ModelSelectorProps {
    selectedModel: ModelType;
    onSelect: (model: ModelType) => void;
}

const models: { id: ModelType; name: string; desc: string }[] = [
    { id: 'openai', name: 'OpenAI (GPT)', desc: 'Instruction-focused' },
    { id: 'claude', name: 'Claude', desc: 'XML-structured' },
    { id: 'gemini', name: 'Google Gemini', desc: 'Role & Context heavy' },
];

export const ModelSelector: React.FC<ModelSelectorProps> = ({ selectedModel, onSelect }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {models.map((m) => (
                <button
                    key={m.id}
                    onClick={() => onSelect(m.id)}
                    className={`
            p-4 border rounded-lg text-left transition-all
            ${selectedModel === m.id
                            ? 'border-blue-500 bg-blue-50 ring-2 ring-blue-200'
                            : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'}
          `}
                >
                    <div className="font-semibold text-gray-900">{m.name}</div>
                    <div className="text-sm text-gray-500">{m.desc}</div>
                </button>
            ))}
        </div>
    );
};
