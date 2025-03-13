import { QuestionEditorProps } from "@/types/examTypes";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { PlusIcon, Trash2Icon, CheckCircleIcon } from "lucide-react";

export function QuestionEditor({
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
    "Arabic",
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
  ];

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
              onChange={(e) =>
                updateQuestionPoints(
                  question.id,
                  Number.parseInt(e.target.value) || 1
                )
              }
              className="mt-1 bg-secondary/50 border-secondary"
            />
          </div>
          <div>
            <Label htmlFor={`category-${question.id}`}>Category</Label>
            <Select
              value={question.category || "General"}
              onValueChange={(value) =>
                updateQuestionCategory(question.id, value)
              }
            >
              <SelectTrigger
                id={`category-${question.id}`}
                className="mt-1 bg-secondary/50 border-secondary"
              >
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
                  onValueChange={(value) =>
                    setCorrectOption(question.id, value)
                  }
                  className="flex items-center"
                >
                  <RadioGroupItem value={option.id} id={option.id} />
                </RadioGroup>
                <Input
                  placeholder={`Option ${index + 1}`}
                  value={option.text}
                  onChange={(e) =>
                    updateOption(question.id, option.id, e.target.value)
                  }
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
            value={
              question.correctAnswer === null
                ? ""
                : question.correctAnswer.toString()
            }
            onValueChange={(value) =>
              setTrueFalseAnswer(question.id, value === "true")
            }
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
              onChange={(e) =>
                updateWordLimit(
                  question.id,
                  Number.parseInt(e.target.value) || 500
                )
              }
              className="mt-1 bg-secondary/50 border-secondary"
            />
          </div>
          <div>
            <Label htmlFor={`model-answer-${question.id}`}>
              Model Answer (Optional)
            </Label>
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
  );
}
