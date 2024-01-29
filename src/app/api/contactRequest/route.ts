import { saveContactRequest } from '@/backend/contactRequest/contactRequest.service'
import { ContactFormRequest } from '@/components/ContactForm/schema'
import { NextRequest, NextResponse } from 'next/server'
export async function POST(request: NextRequest) {
  try {
    const contactFormRequest: ContactFormRequest = await request.json()

    const createdContactRequest = await saveContactRequest(contactFormRequest)

    return NextResponse.json({
      status: 201,
      contactRequest: createdContactRequest,
    })
  } catch (error) {
    console.log('Error:', error)
    return new NextResponse(`${error}`, { status: 500 })
  }
}
