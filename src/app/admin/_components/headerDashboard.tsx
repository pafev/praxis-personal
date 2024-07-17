import React from "react";

export default function HeaderDashboard() {
  return (
    <div className="mb-12 flex h-[15rem] w-full items-center justify-center bg-gradient-to-r from-vermelho-praxis to-vermelho-praxis-translucido pb-12 pt-32 shadow-[0px_4px_6px_rgba(0,0,0,0.2)] md:h-[21rem] lg:mb-24">
      <div>
        <h2 className="font-lora text-5xl text-white md:text-9xl">Dashboard</h2>
        <div className=" my-2 h-[0.4rem] w-[35%] bg-black" />
      </div>
    </div>
  );
}
