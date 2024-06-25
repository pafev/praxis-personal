"use client";

import { signIn } from "next-auth/react";

export function ButtonSignIn() {
  return <button className="text-off-black text-xl bg-red-500 rounded-md px-4" onClick={() => signIn()}>Sign in</button>;
}