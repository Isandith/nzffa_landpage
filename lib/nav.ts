// Centralised navigation config — used by Header, MobileMenu and Footer so
// links are declared once and never drift out of sync.

export type NavItem = {
  label: string;
  href: string;
};

export const primaryNav: NavItem[] = [
  { label: "About", href: "/about" },
  { label: "Membership", href: "/membership" },
  { label: "Events", href: "/events" },
  { label: "Growing Trees", href: "/growing-trees" },
  { label: "Species selection tool", href: "/species-selection-tool" },
];

export const utilityNav: NavItem[] = [
  { label: "Login", href: "/login" },
  { label: "Member portal", href: "/member-portal" },
];

export const joinLink: NavItem = { label: "Join NZFFA", href: "/join-nzffa" };
