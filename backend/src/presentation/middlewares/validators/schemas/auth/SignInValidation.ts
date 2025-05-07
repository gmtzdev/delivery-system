/**
 * @file signInValidation.ts
 * @description Validation schema for user sign-in requests. This schema extracts
 * the relevant fields from the sign-up schema to validate sign-in data.
 *
 * @module Validators/Auth
 */

// -Zod schema import
import { ZodSchema } from 'zod'

// -Sign up schema import
import { SignUpSchema } from './SignUpValidation'

/**
 * Zod validation schema for user sign-in data.
 *
 * This schema picks the `email` and `password` fields from the `signUpSchema`.
 * It ensures that the provided email is valid and that the password is non-empty.
 */
export const SignInSchema: ZodSchema = SignUpSchema.pick({
  email: true,
  password: true
})