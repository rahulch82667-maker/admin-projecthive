'use client';

import React, { useState } from 'react';
import { Upload, X, CheckCircle, Loader2 } from 'lucide-react';
import axiosInstance from '@/utils/axiosInstance';

interface CloudinaryUploadProps {
  onUploadSuccess: (url: string) => void;
  label?: string;
  accept?: string;
  value?: string;
}

const CloudinaryUpload: React.FC<CloudinaryUploadProps> = ({
  onUploadSuccess,
  label = 'Upload Media',
  accept = 'image/*,video/*',
  value = '',
}) => {
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState(value);
  const [error, setError] = useState('');

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError('');

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axiosInstance.post('/projects/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.data.success) {
        const url = response.data.url;
        setPreview(url);
        onUploadSuccess(url);
      }
    } catch (err: any) {
      console.error('Upload error:', err);
      setError(err.response?.data?.message || 'Failed to upload media');
    } finally {
      setUploading(false);
    }
  };

  const removeFile = () => {
    setPreview('');
    onUploadSuccess('');
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-amber-900">{label}</label>
      
      <div className="relative border-2 border-dashed border-amber-200 rounded-lg p-4 transition-all hover:border-amber-400 bg-amber-50/30">
        {preview ? (
          <div className="relative group">
            {preview.match(/\.(mp4|webm)$/) ? (
              <video src={preview} className="w-full h-40 object-cover rounded-md" controls />
            ) : (
              <img src={preview} alt="Preview" className="w-full h-40 object-cover rounded-md" />
            )}
            <button
              onClick={removeFile}
              className="absolute -top-2 -right-2 bg-red-500 text-white p-1 rounded-full shadow-lg hover:bg-red-600 transition-colors"
              type="button"
            >
              <X size={14} />
            </button>
            <div className="absolute bottom-2 right-2 bg-green-500 text-white p-1 rounded-full">
              <CheckCircle size={14} />
            </div>
          </div>
        ) : (
          <label className="flex flex-col items-center justify-center cursor-pointer h-40">
            {uploading ? (
              <Loader2 className="w-8 h-8 text-amber-600 animate-spin" />
            ) : (
              <>
                <Upload className="w-8 h-8 text-amber-400 mb-2" />
                <span className="text-sm text-amber-700 font-medium">Click to upload</span>
                <span className="text-xs text-amber-500 mt-1">Images or Videos</span>
              </>
            )}
            <input
              type="file"
              className="hidden"
              accept={accept}
              onChange={handleFileChange}
              disabled={uploading}
            />
          </label>
        )}
      </div>
      
      {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
    </div>
  );
};

export default CloudinaryUpload;
