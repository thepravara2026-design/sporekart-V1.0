# SporeKart E-Commerce & Training Platform

> **FAANG-Grade Modular Monolith Enterprise Platform**  
> **Backend**: Java 21 LTS + Spring Boot 3.2.x + Spring Modulith + Spring Security (Passwordless)  
> **Frontend**: React 18 + Vite 5 + Tailwind CSS + Zustand  
> **Databases**: H2 In-Memory (Dev) / PostgreSQL (Prod)  
> **Integrations**: Razorpay Payment Gateway, Shiprocket Logistics, Google OAuth 2.0, Twilio SMS  

---

## System Overview

SporeKart is an integrated enterprise platform combining:
1. **Product E-Commerce**: High-throughput mushroom culture & biotech catalog, cart management, and order processing.
2. **Cultivation & Biotech Training Engine**: Course catalog, batch management (`FEATURED`, `ACTIVE`, `COMPLETED`), trainee enrollments, and PDF certificate generation.
3. **Passwordless Authentication**: Zero legacy passwords. Uses Google OAuth 2.0, Phone SMS OTP, and Email OTP.
4. **Deferred Authentication**: Guest-first browsing for products and courses. Auth modals trigger strictly at conversion boundaries (Checkout & Batch Enrollment).
5. **Immutable Identity Guard**: Core user identity fields (`firstName`, `lastName`, `email`, `phoneNumber`) are locked upon registration.
6. **Self-Service Account Deletion**: Users possess direct, unmediated control over account deletion under Settings.

---

## Directory Structure

- `sporekart-backend/`: Java 21 Spring Boot Modular Monolith.
- `sporekart-frontend/`: React 18 + Vite + Tailwind CSS SPA.
- `infrastructure/`: Terraform IaC, Helm Charts, Docker Orchestration, Prometheus & Grafana Monitoring.
- `.github/workflows/`: CI/CD pipelines for testing, scanning, and deployment.

---

## Quick Start (Local Development)

### 1. Run Backend (Java 21)
```bash
cd sporekart-backend
mvn spring-boot:run -Dspring-boot.run.profiles=dev
```
- API Base: `http://localhost:8080/api/v1`
- H2 Console: `http://localhost:8080/h2-console`
- Swagger UI: `http://localhost:8080/swagger-ui.html`

### 2. Run Frontend (React + Vite)
```bash
cd sporekart-frontend
npm install
npm run dev
```
- App URL: `http://localhost:5173`

---

## Documentation Links

- [System Architecture Specification](docs/architecture/sporekart_system_architecture.md)
- [Codebase & Directory Blueprint](docs/architecture/sporekart_project_structure.md)
