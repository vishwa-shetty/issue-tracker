import Link from "next/link";
import React from "react";
import { ImBug } from "react-icons/im";

const NavBar = () => {
  const links = [
    { label: "Dashboard", href: "/" },
    { label: "Issues", href: "/issues" },
  ];
  return (
    <nav className="flex items-center space-x-5 h-14 px-5 border-b mb-3">
      <Link href={"/"}>
        <ImBug />
      </Link>
      <ul className="flex px-5 space-x-5">
        {links.map((link) => (
          <li key={link.label}>
            <Link
              href={link.href}
              className="text-zinc-500 hover:text-zinc-800 transition-colors"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default NavBar;
