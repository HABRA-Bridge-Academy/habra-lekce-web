import type { Access, Where } from 'payload'
import { User } from './payload-types'

export const checkRole = (
  roleCheck: User['role'][] | User['role'] = [],
  user: User | null,
): boolean => {
  if (!user || !roleCheck) return false
  if (typeof roleCheck === 'string') return user.role === roleCheck
  return roleCheck.includes(user.role)
}

export const admins: Access = ({ req: { user } }) => checkRole(['admin'], user)

export const anyone: Access = () => true

export const adminsAndUser: Access = ({ req: { user } }) => {
  if (user && checkRole(['admin'], user)) {
    return true
  }

  return {
    id: user?.id,
  } as Where
}

export const adminsOrPublished: Access = ({ req: { user } }) => {
  if (user && checkRole(['admin'], user)) {
    return true
  }

  return {
    _status: {
      equals: 'published',
    },
  }
}
