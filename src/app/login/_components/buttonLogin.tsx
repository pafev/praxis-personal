"use client";

import Image from "next/image";
import { signIn } from "next-auth/react";
import { Button } from "~/components/ui/button";

export function ButtonLogin() {
  return (
    <Button
      className="h-fit overflow-x-hidden border-2 border-off-black bg-transparent p-0 pl-4 shadow-[0px_4px_8px_rgba(0,0,0,0.25)] transition-all duration-200 ease-linear hover:-translate-y-1 hover:bg-transparent hover:shadow-[0px_8px_8px_rgba(0,0,0,0.3)]"
      onClick={() =>
        signIn("google", {
          callbackUrl: "/",
        })
      }
    >
      <div className="flex justify-between rounded-xl">
        <Image
          src="/google 1.svg"
          width={32}
          height={32}
          alt={"Google"}
          className="mx-2"
        />
        <div className="ml-3 flex h-full items-center border-l bg-vermelho-praxis px-6 py-4 text-xl md:text-2xl xl:text-2xl">
          Entre com Google
        </div>
      </div>
    </Button>
  );
}
