import { informationalStatusCodes } from '@shared/constants/http/InformationalStatusCode'
import { RedirectionStatusCodes } from '@shared/constants/http/RedirectionStatusCode'
import { SuccessStatusCodes } from '@shared/constants/http/SuccessStatusCode'

export interface SuccessResponseOptions<T> {
  statusCode: informationalStatusCodes | RedirectionStatusCodes | SuccessStatusCodes
  message: string
  data: T | T[] | string
}

export interface SuccessResponse<T> {
  success: boolean
  message: string
  data: T | T[] | string
}