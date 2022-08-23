import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { AuthorizationGuard } from '../../auth/authorization.guard';
import { CurrentUser } from '../../auth/current-user';

import { CoursesService } from '../../../services/courses.service';

import { CreateCourseInput } from '../inputs/create-course.input';

import { Course } from '../models/course.model';

import { IAuthUserDTO } from '../../dtos/auth-user.dto';

@Resolver(() => Course)
export class CoursesResolver {
  constructor(private coursesService: CoursesService) {}

  @Query(() => [Course])
  @UseGuards(AuthorizationGuard)
  courses() {
    return this.coursesService.listAllCourses();
  }

  @Query(() => Course)
  @UseGuards(AuthorizationGuard)
  async course(@Args('id') id: string, @CurrentUser() user: IAuthUserDTO) {
    return this.coursesService.getCourseByIdWithAuthUserId(id, user.sub);
  }

  @Mutation(() => Course)
  @UseGuards(AuthorizationGuard)
  createCourse(@Args('data') data: CreateCourseInput) {
    return this.coursesService.createCourse(data);
  }
}
