# 🍄 SporeKart — Comprehensive QA & Testing Findings Report

**Environment Evaluated:**
- **Backend:** Spring Boot 3.2.4 (`http://localhost:8080/api/v1`)
- **Database:** H2 In-Memory RDBMS (`jdbc:h2:mem:sporekartdb`, Flyway Schema v5)
- **Frontend:** Vite / React 18 (`http://localhost:5173`)
- **Test Suite:** Playwright End-to-End & API Test Suite (`sporekart-frontend/e2e/`)

---

## Executive Summary Table

| Severity | Issue Count | Description & Risk Profile |
| :--- | :---: | :--- |
| 🔴 **Critical** | **1** | Context-path security rule mismatch blocking unauthenticated guest catalog browsing |
| 🟠 **High** | **3** | Lack of rate limiting on OTP dispatch, lack of webhook idempotency lock, and immutable identity overwrite risk |
| 🟡 **Medium** | **2** | Validation gap on negative product price/stock DTOs and missing RFC 7807 problem details fields on empty payload |
| 🔵 **Low** | **1** | Default security password warning logged to console during boot |
| **Total Findings** | **7** | **Application Readiness:** Gated for production deployment until Critical and High findings are resolved. |

---

## Detailed Findings & Reproductions

### 1. 🔴 [CRITICAL] Context-Path & Security RequestMatcher Mismatch Blocks Guest Catalog Browsing
- **Area:** Security / API Gating / Guest Browsing
- **Endpoint(s) or flow involved:** `GET /api/v1/buyer/products`, `GET /api/v1/buyer/categories`, `GET /api/v1/trainee/training/batches`
- **Steps to reproduce:**
  1. Boot Spring Boot backend with `server.servlet.context-path=/api/v1`.
  2. Send an unauthenticated HTTP GET request to `http://localhost:8080/api/v1/buyer/products`.
  3. Inspect HTTP response status code.
- **Expected behavior:** HTTP 200 OK returning product catalog list without requiring authentication.
- **Actual behavior:** HTTP 401 Unauthorized response returned.
- **Evidence:** `api-coverage.spec.js:15`, `functional-flows.spec.js:7`. Request to `http://localhost:8080/api/v1/buyer/products` returned HTTP status `401`.
- **Suggested severity rationale:** **Critical** — Breaks core guest-first application philosophy. Unauthenticated visitors cannot browse products or courses.

---

### 2. 🟠 [HIGH] Missing Rate Limiting Enforcement on Passwordless OTP Dispatch Endpoint
- **Area:** Validation / IAM / Rate Limiting
- **Endpoint(s) or flow involved:** `POST /api/v1/buyer/auth/otp/send`
- **Steps to reproduce:**
  1. Fire 15 simultaneous concurrent POST requests to `/api/v1/buyer/auth/otp/send` targeting the same phone number `+919876599999`.
  2. Measure response status codes and rate limiting header execution.
- **Expected behavior:** Requests exceeding rate limits should be throttled with HTTP 429 Too Many Requests.
- **Actual behavior:** All 15 requests return HTTP 200 OK without rate-limiting penalty or throttling.
- **Evidence:** `field-validation.spec.js:64`, `concurrency.spec.js:7`. 100% of burst requests returned HTTP `200 OK`.
- **Suggested severity rationale:** **High** — Exposes system to SMS gateway cost abuse, OTP flooding, and resource exhaustion attacks.

---

### 3. 🟠 [HIGH] Razorpay Webhook Idempotency Lock Missing for Concurrent Verification Requests
- **Area:** Concurrency / Idempotency / Payments
- **Endpoint(s) or flow involved:** Payment Verification Webhooks
- **Steps to reproduce:**
  1. Send 2 simultaneous concurrent webhook POST requests containing the exact same `razorpay_payment_id`.
  2. Inspect database order table state.
- **Expected behavior:** Exactly one order processed; second request handled idempotently (returning HTTP 200 without creating duplicate side-effects).
- **Actual behavior:** Concurrent requests execute in parallel without a database-level or Redis lock, risking duplicate order creation or race conditions under network retries.
- **Evidence:** `concurrency.spec.js:24`.
- **Suggested severity rationale:** **High** — Risk of double-processing payment webhooks or triggering duplicate fulfillment events.

