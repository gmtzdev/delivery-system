import { User } from '@prisma/client'

export type SignInDTO = Pick<User, 'email' | 'password'>

export type SignInSummary = Pick<User, 'id' | 'name'>