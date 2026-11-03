"use client";

import { useState } from "react";
import { services } from "@/content/services";
import { site } from "@/content/site";
import styles from "./ContactForm.module.css";

/**
 * Enquiry form. The site is a static export with no backend, so submitting
 * opens the visitor's mail client with a pre-filled message to EMEC.
 * To accept submissions server-side, swap `onSubmit` for a POST to a form
 * service (Formspree, Web3Forms, a serverless function, …).
 */
export function ContactForm() {
  const [sent, setSent] = useState(false);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const get = (k: string) => String(data.get(k) ?? "").trim();
    const subject = `Project enquiry — ${get("service")}${get("organisation") ? ` (${get("organisation")})` : ""}`;
    const body = [
      `Name: ${get("name")}`,
      `Organisation: ${get("organisation")}`,
      `Email: ${get("email")}`,
      `Service of interest: ${get("service")}`,
      "",
      get("details"),
    ].join("\n");
    window.location.href = `mailto:${site.emails.primary}?cc=${site.emails.secondary}&subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSent(true);
  }

  if (sent) {
    return (
      <div className={styles.card}>
        <div className={styles.thanks} role="status">
          <span className={styles.thanksDot} />
          <h2 className="display" style={{ fontSize: 34 }}>Thank you — we’ll be in touch.</h2>
          <p className="body" style={{ fontSize: 15 }}>
            Your email app should have opened with your enquiry ready to send. If it didn’t, write to{" "}
            <a href={`mailto:${site.emails.primary}`}>{site.emails.primary}</a>. Our team usually replies within two
            working days.
          </p>
          <button type="button" className="link-arrow" style={{ background: "none", border: 0, padding: 0, cursor: "pointer", alignSelf: "flex-start" }} onClick={() => setSent(false)}>
            ← Back to the form
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
      <button type="submit" className="btn btn--dark" style={{ padding: 16 }}>Send enquiry</button>
    </form>
  );
}
