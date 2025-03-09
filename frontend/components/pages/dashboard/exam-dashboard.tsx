"use client"

import { useState } from "react"
import { CalendarIcon, ChevronDownIcon, FilterIcon, PlusIcon, SearchIcon, SortAscIcon } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { StatsCards } from "./stats-cards"
import { ExamsTable } from "./exams-table"
import { ExamPerformanceChart } from "./exam-performance-chart"
// import { ExamPerformanceChart } from "@/components/exam-performance-chart"
// import { ExamsTable } from "@/components/exams-table"
// import { StatsCards } from "@/components/stats-cards"
export function ExamDashboard() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedSubject, setSelectedSubject] = useState("all")
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [sortBy, setSortBy] = useState("date")
  const [sortOrder, setSortOrder] = useState("desc")

  return (
    <div className="container py-6">
      <div className="grid gap-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Welcome back, Ms. Johnson</h2>
            <p className="text-muted-foreground">Here's an overview of your exams and student performance.</p>
          </div>
          <div className="flex items-center gap-2">
            <Button className="gap-2">
              <CalendarIcon className="h-4 w-4" />
              Schedule Exam
            </Button>
          </div>
        </div>

        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList className="bg-secondary">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="exams">Exams</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4 animate-fade-in">
            <StatsCards />

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
              <Card className="lg:col-span-4 gradient-border overflow-hidden">
                <CardHeader>
                  <CardTitle>Recent Exam Performance</CardTitle>
                  <CardDescription>Average scores across your recent exams</CardDescription>
                </CardHeader>
                <CardContent className="pl-2">
                  <ExamPerformanceChart />
                </CardContent>
              </Card>

              <Card className="lg:col-span-3 gradient-border overflow-hidden">
                <CardHeader>
                  <CardTitle>Upcoming Exams</CardTitle>
                  <CardDescription>Your scheduled exams for the next 7 days</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {upcomingExams.map((exam) => (
                      <div
                        key={exam.id}
                        className="flex items-center justify-between p-3 rounded-md bg-secondary/50 hover:bg-secondary transition-colors"
                      >
                        <div className="space-y-1">
                          <p className="text-sm font-medium leading-none">{exam.name}</p>
                          <p className="text-sm text-muted-foreground">{exam.subject}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant={exam.status === "Draft" ? "outline" : "default"}>{exam.status}</Badge>
                          <p className="text-sm text-muted-foreground">{exam.date}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="exams" className="space-y-4 animate-fade-in">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div className="flex w-full items-center gap-2 md:w-auto">
                <div className="relative w-full md:w-80">
                  <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search exams..."
                    className="w-full pl-8 bg-secondary/50 border-secondary"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="icon" className="bg-secondary/50 border-secondary">
                      <FilterIcon className="h-4 w-4" />
                      <span className="sr-only">Filter</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-[200px]">
                    <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuLabel className="font-normal">Subject</DropdownMenuLabel>
                    <DropdownMenuCheckboxItem
                      checked={selectedSubject === "all"}
                      onCheckedChange={() => setSelectedSubject("all")}
                    >
                      All Subjects
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem
                      checked={selectedSubject === "math"}
                      onCheckedChange={() => setSelectedSubject("math")}
                    >
                      Mathematics
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem
                      checked={selectedSubject === "science"}
                      onCheckedChange={() => setSelectedSubject("science")}
                    >
                      Science
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem
                      checked={selectedSubject === "english"}
                      onCheckedChange={() => setSelectedSubject("english")}
                    >
                      English
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuLabel className="font-normal">Status</DropdownMenuLabel>
                    <DropdownMenuCheckboxItem
                      checked={selectedStatus === "all"}
                      onCheckedChange={() => setSelectedStatus("all")}
                    >
                      All Status
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem
                      checked={selectedStatus === "published"}
                      onCheckedChange={() => setSelectedStatus("published")}
                    >
                      Published
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem
                      checked={selectedStatus === "draft"}
                      onCheckedChange={() => setSelectedStatus("draft")}
                    >
                      Draft
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem
                      checked={selectedStatus === "completed"}
                      onCheckedChange={() => setSelectedStatus("completed")}
                    >
                      Completed
                    </DropdownMenuCheckboxItem>
                  </DropdownMenuContent>
                </DropdownMenu>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="hidden md:flex bg-secondary/50 border-secondary">
                      <SortAscIcon className="mr-2 h-4 w-4" />
                      Sort
                      <ChevronDownIcon className="ml-2 h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-[180px]">
                    <DropdownMenuLabel>Sort by</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuCheckboxItem checked={sortBy === "date"} onCheckedChange={() => setSortBy("date")}>
                      Date
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem checked={sortBy === "name"} onCheckedChange={() => setSortBy("name")}>
                      Exam Name
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem
                      checked={sortBy === "subject"}
                      onCheckedChange={() => setSortBy("subject")}
                    >
                      Subject
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem
                      checked={sortBy === "students"}
                      onCheckedChange={() => setSortBy("students")}
                    >
                      Students Count
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuCheckboxItem
                      checked={sortOrder === "asc"}
                      onCheckedChange={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
                    >
                      Ascending
                    </DropdownMenuCheckboxItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              <div className="flex items-center gap-2">
                <Select defaultValue="all">
                  <SelectTrigger className="w-[180px] bg-secondary/50 border-secondary">
                    <SelectValue placeholder="Select a subject" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Subjects</SelectLabel>
                      <SelectItem value="all">All Subjects</SelectItem>
                      <SelectItem value="math">Mathematics</SelectItem>
                      <SelectItem value="science">Science</SelectItem>
                      <SelectItem value="english">English</SelectItem>
                      <SelectItem value="history">History</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>

                <Button className="gap-2">
                  <PlusIcon className="h-4 w-4" />
                  Create Exam
                </Button>
              </div>
            </div>

            <ExamsTable
              searchQuery={searchQuery}
              selectedSubject={selectedSubject}
              selectedStatus={selectedStatus}
              sortBy={sortBy}
              sortOrder={sortOrder}
            />
          </TabsContent>

          <TabsContent value="analytics" className="space-y-4 animate-fade-in">
            <Card className="gradient-border overflow-hidden">
              <CardHeader>
                <CardTitle>Performance Analytics</CardTitle>
                <CardDescription>Detailed analytics of student performance across all exams</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  This section will display comprehensive analytics of student performance across all exams, including
                  average scores, improvement trends, and areas that need attention.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

const upcomingExams = [
  {
    id: 1,
    name: "Midterm Exam",
    subject: "Mathematics",
    status: "Published",
    date: "Mar 15, 2025",
  },
  {
    id: 2,
    name: "Chapter 5 Quiz",
    subject: "Science",
    status: "Draft",
    date: "Mar 17, 2025",
  },
  {
    id: 3,
    name: "Grammar Assessment",
    subject: "English",
    status: "Published",
    date: "Mar 18, 2025",
  },
  {
    id: 4,
    name: "History Test",
    subject: "History",
    status: "Published",
    date: "Mar 20, 2025",
  },
]

