"use client";
import { useState } from "react";
import { signOut } from "next-auth/react";
import Image from "next/image";
import { type Session } from "next-auth";
import { LogOut } from "lucide-react";

interface UserMenuProps {
  session: Session | null;
}

const UserMenu: React.FC<UserMenuProps> = ({ session }) => {
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const toggleUserMenu = () => {
    setUserMenuOpen(!userMenuOpen);
  };

  if (!session?.user) return null;

  return (
    <div className="relative">
      <button onClick={toggleUserMenu} className="focus:outline-none">
        <Image
          src={session.user.image ?? "User image"}
          width={50}
          height={50}
          alt={session.user.name ?? "User avatar"}
          className="cursor-pointer rounded-full"
        />
      </button>
      {userMenuOpen && (
        <div className="absolute right-0 mt-2 w-36 overflow-hidden rounded-lg border-2 bg-vermelho-excelencia shadow-lg">
          <button
            onClick={() => signOut()}
            className="flex h-full w-full justify-around px-4 py-2  font-noto text-2xl font-medium text-off-white duration-300 ease-linear hover:bg-vermelho-gentileza hover:text-off-black"
          >
            <LogOut size={36} />
            Sair
          </button>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
