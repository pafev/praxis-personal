import { IndicadorSecao } from "../IndicadorSecao";
import { VerMais } from "./buttonVerMais";
import { CloudUpload } from "../cldImage";
import { getServerAuthSession } from "~/server/auth";
import ModalEditar from "./modalEditar";
import { api } from "~/trpc/server";
import { CardPrincipalPortfolio } from "./cardPrincipal";
import { urlDefaultImg } from "~/lib/defaultImg";

export async function Portfolio() {
  //TODO Mudar uploadPreset para prod (cloudinary upload widget)
  const session = await getServerAuthSession();
  const cardsPortfolio = await api.portfolio.getAll();

  return (
    <section className="mx-8 flex flex-col items-center justify-center space-y-8 lg:mx-36">
      <IndicadorSecao secao="Portfólio" />
      {session && <CloudUpload uploadPreset="TestePraxis" />}
      <div className="grid w-full grid-cols-5 gap-x-12 gap-y-12">
        <CardPrincipalPortfolio.Root className="col-span-full w-full bg-white lg:col-span-2">
          <CardPrincipalPortfolio.Image
            url={cardsPortfolio[0]?.image ?? urlDefaultImg}
          />
          <CardPrincipalPortfolio.Title>
            {cardsPortfolio[0]?.name}
          </CardPrincipalPortfolio.Title>
          <CardPrincipalPortfolio.Description>
            {cardsPortfolio[0]?.description}
          </CardPrincipalPortfolio.Description>
          {session && (
            <div className="flex w-full items-center justify-end pr-6">
              <ModalEditar id={cardsPortfolio[0]?.id ?? 9999} />
            </div>
          )}
        </CardPrincipalPortfolio.Root>
        <CardPrincipalPortfolio.Root className="col-span-full w-full bg-white lg:col-span-3">
          <CardPrincipalPortfolio.Image
            url={cardsPortfolio[1]?.image ?? urlDefaultImg}
          />
          <CardPrincipalPortfolio.Title>
            {cardsPortfolio[1]?.name}
          </CardPrincipalPortfolio.Title>
          <CardPrincipalPortfolio.Description>
            {cardsPortfolio[1]?.description}
          </CardPrincipalPortfolio.Description>
          {session && (
            <div className="flex w-full items-center justify-end pr-6">
              <ModalEditar id={cardsPortfolio[1]?.id ?? 9999} />
            </div>
          )}
        </CardPrincipalPortfolio.Root>
        <CardPrincipalPortfolio.Root className="col-span-full w-full bg-white lg:col-span-3">
          <CardPrincipalPortfolio.Image
            url={cardsPortfolio[2]?.image ?? urlDefaultImg}
          />
          <CardPrincipalPortfolio.Title>
            {cardsPortfolio[2]?.name}
          </CardPrincipalPortfolio.Title>
          <CardPrincipalPortfolio.Description>
            {cardsPortfolio[2]?.description}
          </CardPrincipalPortfolio.Description>
          {session && (
            <div className="flex w-full items-center justify-end pr-6">
              <ModalEditar id={cardsPortfolio[2]?.id ?? 9999} />
            </div>
          )}
        </CardPrincipalPortfolio.Root>
        <CardPrincipalPortfolio.Root className="col-span-full w-full bg-white lg:col-span-2">
          <CardPrincipalPortfolio.Image
            url={cardsPortfolio[3]?.image ?? urlDefaultImg}
          />
          <CardPrincipalPortfolio.Title>
            {cardsPortfolio[3]?.name}
          </CardPrincipalPortfolio.Title>
          <CardPrincipalPortfolio.Description>
            {cardsPortfolio[3]?.description}
          </CardPrincipalPortfolio.Description>
          {session && <ModalEditar id={cardsPortfolio[3]?.id ?? 9999} />}
        </CardPrincipalPortfolio.Root>
      </div>
      <VerMais />
    </section>
  );
}
