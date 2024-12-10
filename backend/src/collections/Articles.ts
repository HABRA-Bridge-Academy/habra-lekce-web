import { admins } from '@/access'
import { Access, CollectionConfig } from 'payload'

// @ts-ignore invalid typing in payload
const userOrPublic: Access = ({
  req: { user },
  doc,
}: {
  req: { user: any }
  doc: any
}) => user || doc.public


const Articles: CollectionConfig = {
  slug: 'articles',
  admin: {
    useAsTitle: 'title',
    group: {
      en: 'Teaching',
      cs: 'Výuka',
    },
    defaultColumns: ['title', 'public', 'meta', 'created'],
  },
  access: {
    create: admins,
    read: userOrPublic,
    update: admins,
    delete: admins,
  },
  fields: [
    { name: 'title', type: 'text', required: true },
    {
      name: 'content',
      type: 'textarea',
      required: true,
      access: {
        read: ({ req: { user }, doc }) => user || doc.public,
      },
    },
    { name: 'public', type: 'checkbox', defaultValue: false },
    { name: 'created', type: 'date', required: true, defaultValue: () => Date.now() },
    { name: 'meta', type: 'json' },
  ],
  labels: {
    singular: {
      cs: 'Lekce',
      en: 'Lesson',
    },
    plural: {
      cs: 'Lekce',
      en: 'Lessons',
    },
  },
}

export default Articles
