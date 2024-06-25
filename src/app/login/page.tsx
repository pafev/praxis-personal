import Image from "next/image";
import { ButtonLogin } from "./_components/buttonLogin";
export default async function Login() {
  return (
    <main className="flex h-screen items-center justify-center justify-items-center p-4 ">
      <section className="flex h-[515PX] max-h-full w-[720px]  max-w-full flex-col items-center justify-evenly rounded-3xl   border-vermelho-praxis border-opacity-60 md:border-2 md:border-b-4 md:border-r-4 md:shadow-2xl xl:border-2 xl:border-b-4 xl:border-r-4 xl:shadow-2xl">
        <div>
          <Image
            src="/Praxis - Logo - Completa - Colorida.png"
            width={300}
            height={126}
            alt="Logo"
          />
        </div>
        <div>
          <h1 className="text-center text-4xl">Bem vindo de Volta!</h1>
          <h2 className="text-center text-lg">Entre com o Google</h2>
        </div>
        <ButtonLogin />
      </section>
    </main>
  );
}
