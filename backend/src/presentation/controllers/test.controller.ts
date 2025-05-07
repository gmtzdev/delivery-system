/**
 * @file test.controller.ts
 * @description Controller for handling authentication-related operations such as user sign-Up,
 * sing-In, and token refresh. This controller interacts with to respective use cases to perform
 * the necessary business logic and send responses to the client.
 *
 * @module Controller/Test
 */

// -Library and tool imports
import { Request, Response } from 'express'

// -DTO import
import { RefreshTokenDTO, TokenSummary } from '@application/dtos/auth/RefreshToken.dto'
import { UserSummaryDTO } from '@application/dtos/user/UserSummary.dto'
import { SignInDTO } from '@application/dtos/auth/SignIn.dto'
import { SignUpDTO } from '@application/dtos/auth/SignUp.dto'

// -Use Case's import
import { RefreshTokenUseCase } from '@application/use-cases/auth/RefreshToken.usecase'
import { SignInUseCase } from '@application/use-cases/auth/SignInUseCase'
import { SignUpUseCase } from '@application/use-cases/auth/SignUpUseCase'

// -Utility imports for HTTP responses and error handling
import { SuccessStatusCodes } from '@shared/constants/http/SuccessStatusCode'
import { SuccessResponseHttp } from '@shared/utils/HttpResponses/SuccessResponseHttp'
import { ErrorResponseHttp } from '@shared/utils/HttpResponses/ErrorResponseHttp'

/**
 * AuthController class handles the authentication processes.
 * It contains methods for user registration, login, and refreshing tokens.
 */
export class AuthController {
  /**
   * Creates an instance of AuthController.
   * @param signUpUseCase - Use case for handling user sign-up.
   * @param signInUseCase - Use case for handling user sign-in.
   * @param refreshTokenUseCase - Use case for handling refresh token operations.
   */
  constructor (
    private readonly helloWorldUseCase,
    private readonly helloWorldTokenUseCase,
    private readonly signUpUseCase: SignUpUseCase,
    private readonly signInUseCase: SignInUseCase,
    private readonly refreshTokenUseCase: RefreshTokenUseCase
  ) {}

  /**
   * Handles user sign-up requests.
   * @param req - The HTTP request object containing the user sign-up data.
   * @param res - The HTTP response object to send the result.
   */
  public async signUp (req: Request, res: Response): Promise<void> {
    try {
      const signUpDTO: SignUpDTO = req.body

      const resUserPF: UserSummaryDTO = await this.signUpUseCase.execute(signUpDTO)

      SuccessResponseHttp<UserSummaryDTO>(res, { statusCode: SuccessStatusCodes.CREATED, data: resUserPF, message: 'user successfully created' })
    } catch (error: any) {
      void ErrorResponseHttp(res, error)
    }
  }

  /**
   * Handles user sign-in requests.
   * @param req - The HTTP request object containing the user sign-in data.
   * @param res - The HTTP response object to send the result.
   */
  public async signIn (req: Request, res: Response): Promise<void> {
    try {
      const signIn: SignInDTO = req.body

      const resSignIn: TokenSummary = await this.signInUseCase.execute(signIn)

      SuccessResponseHttp<TokenSummary>(res, { statusCode: SuccessStatusCodes.OK, data: resSignIn, message: 'successful signin' })
    } catch (error: any) {
      void ErrorResponseHttp(res, error)
    }
  }

  /**
   * Handles token refresh requests.
   * @param req - The HTTP request object containing the refresh token.
   * @param res - The HTTP response object to send the result.
   */
  public async refreshToken (req: Request, res: Response): Promise<void> {
    try {
      const refreshToken: RefreshTokenDTO = req.body

      const resRefreshToken: TokenSummary = this.refreshTokenUseCase.execute(refreshToken)

      SuccessResponseHttp<TokenSummary>(res, { statusCode: SuccessStatusCodes.OK, data: resRefreshToken, message: 'token successfully refresh' })
    } catch (error: any) {
      void ErrorResponseHttp(res, error)
    }
  }
}