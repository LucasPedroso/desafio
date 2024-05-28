import { auth } from "@/auth";
import { db } from "@/lib/db";
import { APISingle } from "@/lib/types/prisma";
import { Prisma } from "@prisma/client";
import { NextAuthRequest } from "next-auth";
import { NextResponse } from "next/server";


async function fetchProfissionais(
  req: NextAuthRequest,
  ctx: { params: { id: string } },
) {

  const data = await db.professional.findFirst({
    where: {
      professionalId: ctx.params.id,
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

  type Profissional = NonNullable<typeof data>;

  const [dataReturn] = [data!].map((profissional: Profissional) => ({
    professionalId: profissional.professionalId,
    user: {
      userId: profissional.user.id,
      name: profissional.user.name,
      email: profissional.user.email,
    },
    qualifications: profissional.qualifications.map((qualification) => ({
      qualificationId: qualification.qualificationId,
      name: qualification.qualification.name,
    })),
  }));

  return NextResponse.json(dataReturn, { status: 200 });
}

export const GET = (req: NextAuthRequest, ctx: { params: { id: string } }) =>
  auth(async () => {
    return fetchProfissionais(req, ctx);
  })(req, ctx);


type ProfissionaisResponse = Prisma.PromiseReturnType<
  typeof fetchProfissionais
>;

export type APIProfissionalId = APISingle<ProfissionaisResponse>

