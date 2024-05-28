"use client";

import { Button } from "@mui/material";
import CircularProgress from '@mui/material/CircularProgress';
import { useFormStatus } from "react-dom";

export function SubmitButton({ text = "Salvar", textPending = 'Salvando', ...rest }) {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" disabled={pending} variant="outlined" {...rest}>
      {pending ? <CircularProgress  /> : text}
    </Button>
  );
}
