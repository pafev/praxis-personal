import GrafismoCirculos from "~/components/grafismoCirculos";

import { getServerAuthSession } from "~/server/auth";
import { GetAllParceiros } from "./parceiros";
import { IndicadorSecao } from "../indicadorSecao/indicadorSecao";
import ModalCriar from "./modalCriar";

const SecaoParceiros = async () => {
  const session = await getServerAuthSession();

  return (
    <section id="Parceiros" className="mx-8 my-20 lg:mx-36 lg:my-48">
      <div className="mb-24 grid w-full grid-cols-5 justify-between gap-y-6">
        <GrafismoCirculos className="col-start-1 row-start-1 ml-2 md:ml-0" />
        {session && <ModalCriar />}
        <IndicadorSecao.Root className="col-span-2 col-start-4 row-start-1 ml-auto flex md:col-span-1 md:col-start-5">
          <IndicadorSecao.BarraEscura className="ml-auto mr-1 md:mr-2" />
          <IndicadorSecao.BarraVermelha className="mr-2 md:mr-4" />
          <IndicadorSecao.Nome>Parceiros</IndicadorSecao.Nome>
        </IndicadorSecao.Root>
      </div>

      <GetAllParceiros session={session} />
    </section>
  );
};

export default SecaoParceiros;
