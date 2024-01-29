// import { saveContactRequest } from '@/backend/contactRequest/contactRequest.service'
// import {
//   createIpTrack,
//   findIpTrack,
//   updateIpTrack,
// } from '@/backend/ipTrack/ipTrack.service'
// import { ContactFormRequest } from '@/components/ContactForm/schema'
// import { NextApiRequest } from 'next'
// import { NextResponse } from 'next/server'
// import requestIp from 'request-ip'
import { saveContactRequest } from '@/backend/contactRequest/contactRequest.service'
import {
  createIpTrack,
  findIpTrack,
  updateIpTrack,
} from '@/backend/ipTrack/ipTrack.service'
import { ContactFormRequest } from '@/components/ContactForm/schema'
import { NextRequest, NextResponse } from 'next/server'

// export async function POST(request: NextApiRequest) {
//   try {
//     const contactFormRequest: ContactFormRequest = await request.body

//     const detectedIp = requestIp.getClientIp(request)
//     if (!detectedIp) {
//       return NextResponse.json({
//         status: 403,
//         message: `Spam prevention, ip is undefined, headers: ${JSON.stringify(
//           request.headers,
//         )}`,
//       })
//     }
//     const ipTrack = await findIpTrack(detectedIp)
//     if (ipTrack) {
//       if (ipTrack.profileIds.includes(contactFormRequest.profileId)) {
//         return NextResponse.json({
//           status: 403,
//           message:
//             "Spam prevention, you've sent already message to this profile",
//         })
//       } else {
//         updateIpTrack(ipTrack.ip, [
//           ...ipTrack.profileIds,
//           contactFormRequest.profileId,
//         ])
//       }
//     } else {
//       createIpTrack(detectedIp, [contactFormRequest.profileId])
//     }
//     const createdContactRequest = await saveContactRequest(contactFormRequest)
//     return NextResponse.json({
//       status: 201,
//       contactRequest: createdContactRequest,
//     })
//   } catch (error) {
//     console.log('Error:', error)
//     return new NextResponse(`${error}`, { status: 500 })
//   }
// }

export async function POST(request: NextRequest) {
  try {
    const contactFormRequest: ContactFormRequest = await request.json()

    const detectedIp = request.ip
    if (!detectedIp) {
      return NextResponse.json({
        status: 403,
        message: `Spam prevention, ip is undefined, headers: ${JSON.stringify(
          request.headers,
        )}`,
      })
    }
    const ipTrack = await findIpTrack(detectedIp)
    if (ipTrack) {
      if (ipTrack.profileIds.includes(contactFormRequest.profileId)) {
        return NextResponse.json({
          status: 403,
          message:
            "Spam prevention, you've sent already message to this profile",
        })
      } else {
        updateIpTrack(ipTrack.ip, [
          ...ipTrack.profileIds,
          contactFormRequest.profileId,
        ])
      }
    } else {
      createIpTrack(detectedIp, [contactFormRequest.profileId])
    }
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
