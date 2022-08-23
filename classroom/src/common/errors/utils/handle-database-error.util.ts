import { DatabaseError } from '../types/database.error';
import { IPrismaClientError } from '../types/prisma-client.error';
import { UniqueConstraintError } from '../types/unique-constraint.error';

enum PrismaErrors {
  UniqueConstraintFail = 'P2002'
}

export const handleDatabaseErrors = (e: IPrismaClientError): Error => {
  switch (e.code) {
    case PrismaErrors.UniqueConstraintFail:
      return new UniqueConstraintError(e);

    default:
      return new DatabaseError(e.message);
  }
};
