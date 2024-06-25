import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";

export function useSearch(callback: (search: string) => void) {
  const [text, setText] = useState("");
  const [search] = useDebounce(text, 500);

  function handleChangeSearchBar(ev: React.ChangeEvent<HTMLInputElement>) {
    setText(ev.target.value);
  }

  useEffect(() => {
    callback(search);
  }, [search, callback]);

  return handleChangeSearchBar;
}
