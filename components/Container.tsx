import type { ElementType, ReactNode } from "react";

type ContainerProps = {
  children: ReactNode;
  as?: ElementType;
  className?: string;
};

// Shared max-width wrapper with consistent responsive side gutters.
// Used by every section so horizontal rhythm stays identical site-wide.
export default function Container({
  children,
  as: Tag = "div",
  className = "",
}: ContainerProps) {
  return (
    <Tag className={`mx-auto w-full max-w-content px-6 md:px-12 ${className}`}>
      {children}
    </Tag>
  );
}
