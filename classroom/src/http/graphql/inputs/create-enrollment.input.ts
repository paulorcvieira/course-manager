import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class CreateEnrollmentInput {
  @Field()
  @IsString()
  @IsNotEmpty()
  courseId: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  studentId: string;
}
