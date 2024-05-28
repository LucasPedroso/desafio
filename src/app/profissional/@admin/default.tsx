import { Alert } from "@mui/material";

export default function Default() {
  return (
  <Alert severity="info">
    <p>Quando reloga a página ex: /profissional/123, o NextJS vai renderizar o componente default.tsx no lugar que tem o &quot;slot&quot;</p>
    <p>/profssional/[id]/@admin/default.tsx</p>
    <p>Que no caso é este conteúdo!!!</p>
    <p>Posso deixar o default.tsx com return null, para não renderizar nada. Também posso deixar com o mesmo conteúdo do page.tsx para serem sempre iguais.</p>
  </Alert>
  )
}