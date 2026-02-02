import React, { useState } from 'react';
import { OptimizeResult, OptimizeDiff } from '@/core/types';
import { DiffToggle } from './DiffToggle';
import { CopyButton } from './CopyButton';
import { DownloadButton } from './DownloadButton';
import { trackEvent } from '@/core/analytics';

interface BeforeAfterProps {
    rawPrompt: string;
    result: OptimizeResult | null;
    diff: OptimizeDiff | undefined;
}

export const BeforeAfter: React.FC<BeforeAfterProps> = ({ rawPrompt, result, diff }) => {
    const [showDiff, setShowDiff] = useState(false);

    if (!result) return null;

    // Render content with highlighting if diff ON
    const renderContent = () => {
        if (showDiff && diff) {
            const text = diff.after;
            const elements = [];

            let lastIdx = 0;
            const blocks = diff.addedBlocks.sort((a, b) => a.start - b.start);

            blocks.forEach((block, idx) => {
                // Safety check for bounds
                const safeStart = Math.min(Math.max(0, block.start), text.length);
                const safeEnd = Math.min(Math.max(0, block.end), text.length);

                if (safeStart > safeEnd) return; // Invalid block

                if (safeStart > lastIdx) {
                    elements.push(<span key={`std-${idx}`}>{text.slice(lastIdx, safeStart)}</span>);
                }
                elements.push(
                    <span key={`hl-${idx}`} className="bg-green-100 text-green-800">
                        {text.slice(safeStart, safeEnd)}
                    </span>
                );
                lastIdx = safeEnd;
            });

            if (lastIdx < text.length) {
                elements.push(<span key="tail">{text.slice(lastIdx)}</span>);
            }

            return <pre data-testid="optimized-result-content" className="whitespace-pre-wrap font-mono text-sm">{elements}</pre>;
        } else {
            return <pre data-testid="optimized-result-content" className="whitespace-pre-wrap font-mono text-sm">{result.optimizedPrompt}</pre>;
        }
    };

    return (
        <div className="mt-8 border-t pt-8">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold">Optimized Result</h3>
                <div className="space-x-2 flex items-center">
                    {/* Tags */}
                    <div className="mr-4 hidden md:flex space-x-1">
                        {result.appliedTags.map(tag => (
                            <span key={tag} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">#{tag}</span>
                        ))}
                    </div>

                    <DiffToggle enabled={showDiff} onToggle={() => setShowDiff(!showDiff)} />

                    <DownloadButton content={result.optimizedPrompt} onDownload={() => {
                        trackEvent('download_clicked');
                    }} />
                    <CopyButton text={result.optimizedPrompt} onCopy={() => {
                        trackEvent('copy_after_clicked');
                    }} />
                </div>
            </div>

            {/* Warnings */}
            {result.warnings.length > 0 && (
                <div className="mb-4 space-y-2">
                    {result.warnings.map((w, i) => (
                        <div key={i} className={`p-3 rounded text-sm ${w.type === 'error' ? 'bg-red-50 text-red-700' : 'bg-yellow-50 text-yellow-700'}`}>
                            {w.message}
                        </div>
                    ))}
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Before */}
                <div className="space-y-2">
                    <div className="text-sm font-semibold text-gray-500">Original</div>
                    <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 min-h-[200px]">
                        <pre className="whitespace-pre-wrap font-mono text-sm text-gray-600">{rawPrompt}</pre>
                    </div>
                </div>

                {/* After */}
                <div className="space-y-2">
                    <div className="text-sm font-semibold text-green-600">Optimized</div>
                    <div className="bg-white p-4 rounded-lg border border-green-200 min-h-[200px] shadow-sm ring-1 ring-green-100">
                        {renderContent()}
                    </div>
                </div>
            </div>
        </div>
    );
};
