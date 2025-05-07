
import { SuccessResponse, SuccessResponseOptions } from '@shared/types/http/HttpSuccess.type'
import { Response } from 'express'

export const SuccessResponseHttp = <T>(res: Response, options: SuccessResponseOptions<T>): void => {
  const { statusCode, message, data } = options

  const response: SuccessResponse<T> = {
    success: true,
    data,
    message: message.toUpperCase()
  }

  res.status(statusCode).json(response)
}