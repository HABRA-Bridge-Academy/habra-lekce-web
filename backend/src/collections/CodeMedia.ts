import type { CollectionConfig } from 'payload'

export const CodeMedia: CollectionConfig = {
  slug: 'code-media',
  access: {
    read: () => true,
  },
  fields: [
  ],
  upload: {
    staticDir: "code-media",
  }
}
