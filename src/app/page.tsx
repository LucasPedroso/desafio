import { auth } from "@/auth";
import { Alert } from "@mui/material";

export default async function Home() {

  const session = await auth()
  
  return (
    <main>
      <Alert severity="info">
        <p>Esta página nunca será renderizada.</p>
        <p>O motivo é que configurei para caso não esteja logado, redirecione para a página de login (/app/middleware.ts)</p>
        <p>E caso esteja logado, redirecione para a página de profissionais</p>
      </Alert>
      <p>Welcome {session?.user?.name || 'Guest User'}!</p>
      <h1>{JSON.stringify(session, null, 2)}</h1>
    </main>
  );
}
