import { admins, adminsAndUser, anyone, checkRole } from '@/access';
import { DEV } from '@/debug';
import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  auth: {
    removeTokenFromResponses: true,
    cookies: {
      secure: true,
      domain: "bridzhavirov.cz",
      sameSite: DEV ? "None" : "Strict",
    }
  },
  admin: {
    useAsTitle: "email",
    group: {
      en: "User management",
      cs: "Správa uživatelů",
    },
    defaultColumns: ["firstName", "lastName", "role", "email"],
  },  
  labels: {
    plural: {
      en: "Users",
      cs: "Uživatelé",
    },
    singular: {
      en: "User",
      cs: "Uživatel",
    },
  },
  access: {
    read: adminsAndUser,
    create: anyone,
    update: adminsAndUser,
    delete: admins,
    admin: ({ req: { user } }) => checkRole(['admin'], user)
  },
  fields: [
    // Email added by default
    {
      label: {
        cs: "Jméno",
        en: "First Name",
      },
      name: "firstName",
      type: "text",
    },
    {
      label: {
        cs: "Příjmení",
        en: "Last Name",
      },
      name: "lastName",
      type: "text",
    },
    {
      label: {
        cs: "Role",
        en: "Role",
      },
      name: "role",
      type: "select",
      options: [
        {
          label: {
            en: "Admin",
            cs: "Administrátor",
          },
          value: "admin",
        },
        {
          label: {
            en: "User",
            cs: "Uživatel",
          },
          value: "user",
        },
      ],
      defaultValue: "user",
    },
  ],
  hooks: {
    beforeChange: [
      async ({ data, operation, req }) => {
        if (operation === 'create') {
          const preApprovedEmails = await req.payload.findGlobal({
            slug: 'pre-approved-emails',
          });
          
          const emailList = preApprovedEmails?.emailList?.split("\n") || [];

          if (emailList.includes(data.email)) {
            data.confirmed = true;
          }
        }
        return data;
      },
    ],
  },
}
