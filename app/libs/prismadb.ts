import { PrismaClient } from "@prisma/client";

declare global {
  var prisma: PrismaClient | undefined
}

/** Nextjs13 热重载会导致新的prisma客户端实例，将client分配给globalThis这样可以不受热重载的影响 **/
/** 这是Nextj和Prisma的最佳实践 **/

const client = globalThis.prisma || new PrismaClient();
if (process.env.NODE_ENV !== "production") {
  globalThis.prisma = client;
}

export default client;