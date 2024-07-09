import { useEffect } from "react";

export function useDisabePgKey() {
  useEffect(() => {
    function disablePgKeyBug(event: KeyboardEvent) {
      if (["PageUp", "PageDown"].indexOf(event.code) > -1) {
        event.preventDefault();
      }
    }

    window.addEventListener("keydown", disablePgKeyBug);

    return () => {
      window.removeEventListener("keydown", disablePgKeyBug);
    };
  }, []);
}
