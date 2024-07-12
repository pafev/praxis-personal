import SeçãoArtigosLandingPage from "../_components/secaoArtigosLandingPage";
import HeaderLandingPage from "./_components/headerLandingPage";
import { FormsContato } from "./_components/formsContato";
import { Equipe } from "./_components/equipe";
import QuemSomos from "./_components/quemSomos";
import SecaoParceiros from "./_components/parceiros/secaoParceiros";
import { Portfolio } from "./_components/portfolio/portfolio";

export default async function Home() {
  return (
    <main>
      <HeaderLandingPage />
      <QuemSomos />
      <Portfolio />
      <SeçãoArtigosLandingPage />
      <Equipe />
      <SecaoParceiros />
      <FormsContato />
    </main>
  );
}
