import { Injectable } from '@nestjs/common';

import { PrismaService } from '../database/prisma/prisma.service';

import { ICreateEnrollmentDTO } from '../http/dtos/create-enrollment.dto';
import { IGetByCourseAndStudentIdDTO } from '../http/dtos/get-by-course-and-student-id.dto';

@Injectable()
export class EnrollmentsService {
  constructor(private prisma: PrismaService) {}

  getByCourseAndStudentId({
    courseId,
    studentId
  }: IGetByCourseAndStudentIdDTO) {
    return this.prisma.enrollment.findFirst({
      where: {
        courseId,
        studentId,
        canceledAt: null
      }
    });
  }

  listAllEnrollments() {
    return this.prisma.enrollment.findMany({
      where: {
        canceledAt: null
      },
      orderBy: {
        createdAt: 'desc'
      }
    });
  }

  listEnrollmentsByStudent(studentId: string) {
    return this.prisma.enrollment.findMany({
      where: {
        studentId,
        canceledAt: null
      },
      orderBy: {
        createdAt: 'desc'
      }
    });
  }

  createEnrollment({ courseId, studentId }: ICreateEnrollmentDTO) {
    return this.prisma.enrollment.create({
      data: {
        courseId,
        studentId
      }
    });
  }
}
