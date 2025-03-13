import React, { useState } from "react";
import { SparklesIcon, PlusIcon, LoaderCircleIcon } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Question, QuestionType } from "@/types/examTypes";
import { toast } from "@/components/ui/use-toast";
import {
  essayTemplates,
  multipleChoiceTemplates,
  trueFalseTemplates,
} from "./template";


// Define types for the component props
interface QuestionGeneratorDialogProps {
  isMobile: boolean;
  activeTab: QuestionType;
  questions: Question[];
  setQuestions: (questions: Question[]) => void;
  setActiveTab: (tab: QuestionType) => void;

  availableQuestionTypes?: QuestionType[];
}

const GenerateQuestion: React.FC<QuestionGeneratorDialogProps> = ({
  isMobile,
  activeTab,
  setActiveTab,
  setQuestions,
  questions,
  availableQuestionTypes = ["multiple-choice", "true-false", "essay"],
}) => {
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [generatingCount, setGeneratingCount] = useState<number | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const generateRandomQuestion = () => {
    // Create a new question based on the active tab
    const baseQuestion = {
      id: `question-${Date.now()}`,
      points: Math.floor(Math.random() * 5) + 1, // Random points between 1-5
    };

    let newQuestion: Question;

    switch (activeTab) {
      case "multiple-choice": {
        const template =
          multipleChoiceTemplates[
            Math.floor(Math.random() * multipleChoiceTemplates.length)
          ];
        const options = template.options.map((text, index) => ({
          id: `option-${Date.now()}-${index}`,
          text,
        }));
        newQuestion = {
          ...baseQuestion,
          type: "multiple-choice",
          text: template.text,
          options,
          correctOptionId: options[template.correctIndex].id,
          category: template.category,
        };
        break;
      }
      case "true-false": {
        const template =
          trueFalseTemplates[
            Math.floor(Math.random() * trueFalseTemplates.length)
          ];
        newQuestion = {
          ...baseQuestion,
          type: "true-false",
          text: template.text,
          correctAnswer: template.correctAnswer,
          category: template.category,
        };
        break;
      }
      case "essay": {
        const template =
          essayTemplates[Math.floor(Math.random() * essayTemplates.length)];
        newQuestion = {
          ...baseQuestion,
          type: "essay",
          text: template.text,
          modelAnswer: template.modelAnswer,
          wordLimit: template.wordLimit,
          category: template.category,
        };
        break;
      }
      default:
        throw new Error("Invalid question type");
    }

    setQuestions([...questions, newQuestion]);

    toast({
      title: "Question Generated",
      description: `A new ${activeTab} question has been automatically generated.`,
    });
  };
  // This is To generate The Question from The Templates
  const generateMultipleQuestions = (count: number) => {
    const newQuestions = [];

    for (let i = 0; i < count; i++) {
      // Randomly select a question type
      const types: QuestionType[] = ["multiple-choice", "true-false", "essay"];
      const randomType = types[Math.floor(Math.random() * types.length)];

      // Temporarily set activeTab to generate the right type
      const currentTab = activeTab;
      setActiveTab(randomType);

      // Create the question (using the same logic as generateRandomQuestion)
      // This is simplified - in the real implementation you'd need to duplicate the generation logic
      const baseQuestion = {
        id: `question-${Date.now()}-${i}`,
        points: Math.floor(Math.random() * 5) + 1,
      };

      let newQuestion: any;

      // Generate based on type (simplified version)
      if (randomType === "multiple-choice") {
        const template =
          multipleChoiceTemplates[
            Math.floor(Math.random() * multipleChoiceTemplates.length)
          ];
        const options = template.options.map((text, index) => ({
          id: `option-${Date.now()}-${i}-${index}`,
          text,
        }));
        newQuestion = {
          ...baseQuestion,
          type: "multiple-choice",
          text: template.text,
          options,
          correctOptionId: options[template.correctIndex].id,
          category: template.category,
        };
      } else if (randomType === "true-false") {
        const template =
          trueFalseTemplates[
            Math.floor(Math.random() * trueFalseTemplates.length)
          ];
        newQuestion = {
          ...baseQuestion,
          type: "true-false",
          text: template.text,
          correctAnswer: template.correctAnswer,
          category: template.category,
        };
      } else {
        const template =
          essayTemplates[Math.floor(Math.random() * essayTemplates.length)];
        newQuestion = {
          ...baseQuestion,
          type: "essay",
          text: template.text,
          modelAnswer: template.modelAnswer,
          wordLimit: template.wordLimit,
          category: template.category,
        };
      }

      newQuestions.push(newQuestion);

      // Restore the active tab
      setActiveTab(currentTab);
    }

    setQuestions([...questions, ...newQuestions]);

    toast({
      title: "Questions Generated",
      description: `${count} new questions have been added to your exam.`,
    });
  };
  // Format question type for display
  const formatQuestionType = (type: string): string => {
    return type
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  // Handle random question generation with loading state
  const handleGenerateRandom = async (type: QuestionType): Promise<void> => {
    try {
      setIsGenerating(true);
      generateRandomQuestion();
      // Add small delay for better UX
      setTimeout(() => {
        setIsGenerating(false);
        setIsDialogOpen(false);
      }, 800);
    } catch (error) {
      console.error("Random question generation failed:", error);
      setIsGenerating(false);
    }
  };
  // Handle multiple question generation with loading state
  const handleGenerateMultiple = async (
    count: number,
    type: QuestionType
  ): Promise<void> => {
    try {
      setIsGenerating(true);
      setGeneratingCount(count);
      await generateMultipleQuestions(count);
      // Add small delay for better UX
      setTimeout(() => {
        setIsGenerating(false);
        setGeneratingCount(null);
        setIsDialogOpen(false);
      }, 800);
    } catch (error) {
      console.error("Question generation failed:", error);
      setIsGenerating(false);
      setGeneratingCount(null);
    }
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size={isMobile ? "sm" : "default"}
          className="gap-2 bg-gradient-to-r from-primary/10 to-secondary/10 border-primary/20 hover:bg-primary/20 hover:border-primary/30 transition-all flex-1 md:flex-none shadow-sm"
        >
          <SparklesIcon className="h-4 w-4 text-primary" />
          <span className="hidden md:inline">Generate Questions</span>
          <span className="md:hidden">Generate</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md bg-card backdrop-blur-sm">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold flex items-center gap-2">
            <SparklesIcon className="h-5 w-5 text-primary" />
            Generate Questions
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Select question type and quantity to generate
          </DialogDescription>
        </DialogHeader>

        <Tabs
          value={activeTab}
          onValueChange={(value) => setActiveTab(value as QuestionType)}
          className="w-full mt-4"
        >
          <TabsList className="grid grid-cols-3 mb-4">
            {availableQuestionTypes.slice(0, 3).map((tab) => (
              <TabsTrigger key={tab} value={tab} disabled={isGenerating}>
                {formatQuestionType(tab)}
              </TabsTrigger>
            ))}
          </TabsList>

          {availableQuestionTypes.length > 3 && (
            <TabsList className="grid grid-cols-2 mb-4">
              {availableQuestionTypes.slice(3).map((tab) => (
                <TabsTrigger key={tab} value={tab} disabled={isGenerating}>
                  {formatQuestionType(tab)}
                </TabsTrigger>
              ))}
            </TabsList>
          )}

          {availableQuestionTypes.map((tab) => (
            <TabsContent key={tab} value={tab} className="space-y-4">
              <div className="grid grid-cols-3 gap-3">
                {[1, 3, 5].map((count) => (
                  <motion.div
                    key={count}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button
                      onClick={() => handleGenerateMultiple(count, tab)}
                      variant="secondary"
                      className={cn(
                        "w-full py-6 flex flex-col gap-1 hover:bg-secondary/80 relative overflow-hidden transition-all",
                        isGenerating && generatingCount === count
                          ? "bg-primary/20"
                          : ""
                      )}
                      disabled={isGenerating}
                    >
                      {isGenerating && generatingCount === count ? (
                        <LoaderCircleIcon className="h-5 w-5 animate-spin absolute" />
                      ) : (
                        <>
                          <span className="text-xl font-bold">{count}</span>
                          <span className="text-xs">
                            Question{count > 1 ? "s" : ""}
                          </span>
                        </>
                      )}
                    </Button>
                  </motion.div>
                ))}
              </div>

              <motion.div
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
              >
                <Button
                  onClick={() => handleGenerateRandom(tab)}
                  className="w-full py-6 mt-4 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70"
                  disabled={isGenerating}
                >
                  {isGenerating && generatingCount === null ? (
                    <LoaderCircleIcon className="h-5 w-5 animate-spin" />
                  ) : (
                    <>
                      <PlusIcon className="h-4 w-4 mr-2" />
                      Generate Random {formatQuestionType(tab)}
                    </>
                  )}
                </Button>
              </motion.div>
            </TabsContent>
          ))}
        </Tabs>

        <DialogFooter className="sm:justify-start mt-4 pt-2 border-t border-border/40">
          <DialogDescription className="text-xs text-muted-foreground">
            Questions will be added to your current collection
          </DialogDescription>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default GenerateQuestion;
