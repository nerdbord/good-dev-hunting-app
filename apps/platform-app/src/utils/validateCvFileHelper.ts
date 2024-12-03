import { z } from 'zod'

export const cvFileSchema = z.object({
  name: z.string(),
  type: z.literal('application/pdf'),
  size: z.number().max(4.5 * 1024 * 1024), // 4.5 MB
})

export type CVfileValidation = z.infer<typeof cvFileSchema>

export function validateCvFile(file: File): CVfileValidation {
  return cvFileSchema.parse({
    name: file.name,
    type: file.type,
    size: file.size,
  })
}
