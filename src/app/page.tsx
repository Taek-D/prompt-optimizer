'use client';

import { useState } from 'react';
import {
  OptimizeInput,
  OptimizeResult,
  ModelType,
  OutputType,
  OptimizeMode,
  ToneType,
  LengthType,
  OutputFormat
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

export default function Home() {
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

  // Load ruleset properly? It's JSON, so it's loaded as object.
  // We need to cast it or allow it. TypeScript might complain if strict.
  // For MVP, we assume format matches Ruleset interface or we cast.
  // Load ruleset
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const currentRuleset = ruleset as any;

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
    // We could also load the old result, but usually we just load input and let user optimize again or see it?
    // History saves Result too. Let's try to restore result if possible.
    // But for "Load", usually we want to edit.
    // Let's just load input.
    setResult(null); // Reset result on load to encourage re-optimization or we could store result in history item...
    // My history logic stores result.
  };

  const handleChange = (key: string, val: any) => {
    setInput(prev => ({ ...prev, [key]: val }));
  };

  return (
    <main className="min-h-screen bg-white text-gray-900 font-sans">
      <div className="max-w-4xl mx-auto p-6">
        {/* Header */}
        <header className="flex justify-between items-center mb-8 border-b pb-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">PromptOptimizer <span className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded ml-2">MVP</span></h1>
            <p className="text-gray-500 text-sm mt-1">Rule-based optimization for OpenAI, Claude, and Gemini.</p>
          </div>
          <div className="space-x-4">
            <a href="/faq" className="text-sm text-gray-500 hover:text-blue-600">FAQ</a>
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
      </div>

      <HistoryDrawer
        isOpen={historyOpen}
        onClose={() => setHistoryOpen(false)}
        onLoad={loadFromHistory}
      />

      <footer className="max-w-4xl mx-auto p-6 mt-8 text-center text-gray-400 text-xs">
        <p>🔒 Privacy Notice: Your inputs are processed locally in your browser and are never sent to any server.</p>
        <p className="mt-1">© 2026 Antigravity Project</p>
      </footer>
    </main>
  );
}
