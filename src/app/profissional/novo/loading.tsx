import { ProfissionalId } from "@/components/profissionalId";
import { Skeleton } from "@mui/material";

export default function Loading() {
  const profissional = {
    professionalId: '',
    user: {
      userId: '',
      name: '',
      email: ''
    },
    qualifications: [
      {
        qualificationId: '',
        name: ''
      }
    ]
  }
  return (
    
    
      <Skeleton variant="rounded">
        <ProfissionalId profissional={profissional} />
      </Skeleton>
  );
}
