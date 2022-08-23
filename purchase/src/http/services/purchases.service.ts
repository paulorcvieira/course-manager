import { Injectable } from '@nestjs/common';

import { NotFoundError } from '../../common/errors/types';

import { PrismaService } from '../../database/prisma/prisma.service';
import { CustomersService } from './customers.service';

import { KafkaService } from '../../messaging/kafka.service';
import { ICreatePurchaseDTO } from '../dtos/create-purchase.dto';

@Injectable()
export class PurchasesService {
  constructor(
    private prisma: PrismaService,
    private customersService: CustomersService,
    private kafka: KafkaService
  ) {}

  public async listAllPurchases() {
    const purchases = await this.prisma.purchase.findMany({
      orderBy: { createdAt: 'desc' }
    });
    return purchases;
  }

  public async listAllPurchasesFromCustomer(customerId: string) {
    return this.prisma.purchase.findMany({
      where: { customerId }
    });
  }

  public async createPurchase({ productId, authUserId }: ICreatePurchaseDTO) {
    let customer = await this.customersService.getCustomerByAuthUserId(
      authUserId
    );

    if (!customer) {
      customer = await this.customersService.createCustomer({ authUserId });
    }

    const product = await this.prisma.product.findUnique({
      where: { id: productId }
    });

    if (!product) {
      throw new NotFoundError('Product not found.');
    }

    const purchase = await this.prisma.purchase.create({
      data: {
        customerId: customer.id,
        productId
      }
    });

    this.kafka.emit('pruchases.new-purchase', {
      customer: {
        authUserId: customer.authUserId
      },
      product: {
        id: product.id,
        title: product.title
      }
    });

    return purchase;
  }
}
