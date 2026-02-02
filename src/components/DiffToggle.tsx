import React from 'react';

interface DiffToggleProps {
    enabled: boolean;
    onToggle: () => void;
}

export const DiffToggle: React.FC<DiffToggleProps> = ({ enabled, onToggle }) => {
    return (
        <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600">Diff</span>
            <button
                data-testid="diff-toggle"
                onClick={onToggle}
                className={`
          w-10 h-5 rounded-full flex items-center p-1 transition-colors 
          ${enabled ? 'bg-green-500' : 'bg-gray-300'}
        `}
            >
                <div
                    className={`
            w-3 h-3 bg-white rounded-full shadow transition-transform 
            ${enabled ? 'translate-x-5' : ''}
          `}
                />
            </button>
        </div>
    );
};
