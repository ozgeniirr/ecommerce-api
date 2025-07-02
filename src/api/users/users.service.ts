import prisma from "@/config/prisma";

export const getProfileService = async (userId: number) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      email: true,
      // Buraya başka alanlar eklenecekse ekleyebilirsin.
    },
  });

  return user;
};
