import { withPayload } from '@payloadcms/next/withPayload'

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone"
}

process.on('unhandledRejection', error => {
	console.log('unhandledRejection', error);
});

export default withPayload(nextConfig)
