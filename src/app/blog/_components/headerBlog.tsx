export function HeaderBlog({ children }: { children: string }) {
  return (
    <div className="flex h-[13rem] w-full items-center justify-center bg-gradient-to-l from-vermelho-praxis to-vermelho-praxis-translucido shadow-lg md:h-[21rem]">
      <div>
        <h1 className="mt-16 font-lora text-5xl text-white md:mt-9 md:text-8xl">
          {children}
        </h1>
        <div className="my-2 h-[0.4rem] w-[45%] bg-black" />
      </div>
    </div>
  );
}
