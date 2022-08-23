# Project

- NestJS
- GraphQL
- Apache Kafka
- Next.js
- Apollo Client (GraphQL)

## Functionalities

### Purchasing service (purchases)

- [Admin] Product Registration
- [Admin] Product listing

- [Auth] Shopping List

- [Public] Purchase a product
- [Public] List products available for purchase

### Classroom service

- [Admin] List enrollments
- [Admin] List students
- [Admin] List courses
- [Admin] Register courses

- [Auth] List courses I have access to
- [Auth] Access course content

## Requirements

- Docker
- Docker-compose

### Start Docker

```bash
# Docker
$ docker-compose up -d
$ npx prisma migrate dev
$ npx prisma generate
```

### Start projects

```bash
# Docker
$ cd purchase && npm i && npm run start
$ cd ..
$ cd classroom && npm i && npm run start
$ cd ..
$ cd gateway && npm i && npm run start
```

### Endpoints

API-Gateway http://localhost:3333
API-Purchase http://localhost:3334
API-Classroom http://localhost:3335

### Terminate Docker

```bash
# Docker
$ docker-compose down
```
