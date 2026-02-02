import React from 'react';
import { OutputType, ToneType, LengthType, OutputFormat, OptimizeMode } from '@/core/types';

interface OptionsPanelProps {
    outputType: OutputType;
    tone: ToneType;
    length: LengthType;
    format: OutputFormat;
    mode: OptimizeMode;
    safetyExit: boolean;
    selfCheck: boolean;
    onChange: (key: string, val: string | boolean | number) => void;
}

export const OptionsPanel: React.FC<OptionsPanelProps> = ({
    outputType, tone, length, format, mode, safetyExit, selfCheck, onChange
}) => {
    // 1. Presets Logic
    const applyPreset = (type: OutputType) => {
        onChange('outputType', type);
        // Set smart defaults
        if (type === 'summary') {
            onChange('tone', 'neutral');
            onChange('length', 'short');
            onChange('format', 'plain');
        } else if (type === 'marketing_copy') {
            onChange('tone', 'persuasive');
            onChange('length', 'medium');
            onChange('format', 'markdown');
        } else if (type === 'email_reply') {
            onChange('tone', 'friendly');
            onChange('length', 'medium');
            onChange('format', 'plain');
        }
    };

    // 2. Toggles
    const toggleMode = () => {
        const newMode = mode === 'lite' ? 'pro' : 'lite';
        onChange('mode', newMode);
    };

    return (
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-6">
            {/* 3. Header & Pro Toggle */}
            <div className="flex justify-between items-center mb-4">
                <div>
                    <h3 className="font-bold text-gray-900">Optimization Options</h3>
                    <p className="text-xs text-gray-500 mt-1">Select a goal to auto-configure settings.</p>
                </div>
                <button
                    data-testid="mode-toggle-btn"
                    onClick={toggleMode}
                    className="text-xs px-3 py-1.5 bg-white border border-gray-300 rounded-full text-gray-600 hover:bg-gray-100 transition-colors font-medium"
                >
                    {mode === 'lite' ? '⚙️ Advanced' : 'Simple View'}
                </button>
            </div>

            {/* 4. Quick Start Presets (Chips) */}
            <div className="mb-6">
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                    Quick Start (Recommended)
                </label>
                <div className="flex flex-wrap gap-2">
                    <button
                        onClick={() => applyPreset('summary')}
                        className={`px-3 py-1.5 text-sm rounded-full border transition-all ${outputType === 'summary'
                            ? 'bg-blue-100 border-blue-300 text-blue-800 font-medium ring-1 ring-blue-300'
                            : 'bg-white border-gray-300 text-gray-600 hover:bg-gray-50'
                            }`}
                    >
                        📝 Summarize
                    </button>
                    <button
                        onClick={() => applyPreset('marketing_copy')}
                        className={`px-3 py-1.5 text-sm rounded-full border transition-all ${outputType === 'marketing_copy'
                            ? 'bg-purple-100 border-purple-300 text-purple-800 font-medium ring-1 ring-purple-300'
                            : 'bg-white border-gray-300 text-gray-600 hover:bg-gray-50'
                            }`}
                    >
                        ✨ Marketing Copy
                    </button>
                    <button
                        onClick={() => applyPreset('email_reply')}
                        className={`px-3 py-1.5 text-sm rounded-full border transition-all ${outputType === 'email_reply'
                            ? 'bg-green-100 border-green-300 text-green-800 font-medium ring-1 ring-green-300'
                            : 'bg-white border-gray-300 text-gray-600 hover:bg-gray-50'
                            }`}
                    >
                        📧 Email Reply
                    </button>
                </div>
            </div>

            <hr className="border-gray-200 mb-6" />

            {/* 5. Core Options Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 relative">
                {/* Visual Guide for Required Fields */}

                {/* Output Type */}
                <div>
                    <div className="flex justify-between">
                        <label className="block text-xs font-semibold text-gray-700 mb-1">
                            Goal
                        </label>
                        <span className="text-[10px] bg-gray-200 text-gray-600 px-1.5 rounded">Required</span>
                    </div>
                    <select
                        value={outputType}
                        onChange={(e) => onChange('outputType', e.target.value)}
                        className="w-full p-2.5 border border-gray-300 rounded bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm transition-shadow"
                    >
                        <option value="summary">Summary</option>
                        <option value="marketing_copy">Marketing Copy</option>
                        <option value="email_reply">Email Reply</option>
                    </select>
                </div>

                {/* Tone */}
                <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                        Tone
                    </label>
                    <select
                        value={tone}
                        onChange={(e) => onChange('tone', e.target.value)}
                        className="w-full p-2.5 border border-gray-300 rounded bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm transition-shadow"
                    >
                        <option value="formal">Formal (Professional)</option>
                        <option value="neutral">Neutral (Objective)</option>
                        <option value="friendly">Friendly (Casual)</option>
                        <option value="persuasive">Persuasive (Sales)</option>
                    </select>
                </div>
            </div>

            {/* Pro Options */}
            {mode === 'pro' && (
                <div className="mt-6 pt-6 border-t border-gray-200">
                    <h4 className="text-xs font-bold text-gray-900 mb-4 uppercase tracking-wider">Advanced Settings</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        {/* Length */}
                        <div>
                            <label className="block text-xs font-semibold text-gray-700 mb-1">Length Constraint</label>
                            <select
                                value={length}
                                onChange={(e) => onChange('length', e.target.value)}
                                className="w-full p-2.5 border border-gray-300 rounded bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                            >
                                <option value="very_short">Very Short (1-2 sentences)</option>
                                <option value="short">Short (Paragraph)</option>
                                <option value="medium">Medium (Detailed)</option>
                            </select>
                        </div>

                        {/* Format */}
                        <div>
                            <label className="block text-xs font-semibold text-gray-700 mb-1">Output Format</label>
                            <select
                                value={format}
                                onChange={(e) => onChange('format', e.target.value)}
                                className="w-full p-2.5 border border-gray-300 rounded bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                            >
                                <option value="plain">Plain Text</option>
                                <option value="markdown">Markdown</option>
                                <option value="json">JSON Structure</option>
                            </select>
                        </div>
                    </div>

                    {/* Toggles */}
                    <div className="mt-4 flex flex-wrap gap-4">
                        <div className="flex items-center space-x-2 bg-white px-3 py-2 rounded border border-gray-200 shadow-sm">
                            <input
                                type="checkbox"
                                id="safetyExit"
                                data-testid="option-safety-exit"
                                checked={safetyExit}
                                onChange={(e) => onChange('safetyExit', e.target.checked)}
                                className="rounded text-blue-600 focus:ring-blue-500 h-4 w-4"
                            />
                            <label htmlFor="safetyExit" className="text-sm text-gray-700 cursor-pointer select-none">
                                Enable Safety Exit <span className="text-gray-400 text-xs">(If unsure)</span>
                            </label>
                        </div>

                        <div className="flex items-center space-x-2 bg-white px-3 py-2 rounded border border-gray-200 shadow-sm">
                            <input
                                type="checkbox"
                                id="selfCheck"
                                data-testid="option-self-check"
                                checked={selfCheck}
                                onChange={(e) => onChange('selfCheck', e.target.checked)}
                                className="rounded text-blue-600 focus:ring-blue-500 h-4 w-4"
                            />
                            <label htmlFor="selfCheck" className="text-sm text-gray-700 cursor-pointer select-none">
                                Self-Correction Step
                            </label>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
