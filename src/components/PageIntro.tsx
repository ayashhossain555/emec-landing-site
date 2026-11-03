/** Standard inner-page opener: eyebrow label + large display heading. */
export function PageIntro({ eyebrow, title, maxWidth = 1000 }: { eyebrow: string; title: string; maxWidth?: number }) {
  return (
    <section
      className="container stack"
      style={{ paddingBlock: "clamp(56px,8vw,80px) 48px", gap: 20 }}
    >
      <span className="eyebrow">{eyebrow}</span>
      <h1 className="display h-page" style={{ maxWidth }}>{title}</h1>
    </section>
  );
}
