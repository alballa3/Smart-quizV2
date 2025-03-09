"use client"

import { useState, useEffect } from "react"
import {
  PlusIcon,
  SaveIcon,
  Trash2Icon,
  GripVerticalIcon,
  EyeIcon,
  SparklesIcon,
  CopyIcon,
  TagIcon,
  CheckCircleIcon,
} from "lucide-react"
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { toast } from "@/components/ui/use-toast"
import { cn } from "@/lib/utils"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

import { Badge } from "@/components/ui/badge"

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

// Define QuestionType
type QuestionType = "multiple-choice" | "true-false" | "essay"

// Question type definitions
interface BaseQuestion {
  id: string
  type: QuestionType
  text: string
  points: number
  category?: string
}

interface MultipleChoiceQuestion extends BaseQuestion {
  type: "multiple-choice"
  options: { id: string; text: string }[]
  correctOptionId: string | null
}

interface TrueFalseQuestion extends BaseQuestion {
  type: "true-false"
  correctAnswer: boolean | null
}

interface EssayQuestion extends BaseQuestion {
  type: "essay"
  modelAnswer?: string
  wordLimit?: number
}

type Question = MultipleChoiceQuestion | TrueFalseQuestion | EssayQuestion

// Sample question templates for each type
const multipleChoiceTemplates = [
  {
    text: "Which of the following is a primary color?",
    options: ["Red", "Green", "Purple", "Orange"],
    correctIndex: 0,
    category: "Art",
  },
  {
    text: "What is the capital of France?",
    options: ["London", "Berlin", "Paris", "Madrid"],
    correctIndex: 2,
    category: "Geography",
  },
  {
    text: "Which planet is closest to the sun?",
    options: ["Venus", "Mercury", "Earth", "Mars"],
    correctIndex: 1,
    category: "Science",
  },
  {
    text: "Who wrote 'Romeo and Juliet'?",
    options: ["Charles Dickens", "Jane Austen", "William Shakespeare", "Mark Twain"],
    correctIndex: 2,
    category: "Literature",
  },
  {
    text: "What is the chemical symbol for gold?",
    options: ["Go", "Gd", "Au", "Ag"],
    correctIndex: 2,
    category: "Science",
  },
  {
    text: "Which of these is not a programming language?",
    options: ["Java", "Python", "Cobra", "HTML"],
    correctIndex: 3,
    category: "Computer Science",
  },
  {
    text: "What is the largest mammal on Earth?",
    options: ["African Elephant", "Blue Whale", "Giraffe", "Polar Bear"],
    correctIndex: 1,
    category: "Biology",
  },
]

const trueFalseTemplates = [
  {
    text: "The Earth is the third planet from the Sun.",
    correctAnswer: true,
    category: "Science",
  },
  {
    text: "Water boils at 100 degrees Fahrenheit.",
    correctAnswer: false,
    category: "Science",
  },
  {
    text: "Humans have 206 bones in their body.",
    correctAnswer: true,
    category: "Biology",
  },
  {
    text: "Mount Everest is the tallest mountain in the world.",
    correctAnswer: true,
    category: "Geography",
  },
  {
    text: "The Great Wall of China is visible from space with the naked eye.",
    correctAnswer: false,
    category: "Geography",
  },
  {
    text: "JavaScript is a compiled programming language.",
    correctAnswer: false,
    category: "Computer Science",
  },
  {
    text: "Leonardo da Vinci painted the Mona Lisa.",
    correctAnswer: true,
    category: "Art",
  },
]

