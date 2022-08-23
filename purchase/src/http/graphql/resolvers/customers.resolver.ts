import { UseGuards } from '@nestjs/common';
import {
  Parent,
  Query,
  ResolveField,
  Resolver,
  ResolveReference
} from '@nestjs/graphql';

import { AuthorizationGuard } from '../../auth/authorization.guard';
import { CurrentUser } from '../../auth/current-user';

import { CustomersService } from '../../services/customers.service';
import { PurchasesService } from '../../services/purchases.service';

import { Customer } from '../models/customer.model';

import { IAuthUserDTO } from '../../dtos/auth-user.dto';

@Resolver(() => Customer)
export class CustomersResolver {
  constructor(
    private customersService: CustomersService,
    private purchasesService: PurchasesService
  ) {}

  @UseGuards(AuthorizationGuard)
  @Query(() => Customer)
  me(@CurrentUser() user: IAuthUserDTO) {
    return this.customersService.getCustomerByAuthUserId(user.sub);
  }

  @ResolveField()
  purchases(@Parent() customer: Customer) {
    return this.purchasesService.listAllPurchasesFromCustomer(customer.id);
  }

  @ResolveReference()
  resolveReference(reference: { authUserId: string }) {
    return this.customersService.getCustomerByAuthUserId(reference.authUserId);
  }
}
