import { ProfissionalForm } from "@/components/profissionalForm";
import { Skeleton } from "@mui/material";

export default function Loading() {
  return (
    <>
      <Skeleton variant="rounded" >
        <ProfissionalForm />
      </Skeleton>
    </>
  );
}
