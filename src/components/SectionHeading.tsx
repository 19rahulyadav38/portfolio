export function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: React.ReactNode;
  description?: string;
}) {
  return (
    <div className="mb-12 max-w-2xl">
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-brand-light mb-3">{eyebrow}</p>
      <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">{title}</h2>
      {description && <p className="text-brand-muted text-lg leading-relaxed">{description}</p>}
    </div>
  );
}
