# 1ASET — Product Requirements Document

## 1. Product Overview

### Product Name

**1ASET**

### Product Type

Real Estate Investment Platform

### Product Description

1ASET is a digital platform designed to showcase selected real estate investment opportunities, primarily across Bengaluru and its emerging growth corridors.

The platform will allow potential investors to:

* Explore available real estate investment opportunities
* Browse projects across multiple asset categories
* View project details and investment information
* Estimate the total cost of an investment
* Calculate potential investment returns
* Submit enquiries through OTP-verified forms
* Receive automated WhatsApp communication
* Connect with the 1ASET sales team

The platform will also include a secure administrative dashboard for managing projects, leads, blogs, testimonials, FAQs, website content, and calculator configurations.

---

# 2. Problem Statement

Real estate investment opportunities often require potential investors to contact multiple representatives before understanding basic information such as project details, investment requirements, estimated costs, and potential returns.

This creates friction in the investor journey and makes lead qualification and follow-up more difficult for the sales team.

1ASET requires a centralized digital platform that can:

* Present investment opportunities professionally
* Build trust with potential investors
* Provide clear project and investment information
* Help visitors estimate investment costs and potential returns
* Capture high-quality, verified leads
* Reduce manual follow-up through automation
* Provide the sales team with a centralized lead management system

---

# 3. Product Vision

To create a premium, trustworthy, and easy-to-use digital platform that simplifies the discovery of real estate investment opportunities and creates a seamless journey from initial interest to investor enquiry.

The platform should position 1ASET as a professional real estate investment brand while providing investors with the information and tools needed to explore opportunities with confidence.

---

# 4. Product Goals

The primary goals of the platform are:

### 4.1 Build Investor Trust

Present the 1ASET brand and investment opportunities through a premium, professional, and transparent digital experience.

### 4.2 Showcase Investment Opportunities

Allow visitors to easily discover and explore selected real estate projects across different investment categories.

### 4.3 Generate Qualified Leads

Capture investor enquiries through secure forms and ensure mobile numbers are verified using OTP verification.

### 4.4 Improve Lead Response Time

Automate initial communication through WhatsApp after a successful enquiry is submitted.

### 4.5 Help Investors Make Initial Decisions

Provide interactive tools such as a Cost Estimator and Investment Return Calculator.

### 4.6 Centralize Lead Management

Provide an administrative dashboard where the 1ASET team can manage and track investor enquiries.

### 4.7 Improve Conversion Rates

Create a clear user journey that encourages visitors to move from:

**Discovery → Exploration → Calculation → Enquiry → Sales Follow-up**

---

# 5. Target Users

## 5.1 Potential Investors

Individuals interested in exploring real estate investment opportunities.

They should be able to:

* Browse projects
* Explore project categories
* View investment information
* Estimate investment costs
* Calculate potential returns
* Download project brochures
* Submit verified enquiries
* Contact the sales team through WhatsApp

---

## 5.2 Sales Team

Internal team members responsible for following up with potential investors.

They should be able to:

* Receive notifications about new leads
* View lead information
* Track lead status
* Add notes
* Follow up with investors
* Manage the sales pipeline

---

## 5.3 Administrators

Authorized users responsible for managing the platform.

They should be able to:

* Manage projects
* Manage leads
* Manage blogs
* Manage testimonials
* Manage FAQs
* Update website content
* Configure calculator values
* Manage platform settings

---

# 6. User Roles

The initial version of the platform will support the following roles:

## Public Visitor

A user who can access the public website without authentication.

Permissions include:

* Browse projects
* View project details
* Use calculators
* Read blogs
* Submit enquiries
* Verify mobile numbers using OTP

---

## Admin

A user with full administrative access.

Permissions include:

* Manage all projects
* Manage all leads
* Manage blogs
* Manage testimonials
* Manage FAQs
* Manage website content
* Manage calculator configuration
* View dashboard analytics

---

## Sales

A user responsible for managing and following up with leads.

Permissions include:

* View assigned or available leads
* Update lead status
* Add notes
* View investor information
* Track follow-ups

Sales permissions may be expanded based on future business requirements.

---

# 7. Core Product Modules

The platform will consist of the following major modules.

## 7.1 Public Website

The public-facing website will introduce the 1ASET brand and showcase investment opportunities.

Primary sections include:

* Home
* About
* Projects
* Project Details
* Investment Calculator
* Cost Estimator
* Investment Process
* Blogs
* Contact
* FAQ

