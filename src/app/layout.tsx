import "~/styles/globals.css";
import { Footer } from "./_components/footer";
import Navbar from "./_components/navbar";

import { Noto_Sans } from "next/font/google";

import { TRPCReactProvider } from "~/trpc/react";
import { cn } from "~/lib/utils";
import { AuthProvider } from "~/components/authProvider";
import { Toaster } from "~/components/ui/toaster";

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
    <html lang="pt-BR" className={cn(font.className, "antialiased")}>
      <body className="min-h-screen w-screen overflow-x-hidden bg-white">
        <Navbar />
        <TRPCReactProvider>
          <AuthProvider>{children}</AuthProvider>
          <Toaster />
        </TRPCReactProvider>
        <Footer />
      </body>
    </html>
  );
}
