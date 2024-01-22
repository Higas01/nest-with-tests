import { Test } from "@nestjs/testing";
import { UsersService } from "../users.service";
import { Model } from "mongoose";
import { User } from "../interfaces/user.interface";


describe("UsersService", () => {
  let usersService: UsersService;

  const getUsers: User[] = [
    {
      name: "Higor",
      job: "Full Stack Developer",
      age: 19,
    },
    {
      name: "Otávio Luiz",
      job: "Designer UI/UX",
      age: 25,
    },
    {
      name: "Gabriel Campos",
      job: "Singer",
      age: 34,
    },
]

const createUser: User = {
  name: "Higor",
  job: "Developer Full Stack",
  age: 19,
}


  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [UsersService,
      {
        provide: "USER_MODEL",
        useValue: {
          create: jest.fn().mockResolvedValue(createUser),
          find: jest.fn().mockResolvedValue(getUsers),
        }
      }]
    }).compile();

    usersService = moduleRef.get<UsersService>(UsersService);
  })

  describe("Get Users", () => {

    it("Should return user successfully", async () => {
      // Act
      const result = await usersService.findAll()

      // Asserts
      expect(await usersService.findAll()).toEqual(result);

    })
  })

  describe("Create User", () => {
       // Arrange
       const body: User = {
        name: "Higor",
        job: "Desenvolvedor Full Stack",
        age: 19,
      }
    it("Should create user successfully", async () => {
      // Act
      const result = await usersService.create(body);
      // Asserts
      expect(await usersService.create(body)).toEqual(result)
   }
     )

     it("Should throw an error with the correct message", async () => {
      // Arrange
      const expectedErrorMessage = "Todos os campos precisam ser preenchidos!";
      jest.spyOn(usersService, "create").mockRejectedValueOnce(new Error(expectedErrorMessage));
    
      // Act & Assert
      await expect(usersService.create(body[1])).rejects.toThrow(expectedErrorMessage);
    });
  })
 
})