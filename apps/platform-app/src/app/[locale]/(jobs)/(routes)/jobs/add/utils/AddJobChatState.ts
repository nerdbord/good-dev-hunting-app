import { analyzeMessage } from '../../actions/actions'
import type { SubmissionFormData } from '../groq/schema'

interface FormData {
  taskName?: string
  projectBrief?: string
  technologies?: string[]
  budget?: {
    currency?: string
    min?: number
    max?: number
  }
  employmentDetails?: {
    contractType?: string
    workTime?: string
    workMode?: string
    candidateLocations?: string[]
  }
}

export class ChatBotState {
  private formData: Partial<SubmissionFormData> = {}
  private isComplete = false

  public async handleMessage(
    message: string,
    question?: string,
  ): Promise<void> {
    const extractedData = await analyzeMessage({
      question: question || '',
      userResponse: message,
      currentState: JSON.stringify(this.formData),
    })
    this.updateState(extractedData)
  }

  private updateState(data: Partial<FormData>): void {
    Object.entries(data).forEach(([key, value]) => {
      if (value) {
        if (key === 'budget' || key === 'employmentDetails') {
          // @ts-ignore
          this.formData[key] = { ...this.formData[key], ...value }
        } else {
          // @ts-ignore
          this.formData[key] = value
        }
      }
    })
  }

  public getFormData(): Partial<SubmissionFormData> {
    return this.formData
  }

  public checkCompletion(): boolean {
    return this.isComplete
  }
}
