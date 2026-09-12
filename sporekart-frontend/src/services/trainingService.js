import apiClient from './apiClient';

export const trainingService = {
  // Fetch active/featured training batches (Guest Accessible)
  async getBatches(status) {
    try {
      const res = await apiClient.get('/training/batches', { params: { status } });
      return res.data;
    } catch (err) {
      console.warn('Backend training batch API call fallback to default batches');
      return null;
    }
  },

  // Enroll in Training Batch (Requires Authenticated Trainee)
  async enrollBatch(batchId) {
    const res = await apiClient.post(`/training/batches/${batchId}/enroll`);
    return res.data;
  },

  // Download Issued Certificate PDF Stream
  async downloadCertificate(enrollmentId) {
    const res = await apiClient.get(`/training/certificates/${enrollmentId}/download`, {
      responseType: 'blob',
    });
    
    // Create download link for PDF file
    const url = window.URL.createObjectURL(new Blob([res.data], { type: 'application/pdf' }));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `Certificate_${enrollmentId}.pdf`);
    document.body.appendChild(link);
    link.click();
    link.remove();
  }
};
