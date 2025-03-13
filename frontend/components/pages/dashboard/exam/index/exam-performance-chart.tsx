"use client"

import {
  Chart,
  ChartArea,
  ChartContainer,
  ChartGrid,
  ChartTooltip,
  ChartTooltipContent,
  ChartXAxis,
  ChartYAxis,
} from "@/components/ui/chart"

export function ExamPerformanceChart() {
  return (
    <Chart className="h-[300px]">
      <ChartContainer data={data}>
        <ChartGrid x={false} />
        <ChartArea className="fill-primary/20 stroke-primary" />
        <ChartXAxis dataKey="name" />
        <ChartYAxis tickFormatter={(value) => `${value}%`} />
        <ChartTooltip content={<CustomTooltip />} />
      </ChartContainer>
    </Chart>
  )
}

function CustomTooltip({ active, payload }: any) {
  if (!active || !payload) return null

  return (
    <ChartTooltipContent>
      <div className="flex flex-col gap-0.5">
        <p className="text-sm font-medium">{payload[0]?.payload.name}</p>
        <p className="text-sm text-muted-foreground">{payload[0]?.payload.subject}</p>
        <p className="font-bold">{payload[0]?.value}%</p>
      </div>
    </ChartTooltipContent>
  )
}

const data = [
  {
    name: "Final Exam",
    subject: "Mathematics",
    average: 82.3,
  },
  {
    name: "Literature Quiz",
    subject: "English",
    average: 79.8,
  },
  {
    name: "Physics Test",
    subject: "Science",
    average: 74.2,
  },
  {
    name: "Geography Quiz",
    subject: "Geography",
    average: 81.5,
  },
  {
    name: "Algebra Test",
    subject: "Mathematics",
    average: 77.9,
  },
  {
    name: "Chemistry Lab",
    subject: "Science",
    average: 85.1,
  },
]

