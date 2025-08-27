import React, { useState, useRef, useEffect } from 'react';

interface EditableTextProps {
  value: string;
  onChange: (newValue: string) => void;
  className?: string;
  inputClassName?: string;
  tag?: 'p' | 'span' | 'div' | 'a';
}

const EditableText: React.FC<EditableTextProps> = ({ value, onChange, className, inputClassName, tag = 'p' }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(value);
  const inputRef = useRef<HTMLInputElement>(null);
  const Tag = tag;

  useEffect(() => {
    setText(value);
  }, [value]);
  
  useEffect(() => {
    if (isEditing) {
      inputRef.current?.focus();
      inputRef.current?.select();
    }
  }, [isEditing]);

  const handleBlur = () => {
    setIsEditing(false);
    if (text.trim() === '') {
      setText(value); // revert if empty
    } else if (text !== value) {
      onChange(text);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      inputRef.current?.blur();
    } else if (e.key === 'Escape') {
      setText(value);
      setIsEditing(false);
    }
  };

  if (isEditing) {
    return (
      <input
        ref={inputRef}
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        className={inputClassName || "bg-gray-100 dark:bg-zinc-800 w-full focus:outline-none focus:ring-1 focus:ring-blue-500 rounded p-0.5 -m-0.5"}
      />
    );
  }

  return (
    <Tag onClick={() => setIsEditing(true)} className={`${className} cursor-pointer`}>
      {value}
    </Tag>
  );
};

export default EditableText;