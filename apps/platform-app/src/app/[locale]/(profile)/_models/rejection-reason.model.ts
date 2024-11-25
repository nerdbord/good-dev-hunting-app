import type { RejectionReason } from "@prisma/client"

interface RejectionReasonModel {
    rejectionReason: string
}

export function createRejectionReasonModel(data: RejectionReason): RejectionReasonModel {
  return {
    rejectionReason: data.reason
  }
}
