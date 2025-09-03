import React, { useState, useRef, useCallback, useEffect } from 'react';
import type { Highlight } from '../types';
import { PlusIcon } from './Icons';

interface StoryHighlightProps {
  highlight: Highlight;
  onImageChange: (id: number, file: File) => void;
  onLabelChange: (id: number, label: string) => void;
  onDragStart: (id: number) => void;
  onDrop: (id: number) => void;
}

const StoryHighlight: React.FC<StoryHighlightProps> = ({ highlight, onImageChange, onLabelChange, onDragStart, onDrop }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [label, setLabel] = useState(highlight.label);
  const inputRef = useRef<HTMLInputElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing) {
      inputRef.current?.focus();
      inputRef.current?.select();
    }
  }, [isEditing]);

  const handleLabelClick = () => {
    setIsEditing(true);
  };

  const handleLabelChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLabel(e.target.value);
  };

  const handleLabelBlur = () => {
    setIsEditing(false);
    if (label.trim() === '') {
        setLabel(highlight.label); // revert if empty
    } else {
        onLabelChange(highlight.id, label);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      inputRef.current?.blur();
    }
  };

  const handleCircleClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onImageChange(highlight.id, file);
    }
    event.target.value = '';
  }, [highlight.id, onImageChange]);

  return (
    <div
      className="text-center flex-shrink-0 w-20 cursor-grab"
      draggable={true}
      onDragStart={() => onDragStart(highlight.id)}
      onDragOver={(e) => e.preventDefault()}
      onDrop={() => onDrop(highlight.id)}
    >
       <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
        accept="image/png, image/jpeg, image/webp"
      />
      <button 
        onClick={handleCircleClick}
        className="w-16 h-16 bg-gray-200 dark:bg-zinc-800 rounded-full mx-auto border-2 border-gray-300 dark:border-zinc-700 flex items-center justify-center overflow-hidden pointer-events-auto"
        aria-label={`Upload image for ${highlight.label}`}
      >
        {highlight.imageSrc ? (
            <img src={highlight.imageSrc} alt={highlight.label} className="w-full h-full object-cover" />
        ) : (
            <PlusIcon className="w-8 h-8 text-gray-400 dark:text-zinc-500" />
        )}
      </button>
      <div className="text-xs mt-2 font-medium h-8 flex items-center justify-center">
        {isEditing ? (
          <input
            ref={inputRef}
            type="text"
            value={label}
            onChange={handleLabelChange}
            onBlur={handleLabelBlur}
            onKeyDown={handleKeyDown}
            className="text-center bg-transparent w-full focus:outline-none focus:ring-1 focus:ring-blue-500 rounded"
          />
        ) : (
          <p onClick={handleLabelClick} className="truncate w-full cursor-pointer px-1">
            {highlight.label}
          </p>
        )}
      </div>
    </div>
  );
};

export default StoryHighlight;
