import { ConflictError } from './conflict.error';
import { IPrismaClientError } from './prisma-client.error';

export class UniqueConstraintError extends ConflictError {
  constructor(e: IPrismaClientError) {
    const uniqueField = e.meta.target;

    super(`A record with this ${uniqueField} already exists.`);
  }
}
