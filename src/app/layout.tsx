import "~/styles/globals.css";
import { Footer } from "./_components/footer";

import { Noto_Sans } from "next/font/google";

import { TRPCReactProvider } from "~/trpc/react";
import { cn } from "~/lib/utils";
import { AuthProvider } from "~/components/authProvider";

export const metadata = {
  title: "Praxis Consultoria Jr",
  description: "Site institucional da Praxis Consultoria Jr",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

const font = Noto_Sans({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="pt-BR"
      className={cn(font.className, "w-screen overflow-x-hidden antialiased")}
    >
      <body>
        <TRPCReactProvider>
          <AuthProvider>{children}</AuthProvider>
        </TRPCReactProvider>
        <Footer />
      </body>
    </html>
  );
}
