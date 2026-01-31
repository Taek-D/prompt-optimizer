import { OptimizeDiff, AddedBlock } from './types';

export const computeDiff = (before: string, after: string): OptimizeDiff => {
    // Block Diff Goal: Highlight blocks (paragraphs/sections) in 'after' that are NOT in 'before'.

    // 1. Split into blocks (by double newline or just newline?)
    // User requested "Empty line / Section" split.
    const splitIntoBlocks = (text: string) => {
        return text.split(/\n\s*\n/).map(b => b.trim()).filter(b => b.length > 0);
    };

    const beforeBlocks = splitIntoBlocks(before);

    // We need to map blocks back to the original text indices for highlighting.
    // Let's iterate through the 'after' text and identify blocks.

    const addedBlocks: AddedBlock[] = [];

    // Regex to find blocks in 'after' (split by double newline)
    const blockRegex = /([^\n]+(?:\n(?!\n)[^\n]+)*)/g;
    // Matches non-empty lines, allowing single newlines within a block, but stops at double newline.
    // Actually simplicity: just split by \n\n and find indices?

    // Robust way:
    let match;
    const separator = /\n\s*\n/g;

    // Let's manually traverse 'after' to find blocks.
    // Or just simple line-by-line check if "Block Level" is too complex for 1 file?
    // "Block unit (blank line/section)" requested.

    let currentPos = 0;
    // We'll normalize 'before' into a single string for containment check?
    // Or check against beforeBlocks.

    // Let split 'after' by \n\n
    const afterParts = after.split(/\n\s*\n/);

    // We need correct indices.
    let searchStart = 0;

    afterParts.forEach(part => {
        const trimmedPart = part.trim();
        if (!trimmedPart) {
            // Just specific to separator, advance index
            // How much did we advance?
            // This is tricky with split. 
            // Let's use regex matchAll if available or simple index search.
            return;
        }

        // Find this part in 'after' strictly
        const partIdx = after.indexOf(part, searchStart);
        if (partIdx === -1) return; // Should not happen

        const partEnd = partIdx + part.length;

        // CHECK: Is this block in 'before'?
        // Heuristic: Is a significant portion of this block present in 'before'?
        // Or strict equality? 
        // "A ruleset template usually ADDS new instructions."
        // So strict inequality is good.
        // But 'context' block IS in before.

        // Check if `trimmedPart` is approximately in `before`.
        // Simplest: `before.includes(trimmedPart)`
        if (!before.includes(trimmedPart)) {
            addedBlocks.push({
                start: partIdx,
                end: partEnd
            });
        }

        searchStart = partEnd;
    });

    return {
        before,
        after,
        addedBlocks
    };
};
