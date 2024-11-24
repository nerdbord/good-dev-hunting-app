interface RejectionReasonModel {
    rejectionReason: string
}

export function createRejectionReasonModel(data: any): RejectionReasonModel {
  return {
    rejectionReason: data.rejection
  }
}
