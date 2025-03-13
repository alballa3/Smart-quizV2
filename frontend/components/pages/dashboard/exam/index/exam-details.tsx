"use client"

import { CalendarIcon, DownloadIcon, EditIcon, PrinterIcon, UsersIcon } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { StudentScoresChart } from "@/components/student-scores-chart"

interface ExamDetailsProps {
  id: string
}

export function ExamDetails({ id }: ExamDetailsProps) {
  // Find the exam by ID
  const examId = Number.parseInt(id)
  const exam = exams.find((e) => e.id === examId)

  if (!exam) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold">Exam Not Found</h2>
          <p className="text-muted-foreground">The exam you're looking for doesn't exist.</p>
        </div>
      </div>
    )
  }

  const getStatusVariant = (status: string) => {
    switch (status.toLowerCase()) {
      case "published":
        return "default"
      case "draft":
        return "outline"
      case "completed":
        return "secondary"
      default:
        return "default"
    }
  }

  return (
    <div className="grid gap-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">{exam.name}</h2>
          <div className="flex items-center gap-2 text-muted-foreground">
            <span>{exam.subject}</span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <CalendarIcon className="h-4 w-4" />
              {exam.date}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <UsersIcon className="h-4 w-4" />
              {exam.students} students
            </span>
            <Badge variant={getStatusVariant(exam.status)}>{exam.status}</Badge>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="bg-secondary/50 border-secondary">
            <PrinterIcon className="mr-2 h-4 w-4" />
            Print
          </Button>
          <Button variant="outline" size="sm" className="bg-secondary/50 border-secondary">
            <DownloadIcon className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button size="sm">
            <EditIcon className="mr-2 h-4 w-4" />
            Edit Exam
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card className="gradient-border overflow-hidden hover-scale">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Average Score</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{exam.averageScore ? `${exam.averageScore}%` : "N/A"}</div>
            {exam.averageScore && (
              <p className="text-xs text-muted-foreground">
                {exam.averageScore > 80
                  ? "Excellent performance"
                  : exam.averageScore > 70
                    ? "Good performance"
                    : "Needs improvement"}
              </p>
            )}
          </CardContent>
        </Card>

        <Card className="gradient-border overflow-hidden hover-scale">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Highest Score</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{exam.highestScore ? `${exam.highestScore}%` : "N/A"}</div>
            {exam.highestScore && (
              <p className="text-xs text-muted-foreground">Achieved by {exam.topStudent || "Unknown"}</p>
            )}
          </CardContent>
        </Card>

        <Card className="gradient-border overflow-hidden hover-scale">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Completion Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{exam.completionRate ? `${exam.completionRate}%` : "N/A"}</div>
            {exam.completionRate && (
              <p className="text-xs text-muted-foreground">
                {exam.completedCount} of {exam.students} students
              </p>
            )}
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="scores" className="space-y-4">
        <TabsList className="bg-secondary">
          <TabsTrigger value="scores">Student Scores</TabsTrigger>
          <TabsTrigger value="questions">Question Analysis</TabsTrigger>
          <TabsTrigger value="feedback">Feedback</TabsTrigger>
        </TabsList>

        <TabsContent value="scores" className="space-y-4 animate-fade-in">
          <Card className="gradient-border overflow-hidden">
            <CardHeader>
              <CardTitle>Score Distribution</CardTitle>
              <CardDescription>Distribution of student scores across different ranges</CardDescription>
            </CardHeader>
            <CardContent className="pl-2">
              <StudentScoresChart />
            </CardContent>
          </Card>

          <Card className="gradient-border overflow-hidden">
            <CardHeader>
              <CardTitle>Student Results</CardTitle>
              <CardDescription>Individual student performance on this exam</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader className="bg-secondary/50">
                  <TableRow>
                    <TableHead>Student</TableHead>
                    <TableHead>Score</TableHead>
                    <TableHead>Grade</TableHead>
                    <TableHead>Completion Time</TableHead>
                    <TableHead>Submission Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {studentResults.map((student) => (
                    <TableRow key={student.id} className="hover:bg-secondary/30">
                      <TableCell className="font-medium">{student.name}</TableCell>
                      <TableCell>{student.score}%</TableCell>
                      <TableCell>{student.grade}</TableCell>
                      <TableCell>{student.completionTime}</TableCell>
                      <TableCell>{student.submissionDate}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="questions" className="space-y-4 animate-fade-in">
          <Card className="gradient-border overflow-hidden">
            <CardHeader>
              <CardTitle>Question Analysis</CardTitle>
              <CardDescription>Performance breakdown by question</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader className="bg-secondary/50">
                  <TableRow>
                    <TableHead>Question</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Difficulty</TableHead>
                    <TableHead>Correct Responses</TableHead>
                    <TableHead>Success Rate</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {questionAnalysis.map((question) => (
                    <TableRow key={question.id} className="hover:bg-secondary/30">
                      <TableCell className="font-medium">{question.text}</TableCell>
                      <TableCell>{question.type}</TableCell>
                      <TableCell>{question.difficulty}</TableCell>
                      <TableCell>
                        {question.correctResponses}/{exam.students}
                      </TableCell>
                      <TableCell>{question.successRate}%</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="feedback" className="space-y-4 animate-fade-in">
          <Card className="gradient-border overflow-hidden">
            <CardHeader>
              <CardTitle>Teacher Notes</CardTitle>
              <CardDescription>Your notes and feedback for this exam</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm">{exam.teacherNotes || "No notes have been added for this exam yet."}</p>
            </CardContent>
          </Card>

          <Card className="gradient-border overflow-hidden">
            <CardHeader>
              <CardTitle>Student Feedback</CardTitle>
              <CardDescription>Feedback received from students</CardDescription>
            </CardHeader>
            <CardContent>
              {exam.studentFeedback && exam.studentFeedback.length > 0 ? (
                <div className="space-y-4">
                  {exam.studentFeedback.map((feedback, index) => (
                    <div key={index} className="rounded-lg border border-border/40 p-4 bg-secondary/30">
                      <p className="font-medium">{feedback.student}</p>
                      <p className="text-sm text-muted-foreground">{feedback.date}</p>
                      <p className="mt-2 text-sm">{feedback.comment}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">No student feedback has been received for this exam.</p>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

const exams = [
  {
    id: 1,
    name: "Midterm Exam",
    subject: "Mathematics",
    date: "March 15, 2025",
    students: 32,
    averageScore: 76.5,
    highestScore: 98,
    topStudent: "Emma Johnson",
    completionRate: 100,
    completedCount: 32,
    status: "Published",
    teacherNotes:
      "Students performed well overall, but struggled with the calculus section. Consider additional review sessions before the final exam.",
    studentFeedback: [
      {
        student: "Alex Chen",
        date: "March 16, 2025",
        comment: "The exam was challenging but fair. I appreciated the practice problems provided beforehand.",
      },
      {
        student: "Sarah Williams",
        date: "March 16, 2025",
        comment: "I found the word problems difficult to understand. Could we have more examples in class?",
      },
    ],
  },
  {
    id: 5,
    name: "Final Exam",
    subject: "Mathematics",
    date: "February 28, 2025",
    students: 32,
    averageScore: 82.3,
    highestScore: 100,
    topStudent: "David Miller",
    completionRate: 100,
    completedCount: 32,
    status: "Completed",
    teacherNotes:
      "Excellent results overall. The additional review sessions clearly helped students master the material.",
    studentFeedback: [
      {
        student: "James Wilson",
        date: "March 1, 2025",
        comment: "The exam covered everything we learned. The review sessions were very helpful.",
      },
    ],
  },
]

const studentResults = [
  {
    id: 1,
    name: "Emma Johnson",
    score: 98,
    grade: "A+",
    completionTime: "45 minutes",
    submissionDate: "Mar 15, 2025",
  },
  {
    id: 2,
    name: "David Miller",
    score: 92,
    grade: "A",
    completionTime: "52 minutes",
    submissionDate: "Mar 15, 2025",
  },
  {
    id: 3,
    name: "Sarah Williams",
    score: 85,
    grade: "B+",
    completionTime: "58 minutes",
    submissionDate: "Mar 15, 2025",
  },
  {
    id: 4,
    name: "Alex Chen",
    score: 78,
    grade: "C+",
    completionTime: "60 minutes",
    submissionDate: "Mar 15, 2025",
  },
  {
    id: 5,
    name: "James Wilson",
    score: 65,
    grade: "D",
    completionTime: "55 minutes",
    submissionDate: "Mar 15, 2025",
  },
]

const questionAnalysis = [
  {
    id: 1,
    text: "Question 1: Solve the quadratic equation",
    type: "Multiple Choice",
    difficulty: "Medium",
    correctResponses: 28,
    successRate: 87.5,
  },
  {
    id: 2,
    text: "Question 2: Calculate the derivative",
    type: "Short Answer",
    difficulty: "Hard",
    correctResponses: 20,
    successRate: 62.5,
  },
  {
    id: 3,
    text: "Question 3: Solve the system of equations",
    type: "Multiple Choice",
    difficulty: "Medium",
    correctResponses: 25,
    successRate: 78.1,
  },
  {
    id: 4,
    text: "Question 4: Find the area under the curve",
    type: "Short Answer",
    difficulty: "Hard",
    correctResponses: 18,
    successRate: 56.3,
  },
  {
    id: 5,
    text: "Question 5: Identify the properties of functions",
    type: "Multiple Choice",
    difficulty: "Easy",
    correctResponses: 30,
    successRate: 93.8,
  },
]

