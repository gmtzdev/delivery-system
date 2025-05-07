// -Express imports
import { Request, Response, NextFunction } from 'express'

// -Util's imports
import { ErrorResponseHttp } from '@shared/utils/HttpResponses/ErrorResponseHttp'

// -DTO;s imports
import { SignInSummary } from '@application/dtos/auth/SignIn.dto'

/**
 * Middleware to add user ID to the request body.
 *
 * This middleware extracts the user ID from the authenticated user object
 * and adds it to the request body under the key `idUser`.
 *
 * @param req - The Express request object.
 * @param res - The Express response object.
 * @param next - The next middleware function in the stack.
 * @returns void
 */
export const dataUserBody = (req: Request, res: Response, next: NextFunction): void => {
  try {
    const user: SignInSummary | undefined = req.user as SignInSummary
    req.body = { ...req.body, idUser: user.id }

    next()
  } catch (error: any) {
    void ErrorResponseHttp(res, error)
  }
}