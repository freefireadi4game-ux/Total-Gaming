interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  description?: string;
}

export default function SectionHeading({
  eyebrow,
  title,
  description,
}: SectionHeadingProps) {
  return (
    <div className="section-heading">
      <p>{eyebrow}</p>

      <h3>{title}</h3>

      {description && (
        <div className="section-description">
          {description}
        </div>
      )}
    </div>
  );
}