const essayTemplates = [
  {
    text: "Explain the causes and effects of climate change.",
    wordLimit: 500,
    modelAnswer:
      "A comprehensive answer would discuss greenhouse gas emissions, industrial activities, deforestation, rising temperatures, extreme weather events, and impacts on ecosystems.",
    category: "Environmental Science",
  },
  {
    text: "Compare and contrast the themes in two works of literature you have studied.",
    wordLimit: 750,
    modelAnswer:
      "Students should identify major themes in two literary works and analyze similarities and differences, providing specific examples from the texts.",
    category: "Literature",
  },
  {
    text: "Discuss the impact of social media on modern society.",
    wordLimit: 600,
    modelAnswer:
      "A strong response would address both positive aspects (connectivity, information sharing) and negative aspects (privacy concerns, mental health impacts, misinformation).",
    category: "Social Studies",
  },
  {
    text: "Analyze the significance of a major historical event of the 20th century.",
    wordLimit: 800,
    modelAnswer:
      "Students should select an event, describe its historical context, analyze its immediate and long-term impacts, and evaluate its historical significance.",
    category: "History",
  },
  {
    text: "Describe how technological advancements have changed education in the past decade.",
    wordLimit: 500,
    modelAnswer:
      "Responses should cover digital learning tools, online education platforms, accessibility improvements, and challenges of technology integration in educational settings.",
    category: "Education",
  },
  {
    text: "Explain the principles of object-oriented programming and provide examples.",
    wordLimit: 600,
    modelAnswer:
      "Students should explain encapsulation, inheritance, polymorphism, and abstraction with practical code examples showing how these principles are implemented.",
    category: "Computer Science",
  },
]

// Update the QuestionPreview component to show more information
interface QuestionPreviewProps {
  question: Question
  index: number
}

