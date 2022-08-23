import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class CreatePurchaseInput {
  @Field()
  @IsString()
  @IsNotEmpty()
  productId: string;
}
