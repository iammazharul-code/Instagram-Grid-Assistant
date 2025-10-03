
import React from 'react';

interface OnboardingTooltipProps {
  onDismiss: () => void;
}

const OnboardingTooltip: React.FC<OnboardingTooltipProps> = ({ onDismiss }) => {
  return (
    <div 
      className="absolute inset-0 bg-black bg-opacity-75 z-[100] font-sans"
      onClick={onDismiss}
      aria-modal="true"
      role="dialog"
    >
      {/* Highlight for Add Images button */}
      <div className="absolute top-[12px] right-[54px] w-10 h-10 rounded-full ring-4 ring-white" aria-hidden="true"></div>
      
      {/* Tooltip for Add Images button */}
      <div 
        className="absolute top-[4px] right-[102px] text-black"
        aria-describedby="tooltip-add-images"
      >
        <div className="bg-white dark:bg-zinc-800 dark:text-white rounded-lg p-3 shadow-lg relative w-60 text-sm">
          <p id="tooltip-add-images" className="font-semibold">Batch Upload</p>
          <p>Click the '+' icon to add multiple images to your grid or story highlights at once.</p>
          <div className="absolute top-1/2 -right-2 transform -translate-y-1/2 w-0 h-0 border-t-8 border-t-transparent border-b-8 border-b-transparent border-l-8 border-l-white dark:border-l-zinc-800" aria-hidden="true"></div>
        </div>
      </div>
      
      {/* Highlight for Split Image button */}
      <div className="absolute bottom-[8px] left-1/2 -translate-x-1/2 w-10 h-10 rounded-md ring-4 ring-white" aria-hidden="true"></div>

      {/* Tooltip for Split Image button */}
      <div 
        className="absolute bottom-[64px] left-1/2 -translate-x-1/2 text-black"
        aria-describedby="tooltip-split-image"
      >
        <div className="bg-white dark:bg-zinc-800 dark:text-white rounded-lg p-3 shadow-lg relative w-60 text-sm text-center">
           <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-0 border-l-8 border-l-transparent border-r-8 border-r-transparent border-t-8 border-t-white dark:border-t-zinc-800" aria-hidden="true"></div>
           <p id="tooltip-split-image" className="font-semibold">Panoramic Splitter</p>
           <p>Click the center '+' icon to split one photo into a seamless multi-post panorama.</p>
        </div>
      </div>
      
      <p className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white text-lg animate-pulse">Click anywhere to start</p>
    </div>
  );
};

export default OnboardingTooltip;