import React from 'react';
import type { SplitHistoryItem } from '../types';
import { CloseIcon, DownloadIcon } from './Icons';

interface SplitHistoryModalProps {
  history: SplitHistoryItem[];
  onClose: () => void;
}

const SplitHistoryModal: React.FC<SplitHistoryModalProps> = ({ history, onClose }) => {
  const handleDownload = (item: SplitHistoryItem) => {
    item.splitImages.forEach((imageSrc, index) => {
      const link = document.createElement('a');
      link.href = imageSrc;
      link.download = `split_${item.id}_${index + 1}.jpeg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 z-40 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-zinc-900 rounded-lg shadow-xl w-full max-w-md max-h-[80vh] flex flex-col text-black dark:text-white">
        <header className="p-4 border-b border-gray-200 dark:border-zinc-700 flex justify-between items-center">
          <h2 className="text-lg font-semibold">Split Image History</h2>
          <button onClick={onClose} aria-label="Close">
            <CloseIcon className="w-6 h-6" />
          </button>
        </header>
        <main className="p-4 overflow-y-auto">
          {history.length === 0 ? (
            <p className="text-gray-500 dark:text-gray-400 text-center py-8">
              You haven't split any images yet.
            </p>
          ) : (
            <ul className="space-y-4">
              {history.map((item) => (
                <li key={item.id} className="flex items-center justify-between gap-4 p-2 rounded-md bg-gray-50 dark:bg-zinc-800">
                  <div className="w-24 h-16 bg-gray-200 dark:bg-zinc-700 rounded flex items-center justify-center">
                    <img
                      src={item.originalSrc}
                      alt={`Split image ${item.id}`}
                      className="max-w-full max-h-full object-contain"
                    />
                  </div>
                  <button
                    onClick={() => handleDownload(item)}
                    className="flex items-center gap-2 px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-500 transition-colors"
                    aria-label={`Download ${item.splitImages.length} split images for item ${item.id}`}
                  >
                    <DownloadIcon className="w-5 h-5" />
                    <span>Download ({item.splitImages.length})</span>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </main>
      </div>
    </div>
  );
};

export default SplitHistoryModal;