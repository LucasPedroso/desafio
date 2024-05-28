import { Alert } from "@mui/material";

export default function ProfissionalAdmin() {
  return (
    <Alert severity="info">
      <p>
        Slot do (/profissional/[id]/@admin/page.tsx) que foi configurado no
        (profissional/[id]/layout.tsx)
      </p>
    </Alert>
  );
}
