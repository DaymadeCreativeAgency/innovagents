/**
 * Contact form via Formspree (JSON/AJAX — matches Formspree's JS guide).
 * Override with VITE_FORMSPREE_URL or VITE_FORMSPREE_FORM_ID in `.env` if needed.
 */
const DEFAULT_FORMSPREE_URL = "https://formspree.io/f/mlgkvaoa";

const FORMSPREE_URL: string = (() => {
  const url = (import.meta.env.VITE_FORMSPREE_URL as string | undefined)?.trim();
  if (url) return url;
  const id = (import.meta.env.VITE_FORMSPREE_FORM_ID as string | undefined)?.trim();
  if (id) return `https://formspree.io/f/${id}`;
  return DEFAULT_FORMSPREE_URL;
})();

export type ContactPayload = {
  name: string;
  email: string;
  company: string;
  productInterest: string;
  subject: string;
  message: string;
};

export type ContactResult = {
  ok: boolean;
  message: string;
};

export async function submitContactForm(payload: ContactPayload): Promise<ContactResult> {
  if (!FORMSPREE_URL) {
    return {
      ok: false,
      message: "Contact form is not configured yet. Email us at support@innovagentsai.com.",
    };
  }

  try {
    const res = await fetch(FORMSPREE_URL, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: payload.name,
        email: payload.email,
        _replyto: payload.email,
        company: payload.company,
        productInterest: payload.productInterest,
        subject: payload.subject,
        message: payload.message,
      }),
    });

    const data = (await res.json()) as { ok?: boolean; error?: string };

    if (res.ok) {
      return { ok: true, message: "Thanks for reaching out. We'll get back to you shortly." };
    }

    return {
      ok: false,
      message: data.error || "Something went wrong. Please try again or email support@innovagentsai.com.",
    };
  } catch {
    return {
      ok: false,
      message: "Network error — please try again or email support@innovagentsai.com.",
    };
  }
}
