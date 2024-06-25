"use client";

import Image from "next/image";
import { signIn } from "next-auth/react";

export function ButtonLogin() {
  return (
    <button
      onClick={() =>
        signIn("google", {
          callbackUrl: "/",
        })
      }
    >
      <div className="flex h-14 justify-between overflow-hidden rounded-xl border border-solid ">
        <Image
          className="ml-4 "
          src="/google 1.svg"
          width={32}
          height={32}
          alt={"Google"}
        />
        <div className="ml-3 flex items-center justify-center justify-items-end overflow-hidden rounded-r-xl bg-vermelho-praxis p-3 text-xl md:text-2xl xl:text-2xl">
          Entre com Google
        </div>
      </div>
    </button>
  );
}
