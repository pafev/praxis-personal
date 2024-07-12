import { buttonVariants } from "~/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { CarouselArtigos } from "./carouselArtigos";

export default function SeçãoArtigosLandingPage() {
  return (
    <section className="my-20 lg:my-36">
      <div className="mx-8 lg:mx-36">
        <div className="flex flex-row">
          <p className="mr-4 font-lora">Nosso blog</p>
          <div className="flex w-16 flex-row justify-between">
            <Image
              src="/Praxis - Grafismos - Barra - Preto.svg"
              alt="barra"
              width={26}
              height={19}
            />
            <Image
              src="/Praxis - Grafismos - Barra - Vermelho.svg"
              alt="barra"
              width={26}
              height={19}
            />
          </div>
        </div>
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
