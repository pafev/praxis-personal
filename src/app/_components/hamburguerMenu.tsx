import Link from "next/link";
import React from "react";
import { ButtonSignOut } from "./buttonSignOut";
import { Menu } from "lucide-react";
import { type Session } from "next-auth";
import { Sheet, SheetContent, SheetTrigger } from "~/components/ui/sheet";

async function HamburgerMenu({ session }: { session: Session | null }) {
  return (
    <Sheet>
      <SheetTrigger className="lg:hidden">
        <Menu
          size={36}
          strokeWidth={2.5}
          className="stroke-off-black transition duration-300 ease-linear hover:stroke-vermelho-praxis"
        />
      </SheetTrigger>
      <SheetContent className="flex flex-col gap-6 font-noto font-semibold">
        <Link className="mt-12" href="/#QuemSomos">
          Quem Somos
        </Link>
        <Link href="/#Portfolio">Portfolio</Link>
        <Link href="/#Equipe">Equipe</Link>
        <Link href="/#Parceiros">Parceiros</Link>
        <Link href="/#Contato">Contato</Link>
        <Link href="/blog">Blog</Link>
        {session && (
          <Link href="/admin" className="mb-6 text-vermelho-praxis-translucido">
            Dashboard
          </Link>
        )}
        <ButtonSignOut />
      </SheetContent>
    </Sheet>
  );
}
export default HamburgerMenu;
