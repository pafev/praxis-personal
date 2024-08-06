"use client";

import Image from "next/image";
import { signIn } from "next-auth/react";
import { Button } from "~/components/ui/button";

export function ButtonLogin() {
  return (
    <Button
      className="flex h-fit justify-between overflow-x-hidden rounded-lg bg-transparent p-0 shadow-md transition-all ease-in-out hover:bg-transparent hover:shadow-lg"
      onClick={() =>
        signIn("google", {
          callbackUrl: "/",
        })
      }
    >
      <Image
        src="/google 1.svg"
        width={32}
        height={32}
        alt={"Google"}
        className="mx-4 size-6 md:size-8"
      />
      <span className="flex h-full items-center bg-vermelho-praxis px-2 py-4 md:px-5 md:text-lg">
        Entre com Google
      </span>
    </Button>
  );
}
