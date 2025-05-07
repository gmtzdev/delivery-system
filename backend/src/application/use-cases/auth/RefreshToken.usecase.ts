/**
 * @file refreshTokenUseCase.ts
 * @description This use case handles the refresh token logic, allowing users to obtain new access
 * and refresh tokens using a valid refresh token.
 *
 * @module UseCases/Auth
 */

// -DTO imports
import { RefreshTokenDTO, TokenSummary } from '@application/dtos/auth/RefreshToken.dto'
import { SignInSummary } from '@application/dtos/auth/SignIn.dto'

// -Services imports
import { TokenService } from '@infrastructure/services/jwt/token.service'

// -Utility imports for HTTP responses and error handling
import { ClientErrorStatusCodes } from '@shared/constants/http/ClientErrorStatusCode'
import { HttpError } from '@shared/utils/error/HttpError'

/**
 * RefreshTokenUseCase class
 *
 * This class manages the logic for refreshing access tokens using valid refresh tokens.
 */
export class RefreshTokenUseCase {
  /**
   * Constructs a RefreshTokenUseCase instance.
   *
   * @param tokenService - An instance of TokenService for handling token operations.
   */
  constructor (private readonly tokenService: TokenService) {}

  /**
   * Executes the refresh token process.
   *
   * @param dataRefreshToken - The data transfer object containing the refresh token.
   * @returns A tokenSummary containing the new access and refresh tokens.
   * @throws HttpError if the refresh token is invalid.
   */
  public execute (dataRefreshToken: RefreshTokenDTO): TokenSummary {
    const decodedRefreshToken: SignInSummary | null = this.tokenService.verifyRefreshToken(dataRefreshToken.refreshToken)

    if (decodedRefreshToken === null) throw new HttpError(ClientErrorStatusCodes.UNAUTHORIZED, 'Invalid refresh token')

    const newAccessToken = this.tokenService.generateAccessToken(decodedRefreshToken)
    const newRefreshToken = this.tokenService.generateRefreshToken(decodedRefreshToken)

    const newTokens: TokenSummary = { accessToken: newAccessToken, refreshToken: newRefreshToken }

    return newTokens
  }
}