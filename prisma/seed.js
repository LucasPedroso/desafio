const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  await prisma.user.upsert({
    where: { email: "admin@admin.com" },
    create: {
      email: "admin@admin.com",
      name: "Admin",
      password: "adminadmin",
      role: "ADMIN",
    },
    update: {
      password: "adminadmin",
    },
  });

  await prisma.user.upsert({
    where: { email: "user@user.com" },
    create: {
      email: "user@user.com",
      name: "User",
      password: "useruser",
    },

    update: {
      password: "adminadmin",
    },
  });

  const qualifications = [
    { name: "Odontologia" },
    { name: "Cardiologia" },
    { name: "Pediatria" },
    { name: "Medicina" },
    { name: "Neurologia" },
    { name: "Ortopedia" },
    { name: "Oftalmologia" },
    { name: "Urologia" },
    { name: "Cirurgia" },
  ];
  const qualificationsIds = await Promise.all(
    qualifications.map(async (qualification) => {
      const createdQualification = await prisma.qualification.upsert({
        where: { name: qualification.name },

        create: qualification,
        update: qualification,
      });
      return createdQualification.id;
    }),
  );

  await prisma.user.upsert({
    where: {
      email: "sofia.rodrigues@gmail.com"
    },
    create: {
      email: "sofia.rodrigues@gmail.com",
      name: "Dra. Sofia Rodrigues",
      password: "password",
      professional: {
        create: {
          qualifications: {
            create: {
              qualification: {
                connect: {
                  name: "Medicina"
                }
              }
            }
          }
        }
      }
    },
    update: {}
  })
  
  await prisma.user.upsert({
    where: {
      email: "leonardo.silva@gmail.com"
    },
    create: {
      email: "leonardo.silva@gmail.com",
      name: "Dr. Leonardo Silva",
      password: "password",
      professional: {
        create: {
          qualifications: {
            create: {
              qualification: {
                connect: {
                  name: "Cirurgia"
                }
              }
            }
          }
        }
      }
    },
    update: {}
  })
  
  await prisma.user.upsert({
    where: {
      email: "ana.luiza.costa@gmail.com"
    },
    create: {
      email: "ana.luiza.costa@gmail.com",
      name: "Dra. Ana Luiza Costa",
      password: "password",
      professional: {
        create: {
          qualifications: {
            create: {
              qualification: {
                connect: {
                  name: "Pediatria"
                }
              }
            }
          }
        }
      }
    },
    update: {}
  })
  
  await prisma.user.upsert({
    where: {
      email: "joao.pedro.santos@gmail.com"
    },
    create: {
      email: "joao.pedro.santos@gmail.com",
      name: "Dr. João Pedro Santos",
      password: "password",
      professional: {
        create: {
          qualifications: {
            create: {
              qualification: {
                connect: {
                  name: "Ortopedia"
                }
              }
            }
          }
        }
      }
    },
    update: {}
  })
  
  await prisma.user.upsert({
    where: {
      email: "maria.eduarda.oliveira@gmail.com"
    },
    create: {
      email: "maria.eduarda.oliveira@gmail.com",
      name: "Dra. Maria Eduarda Oliveira",
      password: "password",
      professional: {
        create: {
          qualifications: {
            create: {
              qualification: {
                connect: {
                  name: "Odontologia"
                }
              }
            }
          }
        }
      }
    },
    update: {}
  })
}




main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
