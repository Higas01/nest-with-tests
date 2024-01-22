import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { UsersModule } from '../users.module';
import { UsersService } from '../users.service';
import { INestApplication } from '@nestjs/common';
import { UserSchema } from '../entities/user.entity';
import {User} from "../interfaces/user.interface";
require('dotenv').config();

describe('Users ', () => {
  let app: INestApplication;
  let usersService: UsersService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [UsersModule],
    })
      .overrideProvider(UsersService)
      .useValue(usersService)
      .compile();

    app = moduleRef.createNestApplication();
    await app.init();
    usersService = moduleRef.get<UsersService>(UsersService);
  });

  describe("Get Users", () => {

    it("Should return users with successfuly", async () => {
        const response = await request(app.getHttpServer()).get("/users").expect(200);
        expect(typeof response.body).toEqual("object");
    })

  })

  describe("Create User", () => {

    const body = {name: "Higor Matheus", job: "Developer Full-Stack", age: 19}


    it("Should create user with successfuly", async () => {
        const response = await request(app.getHttpServer()).post("/users").send(body).expect(201);
        expect(response.body).toHaveProperty("_id");
    })

    it("Should return error message", async () => {
        const response = await request(app.getHttpServer()).post("/users").send({name: "Higor", job: "Developer Full Stack"});
        expect(response.status).toBe(400);
    expect(response.body).toEqual({
        message: "Todos os campos precisam ser preenchidos!",
        statusCode: 400,
    });
    })
  })


  afterAll(async () => {
    await app.close();
  });
});