import { Test } from "@nestjs/testing";
import { UsersController } from "../users.controller";
import { User } from "../interfaces/user.interface";
import { UsersService } from "../users.service";


describe("Unit test UsersController", () => {
  let usersController: UsersController;
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
    name: "Luiz",
    job: "Barber",
    age: 21
  } 


  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
        controllers: [UsersController],
      providers: [
        {
            provide: UsersService,
            useValue: {
                findAll: jest.fn().mockResolvedValue(getUsers),
                create: jest.fn().mockResolvedValue(createUser),
            }
        }
    ]
    }).compile();
    usersController = moduleRef.get<UsersController>(UsersController);
  })


  describe("get Users", () => {

    it ("Should return users successfully", async () => {
        // act
        const result = await usersController.findAll();

        // Assert
        expect(await usersController.findAll()).toEqual(result);
    })

     })

  describe("create Users", () => {

    it ("Should return create user to successfully", async () => {
        // Arrange
        const body: User = {
            name: "Luiz",
            age: 21,
            job: "Barber",
        }

        // act
        const result = await usersController.create(body);

        // Assert
        expect(await usersController.create(body)).toEqual(result);
    })
    it ("Should return error in create user with parameter invalid", async () => {
        // Arrange
        const body: User = {
            name: "Luiz",
            age: 21,
            job: "Barber",
        }

        const error = "Todos os campos precisam ser preenchidos!"

        // act
        const result = jest.spyOn(usersController, "create").mockRejectedValueOnce(new Error(error))

        // Assert
        await expect(usersController.create(body[1])).rejects.toThrow(error);
    })

     })


 
})