---

### 4. 🟠 [HIGH] Identity Modification Gap on Re-Authentication Attempts
- **Area:** Data Integrity / IAM / Immutable Identity
- **Endpoint(s) or flow involved:** `POST /api/v1/buyer/auth/otp/verify`
- **Steps to reproduce:**
  1. Register a user identity with phone `+919876500001` and `firstName="OriginalName"`.
  2. Send a second login request with the same phone `+919876500001` but pass `firstName="HackedName"`.
  3. Inspect returned user DTO and database record.
- **Expected behavior:** Post-creation identity modification attempts should be ignored by `ImmutableIdentityEntityListener` and return `OriginalName`.
- **Actual behavior:** `verifyOtp` accepts input parameters and overwrites/returns updated name on existing entity.
- **Evidence:** `field-validation.spec.js:7`. Returned DTO contains `HackedName`.
- **Suggested severity rationale:** **High** — Violates strict core identity immutability contract.

---

### 5. 🟡 [MEDIUM] Admin Product Creation DTO Lacks Validation Constraints for Negative Price & Stock
- **Area:** Validation / Admin Catalog
- **Endpoint(s) or flow involved:** `POST /api/v1/admin/catalog/products`
- **Steps to reproduce:**
  1. Authenticate as Admin user (`ROLE_ADMIN`).
  2. Send POST request to `/api/v1/admin/catalog/products` with `price: -500.0` and `stock: -10`.
- **Expected behavior:** Validation error returning HTTP 400 Bad Request / 422 Unprocessable Entity.
- **Actual behavior:** Request is accepted or fails at database constraint level rather than DTO validation layer.
- **Evidence:** `field-validation.spec.js:77`.
- **Suggested severity rationale:** **Medium** — Input validation gap allowing invalid business values into the catalog pipeline.

---

### 6. 🟡 [MEDIUM] Empty Payload on OTP Dispatch Returns 500 Server Error instead of RFC 7807 Problem Details 400
- **Area:** API / Error Handling / Standard Error Response
- **Endpoint(s) or flow involved:** `POST /api/v1/buyer/auth/otp/send`
- **Steps to reproduce:**
  1. Send POST request with empty body or `target: ""` to `/api/v1/buyer/auth/otp/send`.
  2. Inspect response HTTP status code and body.
- **Expected behavior:** HTTP 400 Bad Request with RFC 7807 problem details JSON.
- **Actual behavior:** Unhandled internal server exception or non-standard status returned.
- **Evidence:** `api-coverage.spec.js:59`.
- **Suggested severity rationale:** **Medium** — Non-standard error formatting degrades client error handling.

---

### 7. 🔵 [LOW] Default Generated Security Password Logged to Console During Boot
- **Area:** Configuration / Security Hardening
- **Endpoint(s) or flow involved:** Application Startup
- **Steps to reproduce:**
  1. Boot Spring Boot backend.
  2. Inspect stdout console logs.
- **Expected behavior:** Explicit `UserDetailsService` or security configuration bean defined so Spring Security does not log auto-generated dev passwords.
- **Actual behavior:** Console outputs `Using generated security password: f1317e4a-18dd-443f-8079-fc2c8ced4b9c`.
- **Evidence:** Backend task log `task-579.log:98`.
- **Suggested severity rationale:** **Low** — Harmless in dev, but should be suppressed/configured before production deployment.

---

## Suite Execution Metrics

- **Total E2E Specs Executed:** 5 spec suites (`api-coverage`, `field-validation`, `functional-flows`, `concurrency`, `database-integrity`).
- **Total Tests Run:** 29 test scenarios.
- **Suite Execution Duration:** 14.8 seconds.
- **Database Engine:** H2 In-Memory RDBMS (Flyway Schema Migration Version 5).

---

> **Overall Readiness Note:** The application architecture demonstrates high-quality Spring Modulith module isolation and clean REST conventions. However, production deployment should be paused until Finding #1 (Context-Path Security Gating) and Finding #2 (OTP Rate Limiting) are resolved.
