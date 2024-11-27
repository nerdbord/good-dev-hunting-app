import { z } from "zod"

export const cvFileSchema = z.object({
  name: z.string(),
  type: z.enum(["application/pdf", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"]),
  size: z.number().max(10 * 1024 * 1024) // maks. 10 MB
})

export type CVfileValidation = z.infer<typeof cvFileSchema>

export function validateFile(file: File): CVfileValidation {
  return cvFileSchema.parse({
    name: file.name,
    type: file.type,
    size: file.size
  })
}