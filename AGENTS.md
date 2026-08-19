# 1ASET Development Guidelines

## Project Overview

1ASET is a real estate investment platform for discovering and managing investment opportunities in Bengaluru.

The platform includes:

- Public-facing investment website
- Real estate project listings
- Project detail pages
- Investment calculator
- Cost estimator
- OTP-verified lead generation
- WhatsApp automation
- Blog
- Admin dashboard
- Lead management

---

# Technology Stack

## Frontend

- Next.js
- TypeScript
- App Router
- Tailwind CSS
- React

Frontend location:

apps/web

## Backend

- NestJS
- TypeScript
- REST API
- MongoDB
- Mongoose

Backend location:

apps/api

## Package Manager

Use pnpm only.

Do not use npm or yarn.

## Monorepo

Use Turborepo.

Project structure:

apps/
  web/
  api/

packages/
  ui/
  types/
  utils/
  config/

---

# General Rules

- Always use TypeScript.
- Write production-quality code.
- Keep code modular and maintainable.
- Do not duplicate business logic.
- Reuse existing components and utilities where possible.
- Do not modify unrelated files.
- Do not remove existing functionality unless explicitly requested.
- Check the existing codebase before creating duplicate files or components.
- Prefer simple and maintainable solutions.
- Add proper error handling.
- Use environment variables for secrets and configuration.
- Never hardcode API keys, secrets, passwords, OTP credentials, or database credentials.

---

# Frontend Rules

Location:

apps/web

Use:

- Next.js App Router
- TypeScript
- Tailwind CSS

Rules:

- Use Server Components by default.
- Use Client Components only when interactivity is required.
- Keep reusable UI components separate from page-specific components.
- Use loading states.
- Use error states.
- Handle empty states.
- Ensure all pages are responsive.
- Prioritize mobile-first design.
- Optimize images using Next.js Image where applicable.
- Do not place API business logic directly inside UI components.

Recommended structure:

src/
  app/
  components/
    ui/
    layout/
    features/
  lib/
  hooks/
  services/
  types/

---

# Backend Rules

Location:

apps/api

Use NestJS modules for feature separation.

Recommended modules:

src/
  modules/
    auth/
    users/
    projects/
    leads/
    blogs/
    testimonials/
    faqs/
    otp/
    whatsapp/
    calculators/
  common/
    guards/
    decorators/
    filters/
    interceptors/
  config/

Rules:

- Use DTOs for request validation.
- Validate all incoming data.
- Keep controllers thin.
- Put business logic in services.
- Use Mongoose schemas for database models.
- Use proper HTTP status codes.
- Implement centralized error handling.
- Never expose sensitive data in API responses.

---

# API Rules

Base API path:

/api/v1

Examples:

GET    /api/v1/projects
GET    /api/v1/projects/:slug
POST   /api/v1/leads
POST   /api/v1/auth/login
POST   /api/v1/otp/send
POST   /api/v1/otp/verify

Use RESTful naming conventions.

Use plural nouns for resources.

---

# Authentication & Roles

The system will initially support:

- Admin
- Sales

Future roles may include:

- Editor
- Manager

Admin authentication must be protected.

Public APIs must never expose admin-only data.

---

# Core Features

## Projects

Support:

- Title
- Slug
- Category
- Short Description
- Full Description
- Location
- Gallery
- Brochure
- Investment Details
- Price Per SQFT
- Minimum Investment
- Expected ROI
- Expected Appreciation
- Status
- Featured

Categories:

- Open Plots
- Apartments
- Villas
- Holiday Homes
- Farm Plots

---

## Leads

Lead fields:

- Name
- Phone
- Email
- OTP Verified
- Interested Project
- Investment Amount
- Location
- Source
- Status
- Notes

Lead statuses:

- New
- Contacted
- Qualified
- Follow Up
- Converted
- Lost

Every public lead submission must require OTP verification before final lead creation.

---

# OTP System

Flow:

1. User enters phone number.
2. User requests OTP.
3. OTP is sent.
4. User enters OTP.
5. Backend verifies OTP.
6. User can submit the enquiry.
7. Verified lead is created.

Requirements:

- OTP expiry
- Rate limiting
- Prevent OTP reuse
- Secure storage
- Maximum verification attempts

OTP provider credentials must be stored in environment variables.

---

# WhatsApp Automation

After successful lead creation:

1. Store the lead.
2. Send confirmation to the customer.
3. Notify the sales team.
4. Log automation status.

Do not make WhatsApp API calls directly from frontend components.

All automation must happen through the backend.

WhatsApp credentials and API configuration must use environment variables.

---

# Calculators

## Investment Calculator

Inputs may include:
- Investment Amount
- SQFT
- Expected Appreciation
- Holding Period
- Rental Income

Outputs:

- Estimated Property Value
- Estimated Appreciation
- Estimated Return
- Projected Value

Calculation logic should be reusable and separated from UI components.

---

## Cost Estimator

Calculate:

- Base Investment Amount
- Platform Charges
- Registration Charges
- Taxes
- Total Estimated Investment

All percentage values must be configurable.

Do not hardcode calculator configuration inside frontend components.

---

# Admin Dashboard

Admin features:

- Dashboard Overview
- Project Management
- Lead Management
- Blog Management
- Testimonials
- FAQs
- Calculator Configuration
- Website Content

Admin pages must be protected by authentication.

---

# Database

Use MongoDB with Mongoose.

Keep schemas modular.

Use timestamps where appropriate.

Use indexes for frequently queried fields.

Important indexed fields may include:

- Project slug
- Project category
- Project status
- Lead phone
- Lead status
- Created date

---

# Environment Variables

Frontend:

apps/web/.env.local

Backend:

apps/api/.env

Never commit actual secrets.

Provide .env.example files.

Expected backend variables may include:

MONGODB_URI=
JWT_SECRET=
JWT_REFRESH_SECRET=
OTP_PROVIDER=
OTP_API_KEY=
WHATSAPP_API_URL=
WHATSAPP_ACCESS_TOKEN=
WHATSAPP_PHONE_NUMBER_ID=

---

# Code Quality

Before completing any task:

1. Check for TypeScript errors.
2. Check imports.
3. Remove unused code.
4. Ensure linting passes where possible.
5. Verify API routes.
6. Verify responsive behaviour.
7. Do not introduce unrelated changes.

When implementing a feature:

1. First inspect the existing code.
2. Explain the implementation plan briefly.
3. Implement the feature.
4. Verify the affected application builds or runs.
5. Report changed files and any remaining setup requirements.

