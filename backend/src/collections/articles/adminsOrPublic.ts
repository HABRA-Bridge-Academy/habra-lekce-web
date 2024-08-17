import type { Access } from 'payload/types'
import { checkRole } from '@/access/checkRole'

const adminsOrPublic: Access = ({ req: { user } }) => {
    if (user && checkRole(['admin'], user)) 
        return true;
  
    return {
        public: {
            $eq: true,
        },
      }
  }

export default adminsOrPublic;