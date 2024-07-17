import { buttonVariants } from "~/components/ui/button";
import Link from "next/link";
import { CarouselArtigos } from "./carouselArtigos";
import IndicadorSecao from "../indicadorSecao/indicadorSecao";

export default function SeçãoArtigosLandingPage() {
  return (
    <section className="my-20 lg:my-36">
      <div className="mx-8 lg:mx-36">
        <IndicadorSecao.Root>
          <IndicadorSecao.Nome className="mr-4">Nosso blog</IndicadorSecao.Nome>
          <IndicadorSecao.BarraEscura className="mr-2" />
          <IndicadorSecao.BarraVermelha />
        </IndicadorSecao.Root>
        <div className="my-10 flex flex-col items-end justify-between md:my-20 md:flex-row">
          <p className="font-lora text-2xl md:text-5xl">
            Veja Sobre o que Estamos Falando
          </p>
          <p className="font-lora text-vermelho-praxis md:text-lg">Artigos</p>
        </div>
      </div>
      <CarouselArtigos />
      <div className="mx-8 my-10 flex flex-col items-center justify-center gap-4 border-2 border-x-transparent border-y-vermelho-praxis py-8 md:my-20 md:flex-row md:justify-between md:py-12 lg:mx-36">
        <p className="my-2 font-noto md:text-lg">Quer ver mais postagens?</p>
        <Link
          href={"/blog"}
          className={buttonVariants({
            className:
              "h-14 rounded-sm border-2 border-vermelho-praxis bg-transparent text-vermelho-praxis shadow-md hover:text-off-white",
          })}
        >
          <span className="font-noto md:text-lg">Acesse Nosso Blog</span>
        </Link>
      </div>
    </section>
  );
}
