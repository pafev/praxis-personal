"use client";

import { useState } from "react";
import Link from "next/link";
import React from "react";
import { ButtonSignOut } from "./buttonSignOut";
import { Session } from "next-auth"; // Adjust the import according to your auth library
import { Menu } from "lucide-react";

interface HamburgerMenuProps {
  session: Session | null;
  children: React.ReactNode;
}

const HamburgerMenu: React.FC<HamburgerMenuProps> = ({ session, children }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  return (
    <>
      <div className="mr-2 flex lg:hidden">
        <button
          onClick={toggleMenu}
          className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 transition duration-150 ease-in-out hover:bg-vermelho-gentileza focus:outline-none"
        >
          <Menu size={30} className="stroke-vermelho-excelencia" />
        </button>
      </div>

      {menuOpen && (
        <div className="fixed right-0 top-16 z-50 w-1/2 border-2 border-r-0 bg-white font-noto text-xl font-medium lg:hidden">
          <div className="px-2 pb-4 pt-2 text-black sm:px-3">
            <Link
              href="/"
              className="block rounded-md border-vermelho-praxis px-3 py-2 text-base font-medium hover:border-b-2"
            >
              Quem somos
            </Link>
            <Link
              href="/"
              className="block rounded-md border-vermelho-praxis px-3 py-2 text-base font-medium hover:border-b-2"
            >
              Portfolio
            </Link>
            <Link
              href="/"
              className="block rounded-md border-vermelho-praxis px-3 py-2 text-base font-medium hover:border-b-2"
            >
              Equipe
            </Link>
            <Link
              href="/"
              className="block rounded-md border-vermelho-praxis px-3 py-2 text-base font-medium hover:border-b-2"
            >
              Parceiros
            </Link>
            <Link
              href="/"
              className="block rounded-md border-vermelho-praxis px-3 py-2 text-base font-medium hover:border-b-2"
            >
              Contato
            </Link>
            <Link
              href="/blog"
              className="block rounded-md border-vermelho-praxis px-3 py-2 text-base font-medium hover:border-b-2"
            >
              Blog
            </Link>
            <Link
              href="/"
              className="block rounded-md border-vermelho-praxis px-3 py-2 pb-3 text-base font-medium hover:border-b-2"
            >
              Artigo
            </Link>
            {children}

            {session ? (
              <div className="mx-10 mt-3 flex justify-center">
                <ButtonSignOut />
              </div>
            ) : (
              <Link
                href="/login"
                className="block w-full rounded-md  bg-vermelho-praxis px-3 py-2 text-center text-base font-medium text-white hover:bg-vermelho-gentileza"
              >
                Entrar
              </Link>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default HamburgerMenu;

