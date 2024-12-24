import configPromise from '@payload-config'
import { getPayload } from 'payload'

export const GET = async () => {
  const payload = await getPayload({
    config: configPromise,
  })


  return Response.json({
    status: 'ok',
    mode: process.env.NODE_ENV,
  })
}
