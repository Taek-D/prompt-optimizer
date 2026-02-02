
import React from 'react';
interface DownloadButtonProps {
    content: string;
    filename?: string;
    onDownload?: () => void;
}

export const DownloadButton: React.FC<DownloadButtonProps> = ({ content, filename = 'prompt.txt', onDownload }) => {
    const handleDownload = () => {
        if (onDownload) onDownload();

        // 1. Sanitize filename: alphanumeric, dash, underscore only. Default to 'prompt.txt'.
        const safeFilename = filename.replace(/[^a-z0-9_\-\.]/gi, '_') || 'prompt.txt';

        // 2. Create Blob
        const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });

        // 3. Trigger Download
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = safeFilename;
        document.body.appendChild(a);
        a.click();

        // 4. Cleanup
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    return (
        <button
            data-testid="download-btn"
            onClick={handleDownload}
            className="px-3 py-1 border rounded hover:bg-gray-50 text-sm flex items-center gap-1"
        >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Download
        </button>
    );
};
