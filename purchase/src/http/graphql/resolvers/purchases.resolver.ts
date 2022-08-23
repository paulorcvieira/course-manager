import { UseGuards } from '@nestjs/common';
import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver
} from '@nestjs/graphql';

import { AuthorizationGuard } from '../../auth/authorization.guard';
import { CurrentUser } from '../../auth/current-user';

import { CreatePurchaseInput } from '../inputs/create-purchase.input';

import { ProductsService } from '../../services/products.service';
import { PurchasesService } from '../../services/purchases.service';

import { Purchase } from '../models/purchase.model';

import { IAuthUserDTO } from '../../dtos/auth-user.dto';

@Resolver(() => Purchase)
export class PurchasesResolver {
  constructor(
    private purchasesService: PurchasesService,
    private productsService: ProductsService
  ) {}

  @UseGuards(AuthorizationGuard)
  @Query(() => [Purchase])
  purchases() {
    return this.purchasesService.listAllPurchases();
  }

  @ResolveField()
  product(@Parent() purchase: Purchase) {
    return this.productsService.getProductById(purchase.productId);
  }

  @UseGuards(AuthorizationGuard)
  @Mutation(() => Purchase)
  async createPurchase(
    @Args('data') data: CreatePurchaseInput,
    @CurrentUser() user: IAuthUserDTO
  ) {
    return this.purchasesService.createPurchase({
      authUserId: user.sub,
      productId: data.productId
    });
  }
}
