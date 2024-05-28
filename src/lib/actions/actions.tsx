"use server";

import { APIProfissional } from "@/app/api/profissional/route";
import { Qualification } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { db } from "../db";
import {
  NewProfissionalFormSchema,
  ProfissionalFormSchema,
  ProfissionalFormSchemaT,
} from "../zod";

export type UpdateProfissional = {
  professionalId: string;
  user: {
    name: string;
    email: string;
  };
  qualifications: {
    id: string;
    name: string;
  }[];
};

export type CurrenteStatePure = {
  success: boolean;
  message: string;
  error?: any;
  data?: APIProfissional;
};

export type CurrentState = CurrenteStatePure & {
  history?: CurrenteStatePure[];
};

export const createProfessional = async (
  currentState: CurrenteStatePure,
  formData: FormData,
): Promise<CurrenteStatePure> => {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const qualificacoes = formData.getAll("qualification") as string[];

  const { success, data, error } = NewProfissionalFormSchema.safeParse({
    user: {
      name,
      email,
    },
    qualifications: qualificacoes,
  });

  if (!success) {
    return {
      success,
      message: "Profissional não pode ser criado.",
      error: error.flatten().fieldErrors,
    };
  }

  const userExists = await db.user.findUnique({
    where: {
      email: data.user.email,
    },
  });

  if (userExists) {
    return {
      success: false,
      message: "Usuário já existe.",
      error: { user: ["Usuário com este email já existe."] },
    };
  }

  const responseQualificacoes = await fetch(
    "http://localhost:3000/api/profissional/qualificacao",
    {
      method: "PUT",
      body: JSON.stringify(qualificacoes),
      next: { tags: ["/api/qualificacao"] },
    },
  );

  if (responseQualificacoes.ok) {
    const qualifications = await responseQualificacoes.json();

    const professional = await db.professional.create({
      data: {
        user: {
          create: {
            name: data.user.name,
            email: data.user.email,
            password: "password",
          },
        },
        qualifications: {
          createMany: {
            data: qualifications.map((qualification: Qualification) => ({
              qualificationId: qualification.qualificationId,
            })),
          },
        },
      },
      select: {
        professionalId: true,
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        qualifications: {
          select: {
            id: true,
            qualificationId: true,
            qualification: { select: { name: true } },
          },
        },
      },
    });

    const newProfessional = {
      professionalId: professional.professionalId,
      user: {
        userId: professional.user.id,
        name: professional.user.name,
        email: professional.user.email,
      },
      qualifications: professional?.qualifications.map((qualification) => ({
        qualificationId: qualification.qualificationId,
        name: qualification.qualification.name,
      })),
    };

    revalidatePath("/profissional", "layout");

    return {
      success: true,
      message: "Profissional criado com sucesso",
      data: newProfessional,
    };
  }

  return {
    success: false,
    message: "Profissional não pode ser criado",
  };
};

export const updateProfissional = async (
  currentState: CurrentState,
  formData: FormData,
): Promise<CurrentState> => {
  try {
    let newState = {
      ...(Object.fromEntries(
        Object.entries(currentState).filter(([k, v]) => k !== "history"),
      ) as CurrenteStatePure),
    };

    const userId = formData.get("userId") as string;
    const professionalId = formData.get("professionalId") as string;
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const qualificacoes = formData.getAll("qualification") as string[];

    const { success, data, error } = ProfissionalFormSchema.safeParse({
      professionalId,
      user: {
        userId,
        name,
        email,
      },
      qualifications: qualificacoes,
    } as ProfissionalFormSchemaT);

    if (!success) {
      return {
        success,
        message: "Profissional não pode ser atualizado.",
        history: [...(currentState.history || [])],
        error: error.flatten().fieldErrors,
      };
    }

    // nao precisa chamar a api dentro da action, pode acessar diretamente recursos do servidor, ex: prisma.qualificacao.update(...)
    // nao precisa chamar a api dentro da action, pode acessar diretamente recursos do servidor, ex: prisma.qualificacao.update(...)
    // nao precisa chamar a api dentro da action, pode acessar diretamente recursos do servidor, ex: prisma.qualificacao.update(...)
    // nao precisa chamar a api dentro da action, pode acessar diretamente recursos do servidor, ex: prisma.qualificacao.update(...)

    const responseQualificacoes = await fetch(
      "http://localhost:3000/api/profissional/qualificacao",
      {
        method: "PUT",
        body: JSON.stringify(qualificacoes),
        next: { tags: ["/api/qualificacao"] },
      },
    );

    if (responseQualificacoes.ok) {
      const qualifications = await responseQualificacoes.json();

      const profissional: APIProfissional = {
        professionalId: professionalId,
        user: {
          userId: userId,
          name: name,
          email: email,
        },
        qualifications,
      };

      const responseProfissional = await fetch(
        "http://localhost:3000/api/profissional",
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(profissional),
        },
      );

      revalidatePath("/profissional");
      revalidatePath(`/profissional/[id]`, "layout");

      if (!Reflect.has(newState, "data")) {
        return {
          success: true,
          message: "Profissional atualizado com sucesso",
          data: profissional,
          history: [...(currentState.history || [])],
        };
      }

      return {
        success: true,
        message: "Profissional atualizado com sucesso",
        data: profissional,
        history: [...(currentState.history || []), newState],
      };
    }
  } catch (error) {
    console.log("ERROR", error);
  }

  return {
    success: false,
    message: "Erro ao atualizar a profissional",
  };
};
