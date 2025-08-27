import React, { useState, useRef, useEffect } from 'react';
import { HomeIcon, SearchIcon, NewPostIcon, ReelsIcon } from './Icons';

interface BottomNavProps {
    profilePic: string | null;
    onOpenSplitter: () => void;
    onOpenHistory: () => void;
}

const BottomNav: React.FC<BottomNavProps> = ({ profilePic, onOpenSplitter, onOpenHistory }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setIsMenuOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleSplitClick = () => {
        onOpenSplitter();
        setIsMenuOpen(false);
    }
    
    const handleHistoryClick = () => {
        onOpenHistory();
        setIsMenuOpen(false);
    }

    return (
        <footer className="fixed bottom-0 left-0 right-0 w-full max-w-md mx-auto bg-white border-t border-gray-200 dark:bg-black dark:border-zinc-800 text-black dark:text-white">
            <div className="flex justify-around items-center h-14">
                <button aria-label="Home">
                    <HomeIcon className="w-7 h-7" />
                </button>
                <button aria-label="Search">
                    <SearchIcon className="w-7 h-7" />
                </button>
                <div className="relative" ref={menuRef}>
                    {isMenuOpen && (
                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 bg-gray-100 dark:bg-zinc-800 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 z-10">
                            <div className="py-1">
                                <button onClick={handleSplitClick} className="text-left w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-zinc-700">
                                    Split an image
                                </button>
                                <button onClick={handleHistoryClick} className="text-left w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-zinc-700">
                                    See Split History
                                </button>
                            </div>
                        </div>
                    )}
                    <button aria-label="New post options" onClick={() => setIsMenuOpen(prev => !prev)}>
                        <NewPostIcon className="w-7 h-7" />
                    </button>
                </div>
                <button aria-label="Reels">
                    <ReelsIcon className="w-7 h-7" />
                </button>
                <div className="w-7 h-7 bg-gray-300 dark:bg-zinc-700 rounded-full border-2 border-black dark:border-white overflow-hidden">
                    {profilePic ? (
                        <img src={profilePic} alt="Profile" className="w-full h-full object-cover" />
                    ) : (
                       <div className="w-full h-full bg-gray-300 dark:bg-zinc-700" />
                    )}
                </div>
            </div>
        </footer>
    );
};

export default BottomNav;