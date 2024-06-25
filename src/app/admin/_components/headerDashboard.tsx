import { Plus } from "lucide-react";
import React from "react";

export default function HeaderDashboard() {
  return (
    <div className="flex h-96 w-full flex-col justify-start bg-white py-12">
      <div className="flex w-screen flex-col items-center justify-between md:flex-row">
        <h2 className="mb-6 font-lora text-[150px] text-vermelho-excelencia md:mb-0 md:ml-36">
          Blog
        </h2>

        <button className="flex gap-4 rounded-2xl bg-vermelho-praxis p-4 font-noto text-2xl font-medium text-white transition duration-200 hover:bg-vermelho-gentileza md:mr-36">
          <Plus size={30} />
          Adicionar Post
        </button>
      </div>
    </div>
  );
}
