import apiClient from './apiClient';

export const landingService = {
  // Fetch Product Categories for Landing Page Grid
  async getCategories() {
    try {
      const res = await apiClient.get('/categories');
      return res.data?.data || [];
    } catch (err) {
      console.warn('Backend categories API fallback');
      return null;
    }
  },

  // Fetch Featured & Categorized Products
  async getProducts(category) {
    try {
      const res = await apiClient.get('/products', { params: { category } });
      return res.data?.data || [];
    } catch (err) {
      console.warn('Backend products API fallback');
      return null;
    }
  },

  // Fetch Educational Guides for Section 13
  async getEducationalGuides() {
    try {
      const res = await apiClient.get('/education/guides');
      return res.data?.data || [];
    } catch (err) {
      console.warn('Backend educational guides API fallback');
      return null;
    }
  },

  // Fetch Training Batches
  async getTrainingBatches() {
    try {
      const res = await apiClient.get('/training/batches');
      return res.data?.data || [];
    } catch (err) {
      console.warn('Backend training batches API fallback');
      return null;
    }
  },

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
