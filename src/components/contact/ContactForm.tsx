"use client";

import HCaptcha from "@hcaptcha/react-hcaptcha";
import { useEffect, useRef, useState } from "react";
import { services } from "@/content/services";
import { site } from "@/content/site";
import styles from "./ContactForm.module.css";

/**
 * Enquiry form, delivered by Web3Forms (https://web3forms.com). It works from a static export;
 * the access key in `site.forms.web3formsKey` is public by design (it can only send to the inbox
 * it was created for). If the key is missing or the request fails, the visitor is offered a
 * pre-filled mailto: link instead.
 *
 * hCaptcha is required: the Web3Forms dashboard enforces it (plus its Strict spam filter), so a POST
 * without a valid `h-captcha-response` token is rejected server-side.
 *
 * Extra spam defences, all silent: a bot that trips one gets a fake "sent" screen and nothing is delivered.
 *  - honeypot `botcheck` (also forwarded, so Web3Forms rejects direct POSTs that fill it);
 *  - minimum fill time (humans take more than a few seconds);
 *  - link limit and length caps on the message;
 *  - common spam phrases in the message.
 */
const ENDPOINT = "https://api.web3forms.com/submit";

const MIN_FILL_MS = 4000;
const MAX_LINKS = 2;
const SPAM_PHRASES = /\b(seo|backlinks?|crypto|bitcoin|casino|viagra|cialis|loan offer|guest post|web traffic|rank your website|porn)\b/i;

/** Returns true when the submission looks automated. */
function looksLikeSpam(data: FormData, startedAt: number): boolean {
  if (String(data.get("botcheck") ?? "").trim()) return true;
  if (Date.now() - startedAt < MIN_FILL_MS) return true;
  const details = String(data.get("details") ?? "");
  if ((details.match(/https?:\/\/|www\./gi) ?? []).length > MAX_LINKS) return true;
  if (SPAM_PHRASES.test(details)) return true;
  return false;
}

type Status = "idle" | "sending" | "sent" | "error" | "captcha";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [fallback, setFallback] = useState("");
  const startedAt = useRef(0);
  const captcha = useRef<HCaptcha>(null);
  const [token, setToken] = useState("");
  useEffect(() => {
    startedAt.current = Date.now();
  }, []);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    if (looksLikeSpam(data, startedAt.current)) {
      form.reset();
      setStatus("sent"); // pretend success so bots don't retry
      return;
    }

    if (!token) {
      setStatus("captcha");
      return;
    }

    const get = (k: string) => String(data.get(k) ?? "").trim();
    const subject = `Project enquiry: ${get("service")}${get("organisation") ? ` (${get("organisation")})` : ""}`;
    const body = [
      `Name: ${get("name")}`,
      `Organisation: ${get("organisation")}`,
      `Email: ${get("email")}`,
      `Service of interest: ${get("service")}`,
      "",
      get("details"),
    ].join("\n");
    setFallback(`mailto:${site.emails.primary}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`);

    setStatus("sending");
    try {
      if (!site.forms.web3formsKey) throw new Error("no form key");
      const res = await fetch(ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: site.forms.web3formsKey,
          subject,
          from_name: `${site.name} website`,
          name: get("name"),
          organisation: get("organisation"),
          email: get("email"), // Web3Forms sets this as the reply-to address
          service: get("service"),
          message: get("details"),
          botcheck: get("botcheck"),
          "h-captcha-response": token,
        }),
      });
      const json = (await res.json().catch(() => ({}))) as { success?: boolean };
      if (!res.ok || json.success !== true) throw new Error("send failed");
      form.reset();
      setStatus("sent");
    } catch {
      setStatus("error");
    } finally {
      // Tokens are single-use: always start the next attempt with a fresh challenge.
      captcha.current?.resetCaptcha();
      setToken("");
    }
  }

  if (status === "sent") {
    return (
      <div className={styles.card}>
        <div className={styles.thanks} role="status">
          <span className={styles.thanksDot} />
          <h2 className="display" style={{ fontSize: 34 }}>Thank you. We’ll be in touch.</h2>
          <p className="body" style={{ fontSize: 15 }}>
            Your enquiry has been sent to our team. We usually reply within two working days. For anything urgent, write to{" "}
            <a href={`mailto:${site.emails.primary}`}>{site.emails.primary}</a>.
          </p>
          <button type="button" className="link-arrow" style={{ background: "none", border: 0, padding: 0, cursor: "pointer", alignSelf: "flex-start" }} onClick={() => { startedAt.current = Date.now(); setStatus("idle"); }}>
            ← Send another enquiry
          </button>
        </div>
      </div>
    );
  }

  return (
    <form className={styles.card} onSubmit={onSubmit}>
      <div className={styles.pair}>
        <label className={styles.field}>Name<input name="name" required maxLength={120} autoComplete="name" /></label>
        <label className={styles.field}>Organisation<input name="organisation" maxLength={160} autoComplete="organization" /></label>
      </div>
      <label className={styles.field}>Email<input name="email" type="email" required maxLength={200} autoComplete="email" /></label>
      <label className={styles.field}>
        Service of interest
        <select name="service" defaultValue={services[0].title}>
          {services.map((s) => <option key={s.num}>{s.title}</option>)}
          <option>Other</option>
        </select>
      </label>
      <label className={styles.field}>Project details<textarea name="details" rows={5} required minLength={20} maxLength={5000} /></label>
      <input type="text" name="botcheck" tabIndex={-1} autoComplete="off" aria-hidden="true" className="visually-hidden" />
      <div className={styles.captcha}>
        <HCaptcha
          ref={captcha}
          sitekey={site.forms.hcaptchaSiteKey}
          reCaptchaCompat={false}
          onVerify={(t) => {
            setToken(t);
            if (status === "captcha") setStatus("idle");
          }}
          onExpire={() => setToken("")}
        />
      </div>
      {status === "captcha" && (
        <p role="alert" className={styles.error}>Please tick the “I am human” check above, then send again.</p>
      )}
      {status === "error" && (
        <p role="alert" className={styles.error}>
          The enquiry couldn’t be sent. Please <a href={fallback}>email it to us instead</a>. It opens already filled in.
        </p>
      )}
      <button type="submit" className="btn btn--dark" style={{ padding: 16 }} disabled={status === "sending"}>
        {status === "sending" ? "Sending…" : "Send enquiry"}
      </button>
    </form>
  );
}
