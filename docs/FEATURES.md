# 1ASET — Features Specification

## 1. Document Purpose

This document defines the functional features of the 1ASET platform.

It provides a detailed feature-level breakdown of the requirements defined in `PRD.md`.

This document should be used as a reference when planning and implementing individual modules.

---

# 2. Public Website

The public website is the primary platform used by potential investors to discover 1ASET and explore real estate investment opportunities.

## 2.1 Home Page

The Home Page should include:

- Premium Hero Section
- Introduction to 1ASET
- Investment Benefits
- Why Invest in Bengaluru
- Featured Projects
- Project Categories
- Investment Process
- Returns Overview
- Investment Calculator CTA
- Cost Estimator CTA
- Testimonials
- FAQ Section
- Blog Highlights
- Contact CTA
- WhatsApp CTA

### Primary Goals

- Build trust
- Introduce the 1ASET brand
- Showcase investment opportunities
- Encourage users to explore projects
- Generate enquiries

---

# 3. About Page

The About Page should include:

- Company Story
- Vision
- Mission
- Why Choose 1ASET
- Company Values
- Team Information
- Contact CTA

---

# 4. Projects Module

The Projects Module allows visitors to discover and explore investment opportunities.

## 4.1 Project Listing Page

Users should be able to:

- View all available projects
- View featured projects
- Filter projects by category
- Navigate to individual project pages

### Project Categories

Initial categories:

- Open Plots
- Apartments
- Villas
- Holiday Homes
- Farm Plots

---

## 4.2 Project Cards

Each project card may display:

- Project Image
- Project Title
- Category
- Location
- Short Description
- Minimum Investment
- Expected ROI
- View Details CTA

---

## 4.3 Project Details Page

Each project should support:

### Basic Information

- Project Title
- Slug
- Category
- Short Description
- Full Description
- Location

### Media

- Featured Image
- Image Gallery
- Project Brochure

### Investment Information

- Price Per SQFT
- Minimum Investment
- Investment Details
- Expected ROI
- Expected Appreciation
- Rental Potential, where applicable

### Project Actions

- Download Brochure
- Enquire Now
- Request a Call Back
- WhatsApp Enquiry

---

# 5. Investment Calculator

The Investment Calculator allows visitors to estimate potential returns from an investment.

## Inputs

The calculator may include:

- Investment Amount
- Number of SQFT
- Expected Appreciation Rate
- Holding Period
- Estimated Rental Income, where applicable

## Outputs

The calculator should display:

- Initial Investment
- Estimated Appreciation
- Estimated Property Value
- Estimated Rental Income
- Total Estimated Return
- Projected Investment Value

## Requirements

- Results should update dynamically
- Calculations should provide clear labels
- Input validation should be implemented
- Calculation logic should not be duplicated
- Calculation configuration should support future updates

---

# 6. Cost Estimator

The Cost Estimator allows users to estimate the total cost of an investment.

## Calculation Flow

Base Investment Amount

↓

Platform Charges

↓

Registration Charges

↓

Applicable Taxes

↓

Total Estimated Investment

## Inputs

- Investment Amount
- Additional configurable values where required

## Outputs

- Base Investment Amount
- Platform Charges
- Registration Charges
- Taxes
- Total Estimated Investment

## Requirements

- Results should update instantly
- Charges should be clearly displayed
- Values should be configurable
- Input validation should be implemented

---

# 7. Investment Process

The website should visually explain the investment journey.

## Initial Flow

Choose Project

↓

Verify Details

↓

Reserve Investment

↓

Documentation

↓

Payment

↓

Ownership

Each step should include:

- Step Number
- Step Title
- Short Description

---

# 8. Lead Generation

Lead generation is a core feature of the platform.

Lead forms may appear on:

- Project Detail Pages
- Contact Page
- Home Page
- Calculator Pages
- CTA Sections

## Lead Information

The system may collect:

- Name
- Phone Number
- Email Address
- Interested Project
- Investment Amount
- Preferred Location
- Lead Source

---

# 9. OTP Verification

Public enquiries must require mobile number verification before becoming verified leads.

## User Flow

Enter Name

↓

Enter Phone Number

↓

Send OTP

↓

Enter OTP

↓

Verify OTP

↓

Submit Enquiry

↓

Create Verified Lead

## Requirements

The system must support:

- OTP generation
- OTP delivery through a configured provider
- OTP expiry
- OTP verification
- Prevention of OTP reuse
- Request rate limiting
- Verification attempt limits
- Phone number validation

Only successfully verified phone numbers should be allowed to create verified leads.

---

# 10. WhatsApp Automation

WhatsApp automation should be triggered after a verified lead is created.

## 10.1 Customer Confirmation

The system should send an automated confirmation message.

Example:

Hello {{name}},

Thank you for your interest in 1ASET.

Our investment advisor will contact you shortly.

Meanwhile, explore our latest opportunities.

Thank you.

The final implementation should use approved message templates where required by the selected WhatsApp provider.

---

## 10.2 Sales Team Notification

The sales team should receive information about new leads.

Notification information may include:

- Lead Name
- Phone Number
- Interested Project
- Investment Amount
- Preferred Location
- Lead Source

---

## 10.3 Automation Requirements

The system should:

- Trigger automation from the backend
- Log automation attempts
- Track successful and failed message delivery requests
- Avoid exposing WhatsApp credentials to the frontend

---

# 11. Contact Module

The Contact Page should include:

- Contact Form
- Office Details
- Phone Number
- Email Address
- Google Maps
- WhatsApp Contact Option

The contact form should follow the OTP verification requirements when configured as a verified lead form.

