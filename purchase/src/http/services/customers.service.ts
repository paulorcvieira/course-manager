import { Injectable } from '@nestjs/common';

import { PrismaService } from '../../database/prisma/prisma.service';

import { ICreateCustomerDTO } from '../dtos/create-customer.dto';

@Injectable()
export class CustomersService {
  constructor(private prisma: PrismaService) {}

  public async getCustomerByAuthUserId(authUserId: string) {
    return this.prisma.customer.findUnique({ where: { authUserId } });
  }

  public async createCustomer({ authUserId }: ICreateCustomerDTO) {
    return this.prisma.customer.create({
      data: {
        authUserId
      }
    });
  }
}
