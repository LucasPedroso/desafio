import { auth } from "@/auth";
import { db } from "@/lib/db";
import { APIArrayToSingle } from "@/lib/types/prisma";
import { Prisma } from "@prisma/client";
import { NextAuthRequest } from "next-auth";
import { NextResponse } from "next/server";


async function fetchProfissionais(req: NextAuthRequest) {

  const data = await db.professional.findMany({
    select: {
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
          professionalId: true,
          qualificationId: true,
          qualification: { select: { name: true } },
        },
      },
    },
  });

  try {
    const dataReturn = data.map((professional) => ({
      professionalId: professional.qualifications?.[0].professionalId,
      user: {
        userId: professional.user.id,
        name: professional.user.name,
        email: professional.user.email,
      },
      qualifications: professional?.qualifications.map((qualification) => ({
        qualificationId: qualification.qualificationId,
        name: qualification.qualification.name,
      })),
    }));
    return NextResponse.json(dataReturn, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: 'Não foi possível buscar os profissionais' }, { status: 422 });
  }
}

export const GET = auth(fetchProfissionais);

type ProfissionaisResponse = Prisma.PromiseReturnType<
  typeof fetchProfissionais
>;

export type APIProfissional = APIArrayToSingle<ProfissionaisResponse>

export const PUT = auth(async function PUT(req) {

  const body = (await req.json()) as APIProfissional;

  const user = body.user;
  const professionalId = body.professionalId;
  const qualifications = body.qualifications;

  let professionalUpdate;

  try {
    await db.professional.update({
      where: {
        professionalId: professionalId,
      },
      data: {
        user: {
          update: {
            name: user.name,
            email: user.email,
          },
        },
      },
    });

    await db.qualificationsOnProfessional.deleteMany({
      where: {
        professionalId,
      },
    });

    await db.qualificationsOnProfessional.createMany({
      data: qualifications.map((qualifications) => ({
        professionalId,
        qualificationId: qualifications.qualificationId,
      })),
    });

    professionalUpdate = await db.professional.findUnique({
      where: {
        professionalId: professionalId,
      },
      include: {
        qualifications: {
          include: {
            qualification: {
              select: {
                qualificationId: true,
                name: true,
              },
            },
          },
        },
      },
    });
  } catch (error) {
    return NextResponse.json(
      { message: "Erro ao atulizar profissional", error },
      { status: 422 },
    );
  }

  return NextResponse.json(
    { message: "OK", professional: professionalUpdate },
    { status: 200 },
  );
});