---

## 7.2 Project Management

The platform will support multiple real estate investment categories.

Initial categories include:

* Open Plots
* Apartments
* Villas
* Holiday Homes
* Farm Plots

Each project may include:

* Project title
* Slug
* Category
* Short description
* Full description
* Location
* Image gallery
* Pricing information
* Investment details
* Expected ROI
* Expected appreciation
* Minimum investment
* Brochure
* Status
* Featured status

---

## 7.3 Investment Calculator

The Investment Calculator will allow users to estimate potential investment outcomes.

Possible inputs include:

* Investment Amount
* Number of SQFT
* Expected Appreciation
* Holding Period
* Rental Income, where applicable

Possible outputs include:

* Estimated property value
* Estimated appreciation
* Estimated return
* Projected investment value

Calculator values and formulas should be configurable where required.

---

## 7.4 Cost Estimator

The Cost Estimator will help visitors understand the estimated total cost of an investment.

The calculation may include:

* Base Investment Amount
* Platform Charges
* Registration Charges
* Applicable Taxes
* Total Estimated Investment

The estimator should update results dynamically when the user changes relevant values.

---

## 7.5 Lead Generation

The platform will capture investor enquiries through forms placed across relevant pages.

Lead generation points may include:

* General Contact Form
* Project Enquiry Form
* Request a Call Back
* Calculator Follow-up
* WhatsApp Contact

Lead information may include:

* Name
* Phone Number
* Email Address
* Interested Project
* Investment Amount
* Preferred Location
* Lead Source

---

## 7.6 OTP Verification

Mobile number verification will be required before a public enquiry becomes a verified lead.

The flow will be:

1. Visitor enters their details.
2. Visitor enters their mobile number.
3. Visitor requests an OTP.
4. The system sends an OTP.
5. The visitor enters the OTP.
6. The system verifies the OTP.
7. The enquiry is successfully submitted.
8. A verified lead is created.

The system should prevent:

* Expired OTP usage
* OTP reuse
* Excessive OTP requests
* Excessive verification attempts

---

## 7.7 WhatsApp Automation

After a verified lead is successfully created, the backend should trigger automated communication.

### Customer Communication

The customer should receive a confirmation message indicating that their enquiry has been received.

Example communication:

> Thank you for your interest in 1ASET. Our investment advisor will contact you shortly.

Additional project information or relevant links may be included based on the selected project and approved WhatsApp templates.

### Sales Team Notification

The relevant sales team should receive lead information, such as:

* Lead Name
* Phone Number
* Interested Project
* Investment Amount
* Location
* Lead Source

All WhatsApp automation must be handled securely through the backend.

---

## 7.8 Lead Management

The administrative dashboard will provide centralized lead management.

Administrators and authorized sales users should be able to:

* View leads
* Search leads
* Filter leads
* View lead details
* Update lead status
* Add notes
* Track follow-ups
* Export lead data where required

Initial lead statuses:

* New
* Contacted
* Qualified
* Follow Up
* Converted
* Lost

---

## 7.9 Content Management

Administrators should be able to manage selected website content without requiring code changes.

Initial content management areas include:

* Projects
* Blogs
* Testimonials
* FAQs
* Website content sections
* Calculator configuration

---

## 7.10 Blog

The blog section will support educational and SEO-focused content related to real estate investment.

Initial content topics may include:

* Why Invest in North Bengaluru
* Real Estate vs Stocks
* Understanding Fractional Ownership
* Understanding ROI in Real Estate

Each blog should support:

* Title
* Slug
* Featured image
* Content
* Author information
* Publication date
* SEO metadata
* Publication status

---

# 8. Key User Journey

The primary investor journey is:

**Discover 1ASET**
↓
**Explore Investment Opportunities**
↓
**View Project Details**
↓
**Estimate Investment Cost and Returns**
↓
**Submit Enquiry**
↓
**Verify Mobile Number with OTP**
↓
**Verified Lead Created**
↓
**Customer Receives WhatsApp Confirmation**
↓
**Sales Team Receives Lead Notification**
↓
**Sales Follow-up**

---

# 9. Functional Requirements

The platform must support the following functionality.

## Public Website

* Responsive design
* Mobile, tablet, and desktop support
* Project browsing
* Project filtering by category
* Project detail pages
* Blog browsing
* Contact forms
* WhatsApp contact options
* Downloadable brochures
* SEO-friendly URLs

## Investment Tools

