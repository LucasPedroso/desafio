import { auth } from "@/auth";
import { db } from "@/lib/db";
import { Prisma } from "@prisma/client";
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
