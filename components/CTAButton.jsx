import Link from "next/link";
import { MessageCircle, Phone, ArrowRight } from "lucide-react";

const icons = { whatsapp: MessageCircle, phone: Phone, arrow: ArrowRight };

export default function CTAButton({
  href,
  children,
  variant = "primary",
  icon,
  external = false,
}) {
  const Icon = icon ? icons[icon] : null;

  const styles = {
    primary:
      "bg-clay text-offwhite hover:bg-laterite shadow-md hover:shadow-lg",
    whatsapp:
      "bg-[#1F8A5B] text-offwhite hover:bg-[#176E48] shadow-md hover:shadow-lg",
    outline:
      "border-2 border-beige/80 text-offwhite hover:bg-offwhite/10",
    outlineDark:
      "border-2 border-forest text-forest hover:bg-forest hover:text-offwhite",
  };

  const className = `inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold transition-all duration-200 hover:-translate-y-0.5 ${styles[variant]}`;

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
        {Icon && <Icon className="h-4 w-4" aria-hidden="true" />}
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={className}>
      {Icon && <Icon className="h-4 w-4" aria-hidden="true" />}
      {children}
    </Link>
  );
}
