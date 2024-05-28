"use client";

import React, { useEffect, useState } from "react";

const fetchSession = async () => {
  const response = await fetch("/api/auth/session");
  const session = await response.json();
  return session;
};
export default function OnlyAdminOrBlank({
  children,
}: {
  children: React.JSX.Element;
}) {
  const [role, setRole] = useState<string | undefined>(undefined);

  useEffect(() => {
    (async () => {
      await fetch("/api/auth/session")
        .then((res) => res.json())
        .then((session) => {
          setRole(session?.user?.role);
        })
        .catch((err) => {
          setRole(undefined);
        });
    })();
  });

  if (role === "ADMIN") {
    return <>{children}</>;
  }

  return <></>;
}
