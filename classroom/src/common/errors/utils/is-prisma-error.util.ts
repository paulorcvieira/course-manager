import { IPrismaClientError } from '../types/prisma-client.error';

export const isPrimaError = (e: IPrismaClientError): boolean => {
  return (
    typeof e.code === 'string' &&
    typeof e.clientVersion === 'string' &&
    (typeof e.meta === 'undefined' || typeof e.meta === 'object')
  );
};
