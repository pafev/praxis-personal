import GrafismoCirculos from "~/components/grafismoCirculos";

import { getServerAuthSession } from "~/server/auth";
import { GetAllParceiros } from "./parceiros";
import { IndicadorSecao } from "../indicadorSecao/indicadorSecao";
import ModalCriar from "./modalCriar";

const SecaoParceiros = async () => {
  const session = await getServerAuthSession();

  return (
    <section className="mx-8 my-20 lg:mx-36 lg:my-48">
      <div className="mb-24 flex">
        <GrafismoCirculos className="ml-2 md:ml-0" />
        {session && <ModalCriar />}
        <IndicadorSecao.Root className="flex self-end">
          <IndicadorSecao.BarraEscura className="mr-1 md:mr-2" />
          <IndicadorSecao.BarraVermelha className="mr-2 md:mr-4" />
          <IndicadorSecao.Nome>Parceiros</IndicadorSecao.Nome>
        </IndicadorSecao.Root>
      </div>

      <GetAllParceiros session={session} />
    </section>
  );
};

export default SecaoParceiros;
