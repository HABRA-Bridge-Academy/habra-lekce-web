import configPromise from '@payload-config'
import { getPayload } from 'payload'

const deploytime = process.env.PAYLOAD_PUBLIC_DEPLOY_TIME;
const gitref = process.env.PAYLOAD_PUBLIC_VERSION;
const local = process.env.PAYLOAD_PUBLIC_LOCAL;

export const GET = async () => {
  const payload = await getPayload({
    config: configPromise,
  })

  return Response.json({
    status: 'ok',
    deploytime,
    gitref,
    local,
    mode: process.env.NODE_ENV,
  })
}
