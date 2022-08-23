import { Injectable } from '@nestjs/common';

import { PrismaService } from '../database/prisma/prisma.service';

import { ICreateStudentDTO } from '../http/dtos/create-student.dto';

@Injectable()
export class StudentsService {
  constructor(private prisma: PrismaService) {}

  listAllStudents() {
    return this.prisma.student.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    });
  }

  getStudentByAuthUserId(authUserId: string) {
    return this.prisma.student.findUnique({
      where: {
        authUserId
      }
    });
  }

  getStudentById(id: string) {
    return this.prisma.student.findUnique({
      where: {
        id
      }
    });
  }

  createStudent({ authUserId }: ICreateStudentDTO) {
    return this.prisma.student.create({
      data: {
        authUserId
      }
    });
  }
}
