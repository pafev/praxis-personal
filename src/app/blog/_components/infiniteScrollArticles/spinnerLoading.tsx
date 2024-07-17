import React from "react";
import { cn } from "~/lib/utils";

const SpinnerLoading = ({ className }: { className?: string }) => {
  return (
    <div
      className={cn(
        "inline-block size-8 animate-spin rounded-full border-4 border-solid border-off-black/30 border-r-black",
        className,
      )}
      role="status"
    />
  );
};

export default SpinnerLoading;
