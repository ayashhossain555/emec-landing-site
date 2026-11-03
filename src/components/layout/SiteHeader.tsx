"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { nav, site } from "@/content/site";
import styles from "./SiteHeader.module.css";

/** Case-study routes highlight their parent section in the nav. */
function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function SiteHeader() {
  const pathname = usePathname();
  const [openFor, setOpenFor] = useState<string | null>(null);
  // Menu closes automatically on navigation because it's keyed to the path it was opened on.
  const menuOpen = openFor === pathname;

  return (
    <header className={styles.header}>
      <div className={`container ${styles.bar}`}>
        <Link href="/" className={styles.brand} aria-label={`${site.name} home`}>
          <Image src="/brand/emec-mark.png" alt="" width={40} height={40} priority />
          <span className={styles.wordmark}>
            <span className={styles.name}>{site.name}</span>
            <span className={styles.tagline}>{site.fullName}</span>
          </span>
        </Link>

        <nav className={styles.desktopNav} aria-label="Main">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={styles.navLink}
              aria-current={isActive(pathname, item.href) ? "page" : undefined}
            >
              {item.label}
            </Link>
          ))}
          <Link href="/contact" className={`btn btn--dark ${styles.cta}`}>Request a proposal</Link>
        </nav>

        <button
          type="button"
          className={styles.menuButton}
          aria-label="Menu"
          aria-expanded={menuOpen}
          aria-controls="mobile-nav"
          onClick={() => setOpenFor(menuOpen ? null : pathname)}
        >
          <span /><span /><span />
        </button>
      </div>

      {menuOpen && (
        <nav id="mobile-nav" className={styles.mobileNav} aria-label="Main">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={styles.mobileLink}
              aria-current={isActive(pathname, item.href) ? "page" : undefined}
            >
              {item.label}
            </Link>
          ))}
          <Link href="/contact" className={`btn btn--dark ${styles.mobileCta}`}>Request a proposal</Link>
        </nav>
      )}
    </header>
  );
}
