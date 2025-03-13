"use client"

import {
  Chart,
  ChartBar,
  ChartContainer,
  ChartGrid,
  ChartTooltip,
  ChartTooltipContent,
  ChartXAxis,
  ChartYAxis,
} from "@/components/ui/chart"

export function StudentScoresChart() {
  return (
    <Chart className="h-[300px]">
      <ChartContainer data={data}>
        <ChartGrid x={false} />
        <ChartBar className="fill-primary" />
        <ChartXAxis dataKey="range" />
        <ChartYAxis />
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
        <p className="text-sm font-medium">{payload[0]?.payload.range}</p>
        <p className="font-bold">{payload[0]?.value} students</p>
        <p className="text-xs text-muted-foreground">{((payload[0]?.value / 32) * 100).toFixed(1)}% of class</p>
      </div>
    </ChartTooltipContent>
  )
}

const data = [
  {
    range: "90-100%",
    students: 5,
  },
  {
    range: "80-89%",
    students: 8,
  },
  {
    range: "70-79%",
    students: 10,
  },
  {
    range: "60-69%",
    students: 6,
  },
  {
    range: "Below 60%",
    students: 3,
  },
]