function QuestionPreview({ question, index }: QuestionPreviewProps) {
  return (
    <div className="space-y-4">
      <div className="flex justify-between">
        <div className="font-medium">
          {index + 1}. {question.text}
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="text-xs">
            {question.category}
          </Badge>
          <span className="text-sm text-muted-foreground">
            {question.points} {question.points === 1 ? "point" : "points"}
          </span>
        </div>
      </div>

      {question.type === "multiple-choice" && (
        <div className="space-y-2 pl-6">
          {question.options.map((option) => (
            <div key={option.id} className="flex items-center gap-2">
              <RadioGroup value={question.correctOptionId === option.id ? option.id : ""} className="flex items-center">
                <RadioGroupItem value={option.id} id={`preview-${option.id}`} disabled />
              </RadioGroup>
              <Label
                htmlFor={`preview-${option.id}`}
                className={cn(
                  "cursor-pointer",
                  question.correctOptionId === option.id ? "text-primary font-medium" : "",
                )}
              >
                {option.text}
                {question.correctOptionId === option.id && (
                  <span className="ml-2 text-xs text-primary">(Correct Answer)</span>
                )}
              </Label>
            </div>
          ))}
        </div>
      )}

      {question.type === "true-false" && (
        <div className="space-y-2 pl-6">
          <div className="flex items-center gap-2">
            <RadioGroup value={question.correctAnswer === true ? "true" : ""} className="flex items-center">
              <RadioGroupItem value="true" id={`preview-true-${question.id}`} disabled />
            </RadioGroup>
            <Label
              htmlFor={`preview-true-${question.id}`}
              className={cn("cursor-pointer", question.correctAnswer === true ? "text-primary font-medium" : "")}
            >
              True
              {question.correctAnswer === true && <span className="ml-2 text-xs text-primary">(Correct Answer)</span>}
            </Label>
          </div>
          <div className="flex items-center gap-2">
            <RadioGroup value={question.correctAnswer === false ? "false" : ""} className="flex items-center">
              <RadioGroupItem value="false" id={`preview-false-${question.id}`} disabled />
            </RadioGroup>
            <Label
              htmlFor={`preview-false-${question.id}`}
              className={cn("cursor-pointer", question.correctAnswer === false ? "text-primary font-medium" : "")}
            >
              False
              {question.correctAnswer === false && <span className="ml-2 text-xs text-primary">(Correct Answer)</span>}
            </Label>
          </div>
        </div>
      )}

      {question.type === "essay" && (
        <div className="space-y-2">
          <Textarea
            placeholder="Student answer will appear here"
            disabled
            className="min-h-[100px] bg-secondary/20 border-secondary"
          />
          <div className="flex flex-col sm:flex-row justify-between text-sm text-muted-foreground gap-2">
            <div>Word limit: {question.wordLimit} words</div>
            {question.modelAnswer && (
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm" className="text-xs h-7">
                    View Model Answer
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Model Answer</DialogTitle>
                    <DialogDescription>Reference answer or grading rubric for this question</DialogDescription>
                  </DialogHeader>
                  <div className="mt-2 p-4 bg-secondary/20 rounded-md text-sm">{question.modelAnswer}</div>
                </DialogContent>
              </Dialog>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Update the QuestionEditor component to include category selection
interface QuestionEditorProps {
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

function QuestionEditor({
  question,
  updateQuestionText,
  updateQuestionPoints,
  updateQuestionCategory,
  updateOption,
  addOption,
  removeOption,
  setCorrectOption,
  setTrueFalseAnswer,
  updateModelAnswer,
  updateWordLimit,
}: QuestionEditorProps) {
  // Common categories for educational questions
  const categories = [
    "General",
    "Mathematics",
    "Science",
    "Biology",
    "Chemistry",
    "Physics",
    "Computer Science",
    "Literature",
    "History",
    "Geography",
    "Art",
    "Music",
    "Physical Education",
    "Social Studies",
    "Environmental Science",
    "Economics",
    "Psychology",
    "Philosophy",
    "Foreign Languages",
  ]

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="md:col-span-3">
          <Label htmlFor={`question-${question.id}`}>Question Text</Label>
          <Textarea
            id={`question-${question.id}`}
            placeholder="Enter your question"
            value={question.text}
            onChange={(e) => updateQuestionText(question.id, e.target.value)}
            className="mt-1 min-h-[80px] bg-secondary/50 border-secondary"
          />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-1 gap-2">
          <div>
            <Label htmlFor={`points-${question.id}`}>Points</Label>
            <Input
              id={`points-${question.id}`}
              type="number"
              min="1"
              value={question.points}
              onChange={(e) => updateQuestionPoints(question.id, Number.parseInt(e.target.value) || 1)}
              className="mt-1 bg-secondary/50 border-secondary"
            />
          </div>
          <div>
            <Label htmlFor={`category-${question.id}`}>Category</Label>
            <Select
              value={question.category || "General"}
              onValueChange={(value) => updateQuestionCategory(question.id, value)}
            >
              <SelectTrigger id={`category-${question.id}`} className="mt-1 bg-secondary/50 border-secondary">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {question.type === "multiple-choice" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label>Answer Options</Label>
            <Button
              variant="outline"
              size="sm"
              onClick={() => addOption(question.id)}
              className="mt-2 bg-secondary/50 border-secondary"
            >
              <PlusIcon className="h-4 w-4 mr-1" />
              Add Option
            </Button>
          </div>
          {question.options.map((option, index) => (
            <div key={option.id} className="flex items-center gap-2">
              <div className="flex-grow flex items-center gap-2">
                <RadioGroup
                  value={question.correctOptionId || ""}
                  onValueChange={(value) => setCorrectOption(question.id, value)}
                  className="flex items-center"
                >
                  <RadioGroupItem value={option.id} id={option.id} />
                </RadioGroup>
                <Input
                  placeholder={`Option ${index + 1}`}
                  value={option.text}
                  onChange={(e) => updateOption(question.id, option.id, e.target.value)}
                  className="flex-grow bg-secondary/50 border-secondary"
                />
              </div>
              {question.options.length > 2 && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removeOption(question.id, option.id)}
                  className="h-8 w-8 text-destructive hover:text-destructive/90"
                >
                  <Trash2Icon className="h-4 w-4" />
                </Button>
              )}
            </div>
          ))}
          <div className="text-sm text-muted-foreground flex items-center gap-1">
            <CheckCircleIcon className="h-4 w-4 text-primary" />
            Select the radio button next to the correct answer.
          </div>
        </div>
      )}

      {question.type === "true-false" && (
        <div className="space-y-2">
          <Label>Correct Answer</Label>
          <RadioGroup
            value={question.correctAnswer === null ? "" : question.correctAnswer.toString()}
            onValueChange={(value) => setTrueFalseAnswer(question.id, value === "true")}
            className="flex flex-col space-y-1"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="true" id={`true-${question.id}`} />
              <Label htmlFor={`true-${question.id}`}>True</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="false" id={`false-${question.id}`} />
              <Label htmlFor={`false-${question.id}`}>False</Label>
            </div>
          </RadioGroup>
        </div>
      )}

      {question.type === "essay" && (
        <div className="space-y-4">
          <div>
            <Label htmlFor={`word-limit-${question.id}`}>Word Limit</Label>
            <Input
              id={`word-limit-${question.id}`}
              type="number"
              min="1"
              value={question.wordLimit}
              onChange={(e) => updateWordLimit(question.id, Number.parseInt(e.target.value) || 500)}
              className="mt-1 bg-secondary/50 border-secondary"
            />
          </div>
          <div>
            <Label htmlFor={`model-answer-${question.id}`}>Model Answer (Optional)</Label>
            <Textarea
              id={`model-answer-${question.id}`}
              placeholder="Enter a model answer or grading rubric"
              value={question.modelAnswer}
              onChange={(e) => updateModelAnswer(question.id, e.target.value)}
              className="mt-1 min-h-[100px] bg-secondary/50 border-secondary"
            />
          </div>
        </div>
      )}
    </div>
  )
}

// Replace the QuizCreator function with this enhanced version
export function QuizCreator() {
  const [examName, setExamName] = useState("")
  const [examDescription, setExamDescription] = useState("")
  const [questions, setQuestions] = useState<Question[]>([])
  const [activeTab, setActiveTab] = useState<QuestionType>("multiple-choice")
  const [previewMode, setPreviewMode] = useState(false)
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false)
  const [questionToDelete, setQuestionToDelete] = useState<string | null>(null)
  const [isMobile, setIsMobile] = useState(false)

  // Check if the device is mobile
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkIfMobile()
    window.addEventListener("resize", checkIfMobile)

    return () => {
      window.removeEventListener("resize", checkIfMobile)
    }
  }, [])

  // Create a new question based on the selected type
  const addQuestion = () => {
    const newQuestion: Question = createEmptyQuestion(activeTab)
    setQuestions([...questions, newQuestion])

    toast({
      title: "Question Added",
      description: `A new ${activeTab} question has been added to your exam.`,
    })
  }

  // Create an empty question of the specified type
  const createEmptyQuestion = (type: QuestionType): Question => {
    const baseQuestion = {
      id: `question-${Date.now()}`,
      text: "",
      points: 1,
    }

    switch (type) {
      case "multiple-choice":
        return {
          ...baseQuestion,
          type: "multiple-choice",
          options: [
            { id: `option-${Date.now()}-1`, text: "" },
            { id: `option-${Date.now()}-2`, text: "" },
            { id: `option-${Date.now()}-3`, text: "" },
            { id: `option-${Date.now()}-4`, text: "" },
          ],
          correctOptionId: null,
          category: "General",
        }
      case "true-false":
        return {
          ...baseQuestion,
          type: "true-false",
          correctAnswer: null,
          category: "General",
        }
      case "essay":
        return {
          ...baseQuestion,
          type: "essay",
          modelAnswer: "",
          wordLimit: 500,
          category: "General",
        }
    }
  }

  // Duplicate a question
  const duplicateQuestion = (questionId: string) => {
    const questionToDuplicate = questions.find((q) => q.id === questionId)
    if (!questionToDuplicate) return

    // Create a deep copy with a new ID
    const duplicatedQuestion = JSON.parse(JSON.stringify(questionToDuplicate))
    duplicatedQuestion.id = `question-${Date.now()}`

    // For multiple choice, generate new option IDs
    if (duplicatedQuestion.type === "multiple-choice") {
      const correctOptionText =
        questionToDuplicate.type === "multiple-choice" && questionToDuplicate.correctOptionId
          ? questionToDuplicate.options.find((o) => o.id === questionToDuplicate.correctOptionId)?.text
          : null

      duplicatedQuestion.options = duplicatedQuestion.options.map((option: any, index: number) => {
        const newOption = {
          id: `option-${Date.now()}-${index}`,
          text: option.text,
        }

        // If this option was the correct one, update the correctOptionId
        if (correctOptionText && option.text === correctOptionText) {
          duplicatedQuestion.correctOptionId = newOption.id
        }

        return newOption
      })
    }

    // Add the duplicated question after the original
    const index = questions.findIndex((q) => q.id === questionId)
    const newQuestions = [...questions]
    newQuestions.splice(index + 1, 0, duplicatedQuestion)
    setQuestions(newQuestions)

    toast({
      title: "Question Duplicated",
      description: "A copy of the question has been created.",
    })
  }

  const generateRandomQuestion = () => {
    // Create a new question based on the active tab
    const baseQuestion = {
      id: `question-${Date.now()}`,
      points: Math.floor(Math.random() * 5) + 1, // Random points between 1-5
    }

    let newQuestion: Question

    switch (activeTab) {
      case "multiple-choice": {
        const template = multipleChoiceTemplates[Math.floor(Math.random() * multipleChoiceTemplates.length)]
        const options = template.options.map((text, index) => ({
          id: `option-${Date.now()}-${index}`,
          text,
        }))
        newQuestion = {
          ...baseQuestion,
          type: "multiple-choice",
          text: template.text,
          options,
          correctOptionId: options[template.correctIndex].id,
          category: template.category,
        }
        break
      }
      case "true-false": {
        const template = trueFalseTemplates[Math.floor(Math.random() * trueFalseTemplates.length)]
        newQuestion = {
          ...baseQuestion,
          type: "true-false",
          text: template.text,
          correctAnswer: template.correctAnswer,
          category: template.category,
        }
        break
      }
      case "essay": {
        const template = essayTemplates[Math.floor(Math.random() * essayTemplates.length)]
        newQuestion = {
          ...baseQuestion,
          type: "essay",
          text: template.text,
          modelAnswer: template.modelAnswer,
          wordLimit: template.wordLimit,
          category: template.category,
        }
        break
      }
      default:
        throw new Error("Invalid question type")
    }

    setQuestions([...questions, newQuestion])

    toast({
      title: "Question Generated",
      description: `A new ${activeTab} question has been automatically generated.`,
    })
  }

  // Update a question's text
  const updateQuestionText = (id: string, text: string) => {
    setQuestions(questions.map((q) => (q.id === id ? { ...q, text } : q)))
  }

  // Update a question's points
  const updateQuestionPoints = (id: string, points: number) => {
    setQuestions(questions.map((q) => (q.id === id ? { ...q, points } : q)))
  }

  // Update a question's category
  const updateQuestionCategory = (id: string, category: string) => {
    setQuestions(questions.map((q) => (q.id === id ? { ...q, category } : q)))
  }

  // Update a multiple choice option
  const updateOption = (questionId: string, optionId: string, text: string) => {
    setQuestions(
      questions.map((q) => {
        if (q.id === questionId && q.type === "multiple-choice") {
          return {
            ...q,
            options: q.options.map((opt) => (opt.id === optionId ? { ...opt, text } : opt)),
          }
        }
        return q
      }),
    )
  }

  // Add a new option to a multiple choice question
  const addOption = (questionId: string) => {
    setQuestions(
      questions.map((q) => {
        if (q.id === questionId && q.type === "multiple-choice") {
          return {
            ...q,
            options: [...q.options, { id: `option-${Date.now()}`, text: "" }],
          }
        }
        return q
      }),
    )
  }

  // Remove an option from a multiple choice question
  const removeOption = (questionId: string, optionId: string) => {
    setQuestions(
      questions.map((q) => {
        if (q.id === questionId && q.type === "multiple-choice") {
          // If removing the correct option, reset correctOptionId
          const correctOptionId = q.correctOptionId === optionId ? null : q.correctOptionId

          return {
            ...q,
            options: q.options.filter((opt) => opt.id !== optionId),
            correctOptionId,
          }
        }
        return q
      }),
    )
  }

  // Set the correct option for a multiple choice question
  const setCorrectOption = (questionId: string, optionId: string) => {
    setQuestions(
      questions.map((q) => {
        if (q.id === questionId && q.type === "multiple-choice") {
          return {
            ...q,
            correctOptionId: optionId,
          }
        }
        return q
      }),
    )
  }

  // Set the correct answer for a true/false question
  const setTrueFalseAnswer = (questionId: string, value: boolean) => {
    setQuestions(
      questions.map((q) => {
        if (q.id === questionId && q.type === "true-false") {
          return {
            ...q,
            correctAnswer: value,
          }
        }
        return q
      }),
    )
  }

  // Update the model answer for an essay question
  const updateModelAnswer = (questionId: string, modelAnswer: string) => {
    setQuestions(
      questions.map((q) => {
        if (q.id === questionId && q.type === "essay") {
          return {
            ...q,
            modelAnswer,
          }
        }
        return q
      }),
    )
  }

  // Update the word limit for an essay question
  const updateWordLimit = (questionId: string, wordLimit: number) => {
    setQuestions(
      questions.map((q) => {
        if (q.id === questionId && q.type === "essay") {
          return {
            ...q,
            wordLimit,
          }
        }
        return q
      }),
    )
  }

  // Confirm deletion of a question
  const confirmDeleteQuestion = (id: string) => {
    setQuestionToDelete(id)
    setDeleteConfirmOpen(true)
  }

  // Delete a question
  const deleteQuestion = () => {
    if (!questionToDelete) return

    setQuestions(questions.filter((q) => q.id !== questionToDelete))
    setDeleteConfirmOpen(false)
    setQuestionToDelete(null)

    toast({
      title: "Question Deleted",
      description: "The question has been removed from your exam.",
    })
  }

  // Handle drag and drop reordering
  const handleDragEnd = (result: any) => {
    if (!result.destination) return

    const items = Array.from(questions)
    const [reorderedItem] = items.splice(result.source.index, 1)
    items.splice(result.destination.index, 0, reorderedItem)

    setQuestions(items)
  }

  // Generate multiple questions at once
  const generateMultipleQuestions = (count: number) => {
    const newQuestions = []

    for (let i = 0; i < count; i++) {
      // Randomly select a question type
      const types: QuestionType[] = ["multiple-choice", "true-false", "essay"]
      const randomType = types[Math.floor(Math.random() * types.length)]

      // Temporarily set activeTab to generate the right type
      const currentTab = activeTab
      setActiveTab(randomType)

      // Create the question (using the same logic as generateRandomQuestion)
      // This is simplified - in the real implementation you'd need to duplicate the generation logic
      const baseQuestion = {
        id: `question-${Date.now()}-${i}`,
        points: Math.floor(Math.random() * 5) + 1,
      }

      let newQuestion: any

      // Generate based on type (simplified version)
      if (randomType === "multiple-choice") {
        const template = multipleChoiceTemplates[Math.floor(Math.random() * multipleChoiceTemplates.length)]
        const options = template.options.map((text, index) => ({
          id: `option-${Date.now()}-${i}-${index}`,
          text,
        }))
        newQuestion = {
          ...baseQuestion,
          type: "multiple-choice",
          text: template.text,
          options,
          correctOptionId: options[template.correctIndex].id,
          category: template.category,
        }
      } else if (randomType === "true-false") {
        const template = trueFalseTemplates[Math.floor(Math.random() * trueFalseTemplates.length)]
        newQuestion = {
          ...baseQuestion,
          type: "true-false",
          text: template.text,
          correctAnswer: template.correctAnswer,
          category: template.category,
        }
      } else {
        const template = essayTemplates[Math.floor(Math.random() * essayTemplates.length)]
        newQuestion = {
          ...baseQuestion,
          type: "essay",
          text: template.text,
          modelAnswer: template.modelAnswer,
          wordLimit: template.wordLimit,
          category: template.category,
        }
      }

      newQuestions.push(newQuestion)

      // Restore the active tab
      setActiveTab(currentTab)
    }

    setQuestions([...questions, ...newQuestions])

    toast({
      title: "Questions Generated",
      description: `${count} new questions have been added to your exam.`,
    })
  }

  // Save the exam
  const saveExam = () => {
    // Validation
    if (!examName.trim()) {
      toast({
        title: "Validation Error",
        description: "Please provide an exam name.",
        variant: "destructive",
      })
      return
    }

    if (questions.length === 0) {
      toast({
        title: "Validation Error",
        description: "Please add at least one question to your exam.",
        variant: "destructive",
      })
      return
    }

    // Check if all questions have text
    const incompleteQuestions = questions.filter((q) => !q.text.trim())
    if (incompleteQuestions.length > 0) {
      toast({
        title: "Incomplete Questions",
        description: `${incompleteQuestions.length} question(s) are missing text.`,
        variant: "destructive",
      })
      return
    }

    // In a real app, you would save the exam to a database here
    console.log("Saving exam:", { examName, examDescription, questions })

    toast({
      title: "Exam Saved",
      description: `"${examName}" has been saved successfully.`,
    })
  }

  return (
    <div className="space-y-6">
      <Card className="overflow-hidden border-border/40">
        <CardHeader>
          <CardTitle>Exam Details</CardTitle>
          <CardDescription>Provide basic information about your exam</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="exam-name">Exam Name</Label>
            <Input
              id="exam-name"
              placeholder="Enter exam name"
              value={examName}
              onChange={(e) => setExamName(e.target.value)}
              className="bg-secondary/50 border-secondary"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="exam-description">Description (Optional)</Label>
            <Textarea
              id="exam-description"
              placeholder="Enter exam description"
              value={examDescription}
              onChange={(e) => setExamDescription(e.target.value)}
              className="min-h-[100px] bg-secondary/50 border-secondary"
            />
          </div>
        </CardContent>
      </Card>

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <h2 className="text-xl font-bold">Questions</h2>
          <div className="flex items-center gap-2">
            <Switch id="preview-mode" checked={previewMode} onCheckedChange={setPreviewMode} />
            <Label htmlFor="preview-mode" className="cursor-pointer">
              Preview Mode
            </Label>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Tabs
            value={activeTab}
            onValueChange={(value) => setActiveTab(value as QuestionType)}
            className="w-full md:w-auto"
          >
            <TabsList className="bg-secondary w-full md:w-auto grid grid-cols-3 md:flex">
              <TabsTrigger value="multiple-choice" className="text-xs md:text-sm">
                Multiple Choice
              </TabsTrigger>
              <TabsTrigger value="true-false" className="text-xs md:text-sm">
                True/False
              </TabsTrigger>
              <TabsTrigger value="essay" className="text-xs md:text-sm">
                Essay
              </TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="flex gap-2 w-full md:w-auto">
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  variant="outline"
                  size={isMobile ? "sm" : "default"}
                  className="gap-1 bg-secondary/50 border-secondary flex-1 md:flex-none"
                >
                  <SparklesIcon className="h-4 w-4" />
                  <span className="hidden md:inline">Generate</span>
                  <span className="md:hidden">Gen</span>
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Generate Questions</DialogTitle>
                  <DialogDescription>Choose how many questions you want to generate</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="flex justify-between items-center gap-4">
                    <Button
                      onClick={() => {
                        generateMultipleQuestions(1)
                      }}
                      className="flex-1"
                    >
                      1 Question
                    </Button>
                    <Button
                      onClick={() => {
                        generateMultipleQuestions(3)
                      }}
                      className="flex-1"
                    >
                      3 Questions
                    </Button>
                    <Button
                      onClick={() => {
                        generateMultipleQuestions(5)
                      }}
                      className="flex-1"
                    >
                      5 Questions
                    </Button>
                  </div>
                </div>
                <DialogFooter>
                  <Button onClick={generateRandomQuestion} className="w-full">
                    Generate Single {activeTab.replace("-", " ")} Question
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            <Button onClick={addQuestion} size={isMobile ? "sm" : "default"} className="gap-1 flex-1 md:flex-none">
              <PlusIcon className="h-4 w-4" />
              <span className="hidden md:inline">Add Question</span>
              <span className="md:hidden">Add</span>
            </Button>
          </div>
        </div>
      </div>

      {questions.length === 0 ? (
        <Card className="border-dashed border-2 border-border/40 bg-transparent">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <p className="text-muted-foreground mb-4">No questions added yet</p>
            <div className="flex flex-col sm:flex-row gap-2">
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" className="gap-2 bg-secondary/50 border-secondary">
                    <SparklesIcon className="h-4 w-4" />
                    Generate Questions
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Generate Questions</DialogTitle>
                    <DialogDescription>Choose how many questions you want to generate</DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="flex justify-between items-center gap-4">
                      <Button
                        onClick={() => {
                          generateMultipleQuestions(1)
                        }}
                        className="flex-1"
                      >
                        1 Question
                      </Button>
                      <Button
                        onClick={() => {
                          generateMultipleQuestions(3)
                        }}
                        className="flex-1"
                      >
                        3 Questions
                      </Button>
                      <Button
                        onClick={() => {
                          generateMultipleQuestions(5)
                        }}
                        className="flex-1"
                      >
                        5 Questions
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
              <Button onClick={addQuestion} variant="outline" className="gap-2 bg-secondary/50 border-secondary">
                <PlusIcon className="h-4 w-4" />
                Add Your First Question
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="questions">
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-4">
                {questions.map((question, index) => (
                  <Draggable key={question.id} draggableId={question.id} index={index} isDragDisabled={previewMode}>
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        className={cn(
                          "relative transition-all duration-200",
                          snapshot.isDragging ? "z-10 shadow-lg" : "",
                        )}
                      >
                        <Card
                          className={cn(
                            "overflow-hidden",
                            previewMode ? "preview-mode" : "hover-scale border-border/40",
                            snapshot.isDragging ? "border-primary/50 bg-secondary/80" : "",
                          )}
                        >
                          <CardHeader className="flex flex-row items-start justify-between pb-2">
                            <div className="flex items-center gap-2">
                              {!previewMode && (
                                <div {...provided.dragHandleProps} className="cursor-grab">
                                  <GripVerticalIcon className="h-5 w-5 text-muted-foreground" />
                                </div>
                              )}
                              <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-2">
                                <CardTitle className="text-base">
                                  Question {index + 1}
                                  <span className="ml-2 text-sm font-normal text-muted-foreground">
                                    ({question.type.replace("-", " ")})
                                  </span>
                                </CardTitle>
                                {question.category && (
                                  <Badge variant="outline" className="text-xs w-fit">
                                    <TagIcon className="h-3 w-3 mr-1" />
                                    {question.category}
                                  </Badge>
                                )}
                              </div>
                            </div>
                            {!previewMode && (
                              <div className="flex items-center gap-1">
                                <TooltipProvider>
                                  <Tooltip>
                                    <TooltipTrigger asChild>
                                      <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => duplicateQuestion(question.id)}
                                        className="h-8 w-8 text-primary hover:text-primary/90"
                                      >
                                        <CopyIcon className="h-4 w-4" />
                                      </Button>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                      <p>Duplicate Question</p>
                                    </TooltipContent>
                                  </Tooltip>
                                </TooltipProvider>

                                <TooltipProvider>
                                  <Tooltip>
                                    <TooltipTrigger asChild>
                                      <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => confirmDeleteQuestion(question.id)}
                                        className="h-8 w-8 text-destructive hover:text-destructive/90"
                                      >
                                        <Trash2Icon className="h-4 w-4" />
                                      </Button>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                      <p>Delete Question</p>
                                    </TooltipContent>
                                  </Tooltip>
                                </TooltipProvider>
                              </div>
                            )}
                          </CardHeader>
                          <CardContent>
                            {previewMode ? (
                              <QuestionPreview question={question} index={index} />
                            ) : (
                              <QuestionEditor
                                question={question}
                                updateQuestionText={updateQuestionText}
                                updateQuestionPoints={updateQuestionPoints}
                                updateQuestionCategory={updateQuestionCategory}
                                updateOption={updateOption}
                                addOption={addOption}
                                removeOption={removeOption}
                                setCorrectOption={setCorrectOption}
                                setTrueFalseAnswer={setTrueFalseAnswer}
                                updateModelAnswer={updateModelAnswer}
                                updateWordLimit={updateWordLimit}
                              />
                            )}
                          </CardContent>
                        </Card>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      )}

      <div className="flex flex-col sm:flex-row justify-between gap-2 pt-4">
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="text-xs">
            {questions.length} {questions.length === 1 ? "Question" : "Questions"}
          </Badge>
          <Badge variant="outline" className="text-xs">
            Total Points: {questions.reduce((sum, q) => sum + q.points, 0)}
          </Badge>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2 bg-secondary/50 border-secondary">
            <EyeIcon className="h-4 w-4" />
            Preview Exam
          </Button>
          <Button onClick={saveExam} className="gap-2">
            <SaveIcon className="h-4 w-4" />
            Save Exam
          </Button>
        </div>
      </div>

      {/* Delete confirmation dialog */}
      <AlertDialog open={deleteConfirmOpen} onOpenChange={setDeleteConfirmOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete this question. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={deleteQuestion} className="bg-destructive text-destructive-foreground">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

