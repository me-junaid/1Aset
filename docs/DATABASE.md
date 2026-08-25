# 1ASET — Database Design Specification

## 1. Document Purpose

This document defines the database architecture and data model for the 1ASET platform.

The backend will use:

- MongoDB
- Mongoose
- NestJS
- TypeScript

This document defines:

- Database collections
- Schema fields
- Data types
- Relationships
- Enums
- Indexes
- Validation rules
- Data retention
- Security requirements

This document should be used together with:

- `docs/PRD.md`
- `docs/FEATURES.md`
- `docs/USER-FLOWS.md`

Before creating or modifying a database schema, review this document.

Do not create duplicate collections, fields, or relationships without updating this specification.

---

# 2. Database Principles

## 2.1 General Rules

All primary collections must:

- Use MongoDB ObjectIds as primary identifiers.
- Use Mongoose schemas.
- Include `createdAt` and `updatedAt` timestamps.
- Validate required fields.
- Use enums for predefined values.
- Add indexes for frequently queried fields.
- Avoid unnecessary data duplication.
- Avoid storing secrets or credentials.
- Follow consistent naming conventions.

---

## 2.2 Naming Conventions

### MongoDB Collections

Use lowercase plural names.

Examples:

```text
users
projects
leads
blogs
faqs
````

### Schema Fields

Use camelCase.

Examples:

```text
minimumInvestment
expectedROI
isFeatured
createdAt
```

### Enum Values

Use uppercase snake case where required.

Examples:

```text
OPEN_PLOT
HOLIDAY_HOME
FOLLOW_UP
```

---

# 3. Collection Overview

The initial release will use the following collections:

```text
users
projects
leads
otp_verifications
blogs
testimonials
faqs
calculator_configs
website_contents
```

The following collections may be added if required:

```text
lead_activities
whatsapp_logs
```

---

# 4. Users Collection

## Collection Name

```text
users
```

## Purpose

Stores authenticated internal users of the platform.

Initial users include:

* Administrators
* Sales Team Members

---

## 4.1 User Schema

| Field         | Type     | Required | Description           |
| ------------- | -------- | -------- | --------------------- |
| `_id`         | ObjectId | Yes      | Primary identifier    |
| `name`        | String   | Yes      | Full name             |
| `email`       | String   | Yes      | Unique email address  |
| `password`    | String   | Yes      | Hashed password       |
| `role`        | Enum     | Yes      | User role             |
| `isActive`    | Boolean  | Yes      | Account status        |
| `lastLoginAt` | Date     | No       | Last successful login |
| `createdAt`   | Date     | Yes      | Creation timestamp    |
| `updatedAt`   | Date     | Yes      | Last update timestamp |

---

## 4.2 User Roles

Initial roles:

```text
ADMIN
SALES
```

Possible future roles:

```text
MANAGER
EDITOR
```

---

## 4.3 User Validation Rules

* `name` is required.
* `name` must be trimmed.
* `email` is required.
* `email` must be stored in lowercase.
* `email` must be unique.
* `email` must be validated.
* `password` must never be returned in API responses.
* Passwords must always be hashed.
* `role` must be a valid enum value.
* `isActive` defaults to `true`.

---

## 4.4 User Indexes

```text
email → Unique Index
role → Index
isActive → Index
```

---

# 5. Projects Collection

## Collection Name

```text
projects
```

## Purpose

Stores real estate investment opportunities displayed on the public website.

---

## 5.1 Project Schema

### Basic Information

| Field              | Type     | Required | Description               |
| ------------------ | -------- | -------- | ------------------------- |
| `_id`              | ObjectId | Yes      | Primary identifier        |
| `title`            | String   | Yes      | Project name              |
| `slug`             | String   | Yes      | Unique URL slug           |
| `category`         | Enum     | Yes      | Project category          |
| `shortDescription` | String   | Yes      | Short project description |
| `description`      | String   | Yes      | Full project description  |
| `location`         | Object   | Yes      | Project location          |
| `status`           | Enum     | Yes      | Project status            |
| `isFeatured`       | Boolean  | Yes      | Featured project flag     |
| `createdAt`        | Date     | Yes      | Creation timestamp        |
| `updatedAt`        | Date     | Yes      | Last update timestamp     |

---

## 5.2 Location Object

The project location should be stored as an embedded object.

```ts
location: {
  area: String,
  city: String,
  state: String,
  country: String,
  address: String,
  googleMapsUrl: String
}
```

Required fields:

```text
city
state
```

Example:

```text
area: North Bengaluru
city: Bengaluru
state: Karnataka
country: India
```

---

## 5.3 Investment Information

The project schema should include:

| Field                  | Type   | Required | Description                       |
| ---------------------- | ------ | -------- | --------------------------------- |
| `pricePerSqft`         | Number | No       | Price per square foot             |
| `minimumInvestment`    | Number | Yes      | Minimum investment amount         |
| `expectedROI`          | Number | No       | Expected ROI percentage           |
| `expectedAppreciation` | Number | No       | Expected appreciation percentage  |
| `rentalPotential`      | Number | No       | Estimated rental potential        |
| `investmentDetails`    | String | No       | Additional investment information |

All monetary values should be stored as numeric values.

Do not store formatted currency strings.

Correct:

```text
minimumInvestment: 5000000
```

Incorrect:

```text
minimumInvestment: "₹50 Lakhs"
```

Currency formatting must be handled by the frontend.

---

## 5.4 Project Media

| Field           | Type             | Required | Description            |
| --------------- | ---------------- | -------- | ---------------------- |
| `featuredImage` | String           | Yes      | Main project image URL |
| `gallery`       | Array of Strings | No       | Project image URLs     |
| `brochureUrl`   | String           | No       | Project brochure URL   |

Example:

```ts
gallery: [
  "https://storage.example.com/project/image-1.jpg",
  "https://storage.example.com/project/image-2.jpg"
]
```

Only URLs or approved media references should be stored.

Do not store large image files directly inside MongoDB.

---

## 5.5 Project Categories

```text
OPEN_PLOT
APARTMENT
VILLA
HOLIDAY_HOME
FARM_PLOT
```

---

## 5.6 Project Status

```text
DRAFT
ACTIVE
INACTIVE
ARCHIVED
```

Only projects with:

```text
ACTIVE
```

should be publicly visible.

---

## 5.7 Project Validation Rules

* `title` is required.
* `slug` is required.
* `slug` must be unique.
* `category` must be a valid enum.
* `minimumInvestment` must be greater than zero.
* Percentage values should not be negative.
* Active projects must contain the required public information.
* URLs must be validated where applicable.

---

## 5.8 Project Indexes

```text
slug → Unique Index
category → Index
status → Index
isFeatured → Index
createdAt → Descending Index
```

---

# 6. Leads Collection

## Collection Name

```text
leads
```

## Purpose

Stores enquiries submitted by potential investors.

Website leads must complete OTP verification before being created as verified leads.

---

## 6.1 Lead Schema

| Field               | Type     | Required | Description                   |
| ------------------- | -------- | -------- | ----------------------------- |
| `_id`               | ObjectId | Yes      | Primary identifier            |
| `name`              | String   | Yes      | Lead name                     |
| `phone`             | String   | Yes      | Phone number                  |
| `email`             | String   | No       | Email address                 |
| `project`           | ObjectId | No       | Reference to project          |
| `investmentAmount`  | Number   | No       | Expected investment amount    |
| `preferredLocation` | String   | No       | Preferred investment location |
| `source`            | Enum     | Yes      | Lead source                   |
| `status`            | Enum     | Yes      | Lead status                   |
| `assignedTo`        | ObjectId | No       | Assigned sales user           |
| `notes`             | Array    | No       | Embedded lead notes           |
| `otpVerified`       | Boolean  | Yes      | OTP verification status       |
| `otpVerifiedAt`     | Date     | No       | OTP verification timestamp    |
| `lastFollowUpAt`    | Date     | No       | Last follow-up timestamp      |
| `nextFollowUpAt`    | Date     | No       | Next follow-up timestamp      |
| `createdAt`         | Date     | Yes      | Creation timestamp            |
| `updatedAt`         | Date     | Yes      | Last update timestamp         |

---

## 6.2 Lead Relationships

```text
Lead
├── project → Projects._id
└── assignedTo → Users._id
```

---

## 6.3 Lead Source Enum

```text
WEBSITE
PROJECT_PAGE
CONTACT_PAGE
INVESTMENT_CALCULATOR
COST_ESTIMATOR
WHATSAPP
DIRECT
OTHER
```

The default source should be determined by the API endpoint or submitted context.

Do not allow unrestricted arbitrary source values.

---

## 6.4 Lead Status Enum

```text
NEW
CONTACTED
QUALIFIED
FOLLOW_UP
CONVERTED
LOST
```

Default:

```text
NEW
```

---

## 6.5 Lead Notes

Notes should be embedded within the lead document.

Each note should contain:

```ts
{
  content: String,
  createdBy: ObjectId,
  createdAt: Date
}
```

Relationship:

```text
createdBy → Users._id
```

Notes are embedded because they belong directly to a single lead and do not require independent management in the initial release.

---

## 6.6 Lead Validation Rules

* `name` is required.
* `phone` is required.
* Phone numbers must be normalized before storage.
* `email`, when provided, must be valid.
* `investmentAmount`, when provided, must be positive.
* `status` must be a valid enum.
* `source` must be a valid enum.
* `assignedTo`, when provided, must reference a valid user.
* `project`, when provided, must reference a valid project.
* Website OTP-verified submissions must have `otpVerified: true`.

---

## 6.7 Lead Indexes

```text
phone → Index
status → Index
source → Index
project → Index
assignedTo → Index
createdAt → Descending Index
nextFollowUpAt → Index
```

---

## 6.8 Duplicate Lead Handling

The system should not use a simple unique constraint on `phone`.

The same person may enquire about multiple projects.

Potential duplicate detection may use:

```text
phone
+
project
+
time period
```

Duplicate detection should be implemented at the service layer according to approved business rules.

---

# 7. OTP Verifications Collection

## Collection Name

```text
otp_verifications
```

## Purpose

Temporarily stores OTP verification requests.

This collection supports secure mobile number verification before lead submission.

---

## 7.1 OTP Verification Schema

| Field             | Type     | Required | Description                        |
| ----------------- | -------- | -------- | ---------------------------------- |
| `_id`             | ObjectId | Yes      | Primary identifier                 |
| `phone`           | String   | Yes      | Normalized mobile number           |
| `otpHash`         | String   | Yes      | Hashed OTP                         |
| `expiresAt`       | Date     | Yes      | OTP expiration time                |
| `isVerified`      | Boolean  | Yes      | Verification status                |
| `verifiedAt`      | Date     | No       | Verification timestamp             |
| `attempts`        | Number   | Yes      | Failed/total verification attempts |
| `requestCount`    | Number   | Yes      | Number of OTP requests             |
| `lastRequestedAt` | Date     | Yes      | Last OTP request time              |
| `createdAt`       | Date     | Yes      | Creation timestamp                 |
| `updatedAt`       | Date     | Yes      | Last update timestamp              |

---

## 7.2 OTP Security Rules

The system must:

* Never store plain text OTP values.
* Store only hashed OTP values.
* Generate OTP values securely.
* Set an expiration time.
* Prevent OTP reuse.
* Prevent verification after expiry.
* Limit verification attempts.
* Limit OTP requests.
* Apply API rate limiting.
* Never return OTP values in API responses.

---

## 7.3 OTP Verification Lifecycle

```text
Phone Number Entered
        ↓
