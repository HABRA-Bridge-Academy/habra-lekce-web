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

export default buildConfig({
  admin: {
    user: Users.slug,
    bundler: webpackBundler(),

    meta: {
      titleSuffix: '- HABRA Admin',
      favicon: '/assets/favicon-green-admin.png',
      ogImage: '/assets/logo.svg',
    },
    components: {
      graphics: {
        Logo: Logo,
        Icon: Icon,
      }
    },  
    webpack: (config) => {
      config.resolve.alias = {
        ...config.resolve.alias,
        '@': path.resolve(__dirname),
      }
      return config
    }
  },

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
})
