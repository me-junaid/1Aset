export const WEBHOOK_URL =
  process.env.NEXT_PUBLIC_LEAD_WEBHOOK_URL ||
  "https://script.google.com/macros/s/AKfycbxQE9r-WvXSAgM880cXYy2klnYymDC-ELZoJj7D6aUvVGZ_hyxTGCBH1nFMOeDJ1x0f/exec";

export interface LeadFormData {
  fullName: string;
  phoneNumber: string;
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
