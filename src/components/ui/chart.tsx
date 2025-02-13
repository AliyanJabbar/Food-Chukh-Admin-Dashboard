"use client"

import type * as React from "react"
import { ResponsiveContainer, type TooltipProps } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./card"

interface ChartProps extends React.HTMLAttributes<HTMLDivElement> {
  config: Record<string, { label: string; color: string }>
  children: React.ReactElement
}

export function ChartContainer({ children, config, className, ...props }: ChartProps) {
  return (
    <Card className={className} {...props}>
      <CardContent className="p-0">
        <style>
          {Object.entries(config)
            .map(
              ([key, value]) => `
                .${key} {
                  fill: ${value.color};
                  stroke: ${value.color};
                }
              `,
            )
            .join("\n")}
        </style>
        <ResponsiveContainer width="100%" height={350}>
          {children}
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}

interface ChartTooltipProps extends Omit<TooltipProps<number, string>, "content"> {
  content?: React.ReactNode
}

export function ChartTooltip({ content,contentStyle, ...props }: ChartTooltipProps) {
  if (!content) {
    return null
  }

  return (
    <Card {...props}>
      <CardContent className="p-2" style={contentStyle}>{content}</CardContent>
    </Card>
  )
}

ChartTooltip.Title = CardTitle
ChartTooltip.Description = CardDescription
ChartTooltip.Value = CardDescription

export { Card as ChartCard, CardContent, CardDescription, CardHeader, CardTitle }

