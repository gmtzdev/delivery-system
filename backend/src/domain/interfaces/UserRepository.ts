/**
 * @file UserPFRepository.ts
 * @description This interface defines the contract for UserPF repository implementations.
 * It specifies the methods that any UserPF repository should implement for managing
 * UserPF entities in a data store.
 *
 * @module Repositories
 */

// -Entity's import
// import { Account } from '@domain/entities/account.entity'
import { User } from '@domain/entities/User.entity'

/**
 * UserPFRepository interface
 *
 * This interface defines the methods required for interacting with UserPF data.
 * Implementing classes must provide concrete implementations of these methods.
 */
export interface UserRepository {
  create: (userPF: User) => Promise<User>
  findById: (id: number) => Promise<User | null>
  findByEmail: (email: string) => Promise<User | null>
  findByPhone: (phone: string) => Promise<User | null>
//   findAccountsByUserId: (userId: number) => Promise<Account[]>
}