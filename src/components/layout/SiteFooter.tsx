import Image from "next/image";
import Link from "next/link";
import { footerExpertise, nav, site } from "@/content/site";
import styles from "./SiteFooter.module.css";

export function SiteFooter() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        <div className={styles.columns}>
          <div className={styles.about}>
            <div className={styles.brand}>
              <span className={styles.logoTile}>
                <Image src="/brand/emec-mark.png" alt="" width={36} height={36} />
              </span>
              <span className={styles.name}>{site.name}</span>
            </div>
            <p>
              Environmental Management and Engineering Consultant. Fluvial geomorphology, hydraulic modeling, water
              resources and municipal infrastructure design.
            </p>
          </div>

          <FooterColumn title="Site">
            {nav.map((item) => <Link key={item.href} href={item.href}>{item.label}</Link>)}
          </FooterColumn>

          <FooterColumn title="Expertise">
            {footerExpertise.map((item) => <Link key={item.label} href={item.href}>{item.label}</Link>)}
          </FooterColumn>

          <FooterColumn title="Where we work">
            {site.countries.map((c) => <span key={c}>{c}</span>)}
          </FooterColumn>

          <FooterColumn title="Contact">
            <span>{site.addressShort}</span>
            <a href={site.phone.href}>{site.phone.display}</a>
            <a href={`mailto:${site.emails.primary}`} className={styles.strong}>{site.emails.primary}</a>
          </FooterColumn>
        </div>

        <div className={styles.legal}>
          <span>© {new Date().getFullYear()} {site.name}. All rights reserved.</span>
          <span className="mono">emecbd.com</span>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className={styles.column}>
      <span className={styles.heading}>{title}</span>
      {children}
    </div>
  );
}
