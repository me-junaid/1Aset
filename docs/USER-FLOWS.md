# 1ASET — User Flows

## 1. Document Purpose

This document defines the primary user journeys and system flows for the 1ASET platform.

It describes how different users interact with the platform, including:

- Public Visitors
- Potential Investors
- Administrators
- Sales Team Members

This document should be used together with:

- `docs/PRD.md`
- `docs/FEATURES.md`

before implementing frontend screens, backend APIs, database logic, or third-party integrations.

---

# 2. User Types

The platform supports the following primary user types:

1. Public Visitor
2. Potential Investor
3. Admin
4. Sales User

---

# 3. Public Website Navigation Flow

The general visitor journey through the website is:

Home Page

↓

Explore 1ASET

↓

Explore Investment Opportunities

↓

View Project Details

↓

Use Investment Tools

↓

Submit Enquiry

↓

Verify Mobile Number

↓

Lead Created

↓

Receive Confirmation

↓

Sales Follow-up

Visitors should be able to navigate freely between public pages without authentication.

---

# 4. Home Page Flow

## Flow

Visitor Opens Website

↓

Home Page Loads

↓

Visitor Views Hero Section

↓

Visitor Explores Investment Benefits

↓

Visitor Views Featured Projects

↓

Visitor Selects a Project

↓

Project Details Page

OR

Visitor Uses CTA

↓

Investment Calculator / Cost Estimator / Enquiry Form

---

## Primary CTAs

The Home Page may include CTAs such as:

- Explore Projects
- View Investment Opportunities
- Calculate Returns
- Estimate Investment Cost
- Enquire Now
- Talk to an Advisor
- WhatsApp Us

Each CTA should direct the visitor to the appropriate page or action.

---

# 5. Project Discovery Flow

## Flow

Visitor

↓

Projects Page

↓

View Available Projects

↓

Filter by Category

↓

Select Project

↓

View Project Details

↓

Choose an Action

Actions:

- Download Brochure
- Enquire Now
- Request a Call Back
- Contact Through WhatsApp
- Use Calculator

---

# 6. Project Filtering Flow

## Flow

Visitor Opens Projects Page

↓

System Loads Active Projects

↓

Visitor Selects Category

↓

System Filters Projects

↓

Matching Projects Displayed

↓

Visitor Selects a Project

↓

Project Details Page

Initial categories include:

- Open Plots
- Apartments
- Villas
- Holiday Homes
- Farm Plots

If no projects match the selected category:

↓

Display Empty State

↓

Allow Visitor to Clear Filter or Select Another Category

---

# 7. Project Details Flow

## Flow

Visitor Selects Project

↓

System Loads Project Details

↓

Display:

- Project Overview
- Images
- Location
- Investment Information
- Pricing
- ROI
- Expected Appreciation
- Brochure
- Relevant CTAs

↓

Visitor Chooses an Action

### Action A — Download Brochure

Click Download Brochure

↓

Brochure Download Starts

↓

Track Download Event

Optional:

↓

Prompt User to Submit Enquiry

---

### Action B — Enquire Now

Click Enquire Now

↓

Open Enquiry Form

↓

Complete OTP Verification Flow

↓

Submit Enquiry

---

### Action C — Request a Call Back

Click Request a Call Back

↓

Open Lead Form

↓

Complete OTP Verification Flow

↓

Create Verified Lead

---

### Action D — WhatsApp

Click WhatsApp CTA

↓

Open WhatsApp Conversation

↓

Track WhatsApp Click Event

---

# 8. Investment Calculator Flow

## Flow

Visitor Opens Investment Calculator

↓

Enter Investment Details

Examples:

- Investment Amount
- Number of SQFT
- Expected Appreciation Rate
- Holding Period
- Rental Income, if applicable

↓

System Validates Inputs

↓

System Calculates Results

↓

Display Results

Including:

- Initial Investment
- Estimated Appreciation
- Estimated Property Value
- Estimated Rental Income
- Total Estimated Return
- Projected Investment Value

↓

Visitor Can Modify Inputs

↓

Results Update Dynamically

↓

Visitor Can Continue to Enquiry

↓

Open Enquiry Form

↓

Complete OTP Verification

↓

Create Verified Lead

The calculator should clearly communicate that calculated values are estimates and not guaranteed returns.

---

# 9. Cost Estimator Flow

## Flow

Visitor Opens Cost Estimator

↓

Enter Investment Amount

↓

System Validates Input

↓

System Retrieves Applicable Configuration

↓

Calculate:

Base Investment Amount

↓

Platform Charges

↓

Registration Charges

↓

Applicable Taxes

↓

Total Estimated Investment

↓

Display Results

↓

Visitor Changes Investment Amount

↓

Results Update Dynamically

↓

Visitor Can Submit Enquiry

↓

OTP Verification

↓

Verified Lead Created

---

# 10. General Enquiry Flow

This is the standard lead generation flow.

## Step 1 — Visitor Opens Form

The form may be opened from:

- Home Page
- Project Details Page
- Contact Page
- Calculator Page
- CTA Section

