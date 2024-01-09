import { httpClient } from '@/lib/httpClient'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { message, link } = await request.json()
    if (!message || !link) {
      console.error('message or link not provided for discord notification')
      return new NextResponse(
        'message or link not provided for discord notification',
        { status: 500 },
      )
    }
    // sending the message through webhook url
    await httpClient.post(`${process.env.TEST_WEBHOOK}`, {
      content: `${message}: ${link}`,
    })
    return new NextResponse(`Message sent succesfully to discord`, {
      status: 200,
    })
  } catch (error) {
    console.log(error)
    return new NextResponse(`Error: ${error as Error}`, {
      status: 500,
    })
  }
}
