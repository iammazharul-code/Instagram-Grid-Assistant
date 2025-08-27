import React, { useState, useRef, useEffect, useCallback } from 'react';

interface EditableTextAreaProps {
  value: string;
  onChange: (newValue: string) => void;
  className?: string;
  inputClassName?: string;
}

const EditableTextArea: React.FC<EditableTextAreaProps> = ({ value, onChange, className, inputClassName }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(value);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    setText(value);
  }, [value]);

  const autoResize = useCallback(() => {
    const textArea = textAreaRef.current;
    if (textArea) {
      textArea.style.height = 'auto';
      textArea.style.height = `${textArea.scrollHeight}px`;
    }
  }, []);

  useEffect(() => {
    if (isEditing) {
      textAreaRef.current?.focus();
      textAreaRef.current?.select();
      autoResize();
    }
  }, [isEditing, autoResize]);
  
  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
    autoResize();
  };

  const handleBlur = () => {
    setIsEditing(false);
    if (text.trim() === '') {
      setText(value); // revert if empty
    } else if (text !== value) {
      onChange(text);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        textAreaRef.current?.blur();
    } else if (e.key === 'Escape') {
      setText(value);
      setIsEditing(false);
    }
  };

  if (isEditing) {
    return (
      <textarea
        ref={textAreaRef}
        value={text}
        onChange={handleTextChange}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        className={inputClassName || "bg-gray-100 dark:bg-zinc-800 w-full focus:outline-none focus:ring-1 focus:ring-blue-500 rounded p-0.5 -m-0.5 resize-none overflow-hidden"}
        rows={1}
      />
    );
  }

  return (
    <div onClick={() => setIsEditing(true)} className={`${className} cursor-pointer whitespace-pre-wrap`}>
      {value}
    </div>
  );
};

export default EditableTextArea;