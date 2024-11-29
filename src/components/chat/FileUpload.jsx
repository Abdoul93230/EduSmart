import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { FileText, Mic, Video } from 'lucide-react';

export function FileUpload({ onFileSelect }) {
  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      onFileSelect(acceptedFiles[0]);
    }
  }, [onFileSelect]);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'audio/*': ['.mp3', '.wav', '.m4a'],
      'video/*': ['.mp4', '.mov', '.avi']
    }
  });

  return (
    <div
      {...getRootProps()}
      className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center cursor-pointer hover:border-blue-500 transition-colors"
    >
      <input {...getInputProps()} />
      <div className="flex justify-center gap-4">
        <FileText className="text-gray-400" />
        <Mic className="text-gray-400" />
        <Video className="text-gray-400" />
      </div>
      <p className="mt-2 text-sm text-gray-500">
        Drop PDF, audio, or video files here, or click to select
      </p>
    </div>
  );
}