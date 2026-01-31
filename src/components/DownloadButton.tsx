
import React from 'react';
interface DownloadButtonProps {
    content: string;
    filename?: string;
}

export const DownloadButton: React.FC<DownloadButtonProps> = ({ content, filename = 'prompt.txt' }) => {
    const handleDownload = () => {
        // Dummy implementation for shell
        console.log(`Downloading ${filename}:`, content.slice(0, 20) + '...');
        alert(`Download Started (Dummy Shell)`);
    };

    return (
        <button
            onClick={handleDownload}
            className="px-3 py-1 border rounded hover:bg-gray-50 text-sm"
        >
            Download
        </button>
    );
};
