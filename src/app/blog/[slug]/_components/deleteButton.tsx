"use client";

import { Button } from "~/components/ui/button";

export function DeleteButton({ children }: React.PropsWithChildren) {
  return (
    <Button className="shadow-md transition-shadow duration-100 ease-in-out hover:shadow-lg">
      {children}
    </Button>
  );
}
