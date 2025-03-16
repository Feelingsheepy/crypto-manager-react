import Link from "next/link";
import { NavLinks } from "./nav-links";

//Nav drawer component for smaller devices
export function NavDrawer() {
  return (
    <div className="drawer-side">
      <label htmlFor="my-drawer" className="drawer-overlay"></label>
      <ul className="menu p-4 w-80 min-h-full bg-base-100">
        <li><Link href="/" className="text-xl font-bold mb-4">Crypto Manager</Link></li>
        <NavLinks />
      </ul>
    </div>
  );
}