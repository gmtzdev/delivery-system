import { User } from '@domain/entities/User.entity'

export type SignUpDTO = Omit<User, 'id' | 'verify' | 'createdAt' | 'updatedAt'>