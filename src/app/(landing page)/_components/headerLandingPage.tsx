import Image from "next/image";

export default function HeaderLandingPage() {
  return (
    <div className="flex w-screen bg-gradient-to-r from-vermelho-praxis to-vermelho-praxis-translucido md:h-[586px]">
      <div className="ml-8 flex-row self-center pb-4 pt-12 md:pb-0 lg:ml-36">
        <h1 className="font-lora text-5xl text-white md:text-8xl">
          Psicologia e Consultoria
        </h1>
        <Image
          src="/Praxis - Logo - Completa - Branca.png"
          alt="Logo branca completa Praxis"
          width={197}
          height={99}
          priority
        />
      </div>
    </div>
  );
}