↓

## Step 2 — Visitor Enters Details

Required or configured fields may include:

- Name
- Phone Number
- Email Address
- Interested Project
- Investment Amount
- Preferred Location

↓

## Step 3 — Validate Form Data

System validates:

- Required fields
- Name format
- Phone number format
- Email format, if provided

If validation fails:

↓

Display Relevant Error Messages

If validation succeeds:

↓

Continue to OTP Verification

---

# 11. OTP Verification Flow

## Step 1 — Enter Phone Number

Visitor enters a valid mobile number.

↓

System validates the number format.

If invalid:

↓

Display Error

↓

Allow User to Correct Number

If valid:

↓

Continue

---

## Step 2 — Request OTP

Visitor clicks:

Send OTP

↓

Frontend sends OTP request to Backend

↓

Backend performs validation

↓

Check rate limits

↓

Generate OTP

↓

Store OTP verification record securely

↓

Set OTP expiry

↓

Send OTP through configured provider

↓

Return appropriate response

If successful:

↓

Display OTP Input

If failed:

↓

Display Error Message

Allow Retry According to Rate Limits

---

## Step 3 — Enter OTP

Visitor enters the received OTP.

↓

Frontend sends OTP verification request to Backend

↓

Backend validates:

- OTP exists
- OTP has not expired
- OTP has not already been used
- Maximum attempts have not been exceeded
- OTP matches

If verification fails:

↓

Increase failed attempt count where applicable

↓

Display Error

↓

Allow Retry if Attempts Remain

If verification succeeds:

↓

Mark Phone Number as Verified

↓

Return Verification Token or Verification State

↓

Allow Enquiry Submission

---

# 12. Verified Lead Creation Flow

After successful OTP verification:

Visitor Clicks Submit Enquiry

↓

Frontend submits lead data

↓

Backend validates:

- Form data
- OTP verification state
- Verification validity
- Required fields

↓

If invalid:

Return Validation Error

↓

If valid:

Create Lead

↓

Assign Lead Status:

New

↓

Store Lead Source

↓

Store Related Project, if applicable

↓

Record Lead Creation Time

↓

Return Success Response

↓

Trigger Post-Lead Automation

---

# 13. Post-Lead Automation Flow

After a lead is successfully created:

Verified Lead Created

↓

Trigger Automation Process

↓

├── Customer Confirmation
│
├── Sales Team Notification
│
└── Automation Logging

---

## 13.1 Customer Confirmation Flow

Lead Created

↓

Prepare WhatsApp Message

↓

Insert Relevant Lead Information

↓

Send Message Through WhatsApp Provider

↓

Provider Response

↓

If Successful:

Log Successful Automation

If Failed:

Log Failure

↓

Do Not Delete or Roll Back the Lead

Failed message delivery should not prevent successful lead creation.

---

## 13.2 Sales Team Notification Flow

Lead Created

↓

Identify Notification Recipient or Sales Team

↓

Prepare Lead Notification

Including:

- Lead Name
- Phone Number
- Interested Project
- Investment Amount
- Preferred Location
- Lead Source

↓

Send Notification

↓

Log Result

---

# 14. Lead Management Flow

## Admin / Sales User

User Logs In

↓

Authentication Successful

↓

Access Lead Dashboard

↓

View Lead List

↓

User Can:

- Search Leads
- Filter Leads
- Open Lead Details
- Update Lead Status
- Add Notes
- Track Follow-ups

---

## Lead Status Update Flow

Open Lead

↓

View Lead Details

↓

Select New Status

Options:

- New
- Contacted
- Qualified
- Follow Up
- Converted
- Lost

↓

Add Optional Note

↓

Save Changes

↓

Backend Validates Request

↓

Lead Updated

↓

Display Updated Status

---

# 15. Admin Login Flow

Admin or Sales User

↓

Open Admin Login Page

↓

Enter Credentials

↓

Submit Login Form

↓

Backend Validates Credentials

If Invalid:

↓

Return Authentication Error

↓

Display Error Message

If Valid:

↓

Create Authenticated Session

↓

Return Secure Authentication Response

↓

Redirect User to Dashboard

---

# 16. Admin Dashboard Flow

Authenticated Admin

↓

Dashboard Loads

↓

Display Overview

Examples:

- Total Leads
- New Leads
- Qualified Leads
- Converted Leads
- Recent Leads
- Project Summary

↓

User Selects Management Module

Available modules may include:

- Projects
- Leads
- Blogs
- Testimonials
- FAQs
- Website Content
- Calculator Configuration

---

# 17. Project Management Flow

Admin

↓

Open Projects Management

↓

View Projects

↓

Choose Action

### Create Project

Click Add Project

↓

Enter Project Information

↓

Upload Images

↓

Add Investment Details

↓

Add Pricing

↓

Add ROI Information

↓

Upload Brochure

↓

Validate Data

↓

Save Project

↓

Project Created

---

### Edit Project

Select Existing Project

↓

Update Required Fields

↓

Validate Changes

↓

Save

↓

