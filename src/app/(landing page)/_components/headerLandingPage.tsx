import Image from "next/image";

export default function HeaderLandingPage() {
  return (
    <div className="flex h-[320px] flex-col justify-center bg-gradient-to-r from-vermelho-praxis to-vermelho-praxis-translucido px-8 pt-16 drop-shadow-[0_4px_4px_rgba(0,0,0,0.25)] md:h-[586px] lg:px-36">
      <h1 className="font-lora text-4xl text-white md:text-8xl">
        Psicologia e Consultoria
      </h1>
      <Image
        src="/Praxis - Logo - Completa - Branca.png"
        alt="Logo branca completa Praxis"
        width={200}
        height={100}
        priority
        className="w-28 md:w-52"
      />
    </div>
  );
}
