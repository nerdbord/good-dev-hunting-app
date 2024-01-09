import { httpClient } from '@/lib/httpClient'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    if (!data.message) {
      console.error('message not provided for discord notification')
      return new NextResponse('message not provided for discord notification', {
        status: 500,
      })
    }
    // sending the message through webhook url
    await httpClient.post(`${process.env.TEST_WEBHOOK}`, {
      content: `${data.message}: ${data?.link ? `: ${data.link}` : ''}`,
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
