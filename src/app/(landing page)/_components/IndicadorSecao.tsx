type GerecProps = {
secao:string
}
export function IndicadorSecao({secao}:GerecProps){
    return(
        <div className="flex self-start">
        <h1 className="pr-4 text-base">{secao}</h1>
        <div className="relative top-[9px] mr-3 h-1 w-7 bg-black"></div>
        <div className="relative top-[9px] h-1 w-7 bg-vermelho-praxis"></div>
      </div>
    );
}