import { useEffect, useRef } from "react";

type RecaptchaApi = {
  render: (
    container: HTMLElement,
    options: {
      sitekey: string;
      callback: (token: string) => void;
      "expired-callback": () => void;
      "error-callback": () => void;
    },
  ) => number;
};

declare global {
  interface Window {
    grecaptcha?: RecaptchaApi;
    __innovAgentsRecaptchaReady?: () => void;
  }
}

const SCRIPT_ID = "google-recaptcha-v2";
const READY_CALLBACK = "__innovAgentsRecaptchaReady";
let recaptchaLoader: Promise<RecaptchaApi> | null = null;

function loadRecaptcha(): Promise<RecaptchaApi> {
  if (window.grecaptcha) return Promise.resolve(window.grecaptcha);
  if (recaptchaLoader) return recaptchaLoader;

  recaptchaLoader = new Promise<RecaptchaApi>((resolve, reject) => {
    window.__innovAgentsRecaptchaReady = () => {
      const api = window.grecaptcha;
      delete window.__innovAgentsRecaptchaReady;
      if (api) resolve(api);
      else reject(new Error("Google reCAPTCHA loaded without its client API."));
    };

    const existing = document.getElementById(
      SCRIPT_ID,
    ) as HTMLScriptElement | null;
    if (existing) {
      existing.addEventListener(
        "error",
        () => reject(new Error("Google reCAPTCHA could not be loaded.")),
        { once: true },
      );
      return;
    }

    const script = document.createElement("script");
    script.id = SCRIPT_ID;
    script.src = `https://www.google.com/recaptcha/api.js?onload=${READY_CALLBACK}&render=explicit`;
    script.async = true;
    script.defer = true;
    script.addEventListener(
      "error",
      () => reject(new Error("Google reCAPTCHA could not be loaded.")),
      { once: true },
    );
    document.head.appendChild(script);
  }).catch((error) => {
    recaptchaLoader = null;
    throw error;
  });

  return recaptchaLoader;
}

export function SalesforceRecaptcha({
  siteKey,
  onChange,
  onError,
}: {
  siteKey: string;
  onChange: (token: string) => void;
  onError: () => void;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const callbacksRef = useRef({ onChange, onError });

  useEffect(() => {
    callbacksRef.current = { onChange, onError };
  }, [onChange, onError]);

  useEffect(() => {
    let cancelled = false;

    loadRecaptcha()
      .then((grecaptcha) => {
        if (
          cancelled ||
          !containerRef.current ||
          containerRef.current.childNodes.length
        )
          return;
        grecaptcha.render(containerRef.current, {
          sitekey: siteKey,
          callback: (token) => callbacksRef.current.onChange(token),
          "expired-callback": () => callbacksRef.current.onChange(""),
          "error-callback": () => callbacksRef.current.onError(),
        });
      })
      .catch(() => {
        if (!cancelled) callbacksRef.current.onError();
      });

    return () => {
      cancelled = true;
    };
  }, [siteKey]);

  return <div ref={containerRef} className="min-h-[78px]" />;
}
