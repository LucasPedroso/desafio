"use client";
import Qualifications from "@/components/qualifications";
import { createProfessional } from "@/lib/actions/actions";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import {
  Alert,
  AlertTitle,
  Grid,
  Paper,
  TextField,
  Typography
} from "@mui/material";
import { Qualification } from "@prisma/client";
import { useEffect, useRef, useState } from "react";
import { useFormState } from "react-dom";
import { toast } from "react-hot-toast";
import { SubmitButton } from "./submitButton";
import ToastFormStatus from "./toastFormStatus";

export const ProfissionalForm = ({
  children,
}: {
  children?: React.ReactNode;
}) => {
  const [tab, setTab] = useState("1");

  const qualificacoes: Qualification[] = []

  const [state, formAction] = useFormState(createProfessional, {
    success: false,
    message: "",
  });


  let toastId = useRef("");

  useEffect(() => {
    if (state?.success && state?.data) {
      toastId.current = toast.custom((t) => {
        setTimeout(() => {
          toast.remove(t.id);
        }, 8000);
        return (
          <div
            className={`${
              t.visible ? "animate-enter" : "animate-leave"
            } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
          >
            <div className="flex-1 w-0 p-4">
              <div className="flex items-start">
                <CheckCircleIcon className="flex-shrink-0 w-6 h-6 text-green-400" />
                <div className="flex-1 ml-3">
                  <p className="text-sm font-medium text-gray-900">
                    {state.data?.user.name}
                  </p>
                  {state.data?.qualifications.map((qual) => (
                    <span
                      key={qual.qualificationId}
                      className="block mt-1 text-sm text-gray-500"
                    >
                      {qual.name}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex border-l border-gray-200">
              <button
                onClick={() => {
                  toast.dismiss(t.id); // parou de funcionar como deveria
                  toast.remove(t.id);
                }}
                className="flex items-center justify-center w-full p-4 text-sm font-medium text-indigo-600 border border-transparent rounded-none rounded-r-lg hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                Close
              </button>
            </div>
          </div>
        );
      });
    }
  }, [state.data, state.success, state.error]);

  return (
    <div>
    <form action={formAction} className="mt-4">
      <ToastFormStatus />
      <input type="hidden" name="userId" value={''} />
      <Grid container spacing={2} px={0}>
        <Grid item xs={12} px={0}>
          <Paper elevation={3}>
            <Grid container spacing={2} px={5}>
              <Grid item xs={12}>
                <Typography variant="h4">Cadastro de Profissional</Typography>
              </Grid>
             
              <Grid item xs={12}>
                <TextField
                  id="name"
                  name="name"
                  fullWidth
                  label="Nome"
                  defaultValue={''}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="email"
                  name="email"
                  fullWidth
                  label="Email"
                  defaultValue={''}
                  aria-readonly
                />
              </Grid>
              <Grid item xs={12}>
                <Qualifications qualifications={qualificacoes} />

                {state?.error && (
                  <Alert severity="error" sx={{ mt: 2 }}>
                    <AlertTitle>Error</AlertTitle>
                    <ul>
                      {state.error.professionalId?.map(
                        (error: string, index: number) => {
                          return <li key={error}>{error}</li>;
                        },
                      )}
                      {state.error.user?.map((error: string, index: number) => {
                        return <li key={error}>{error}</li>;
                      })}
                      {state.error.qualifications?.map(
                        (error: string, index: number) => {
                          return <li key={error}>{error}</li>;
                        },
                      )}
                    </ul>
                  </Alert>
                )}
              </Grid>
              <Grid item xs={12}>
                <SubmitButton text="Cadastrar" />
              </Grid>
              <Grid item xs={12}></Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </form>
    </div>
  );
};
