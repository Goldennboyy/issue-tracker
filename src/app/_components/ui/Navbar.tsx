"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import SignInButton from "./SignInButton";
import { type Session } from "next-auth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ThemeToggle } from "./ThemeToggle";


type LinkProps = {
  pathName: string;
  url: string;
};

type NavbarProps = {
  session: Session | null;
};

const Navbar = ({ session }: NavbarProps) => {
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
    <nav className="flex items-center h-16 px-5 space-x-6 border-b-2 border-b-black">
      <Avatar>
        <AvatarImage src={session?.user.image ?? ""} />
        <AvatarFallback>{session?.user.name ?? ""}</AvatarFallback>
      </Avatar>
      <ul className="flex space-x-6">
        {links.map(({ pathName, url }, index) => (
          <li
            key={index}
            className={`text-lg font-semibold transition-colors ${
              path === url
                ? "text-zinc-900 dark:text-slate-100"
                : "text-zinc-500 dark:text-slate-800"
            }`}
          >
            <Link href={url}>{pathName}</Link>
          </li>
        ))}
      </ul>
      <div className="absolute right-0 flex p-4 space-x-3">
        <ThemeToggle />
        <SignInButton session={session} />
      </div>
    </nav>
  );
};

export default Navbar;
