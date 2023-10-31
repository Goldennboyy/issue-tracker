import { Button } from "@/components/ui/button";
import { type Session } from "next-auth";
import Link from "next/link";
import React from "react";

type buttonProps = {
  session: Session | null;
};

const SignInButton = ({ session }: buttonProps) => {
  return (
    <Button>
      <Link href={session ? "/api/auth/signout" : "/api/auth/signin"}>
        {session ? "Log out" : "Log In"}
      </Link>
    </Button>
  );
};

export default SignInButton;
