import { ClientErrorStatusCodes } from '@shared/constants/http/ClientErrorStatusCode'
import { ServerErrorStatusCodes } from '@shared/constants/http/ServerErrorStatusCode'

export class HttpError extends Error {
  public readonly status: ClientErrorStatusCodes | ServerErrorStatusCodes

  constructor (status: ClientErrorStatusCodes | ServerErrorStatusCodes, message: string) {
    super(message)
    this.status = status
    this.name = 'HttpError'
    Object.setPrototypeOf(this, new.target.prototype)
  }
}