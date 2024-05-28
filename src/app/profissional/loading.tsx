import Profissionais from "@/components/profissionais";
import { Skeleton } from "@mui/material";

export default function Loading() {
  return (
    <>
      <Skeleton variant="rounded" animation="pulse">
        <Profissionais profissionais={[]} />
      </Skeleton>
    </>
  );
}
