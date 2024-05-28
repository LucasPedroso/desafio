"use client";

import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import React from "react";

function Providers({ children, session }: { children: React.ReactNode, session: Session | null }) {
  return (
    <SessionProvider session={session}>
      
      <AppRouterCacheProvider>
        {children}
      </AppRouterCacheProvider>
    </SessionProvider>
  );
}

export default Providers;
