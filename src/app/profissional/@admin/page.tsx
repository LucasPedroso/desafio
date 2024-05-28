import { Alert, Typography } from "@mui/material";

export default function ProfissionalAdmin() {
  return (
    <Alert severity="info">
      <Typography>
        Rotas paralelas permitem renderizar simultâneamente ou condicionalmente uma
        ou mais páginas dentro do mesmo layout. Eles são úteis para seções
        altamente dinâmicas de um aplicativo, como painéis e feeds em sites
        sociais.
      </Typography>
      <Typography>Os slots são definidos com a @folder convenção</Typography>
      <Typography>
        Este &quot;slot&quot; só está sendo renderizado por que é um admin
        logado (role=ADMIN).
      </Typography>
      <Typography>
        Na pasta /profissonal tem @admin com um page.tsx, observe que no
        RootLayout(/app/layout.tsx) está com a lógica para renderizar este slot
        apenas quando um admin está logado.
      </Typography>
      <Typography>
        Caso eu acesse com um usuário normal (role=USER), será renderizado o slo
        @user(/profissional/@user/page.tsx).
      </Typography>
      <Typography>
        Esse conteúdo (/profissional/@admin/page.tsx) só é renderizado quando a
        navegação parte de (/profissional).
      </Typography>
      <Typography>
        Se a navegação for de (/profissional/...), será renderizado o conteúdo
        (/profissional/@admin/default.tsx).
      </Typography>
    </Alert>
  );
}
