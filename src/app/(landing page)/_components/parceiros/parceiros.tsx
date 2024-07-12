import Link from "next/link";
import type { UserSessionProps } from "~/lib/parceirosTypeProps";
import ModalEditar from "./modalEditar";
import { ModalDeletar } from "./modalDeletar";
import { CloudImage } from "../cldImage";
import { api } from "~/trpc/server";

export async function GetAllParceiros({ session }: UserSessionProps) {
  const partners = await api.partners.getAll();

  return (
    <ul className="flex flex-wrap items-center justify-center gap-3 sm:justify-between">
      {partners.map((partner) => (
        <li key={partner.id} className="flex-shrink-0 text-center">
          <div className="flex size-[120px] overflow-hidden rounded-full border-2 border-off-black/15 shadow-lg transition-all duration-200 ease-in-out hover:-translate-y-1 sm:size-[150px] lg:size-[180px]">
            <Link
              href={partner.link ?? "/"}
              className="flex size-full items-center justify-center"
            >
              <CloudImage
                src={partner.image}
                width={2000}
                height={10}
                // fill
                alt="Logo Parceiro"
                className="w-[70%]"
              />
            </Link>
          </div>
          <div className="flex items-center justify-center space-x-1" />
          <div className="mt-4 flex w-full justify-center">
            {session && <ModalEditar id={partner.id} />}
            {session && <ModalDeletar id={partner.id} />}
          </div>
        </li>
      ))}
    </ul>
  );
}
