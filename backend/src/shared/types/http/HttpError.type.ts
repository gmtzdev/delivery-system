import { ClientErrorStatusCodes } from '@shared/constants/http/ClientErrorStatusCode'
import { ServerErrorStatusCodes } from '@shared/constants/http/ServerErrorStatusCode'

export interface ErrorResponseOptions {
  statusCode: ClientErrorStatusCodes | ServerErrorStatusCodes
  message: string
  error: string | object | unknown

}

export interface ErrorResponse {
  success: boolean
  message: string
  error: string | object | unknown
}