Project Updated

---

### Delete Project

Select Project

↓

Click Delete

↓

Show Confirmation

↓

Admin Confirms

↓

Delete or Archive According to Implementation Rules

↓

Refresh Project List

---

### Change Project Status

Admin Selects Project

↓

Change Status

For example:

- Draft
- Active
- Inactive

↓

Save Changes

↓

Public Visibility Updates According to Status

Only projects configured as publicly visible should appear on the public website.

---

# 18. Blog Flow

## Public User Flow

Visitor Opens Blog Page

↓

System Loads Published Articles

↓

Visitor Selects Article

↓

Article Details Page Loads

↓

Visitor Reads Article

↓

May Navigate to:

- Related Projects
- Calculator
- Enquiry Form
- Other Articles

---

## Admin Blog Management Flow

Admin Opens Blog Management

↓

View Articles

↓

Choose Action:

- Create
- Edit
- Delete
- Publish
- Unpublish

↓

Save Changes

↓

Published Articles Become Available on Public Website

---

# 19. FAQ Flow

## Public User

Visitor Opens FAQ Section

↓

View Questions

↓

Select Question

↓

Answer Expands

↓

Visitor Can Select Another Question

---

## Admin

Admin Opens FAQ Management

↓

Create / Edit / Delete FAQ

↓

Set Display Order

↓

Set Active Status

↓

Save Changes

↓

Public Website Updates

---

# 20. Testimonial Flow

## Public User

Visitor Opens Relevant Website Section

↓

System Loads Active Testimonials

↓

Display Testimonials

---

## Admin

Admin Opens Testimonial Management

↓

Create / Edit / Delete Testimonial

↓

Set Active Status

↓

Save Changes

↓

Public Website Displays Active Testimonials

---

# 21. Website Content Management Flow

Admin

↓

Open Content Management

↓

Select Content Section

Examples:

- Homepage Hero
- Section Headings
- CTA Content
- Informational Sections

↓

Edit Content

↓

Save Changes

↓

Validate Content

↓

Publish Updated Content

↓

Public Website Displays Updated Content

Content changes should not require code deployment where the content is configured as dynamic.

---

# 22. Calculator Configuration Flow

Admin

↓

Open Calculator Configuration

↓

Select Calculator

- Investment Calculator
- Cost Estimator

↓

Update Configurable Values

Examples:

- Platform Charge Percentage
- Registration Charge Percentage
- Tax Percentage
- Default Appreciation Rate

↓

Validate Values

↓

Save Configuration

↓

Updated Configuration Becomes Available for New Calculations

---

# 23. Authentication Failure Flow

User Attempts to Access Protected Route

↓

System Checks Authentication

If Not Authenticated:

↓

Redirect to Login

If Authenticated but Unauthorized:

↓

Display Access Denied

If Authorized:

↓

Allow Access

---

# 24. Error Handling Flow

For all major user actions:

User Performs Action

↓

System Processes Request

↓

Request Successful?

├── Yes
│   ↓
│ Display Success State
│
└── No
    ↓
    Log Error Where Required
    ↓
    Return Safe Error Response
    ↓
    Display User-Friendly Error Message
    ↓
    Allow User to Retry Where Appropriate

Sensitive system details must never be displayed to public users.

---

# 25. Primary End-to-End Investor Journey

The main conversion journey is:

Visitor Discovers 1ASET

↓

Visits Website

↓

Explores Investment Opportunities

↓

Filters Projects

↓

Views Project Details

↓

Reviews Investment Information

↓

Uses Cost Estimator and/or Investment Calculator

↓

Clicks Enquire Now

↓

Enters Details

↓

Requests OTP

↓

Receives OTP

↓

Verifies Mobile Number

↓

Submits Enquiry

↓

Verified Lead Created

↓

Customer Receives WhatsApp Confirmation

↓

Sales Team Receives Lead Notification

↓

Sales Team Contacts Investor

↓

Lead Status Updated

↓

Qualified / Converted / Lost

---

# 26. User Flow Implementation Rules

When implementing any flow:

1. Read `docs/PRD.md`.
2. Read `docs/FEATURES.md`.
3. Read this `docs/USER-FLOWS.md`.
4. Inspect existing code before implementing.
5. Keep frontend and backend responsibilities separate.
6. Validate all user input.
7. Protect sensitive operations.
8. Do not expose secrets to the frontend.
9. Handle loading, success, error, and empty states.
10. Ensure flows work correctly on mobile devices.
11. Do not modify unrelated functionality.
12. Test the complete flow after implementation.
13. Update this document if the approved user flow changes.

---

# 27. Initial Release Critical Flows

The following flows are critical for the first production release:

1. Public Website Navigation
2. Project Discovery
3. Project Details
4. Investment Calculator
5. Cost Estimator
6. OTP Request
7. OTP Verification
8. Verified Lead Creation
9. WhatsApp Customer Confirmation
10. Sales Team Lead Notification
11. Admin Login
12. Project Management
13. Lead Management

These flows should be prioritized during development and tested thoroughly before production deployment.