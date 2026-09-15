import React, { useState } from 'react';
import { Upload, X, CheckCircle2, Image as ImageIcon, Trash2, ExternalLink, Loader2 } from 'lucide-react';
import Button from './Button';
import { mediaService } from '../../services/mediaService';

export default function MediaUploader({
  entityType = 'PRODUCT',
  entityId = null,
  onUploadSuccess,
  currentImageUrl = '',
  className = '',
}) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(currentImageUrl || '');
  const [uploadedAsset, setUploadedAsset] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleFileSelect = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        setErrorMessage('File size exceeds maximum limit of 10MB');
        return;
      }
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
      setErrorMessage('');
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return;
    setIsUploading(true);
    setErrorMessage('');
    try {
      const asset = await mediaService.uploadMedia(selectedFile, entityType, entityId);
      setUploadedAsset(asset);
      setPreviewUrl(asset.publicUrl);
      if (onUploadSuccess) onUploadSuccess(asset);
      alert(`Image successfully uploaded to Supabase Storage! Public CDN URL: ${asset.publicUrl}`);
    } catch (err) {
      setErrorMessage(err.response?.data?.message || 'Failed to upload image to Supabase Storage');
    } finally {
      setIsUploading(false);
    }
  };

  const handleDelete = async () => {
    if (uploadedAsset?.id) {
      try {
        await mediaService.deleteMedia(uploadedAsset.id);
        setUploadedAsset(null);
        setPreviewUrl('');
        setSelectedFile(null);
        alert('Media asset deleted from Supabase Storage and PostgreSQL.');
      } catch (err) {
        setErrorMessage('Failed to delete media asset');
      }
    } else {
      setPreviewUrl('');
      setSelectedFile(null);
    }
  };

  return (
    <div className={`card-base p-5 bg-white border-[#E1E5DA] ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <ImageIcon className="w-5 h-5 text-[#1F4D35]" />
          <h4 className="font-bold text-[16px] text-[#172019]">Supabase Storage Media Uploader</h4>
        </div>
        <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-[#F6F2E8] text-[#173B2A] border border-[#173B2A]/20 uppercase">
          {entityType} MEDIA
        </span>
      </div>

      {errorMessage && (
        <div className="mb-4 p-3 bg-[#FCEBEC] text-[#C44747] text-xs font-semibold rounded-[10px] border border-[#C44747]/20">
          {errorMessage}
        </div>
      )}

      {/* Upload Dropzone */}
      {!previewUrl ? (
        <label className="border-2 border-dashed border-[#E1E5DA] hover:border-[#1F4D35] rounded-[16px] p-8 flex flex-col items-center justify-center cursor-pointer bg-[#FCFCF8] transition text-center group">
          <Upload className="w-8 h-8 text-[#7C857D] group-hover:text-[#1F4D35] transition-colors mb-2" />
          <span className="text-[14px] font-bold text-[#172019]">Click or drag image file here</span>
          <span className="text-[12px] text-[#7C857D] mt-1">Supports JPEG, PNG, WEBP, SVG (Max 10MB)</span>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            className="hidden"
          />
        </label>
      ) : (
        /* Preview & Asset Info Card */
        <div className="space-y-4">
          <div className="relative rounded-[14px] overflow-hidden border border-[#E1E5DA] h-[200px] bg-[#F3F4ED]">
            <img
              src={previewUrl}
              alt="Media Preview"
              className="w-full h-full object-cover"
            />
            <button
              onClick={handleDelete}
              className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-[#C44747] transition"
              title="Remove Image"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>

          {uploadedAsset && (
            <div className="p-3 bg-[#FCFCF8] rounded-[12px] border border-[#E1E5DA] space-y-1.5 text-[12px] text-[#59645B]">
              <div className="flex items-center justify-between text-[#1F4D35] font-bold">
                <span className="flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Supabase Storage Verified
                </span>
                <span>ID: #{uploadedAsset.id}</span>
              </div>
              <div className="truncate">
                <strong className="text-[#172019]">Bucket:</strong> {uploadedAsset.bucketName} | <strong className="text-[#172019]">Path:</strong> {uploadedAsset.filePath}
              </div>
              <div className="flex items-center justify-between">
                <span>{(uploadedAsset.sizeBytes / 1024).toFixed(1)} KB • {uploadedAsset.contentType}</span>
                <a
                  href={uploadedAsset.publicUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#1F4D35] hover:underline font-semibold flex items-center gap-1"
                >
                  View CDN URL <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          )}

          {selectedFile && !uploadedAsset && (
            <Button
              variant="primary"
              size="md"
              icon={isUploading ? Loader2 : Upload}
              isLoading={isUploading}
              onClick={handleUpload}
              className="w-full"
            >
              Upload to Supabase Storage Bucket
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
