/**
 * Newsletter sign-up via Mailchimp embedded form (JSONP — no backend/API key).
 * Override with VITE_MAILCHIMP_URL in `.env` if the list URL ever changes.
 */
const DEFAULT_MAILCHIMP_URL =
  "https://innovagentsai.us7.list-manage.com/subscribe/post?u=edbbbe38d3591cf941b919939&id=18c0b2f6c4&f_id=001dfbe0f0";

const MAILCHIMP_URL: string =
  ((import.meta.env.VITE_MAILCHIMP_URL as string | undefined) ?? DEFAULT_MAILCHIMP_URL).trim();

export type SubscribeResult = {
  ok: boolean;
  message: string;
};

const SUCCESS_MESSAGE = "Thanks for subscribing! We'll be in touch.";

export async function subscribeToNewsletter(
  email: string,
  firstName: string,
): Promise<SubscribeResult> {
  const endpoint = MAILCHIMP_URL.replace("/post?", "/post-json?");
  const params = new URLSearchParams({ EMAIL: email, FNAME: firstName });

  // Mailchimp honeypot — must stay empty (matches the embedded form)
  const listUrl = new URL(MAILCHIMP_URL);
  const u = listUrl.searchParams.get("u");
  const id = listUrl.searchParams.get("id");
  if (u && id) params.set(`b_${u}_${id}`, "");

  try {
    const data = await jsonp(`${endpoint}&${params.toString()}`);
    if (data.result === "success") {
      return { ok: true, message: SUCCESS_MESSAGE };
    }
    const msg = cleanMailchimpMessage(data.msg);
    if (/already subscribed/i.test(msg)) {
      return { ok: true, message: "You're already on the list — thanks!" };
    }
    return { ok: false, message: msg || "Something went wrong. Please try again." };
  } catch {
    return { ok: false, message: "Network error — please try again in a moment." };
  }
}

type MailchimpResponse = { result: string; msg?: string };

function jsonp(url: string): Promise<MailchimpResponse> {
  return new Promise((resolve, reject) => {
    const callbackName = `mc_cb_${Date.now()}_${Math.floor(Math.random() * 1e6)}`;
    const script = document.createElement("script");
    let timer = 0;

    const cleanup = () => {
      delete (window as unknown as Record<string, unknown>)[callbackName];
      script.remove();
      window.clearTimeout(timer);
    };

    (window as unknown as Record<string, unknown>)[callbackName] = (
      data: MailchimpResponse,
    ) => {
      cleanup();
      resolve(data);
    };

    script.onerror = () => {
      cleanup();
      reject(new Error("network"));
    };

    timer = window.setTimeout(() => {
      cleanup();
      reject(new Error("timeout"));
    }, 10000);

    script.src = `${url}&c=${callbackName}`;
    document.body.appendChild(script);
  });
}

function cleanMailchimpMessage(msg?: string): string {
  if (!msg) return "";
  return msg
    .replace(/^\d+\s*-\s*/, "")
    .replace(/<[^>]*>/g, "")
    .trim();
}
