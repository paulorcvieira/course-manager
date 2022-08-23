import { Injectable, UnauthorizedException } from '@nestjs/common';
import slugify from 'slugify';

import { ConflictError } from '../common/errors/types';

import { PrismaService } from '../database/prisma/prisma.service';
import { EnrollmentsService } from './enrollments.service';
import { StudentsService } from './students.service';

import { ICreateCourseDTO } from '../http/dtos/create-course.dto';

@Injectable()
export class CoursesService {
  constructor(
    private prisma: PrismaService,
    private studentsService: StudentsService,
    private enrollmentsService: EnrollmentsService
  ) {}

  public async listAllCourses() {
    return this.prisma.course.findMany({
      orderBy: {
        title: 'asc'
      }
    });
  }

  public async getCourseById(courseId: string) {
    return this.prisma.course.findUnique({
      where: {
        id: courseId
      }
    });
  }

  public async getCourseByIdWithAuthUserId(
    courseId: string,
    authUserId: string
  ) {
    const student = await this.studentsService.getStudentByAuthUserId(
      authUserId
    );

    if (!student) {
      throw new Error('Student not found');
    }

    const enrollment = await this.enrollmentsService.getByCourseAndStudentId({
      courseId,
      studentId: student.id
    });

    if (!enrollment) {
      throw new UnauthorizedException();
    }

    return this.prisma.course.findUnique({
      where: {
        id: courseId
      }
    });
  }

  public async getCourseBySlug(slug: string) {
    return this.prisma.course.findUnique({
      where: {
        slug
      }
    });
  }

  public async createCourse({ title }: ICreateCourseDTO) {
    const slug = slugify(title, { lower: true });

    const courseAlreadyExists = await this.prisma.course.findUnique({
      where: { slug }
    });

    if (courseAlreadyExists) {
      throw new ConflictError('Course already exists');
    }

    return this.prisma.course.create({
      data: {
        title,
        slug
      }
    });
  }
}
