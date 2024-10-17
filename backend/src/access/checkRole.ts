import { User } from '@/collections/users/user'


export const checkRole = (allRoles: User['role'][] | User['role'] = [], user?: User): boolean => {

  console.log('checkRole', allRoles, user)
  if (!user) 
    return false
  if (typeof allRoles === 'string') 
    return user.role === allRoles
  return allRoles.includes(user.role)
  
}
