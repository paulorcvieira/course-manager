import { PrismaClientKnownRequestError } from '@prisma/client/runtime';

type MetaProps = {
  target: string;
};

export interface IPrismaClientError extends PrismaClientKnownRequestError {
  meta?: MetaProps;
}
