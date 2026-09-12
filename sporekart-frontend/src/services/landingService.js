import apiClient from './apiClient';

export const landingService = {
  // Fetch Customer & Verified Grower Reviews
  async getReviews() {
    try {
      const res = await apiClient.get('/reviews');
      return res.data?.data || [];
    } catch (err) {
      console.warn('Backend reviews API fallback');
      return null;
    }
  },

  // Fetch Platform FAQs for Landing Page Accordion
  async getFaqs(category) {
    try {
      const res = await apiClient.get('/faqs', { params: { category } });
      return res.data?.data || [];
    } catch (err) {
      console.warn('Backend FAQs API fallback');
      return null;
    }
  }
};
