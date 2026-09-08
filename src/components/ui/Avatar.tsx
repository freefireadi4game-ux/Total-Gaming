interface AvatarProps {
  name: string;
  imageUrl?: string;
  size?: "small" | "medium" | "large";
}

function getInitials(name: string) {
  const words = name.trim().split(/\s+/);

  if (words.length === 1) {
    return words[0].slice(0, 2).toUpperCase();
  }

  return (
    words[0][0] + words[words.length - 1][0]
  ).toUpperCase();
}

export default function Avatar({
  name,
  imageUrl,
  size = "medium",
}: AvatarProps) {
  return (
    <div className={`avatar avatar-${size}`}>
      {imageUrl ? (
        <img
          src={imageUrl}
          alt={name}
          loading="lazy"
        />
      ) : (
        getInitials(name)
      )}
    </div>
  );
}
