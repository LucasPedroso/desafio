"use server";
import { APIProfissional } from "@/app/api/profissional/route";
import Profissionais from "@/components/profissionais";

const fetchProfessionais = async () => {
  const response = await fetch(
    "http://localhost:3000/api/profissional" /* { method: 'GET' ,cache: 'no-cache' } */,
  );

  const data = (await response.json()) as APIProfissional[];
  return data;
};

const ProfessionalsPage = async () => {
  const profissionais = await fetchProfessionais();

  return <Profissionais profissionais={profissionais} />;
};

export default ProfessionalsPage;
