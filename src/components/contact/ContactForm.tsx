"use client";

import { useState } from "react";
import { services } from "@/content/services";
import { site } from "@/content/site";
import styles from "./ContactForm.module.css";

/**
 * Enquiry form, delivered by FormSubmit (https://formsubmit.co). It needs no account
 * or API key and works from a static export. The first submission sends a one-time
 * activation email to the inbox. Once activated, FormSubmit offers a random alias,
 * which you can put in `ENDPOINT` to hide the address from scrapers.
 * If the request fails, the visitor is offered a pre-filled mailto: link instead.
 */
const ENDPOINT = `https://formsubmit.co/ajax/${site.emails.primary}`;

type Status = "idle" | "sending" | "sent" | "error";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [fallback, setFallback] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    if (data.get("_honey")) return; // bot filled the hidden field

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
      const res = await fetch(ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          name: get("name"),
          organisation: get("organisation"),
          email: get("email"),
          service: get("service"),
          message: get("details"),
          _subject: subject,
          _replyto: get("email"),
          _template: "table",
          _captcha: "false",
        }),
      });
      const json = (await res.json().catch(() => ({}))) as { success?: string | boolean };
      if (!res.ok || String(json.success) === "false") throw new Error("send failed");
      form.reset();
      setStatus("sent");
    } catch {
      setStatus("error");
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
          <button type="button" className="link-arrow" style={{ background: "none", border: 0, padding: 0, cursor: "pointer", alignSelf: "flex-start" }} onClick={() => setStatus("idle")}>
            ← Send another enquiry
          </button>
        </div>
      </div>
    );
  }

  return (
    <form className={styles.card} onSubmit={onSubmit}>
      <div className={styles.pair}>
        <label className={styles.field}>Name<input name="name" required autoComplete="name" /></label>
        <label className={styles.field}>Organisation<input name="organisation" autoComplete="organization" /></label>
      </div>
      <label className={styles.field}>Email<input name="email" type="email" required autoComplete="email" /></label>
      <label className={styles.field}>
        Service of interest
        <select name="service" defaultValue={services[0].title}>
          {services.map((s) => <option key={s.num}>{s.title}</option>)}
          <option>Other</option>
        </select>
      </label>
      <label className={styles.field}>Project details<textarea name="details" rows={5} required /></label>
      <input type="text" name="_honey" tabIndex={-1} autoComplete="off" aria-hidden="true" className="visually-hidden" />
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
