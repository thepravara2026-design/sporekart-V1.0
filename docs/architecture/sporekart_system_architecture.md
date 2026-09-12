# SporeKart System Architecture & Technical Design Specification

> **Author**: FAANG Principal Systems Architect  
> **Status**: APPROVED / ARCHITECTURE SPECIFICATION v2.1  
> **Target Platform**: SporeKart E-Commerce & Training Platform  
> **Stack**: Java 21 (Spring Boot 3.x Modular Monolith), React + Vite + Tailwind CSS, H2 (Dev) / PostgreSQL (Prod), Passwordless JWT Security (Google OAuth2, Phone/Email OTP), Razorpay, Shiprocket / Universal Logistics Adapter  

---

## 1. Executive Summary & Landing Page Enhancements (v2.1)

SporeKart v2.1 unifies the complete platform into an **SEO-optimized, conversion-first unified landing page ecosystem** featuring:
1. **Unified Landing Page Architecture**: Integrated Header Navigation, Hero Section, Catalog Grid, Cultivation Training Batches, About SporeKart, Verified Grower Reviews, Accordion FAQs, Contact Section, and Footer.
2. **SEO & AEO Optimization (Schema.org Integration)**: Rich JSON-LD Structured Data (`schema.org/Store`, `schema.org/Product`, `schema.org/Course`, `schema.org/FAQPage`), OpenGraph social tags, and WCAG 2.2 AA compliant semantic HTML5 hierarchy.
3. **Database Schema Additions**: `reviews` and `faqs` entities added to Flyway migration pipeline `V2__add_reviews_faqs_landing_schema.sql`.

---

## 2. Updated Entity-Relationship Diagram (ERD v2.1)

```mermaid
erDiagram
    USERS ||--o{ ORDERS : places
    PRODUCTS ||--o{ REVIEWS : has
    TRAINING_COURSES ||--o{ REVIEWS : has
    CATEGORIES ||--o{ PRODUCTS : contains
    ORDERS ||--o1 PAYMENTS : paid_via
    ORDERS ||--o1 SHIPMENTS : shipped_via

    REVIEWS {
        bigint id PK
        bigint product_id FK
        bigint course_id FK
        string reviewer_name
        string reviewer_location
        integer rating
        string title
        text comment
        boolean is_verified_grower
    }

    FAQS {
        bigint id PK
        string category
        string question
        text answer
        integer display_order
        boolean is_active
    }
```

---

## 3. SEO & Structured Data Architecture

### JSON-LD Schema.org Injection Engine
The frontend injects structured metadata into the document head to guarantee search engine indexability and AI Answer Engine Optimization (AEO):

```json
{
  "@context": "https://schema.org",
  "@type": "Store",
  "name": "SporeKart",
  "image": "https://sporekart.com/assets/logo.svg",
  "description": "India's premier certified mushroom cultivation, spawn supply, and biotech training platform.",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Industrial Estate",
    "addressLocality": "Bengaluru",
    "addressRegion": "Karnataka",
    "country": "IN"
  }
}
```
