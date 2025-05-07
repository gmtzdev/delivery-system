import { SignInSummary } from '@application/dtos/auth/SignIn.dto'
import { ClientErrorStatusCodes } from '@shared/constants/http/ClientErrorStatusCode'
import { ServerErrorStatusCodes } from '@shared/constants/http/ServerErrorStatusCode'
import { HttpError } from '@shared/utils/error/HttpError'
import { ErrorResponseHttp } from '@shared/utils/HttpResponses/ErrorResponseHttp'
import { NextFunction, Request, Response } from 'express'
import passport from 'passport'

export const verifyAuth = (req: Request, res: Response, next: NextFunction): void => {
  passport.authenticate('jwt', { session: false }, (err: Error, user: SignInSummary | false): void => {
    if (err !== null) {
      void ErrorResponseHttp(res, new HttpError(ServerErrorStatusCodes.INTERNAL_SERVER_ERROR, 'error authenticate token')); return
    }

    if (user === false) {
      void ErrorResponseHttp(res, new HttpError(ClientErrorStatusCodes.UNAUTHORIZED, 'invalid token')); return
    }

    const dataUser: SignInSummary = { id: user.id, name: user.name }
    req.user = dataUser

    next()
  })(req, res, next)
}