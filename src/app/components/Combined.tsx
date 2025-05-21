"use client"

import * as React from "react"
import {
  ComposedChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltipContent,
} from "@/components/ui/chart"
import jsonData from "@/data.json" // Import the JSON data

// Transform the data
const aaplData = jsonData.dailyData.AAPL;
const chartData = aaplData.date.map((dateString, index) => ({
  date: dateString,
  price: aaplData.price[index],
  volume: aaplData.volume[index],
}));


const chartConfig = {
  price: {
    label: "Price (USD)",
    color: "hsl(var(--chart-1))",
  },
  volume: {
    label: "Volume",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig

export function Component() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>AAPL Stock Price and Volume</CardTitle>
        <CardDescription>
          Showing daily price (line) and volume (bar) for AAPL.
        </CardDescription>
      </CardHeader>
      <CardContent className="px-2 sm:p-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[350px] w-full" // Adjusted height
        >
          <ComposedChart
            data={chartData}
            margin={{
              top: 20, 
              right: 40, // Increased right margin for volume YAxis
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32} // Adjust as needed for date density
              tickFormatter={(value) => {
                const date = new Date(value)
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })
              }}
            />
            <YAxis
              yAxisId="left" // For Price
              dataKey="price"
              stroke="var(--color-price)"
              tickFormatter={(value) => `$${value.toLocaleString()}`}
              name="Price"
            />
            <YAxis
              yAxisId="right" // For Volume
              orientation="right"
              dataKey="volume"
              stroke="var(--color-volume)"
              tickFormatter={(value) => `${(value / 1000000).toFixed(1)}M`} // Format volume in millions
              name="Volume"
            />
            <Tooltip
              content={
                <ChartTooltipContent
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })
                  }}
                  formatter={(value, name) => {
                    if (name === chartConfig.price.label) {
                      return [`$${Number(value).toLocaleString()}`, name];
                    }
                    if (name === chartConfig.volume.label) {
                      return [`${Number(value).toLocaleString()}`, name];
                    }
                    return [value, name];
                  }}
                />
              }
            />
            <Legend />
            <Line
              yAxisId="left"
              dataKey="price"
              type="monotone"
              strokeWidth={2}
              dot={false}
              stroke="var(--color-price)"
              name={chartConfig.price.label}
            />
            <Bar
            isAnimationActive={true}
              yAxisId="right"
              dataKey="volume"
              fill="hsl(var(--chart-2))" // Changed to use CSS variable
              name={chartConfig.volume.label}
            />
          </ComposedChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}