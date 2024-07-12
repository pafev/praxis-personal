/* eslint-disable @next/next/no-img-element */

import { Linkedin, Smartphone } from "lucide-react";
import { Instagram } from "lucide-react";
import links from "../../lib/links.json";
import Image from "next/image";
import Link from "next/link";
import { Grafismo } from "../../components/grafismo";
import { unstable_noStore as noStore } from "next/cache";
import { api } from "~/trpc/server";

export async function Footer() {
  noStore();

  const praxis = await api.praxis.get();

  if (!praxis) return <span>Praxis não está mais no banco de dados</span>;

  return (
    <footer className="relative flex justify-between border-t-2 border-t-white bg-gradient-to-r from-vermelho-praxis-translucido to-vermelho-praxis px-8 lg:px-36">
      {/* logo e grafismo */}
      <section className="flex">
        {/* logo */}
        <Image
          src="/Praxis - Logo - Simples - Branca.png"
          width={150}
          height={70}
          alt="Praxis-Logo-Simples-Branca1"
          className="my-2 self-start"
        />
        {/* grafismo */}
        <Grafismo />
      </section>

      {/* links e contatos */}
      <div className="flex flex-col justify-around pl-3 transition">
        {/* links */}
        <ul className="hidden gap-6 text-nowrap lg:text-lg xl:flex">
          {links.map((link, index) => (
            <li className="text-off-white duration-300 ease-linear" key={index}>
              <Link href={link.url}>{link.name}</Link>
            </li>
          ))}
        </ul>

        {/* contatos */}
        <section className="flex items-center gap-4">
          <Link href={praxis.instagram}>
            <Instagram
              className="size-6 text-off-white sm:size-7"
              strokeWidth={1}
            />
          </Link>

          <Link href={praxis.whatsapp}>
            <Smartphone
              className="size-6 text-off-white sm:size-7"
              strokeWidth={1}
            />
          </Link>

          <Link href={praxis.linkedin}>
            <Linkedin
              className="size-6 text-off-white sm:size-7"
              strokeWidth={1}
            />
          </Link>
        </section>
      </div>
      {/* linha horizontal */}
      <div className="absolute left-1/2	top-1/2 mx-8 hidden h-[1px] w-full -translate-x-1/2 -translate-y-1/2 transform bg-white transition duration-300 lg:mx-36 xl:flex"></div>
    </footer>
  );
}
