"use client";
import { Search } from "lucide-react";
import { type BlogFilterParams } from "../page";
import { useRouter } from "next/navigation";
import { useSearch } from "~/hooks/useSearch";

export function SearchBar({
  filterParams,
}: {
  filterParams: BlogFilterParams;
}) {
  const router = useRouter();

  const handleChange = useSearch((search) => {
    router.push(
      "?" + new URLSearchParams({ ...filterParams, search }).toString(),
      { scroll: false },
    );
  });

  return (
    <div className="mx-8 -mt-7 mb-12 flex w-[80%] max-w-xl flex-col self-center lg:mx-36">
      <input
        placeholder={"Pesquise pelo artigo"}
        defaultValue={filterParams.search}
        name="search"
        type="text"
        className="h-14 w-full rounded pl-6 pr-12 shadow-md outline-none transition-all ease-in-out focus:shadow-lg"
        onChange={handleChange}
      />
      <Search
        size={24}
        className="absolute my-4 mr-6 self-end bg-white opacity-70"
      />
    </div>
  );
}
