import HeaderDashboard from "../admin/_components/headerDashboard";
import { getServerAuthSession } from "~/server/auth";
import ModalEditarDadosEmpresa from "./_components/modalEditarDadosEmpresa";
import ModalAdicionarAdm from "./_components/modalAdicionarAdm";
import { api } from "~/trpc/server";
import { ShieldX } from "lucide-react";
export default async function Page() {
  const session = await getServerAuthSession();
  const praxis = await api.praxis.get();

  return (
    <main className="pb-12 lg:pb-24">
      <HeaderDashboard />
      {session &&
      (session.user.role === "ADMIN" ||
        session.user.email === praxis?.email) ? (
        <div className="flex flex-col items-center justify-center space-y-6 bg-white pb-6 lg:flex-row lg:space-x-12 lg:space-y-0">
          <ModalEditarDadosEmpresa />

          <ModalAdicionarAdm />
        </div>
      ) : (
        <h2 className="mb-12 w-full text-center font-bold text-vermelho-excelencia">
          <ShieldX
            size={72}
            className="mx-auto mb-6 stroke-vermelho-excelencia"
          />
          Parece que sua autorização não está em nível administrador.
          <p className="mt-3">
            Peça ou para um administrador atual ou para a pessoa com acesso ao
            email administrativo da Práxis subir o seu nível de permissão.
          </p>
        </h2>
      )}
    </main>
  );
}
