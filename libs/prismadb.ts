import { PrismaClient } from '@prisma/client';

declare global {
  var prsima: PrismaClient | undefined;
}

const client = globalThis.prsima || new PrismaClient();

if (process.env.NODE_ENV !== 'production') globalThis.prsima = client;

export default client;
