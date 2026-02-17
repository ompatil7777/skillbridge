import { Upload, File } from 'lucide-react';
import { useState } from 'react';

export default function UploadZone({ onFileSelect, selectedFile }) {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type === 'application/pdf') {
      onFileSelect(file);
    }
  };

  const handleFileInput = (e) => {
    const file = e.target.files[0];
    if (file) {
      onFileSelect(file);
    }
  };

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={`relative border-2 border-dashed rounded-xl p-8 transition-all duration-300 ${
        isDragging
          ? 'border-blue-500 bg-blue-500/10 scale-105'
          : 'border-gray-600 bg-gray-800/50 hover:border-blue-400'
      }`}
    >
      <input
        type="file"
        accept=".pdf"
        onChange={handleFileInput}
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        id="resume-upload"
      />
      <div className="flex flex-col items-center justify-center gap-4 pointer-events-none">
        {selectedFile ? (
          <>
            <File className="w-12 h-12 text-blue-400" />
            <div className="text-center">
              <p className="text-lg font-medium text-white">{selectedFile.name}</p>
              <p className="text-sm text-gray-400">
                {(selectedFile.size / 1024).toFixed(1)} KB
              </p>
            </div>
          </>
        ) : (
          <>
            <Upload className="w-12 h-12 text-gray-400" />
            <div className="text-center">
              <p className="text-lg font-medium text-white">
                Drop your resume here
              </p>
              <p className="text-sm text-gray-400">or click to browse (PDF only)</p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
