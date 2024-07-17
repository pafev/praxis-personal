import Image from "next/image";
import { ButtonLogin } from "./_components/buttonLogin";
export default async function Login() {
  return (
    <main className="flex h-screen items-center justify-center justify-items-center p-4 ">
      <section className="flex h-fit max-h-full w-[720px] max-w-full  flex-col items-center justify-evenly rounded-3xl border-2 border-vermelho-gentileza py-28 md:shadow-2xl xl:shadow-2xl">
        <Image
          src="/Praxis - Logo - Completa - Colorida.png"
          width={300}
          height={126}
          alt="Logo"
          className="mb-12"
        />
        <div>
          <h1 className="mb-8 text-center text-4xl">Bem vindo de Volta!</h1>
        </div>
        <ButtonLogin />
      </section>
    </main>
  );
}