OTP Requested
        ↓
OTP Generated
        ↓
OTP Hashed
        ↓
OTP Stored
        ↓
OTP Sent Through Provider
        ↓
User Enters OTP
        ↓
OTP Verified
        ↓
Verification Marked Successful
        ↓
Lead Submission Allowed
```

---

## 7.4 OTP Indexes

```text
phone → Index
expiresAt → TTL Index
```

The TTL index should automatically remove expired OTP records.

---

# 8. Blogs Collection

## Collection Name

```text
blogs
```

## Purpose

Stores blog articles used for content marketing and SEO.

---

## 8.1 Blog Schema

| Field           | Type     | Required | Description           |
| --------------- | -------- | -------- | --------------------- |
| `_id`           | ObjectId | Yes      | Primary identifier    |
| `title`         | String   | Yes      | Article title         |
| `slug`          | String   | Yes      | Unique URL slug       |
| `excerpt`       | String   | Yes      | Short article summary |
| `content`       | String   | Yes      | Full article content  |
| `featuredImage` | String   | No       | Featured image URL    |
| `author`        | ObjectId | No       | Reference to user     |
| `status`        | Enum     | Yes      | Publication status    |
| `publishedAt`   | Date     | No       | Publication timestamp |
| `seo`           | Object   | No       | SEO metadata          |
| `createdAt`     | Date     | Yes      | Creation timestamp    |
| `updatedAt`     | Date     | Yes      | Last update timestamp |

---

## 8.2 Blog Status Enum

```text
DRAFT
PUBLISHED
ARCHIVED
```

Only `PUBLISHED` blogs should be visible on the public website.

---

## 8.3 SEO Object

```ts
seo: {
  metaTitle: String,
  metaDescription: String,
  ogImage: String
}
```

---

## 8.4 Blog Relationships

```text
author → Users._id
```

---

## 8.5 Blog Validation Rules

* `title` is required.
* `slug` is required and unique.
* `excerpt` is required.
* `content` is required.
* Published blogs must have `publishedAt`.
* SEO fields must be validated when provided.

---

## 8.6 Blog Indexes

```text
slug → Unique Index
status → Index
publishedAt → Descending Index
```

---

# 9. Testimonials Collection

## Collection Name

```text
testimonials
```

## Purpose

Stores testimonials displayed on the public website.

---

## 9.1 Testimonial Schema

| Field          | Type     | Required | Description                |
| -------------- | -------- | -------- | -------------------------- |
| `_id`          | ObjectId | Yes      | Primary identifier         |
| `name`         | String   | Yes      | Person name                |
| `designation`  | String   | No       | Role, company, or location |
| `content`      | String   | Yes      | Testimonial content        |
| `image`        | String   | No       | Profile image URL          |
| `isActive`     | Boolean  | Yes      | Public display status      |
| `displayOrder` | Number   | Yes      | Display order              |
| `createdAt`    | Date     | Yes      | Creation timestamp         |
| `updatedAt`    | Date     | Yes      | Last update timestamp      |

---

## 9.2 Testimonial Validation Rules

* `name` is required.
* `content` is required.
* `displayOrder` must be zero or greater.
* `isActive` defaults to `true`.

---

## 9.3 Testimonial Indexes

```text
isActive → Index
displayOrder → Index
```

---

# 10. FAQs Collection

## Collection Name

```text
faqs
```

## Purpose

Stores frequently asked questions displayed on the website.

---

## 10.1 FAQ Schema

| Field          | Type     | Required | Description           |
| -------------- | -------- | -------- | --------------------- |
| `_id`          | ObjectId | Yes      | Primary identifier    |
| `question`     | String   | Yes      | FAQ question          |
| `answer`       | String   | Yes      | FAQ answer            |
| `category`     | String   | No       | FAQ category          |
| `displayOrder` | Number   | Yes      | Display order         |
| `isActive`     | Boolean  | Yes      | Public display status |
| `createdAt`    | Date     | Yes      | Creation timestamp    |
| `updatedAt`    | Date     | Yes      | Last update timestamp |

---

## 10.2 FAQ Validation Rules

* `question` is required.
* `answer` is required.
* `displayOrder` must be zero or greater.
* `isActive` defaults to `true`.

---

## 10.3 FAQ Indexes

```text
isActive → Index
category → Index
displayOrder → Index
```

---

# 11. Calculator Configurations Collection

## Collection Name

```text
calculator_configs
```

## Purpose

Stores configurable values for:

* Investment Calculator
* Cost Estimator

This allows administrators to update calculation configuration without changing application code.

---

## 11.1 Calculator Configuration Schema

| Field            | Type     | Required | Description                         |
| ---------------- | -------- | -------- | ----------------------------------- |
| `_id`            | ObjectId | Yes      | Primary identifier                  |
| `calculatorType` | Enum     | Yes      | Calculator type                     |
| `config`         | Object   | Yes      | Calculator configuration            |
| `isActive`       | Boolean  | Yes      | Active status                       |
| `updatedBy`      | ObjectId | No       | User who last updated configuration |
| `createdAt`      | Date     | Yes      | Creation timestamp                  |
| `updatedAt`      | Date     | Yes      | Last update timestamp               |

---

## 11.2 Calculator Types

```text
INVESTMENT
COST
```

---

## 11.3 Cost Estimator Configuration

Example:

```ts
config: {
  platformChargePercentage: Number,
  registrationChargePercentage: Number,
  taxPercentage: Number
}
```

Example data:

```json
{
  "calculatorType": "COST",
  "config": {
    "platformChargePercentage": 2,
    "registrationChargePercentage": 5,
    "taxPercentage": 18
  },
  "isActive": true
}
```

The exact percentages should be configured according to approved business requirements.

---

## 11.4 Investment Calculator Configuration

Example:

```ts
config: {
  defaultAppreciationRate: Number,
  defaultHoldingPeriod: Number,
  defaultRentalYield: Number
}
```

Example data:

```json
{
  "calculatorType": "INVESTMENT",
  "config": {
    "defaultAppreciationRate": 10,
    "defaultHoldingPeriod": 5,
    "defaultRentalYield": 3
  },
  "isActive": true
}
```

These values are configurable defaults and should not be treated as guaranteed investment returns.

---

## 11.5 Calculator Configuration Relationship

```text
updatedBy → Users._id
```

---

## 11.6 Calculator Configuration Indexes

```text
calculatorType → Unique Index
isActive → Index
```

Only one active configuration should exist for each calculator type.

---

# 12. Website Contents Collection

## Collection Name

```text
website_contents
```

## Purpose

Stores selected dynamic website content that administrators can update without code deployment.

---

## 12.1 Website Content Schema

| Field       | Type     | Required | Description               |
| ----------- | -------- | -------- | ------------------------- |
| `_id`       | ObjectId | Yes      | Primary identifier        |
| `key`       | String   | Yes      | Unique content identifier |
| `content`   | Object   | Yes      | Dynamic content data      |
| `updatedBy` | ObjectId | No       | User who updated content  |
| `createdAt` | Date     | Yes      | Creation timestamp        |
| `updatedAt` | Date     | Yes      | Last update timestamp     |

---

## 12.2 Initial Content Keys

```text
HOME_HERO
HOME_INVESTMENT_BENEFITS
HOME_ABOUT
HOME_CTA
CONTACT_INFO
```

Additional content keys may be added as new dynamic sections are approved.

---

## 12.3 Example Website Content

```json
{
  "key": "HOME_HERO",
  "content": {
    "title": "Invest in Tomorrow",
    "subtitle": "Discover premium real estate investment opportunities.",
    "primaryCtaText": "Explore Projects",
    "secondaryCtaText": "Talk to an Advisor"
  }
}
```

---

## 12.4 Website Content Relationship

```text
updatedBy → Users._id
```

---

## 12.5 Website Content Indexes

```text
key → Unique Index
```

---

# 13. Optional Collection — Lead Activities

## Collection Name

```text
lead_activities
```

## Purpose

Tracks important events in the lifecycle of a lead.

This collection is optional for the initial release but recommended when detailed lead history is required.

---

## 13.1 Example Activities

* Lead Created
* Lead Assigned
* Lead Status Changed
* Note Added
* Follow-up Scheduled
* Follow-up Completed
* WhatsApp Sent

---

## 13.2 Suggested Schema

| Field         | Type     | Required | Description               |
| ------------- | -------- | -------- | ------------------------- |
| `_id`         | ObjectId | Yes      | Primary identifier        |
| `lead`        | ObjectId | Yes      | Related lead              |
| `type`        | String   | Yes      | Activity type             |
| `description` | String   | Yes      | Activity description      |
| `performedBy` | ObjectId | No       | User who performed action |
| `metadata`    | Object   | No       | Additional activity data  |
| `createdAt`   | Date     | Yes      | Activity timestamp        |

---

## 13.3 Relationships

```text
lead → Leads._id
performedBy → Users._id
```

---

## 13.4 Suggested Indexes

```text
lead → Index
createdAt → Descending Index
type → Index
```

---

# 14. Optional Collection — WhatsApp Logs

## Collection Name

```text
whatsapp_logs
```

## Purpose

Tracks WhatsApp automation activity.

This collection is recommended if the system needs detailed monitoring of message delivery and failures.

---

## 14.1 WhatsApp Log Schema

| Field               | Type     | Required | Description                     |
| ------------------- | -------- | -------- | ------------------------------- |
| `_id`               | ObjectId | Yes      | Primary identifier              |
| `lead`              | ObjectId | No       | Related lead                    |
| `phone`             | String   | Yes      | Recipient phone                 |
| `messageType`       | Enum     | Yes      | Message category                |
| `status`            | Enum     | Yes      | Message status                  |
| `providerMessageId` | String   | No       | Provider message identifier     |
| `error`             | String   | No       | Error information               |
| `metadata`          | Object   | No       | Additional provider information |
| `createdAt`         | Date     | Yes      | Creation timestamp              |
| `updatedAt`         | Date     | Yes      | Last update timestamp           |

---

## 14.2 Message Type Enum

```text
CUSTOMER_CONFIRMATION
SALES_NOTIFICATION
OTHER
```

---

## 14.3 WhatsApp Status Enum

```text
PENDING
SENT
FAILED
DELIVERED
READ
```

---

## 14.4 WhatsApp Log Relationships

```text
lead → Leads._id
```

---

## 14.5 WhatsApp Log Indexes

```text
lead → Index
phone → Index
status → Index
messageType → Index
createdAt → Descending Index
```

---

# 15. Database Relationships

The primary relationships are:

```text
USERS
│
├── manages LEADS
│
├── assigned to LEADS
│
├── authors BLOGS
│
├── updates CALCULATOR_CONFIGS
│
└── updates WEBSITE_CONTENTS


