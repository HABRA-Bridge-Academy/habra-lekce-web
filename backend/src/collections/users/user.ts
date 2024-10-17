export interface User {
    id: string
    name?: string | null
    role: 'admin' | 'user' | 'registered'
    updatedAt: string
    createdAt: string
    email: string
    resetPasswordToken?: string | null
    resetPasswordExpiration?: string | null
    salt?: string | null
    hash?: string | null
    loginAttempts?: number | null
    lockUntil?: string | null
    password: string | null
  }