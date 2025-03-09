import { BookOpenIcon, CheckCircleIcon, ClipboardListIcon, UsersIcon } from "lucide-react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function StatsCards() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card className="hover-scale gradient-border overflow-hidden">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Exams</CardTitle>
          <div className="rounded-full bg-primary/20 p-2">
            <ClipboardListIcon className="h-4 w-4 text-primary" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">24</div>
          <p className="text-xs text-muted-foreground">+2 from last month</p>
        </CardContent>
      </Card>

      <Card className="hover-scale gradient-border overflow-hidden">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Completed Exams</CardTitle>
          <div className="rounded-full bg-primary/20 p-2">
            <CheckCircleIcon className="h-4 w-4 text-primary" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">18</div>
          <p className="text-xs text-muted-foreground">75% completion rate</p>
        </CardContent>
      </Card>

      <Card className="hover-scale gradient-border overflow-hidden">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Students</CardTitle>
          <div className="rounded-full bg-primary/20 p-2">
            <UsersIcon className="h-4 w-4 text-primary" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">142</div>
          <p className="text-xs text-muted-foreground">Across 5 classes</p>
        </CardContent>
      </Card>

      <Card className="hover-scale gradient-border overflow-hidden">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Average Score</CardTitle>
          <div className="rounded-full bg-primary/20 p-2">
            <BookOpenIcon className="h-4 w-4 text-primary" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">78.3%</div>
          <p className="text-xs text-muted-foreground">+2.5% from last month</p>
        </CardContent>
      </Card>
    </div>
  )
}

