import { OptimizeDiff, AddedBlock } from './types';

export const computeDiff = (before: string, after: string): OptimizeDiff => {
    // For prompt optimization, "After" usually contains the whole "Before" (Context) wrapped in things.
    // So we primarily want to highlight the *Structural Additions* (Rules).

    // For prompt optimization, "After" usually contains the whole "Before" (Context) wrapped in things.
    // So we primarily want to highlight the *Structural Additions* (Rules).

    // Naive approach: Find "after" parts that are NOT in "before".
    // Actually, prompts are often rearranged.
    // Let's just do a simple "diff-match-patch" style or just highlight new blocks.
    // For MVP, we'll try to identify large contiguous blocks in 'after' that are missing from 'before'.

    const addedBlocks: AddedBlock[] = [];
    const beforeLines = before.split('\n');
    const afterLines = after.split('\n');
    const beforeLen = beforeLines.length;
    const afterLen = afterLines.length;

    const lcsTable: number[][] = Array.from({ length: beforeLen + 1 }, () =>
        Array(afterLen + 1).fill(0)
    );

    for (let i = beforeLen - 1; i >= 0; i -= 1) {
        for (let j = afterLen - 1; j >= 0; j -= 1) {
            if (beforeLines[i] === afterLines[j]) {
                lcsTable[i][j] = lcsTable[i + 1][j + 1] + 1;
            } else {
                lcsTable[i][j] = Math.max(lcsTable[i + 1][j], lcsTable[i][j + 1]);
            }
        }
    }

    const addedLineFlags = Array(afterLen).fill(false);
    let i = 0;
    let j = 0;
    while (i < beforeLen && j < afterLen) {
        if (beforeLines[i] === afterLines[j]) {
            i += 1;
            j += 1;
        } else if (lcsTable[i + 1][j] >= lcsTable[i][j + 1]) {
            i += 1;
        } else {
            addedLineFlags[j] = true;
            j += 1;
        }
    }
    while (j < afterLen) {
        addedLineFlags[j] = true;
        j += 1;
    }

    let cursor = 0;
    let blockStart: number | null = null;
    for (let lineIndex = 0; lineIndex < afterLen; lineIndex += 1) {
        const line = afterLines[lineIndex];
        const lineLength = line.length;
        if (addedLineFlags[lineIndex]) {
            if (blockStart === null) {
                blockStart = cursor;
            }
        } else if (blockStart !== null) {
            addedBlocks.push({ start: blockStart, end: cursor - 1 });
            blockStart = null;
        }

        cursor += lineLength;
        if (lineIndex < afterLen - 1) {
            cursor += 1;
        }
    }

    if (blockStart !== null) {
        addedBlocks.push({ start: blockStart, end: cursor });
    }

    return {
        before,
        after,
        addedBlocks
    };
};
