/**
 * @file authMiddleware.ts
 * @description Middleware for verifying user authentication by validating the access token.
 * If the token is valid, the user information is attached to the request object.
 *
 * @module Middlewares/Auth
 */

// -Library's and tool's import
import { NextFunction, Request, Response } from 'express'

// -DTO's import
import { SignInSummary } from '@application/dtos/auth/SignIn.dto'

// -Services imports
import { TokenService } from '@infrastructure/services/jwt/token.service'

// -Utility imports for HTTP responses and error handling
import { ClientErrorStatusCodes } from '@shared/constants/http/ClientErrorStatusCode'
import { ErrorResponseHttp } from '@shared/utils/HttpResponses/ErrorResponseHttp'
import { HttpError } from '@shared/utils/error/HttpError'

// Create an instance of the TokenService
const tokenService = new TokenService()

/**
 * Middleware to verify authentication by checking the provided access token.
 *
 * This middleware checks the `Authorization` header for a bearer token. If the token is missing
 * or invalid, it throws an `HttpError` with a 401 Unauthorized status code.
 * If the token is valid, the decoded user information is attached to the `req` object for use
 * in subsequent middleware or route handlers.
 *
 * @param {Request} req - The incoming request object.
 * @param {Response} _res - The response object (unused in this middleware).
 * @param {NextFunction} next - The next middleware function in the stack.
 * @throws {HttpError} Throws an `HttpError` if the token is invalid or unauthorized.
 *
 */
export const verifyAuthOwn = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const authHeader = req.headers.authorization ?? ''
  const token: string | null = authHeader.split(' ').pop() ?? null

  if (token === null) return await ErrorResponseHttp(res, new HttpError(ClientErrorStatusCodes.UNAUTHORIZED, 'unauthorized access'))

  const decodedToken: SignInSummary | null = tokenService.verifyAccessToken(token ?? '')

  if (decodedToken === null) return await ErrorResponseHttp(res, new HttpError(ClientErrorStatusCodes.UNAUTHORIZED, 'unauthorized access'))

  next()
}