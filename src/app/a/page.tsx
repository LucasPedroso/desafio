import { ProfissionalForm } from "@/components/profissionalForm";
import { Skeleton } from "@mui/material";

export default function Loading() {
  return (
    <>
      <Skeleton variant="text" sx={{ fontSize: "1rem" }} />

      <Skeleton variant="circular" width={40} height={40} />
      <Skeleton variant="rectangular" width={210} height={60} />
      <p>a</p>
      <Skeleton variant="rounded" >
        <ProfissionalForm />
      </Skeleton>
    </>
  );
}
