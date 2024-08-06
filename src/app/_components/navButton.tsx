"use client";

import { type Session } from "next-auth";
import { signIn, signOut } from "next-auth/react";

function NavButton({ session }: { session: Session | null }) {
  let handleClick: () => Promise<void> = signIn;
  let text = "Entrar";

  if (session?.user.id) {
    handleClick = signOut;
    text = "Sair";
  }

  return (
    <button
      onClick={() => handleClick()}
      className="font-noto font-medium transition-all duration-200 ease-in-out hover:text-vermelho-excelencia"
    >
      {text}
    </button>
  );
}

export { NavButton };
