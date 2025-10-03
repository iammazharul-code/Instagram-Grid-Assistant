
import React, { useState, useCallback, useEffect } from 'react';
import type { GridItemType, Highlight, Bio, Stats, SplitHistoryItem } from './types';
import GridItem from './components/GridItem';
import ProfileSection from './components/ProfileSection';
import PostTabs from './components/PostTabs';
import BottomNav from './components/BottomNav';
import ImageSplitter from './components/ImageSplitter';
import SplitHistoryModal from './components/SplitHistoryModal';
import OnboardingTooltip from './components/OnboardingTooltip';

const MIN_GRID_ITEMS = 12;
const ONBOARDING_KEY = 'instagram-grid-previewer-visited';


// Helper function to convert a File object to a base64 data URL.
const createPublicFile = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        resolve(reader.result);
      } else {
        reject(new Error('FileReader result is not a string.'));
      }
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};


const initialGridItems: GridItemType[] = Array.from({ length: MIN_GRID_ITEMS }, (_, i) => ({
  id: i,
  imageSrc: null,
}));

const initialHighlights: Highlight[] = [
  { id: 1, label: 'Clients', imageSrc: null },
  { id: 2, label: '3D', imageSrc: null },
  { id: 3, label: 'Take a break', imageSrc: null },
  { id: 4, label: 'Animation', imageSrc: null },
  { id: 5, label: 'Inspirations', imageSrc: null },
];

const initialBio: Bio = {
  name: 'Mazharul Islam Mahim',
  pronouns: 'he/him',
  category: 'Artist',
  description: 'Artist || Animator || Motion Designer || 3D Generalist\n📩 Open to freelance projects\nCheck out more of my stuff 👇',
  link: 'iammazharul.com and 4 more',
};

const initialStats: Stats = {
  posts: '340',
  followers: '413',
  following: '580',
};

