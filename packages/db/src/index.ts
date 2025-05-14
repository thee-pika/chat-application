import { PrismaClient } from "./generated/prisma";

const prismaClientSingleton = () => {
    return new PrismaClient();
}

type prismClientT = ReturnType<typeof prismaClientSingleton>;

const globalPrismaClient = globalThis as unknown as {
    prisma: prismClientT | undefined;
}

const prisma = globalPrismaClient.prisma || prismaClientSingleton();

export default prisma;

if(process.env.NODE_ENV !== "production") {
    globalPrismaClient.prisma = prisma;
}

