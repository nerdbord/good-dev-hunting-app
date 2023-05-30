import { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient, Profile } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method Not Allowed' })
  }

  try {
    const publishedRecords = await prisma.profile.findMany({
      where: {
        isPublished: true,
      },
    })

    res.status(200).json({
      message: 'All published profiles are downloaded',
      profiles: publishedRecords,
    })
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' })
  }
}
