import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "secondary" | "outline";
type Size = "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-md font-sans font-semibold " +
  "transition duration-200 ease-smooth focus-visible:outline-none focus-visible:ring-2 " +
  "focus-visible:ring-forest-600 focus-visible:ring-offset-2 focus-visible:ring-offset-cream " +
  "disabled:opacity-60 disabled:pointer-events-none";

const variants: Record<Variant, string> = {
  // Warm gold accent — the single most prominent call to action.
  primary: "bg-accent-600 text-on-dark hover:bg-accent-500 shadow-sm hover:shadow-md",
  // Solid forest green — secondary emphasis.
  secondary: "bg-forest-700 text-on-dark hover:bg-forest-600 shadow-sm hover:shadow-md",
  // Outline for use over photography / dark areas.
  outline:
    "border border-on-dark/70 text-on-dark hover:bg-on-dark/10 backdrop-blur-sm",
};

const sizes: Record<Size, string> = {
  md: "px-5 py-2.5 text-meta",
  lg: "px-7 py-3.5 text-body",
};

type CommonProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
};

type LinkButtonProps = CommonProps & {
  href: string;
};

type ActionButtonProps = CommonProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: undefined;
  };

type ButtonProps = LinkButtonProps | ActionButtonProps;

// Single shared button system. Renders a <Link> when `href` is provided
// (navigation) and a real <button> otherwise (actions) — never the wrong
// element, per the accessibility requirements.
export default function Button(props: ButtonProps) {
  const { variant = "primary", size = "md", className = "", children } = props;
  const classes = `${base} ${variants[variant]} ${sizes[size]} ${className}`;

  if ("href" in props && props.href) {
    return (
      <Link href={props.href} className={classes}>
        {children}
      </Link>
    );
  }

  // Strip the styling-only props so the rest pass straight to the element.
  const { variant: _variant, size: _size, className: _className, children: _children, ...rest } =
    props as ActionButtonProps;
  void [_variant, _size, _className, _children];

  return (
    <button className={classes} {...rest}>
      {children}
    </button>
  );
}
