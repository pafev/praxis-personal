import Link from "next/link";
import Image from "next/image";
import HamburgerMenu from "./hamburguerMenu";
import { getServerAuthSession } from "~/server/auth";
import { NavButton } from "./navButton";
import { unstable_noStore as noStore } from "next/cache";

const Navbar = async () => {
  noStore();
  const session = await getServerAuthSession();

  return (
    <nav className="fixed z-20 flex h-20 w-screen items-center justify-between bg-white px-8 shadow-md lg:px-16">
      <div className="flex items-center">
        <Link href="/" className="flex-shrink-0">
          <Image
            src="/Praxis - Logo - Simples - Colorida 1.png"
            width={120}
            height={100}
            alt="Logo praxis"
          />
        </Link>
        <div className="ml-10 hidden items-center gap-4 space-x-3 font-noto font-medium transition-all lg:flex">
          <Link
            href="/#QuemSomos"
            className="border-vermelho-praxis duration-200 ease-in-out hover:text-vermelho-excelencia"
          >
            Quem Somos
          </Link>
          <Link
            href="/#Portfolio"
            className="border-vermelho-praxis duration-200 ease-in-out hover:text-vermelho-excelencia"
          >
            Portfolio
          </Link>
          <Link
            href="/#Equipe"
            className="border-vermelho-praxis duration-200 ease-in-out hover:text-vermelho-excelencia"
          >
            Equipe
          </Link>
          <Link
            href="/#Parceiros"
            className="border-vermelho-praxis duration-200 ease-in-out hover:text-vermelho-excelencia"
          >
            Parceiros
          </Link>
          <Link
            href="/#Contato"
            className="border-vermelho-praxis duration-200 ease-in-out hover:text-vermelho-excelencia"
          >
            Contato
          </Link>
          <Link
            href="/blog"
            className="border-vermelho-praxis duration-200 ease-in-out hover:text-vermelho-excelencia"
          >
            Blog
          </Link>
        </div>
      </div>
      <div className="hidden lg:block">
        <div className="ml-10 flex items-center space-x-4">
          {session && (
            <Link
              href="/admin"
              className="font-semibold text-vermelho-praxis-translucido transition duration-200 ease-linear hover:text-vermelho-gentileza"
            >
              Dashboard
            </Link>
          )}
          <NavButton session={session} />
        </div>
      </div>
      <HamburgerMenu session={session} />
    </nav>
  );
};

export default Navbar;
