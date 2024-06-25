"use client"
import { signOut } from "next-auth/react";
export function ButtonSignOut(){
    return(
    <button onClick={() => signOut()} className="text-off-black text-xl bg-red-500 rounded-md px-4">
        Sair
    </button>
);}