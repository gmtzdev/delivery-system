import { ErrorResponse } from '@shared/types/http/HttpError.type'
import { HttpError } from '../error/HttpError'
import { Response } from 'express'
import { ZodError } from 'zod'
import { ClientErrorStatusCodes } from '@shared/constants/http/ClientErrorStatusCode'
import { ServerErrorStatusCodes } from '@shared/constants/http/ServerErrorStatusCode'

const createErrorResponse = (message: string, error: Error | HttpError | ZodError): ErrorResponse => ({
  success: false,
  message,
  error
})

const handleHttpError = (res: Response, error: HttpError): void => {
  res.status(error.status).send(createErrorResponse(error.message, error))
}

const handleZodError = (res: Response, error: ZodError): void => {
  res.status(ClientErrorStatusCodes.BAD_REQUEST).send(createErrorResponse(error.message, error))
}

const handleDefaultError = (res: Response, error: Error): void => {
  res.status(ServerErrorStatusCodes.INTERNAL_SERVER_ERROR).send(createErrorResponse(error.message, error))
}

const getErrorHandle = (error: Error | HttpError | ZodError): any => {
  if (error instanceof HttpError) return handleHttpError
  if (error instanceof ZodError) return handleZodError
  return handleDefaultError
}

export const ErrorResponseHttp = async (res: Response, error: Error | HttpError | ZodError): Promise<void> => {
  const handler = getErrorHandle(error)
  handler(res, error)
}