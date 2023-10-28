"use client";
import { Bug } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import SignInButton from "./SignInButton";
import { type Session } from "next-auth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

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
    <nav className="flex h-16 items-center space-x-6 border-b-2 border-b-black px-5">
      <Bug />
      <ul className="flex space-x-6">
        {links.map(({ pathName, url }, index) => (
          <li
            key={index}
            className={`text-lg font-semibold transition-colors ${
              path === url ? "text-zinc-900" : "text-zinc-500"
            }`}
          >
            <Link href={url}>{pathName}</Link>
          </li>
        ))}
      </ul>
      <div className="absolute right-0 flex space-x-2 p-4">
        <SignInButton session={session} />
        <Avatar>
          <AvatarImage src={session?.user.image ?? ""} />
          <AvatarFallback>{session?.user.name ?? ""}</AvatarFallback>
        </Avatar>
      </div>
    </nav>
  );
};

export default Navbar;
