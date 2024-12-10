import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  auth: true,
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
}
