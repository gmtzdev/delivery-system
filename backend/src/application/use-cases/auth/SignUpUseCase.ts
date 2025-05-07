/**
 * @file signUpUseCase.ts
 * @description This use case handles the user registration process.
 * It includes validation for existing email and phone number and hashes the password.
 *
 * @module UseCases/Auth
 */

// -DTO imports
import { UserSummaryDTO } from '@application/dtos/user/UserSummary.dto'
import { SignUpDTO } from '@application/dtos/auth/SignUp.dto'

// -Entity's import
import { User } from '@domain/entities/User.entity'

// -Repositories imports
import { UserPrismaRepository } from '@infrastructure/repositories/prisma/user/UserPrismaRepository'

// -Services imports
import { BcryptService } from '@infrastructure/services/auth/bcrypt.service'

// -Utility imports for HTTP responses and error handling
import { ClientErrorStatusCodes } from '@shared/constants/http/ClientErrorStatusCode'
import { HttpError } from '@shared/utils/error/HttpError'

/**
 * SignUpUseCase class
 *
 * This class implements the logic for user registration. It validates if the
 * email or phone number already exists in the repository and hashes the user's password
 * before creating a new user.
 */
export class SignUpUseCase {
  /**
   * Constructs a SignUpUseCase instance.
   *
   * @param UserRepository - An instance of UserPrismaRepository for database operations.
   * @param bcryptService - An instance of BcryptService for password hashing.
   */
  constructor (
    private readonly UserRepository: UserPrismaRepository,
    private readonly bcryptService: BcryptService
  ) {}

  /**
   * Executes the sign-up process.
   *
   * @param signUpDTO - The data transfer object containing user registration details.
   * @returns A promise that resolves to a userSummaryDTO containing the registered user's details.
   * @throws HttpError if the email or phone number is already registered.
   */
  public async execute (signUpDTO: SignUpDTO): Promise<UserSummaryDTO> {
    const existEmail: User | null = await this.UserRepository.findByEmail(signUpDTO.email)
    if (existEmail !== null) throw new HttpError(ClientErrorStatusCodes.CONFLICT, 'email address is already registered')

    if (signUpDTO.phone !== null) {
      const existPhone: User | null = await this.UserRepository.findByPhone(signUpDTO.phone)
      if (existPhone !== null) { throw new HttpError(ClientErrorStatusCodes.CONFLICT, 'phone number is already registered') }
    }

    const hashedPassword: string = await this.bcryptService.hashPassword(signUpDTO.password)

    const user: User = new User(
      0,
      signUpDTO.email,
      signUpDTO.name,
      signUpDTO.lastName,
      signUpDTO.birthday,
      signUpDTO.phone,
      signUpDTO.idSex,
      signUpDTO.idLenguage,
      hashedPassword,
      false,
      new Date(),
      new Date()
    )

    const createdUser: User = await this.UserRepository.create(user)

    const dataUser: UserSummaryDTO = {
      id: createdUser.id,
      email: createdUser.email,
      name: createdUser.name,
      lastName: createdUser.lastName,
      birthday: createdUser.birthday,
      phone: createdUser.phone,
      idSex: createdUser.idSex,
      idLenguage: createdUser.idLenguage,
      verify: createdUser.verify,
      createdAt: createdUser.createdAt,
      updatedAt: createdUser.updatedAt
    }

    return dataUser
  }
}