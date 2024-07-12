import Link from "next/link";
import { buttonVariants } from "~/components/ui/button";

export default function QuemSomos() {
  return (
    <div className="mx-8 my-20 flex flex-col lg:mx-36 lg:my-36">
      <div className="flex items-center justify-between">
        <p className="font-lora text-2xl md:max-w-3xl md:text-5xl">
          Descubra seu Potencial com Nossa Orientação Especializada
        </p>
        <div className="flex w-16 gap-2 md:w-24 md:gap-6">
          <div className="size-5 rounded-full bg-vermelho-praxis drop-shadow-[0_4px_4px_rgba(0,0,0,0.25)]  md:size-9" />
          <div className="size-5 rounded-full bg-off-black drop-shadow-[0_4px_4px_rgba(0,0,0,0.25)] md:size-9" />
        </div>
      </div>
      <Link
        href={"/#contato"}
        className={buttonVariants({
          className:
            "mt-7 h-12 self-start rounded-sm border-2 border-vermelho-praxis bg-transparent font-noto text-vermelho-praxis shadow-md hover:text-off-white md:mt-14 md:h-14 md:text-lg",
        })}
      >
        Entre em Contato
      </Link>
    </div>
  );
}
