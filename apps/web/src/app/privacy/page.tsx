import type { Metadata } from "next";
import Link from "next/link";
import {
  ShieldCheck,
  Lock,
  Eye,
  FileText,
  UserCheck,
  Bell,
  Database,
  Mail,
  MapPin,
  CheckCircle2,
  AlertCircle,
  Phone,
  Clock,
} from "lucide-react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";

export const metadata: Metadata = {
  title: "Privacy Policy | 1ASET",
  description:
    "Privacy Policy for 1Aset.com, operated by Paanya Empire Pvt. Ltd. Learn how we collect, protect, and use your personal and investment information.",
  alternates: {
    canonical: "https://1aset.com/privacy",
  },
};

const LAST_UPDATED = "October 26, 2026";

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-[#faf7f2] flex flex-col font-sans selection:bg-blue-600 selection:text-white">
      <Navbar />

      <main className="flex-1">
        {/* Hero Header */}
        <section className="bg-gradient-to-b from-[#072d6e] via-[#0b4eb7] to-[#0a3f96] text-white pt-32 pb-16 px-4 sm:px-6 lg:px-8 border-b border-blue-500/20">
          <div className="max-w-4xl mx-auto space-y-4">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase border border-white/20 text-blue-200">
              <ShieldCheck className="h-4 w-4 text-emerald-400" />
              <span>Legal & Transparency</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-serif font-extrabold tracking-tight">
              Privacy Policy
            </h1>
            <p className="text-blue-100/85 text-sm sm:text-base max-w-2xl leading-relaxed">
              Your trust is our most valuable asset. This policy outlines how
              <strong> 1ASET (Paanya Empire Private Limited)</strong> collects,
              safeguards, and manages your personal and investment data.
            </p>
            <div className="flex items-center gap-4 text-xs text-blue-200/80 pt-2">
              <span className="flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5" />
                Last Updated: {LAST_UPDATED}
              </span>
              <span>•</span>
              <span>Governed under DPDP Act 2023 (India)</span>
            </div>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Table of Contents Sticky Sidebar */}
            <aside className="lg:col-span-4 hidden lg:block">
              <div className="sticky top-28 bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm space-y-3">
                <p className="text-xs font-extrabold uppercase tracking-wider text-slate-400">
                  Contents
                </p>
                <nav className="space-y-1.5 text-xs text-slate-600 font-medium">
                  {[
                    { id: "overview", label: "1. Overview & Entity" },
                    { id: "data-collected", label: "2. Information We Collect" },
                    { id: "how-collected", label: "3. How Information is Collected" },
                    { id: "purpose", label: "4. Purpose & Lawful Processing" },
                    { id: "whatsapp-otp", label: "5. WhatsApp & OTP Verification" },
                    { id: "data-sharing", label: "6. Data Sharing & Third Parties" },
                    { id: "security", label: "7. Storage & Security Measures" },
                    { id: "user-rights", label: "8. Your Rights (DPDP Act 2023)" },
                    { id: "cookies", label: "9. Cookies & Pixel Tracking" },
                    { id: "contact", label: "10. Grievance Officer & Contact" },
                  ].map((item) => (
                    <a
                      key={item.id}
                      href={`#${item.id}`}
                      className="block py-1 hover:text-[#0b4eb7] transition hover:translate-x-0.5"
                    >
                      {item.label}
                    </a>
                  ))}
                </nav>
              </div>
            </aside>

            {/* Main Policy Body */}
            <div className="lg:col-span-8 bg-white border border-slate-200/80 rounded-2xl p-6 sm:p-10 shadow-sm space-y-10 text-slate-700 leading-relaxed text-sm">
              {/* Section 1 */}
              <div id="overview" className="space-y-3 pt-2">
                <div className="flex items-center gap-2 text-[#0b4eb7]">
                  <FileText className="h-5 w-5" />
                  <h2 className="text-xl font-serif font-extrabold text-slate-900">
                    1. Overview &amp; Corporate Entity
                  </h2>
                </div>
                <p>
                  This Privacy Policy applies to the website{" "}
                  <strong>https://1aset.com</strong> and all related subdomains,
                  mobile web experiences, and communications (collectively referred
                  to as the &ldquo;Platform&rdquo;).
                </p>
                <p>
                  The Platform is owned and operated by{" "}
                  <strong>Paanya Empire Private Limited</strong> (&ldquo;1ASET&rdquo;,
                  &ldquo;we&rdquo;, &ldquo;us&rdquo;, or &ldquo;our&rdquo;), a private
                  limited company registered under the Companies Act, 2013, with its
                  operational presence in Bengaluru, Karnataka, India.
                </p>
                <p>
                  We are committed to respecting your privacy and protecting personal
                  data in full compliance with the{" "}
                  <strong>Digital Personal Data Protection Act, 2023 (DPDP Act)</strong>,
                  the <strong>Information Technology Act, 2000</strong>, and applicable
                  real estate disclosure standards under the Real Estate (Regulation
                  and Development) Act, 2016 (RERA).
                </p>
              </div>

              {/* Section 2 */}
              <div id="data-collected" className="space-y-3 border-t border-slate-100 pt-8">
                <div className="flex items-center gap-2 text-[#0b4eb7]">
                  <Database className="h-5 w-5" />
                  <h2 className="text-xl font-serif font-extrabold text-slate-900">
                    2. Information We Collect
                  </h2>
                </div>
                <p>
                  We collect only the personal information reasonably necessary to
                  deliver our real estate investment discovery, verification, and
                  customer advisory services:
                </p>
                <div className="space-y-3 pt-2">
                  <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-4 space-y-1">
                    <p className="font-bold text-slate-900 text-xs uppercase tracking-wide">
                      A. Directly Provided Contact &amp; Profile Data
                    </p>
                    <p className="text-xs text-slate-600">
                      Full Name, Mobile Phone Number, Email Address, City of Residence,
                      and Preferred Investment Location.
                    </p>
                  </div>

                  <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-4 space-y-1">
                    <p className="font-bold text-slate-900 text-xs uppercase tracking-wide">
                      B. Real Estate &amp; Investment Preferences
                    </p>
                    <p className="text-xs text-slate-600">
                      Specific project interest (e.g., Vedha Bhoomi, plots, farmland,
                      villas), budget bracket, estimated holding period, and financing
                      preferences submitted via our inquiry forms or investment calculators.
                    </p>
                  </div>

                  <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-4 space-y-1">
                    <p className="font-bold text-slate-900 text-xs uppercase tracking-wide">
                      C. Identity Verification &amp; Security Data
                    </p>
                    <p className="text-xs text-slate-600">
                      Timestamped One-Time Password (OTP) verification records delivered
                      via WhatsApp or SMS to prevent spam submissions and ensure legitimate
                      lead registration.
                    </p>
                  </div>

                  <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-4 space-y-1">
                    <p className="font-bold text-slate-900 text-xs uppercase tracking-wide">
                      D. Automated Device &amp; Browsing Data
                    </p>
                    <p className="text-xs text-slate-600">
                      IP address, browser type and version, operating system, referring URL,
                      pages visited, duration of visit, and interaction telemetry collected
                      through analytics and performance monitoring cookies.
                    </p>
                  </div>
                </div>
              </div>

              {/* Section 3 */}
              <div id="how-collected" className="space-y-3 border-t border-slate-100 pt-8">
                <div className="flex items-center gap-2 text-[#0b4eb7]">
                  <Eye className="h-5 w-5" />
                  <h2 className="text-xl font-serif font-extrabold text-slate-900">
                    3. How Information is Collected
                  </h2>
                </div>
                <p>We collect information through the following touchpoints:</p>
                <ul className="list-disc pl-5 space-y-2 text-slate-600 text-xs sm:text-sm">
                  <li>
                    <strong>Online Enquiry Forms:</strong> When you request project
                    brochures, schedule an in-person site visit, or express interest
                    in a listed land or residential parcel.
                  </li>
                  <li>
                    <strong>Interactive Tools:</strong> When you use our Compound
                    Growth Calculator or Acquisition Cost Estimator.
                  </li>
                  <li>
                    <strong>Direct Communications:</strong> When you contact our advisory
                    team via phone, email, WhatsApp, or through our customer support channels.
                  </li>
                  <li>
                    <strong>Marketing Campaigns:</strong> When you engage with our
                    verified digital marketing advertisements on Google Search or Meta
                    platforms (Instagram/Facebook).
                  </li>
                </ul>
              </div>

              {/* Section 4 */}
              <div id="purpose" className="space-y-3 border-t border-slate-100 pt-8">
                <div className="flex items-center gap-2 text-[#0b4eb7]">
                  <UserCheck className="h-5 w-5" />
                  <h2 className="text-xl font-serif font-extrabold text-slate-900">
                    4. Purpose &amp; Lawful Processing
                  </h2>
                </div>
                <p>
                  We process your data exclusively for legitimate business purposes
                  under your explicit consent:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  {[
                    "Fulfilling requested project brochures and price breakdowns",
                    "Arranging VIP site visits with dedicated relationship managers",
                    "Authenticating mobile numbers via secure WhatsApp OTP",
                    "Sharing title clarity, survey records, and legal approvals",
                    "Providing relevant Bangalore micro-market intelligence reports",
                    "Complying with statutory real estate and taxation disclosures",
                  ].map((purpose, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-2 bg-slate-50 p-3 rounded-xl border border-slate-200/60 text-xs"
                    >
                      <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span className="text-slate-700">{purpose}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Section 5 */}
              <div id="whatsapp-otp" className="space-y-3 border-t border-slate-100 pt-8">
                <div className="flex items-center gap-2 text-[#0b4eb7]">
                  <Phone className="h-5 w-5" />
                  <h2 className="text-xl font-serif font-extrabold text-slate-900">
                    5. WhatsApp &amp; OTP Verification
                  </h2>
                </div>
                <p>
                  To eliminate spam, safeguard property inventory, and verify investor
                  intent, 1ASET uses an **OTP-verified submission workflow**:
                </p>
                <div className="bg-emerald-50/60 border border-emerald-200/80 rounded-xl p-4 text-xs text-emerald-950 space-y-2">
                  <p className="font-bold flex items-center gap-1.5 text-emerald-900">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                    Consent to Receive Communications
                  </p>
                  <p>
                    By clicking &ldquo;Send OTP&rdquo; or requesting project details on
                    1Aset.com, you explicitly authorize Paanya Empire Pvt. Ltd. and its
                    authorized real estate representatives to contact you via WhatsApp,
                    SMS, phone calls, and email, notwithstanding any registration on the
                    National Do Not Call (NDNC) registry.
                  </p>
                </div>
                <p className="text-xs text-slate-500">
                  You may opt out of promotional messages at any time by replying
                  <strong> &ldquo;STOP&rdquo;</strong> to our WhatsApp message or by
                  emailing our compliance desk at{" "}
                  <a
                    href="mailto:invest@1aset.com"
                    className="text-[#0b4eb7] underline font-medium"
                  >
                    invest@1aset.com
                  </a>
                  . Transactional messages (such as OTP codes or site visit booking passes)
                  will remain operational for ongoing requests.
                </p>
              </div>

              {/* Section 6 */}
              <div id="data-sharing" className="space-y-3 border-t border-slate-100 pt-8">
                <div className="flex items-center gap-2 text-[#0b4eb7]">
                  <Lock className="h-5 w-5" />
                  <h2 className="text-xl font-serif font-extrabold text-slate-900">
                    6. Data Sharing &amp; Third Parties
                  </h2>
                </div>
                <div className="bg-amber-50 border border-amber-200/80 rounded-xl p-4 text-xs text-amber-950 space-y-1">
                  <p className="font-bold flex items-center gap-1.5 text-amber-900">
                    <AlertCircle className="h-4 w-4 text-amber-600" />
                    We Never Sell Your Data
                  </p>
                  <p>
                    1ASET does not sell, rent, or trade investor contact lists or
                    financial criteria to third-party telemarketers or external broker
                    syndicates under any circumstances.
                  </p>
                </div>
                <p>We share data strictly with trusted service infrastructure partners:</p>
                <ul className="list-disc pl-5 space-y-1.5 text-xs text-slate-600">
                  <li>
                    <strong>CRM &amp; Sales Orchestration:</strong> Secure customer relationship
                    platforms (e.g., NeoDove CRM) to assign and log advisory conversations.
                  </li>
                  <li>
                    <strong>Communication Gateways:</strong> Meta WhatsApp Business Cloud
                    API for OTP and transactional document delivery.
                  </li>
                  <li>
                    <strong>Hosting &amp; Storage:</strong> Secure enterprise hosting
                    providers (Vercel, Railway, MongoDB Atlas AWS ap-south-1).
                  </li>
                  <li>
                    <strong>Statutory Authorities:</strong> When required by lawful judicial
                    orders, government regulatory bodies, or RERA authority mandates.
                  </li>
                </ul>
              </div>

              {/* Section 7 */}
              <div id="security" className="space-y-3 border-t border-slate-100 pt-8">
                <div className="flex items-center gap-2 text-[#0b4eb7]">
                  <ShieldCheck className="h-5 w-5" />
                  <h2 className="text-xl font-serif font-extrabold text-slate-900">
                    7. Storage &amp; Security Measures
                  </h2>
                </div>
                <p>
                  We implement robust technical and operational security controls to
                  protect your information against unauthorized access, loss, or misuse:
                </p>
                <ul className="list-disc pl-5 space-y-1.5 text-xs text-slate-600">
                  <li>End-to-end 256-bit TLS/SSL transport encryption across all domains.</li>
                  <li>Role-based access controls with multi-factor authentication for administrative staff.</li>
                  <li>Database encryption-at-rest within Indian data centers (AWS Mumbai).</li>
                  <li>Continuous vulnerability scanning and automated API rate-limiting to prevent brute-force attacks.</li>
                </ul>
              </div>

              {/* Section 8 */}
              <div id="user-rights" className="space-y-3 border-t border-slate-100 pt-8">
                <div className="flex items-center gap-2 text-[#0b4eb7]">
                  <CheckCircle2 className="h-5 w-5" />
                  <h2 className="text-xl font-serif font-extrabold text-slate-900">
                    8. Your Rights (DPDP Act 2023)
                  </h2>
                </div>
                <p>
                  Under India&apos;s Digital Personal Data Protection Act (DPDP Act, 2023),
                  you possess the following rights regarding your personal information:
                </p>
                <div className="space-y-2 text-xs text-slate-700">
                  <p>
                    <strong>Right of Access &amp; Correction:</strong> You may request a
                    summary of your stored data and request correction of inaccurate records.
                  </p>
                  <p>
                    <strong>Right to Erasure (&ldquo;Right to be Forgotten&rdquo;):</strong>{" "}
                    You may request complete deletion of your contact records from our
                    active databases, subject to legal retention constraints.
                  </p>
                  <p>
                    <strong>Right to Withdraw Consent:</strong> You have the right to revoke
                    consent for ongoing marketing and promotional messaging at any moment.
                  </p>
                </div>
                <p className="text-xs text-slate-500 pt-1">
                  To exercise any of these rights, email your request to{" "}
                  <a
                    href="mailto:invest@1aset.com"
                    className="text-[#0b4eb7] underline font-medium"
                  >
                    invest@1aset.com
                  </a>
                  . We will respond within 7 business days.
                </p>
              </div>

              {/* Section 9 */}
              <div id="cookies" className="space-y-3 border-t border-slate-100 pt-8">
                <div className="flex items-center gap-2 text-[#0b4eb7]">
                  <Bell className="h-5 w-5" />
                  <h2 className="text-xl font-serif font-extrabold text-slate-900">
                    9. Cookies &amp; Pixel Tracking
                  </h2>
                </div>
                <p>
                  Our platform uses cookies and pixel tracking (such as Meta Pixel and
                  Google Analytics) to measure conversion performance, understand which
                  real estate categories are most popular, and provide relevant online
                  advertising.
                </p>
                <p className="text-xs text-slate-600">
                  You can modify your browser settings to decline cookies if you prefer.
                  However, doing so may impact certain personalized features of the
                  platform.
                </p>
              </div>

              {/* Section 10 */}
              <div id="contact" className="space-y-4 border-t border-slate-100 pt-8">
                <div className="flex items-center gap-2 text-[#0b4eb7]">
                  <Mail className="h-5 w-5" />
                  <h2 className="text-xl font-serif font-extrabold text-slate-900">
                    10. Grievance Redressal &amp; Contact Desk
                  </h2>
                </div>
                <p>
                  In accordance with the Information Technology Act, 2000 and the DPDP
                  Act, 2023, the details of the designated Grievance Officer are
                  provided below:
                </p>

                <div className="bg-slate-900 text-white p-6 rounded-2xl space-y-3 text-xs">
                  <div className="space-y-1">
                    <p className="font-extrabold text-sm text-emerald-400">
                      Grievance &amp; Compliance Officer
                    </p>
                    <p className="font-semibold text-white">
                      Paanya Empire Private Limited (1ASET)
                    </p>
                  </div>
                  <div className="space-y-1.5 text-slate-300">
                    <p className="flex items-center gap-2">
                      <Mail className="h-3.5 w-3.5 text-blue-400" />
                      <span>
                        Email:{" "}
                        <a
                          href="mailto:invest@1aset.com"
                          className="text-white underline hover:text-emerald-300"
                        >
                          invest@1aset.com
                        </a>{" "}
                        /{" "}
                        <a
                          href="mailto:advisory@1aset.com"
                          className="text-white underline hover:text-emerald-300"
                        >
                          advisory@1aset.com
                        </a>
                      </span>
                    </p>
                    <p className="flex items-center gap-2">
                      <MapPin className="h-3.5 w-3.5 text-blue-400" />
                      <span>Operating City: Bengaluru, Karnataka, India</span>
                    </p>
                  </div>
                </div>

                <div className="pt-2 text-center sm:text-left">
                  <Link
                    href="/"
                    className="inline-flex items-center gap-2 text-xs font-bold text-[#0b4eb7] hover:underline"
                  >
                    &larr; Return to 1ASET Home
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
