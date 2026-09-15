import apiClient from './apiClient';

export const mediaService = {
  // Upload Image File to Supabase Storage via Backend API
  async uploadMedia(file, entityType = 'GENERAL', entityId = null) {
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('entityType', entityType);
      if (entityId) formData.append('entityId', entityId);

      const res = await apiClient.post('/media/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return res.data?.data || null;
    } catch (err) {
      console.error('Media upload error:', err);
      throw err;
    }
  },

  // Fetch Media Assets Filtered by Entity Type and Entity ID
  async getMedia(entityType, entityId) {
    try {
      const res = await apiClient.get('/media', {
        params: { entityType, entityId },
      });
      return res.data?.data || [];
    } catch (err) {
      console.warn('Backend media API fallback');
      return [];
    }
  },

  // Delete Media Asset
  async deleteMedia(id) {
    try {
      const res = await apiClient.delete(`/media/${id}`);
      return res.data?.data || null;
    } catch (err) {
      console.error('Media deletion error:', err);
      throw err;
    }
  }
};
