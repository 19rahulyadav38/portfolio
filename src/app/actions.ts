"use server";

export async function submitContactForm(formData: FormData) {
  // Convert the Next.js FormData into a standard Javascript Object
  const data = Object.fromEntries(formData.entries());
  
  // Inject the access key strictly on the server side
  data.access_key = process.env.WEB3FORMS_ACCESS_KEY || "fb5bb1ed-98e6-4ae2-8ed8-87662f427d9b";

  try {
    console.log("Submitting to Web3Forms with data:", { ...data, access_key: "HIDDEN" });
    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        "Origin": "https://rahulyadav.dev",
      },
      body: JSON.stringify(data),
      cache: "no-store", // Crucial for Next.js to not cache external API calls
    });
    
    // Read raw text first instead of directly relying on json()
    const text = await response.text();
    
    // If Web3Forms returns an HTML error (e.g. 500 or bot block), it will be caught here safely
    try {
      const result = JSON.parse(text);
      return result;
    } catch (parseError) {
      console.error("Web3Forms returned non-JSON response:", text.substring(0, 500));
      return { success: false, message: "Server returned invalid response" };
    }
  } catch (error) {
    console.error("Server action failed to send email:", error);
    return { success: false, message: "Network error occurred" };
  }
}
