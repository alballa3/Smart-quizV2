"use client"

import { useState } from "react"
import Link from "next/link"
import { MoreHorizontalIcon } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

interface ExamsTableProps {
  searchQuery: string
  selectedSubject: string
  selectedStatus: string
  sortBy: string
  sortOrder: string
}

export function ExamsTable({ searchQuery, selectedSubject, selectedStatus, sortBy, sortOrder }: ExamsTableProps) {
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  // Filter exams based on search query, subject, and status
  const filteredExams = exams.filter((exam) => {
    const matchesSearch =
      exam.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      exam.subject.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesSubject = selectedSubject === "all" || exam.subject.toLowerCase() === selectedSubject.toLowerCase()

    const matchesStatus = selectedStatus === "all" || exam.status.toLowerCase() === selectedStatus.toLowerCase()

    return matchesSearch && matchesSubject && matchesStatus
  })

  // Sort exams based on sortBy and sortOrder
  const sortedExams = [...filteredExams].sort((a, b) => {
    let comparison = 0

    if (sortBy === "date") {
      comparison = new Date(a.date).getTime() - new Date(b.date).getTime()
    } else if (sortBy === "name") {
      comparison = a.name.localeCompare(b.name)
    } else if (sortBy === "subject") {
      comparison = a.subject.localeCompare(b.subject)
    } else if (sortBy === "students") {
      comparison = a.students - b.students
    }

    return sortOrder === "asc" ? comparison : -comparison
  })

  // Paginate exams
  const totalPages = Math.ceil(sortedExams.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedExams = sortedExams.slice(startIndex, startIndex + itemsPerPage)

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
    <div className="space-y-4">
      <div className="rounded-md border border-border/40 overflow-hidden">
        <Table>
          <TableHeader className="bg-secondary/50">
            <TableRow>
              <TableHead className="w-[250px]">Exam Name</TableHead>
              <TableHead>Subject</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Students</TableHead>
              <TableHead>Average Score</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedExams.length > 0 ? (
              paginatedExams.map((exam) => (
                <TableRow key={exam.id} className="hover:bg-secondary/30">
                  <TableCell className="font-medium">
                    <Link href={`/exams/${exam.id}`} className="hover:text-primary transition-colors">
                      {exam.name}
                    </Link>
                  </TableCell>
                  <TableCell>{exam.subject}</TableCell>
                  <TableCell>{exam.date}</TableCell>
                  <TableCell>{exam.students}</TableCell>
                  <TableCell>{exam.averageScore ? `${exam.averageScore}%` : "N/A"}</TableCell>
                  <TableCell>
                    <Badge variant={getStatusVariant(exam.status)}>{exam.status}</Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontalIcon className="h-4 w-4" />
                          <span className="sr-only">Open menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem>
                          <Link href={`/exams/${exam.id}`} className="w-full">
                            View Details
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem>Edit Exam</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>Duplicate</DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} className="h-24 text-center">
                  No exams found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            Showing <strong>{startIndex + 1}</strong> to{" "}
            <strong>{Math.min(startIndex + itemsPerPage, sortedExams.length)}</strong> of{" "}
            <strong>{sortedExams.length}</strong> exams
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
              className="bg-secondary/50 border-secondary"
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="bg-secondary/50 border-secondary"
            >
              Next
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}

const exams = [
  {
    id: 1,
    name: "Midterm Exam",
    subject: "Mathematics",
    date: "2025-03-15",
    students: 32,
    averageScore: 76.5,
    status: "Published",
  },
  {
    id: 2,
    name: "Chapter 5 Quiz",
    subject: "Science",
    date: "2025-03-17",
    students: 28,
    averageScore: null,
    status: "Draft",
  },
  {
    id: 3,
    name: "Grammar Assessment",
    subject: "English",
    date: "2025-03-18",
    students: 30,
    averageScore: null,
    status: "Published",
  },
  {
    id: 4,
    name: "History Test",
    subject: "History",
    date: "2025-03-20",
    students: 25,
    averageScore: null,
    status: "Published",
  },
  {
    id: 5,
    name: "Final Exam",
    subject: "Mathematics",
    date: "2025-02-28",
    students: 32,
    averageScore: 82.3,
    status: "Completed",
  },
  {
    id: 6,
    name: "Literature Quiz",
    subject: "English",
    date: "2025-02-25",
    students: 30,
    averageScore: 79.8,
    status: "Completed",
  },
  {
    id: 7,
    name: "Physics Test",
    subject: "Science",
    date: "2025-02-20",
    students: 28,
    averageScore: 74.2,
    status: "Completed",
  },
  {
    id: 8,
    name: "Geography Quiz",
    subject: "Geography",
    date: "2025-02-15",
    students: 26,
    averageScore: 81.5,
    status: "Completed",
  },
  {
    id: 9,
    name: "Algebra Test",
    subject: "Mathematics",
    date: "2025-02-10",
    students: 32,
    averageScore: 77.9,
    status: "Completed",
  },
  {
    id: 10,
    name: "Chemistry Lab Assessment",
    subject: "Science",
    date: "2025-02-05",
    students: 28,
    averageScore: 85.1,
    status: "Completed",
  },
  {
    id: 11,
    name: "Essay Writing",
    subject: "English",
    date: "2025-01-30",
    students: 30,
    averageScore: 80.4,
    status: "Completed",
  },
  {
    id: 12,
    name: "World War II Quiz",
    subject: "History",
    date: "2025-01-25",
    students: 25,
    averageScore: 78.6,
    status: "Completed",
  },
]