* Investment Calculator
* Cost Estimator
* Dynamic calculation results
* Configurable values where applicable

## Lead System

* Public enquiry forms
* Mobile number validation
* OTP verification
* Verified lead creation
* Lead source tracking
* Admin lead management
* Lead status management

## Automation

* Customer confirmation after enquiry
* Sales team notification
* Automation status logging

## Admin Dashboard

* Secure authentication
* Role-based access
* Project management
* Lead management
* Blog management
* Testimonial management
* FAQ management
* Content management
* Calculator configuration

---

# 10. Non-Functional Requirements

## Performance

The platform should:

* Load quickly on modern devices
* Be optimized for mobile users
* Use optimized images
* Follow modern performance best practices

## Security

The platform should:

* Use HTTPS
* Validate all user input
* Protect administrative routes
* Securely store secrets
* Use environment variables for sensitive configuration
* Protect against spam and excessive requests
* Apply rate limiting to sensitive endpoints
* Secure the OTP verification process

## Scalability

The architecture should support future additions, including:

* Investor accounts
* Online investment booking
* Payment gateway integration
* Digital document management
* CRM integrations
* Additional user roles
* Multi-language support

## Maintainability

The codebase should:

* Use TypeScript
* Follow modular architecture
* Separate frontend and backend responsibilities
* Reuse common logic where appropriate
* Avoid unnecessary duplication
* Include clear environment configuration
* Support future feature development

---

# 11. Technology Requirements

## Frontend

* Next.js
* TypeScript
* App Router
* Tailwind CSS

## Backend

* NestJS
* TypeScript
* REST API

## Database

* MongoDB
* Mongoose

## Architecture

The project will use a monorepo structure managed with:

* pnpm
* Turborepo

Initial structure:

apps/

* web
* api

packages/

* ui
* types
* utils
* config

---

# 12. Integrations

The platform may require the following integrations:

* OTP Service Provider
* WhatsApp Business API
* Google Maps
* Google Analytics
* Google Tag Manager
* Meta Pixel

Additional third-party integrations may be introduced based on business requirements.

Third-party credentials and API keys must never be stored directly in the source code.

---

# 13. SEO Requirements

The public website should support basic technical SEO, including:

* SEO-friendly URLs
* Meta titles
* Meta descriptions
* Open Graph metadata
* XML sitemap
* Robots.txt
* Structured data where applicable
* Optimized images
* Mobile-friendly design

---

# 14. Success Metrics

The success of the platform may be measured using:

* Number of website enquiries
* Percentage of OTP-verified leads
* Project enquiry conversion rate
* Calculator engagement
* WhatsApp engagement
* Lead response time
* Qualified lead rate
* Website traffic
* Organic search traffic

Specific performance targets will be defined separately based on business and marketing objectives.

---

# 15. Project Scope

The initial scope includes:

* Premium public website
* Project showcase
* Project detail pages
* Investment Calculator
* Cost Estimator
* OTP-verified enquiry forms
* WhatsApp automation
* Blog
* Contact system
* Admin dashboard
* Lead management
* Basic SEO setup
* Analytics integration
* Responsive design

---

# 16. Future Enhancements

The following features are outside the initial scope unless specifically approved:

* Investor login and dashboard
* Online investment booking
* Payment gateway integration
* Digital document signing
* Advanced CRM automation
* Referral system
* Affiliate system
* Native mobile applications
* Multi-language support
* AI investment assistant

These features should be designed as future extensions without unnecessarily increasing the complexity of the initial implementation.

---

# 17. Development Principles

All development for the 1ASET platform should follow these principles:

1. Build features in small, testable milestones.
2. Inspect existing code before making changes.
3. Do not modify unrelated functionality.
4. Reuse existing patterns and shared code.
5. Keep frontend and backend responsibilities separate.
6. Validate all external input.
7. Never expose secrets in the frontend.
8. Do not hardcode third-party credentials.
9. Test each feature before moving to the next milestone.
10. Commit working features to version control regularly.

---

# 18. Initial Release Definition

The first production release of 1ASET will be considered complete when users can:

* Visit the public website
* Browse available projects
* View detailed project information
* Use the Cost Estimator
* Use the Investment Calculator
* Submit an OTP-verified enquiry
* Receive enquiry confirmation through WhatsApp
* Have their enquiry recorded as a lead
* Allow authorized team members to manage leads and projects through the admin dashboard

All core functionality must be responsive, secure, tested, and ready for production deployment.