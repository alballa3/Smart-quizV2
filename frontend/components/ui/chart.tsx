import type React from "react"
import { AreaChart, Area, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

export const Chart = ({ className, children }: { className?: string; children: React.ReactNode }) => {
  return <div className={className}>{children}</div>
}

export const ChartContainer = ({ data, children }: { data: any[]; children: React.ReactNode }) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
        {children}
      </AreaChart>
    </ResponsiveContainer>
  )
}

export const ChartGrid = ({ x, y }: { x?: boolean; y?: boolean }) => {
  return <CartesianGrid strokeDasharray="3 3" horizontal={y} vertical={x} stroke="rgba(255,255,255,0.1)" />
}

export const ChartArea = ({ className }: { className?: string }) => {
  return <Area type="monotone" dataKey="average" stroke="#3b82f6" fill="#3b82f6" className={className} />
}

export const ChartXAxis = ({ dataKey }: { dataKey: string }) => {
  return <XAxis dataKey={dataKey} stroke="rgba(255,255,255,0.5)" />
}

export const ChartYAxis = ({ tickFormatter }: { tickFormatter?: (value: number) => string }) => {
  return <YAxis tickFormatter={tickFormatter} stroke="rgba(255,255,255,0.5)" />
}

export const ChartTooltip = ({ content }: { content: React.ReactNode }) => {
  return <Tooltip content={content} />
}

export const ChartTooltipContent = ({ children }: { children: React.ReactNode }) => {
  return <div className="p-2 bg-background border border-border rounded-md shadow-md">{children}</div>
}

export const ChartBar = ({ className }: { className?: string }) => {
  return <Bar dataKey="students" fill="#3b82f6" className={className} />
}

