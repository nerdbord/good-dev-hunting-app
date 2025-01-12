import { analyzeMessage } from '../actions/actions'

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
  private formData: FormData = {}
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

  public getMissingField = (): { field: string; question: string } => {
    if (!this.formData.taskName)
      return { field: 'taskName', question: 'What is the task name?' }
    if (!this.formData.projectBrief)
      return {
        field: 'projectBrief',
        question: 'Can you provide a brief for the project?',
      }
    if (!this.formData.technologies || this.formData.technologies.length === 0)
      return {
        field: 'technologies',
        question: 'What technologies are required?',
      }
    if (!this.formData.budget?.currency)
      return {
        field: 'budget.currency',
        question: 'What is the budget currency?',
      }
    if (!this.formData.budget?.min)
      return { field: 'budget.min', question: 'What is the minimum budget?' }
    if (!this.formData.budget?.max)
      return { field: 'budget.max', question: 'What is the maximum budget?' }
    if (!this.formData.employmentDetails?.contractType)
      return {
        field: 'employmentDetails.contractType',
        question: 'What is the contract type?',
      }
    if (!this.formData.employmentDetails?.workTime)
      return {
        field: 'employmentDetails.workTime',
        question: 'What is the work time?',
      }
    if (!this.formData.employmentDetails?.workMode)
      return {
        field: 'employmentDetails.workMode',
        question: 'What is the work mode?',
      }
    if (
      !this.formData.employmentDetails?.candidateLocations ||
      this.formData.employmentDetails?.candidateLocations.length === 0
    )
      return {
        field: 'employmentDetails.candidateLocations',
        question: 'What are the preferred locations?',
      }
    return { field: '', question: 'Form is complete' }
  }

  public setFormField(field: string, value: any): void {
    const fieldParts = field.split('.')

    if (fieldParts.length === 1) {
      // @ts-ignore
      this.formData[field] = value
    } else if (fieldParts.length === 2) {
      const [parent, child] = fieldParts
      // @ts-ignore
      if (!this.formData[parent]) {
        // @ts-ignore
        this.formData[parent] = {}
      }
      // @ts-ignore
      this.formData[parent][child] = value
    }
  }

  private updateState(data: Partial<FormData>): void {
    Object.entries(data).forEach(([key, value]) => {
      if (value && value !== 'NO_DATA') {
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

  public getFormData(): FormData {
    return this.formData
  }

  public checkCompletion(): boolean {
    return this.isComplete
  }
}
