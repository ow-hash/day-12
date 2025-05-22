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
import jsonData from "@/data.json"

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
        <CardTitle className="text-xl font-bold">AAPL Stock <span className="text-[#facc15]">Price and Volume</span> </CardTitle>
        <CardDescription>
          Showing daily price (line) and volume (bar) for AAPL.
        </CardDescription>
      </CardHeader>
      <CardContent className="px-2 sm:p-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[350px] w-full"
        >
          <ComposedChart
            data={chartData}
            margin={{
              top: 20, 
              right: 40,
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
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value)
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })
              }}
            />
            <YAxis
              yAxisId="left"
              dataKey="price"
              stroke="black"
              tickFormatter={(value) => `$${value.toLocaleString()}`}
              name="Price"
              domain={[dataMin => dataMin * 0.95, dataMax => dataMax * 1.05]}
            />
            <YAxis
              yAxisId="right" // For Volume
              orientation="right"
              dataKey="volume"
              stroke="#facc15"
              tickFormatter={(value) => `${(value / 1000000).toFixed(1)}M`}
              name="Volume"
              domain={[0, (dataMax) => dataMax * 3]}
            />
            <Tooltip
              content={
                <ChartTooltipContent
                  className="bg-[white] text-xl"
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
              dot={true}
              stroke="#000000"
              name={chartConfig.price.label}

              />
            <Bar
            isAnimationActive={true}
              yAxisId="right"
              dataKey="volume"
              fill="#facc15"
              name={chartConfig.volume.label}
            />
          </ComposedChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}