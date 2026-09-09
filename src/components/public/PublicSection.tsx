type PublicSectionProps = {
  eyebrow: string;
  title: string;
  children: React.ReactNode;
  action?: React.ReactNode;
};

export default function PublicSection({
  eyebrow,
  title,
  children,
  action,
}: PublicSectionProps) {
  return (
    <section className="public-section">
      <div className="public-section-heading">
        <div>
          <span>{eyebrow}</span>
          <h2>{title}</h2>
        </div>

        {action && (
          <div className="public-section-action">
            {action}
          </div>
        )}
      </div>

      {children}
    </section>
  );
}
