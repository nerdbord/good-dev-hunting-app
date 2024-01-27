import { getTechnologies } from '@/backend/filters/filters.service'
import { NextResponse } from 'next/server'
export async function GET() {
  try {
    const technologies = await getTechnologies()

    return NextResponse.json({
      technologies,
    })
  } catch (error) {
    return new Response(`${error}`, { status: 500 })
  }
}
