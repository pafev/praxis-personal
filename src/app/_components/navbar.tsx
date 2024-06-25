import Link from "next/link";
import Image from "next/image";
import HamburgerMenu from "./hamburguerMenu";
import { LinkDashboard } from "./userAdmin";
import { getServerAuthSession } from "~/server/auth";
import UserMenu from "./userMenu";

const Navbar = async () => {
  const session = await getServerAuthSession();

  return (
    <nav className="bg-white">
      <div className="mx-4 flex h-24 items-center justify-between md:mx-6 lg:mx-8">
        <div className="flex items-center">
          <Link href="/" className="flex-shrink-0">
            <Image
              src="/Praxis - Logo - Simples - Colorida 1.png"
              width={168}
              height={72}
              alt="Logo praxis"
            />
          </Link>
          <div className="ml-10 hidden items-center gap-4 space-x-3 font-noto text-xl font-medium lg:flex">
            <Link href="/" className="border-vermelho-praxis hover:border-b-2">
              Quem Somos
            </Link>
            <Link href="/" className="border-vermelho-praxis hover:border-b-2">
              Portfolio
            </Link>
            <Link href="/" className="border-vermelho-praxis hover:border-b-2">
              Equipe
            </Link>
            <Link href="/" className="border-vermelho-praxis hover:border-b-2">
              Parceiros
            </Link>
            <Link href="/" className="border-vermelho-praxis hover:border-b-2">
              Contato
            </Link>
            <Link
              href="/blog"
              className="border-vermelho-praxis hover:border-b-2"
            >
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
      </div>
    </nav>
  );
};

export default Navbar;

