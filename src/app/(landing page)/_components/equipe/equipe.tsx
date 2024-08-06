import React from "react";
import { IndicadorSecao } from "../indicadorSecao/indicadorSecao";
import { CloudImage } from "~/app/_components/cldImage";
import { api } from "~/trpc/server";
import { getServerAuthSession } from "~/server/auth";
import ModalEditar from "./modalEditar";

export async function Equipe() {
  const memberships = await api.memberships.getAll();
  const session = await getServerAuthSession();
  return (
    <section
      id="Equipe"
      className="mx-8 my-20 space-y-24 md:mx-10 lg:mx-36 lg:my-36"
    >
      <IndicadorSecao.Root>
        <IndicadorSecao.Nome className="mr-4">Equipe</IndicadorSecao.Nome>
        <IndicadorSecao.BarraEscura className="mr-2" />
        <IndicadorSecao.BarraVermelha />
      </IndicadorSecao.Root>
      <div className="grid grid-cols-1 place-items-center gap-12 sm:grid-cols-2 md:grid-cols-2 xl:flex xl:justify-between">
        {memberships.map((membership) => {
          return (
            <div
              key={membership.id}
              className="relative flex h-72 w-56 flex-col overflow-hidden bg-gradient-to-b from-vermelho-praxis-translucido to-vermelho-praxis shadow-lg shadow-off-black/25 transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="px-4 pt-4 text-off-white md:text-lg ">
                <h1 className="line-clamp-1 font-noto font-semibold">
                  {membership.name}
                </h1>
                <h2 className="line-clamp-1 font-noto font-thin">
                  {membership.role}
                </h2>
              </div>
              <CloudImage
                width="200"
                height="100"
                src={membership.profilePicture}
                quality={100}
                alt="Foto Funcionario"
                className="absolute mt-[4.4rem] h-auto w-56 self-center"
              />
              {session && <ModalEditar id={membership.id} />}
            </div>
          );
        })}
      </div>
    </section>
  );
}
