import React, { useRef, useCallback, useState } from 'react';
import { CloseIcon } from './Icons';

interface GridItemProps {
  id: number;
  imageSrc: string | null;
  onImageChange: (id: number, src: string) => void;
  onClear: (id: number) => void;
  onDragStart: (id: number) => void;
  onDrop: (id: number) => void;
}

const GridItem: React.FC<GridItemProps> = ({ id, imageSrc, onImageChange, onClear, onDragStart, onDrop }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragOver, setIsDragOver] = useState(false);

  const handleFileChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (typeof e.target?.result === 'string') {
          onImageChange(id, e.target.result);
        }
      };
      reader.readAsDataURL(file);
    }
    event.target.value = '';
  }, [id, onImageChange]);

  const handlePlaceholderClick = useCallback(() => {
    inputRef.current?.click();
  }, []);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  }

  const handleDragEnter = () => {
    if (imageSrc) {
      setIsDragOver(true);
    }
  }

  const handleDragLeave = () => {
    setIsDragOver(false);
  }

  const handleDrop = () => {
    setIsDragOver(false);
    onDrop(id);
  }

  return (
    <div 
        className="aspect-[4/5] relative group bg-gray-200 dark:bg-zinc-800"
        draggable={imageSrc !== null}
        onDragStart={() => onDragStart(id)}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
    >
      <input
        type="file"
        ref={inputRef}
        onChange={handleFileChange}
        className="hidden"
        accept="image/png, image/jpeg, image/webp"
      />
      {imageSrc ? (
        <>
          <img src={imageSrc} alt={`Grid item ${id + 1}`} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300"></div>
          <button
            onClick={() => onClear(id)}
            className="absolute top-1 right-1 p-1 bg-black bg-opacity-50 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-opacity-75 focus:outline-none focus:ring-2 focus:ring-white"
            aria-label="Remove image"
          >
            <CloseIcon className="w-4 h-4" />
          </button>
        </>
      ) : (
        <button
          onClick={handlePlaceholderClick}
          className="w-full h-full"
          aria-label="Add image"
        >
        </button>
      )}
      {isDragOver && (
          <div className="absolute inset-0 bg-white bg-opacity-50 ring-2 ring-white pointer-events-none"></div>
      )}
    </div>
  );
};

export default GridItem;