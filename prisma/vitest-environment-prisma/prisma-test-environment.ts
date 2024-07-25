import 'dotenv/config'
import { randomUUID } from 'node:crypto'
import { execSync } from 'node:child_process'

import { Environment } from 'vitest'
import { prisma } from '@/lib/prisma'

function generateDatabaseUrl(schema: string) {
  if (!process.env.DATABASE_URL) {
    throw new Error('Please provide a DATABASE_URL environment variable')
  }

  const url = new URL(process.env.DATABASE_URL)
  url.searchParams.set('schema', schema)

  return url.toString()
}

export default <Environment>{
  transformMode: 'ssr',
  name: 'prisma',
  async setup() {
    const schema = randomUUID()
    const databaseURL = generateDatabaseUrl(schema)

    process.env.DATABASE_URL = databaseURL

    execSync('npx prisma migrate deploy')

    return {
      async teardown() {
        await prisma.$executeRawUnsafe(
          `DROP SCHEMA IF EXISTS "${schema} CASCADE"`,
        )
        await prisma.$disconnect()
      },
    }
  },
}
