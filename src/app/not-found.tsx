import Link from "next/link";

export default function NotFound() {
  return (
    <section className="container stack" style={{ paddingBlock: "var(--section-y)", gap: 20 }}>
      <span className="eyebrow">404</span>
      <h1 className="display h-page">This page has moved downstream.</h1>
      <p className="lead">The page you were looking for doesn&apos;t exist.</p>
      <Link href="/" className="btn btn--dark" style={{ alignSelf: "flex-start" }}>Back to home</Link>
    </section>
  );
}
