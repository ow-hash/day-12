"use client"

import { Bar, BarChart, CartesianGrid, LabelList, XAxis, YAxis } from "recharts"
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
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import jsonData from "@/data.json"; // Import the JSON data

// 1. Get Price Data and Calculate Daily Returns
const prices = jsonData.dailyData.AAPL.price;
const returns: number[] = [];
if (prices && prices.length > 1) {
  for (let i = 1; i < prices.length; i++) {
    if (prices[i-1] !== 0) { // Avoid division by zero
      const dailyReturn = ((prices[i] - prices[i-1]) / prices[i-1]) * 100; // Calculate percentage return
      returns.push(dailyReturn);
    }
  }
}

// 2. Define Bins and 3. Count Frequencies
const binsConfig = [
  { label: "< -2%", min: -Infinity, max: -2, count: 0 },
  { label: "-2% to -1%", min: -2, max: -1, count: 0 },
  { label: "-1% to 0%", min: -1, max: 0, count: 0 },
  { label: "0% to 1%", min: 0, max: 1, count: 0 },
  { label: "1% to 2%", min: 1, max: 2, count: 0 },
  { label: "> 2%", min: 2, max: Infinity, count: 0 },
];

returns.forEach(ret => {
  let binFound = false;
  for (const bin of binsConfig) {
    if (ret < bin.max && ret >= bin.min) { // Note: for < -2%, this logic needs slight adjustment
      if (bin.label === "< -2%" && ret < -2) {
         bin.count++;
         binFound = true;
         break;
      } else if (bin.label === "> 2%" && ret >= 2) {
         bin.count++;
         binFound = true;
         break;
      } else if (ret >= bin.min && ret < bin.max) {
        bin.count++;
        binFound = true;
        break;
      }
    }
  }
  // Fallback for edge cases if any, though current logic should cover >2%
  if (!binFound && ret >= binsConfig[binsConfig.length - 1].min) {
    binsConfig[binsConfig.length - 1].count++;
  } else if (!binFound && ret < binsConfig[0].max) {
     binsConfig[0].count++;
  }
});

// 4. Update chartData
const chartData = binsConfig.map(bin => ({
  returnBin: bin.label,
  frequency: bin.count,
}));

// 5. Update chartConfig
const chartConfig = {
  frequency: {
    label: "Frequency (Days)",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig

export function Component() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>AAPL Stock Daily Returns Distribution</CardTitle>
        <CardDescription>
          Histogram of daily percentage returns for AAPL stock.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={chartData}
            margin={{
              top: 20,
              right: 20,
              left: 0,
              bottom: 5,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="returnBin" // X-axis represents the return bins
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              // tickFormatter={(value) => value} // Use bin labels directly
            />
            <YAxis dataKey="frequency" allowDecimals={false} />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent />} // Shows bin and frequency
            />
            <Bar dataKey="frequency" fill="var(--color-frequency)" radius={8}>
              <LabelList
                position="top"
                offset={8}
                className="fill-foreground"
                fontSize={12}
                dataKey="frequency"
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
      {/* CardFooter removed as it was specific to previous data */}
    </Card>
  )
}
