"use client";

import { useState, useEffect } from "react";
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
} from "lucide-react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/components/ui/use-toast";
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

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import { Badge } from "@/components/ui/badge";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import QuestionPreview from "@/components/pages/dashboard/exam/create/questionPreview";
import { Question, QuestionType } from "@/types/examTypes";
import { QuestionEditor } from "@/components/pages/dashboard/exam/create/questionEditier";
import DashboardLayout from "@/components/layout/dashbored";
import GenerateQuestion from "@/components/pages/dashboard/exam/create/generateQuestion";

export default function QuizCreator() {
  const [examName, setExamName] = useState("Exam Name");
  const [examDescription, setExamDescription] = useState("This is Simple Storys");
  const [questions, setQuestions] = useState<Question[]>([]);
  const [activeTab, setActiveTab] = useState<QuestionType>("multiple-choice");
  const [previewMode, setPreviewMode] = useState(false);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [questionToDelete, setQuestionToDelete] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  // Check if the device is mobile
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);

    return () => {
      window.removeEventListener("resize", checkIfMobile);
    };
  }, []);

  // Create a new question based on the selected type
  const addQuestion = () => {
    const newQuestion: Question = createEmptyQuestion(activeTab);
    setQuestions([...questions, newQuestion]);

    toast({
      title: "Question Added",
      description: `A new ${activeTab} question has been added to your exam.`,
    });
  };

  // Create an empty question of the specified type
  const createEmptyQuestion = (type: QuestionType): Question => {
    const baseQuestion = {
      id: `question-${Date.now()}`,
      text: "",
      points: 1,
    };

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
        };
      case "true-false":
        return {
          ...baseQuestion,
          type: "true-false",
          correctAnswer: null,
          category: "General",
        };
      case "essay":
        return {
          ...baseQuestion,
          type: "essay",
          modelAnswer: "",
          wordLimit: 500,
          category: "General",
        };
    }
  };

  // Duplicate a question
  const duplicateQuestion = (questionId: string) => {
    const questionToDuplicate = questions.find((q) => q.id === questionId);
    if (!questionToDuplicate) return;

    // Create a deep copy with a new ID
    const duplicatedQuestion = JSON.parse(JSON.stringify(questionToDuplicate));
    duplicatedQuestion.id = `question-${Date.now()}`;

    // For multiple choice, generate new option IDs
    if (duplicatedQuestion.type === "multiple-choice") {
      const correctOptionText =
        questionToDuplicate.type === "multiple-choice" &&
        questionToDuplicate.correctOptionId
          ? questionToDuplicate.options.find(
              (o) => o.id === questionToDuplicate.correctOptionId
            )?.text
          : null;

      duplicatedQuestion.options = duplicatedQuestion.options.map(
        (option: any, index: number) => {
          const newOption = {
            id: `option-${Date.now()}-${index}`,
            text: option.text,
          };

          // If this option was the correct one, update the correctOptionId
          if (correctOptionText && option.text === correctOptionText) {
            duplicatedQuestion.correctOptionId = newOption.id;
          }

          return newOption;
        }
      );
    }

    // Add the duplicated question after the original
    const index = questions.findIndex((q) => q.id === questionId);
    const newQuestions = [...questions];
    newQuestions.splice(index + 1, 0, duplicatedQuestion);
    setQuestions(newQuestions);

    toast({
      title: "Question Duplicated",
      description: "A copy of the question has been created.",
    });
  };

  // Update a question's text
  const updateQuestionText = (id: string, text: string) => {
    setQuestions(questions.map((q) => (q.id === id ? { ...q, text } : q)));
  };

  // Update a question's points
  const updateQuestionPoints = (id: string, points: number) => {
    setQuestions(questions.map((q) => (q.id === id ? { ...q, points } : q)));
  };

  // Update a question's category
  const updateQuestionCategory = (id: string, category: string) => {
    setQuestions(questions.map((q) => (q.id === id ? { ...q, category } : q)));
  };

  // Update a multiple choice option
  const updateOption = (questionId: string, optionId: string, text: string) => {
    setQuestions(
      questions.map((q) => {
        if (q.id === questionId && q.type === "multiple-choice") {
          return {
            ...q,
            options: q.options.map((opt) =>
              opt.id === optionId ? { ...opt, text } : opt
            ),
          };
        }
        return q;
      })
    );
  };

  // Add a new option to a multiple choice question
  const addOption = (questionId: string) => {
    setQuestions(
      questions.map((q) => {
        if (q.id === questionId && q.type === "multiple-choice") {
          return {
            ...q,
            options: [...q.options, { id: `option-${Date.now()}`, text: "" }],
          };
        }
        return q;
      })
    );
  };

  // Remove an option from a multiple choice question
  const removeOption = (questionId: string, optionId: string) => {
    setQuestions(
      questions.map((q) => {
        if (q.id === questionId && q.type === "multiple-choice") {
          // If removing the correct option, reset correctOptionId
          const correctOptionId =
            q.correctOptionId === optionId ? null : q.correctOptionId;

          return {
            ...q,
            options: q.options.filter((opt) => opt.id !== optionId),
            correctOptionId,
          };
        }
        return q;
      })
    );
  };

  // Set the correct option for a multiple choice question
  const setCorrectOption = (questionId: string, optionId: string) => {
    setQuestions(
      questions.map((q) => {
        if (q.id === questionId && q.type === "multiple-choice") {
          return {
            ...q,
            correctOptionId: optionId,
          };
        }
        return q;
      })
    );
  };

  // Set the correct answer for a true/false question
  const setTrueFalseAnswer = (questionId: string, value: boolean) => {
    setQuestions(
      questions.map((q) => {
        if (q.id === questionId && q.type === "true-false") {
          return {
            ...q,
            correctAnswer: value,
          };
        }
        return q;
      })
    );
  };

  // Update the model answer for an essay question
  const updateModelAnswer = (questionId: string, modelAnswer: string) => {
    setQuestions(
      questions.map((q) => {
        if (q.id === questionId && q.type === "essay") {
          return {
            ...q,
            modelAnswer,
          };
        }
        return q;
      })
    );
  };

  // Update the word limit for an essay question
  const updateWordLimit = (questionId: string, wordLimit: number) => {
    setQuestions(
      questions.map((q) => {
        if (q.id === questionId && q.type === "essay") {
          return {
            ...q,
            wordLimit,
          };
        }
        return q;
      })
    );
  };

  // Confirm deletion of a question
  const confirmDeleteQuestion = (id: string) => {
    setQuestionToDelete(id);
    setDeleteConfirmOpen(true);
  };

  // Delete a question
  const deleteQuestion = () => {
    if (!questionToDelete) return;

    setQuestions(questions.filter((q) => q.id !== questionToDelete));
    setDeleteConfirmOpen(false);
    setQuestionToDelete(null);

    toast({
      title: "Question Deleted",
      description: "The question has been removed from your exam.",
    });
  };

  // Handle drag and drop reordering
  const handleDragEnd = (result: any) => {
    if (!result.destination) return;

    const items = Array.from(questions);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setQuestions(items);
  };

  // Generate multiple questions at once


  // Save the exam
  const saveExam = () => {
    // Validation
    if (!examName.trim()) {
      toast({
        title: "Validation Error",
        description: "Please provide an exam name.",
        variant: "destructive",
      });
      return;
    }

    if (questions.length === 0) {
      toast({
        title: "Validation Error",
        description: "Please add at least one question to your exam.",
        variant: "destructive",
      });
      return;
    }

    // Check if all questions have text
    const incompleteQuestions = questions.filter((q) => !q.text.trim());
    if (incompleteQuestions.length > 0) {
      toast({
        title: "Incomplete Questions",
        description: `${incompleteQuestions.length} question(s) are missing text.`,
        variant: "destructive",
      });
      return;
    }

    // In a real app, you would save the exam to a database here
    console.log("Saving exam:", { examName, examDescription, questions });

    toast({
      title: "Exam Saved",
      description: `"${examName}" has been saved successfully.`,
    });
  };

  return (
    <DashboardLayout title="Create Exam">
      <div className="container mx-auto px-4 py-6 max-w-5xl">
        <Card className="overflow-hidden border-border/40 w-full">
          <CardHeader>
            <CardTitle>Exam Details</CardTitle>
            <CardDescription>
              Provide basic information about your exam
            </CardDescription>
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
                placeholder="description will provide more information about your exam so AI can understand better"
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
              <Switch
                id="preview-mode"
                checked={previewMode}
                onCheckedChange={setPreviewMode}
              />
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
                <TabsTrigger
                  value="multiple-choice"
                  className="text-xs md:text-sm"
                >
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
              <GenerateQuestion
                setActiveTab={setActiveTab}
                isMobile={isMobile}
                activeTab={activeTab}
                questions={questions}
                setQuestions={setQuestions}
              />
              <Button
                onClick={addQuestion}
                size={isMobile ? "sm" : "default"}
                className="gap-1 flex-1 md:flex-none"
              >
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
              <p className="text-muted-foreground mb-4">
                No questions added yet
              </p>
              <div className="flex flex-col sm:flex-row gap-2">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      variant="outline"
                      className="gap-2 bg-secondary/50 border-secondary"
                    >
                      <SparklesIcon className="h-4 w-4" />
                      Generate Questions
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Generate Questions</DialogTitle>
                      <DialogDescription>
                        Choose how many questions you want to generate
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="flex justify-between items-center gap-4">
                        <Button className="flex-1">1 Question</Button>
                        <Button className="flex-1">3 Questions</Button>
                        <Button className="flex-1">5 Questions</Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
                <Button
                  onClick={addQuestion}
                  variant="outline"
                  className="gap-2 bg-secondary/50 border-secondary"
                >
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
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className="space-y-4"
                >
                  {questions.map((question, index) => (
                    <Draggable
                      key={question.id}
                      draggableId={question.id}
                      index={index}
                      isDragDisabled={previewMode}
                    >
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          className={cn(
                            "relative transition-all duration-200",
                            snapshot.isDragging ? "z-10 shadow-lg" : ""
                          )}
                        >
                          <Card
                            className={cn(
                              "overflow-hidden",
                              previewMode
                                ? "preview-mode"
                                : "hover-scale border-border/40",
                              snapshot.isDragging
                                ? "border-primary/50 bg-secondary/80"
                                : ""
                            )}
                          >
                            <CardHeader className="flex flex-row items-start justify-between pb-2">
                              <div className="flex items-center gap-2">
                                {!previewMode && (
                                  <div
                                    {...provided.dragHandleProps}
                                    className="cursor-grab"
                                  >
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
                                    <Badge
                                      variant="outline"
                                      className="text-xs w-fit"
                                    >
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
                                          onClick={() =>
                                            duplicateQuestion(question.id)
                                          }
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
                                          onClick={() =>
                                            confirmDeleteQuestion(question.id)
                                          }
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
                                <QuestionPreview
                                  question={question}
                                  index={index}
                                />
                              ) : (
                                <QuestionEditor
                                  question={question}
                                  updateQuestionText={updateQuestionText}
                                  updateQuestionPoints={updateQuestionPoints}
                                  updateQuestionCategory={
                                    updateQuestionCategory
                                  }
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
              {questions.length}{" "}
              {questions.length === 1 ? "Question" : "Questions"}
            </Badge>
            <Badge variant="outline" className="text-xs">
              Total Points: {questions.reduce((sum, q) => sum + q.points, 0)}
            </Badge>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              className="gap-2 bg-secondary/50 border-secondary"
            >
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
        <AlertDialog
          open={deleteConfirmOpen}
          onOpenChange={setDeleteConfirmOpen}
        >
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This will permanently delete this question. This action cannot
                be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={deleteQuestion}
                className="bg-destructive text-destructive-foreground"
              >
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </DashboardLayout>
  );
}
