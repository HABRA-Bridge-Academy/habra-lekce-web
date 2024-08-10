import { CollectionConfig } from 'payload/types'

const Articles: CollectionConfig = {
  slug: 'articles',
  admin: {
    useAsTitle: 'title',
  },
  fields: [

{ name: 'title', type: 'text', required: true },
{ name: 'content', type: 'richText', required: true },
{ name: 'public', type: 'checkbox', defaultValue: false },
{ name: 'created', type: 'date', required: true, defaultValue: Date.now },
{ name: 'meta', type: 'json' },
  ],
}

export default Articles