PROJECTS
│
└── referenced by LEADS


LEADS
│
├── references PROJECTS
│
├── may be assigned to USERS
│
├── contains embedded NOTES
│
├── may have LEAD_ACTIVITIES
│
└── may have WHATSAPP_LOGS


OTP_VERIFICATIONS
│
└── associated with a PHONE NUMBER
```

---

# 16. Entity Relationship Overview

```text
                    USERS
                      │
          ┌───────────┼────────────┐
          │           │            │
          ▼           ▼            ▼
        LEADS       BLOGS   WEBSITE_CONTENTS
          │
          │
          ▼
       PROJECTS


LEADS ──────────── LEAD_ACTIVITIES
  │
  │
  └────────────── WHATSAPP_LOGS


OTP_VERIFICATIONS
        │
        ▼
   PHONE NUMBER


CALCULATOR_CONFIGS
        │
        ▼
CALCULATOR SETTINGS
```

---

# 17. Data Validation Rules

## 17.1 Users

* Name is required.
* Email is required.
* Email must be unique.
* Email must be valid.
* Password must be hashed.
* Role must be valid.

---

## 17.2 Projects

* Title is required.
* Slug is required.
* Slug must be unique.
* Category must be valid.
* Minimum investment must be positive.
* Active projects must contain required public information.

---

## 17.3 Leads

* Name is required.
* Phone number is required.
* Phone number must be normalized.
* Email must be valid when provided.
* Status must be valid.
* Source must be valid.
* OTP verification must be completed for OTP-protected website leads.

---

## 17.4 OTP Verifications

* Phone number is required.
* OTP hash is required.
* Expiration time is required.
* Plain OTP values must never be stored.
* Attempts must not exceed configured limits.

---

## 17.5 Blogs

* Title is required.
* Slug must be unique.
* Excerpt is required.
* Content is required.
* Published blogs require `publishedAt`.

---

# 18. Phone Number Storage

Phone numbers should be stored in a normalized international format.

Example:

```text
+919876543210
```

Do not store multiple formats for the same phone number.

Avoid:

```text
9876543210
+91 98765 43210
+91-9876543210
```

The backend should normalize the number before storing and comparing it.

---

# 19. Timestamp Requirements

All primary collections must use:

```text
createdAt
updatedAt
```

These should be automatically managed by Mongoose timestamps.

Do not manually duplicate timestamp fields unless a specific field represents a business event.

Examples of business event timestamps:

```text
publishedAt
verifiedAt
otpVerifiedAt
lastLoginAt
lastFollowUpAt
nextFollowUpAt
```

---

# 20. Data Security Requirements

The database must never store:

* Plain text passwords
* Plain text OTP values
* JWT secrets
* WhatsApp API secrets
* OTP provider secrets
* Database credentials
* Private API keys

Sensitive configuration must be stored in environment variables or an approved secrets management system.

---

# 21. Data Retention

Initial retention requirements:

## Users

Users remain in the database unless manually removed or deactivated.

Prefer deactivation when historical relationships need to be preserved.

---

## Projects

Projects should preferably be archived instead of permanently deleted.

Use:

```text
ARCHIVED
```

when the project should no longer be publicly visible but historical references must remain.

---

## Leads

Leads should not be automatically deleted without an approved business and retention policy.

---

## OTP Verifications

Expired OTP records should be automatically removed using a MongoDB TTL index.

---

## WhatsApp Logs

Retention policies can be configured in a future release based on business and monitoring requirements.

---

# 22. Soft Delete Strategy

The initial release should prefer status-based archiving where historical records are important.

Examples:

Projects:

```text
ARCHIVED
```

Users:

```text
isActive: false
```

Avoid permanently deleting records that are referenced by other collections unless referential impact is handled safely.

---

# 23. Database Performance Guidelines

The application should:

* Query only required fields where possible.
* Use indexes for common filters.
* Use pagination for large lists.
* Avoid loading unnecessary relations.
* Use projection to exclude sensitive fields.
* Avoid unbounded queries.
* Sort using indexed fields where possible.

Admin list endpoints should support pagination.

Examples:

```text
GET /leads?page=1&limit=20
GET /projects?page=1&limit=20
GET /blogs?page=1&limit=20
```

The exact API design will be defined in `docs/API.md`.

---

# 24. Initial Release Collections

The following collections are required:

```text
users
projects
leads
otp_verifications
blogs
testimonials
faqs
calculator_configs
website_contents
```

---

# 25. Recommended Initial Release Collections

The following collections are strongly recommended:

```text
lead_activities
whatsapp_logs
```

These provide better monitoring for:

* Lead history
* Sales activity
* WhatsApp automation
* Failed automation attempts
* Message tracking

---

# 26. Future Database Extensions

The database should support future expansion for:

* Investor accounts
* Investor profiles
* Online investment booking
* Payments
* Payment transactions
* Digital documents
* Document signing
* Referral systems
* Affiliate systems
* CRM integrations
* Notification systems
* Multi-language content
* AI assistant conversations

These collections should not be implemented until required.

---

# 27. Database Implementation Rules

When implementing the database:

1. Read `docs/PRD.md`.
2. Read `docs/FEATURES.md`.
3. Read `docs/USER-FLOWS.md`.
4. Read this `docs/DATABASE.md`.
5. Use MongoDB and Mongoose.
6. Use TypeScript.
7. Add timestamps to primary collections.
8. Use enums for predefined values.
9. Add the indexes defined in this document.
10. Validate API input using DTOs.
11. Normalize phone numbers before storage.
12. Never return password hashes.
13. Never return OTP hashes.
14. Never store plain OTP values.
15. Never store API secrets in database documents.
16. Use ObjectId references for independently managed entities.
17. Use embedded objects only for tightly related data.
18. Do not create duplicate collections or schemas.
19. Do not modify unrelated schemas when implementing a feature.
20. Update this document when an approved schema change is made.

---

# 28. Schema Implementation Priority

The recommended implementation order is:

## Phase 1 — Authentication

```text
users
```

## Phase 2 — Core Website

```text
projects
testimonials
faqs
website_contents
```

## Phase 3 — Lead Generation

```text
otp_verifications
leads
lead_activities
```

## Phase 4 — Investment Tools

```text
calculator_configs
```

## Phase 5 — Content

```text
blogs
```

## Phase 6 — Automation

```text
whatsapp_logs
```

---

# 29. Database Source of Truth

This file is the primary database design reference for the project.

When there is a conflict between implementation and this document:

1. Review the product requirement.
2. Confirm the required change.
3. Update this document.
4. Update the implementation accordingly.

Do not silently change the database structure without documenting the change.

````