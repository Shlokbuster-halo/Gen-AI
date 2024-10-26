import React, { useState } from 'react';
import { Upload, FileVideo, Loader2 } from 'lucide-react';

export function VideoUpload({ onProcessingComplete }: { onProcessingComplete: () => void }) {
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [fileName, setFileName] = useState('');

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setIsDragging(true);
    } else if (e.type === 'dragleave') {
      setIsDragging(false);
    }
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const files = [...e.dataTransfer.files];
    if (files?.[0]?.type.startsWith('video/')) {
      await processVideo(files[0]);
    }
  };

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files?.[0]) {
      await processVideo(files[0]);
    }
  };

  const processVideo = async (file: File) => {
    setFileName(file.name);
    setIsProcessing(true);
    await new Promise(resolve => setTimeout(resolve, 3000));
    setIsProcessing(false);
    onProcessingComplete();
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div
        className={`relative border-2 border-dashed rounded-xl p-8 sm:p-12 transition-all duration-300
          ${isDragging ? 'border-blue-400 bg-blue-900/30' : 'border-gray-600 hover:border-blue-500'}
          ${isProcessing ? 'pointer-events-none' : ''}`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input
          type="file"
          accept="video/*"
          onChange={handleFileSelect}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          disabled={isProcessing}
        />
        
        <div className="text-center">
          {isProcessing ? (
            <div className="space-y-4">
              <div className="relative">
                <Loader2 className="w-12 h-12 mx-auto text-blue-400 animate-spin" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <FileVideo className="w-6 h-6 text-blue-300" />
                </div>
              </div>
              <div>
                <p className="text-lg font-medium text-blue-300">{fileName}</p>
                <p className="text-sm text-blue-400">Processing your video...</p>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="transform transition-transform hover:scale-110">
                <Upload className="w-12 h-12 mx-auto text-blue-400" />
              </div>
              <div>
                <p className="text-lg font-medium text-gray-200">
                  Drag and drop your video here
                </p>
                <p className="mt-2 text-sm text-gray-400">
                  or click to select a file
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}