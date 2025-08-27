import React, { useState, useRef, useEffect } from 'react';
import { CloseIcon, DownloadIcon } from './Icons';

type FitOption = 'auto' | 'fitWidth' | 'fitHeight';

interface ImageSplitterProps {
  onClose: () => void;
  onConfirm: (data: { originalSrc: string, splitImages: string[] }) => void;
}

const COLS = 3;

export const ImageSplitter: React.FC<ImageSplitterProps> = ({ onClose, onConfirm }) => {
  const [rows, setRows] = useState(1);
  const [image, setImage] = useState<string | null>(null);
  const [splitImages, setSplitImages] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [containerWidth, setContainerWidth] = useState(0);
  const [fitOption, setFitOption] = useState<FitOption>('auto');
  const [backgroundColor, setBackgroundColor] = useState('#ffffff');
  
  const [zoom, setZoom] = useState(1);
  const [imagePosition, setImagePosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const dragStartRef = useRef({ x: 0, y: 0, imgX: 0, imgY: 0 });

  const containerRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.getBoundingClientRect().width);
      }
    };
    updateWidth();
    
    const resizeObserver = new ResizeObserver(entries => {
      if (entries[0]) {
        setContainerWidth(entries[0].contentRect.width);
      }
    });

    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        resizeObserver.unobserve(containerRef.current);
      }
    };
  }, []);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImage(event.target?.result as string);
        setSplitImages([]);
        setImagePosition({ x: 0, y: 0 });
        setZoom(1);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleSplitImage = async () => {
    if (!image || !containerRef.current) return;
    setIsLoading(true);

    const img = new Image();
    img.src = image;
    img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        if (!ctx) {
            setIsLoading(false);
            return;
        }

        const targetAspect = (COLS * 4) / (rows * 5);
        let cropWidth, cropHeight, cropX, cropY;

        switch (fitOption) {
            case 'fitWidth':
                cropWidth = img.width;
                cropHeight = cropWidth / targetAspect;
                cropX = 0;
                cropY = (img.height - cropHeight) / 2;
                break;
            case 'fitHeight':
                cropHeight = img.height;
                cropWidth = cropHeight * targetAspect;
                cropX = (img.width - cropWidth) / 2;
                cropY = 0;
                break;
            case 'auto':
            default:
                const sourceAspect = img.width / img.height;
                if (sourceAspect > targetAspect) {
                    cropHeight = img.height;
                    cropWidth = cropHeight * targetAspect;
                    cropX = (img.width - cropWidth) / 2;
                    cropY = 0;
                } else {
                    cropWidth = img.width;
                    cropHeight = cropWidth / targetAspect;
                    cropX = 0;
                    cropY = (img.height - cropHeight) / 2;
                }
                break;
        }

        const scale = cropWidth / containerRef.current.clientWidth;
        const panX_source = imagePosition.x * scale;
        const panY_source = imagePosition.y * scale;

        const zoomedCropWidth = cropWidth / zoom;
        const zoomedCropHeight = cropHeight / zoom;

        const finalCropX = cropX + (cropWidth - zoomedCropWidth) / 2 - panX_source;
        const finalCropY = cropY + (cropHeight - zoomedCropHeight) / 2 - panY_source;

        const sourceTileWidth = zoomedCropWidth / COLS;
        const sourceTileHeight = zoomedCropHeight / rows;

        const outputTileWidth = cropWidth / COLS;
        const outputTileHeight = cropHeight / rows;

        const croppedImages: string[] = [];
        canvas.width = outputTileWidth;
        canvas.height = outputTileHeight;

        for (let r = 0; r < rows; r++) {
            for (let c = 0; c < COLS; c++) {
                ctx.fillStyle = backgroundColor;
                ctx.fillRect(0, 0, outputTileWidth, outputTileHeight);
                ctx.drawImage(
                    img,
                    finalCropX + c * sourceTileWidth,
                    finalCropY + r * sourceTileHeight,
                    sourceTileWidth,
                    sourceTileHeight,
                    0, 0, outputTileWidth, outputTileHeight
                );
                croppedImages.push(canvas.toDataURL('image/png'));
            }
        }
        setSplitImages(croppedImages);
        setIsLoading(false);
    };
    img.onerror = () => { setIsLoading(false); }
  };
    
  const handleDownloadAll = () => {
    splitImages.forEach((imgUrl, index) => {
      const link = document.createElement('a');
      link.href = imgUrl;
      link.download = `split-image-${index + 1}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });
  };

  const handleConfirmAndClose = () => {
    if (image && splitImages.length > 0) {
      onConfirm({
        originalSrc: image,
        splitImages: splitImages,
      });
    }
  };

  const handleResetSplit = () => setSplitImages([]);

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
    dragStartRef.current = {
      x: e.clientX, y: e.clientY,
      imgX: imagePosition.x, imgY: imagePosition.y
    };
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    const dx = e.clientX - dragStartRef.current.x;
    const dy = e.clientY - dragStartRef.current.y;
    setImagePosition({
      x: dragStartRef.current.imgX + dx,
      y: dragStartRef.current.imgY + dy,
    });
  };

  const handleMouseUp = () => setIsDragging(false);

  const handleContextMenu = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    setImagePosition({ x: 0, y: 0 });
    setZoom(1);
  };
  
  const getBackgroundImageStyle = (): React.CSSProperties => ({
      position: 'absolute',
      top: '50%', left: '50%',
      transform: `translate(-50%, -50%) translate(${imagePosition.x}px, ${imagePosition.y}px) scale(${zoom})`,
      transition: isDragging ? 'none' : 'transform 0.2s ease, width 0.2s ease, height 0.2s ease',
      zIndex: 1,
      cursor: isDragging ? 'grabbing' : 'grab',
      width: fitOption === 'fitHeight' ? 'auto' : '100%',
      height: fitOption === 'fitWidth' ? 'auto' : '100%',
      objectFit: fitOption === 'auto' ? 'cover' : undefined,
      pointerEvents: 'none',
  });

  const gridAspectRatio = (rows * 5) / (COLS * 4);
  const gridHeight = containerWidth * gridAspectRatio;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4 font-sans">
      <div className="bg-white dark:bg-zinc-900 text-black dark:text-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] flex flex-col">
        <header className="p-4 border-b border-gray-200 dark:border-zinc-700 flex justify-between items-center">
          <h2 className="text-lg font-semibold">Image Splitter</h2>
          <button onClick={onClose} aria-label="Close">
            <CloseIcon className="w-6 h-6" />
          </button>
        </header>
        
        <main className="flex-grow p-4 overflow-y-auto">
          <div className="flex flex-col gap-8">
              <div className="p-4 bg-gray-100 dark:bg-zinc-800 rounded-lg">
                 <div className="flex flex-wrap gap-4 justify-center items-center">
                    <div>
                        <input
                            id="image-upload" type="file" accept="image/*"
                            onChange={handleImageUpload} ref={fileInputRef} className="hidden"
                        />
                        <button onClick={() => fileInputRef.current?.click()} className="px-6 py-2 bg-blue-600 text-white rounded-md font-semibold hover:bg-blue-500 transition">
                             {image ? 'Change Image' : 'Upload Image'}
                        </button>
                    </div>

                    {image && (
                      <>
                        {splitImages.length === 0 ? (
                          <>
                            <div className="flex items-center gap-2">
                                <label className="font-medium">Rows:</label>
                                <input type="number" value={rows} onChange={e => setRows(Math.max(1, parseInt(e.target.value) || 1))} className="w-16 p-2 rounded-md bg-gray-200 dark:bg-zinc-700 text-center"/>
                            </div>
                            <button onClick={handleSplitImage} disabled={isLoading} className="px-6 py-2 bg-green-600 text-white rounded-md font-semibold hover:bg-green-500 transition disabled:bg-gray-500">
                                {isLoading ? 'Splitting...' : 'Confirm Split'}
                            </button>
                          </>
                        ) : (
                          <>
                            <button onClick={handleResetSplit} className="px-6 py-2 bg-gray-500 text-white rounded-md font-semibold hover:bg-gray-400 transition">
                                Change Settings
                            </button>
                            <button onClick={handleDownloadAll} className="px-6 py-2 bg-gray-500 text-white rounded-md font-semibold hover:bg-gray-400 transition flex items-center gap-2">
                                <DownloadIcon className="w-5 h-5"/> Download All
                            </button>
                          </>
                        )}
                      </>
                    )}
                </div>
                
                {image && splitImages.length === 0 && (
                  <div className="flex justify-center gap-8 mt-6 flex-wrap items-center">
                    <div className="flex items-center gap-2">
                      <label className="font-medium">Image Fit:</label>
                      <div className="flex gap-1 bg-gray-200 dark:bg-zinc-700 rounded-md p-1">
                          {(['auto', 'fitWidth', 'fitHeight'] as FitOption[]).map(fit => (
                              <button key={fit} onClick={() => setFitOption(fit)} className={`px-3 py-1 text-sm rounded transition ${fitOption === fit ? 'bg-blue-600 text-white' : 'hover:bg-gray-300 dark:hover:bg-zinc-600'}`}>
                                  {fit}
                              </button>
                          ))}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <label className="font-medium">Background:</label>
                      <input type="color" value={backgroundColor} onChange={(e) => setBackgroundColor(e.target.value)} className="w-10 h-10 border-none rounded-md cursor-pointer bg-transparent"/>
                    </div>
                     <div className="flex items-center gap-2">
                      <label className="font-medium">Zoom:</label>
                      <input 
                        type="range" min="1" max="5" step="0.01" 
                        value={zoom} 
                        onChange={e => setZoom(parseFloat(e.target.value))}
                        className="w-32 cursor-pointer"
                      />
                    </div>
                  </div>
                )}
              </div>

              <div ref={containerRef} className="w-full">
                {image ? (
                  <div 
                    style={{height: `${gridHeight}px`}} 
                    className="relative overflow-hidden rounded-lg border border-gray-200 dark:border-zinc-700 transition-all duration-300 cursor-grab"
                    onMouseDown={handleMouseDown}
                    onMouseMove={handleMouseMove}
                    onMouseUp={handleMouseUp}
                    onMouseLeave={handleMouseUp}
                    onContextMenu={handleContextMenu}
                  >
                    {isLoading && <div className="absolute inset-0 bg-black bg-opacity-70 flex items-center justify-center text-white z-10">Processing...</div>}
                    
                    {splitImages.length === 0 && (
                      <img src={image} alt="Preview" style={getBackgroundImageStyle()} />
                    )}
                    
                    <div className="grid grid-cols-3 w-full h-full pointer-events-none" style={{gap: '4px', backgroundColor: splitImages.length > 0 ? 'transparent': backgroundColor}}>
                      {Array.from({ length: rows * COLS }).map((_, index) => (
                        <div key={index} className={`aspect-[4/5] relative ${splitImages.length === 0 ? 'border border-dashed border-white border-opacity-20' : ''}`}>
                          {splitImages[index] && (
                            <img src={splitImages[index]} alt={`Split ${index + 1}`} className="w-full h-full object-cover block" />
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                    <div className="h-96 border-2 border-dashed border-gray-300 dark:border-zinc-600 rounded-lg flex items-center justify-center text-gray-500 dark:text-gray-400">
                        <p>Upload an image to get started</p>
                    </div>
                )}
              </div>

              {splitImages.length > 0 && (
                <div className="flex justify-end gap-4">
                  <button onClick={onClose} className="px-6 py-2 bg-gray-500 text-white rounded-md font-semibold hover:bg-gray-400 transition">Cancel</button>
                  <button onClick={handleConfirmAndClose} className="px-6 py-2 bg-blue-600 text-white rounded-md font-semibold hover:bg-blue-500 transition">Back to Profile</button>
                </div>
              )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default ImageSplitter;