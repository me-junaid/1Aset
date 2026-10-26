import type { Metadata } from "next";
import Link from "next/link";
import {
  FileText,
  ShieldCheck,
  AlertTriangle,
  Scale,
  Building2,
  Phone,
  Calculator,
  Lock,
  Compass,
  CheckCircle2,
  Mail,
  MapPin,
  Clock,
} from "lucide-react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";

export const metadata: Metadata = {
  title: "Terms of Service | 1ASET",
  description:
    "Terms of Service for 1Aset.com, operated by Paanya Empire Pvt. Ltd. Understand the rules, disclosures, and legal terms governing real estate investment discovery on our platform.",
  alternates: {
    canonical: "https://1aset.com/terms",
  },
};

const LAST_UPDATED = "October 26, 2026";

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-[#faf7f2] flex flex-col font-sans selection:bg-blue-600 selection:text-white">
      <Navbar />

      <main className="flex-1">
        {/* Hero Header */}
        <section className="bg-gradient-to-b from-[#072d6e] via-[#0b4eb7] to-[#0a3f96] text-white pt-32 pb-16 px-4 sm:px-6 lg:px-8 border-b border-blue-500/20">
          <div className="max-w-4xl mx-auto space-y-4">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase border border-white/20 text-blue-200">
              <Scale className="h-4 w-4 text-emerald-400" />
              <span>Legal &amp; Operating Agreement</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-serif font-extrabold tracking-tight">
              Terms of Service
            </h1>
            <p className="text-blue-100/85 text-sm sm:text-base max-w-2xl leading-relaxed">
              These Terms of Service govern your access to and use of{" "}
              <strong>1Aset.com</strong>, operated by{" "}
              <strong>Paanya Empire Private Limited</strong>. Please read them
              carefully before engaging with our listings, calculators, or advisory services.
            </p>
            <div className="flex items-center gap-4 text-xs text-blue-200/80 pt-2">
              <span className="flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5" />
                Last Updated: {LAST_UPDATED}
              </span>
              <span>•</span>
              <span>Jurisdiction: Bengaluru, India</span>
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
                    { id: "acceptance", label: "1. Acceptance of Terms" },
                    { id: "platform-scope", label: "2. Nature & Scope of Platform" },
                    { id: "accuracy-rera", label: "3. Property Details & RERA Disclosures" },
                    { id: "calculators", label: "4. Calculators & Projections Disclaimer" },
                    { id: "user-conduct", label: "5. User Conduct & OTP Verification" },
                    { id: "site-visits", label: "6. Site Visits & Reservations" },
                    { id: "intellectual-property", label: "7. Intellectual Property Rights" },
                    { id: "liability", label: "8. Limitation of Liability" },
                    { id: "governing-law", label: "9. Governing Law & Dispute Resolution" },
                    { id: "contact", label: "10. Contact Information" },
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
              <div id="acceptance" className="space-y-3 pt-2">
                <div className="flex items-center gap-2 text-[#0b4eb7]">
                  <FileText className="h-5 w-5" />
                  <h2 className="text-xl font-serif font-extrabold text-slate-900">
                    1. Acceptance of Terms
                  </h2>
                </div>
                <p>
                  By accessing, browsing, or utilizing any feature of{" "}
                  <strong>https://1aset.com</strong> (the &ldquo;Platform&rdquo;),
                  you confirm that you are at least 18 years of age, legally capable
                  of entering into binding contracts, and agree to comply with these
                  Terms of Service (&ldquo;Terms&rdquo;) along with our{" "}
                  <Link href="/privacy" className="text-[#0b4eb7] underline font-semibold">
                    Privacy Policy
                  </Link>
                  .
                </p>
                <p>
                  These Terms constitute a legally enforceable agreement between you
                  and <strong>Paanya Empire Private Limited</strong> (&ldquo;1ASET&rdquo;,
                  &ldquo;we&rdquo;, &ldquo;us&rdquo;, or &ldquo;our&rdquo;), incorporated
                  under the Companies Act, 2013, with headquarters in Bengaluru,
                  Karnataka, India.
                </p>
                <p className="text-xs text-slate-500">
                  If you do not agree to these Terms, you must discontinue your use
                  of the Platform immediately.
                </p>
              </div>

              {/* Section 2 */}
              <div id="platform-scope" className="space-y-3 border-t border-slate-100 pt-8">
                <div className="flex items-center gap-2 text-[#0b4eb7]">
                  <Compass className="h-5 w-5" />
                  <h2 className="text-xl font-serif font-extrabold text-slate-900">
                    2. Nature &amp; Scope of the Platform
                  </h2>
                </div>
                <p>
                  1ASET operates a specialized real estate investment discovery,
                  due-diligence review, and customer advisory platform. Our primary
                  focus includes:
                </p>
                <ul className="list-disc pl-5 space-y-1.5 text-xs text-slate-600">
                  <li>Curated managed agro-farmland communities (such as Vedha Bhoomi).</li>
                  <li>Residential villa plots, farm plots, and gated community parcels in Bengaluru and surrounding high-growth corridors.</li>
                  <li>Comprehensive masterplans, tree plantation schedules, soil &amp; water quality analyses, and legal clearance summaries.</li>
                  <li>Facilitation of guided site visits and direct connections between prospective buyers and authorized property representatives.</li>
                </ul>
                <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-4 text-xs text-slate-600">
                  <strong>Non-Brokered Direct Representation:</strong> 1ASET works
                  directly with landowners and project developers to provide clear,
                  transparent inventory. We do not operate as an open unverified
                  classifieds board.
                </div>
              </div>

              {/* Section 3 */}
              <div id="accuracy-rera" className="space-y-3 border-t border-slate-100 pt-8">
                <div className="flex items-center gap-2 text-[#0b4eb7]">
                  <Building2 className="h-5 w-5" />
                  <h2 className="text-xl font-serif font-extrabold text-slate-900">
                    3. Property Details &amp; RERA Disclosures
                  </h2>
                </div>
                <p>
                  While 1ASET exercises rigorous due diligence to ensure that all
                  project descriptions, dimensions, RERA registration numbers, pricing
                  tiers, masterplans, and legal clearances are accurate:
                </p>
                <div className="space-y-2.5 text-xs text-slate-600 pt-1">
                  <div className="flex items-start gap-2 bg-blue-50/60 p-3.5 rounded-xl border border-blue-200/70">
                    <CheckCircle2 className="h-4 w-4 text-[#0b4eb7] shrink-0 mt-0.5" />
                    <span>
                      <strong>Independent Legal Verification:</strong> All property
                      purchases are subject to title clearance, survey verification,
                      and registered agreements. Investors are strongly advised to engage
                      independent legal counsel before executing registered deeds.
                    </span>
                  </div>
                  <div className="flex items-start gap-2 bg-blue-50/60 p-3.5 rounded-xl border border-blue-200/70">
                    <CheckCircle2 className="h-4 w-4 text-[#0b4eb7] shrink-0 mt-0.5" />
                    <span>
                      <strong>RERA Compliance:</strong> Where applicable by statute,
                      projects are promoted in compliance with the Real Estate
                      (Regulation and Development) Act (RERA) of Karnataka or Andhra
                      Pradesh. RERA registration numbers and sanction details are
                      provided on respective project detail pages.
                    </span>
                  </div>
                </div>
              </div>

              {/* Section 4 */}
              <div id="calculators" className="space-y-3 border-t border-slate-100 pt-8">
                <div className="flex items-center gap-2 text-[#0b4eb7]">
                  <Calculator className="h-5 w-5" />
                  <h2 className="text-xl font-serif font-extrabold text-slate-900">
                    4. Calculators &amp; Projections Disclaimer
                  </h2>
                </div>
                <div className="bg-amber-50 border border-amber-200/80 rounded-xl p-4 text-xs text-amber-950 space-y-2">
                  <p className="font-bold flex items-center gap-1.5 text-amber-900">
                    <AlertTriangle className="h-4 w-4 text-amber-600" />
                    Illustrative &amp; Educational Purpose Only
                  </p>
                  <p>
                    All mathematical models, compound investment calculators, acquisition
                    cost estimators, and historical price appreciation metrics provided
                    on 1Aset.com are strictly illustrative and based on user-defined
                    inputs and past regional trends.
                  </p>
                  <p>
                    They do not constitute a guarantee of future appreciation, rental
                    yields, or capital safety. Real estate returns are subject to market
                    dynamics, regional infrastructure completion timelines, and macro-economic
                    conditions. 1ASET does not operate collective investment schemes (CIS).
                  </p>
                </div>
              </div>

              {/* Section 5 */}
              <div id="user-conduct" className="space-y-3 border-t border-slate-100 pt-8">
                <div className="flex items-center gap-2 text-[#0b4eb7]">
                  <Phone className="h-5 w-5" />
                  <h2 className="text-xl font-serif font-extrabold text-slate-900">
                    5. User Conduct &amp; OTP Verification
                  </h2>
                </div>
                <p>When using 1ASET, you agree to:</p>
                <ul className="list-disc pl-5 space-y-1.5 text-xs text-slate-600">
                  <li>Provide accurate, genuine, and current contact details (name, valid mobile phone number, email address).</li>
                  <li>Complete mobile phone verification through the WhatsApp / SMS One-Time Password (OTP) process before submitting formal inquiries.</li>
                  <li>Refrain from attempting automated scraping, reverse engineering, DDoS attacks, or unauthorized indexing of our project catalog or backend APIs.</li>
                  <li>Refrain from impersonating any person or misrepresenting your financial or investment authority.</li>
                </ul>
              </div>

              {/* Section 6 */}
              <div id="site-visits" className="space-y-3 border-t border-slate-100 pt-8">
                <div className="flex items-center gap-2 text-[#0b4eb7]">
                  <CheckCircle2 className="h-5 w-5" />
                  <h2 className="text-xl font-serif font-extrabold text-slate-900">
                    6. Site Visits &amp; Plot Reservations
                  </h2>
                </div>
                <p>
                  Site visits scheduled via the Platform are facilitated as complimentary
                  guided tours with dedicated advisory personnel.
                </p>
                <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-4 text-xs text-slate-600 space-y-1.5">
                  <p>
                    <strong>Booking &amp; Advances:</strong> Plot allotments and
                    reservations are confirmed only upon formal execution of booking
                    forms and verifiable banking transaction receipts issued directly
                    by the designated development company or landowner account.
                  </p>
                  <p>
                    1ASET personnel will never solicit cash deposits or payments into
                    unverified individual personal accounts.
                  </p>
                </div>
              </div>

              {/* Section 7 */}
              <div id="intellectual-property" className="space-y-3 border-t border-slate-100 pt-8">
                <div className="flex items-center gap-2 text-[#0b4eb7]">
                  <Lock className="h-5 w-5" />
                  <h2 className="text-xl font-serif font-extrabold text-slate-900">
                    7. Intellectual Property Rights
                  </h2>
                </div>
                <p>
                  All content published on 1Aset.com—including brand trademarks
                  (&ldquo;1ASET&rdquo;, &ldquo;Vedha Bhoomi&rdquo;), logos, website code,
                  editorial articles, drone aerial footage, 3D architectural masterplans,
                  and agricultural layout schemas—is the proprietary property of{" "}
                  <strong>Paanya Empire Private Limited</strong> or licensed third parties.
                </p>
                <p className="text-xs text-slate-600">
                  No portion of this material may be copied, reproduced, republished,
                  or distributed for commercial brokerage without express written consent.
                </p>
              </div>

              {/* Section 8 */}
              <div id="liability" className="space-y-3 border-t border-slate-100 pt-8">
                <div className="flex items-center gap-2 text-[#0b4eb7]">
                  <AlertTriangle className="h-5 w-5" />
                  <h2 className="text-xl font-serif font-extrabold text-slate-900">
                    8. Limitation of Liability
                  </h2>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  To the fullest extent permissible under Indian law, Paanya Empire
                  Private Limited, its directors, officers, employees, and affiliates
                  shall not be liable for any direct, indirect, incidental, special,
                  or consequential damages arising out of:
                </p>
                <ul className="list-disc pl-5 space-y-1.5 text-xs text-slate-600">
                  <li>Fluctuations in real estate land valuations or rental yields over time.</li>
                  <li>Delays or changes in municipal infrastructure projects (roads, highways, metro links, airport expansions).</li>
                  <li>Unforeseen force majeure events, natural disasters, or statutory zoning revisions.</li>
                  <li>Temporary platform downtime or transmission interruptions beyond our reasonable control.</li>
                </ul>
              </div>

              {/* Section 9 */}
              <div id="governing-law" className="space-y-3 border-t border-slate-100 pt-8">
                <div className="flex items-center gap-2 text-[#0b4eb7]">
                  <Scale className="h-5 w-5" />
                  <h2 className="text-xl font-serif font-extrabold text-slate-900">
                    9. Governing Law &amp; Dispute Resolution
                  </h2>
                </div>
                <p>
                  These Terms shall be interpreted and governed in accordance with
                  the laws of the Republic of India.
                </p>
                <p className="text-xs text-slate-600">
                  Any dispute, controversy, or claim arising out of or relating to
                  these Terms or the Platform shall be subject to the exclusive
                  jurisdiction of the competent courts situated in{" "}
                  <strong>Bengaluru, Karnataka, India</strong>.
                </p>
              </div>

              {/* Section 10 */}
              <div id="contact" className="space-y-4 border-t border-slate-100 pt-8">
                <div className="flex items-center gap-2 text-[#0b4eb7]">
                  <Mail className="h-5 w-5" />
                  <h2 className="text-xl font-serif font-extrabold text-slate-900">
                    10. Operating Desk &amp; Contact Details
                  </h2>
                </div>
                <p>
                  For legal inquiries, terms clarification, or formal corporate notices,
                  please contact our compliance office:
                </p>

                <div className="bg-slate-900 text-white p-6 rounded-2xl space-y-3 text-xs">
                  <div className="space-y-1">
                    <p className="font-extrabold text-sm text-emerald-400">
                      Corporate Legal &amp; Compliance Office
                    </p>
                    <p className="font-semibold text-white">
                      Paanya Empire Private Limited (1ASET)
                    </p>
                  </div>
                  <div className="space-y-1.5 text-slate-300">
                    <p className="flex items-center gap-2">
                      <Mail className="h-3.5 w-3.5 text-blue-400" />
                      <span>
                        Corporate Inquiries:{" "}
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
                      <span>Operational Headquarters: Bengaluru, Karnataka, India</span>
                    </p>
                  </div>
                </div>

                <div className="pt-2 text-center sm:text-left flex items-center gap-4 text-xs">
                  <Link
                    href="/"
                    className="font-bold text-[#0b4eb7] hover:underline"
                  >
                    &larr; Return to 1ASET Home
                  </Link>
                  <span>•</span>
                  <Link
                    href="/privacy"
                    className="font-bold text-[#0b4eb7] hover:underline"
                  >
                    Read Privacy Policy &rarr;
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
