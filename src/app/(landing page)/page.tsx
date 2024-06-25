import HeaderLandingPage from "./_components/headerLandingPage";
import { FormsContato } from "./_components/formsContato";

export default async function Home() {
  return (
    <main>
      <HeaderLandingPage />
      <FormsContato />
    </main>
  );
}