---

# 12. Blog Module

The Blog Module will support educational and SEO-focused content.

## Blog Listing

Users should be able to:

- View published articles
- Open individual articles

## Blog Article

Each article should support:

- Title
- Slug
- Featured Image
- Content
- Author
- Publication Date
- Meta Title
- Meta Description
- Publication Status

## Initial Content Topics

- Why Invest in North Bengaluru
- Real Estate vs Stocks
- Fractional Ownership
- ROI Guide

---

# 13. Testimonials Module

The website should support displaying investor or customer testimonials.

Each testimonial may include:

- Name
- Designation or Location, where applicable
- Testimonial Content
- Profile Image, where applicable
- Display Status

Administrators should be able to manage testimonials.

---

# 14. FAQ Module

The website should provide a Frequently Asked Questions section.

Each FAQ should include:

- Question
- Answer
- Category, where applicable
- Display Order
- Active Status

Administrators should be able to add, edit, reorder, and remove FAQs.

---

# 15. Admin Authentication

The Admin Dashboard must be protected.

Initial supported roles:

- Admin
- Sales

## Admin

Administrators should have access to all management features.

## Sales

Sales users should have access to lead-related functionality based on assigned permissions.

Future role support may include:

- Manager
- Editor

---

# 16. Admin Dashboard

The Admin Dashboard should provide centralized management for the platform.

## 16.1 Dashboard Overview

The dashboard may display:

- Total Leads
- New Leads
- Qualified Leads
- Converted Leads
- Recent Leads
- Project Summary

Advanced analytics can be added in future releases.

---

## 16.2 Project Management

Administrators should be able to:

- Create projects
- Edit projects
- Delete projects
- Change project status
- Mark projects as featured
- Upload project images
- Manage project galleries
- Upload brochures

---

## 16.3 Lead Management

Authorized users should be able to:

- View all accessible leads
- Search leads
- Filter leads
- View lead details
- Update lead status
- Add notes
- Track follow-ups
- View lead source
- Export leads to Excel

### Lead Statuses

Initial statuses:

- New
- Contacted
- Qualified
- Follow Up
- Converted
- Lost

---

## 16.4 Blog Management

Administrators should be able to:

- Create articles
- Edit articles
- Delete articles
- Save drafts
- Publish articles
- Unpublish articles
- Manage SEO metadata

---

## 16.5 Testimonial Management

Administrators should be able to:

- Add testimonials
- Edit testimonials
- Remove testimonials
- Control display status

---

## 16.6 FAQ Management

Administrators should be able to:

- Add FAQs
- Edit FAQs
- Delete FAQs
- Change display order
- Control active status

---

## 16.7 Website Content Management

Administrators should be able to manage selected dynamic website content, including:

- Homepage content
- Section headings
- CTA content
- Selected informational content

Content management should be designed to avoid unnecessary complexity.

---

## 16.8 Calculator Configuration

Administrators should be able to manage configurable calculator values where required.

Examples include:

- Platform Charge Percentage
- Registration Charge Percentage
- Tax Percentage
- Default Appreciation Rate

Changes should affect future calculator results without requiring code changes.

---

# 17. SEO Features

The public website should include:

- SEO-friendly URLs
- Meta Titles
- Meta Descriptions
- Open Graph Metadata
- XML Sitemap
- Robots.txt
- Structured Data where applicable
- Canonical URLs where applicable
- Optimized Images

Blog and project pages should support individual SEO metadata.

---

# 18. Analytics and Tracking

The platform should support integration with:

- Google Analytics
- Google Tag Manager
- Meta Pixel

Important events may include:

- Project View
- Calculator Usage
- Enquiry Started
- OTP Requested
- OTP Verified
- Lead Submitted
- Brochure Download
- WhatsApp Click

---

# 19. Responsive Design

The website must support:

- Desktop
- Laptop
- Tablet
- Mobile Devices

Requirements:

- Mobile-first responsive layouts
- Responsive navigation
- Touch-friendly controls
- Optimized forms
- Optimized images
- Readable typography across screen sizes

---

# 20. Security Features

The platform should include:

- HTTPS
- Input Validation
- OTP Verification
- Spam Protection
- Rate Limiting
- Secure Admin Authentication
- Protected Admin Routes
- Environment-based Secret Management
- Secure Form Handling

---

# 21. Feature Priority

## Phase 1 — Core Features

- Public Website
- Project Listing
- Project Details
- Admin Authentication
- Project Management
- Lead Management
- OTP Verification
- Verified Lead Submission

## Phase 2 — Engagement Features

- Investment Calculator
- Cost Estimator
- WhatsApp Automation
- Testimonials
- FAQs
- Blog

## Phase 3 — Growth and Optimization

- Advanced Analytics
- Additional SEO Improvements
- Advanced Lead Reporting
- CRM Integration

---

# 22. Out of Scope for Initial Release

The following features are not part of the initial release unless specifically approved:

- Investor Login Portal
- Online Investment Booking
- Payment Gateway
- Digital Document Signing
- AI Investment Assistant
- Referral System
- Affiliate System
- Native Mobile Applications
- Multi-language Support
- Advanced CRM Workflows

---

# 23. Feature Implementation Rules

When implementing features:

1. Read `docs/PRD.md` before starting.
2. Follow the requirements defined in this document.
3. Inspect existing code before modifying files.
4. Reuse existing architecture and patterns.
5. Build one feature or module at a time.
6. Do not modify unrelated functionality.
7. Validate all external input.
8. Keep frontend and backend responsibilities separate.
9. Test the feature before considering it complete.
10. Update relevant documentation when a feature specification changes.