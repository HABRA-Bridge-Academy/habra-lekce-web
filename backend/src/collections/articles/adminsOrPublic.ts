import type { Access } from 'payload/types'
import { checkRole } from '@/access/checkRole'

const adminsOrPublic: Access = ({ req: { user } }) => {
    if (user && checkRole(['admin'], user)) 
        return true;
  
    return {
        or: [
            { public: { equals: true } },  // Updated to use the expected query structure
        ],
    };
  }

export default adminsOrPublic;