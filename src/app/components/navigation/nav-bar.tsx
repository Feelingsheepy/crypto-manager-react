import { NavLinks } from "./nav-links";

//Navbar component for standard devices
export function NavBar() {
  return (
    <div className="w-full navbar bg-base-100 shadow-xl">
      <div className="flex-none lg:hidden">
        <label htmlFor="my-drawer" className="btn btn-square btn-ghost">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-6 h-6 stroke-current">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
          </svg>
        </label>
      </div>
      <div className="flex-1 px-2 mx-2 text-2xl font-bold">Crypto Manager</div>
      <div className="flex-none hidden lg:block">
        <ul className="menu menu-horizontal">
          <NavLinks className="btn btn-ghost" />
        </ul>
      </div>
    </div>
  );
}