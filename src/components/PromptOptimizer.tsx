'use client';

import { useState } from 'react';
import {
    OptimizeInput,
    OptimizeResult,
    Ruleset
} from '@/core/types';
import { optimize } from '@/core/optimizer';
import { computeDiff } from '@/core/diff';
import { saveHistory } from '@/core/history';
import ruleset from '@/data/ruleset.v1.json';

import { ModelSelector } from '@/components/ModelSelector';
import { PromptInput } from '@/components/PromptInput';
import { OptionsPanel } from '@/components/OptionsPanel';
import { BeforeAfter } from '@/components/BeforeAfter';
import { HistoryDrawer } from '@/components/HistoryDrawer';
import Link from 'next/link';

export const PromptOptimizer = () => {
    const [input, setInput] = useState<OptimizeInput>({
        rawPrompt: '',
        model: 'openai',
        outputType: 'summary',
        mode: 'lite',
        tone: 'neutral',
        length: 'medium',
        format: 'plain',
        safetyExit: true,
        selfCheck: true,
    });

    const [result, setResult] = useState<OptimizeResult | null>(null);
    const [historyOpen, setHistoryOpen] = useState(false);

    // Load ruleset properly
    const currentRuleset: Ruleset = ruleset as unknown as Ruleset;

    const handleOptimize = () => {
        if (!input.rawPrompt.trim()) return;

        const res = optimize(input, currentRuleset);

        if (res.warnings.some(w => w.type === 'error')) {
            alert(res.warnings[0].message);
            return;
        }

        // Compute diff
        const diff = computeDiff(input.rawPrompt, res.optimizedPrompt);
        res.diff = diff;

        setResult(res);
        saveHistory(input, res);
    };

    const loadFromHistory = (oldInput: OptimizeInput) => {
        setInput(oldInput);
        setResult(null);
    };

    const handleChange = (key: string, val: string | boolean | number) => {
        setInput(prev => ({ ...prev, [key]: val }));
    };

    return (
        <>
            {/* Header with History Button */}
            <header className="flex justify-between items-center mb-8 border-b pb-4">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">PromptOptimizer <span className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded ml-2">MVP</span></h1>
                    <p className="text-gray-500 text-sm mt-1">Rule-based optimization for OpenAI, Claude, and Gemini.</p>
                </div>
                <div className="space-x-4">
                    <Link href="/faq" className="text-sm text-gray-500 hover:text-blue-600">FAQ</Link>
                    <button data-testid="history-open-btn" onClick={() => setHistoryOpen(true)} className="text-sm text-gray-500 hover:text-blue-600 font-medium">History</button>
                </div>
            </header>

            {/* Core Flow */}
            <ModelSelector
                selectedModel={input.model}
                onSelect={(m) => handleChange('model', m)}
            />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                    <PromptInput
                        value={input.rawPrompt}
                        onChange={(val) => handleChange('rawPrompt', val)}
                    />
                </div>
                <div className="lg:col-span-1">
                    <OptionsPanel
                        {...input}
                        onChange={handleChange}
                    />
                    <button
                        onClick={handleOptimize}
                        disabled={!input.rawPrompt.trim()}
                        className={`
                    w-full py-3 rounded-lg font-bold text-white shadow transition-all mt-4
                    ${input.rawPrompt.trim()
                                ? 'bg-blue-600 hover:bg-blue-700 hover:shadow-md'
                                : 'bg-gray-300 cursor-not-allowed'}
                `}
                    >
                        Optimize Prompt ✨
                    </button>
                </div>
            </div>

            {/* Result */}
            <BeforeAfter
                rawPrompt={input.rawPrompt}
                result={result}
                diff={result?.diff}
            />

            <HistoryDrawer
                isOpen={historyOpen}
                onClose={() => setHistoryOpen(false)}
                onLoad={loadFromHistory}
            />
        </>
    );
};
