import { ProfissionalId } from "@/components/profissionalId";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Editar Profissional",
};

const fetchProfissional = async (id: string) => {
  const response = await fetch(`http://localhost:3000/api/profissional/${id}`);
  const data = await response.json();
  return data;
};

const ProfissionalPage = async ({
  params: { id },
}: {
  params: { id: string };
}) => {
  const profissional = await fetchProfissional(id);

  return <ProfissionalId profissional={profissional} />;
};

export default ProfissionalPage;
