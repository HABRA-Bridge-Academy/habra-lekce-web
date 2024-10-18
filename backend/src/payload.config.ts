import path from 'path'

import { payloadCloud } from '@payloadcms/plugin-cloud'
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { webpackBundler } from '@payloadcms/bundler-webpack'
import { buildConfig } from 'payload/config'
import { lexicalEditor } from '@payloadcms/richtext-lexical'

import Users from './collections/users/Users'
import Articles from './collections/articles/Articles'
import Logo from './components/Logo'
import Icon from './components/Icon'
import VersionInfo from './components/VersionInfo'

const DEV = process.env.NODE_ENV === 'development';
const APP_PORT = process.env.APP_PORT || 3100;
const FRONTEND_DEV_URL = process.env.FRONTEND_DEV_URL || "http://localhost:8080"; 
const LOCAL = process.env.PAYLOAD_PUBLIC_LOCAL || false;
const ALLOWED_URLS = [
  'http://vyuka.bridzhavirov.cz',
  'https://vyuka.bridzhavirov.cz',
  'http://www.vyuka.bridzhavirov.cz',
  'https://www.vyuka.bridzhavirov.cz',
  ...(DEV ? [FRONTEND_DEV_URL] : []),  
]

export default buildConfig({
  admin: {
    user: Users.slug,
    bundler: webpackBundler(),

    meta: {
      titleSuffix: '- HABRA Admin',
      favicon: LOCAL ? '/assets/favicon-green-admin-local.png' 
               : DEV ? '/assets/favicon-green-admin-dev.png' 
               : '/assets/favicon-green-admin.png',
      ogImage: '/assets/logo.svg',
    },
    components: {
      graphics: {
        Logo: Logo,
        Icon: Icon,
      },
      afterNavLinks: [
        VersionInfo
      ]
      
    }
  },

  csrf: ALLOWED_URLS,
  cors: ALLOWED_URLS,
   editor: lexicalEditor({}),
  collections: [Users, Articles],
  typescript: {
    outputFile: path.resolve(__dirname, 'payload-types.ts'),
  },
  graphQL: {
    schemaOutputFile: path.resolve(__dirname, 'generated-schema.graphql'),
  },
  plugins: [payloadCloud()],
  db: mongooseAdapter({
    url: process.env.DATABASE_URI,
  }),
  custom: {
    port: APP_PORT,
  }
})
