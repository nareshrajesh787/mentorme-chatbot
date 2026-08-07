import Image from "next/image";

interface BrandLogoProps {
  className?: string;
  decorative?: boolean;
  priority?: boolean;
}

export function MentorMeLogo({
  className,
  decorative = false,
  priority = false,
}: BrandLogoProps) {
  return (
    <Image
      src="/branding/mentorme-logo.png"
      alt={decorative ? "" : "MentorMe North Georgia"}
      width={394}
      height={127}
      className={className}
      priority={priority}
    />
  );
}

export function LearnAILogo({
  className,
  decorative = false,
}: Omit<BrandLogoProps, "priority">) {
  return (
    <Image
      src="/branding/learnai-logo.png"
      alt={decorative ? "" : "LearnAI"}
      width={1254}
      height={1254}
      className={className}
    />
  );
}
