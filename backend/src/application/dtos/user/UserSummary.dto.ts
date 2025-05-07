import { User } from '@domain/entities/User.entity'

export type UserSummaryDTO = Omit<User, 'password'>