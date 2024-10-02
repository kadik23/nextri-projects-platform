"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Next13ProgressBar } from "next13-progressbar";
import { type PropsWithChildren, useState } from "react";

const Providers = ({ children }: PropsWithChildren) => {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <div>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
      <Next13ProgressBar
        height="5px"
        color="#003cff0"
        options={{ showSpinner: false }}
        showOnShallow
      />
    </div>
  );
};

export default Providers;
