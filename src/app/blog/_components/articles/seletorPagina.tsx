import Link from "next/link";
import { MoveLeft, MoveRight } from "lucide-react";

export const SeletorPagina = {
  Break: SeletorBreak,
  Paginas: SeletorPaginas,
};

function SeletorBreak() {
  return <div className="mx-auto h-[1px] w-11/12 bg-off-black" />;
}

function SeletorPaginas({
  qtdPaginas,
  page,
  categoria,
  date,
  search,
}: {
  qtdPaginas: number;
  page: string;
  categoria: string;
  date: string;
  search: string;
}) {
  const pageAtual = parseInt(page);

  return (
    <div className="mx-auto mt-4 grid w-11/12 grid-cols-7 items-center justify-between gap-y-2">
      <div className="row-start-2 flex justify-start md:row-start-1">
        {pageAtual - 1 >= 1 && qtdPaginas && (
          <Link
            href={`?${new URLSearchParams({ categoria, date, search, page: (pageAtual - 1).toString() }).toString()}`}
            className="flex max-w-min items-center gap-2 rounded-xl border px-2 py-1 font-noto text-lg"
          >
            <MoveLeft size={36} />
            Anterior
          </Link>
        )}
      </div>
      <div className="col-span-7 flex justify-center gap-2 text-xl md:col-span-5">
        {Math.abs(pageAtual) > 5 && "..."}
        {[...Array(qtdPaginas).keys()].map((numPage, index) => {
          const stringPage = (numPage + 1).toString();
          return Math.abs(numPage + 1 - pageAtual) <= 5 ? (
            <Link
              key={index}
              href={`?${new URLSearchParams({ categoria, date, search, page: stringPage }).toString()}`}
              className={`${numPage + 1 == pageAtual ? "font-bold" : "text-gray-600"} font-noto`}
            >
              {stringPage}
            </Link>
          ) : (
            ""
          );
        })}
        {Math.abs(pageAtual - qtdPaginas) > 5 && "..."}
      </div>
      <div className="col-start-7 row-start-2 flex justify-end">
        {pageAtual + 1 <= qtdPaginas && (
          <Link
            href={`?${new URLSearchParams({ categoria, date, search, page: (pageAtual + 1).toString() }).toString()}`}
            className="flex max-w-min items-center gap-2 rounded-xl border px-2 py-1 font-noto text-lg"
          >
            Próximo
            <MoveRight size={36} />
          </Link>
        )}
      </div>
    </div>
  );
}
