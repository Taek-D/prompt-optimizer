import React, { useState } from 'react';
import { OutputType, ToneType, LengthType, OutputFormat, OptimizeMode } from '@/core/types';

interface OptionsPanelProps {
    outputType: OutputType;
    tone: ToneType;
    length: LengthType;
    format: OutputFormat;
    mode: OptimizeMode;
    safetyExit: boolean;
    selfCheck: boolean;
    onChange: (key: string, val: any) => void;
}

export const OptionsPanel: React.FC<OptionsPanelProps> = ({
    outputType, tone, length, format, mode, safetyExit, selfCheck, onChange
}) => {
    const [isExpanded, setIsExpanded] = useState(mode === 'pro');

    const toggleMode = () => {
        const newMode = mode === 'lite' ? 'pro' : 'lite';
        onChange('mode', newMode);
        setIsExpanded(newMode === 'pro');
    };

    return (
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-6">
            <div className="flex justify-between items-center mb-4">
                <h3 className="font-medium text-gray-900">Optimization Options</h3>
                <button
                    onClick={toggleMode}
                    className="text-xs px-2 py-1 bg-white border rounded text-gray-600 hover:bg-gray-100"
                >
                    {mode === 'lite' ? 'Switch to Pro' : 'Switch to Lite'}
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Output Type */}
                <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1">Output Type</label>
                    <select
                        value={outputType}
                        onChange={(e) => onChange('outputType', e.target.value)}
                        className="w-full p-2 border rounded bg-white"
                    >
                        <option value="summary">Summary</option>
                        <option value="marketing_copy">Marketing Copy</option>
                        <option value="email_reply">Email Reply</option>
                    </select>
                </div>

                {/* Tone */}
                <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1">Tone</label>
                    <select
                        value={tone}
                        onChange={(e) => onChange('tone', e.target.value)}
                        className="w-full p-2 border rounded bg-white"
                    >
                        <option value="formal">Formal</option>
                        <option value="neutral">Neutral</option>
                        <option value="friendly">Friendly</option>
                        <option value="persuasive">Persuasive</option>
                    </select>
                </div>
            </div>

            {/* Pro Options */}
            {mode === 'pro' && (
                <div className="mt-4 pt-4 border-t border-gray-200 grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Length */}
                    <div>
                        <label className="block text-xs font-medium text-gray-500 mb-1">Length</label>
                        <select
                            value={length}
                            onChange={(e) => onChange('length', e.target.value)}
                            className="w-full p-2 border rounded bg-white"
                        >
                            <option value="very_short">Very Short</option>
                            <option value="short">Short</option>
                            <option value="medium">Medium</option>
                        </select>
                    </div>

                    {/* Format */}
                    <div>
                        <label className="block text-xs font-medium text-gray-500 mb-1">Format</label>
                        <select
                            value={format}
                            onChange={(e) => onChange('format', e.target.value)}
                            className="w-full p-2 border rounded bg-white"
                        >
                            <option value="plain">Plain Text</option>
                            <option value="markdown">Markdown</option>
                            <option value="json">JSON</option>
                        </select>
                    </div>

                    {/* Toggles */}
                    <div className="flex items-center space-x-2 mt-2">
                        <input
                            type="checkbox"
                            id="safetyExit"
                            checked={safetyExit}
                            onChange={(e) => onChange('safetyExit', e.target.checked)}
                            className="rounded text-blue-600"
                        />
                        <label htmlFor="safetyExit" className="text-sm text-gray-700">Safety Exit ("No Info")</label>
                    </div>

                    <div className="flex items-center space-x-2 mt-2">
                        <input
                            type="checkbox"
                            id="selfCheck"
                            checked={selfCheck}
                            onChange={(e) => onChange('selfCheck', e.target.checked)}
                            className="rounded text-blue-600"
                        />
                        <label htmlFor="selfCheck" className="text-sm text-gray-700">Self-Check Section</label>
                    </div>
                </div>
            )}
        </div>
    );
};
