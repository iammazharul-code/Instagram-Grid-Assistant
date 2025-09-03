import React, { useRef, useCallback, useState, useEffect } from 'react';
import { MenuIcon, DownChevronIcon, AddStoryIcon, SunIcon, MoonIcon, CreateIcon } from './Icons';
import type { Highlight, Bio, Stats } from '../types';
import StoryHighlight from './StoryHighlight';
import EditableText from './EditableText';
import EditableTextArea from './EditableTextArea';

interface ProfileSectionProps {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  highlights: Highlight[];
  onHighlightImageChange: (id: number, file: File) => void;
  onHighlightLabelChange: (id: number, label: string) => void;
  onHighlightReorder: (draggedId: number, targetId: number) => void;
  profilePic: string | null;
  onProfilePicChange: (file: File) => void;
  bio: Bio;
  onBioChange: (field: keyof Bio, value: string) => void;
  stats: Stats;
  onStatsChange: (field: keyof Stats, value: string) => void;
  onBatchUpload: (files: FileList) => void;
  onBatchHighlightUpload: (files: FileList) => void;
}

const ProfileSection: React.FC<ProfileSectionProps> = ({
  theme,
  toggleTheme,
  highlights,
  onHighlightImageChange,
  onHighlightLabelChange,
  onHighlightReorder,
  profilePic,
  onProfilePicChange,
  bio,
  onBioChange,
  stats,
  onStatsChange,
  onBatchUpload,
  onBatchHighlightUpload,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const batchGridInputRef = useRef<HTMLInputElement>(null);
  const batchHighlightInputRef = useRef<HTMLInputElement>(null);
  const [isUploadMenuOpen, setIsUploadMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const [draggedId, setDraggedId] = useState<number | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsUploadMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [menuRef]);

  const handleProfilePicClick = useCallback(() => {
    fileInputRef.current?.click();
  }, []);
  
  const handleDragStart = (id: number) => {
    setDraggedId(id);
  };

  const handleDrop = (targetId: number) => {
    if (draggedId !== null && draggedId !== targetId) {
      onHighlightReorder(draggedId, targetId);
    }
    setDraggedId(null);
  };

  const handleFileChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onProfilePicChange(file);
    }
    event.target.value = '';
  }, [onProfilePicChange]);

  const handleBatchGridClick = useCallback(() => {
    batchGridInputRef.current?.click();
    setIsUploadMenuOpen(false);
  }, []);

  const handleBatchHighlightClick = useCallback(() => {
    batchHighlightInputRef.current?.click();
    setIsUploadMenuOpen(false);
  }, []);

  const handleBatchFileChange = useCallback((event: React.ChangeEvent<HTMLInputElement>, handler: (files: FileList) => void) => {
    if (event.target.files && event.target.files.length > 0) {
      handler(event.target.files);
    }
    event.target.value = '';
  }, []);

  return (
    <div className="p-4 text-sm text-black dark:text-white">
      {/* Header */}
      <header className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2">
          <h1 className="font-bold text-2xl">iammazharul</h1>
          <DownChevronIcon className="w-4 h-4 mt-1" />
        </div>
        <div className="flex items-center gap-4">
          <button onClick={toggleTheme} aria-label="Toggle theme">
            {theme === 'light' ? <MoonIcon className="w-7 h-7" /> : <SunIcon className="w-7 h-7" />}
          </button>
          <input
            type="file" ref={batchGridInputRef}
            onChange={(e) => handleBatchFileChange(e, onBatchUpload)}
            className="hidden" accept="image/png, image/jpeg, image/webp" multiple
          />
           <input
            type="file" ref={batchHighlightInputRef}
            onChange={(e) => handleBatchFileChange(e, onBatchHighlightUpload)}
            className="hidden" accept="image/png, image/jpeg, image/webp" multiple
          />
          <div className="relative" ref={menuRef}>
            <button onClick={() => setIsUploadMenuOpen(prev => !prev)} aria-label="Create menu">
                <CreateIcon className="w-7 h-7" />
            </button>
            {isUploadMenuOpen && (
                <div className="absolute top-full right-0 mt-2 w-48 bg-white dark:bg-zinc-800 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 z-10">
                <div className="py-1">
                    <button onClick={handleBatchGridClick} className="text-left w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-zinc-700">
                    Add grid images
                    </button>
                    <button onClick={handleBatchHighlightClick} className="text-left w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-zinc-700">
                    Add highlight images
                    </button>
                </div>
                </div>
            )}
          </div>
          <button aria-label="Open menu">
            <MenuIcon className="w-7 h-7" />
          </button>
        </div>
      </header>

      {/* Profile Pic, Name, and Stats */}
      <div className="flex items-center justify-between gap-4">
        <div className="relative flex-shrink-0">
          <input
            type="file" ref={fileInputRef} onChange={handleFileChange}
            className="hidden" accept="image/png, image/jpeg, image/webp"
          />
          <button onClick={handleProfilePicClick} className="w-20 h-20 sm:w-24 sm:h-24 bg-gray-300 rounded-full p-0.5 bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500">
            <div className="bg-white dark:bg-black p-0.5 rounded-full h-full w-full overflow-hidden">
              {profilePic ? (
                <img src={profilePic} alt="Profile" className="rounded-full w-full h-full object-cover" />
              ) : (
                <div className="rounded-full w-full h-full bg-gray-200 dark:bg-zinc-700" />
              )}
            </div>
          </button>
          <div className="absolute -bottom-1 -right-1 bg-blue-500 rounded-full border-2 border-white dark:border-black pointer-events-none">
            <AddStoryIcon className="w-5 h-5 text-white" />
          </div>
        </div>
        <div className="flex-grow">
          <p className="font-bold">
              <EditableText value={bio.name} onChange={(val) => onBioChange('name', val)} inputClassName="font-bold bg-gray-100 dark:bg-zinc-800 w-full focus:outline-none focus:ring-1 focus:ring-blue-500 rounded p-0.5 -m-0.5" />
              <span className="font-normal text-gray-500 dark:text-gray-400 ml-1">
                  <EditableText tag="span" value={bio.pronouns} onChange={(val) => onBioChange('pronouns', val)} />
              </span>
          </p>
          <div className="flex text-left justify-start gap-8 mt-2">
            <div>
              <p className="font-bold text-base">
                <EditableText value={stats.posts} onChange={(val) => onStatsChange('posts', val)} inputClassName="font-bold bg-gray-100 dark:bg-zinc-800 w-16 text-center focus:outline-none focus:ring-1 focus:ring-blue-500 rounded p-0.5 -m-0.5" />
              </p>
              <p className="text-gray-800 dark:text-gray-200">posts</p>
            </div>
            <div>
              <p className="font-bold text-base">
                <EditableText value={stats.followers} onChange={(val) => onStatsChange('followers', val)} inputClassName="font-bold bg-gray-100 dark:bg-zinc-800 w-16 text-center focus:outline-none focus:ring-1 focus:ring-blue-500 rounded p-0.5 -m-0.5" />
              </p>
              <p className="text-gray-800 dark:text-gray-200">followers</p>
            </div>
            <div>
              <p className="font-bold text-base">
                <EditableText value={stats.following} onChange={(val) => onStatsChange('following', val)} inputClassName="font-bold bg-gray-100 dark:bg-zinc-800 w-16 text-center focus:outline-none focus:ring-1 focus:ring-blue-500 rounded p-0.5 -m-0.5" />
              </p>
              <p className="text-gray-800 dark:text-gray-200">following</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bio */}
      <div className="mt-4 space-y-0.5">
        <EditableText value={bio.category} onChange={(val) => onBioChange('category', val)} />
        <EditableTextArea value={bio.description} onChange={(val) => onBioChange('description', val)} />
        <EditableText tag="a" value={bio.link} onChange={(val) => onBioChange('link', val)} className="text-blue-900 dark:text-blue-400 font-semibold" />
      </div>

      {/* Story Highlights */}
      <div
        className="flex space-x-1 justify-center overflow-x-auto py-4 -mx-4 px-4 no-scrollbar"
        onDragOver={(e) => e.preventDefault()}
      >
        {highlights.map(highlight => (
          <StoryHighlight
            key={highlight.id}
            highlight={highlight}
            onImageChange={onHighlightImageChange}
            onLabelChange={onHighlightLabelChange}
            onDragStart={handleDragStart}
            onDrop={handleDrop}
          />
        ))}
      </div>
    </div>
  );
};

export default ProfileSection;
