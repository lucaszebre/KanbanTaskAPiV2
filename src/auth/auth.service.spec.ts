/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from 'src/users/user.entity';
import { UsersService } from 'src/users/users.service';
describe('UsersService', () => {
  let usersService: UsersService;
  let userRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: {
            find: jest.fn(),
            findOne: jest.fn(),
            create: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
          },
        },
      ],
    }).compile();

    usersService = module.get<UsersService>(UsersService);
    userRepository = module.get(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(usersService).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of users', async () => {
      const users = [{ id: 1, name: 'User 1' }, { id: 2, name: 'User 2' }];
      userRepository.find.mockResolvedValue(users);

      const result = await usersService.findAll();

      expect(result).toEqual(users);
    });
  });

  // describe('findOne', () => {
  //   it('should return a user by email', async () => {
  //     const email = 'test@example.com';
  //     const user = { id: 1, name: 'Test User', email };
  //     userRepository.findOne.mockResolvedValue(user);

  //     const result = await usersService.findOne(email);

  //     expect(result).toEqual(user);
  //   });

  //   it('should return null if the user is not found', async () => {
  //     const email = 'nonexistent@example.com';
  //     userRepository.findOne.mockResolvedValue(null);

  //     const result = await usersService.findOne(email);

  //     expect(result).toBeNull();
  //   });
  // });

  // describe('create', () => {
  //   it('should create a new user', async () => {
  //     const newUser = { name: 'New User', email: 'new@example.com' };
  //     const createdUser = { id: 1, ...newUser };
  //     userRepository.create.mockReturnValue(createdUser);
  //     userRepository.save.mockResolvedValue(createdUser);

  //     const result = await usersService.create(newUser);

  //     expect(result).toEqual(createdUser);
  //   });
  // });

  // describe('update', () => {
  //   it('should update an existing user', async () => {
  //     const userId = 1;
  //     const updatedUser = { name: 'Updated User' };
  //     const updatedUserData = { id: userId, ...updatedUser };
  //     userRepository.update.mockResolvedValue({ affected: 1 });
  //     userRepository.findOne.mockResolvedValue(updatedUserData);

  //     const result = await usersService.update(userId, updatedUser);

  //     expect(result).toEqual(updatedUserData);
  //   });

  //   it('should return null if the user is not found for update', async () => {
  //     const userId = 1;
  //     const updatedUser = { name: 'Updated User' };
  //     userRepository.update.mockResolvedValue({ affected: 0 });

  //     const result = await usersService.update(userId, updatedUser);

  //     expect(result).toBeNull();
  //   });
  // });

  // describe('delete', () => {
  //   it('should delete an existing user', async () => {
  //     const userId = 1;
  //     const usersAfterDeletion = [{ id: 2, name: 'User 2' }];
  //     userRepository.delete.mockResolvedValue({ affected: 1 });
  //     userRepository.find.mockResolvedValue(usersAfterDeletion);

  //     const result = await usersService.delete(userId);

  //     expect(result).toEqual(usersAfterDeletion);
  //   });

  //   it('should return null if the user is not found for deletion', async () => {
  //     const userId = 1;
  //     userRepository.delete.mockResolvedValue({ affected: 0 });

  //     const result = await usersService.delete(userId);

  //     expect(result).toBeNull();
  //   });
  // });
});

