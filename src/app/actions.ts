"use server";

const LIMITS = { name: 100, email: 200, message: 5000 } as const;

export async function submitContactForm(formData: FormData) {
  // Bots fill the hidden honeypot field; pretend success so they don't retry
  if (formData.get("botcheck")) {
    return { success: true };
  }

  const accessKey = process.env.WEB3FORMS_ACCESS_KEY;
  if (!accessKey) {
    console.error("WEB3FORMS_ACCESS_KEY is not set");
    return { success: false, message: "Contact form is not configured" };
  }

  // Only forward the fields we expect, trimmed and length-checked
  const data: Record<string, string> = {};
  for (const [field, max] of Object.entries(LIMITS)) {
    const value = String(formData.get(field) ?? "").trim();
    if (!value || value.length > max) {
      return { success: false, message: `Invalid ${field}` };
    }
    data[field] = value;
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    return { success: false, message: "Invalid email" };
  }

  try {
    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        "Origin": "https://rahulyadav.dev",
      },
      body: JSON.stringify({ ...data, access_key: accessKey, subject: `Portfolio message from ${data.name}` }),
      cache: "no-store", // Crucial for Next.js to not cache external API calls
    });

    // Read raw text first instead of directly relying on json()
    const text = await response.text();

    // If Web3Forms returns an HTML error (e.g. 500 or bot block), it will be caught here safely
    try {
      return JSON.parse(text);
    } catch {
      console.error("Web3Forms returned non-JSON response:", text.substring(0, 500));
      return { success: false, message: "Server returned invalid response" };
    }
  } catch (error) {
    console.error("Server action failed to send email:", error);
    return { success: false, message: "Network error occurred" };
  }
}
