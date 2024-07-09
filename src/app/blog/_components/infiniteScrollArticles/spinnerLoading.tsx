import React from "react";

const SpinnerLoading = () => {
  return (
    <div
      className="inline-block size-8 animate-spin rounded-full border-4 border-solid border-off-black/30 border-r-black"
      role="status"
    />
  );
};

export default SpinnerLoading;
