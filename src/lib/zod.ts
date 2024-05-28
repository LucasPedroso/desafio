import { object, string, z } from "zod";

export const signInSchema = object({
  email: string({ message: "Email é obrigatório" })
    .trim()
    .min(1, "Email é obrigatório")
    .email("Invalid email"),
  password: string({ message: "Password é obrigatório" })
    .min(1, "Password é obrigatório")
    .min(8, "Password must be more than 8 characters")
    .max(32, "Password must be less than 32 characters"),
});

export type SignInSchema = z.infer<typeof signInSchema>;

export type SignInFormState =
  | {
      errors?: {
        email?: string[];
        password?: string[];
      };
      message?: string;
    }
  | undefined;

export const profissionalSchema = object({
  profissionalId: string({ message: "Profissional ID é obrigatório" }).cuid(),
  email: string({ message: "Email é obrigatório" })
    .trim()
    .min(1, "Email é obrigatório")
    .email("Invalid email"),
  name: string({ message: "Nome é obrigatório" })
    .trim()
    .min(1, "Nome é obrigatório")
    .min(3, "Nome must be more than 3 characters")
    .max(128, "Name must be less than 128 characters"),
  qualificacoes: z.array(
    string({ message: "Nome deve ser uma palavra" })
      .trim()
      .min(1, "Qualificação é obrigatório"),
  ),
});

export type ProfissionalSchema = z.infer<typeof profissionalSchema>;

export const APIProfissionalSchema = z.object({
  professionalId: z
    .string()
    .trim()
    .min(1, { message: "O ID do profissional é obrigatório" })
    .uuid("O ID do profissional deve ser um UUID válido"),
  user: z.object({
    userId: z
      .string()
      .trim()
      .min(1, { message: "O ID do usuário é obrigatório" })
      .uuid("O ID do usuário deve ser um UUID válido"),
    name: z
      .string()
      .trim()
      .min(1, { message: "O nome do usuário é obrigatório" })
      .min(3, {
        message: "O nome do usuário deve ter pelo menos 3 caracteres",
      }),
    email: z.string().email("O e-mail do usuário é inválido"),
  }),
  qualifications: z.array(
    z.object({
      qualificationId: z
        .string()
        .trim()
        .min(1, { message: "O ID da qualificação é obrigatório" })
        .uuid("O ID da qualificação deve ser um UUID válido"),
      name: z
        .string()
        .trim()
        .min(1, { message: "O nome da qualificação é obrigatório" })
        .min(3, "O nome da qualificação deve ter pelo menos 3 caracteres}"),
    }),
  ),
});
export type APIProfissionalSchemaT = z.infer<typeof APIProfissionalSchema>;

export const ProfissionalFormSchema = z.object({
  professionalId: z
    .string()
    .trim()
    .min(1, { message: "O ID do profissional é obrigatório" })
    .cuid("O ID do profissional deve ser um CUID válido"),
  user: z.object({
    userId: z
      .string()
      .trim()
      .min(1, { message: "O ID do usuário é obrigatório" })
      .cuid("O ID do usuário deve ser um CUID válido"),
    name: z
      .string()
      .trim()
      .min(1, { message: "O nome do usuário é obrigatório" })
      .min(3, {
        message: "O nome do usuário deve ter pelo menos 3 caracteres",
      }),
    email: z.string().trim().email("O e-mail do usuário é inválido"),
  }),
  qualifications: z
    .array(
      z
        .string()
        .trim()
        .min(1, { message: "O nome da qualificação é obrigatório" })
        .min(3, "O nome da qualificação deve ter pelo menos 3 caracteres}"),
    )
    .nonempty({
      message: "É necessário pelo menos 1 qualificação",
    }),
});

export type ProfissionalFormSchemaT = z.infer<typeof ProfissionalFormSchema>;

export const NewProfissionalFormSchema = z.object({
  user: z.object({
    name: z
      .string()
      .trim()
      .min(1, { message: "O nome do usuário é obrigatório" })
      .min(3, {
        message: "O nome do usuário deve ter pelo menos 3 caracteres",
      }),
    email: z.string().trim().email("O e-mail do usuário é inválido"),
  }),
  qualifications: z
    .array(
      z
        .string()
        .trim()
        .min(1, { message: "O nome da qualificação é obrigatório" })
        .min(3, "O nome da qualificação deve ter pelo menos 3 caracteres}"),
    )
    .nonempty({
      message: "É necessário pelo menos 1 qualificação",
    }),
});

export type NewProfissionalFormSchemaT = z.infer<typeof NewProfissionalFormSchema>;