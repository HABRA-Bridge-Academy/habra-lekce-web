// storage-adapter-import-placeholder
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { payloadCloudPlugin } from '@payloadcms/payload-cloud'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import Articles from './collections/Articles'
import PreApprovedEmails from './globals/PreapprovedEmails'
import { en } from '@payloadcms/translations/languages/en'
import { cs } from '@payloadcms/translations/languages/cs'
import { CodeMedia } from './collections/CodeMedia'
import { DEV, LOCAL_SERVER } from './debug'
import Homepage from './globals/Homepage'

const FRONTEND_DEV_URL = process.env.FRONTEND_DEV_URL || 'http://localhost:8081'
const ALLOWED_URLS = [
  'http://vyuka.bridzhavirov.cz',
  'https://vyuka.bridzhavirov.cz',
  'http://www.vyuka.bridzhavirov.cz',
  'https://www.vyuka.bridzhavirov.cz',
  ...(DEV ? [FRONTEND_DEV_URL] : []),
]

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  // debug: DEV,
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname, 'src'),
    },
    meta: {
      titleSuffix: '- HABRA Admin',
      icons: [
        {
          rel: 'icon',
          type: 'image/png',

          url: LOCAL_SERVER
            ? '/assets/favicon-green-admin-local.png'
            : DEV
              ? '/assets/favicon-green-admin-dev.png'
              : '/assets/favicon-green-admin.png',
        },
      ],
    },
    components: {
      graphics: {
        Logo: 'src/components/Logo',
        Icon: 'src/components/Icon',
      },
      afterNavLinks: [
        // VersionInfo
      ],
    },
  },
  i18n: {
    supportedLanguages: { en, cs },
  },
  collections: [Users, Media, Articles, CodeMedia],
  globals: [PreApprovedEmails, Homepage],
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  cors: {
    origins: ALLOWED_URLS,
  },
  // csrf: ALLOWED_URLS,
  db: mongooseAdapter({
    url: process.env.DATABASE_URI || '',
  }),
  editor: lexicalEditor(),
  sharp,
  plugins: [
    payloadCloudPlugin(),
    // storage-adapter-placeholder
  ],
})