const App: React.FC = () => {
  const [gridItems, setGridItems] = useState<GridItemType[]>(initialGridItems);
  const [highlights, setHighlights] = useState<Highlight[]>(initialHighlights);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [profilePic, setProfilePic] = useState<string | null>('https://iammazharul-code.github.io/portfolio-assets/Test/dp-A-small.jpg');
  const [bio, setBio] = useState<Bio>(initialBio);
  const [stats, setStats] = useState<Stats>(initialStats);
  
  const [isSplitterOpen, setIsSplitterOpen] = useState(false);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [splitHistory, setSplitHistory] = useState<SplitHistoryItem[]>([]);
  const [draggedGridItemId, setDraggedGridItemId] = useState<number | null>(null);
  const [showOnboarding, setShowOnboarding] = useState(false);


  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
  }, [theme]);

  useEffect(() => {
    try {
      const hasVisited = localStorage.getItem(ONBOARDING_KEY);
      if (!hasVisited) {
        setShowOnboarding(true);
      }
    } catch (error) {
      console.error("Could not access localStorage:", error);
      setShowOnboarding(false);
    }
  }, []);

  const handleDismissOnboarding = useCallback(() => {
    try {
      const hasVisited = localStorage.getItem(ONBOARDING_KEY);
      if (!hasVisited) {
        localStorage.setItem(ONBOARDING_KEY, 'true');
      }
    } catch (error) {
      console.error("Could not write to localStorage:", error);
    }
    setShowOnboarding(false);
  }, []);

  const toggleOnboarding = useCallback(() => {
    setShowOnboarding(prev => !prev);
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  }, []);

  const handleImageChange = useCallback(async (id: number, file: File) => {
    const imageSrc = await createPublicFile(file);
    setGridItems((prevItems) =>
      prevItems.map((item) => (item.id === id ? { ...item, imageSrc } : item))
    );
  }, []);

  const handleClearItem = useCallback((id: number) => {
    setGridItems((prevItems) => {
      let newItems = prevItems.filter(item => item.id !== id);
      while (newItems.length < MIN_GRID_ITEMS) {
          newItems.push({ id: Date.now() + newItems.length, imageSrc: null });
      }
      return newItems.map((item, index) => ({ ...item, id: index }));
    });
  }, []);

  const handleHighlightImageChange = useCallback(async (id: number, file: File) => {
    const imageSrc = await createPublicFile(file);
    setHighlights((prev) =>
      prev.map((h) => (h.id === id ? { ...h, imageSrc } : h))
    );
  }, []);

  const handleHighlightLabelChange = useCallback((id: number, label: string) => {
    setHighlights((prev) =>
      prev.map((h) => (h.id === id ? { ...h, label } : h))
    );
  }, []);

  const handleHighlightReorder = useCallback((draggedId: number, targetId: number) => {
    setHighlights(prevHighlights => {
      const draggedIndex = prevHighlights.findIndex(h => h.id === draggedId);
      const targetIndex = prevHighlights.findIndex(h => h.id === targetId);

      if (draggedIndex === -1 || targetIndex === -1 || draggedIndex === targetIndex) {
        return prevHighlights;
      }

      const newHighlights = [...prevHighlights];
      const [draggedItem] = newHighlights.splice(draggedIndex, 1);
      newHighlights.splice(targetIndex, 0, draggedItem);

      return newHighlights;
    });
  }, []);
  
  const handleProfilePicChange = useCallback(async (file: File) => {
    const imageSrc = await createPublicFile(file);
    setProfilePic(imageSrc);
  }, []);
  
  const handleBioChange = useCallback((field: keyof Bio, value: string) => {
    setBio(prevBio => ({ ...prevBio, [field]: value }));
  }, []);

  const handleStatsChange = useCallback((field: keyof Stats, value: string) => {
    setStats(prevStats => ({ ...prevStats, [field]: value }));
  }, []);
  
  const handleBatchUpload = useCallback(async (files: FileList) => {
    const imageFiles = Array.from(files).filter(file => file.type.startsWith('image/'));
    if (imageFiles.length === 0) return;

    try {
        const publicPaths = await Promise.all(imageFiles.map(file => createPublicFile(file)));
        
        setGridItems(prevItems => {
            const newImageItems = publicPaths.map((src, index) => ({
                id: Date.now() + index, // Temp ID
                imageSrc: src
            }));
            const existingItems = prevItems.filter(item => item.imageSrc !== null);
            let combined = [...newImageItems, ...existingItems];
            
            const emptyItemsToAdd = Math.max(0, MIN_GRID_ITEMS - combined.length);
            for (let i = 0; i < emptyItemsToAdd; i++) {
                combined.push({ id: Date.now() + combined.length, imageSrc: null });
            }
            
            return combined.map((item, index) => ({ ...item, id: index }));
        });
    } catch (error) {
        console.error("Error creating public files:", error);
    }
  }, []);
  
  const handleBatchHighlightUpload = useCallback(async (files: FileList) => {
    const imageFiles = Array.from(files).filter(file => file.type.startsWith('image/'));
    if (imageFiles.length === 0) return;

    try {
        const publicPaths = await Promise.all(imageFiles.map(file => createPublicFile(file)));
        setHighlights(prevItems => {
            const newItems = [...prevItems];
            let imageIndex = 0;
            for (let i = 0; i < newItems.length && imageIndex < publicPaths.length; i++) {
            if (newItems[i].imageSrc === null) {
                newItems[i] = { ...newItems[i], imageSrc: publicPaths[imageIndex] };
                imageIndex++;
            }
            }
            return newItems;
        });
    } catch (error) {
        console.error("Error creating public files:", error);
    }
  }, []);
  
  const handleSplitConfirm = useCallback(async (data: { originalSrc: string, splitImages: string[] }) => {
    const timestamp = Date.now();
    
    // Add to history using the direct data URLs
    setSplitHistory(prev => [...prev, { 
        id: timestamp, 
        originalSrc: data.originalSrc,
        splitImages: data.splitImages 
    }]);
    
    // Add to grid using the direct data URLs
    setGridItems(prevItems => {
        const newImages = data.splitImages.map((src, index) => ({
            id: timestamp + index, // Use a unique ID
            imageSrc: src
        }));
        const existingItems = prevItems.filter(item => item.imageSrc !== null);
        const emptyItems = prevItems.filter(item => item.imageSrc === null);
        
        let combined = [...newImages, ...existingItems, ...emptyItems];
        while (combined.length < MIN_GRID_ITEMS) {
            combined.push({ id: Date.now() + combined.length, imageSrc: null });
        }

        return combined.map((item, index) => ({ ...item, id: index }));
    });

    setIsSplitterOpen(false);
  }, []);

  const handleGridReorder = useCallback((targetId: number) => {
    if (draggedGridItemId === null || draggedGridItemId === targetId) {
        setDraggedGridItemId(null);
        return;
    }

    setGridItems(prevItems => {
        const draggedIndex = prevItems.findIndex(i => i.id === draggedGridItemId);
        const targetIndex = prevItems.findIndex(i => i.id === targetId);

        if (draggedIndex === -1 || targetIndex === -1) return prevItems;
        
        const newItems = [...prevItems];
        const [draggedItem] = newItems.splice(draggedIndex, 1);
        newItems.splice(targetIndex, 0, draggedItem);
        
        return newItems.map((item, index) => ({...item, id: index}));
    });
    setDraggedGridItemId(null);
  }, [draggedGridItemId]);


  return (
    <div className="font-sans flex flex-col items-center">
      <div className="w-full max-w-md mx-auto bg-white dark:bg-black min-h-screen flex flex-col relative pb-16">
        {showOnboarding && <OnboardingTooltip onDismiss={handleDismissOnboarding} />}
        <ProfileSection
          theme={theme}
          toggleTheme={toggleTheme}
          highlights={highlights}
          onHighlightImageChange={handleHighlightImageChange}
          onHighlightLabelChange={handleHighlightLabelChange}
          onHighlightReorder={handleHighlightReorder}
          profilePic={profilePic}
          onProfilePicChange={handleProfilePicChange}
          bio={bio}
          onBioChange={handleBioChange}
          stats={stats}
          onStatsChange={handleStatsChange}
          onBatchUpload={handleBatchUpload}
          onBatchHighlightUpload={handleBatchHighlightUpload}
        />
        <PostTabs />
        <main className="flex-grow">
          <div className="grid grid-cols-3 gap-0.5">
            {gridItems.map((item) => (
              <GridItem
                key={item.id}
                id={item.id}
                imageSrc={item.imageSrc}
                onImageChange={handleImageChange}
                onClear={handleClearItem}
                onDragStart={setDraggedGridItemId}
                onDrop={handleGridReorder}
              />
            ))}
          </div>
        </main>
        <BottomNav 
            profilePic={profilePic}
            onOpenSplitter={() => setIsSplitterOpen(true)}
            onOpenHistory={() => setIsHistoryOpen(true)}
            onToggleOnboarding={toggleOnboarding}
        />

        {isSplitterOpen && (
            <ImageSplitter 
                onClose={() => setIsSplitterOpen(false)} 
                onConfirm={handleSplitConfirm}
            />
        )}
        {isHistoryOpen && (
            <SplitHistoryModal
                history={splitHistory}
                onClose={() => setIsHistoryOpen(false)}
            />
        )}
      </div>
    </div>
  );
};

export default App;
