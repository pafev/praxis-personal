/* eslint-disable @next/next/no-img-element */

import { Linkedin } from "lucide-react";
import { Instagram } from "lucide-react";
import links from "../../lib/links.json";
import Image from "next/image";
import Link from "next/link";
import { Grafismo } from "../../components/grafismo";

export function Footer() {
  return (
    <footer className="relative flex w-screen justify-between border-t-[2px] border-t-white bg-gradient-to-r from-vermelho-praxis-translucido to-vermelho-praxis px-8 lg:px-36">
      {/* logo e grafismo */}
      <section className="flex">
        <div className="flex flex-col justify-center lg:justify-start xl:mt-3 xl:justify-start">
          {/* logo */}
          <Image
            src="/Praxis - Logo - Simples - Branca.png"
            width={194}
            height={75}
            alt="Praxis-Logo-Simples-Branca1"
          />
        </div>
        {/* grafismo */}
        <Grafismo />
      </section>

      {/* links e contatos */}
      <div className="flex flex-col justify-around pl-3 transition">
        {/* links */}
        <ul className="hidden gap-6 text-nowrap sm:hidden md:hidden lg:flex">
          {links.map((link, index) => (
            <li
              className="text-white/90 duration-300 ease-linear hover:text-white"
              key={index}
            >
              <Link href={link.url}>{link.name}</Link>
            </li>
          ))}
        </ul>

        {/* contatos */}
        <section className="flex items-center gap-4">
          <div>
            <Link href="https://www.instagram.com/praxisconsultoriajr/">
              <Instagram
                className="size-6 fill-off-white duration-300 ease-linear sm:size-7"
                strokeWidth={1}
              />
            </Link>
          </div>

          <div>
            <Link href="https://br.linkedin.com/company/praxis-consultoria-jr">
              <Linkedin
                className="h-7 w-7 fill-off-white duration-300 ease-linear sm:h-8 sm:w-8"
                strokeWidth={1}
              />
            </Link>
          </div>
        </section>
      </div>
      {/* linha horizontal */}
      <div className="absolute left-1/2	top-1/2 mx-8 hidden h-[1px] w-full -translate-x-1/2 -translate-y-1/2 transform bg-white transition duration-300 md:hidden lg:mx-36 lg:flex xl:flex"></div>
    </footer>
  );
}
