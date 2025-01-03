import { anyone } from '@/access'
import { GlobalConfig } from 'payload'

const Homepage: GlobalConfig = {
  slug: 'homepage',
  label: {
    en: 'Homepage',
    cs: 'Domovská stránka',
  },
  access: {
    read: anyone
  },
  admin: {
    description: {
      en: 'Homepage settings',
      cs: 'Nastavení domovské stránky',
    },
    group: {
      en: 'Teaching',
      cs: 'Výuka',
    },
  },
  fields: [
    {
      name: 'content',
      type: 'richText',
      label: {
        en: 'Content',
        cs: 'Obsah',
      },
    },
  ],
}

export default Homepage
