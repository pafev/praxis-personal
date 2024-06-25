import Link from "next/link";
import Image from "next/image";
import HamburgerMenu from "./hamburguerMenu";
import { LinkDashboard } from "./userAdmin";
import { getServerAuthSession } from "~/server/auth";
import UserMenu from "./userMenu";
import { unstable_noStore as noStore } from "next/cache";

const Navbar = async () => {
  noStore();
  const session = await getServerAuthSession();

  return (
    <nav className="fixed z-20 flex h-20 w-screen items-center justify-between bg-white/95 px-8 shadow-md backdrop-blur-sm lg:px-36">
      <div className="flex items-center">
        <Link href="/" className="flex-shrink-0">
          <Image
            src="/Praxis - Logo - Simples - Colorida 1.png"
            width={120}
            height={100}
            alt="Logo praxis"
          />
        </Link>
        <div className="ml-10 hidden items-center gap-4 space-x-3 font-noto font-medium transition-all duration-200 ease-in-out hover:text-black/70 lg:flex">
          <Link href="/" className="border-vermelho-praxis">
            Quem Somos
          </Link>
          <Link href="/" className="border-vermelho-praxis">
            Portfolio
          </Link>
          <Link href="/" className="border-vermelho-praxis">
            Equipe
          </Link>
          <Link href="/" className="border-vermelho-praxis">
            Parceiros
          </Link>
          <Link href="/" className="border-vermelho-praxis">
            Contato
          </Link>
          <Link href="/blog" className="border-vermelho-praxis">
            Blog
          </Link>
        </div>
      </div>
      <div className="hidden lg:block">
        <div className="ml-10 flex items-center space-x-4">
          {session && <LinkDashboard />}
          {session && <UserMenu session={session} />}
        </div>
      </div>
      <HamburgerMenu session={session}>
        {session && <LinkDashboard />}
      </HamburgerMenu>
    </nav>
  );
};

export default Navbar;
