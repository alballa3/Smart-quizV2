// Define QuestionType
export type QuestionType = "multiple-choice" | "true-false" | "essay"

// Question type definitions
export interface BaseQuestion {
  id: string
  type: QuestionType
  text: string
  points: number
  category?: string
}

export interface MultipleChoiceQuestion extends BaseQuestion {
  type: "multiple-choice"
  options: { id: string; text: string }[]
  correctOptionId: string | null
}

export interface TrueFalseQuestion extends BaseQuestion {
  type: "true-false"
  correctAnswer: boolean | null
}

export interface EssayQuestion extends BaseQuestion {
  type: "essay"
  modelAnswer?: string
  wordLimit?: number
}
export interface QuestionEditorProps {
    question: Question
    updateQuestionText: (id: string, text: string) => void
    updateQuestionPoints: (id: string, points: number) => void
    updateQuestionCategory: (id: string, category: string) => void
    updateOption: (questionId: string, optionId: string, text: string) => void
    addOption: (questionId: string) => void
    removeOption: (questionId: string, optionId: string) => void
    setCorrectOption: (questionId: string, optionId: string) => void
    setTrueFalseAnswer: (questionId: string, value: boolean) => void
    updateModelAnswer: (questionId: string, modelAnswer: string) => void
    updateWordLimit: (questionId: string, wordLimit: number) => void
  }
export type Question = MultipleChoiceQuestion | TrueFalseQuestion | EssayQuestion
