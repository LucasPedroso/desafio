import { auth } from "@/auth";

export default async function Layout({
  children,
  user,
  admin,
}: {
  children: React.ReactNode;
  user: React.ReactNode;
  admin: React.ReactNode;
}) {
  const session = await auth();
  
  return (
    <>
      {session?.user?.role === "ADMIN" ? 
      (
        <>
          {admin}
          {children}
        </>
      ) : (
        <>
          {user}
          {children}
        </>
      )}
    </>
  );
}
