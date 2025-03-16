import Link from "next/link";

interface NavLinkProps {
  className?: string;
}

//Component that shows a list of navigation links to be used in a Navigation component
export function NavLinks({ className }: NavLinkProps) {
  const links = [
    { href: "/", label: "Dashboard" },
    { href: "/manage", label: "Manage Coins" },
    { href: "/clients", label: "Manage Clients" },
  ];

  return links.map((link) => (
    <li key={link.href}>
      <Link href={link.href} className={className}>
        {link.label}
      </Link>
    </li>
  ));
}