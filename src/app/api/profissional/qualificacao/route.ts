import { auth } from "@/auth";
import { db } from "@/lib/db";
import { Prisma, Qualification } from "@prisma/client";
import { NextResponse } from "next/server";


const fetchQualificacoes = async () => {
  const data = await db.qualification.findMany({
    select: {
      qualificationId: true,
      name: true,
    },
  });
  return NextResponse.json(data, { status: 200 });
};

type QualificacoesResponse = Prisma.PromiseReturnType<
  typeof fetchQualificacoes
>;
type GetQualificacoes<T> = T extends NextResponse<infer U> ? U : never;
type Qualificacoes = GetQualificacoes<QualificacoesResponse>;
type Single<T> = T extends (infer U)[] ? U : never;
export type Qualificacao = Single<Qualificacoes>;

export const GET = auth(fetchQualificacoes);

export const PUT = auth(async function PUT(req) {
  const body = await req.json();

  let qualifications: Qualification[];
  try {
    qualifications = await Promise.all(
      body.map(async (qualificacao: string) => {
        const createdQualification = await db.qualification.upsert({
          where: { name: qualificacao },
          create: { name: qualificacao },
          update: { name: qualificacao },
        });
        return { qualificationId: createdQualification.qualificationId, name: createdQualification.name };
      }),
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(error, { status: 422 });
  }

  return NextResponse.json(qualifications, { status: 200 });
});
