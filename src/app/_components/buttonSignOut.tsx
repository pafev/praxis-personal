"use client";
import { signOut } from "next-auth/react";
import { Button } from "~/components/ui/button";
export function ButtonSignOut() {
  return (
    <Button
      onClick={() => signOut()}
      className="rounded-md border-2 border-vermelho-praxis bg-transparent px-4 font-noto text-xl text-vermelho-praxis transition duration-200 ease-linear hover:text-white"
    >
      Sair
    </Button>
  );
}
