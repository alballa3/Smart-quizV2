
import { Button } from "@/components/ui/button";

import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Badge } from "@/components/ui/badge";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Question } from "@/types/examTypes";
interface QuestionPreviewProps {
  question: Question;
  index: number;
}

export default function QuestionPreview({
  question,
  index,
}: QuestionPreviewProps) {
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
              <RadioGroup
                value={question.correctOptionId === option.id ? option.id : ""}
                className="flex items-center"
              >
                <RadioGroupItem
                  value={option.id}
                  id={`preview-${option.id}`}
                  disabled
                />
              </RadioGroup>
              <Label
                htmlFor={`preview-${option.id}`}
                className={cn(
                  "cursor-pointer",
                  question.correctOptionId === option.id
                    ? "text-primary font-medium"
                    : ""
                )}
              >
                {option.text}
                {question.correctOptionId === option.id && (
                  <span className="ml-2 text-xs text-primary">
                    (Correct Answer)
                  </span>
                )}
              </Label>
            </div>
          ))}
        </div>
      )}

      {question.type === "true-false" && (
        <div className="space-y-2 pl-6">
          <div className="flex items-center gap-2">
            <RadioGroup
              value={question.correctAnswer === true ? "true" : ""}
              className="flex items-center"
            >
              <RadioGroupItem
                value="true"
                id={`preview-true-${question.id}`}
                disabled
              />
            </RadioGroup>
            <Label
              htmlFor={`preview-true-${question.id}`}
              className={cn(
                "cursor-pointer",
                question.correctAnswer === true
                  ? "text-primary font-medium"
                  : ""
              )}
            >
              True
              {question.correctAnswer === true && (
                <span className="ml-2 text-xs text-primary">
                  (Correct Answer)
                </span>
              )}
            </Label>
          </div>
          <div className="flex items-center gap-2">
            <RadioGroup
              value={question.correctAnswer === false ? "false" : ""}
              className="flex items-center"
            >
              <RadioGroupItem
                value="false"
                id={`preview-false-${question.id}`}
                disabled
              />
            </RadioGroup>
            <Label
              htmlFor={`preview-false-${question.id}`}
              className={cn(
                "cursor-pointer",
                question.correctAnswer === false
                  ? "text-primary font-medium"
                  : ""
              )}
            >
              False
              {question.correctAnswer === false && (
                <span className="ml-2 text-xs text-primary">
                  (Correct Answer)
                </span>
              )}
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
                    <DialogDescription>
                      Reference answer or grading rubric for this question
                    </DialogDescription>
                  </DialogHeader>
                  <div className="mt-2 p-4 bg-secondary/20 rounded-md text-sm">
                    {question.modelAnswer}
                  </div>
                </DialogContent>
              </Dialog>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
