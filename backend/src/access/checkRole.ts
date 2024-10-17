import { User } from '@/collections/users/user'


export const checkRole = (allRoles: User['role'][] | User['role'] = [], user?: User): boolean => {
  if (user) {
    if (typeof allRoles === 'string') {
      return user.role === allRoles
    }
    return allRoles.includes(user.role)
  }

  return false
}
