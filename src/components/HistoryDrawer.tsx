import React, { useEffect, useState } from 'react';
import { HistoryItem, getHistory, deleteHistoryItem, clearHistory } from '@/core/history';
import { OptimizeInput } from '@/core/types';

interface HistoryDrawerProps {
    isOpen: boolean;
    onClose: () => void;
    onLoad: (input: OptimizeInput) => void;
}

export const HistoryDrawer: React.FC<HistoryDrawerProps> = ({ isOpen, onClose, onLoad }) => {
    const [items, setItems] = useState<HistoryItem[]>([]);

    useEffect(() => {
        if (isOpen) {
            // Simply load from local storage every time it opens.
            // Since getHistory is synchronous and fast enough for this MVP.
            // eslint-disable-next-line
            setItems(getHistory());
        }
    }, [isOpen]);

    const handleDelete = (id: string, e: React.MouseEvent) => {
        e.stopPropagation();
        if (confirm('Delete this item?')) {
            setItems(deleteHistoryItem(id));
        }
    };

    const handleClear = () => {
        if (confirm('Clear all history?')) {
            clearHistory();
            setItems([]);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex justify-end">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black bg-opacity-30 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            />

            {/* Drawer */}
            <div className="relative w-96 bg-white h-full shadow-2xl flex flex-col transform transition-transform duration-300 ease-in-out">
                {/* Header */}
                <div className="p-4 border-b flex justify-between items-center bg-gray-50">
                    <h2 className="text-lg font-bold text-gray-800">History</h2>
                    <div className="flex items-center space-x-3">
                        {items.length > 0 && (
                            <button
                                onClick={handleClear}
                                className="text-xs text-red-600 hover:text-red-800 font-medium px-2 py-1 rounded hover:bg-red-50 transition-colors"
                            >
                                Clear All
                            </button>
                        )}
                        <button
                            onClick={onClose}
                            className="text-gray-400 hover:text-gray-700 p-1 rounded-full hover:bg-gray-200 transition-colors"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                </div>

                {/* List */}
                <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50/50">
                    {items.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-48 text-gray-400">
                            <span className="text-4xl mb-2">🕰️</span>
                            <span className="text-sm">No history yet</span>
                        </div>
                    ) : (
                        items.map(item => (
                            <div
                                key={item.id}
                                onClick={() => { onLoad(item.input); onClose(); }}
                                className="bg-white p-4 border border-gray-200 rounded-lg shadow-sm cursor-pointer hover:shadow-md hover:border-blue-300 transition-all group relative overflow-hidden"
                            >
                                <div className="flex justify-between items-start mb-2">
                                    <div className="font-semibold text-gray-800 truncate pr-6">{item.title || "Untitled"}</div>
                                    <button
                                        onClick={(e) => handleDelete(item.id, e)}
                                        className="absolute top-2 right-2 text-gray-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity p-1 bg-white/80 rounded"
                                    >
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                        </svg>
                                    </button>
                                </div>

                                <div className="flex flex-wrap gap-2 text-xs text-gray-500 mb-2">
                                    <span className="bg-blue-50 text-blue-700 px-2 py-0.5 rounded">{item.input.model}</span>
                                    <span className="bg-purple-50 text-purple-700 px-2 py-0.5 rounded">{item.input.outputType}</span>
                                </div>

                                <div className="text-xs text-gray-400 pt-2 border-t border-gray-100 flex justify-between">
                                    <span>{new Date(item.timestamp).toLocaleDateString()}</span>
                                    <span>{new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};
