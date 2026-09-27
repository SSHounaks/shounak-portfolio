import { build } from 'velite'

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
  },
}

export default async function (phase) {
  const isDev = phase === 'phase-development-server'
  await build({ watch: isDev })
  return nextConfig
}
