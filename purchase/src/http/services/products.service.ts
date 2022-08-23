import { Injectable } from '@nestjs/common';
import slugify from 'slugify';

import { PrismaService } from '../../database/prisma/prisma.service';

import { ICreateProductDTO } from '../dtos/create-product.dto';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  public async listAllProducts() {
    const products = await this.prisma.product.findMany();
    return products;
  }

  public async getProductById(id: string) {
    return this.prisma.product.findUnique({ where: { id } });
  }

  public async createProduct({ title }: ICreateProductDTO) {
    const slug = slugify(title, { lower: true });

    const productWithSameSlug = await this.prisma.product.findUnique({
      where: { slug }
    });

    if (productWithSameSlug) {
      throw new Error('Another product same slug already exists.');
    }

    const product = await this.prisma.product.create({
      data: {
        title,
        slug
      }
    });

    return product;
  }
}
