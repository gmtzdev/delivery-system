/**
 * @file auth.routes.ts
 * @description This file defines the authentication-related routes for the API.
 * It handles user registration (signIn), login (signIn), and token refresh operation (refreshToken).
 *
 * @module Routes/Auth
 */

// -Express imports
import { Router } from 'express'

// -Use Case's import
import { RefreshTokenUseCase } from '@application/use-cases/auth/RefreshToken.usecase'
import { SignInUseCase } from '@application/use-cases/auth/SignInUseCase'
import { SignUpUseCase } from '@application/use-cases/auth/SignUpUseCase'

// -Prisma client and repository imports
import { UserPrismaRepository } from '@infrastructure/repositories/prisma/user/UserPrismaRepository'
import prisma from '@infrastructure/database/prisma/prismaClient'

// -Service's import
import { BcryptService } from '@infrastructure/services/auth/bcrypt.service'
import { TokenService } from '@infrastructure/services/jwt/token.service'

// -Controller's import
import { AuthController } from '@presentation/controllers/auth.controller'

// -Validation schema's imports
import { RefreshTokenSchema } from '@presentation/middlewares/validators/schemas/auth/RefreshTokenValidation'
import { SignInSchema } from '@presentation/middlewares/validators/schemas/auth/SignInValidation'
import { SignUpSchema } from '@presentation/middlewares/validators/schemas/auth/SignUpValidation'
import { ValidateSchema } from '@presentation/middlewares/validators/ValidationMiddleware'

// Create an instance of the Express router
const router = Router()

// Create service instances
const bcryptService = new BcryptService()
const tokenService = new TokenService()

// Create repository instance
const userPFPrismaRepository = new UserPrismaRepository(prisma)

// Create use case instances
const signUpCaseUse = new SignUpUseCase(userPFPrismaRepository, bcryptService)
const signInUseCase = new SignInUseCase(userPFPrismaRepository, bcryptService, tokenService)
const refreshTokenUseCase = new RefreshTokenUseCase(tokenService)

// Create controller instance
const authController = new AuthController(signUpCaseUse, signInUseCase, refreshTokenUseCase)

/**
 * POST /signUp
 * Router for user registration.
 * Validates the inputs schema before calling the sign-up use case.
 */
router.post('/signUp', ValidateSchema(SignUpSchema), authController.signUp.bind(authController))

/**
 * POST /signIn
 * Router for user sign in.
 * Validates the inputs schema before calling the sign-in use case.
 */
router.post('/signIn', ValidateSchema(SignInSchema), authController.signIn.bind(authController))

/**
 * POST /refreshToken
 * Route for refreshing JWT access tokens.
 * Validates the input schema before calling the refresh token use case.
 */
router.post('/refreshToken', ValidateSchema(RefreshTokenSchema), authController.refreshToken.bind(authController))

// Export the configured router
export { router }