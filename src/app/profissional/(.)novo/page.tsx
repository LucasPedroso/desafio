"use server";
import { ProfissionalForm } from "@/components/profissionalForm";
import { Alert } from "@mui/material";

const ProfessionalsPage = async () => {
  return (
    <>
      <Alert severity="info">
        <p>Esta rota está sendo interceptada a partir de /profissional.</p>
        <p>Na pasta /profissonal tem /novo e (.)novo .</p>
        <p>
          Quando acesso a partir de profissional o href=/profssional/novo, ele
          usa a interceptação de rotas por que tenho o (.)novo dentro de
          profissional, usando o page.tsx do /profisisonal/(.)novo .
        </p>
        <p>
          Porém se eu acessar o endereço /profissional/novo ou recarregar a
          página, ele usará o page.tsx da rota normal.
        </p>
      </Alert>
      <ProfissionalForm />
    </>
  );
};

export default ProfessionalsPage;
