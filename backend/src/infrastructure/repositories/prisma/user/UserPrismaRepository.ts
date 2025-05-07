/**
 * @file UserPrismaRepository.ts
 * @description Repository class for managing User entities using Prisma as the ORM.
 * This class implements the UserRepository interface and provides methods for
 * interacting with the User table in the database.
 *
 * @module Repositories/User
 */

// -Entity's import
import { UserRepository } from '@domain/interfaces/UserRepository'
import { User } from '@domain/entities/User.entity'

// -Prisma's import
import { PrismaClient, User as prismaUser} from '@prisma/client'

// -Mapper's import
// import { toDomainAccount } from '@infrastructure/mappers/account/accountMapper'

/**
 * UserPrismaRepository class for handling database operations related to User entities.
 * This class implements the UserRepository interface, providing methods for
 * retrieving and creating User entities in the database.
 */
export class UserPrismaRepository implements UserRepository {
  private readonly prisma: PrismaClient

  /**
   * Constructor for UserPrismaRepository.
   *
   * @param {PrismaClient} prisma - An instance of PrismaClient for database operations.
   */
  constructor (prisma: PrismaClient) { this.prisma = prisma }

  /**
   * Finds a User by its ID.
   *
   * @param {number} id - The ID of the User to find.
   * @returns {Promise<User | null>} A promise that resolves to the User entity if found, or null if not.
   */
  public async findById (id: number): Promise<User | null> {
    const user: prismaUser | null = await this.prisma.user.findUnique({ where: { id } })
    return user !== null ? this.toDomain(user) : null
  }

  /**
   * Finds a User by its email.
   *
   * @param {string} email - The email of the User to find.
   * @returns {Promise<User | null>} A promise that resolves to the User entity if found, or null if not.
   */
  public async findByEmail (email: string): Promise<User | null> {
    const user: prismaUser | null = await this.prisma.user.findUnique({ where: { email } })
    return user !== null ? this.toDomain(user) : null
  }

  /**
   * Finds a User by its phone number.
   *
   * @param {string} phone - The phone number of the User to find.
   * @returns {Promise<User | null>} A promise that resolves to the User entity if found, or null if not.
   */
  public async findByPhone (phone: string): Promise<User | null> {
    const user: prismaUser | null = await this.prisma.user.findFirst({ where: { phone } })
    return user !== null ? this.toDomain(user) : null
  }

  /**
   * Creates a new User in the database.
   *
   * @param {User} user - The User entity to create.
   * @returns {Promise<User>} A promise that resolves to the created User entity.
   */
  public async create (user: User): Promise<User> {
    const savedUser: prismaUser = await this.prisma.user.create(
      {
        data:
          {
            email: user.email,
            name: user.name,
            lastName: user.lastName,
            birthday: user.birthday,
            phone: user.phone,
            idSex: user.idSex,
            idLenguage: user.idLenguage,
            password: user.password,
            verify: user.verify,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt
          }
      }
    )

    return this.toDomain(savedUser)
  }

  /**
   * Finds all accounts related to a specific User by their user ID.
   *
   * @param {number} idUser - The ID of the User to find associated accounts.
   * @returns {Promise<Account[]>} A promise that resolves to an array of Account entities.
   */
  // public async findAccountsByUserId (idUser: number): Promise<any> {
  //   // const accounts: prismaAccount[] = await this.prisma.account.findMany({ where: { idUser } })
  //   // return accounts.map((account: prismaAccount) => toDomainAccount(account))
  // }

  /**
   * Converts a Prisma User entity to a domain User entity.
   *
   * @param {prismaUser} prismaUser - The Prisma User entity to convert.
   * @returns {User} The converted User entity.
   */
  private toDomain (prismaUser: prismaUser): User {
    return new User(
      prismaUser.id,
      prismaUser.email,
      prismaUser.name,
      prismaUser.lastName,
      prismaUser.birthday,
      prismaUser.phone,
      prismaUser.idSex,
      prismaUser.idLenguage,
      prismaUser.password,
      prismaUser.verify,
      prismaUser.createdAt,
      prismaUser.updatedAt
    )
  }
}