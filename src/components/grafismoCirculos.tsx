const GrafismoCirculos = ({ className = "" }: { className?: string }) => {
  return (
    <div className={`flex flex-row gap-2 md:gap-6 ${className}`}>
      <div className="h-5 w-5 rounded-full bg-vermelho-praxis drop-shadow-[0_4px_4px_rgba(0,0,0,0.25)]  md:h-9 md:w-9" />
      <div className="h-5 w-5 rounded-full bg-off-black drop-shadow-[0_4px_4px_rgba(0,0,0,0.25)] md:h-9 md:w-9" />
    </div>
  );
};

export default GrafismoCirculos;
