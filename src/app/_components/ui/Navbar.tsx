"use client";
import { Bug } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

type LinkProps = {
  pathName: string;
  url: string;
};

const Navbar = () => {
  const links: Array<LinkProps> = [
    {
      pathName: "Dashboard",
      url: "/",
    },

    {
      pathName: "Issues",
      url: "/issues",
    },
  ];

  const path = usePathname();

  return (
    <nav className="flex h-16 items-center space-x-6 border-b-2 border-b-black px-5">
      <Bug />
      <ul className="flex space-x-6">
        {links.map((link, index) => (
          <li
            key={index}
            className={`text-lg font-semibold ${
              path === link.url ? "text-zinc-900" : "text-zinc-500"
            }`}
          >
            <Link href={link.url}>{link.pathName}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
