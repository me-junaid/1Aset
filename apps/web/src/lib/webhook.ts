export const WEBHOOK_URL =
  process.env.NEXT_PUBLIC_LEAD_WEBHOOK_URL ||
  "https://script.google.com/macros/s/AKfycbxQE9r-WvXSAgM880cXYy2klnYymDC-ELZoJj7D6aUvVGZ_hyxTGCBH1nFMOeDJ1x0f/exec";

export interface LeadFormData {
  fullName: string;
  phoneNumber: string;
  language?: string;
  budget?: string;
  siteVisit?: string;
  emailAddress?: string;
  interestedIn?: string;
  preferredLocation?: string;
  message?: string;
  source?: string;
}

export async function submitLeadToWebhook(data: LeadFormData): Promise<boolean> {
  try {
    const params = new URLSearchParams();

    // Exact Google Sheet headers matching Row 1
    params.append("gid", "0");
    params.append("Full Name", data.fullName || "");
    params.append("Phone Number", data.phoneNumber || "");
    params.append("Language", data.language || "English");
    params.append("Budget", data.budget || "25L");
    params.append("Site Visit", data.siteVisit || "Not decided");
    params.append("Email Address", data.emailAddress || "");
    params.append("Interested In", data.interestedIn || "");
    params.append("Preferred Location", data.preferredLocation || "");
    params.append("Message", data.message || "");
    params.append("Source", data.source || "1ASET Contact Form");
    params.append("Timestamp", new Date().toISOString());

    const getUrl = `${WEBHOOK_URL}?${params.toString()}`;

    // Perform a single GET request
    await fetch(getUrl, {
      method: "GET",
      mode: "no-cors",
    });

    return true;
  } catch (error) {
    console.error("Error submitting lead to webhook:", error);
    return false;
  }
}

export const NEODOVE_CRM_URL =
  process.env.NEXT_PUBLIC_NEODOVE_CRM_URL ||
  "https://2dfb0b37-c8db-4877-919d-68f029567963.neodove.com/integration/custom/8770b6d6-35ec-4634-808f-a2462b2b4ab3/leads";

export async function submitLeadToNeoDove(data: LeadFormData): Promise<boolean> {
  try {
    const cleanDigits = (data.phoneNumber || "").replace(/\D/g, "");
    const mobile =
      cleanDigits.length >= 10
        ? Number(cleanDigits.slice(-10))
        : Number(cleanDigits) || 0;

    const payload = {
      name: data.fullName || "",
      mobile,
      email: data.emailAddress || "",
      detail1: data.interestedIn || "Vedha Bhoomi",
      detail2: `Budget: ${data.budget || "25L"} | Visit: ${data.siteVisit || "Not decided"}`,
      detail3: data.preferredLocation || "North Bengaluru",
      detail4: `Source: ${data.source || "Website Form"}`,
    };

    const res = await fetch(NEODOVE_CRM_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    return res.ok;
  } catch (error) {
    console.error("Error submitting lead to NeoDove CRM:", error);
    return false;
  }
}
