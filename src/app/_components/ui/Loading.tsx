import React from "react";

const Loading = () => {
  return (
    <div className="mx-auto flex h-full w-full items-center justify-center">
      <div className="h-12 w-12 animate-spin rounded-full border-t-4 border-blue-500 border-t-blue-400"></div>
    </div>
  );
};

export default Loading;
