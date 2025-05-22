"use client";

import { Card, CardContent } from "@/components/ui/card";
import { ArrowUpRight, ArrowDownRight, BarChart2 } from "lucide-react";

interface StockCardProps {
  name: string;
  currentPrice: number;
  percentChange: number;
  volume: number;
  high52w: number;
  low52w: number;
  marketCap: string;
  peRatio: number;
}

export default function StockCard({
  name,
  currentPrice,
  percentChange,
  volume,
  high52w,
  low52w,
  marketCap,
  peRatio,
}: StockCardProps) {
  const isPositive = percentChange >= 0;

  return (
    <Card className="w-full h-full rounded-2xl shadow-md p-6 bg-[#facc15] hover:scale-110 transition-transform duration-300 ease-in-out">
      <CardContent className="flex flex-col gap-6 h-full">

        <div className="flex items-start justify-between">
          <div className="my-10">
            <h3 className="text-4xl font-semibold text-gray-700 dark:text-gray-200 my-5">{name}</h3>
            <p className="text-7xl font-bold text-gray-900 dark:text-white">${currentPrice.toFixed(2)}</p> 
          </div>
          <div className={`flex items-center text-base font-medium ${isPositive ? "text-green-500" : "text-red-500"}`}> 
            {isPositive ? <ArrowUpRight size={70}/> : <ArrowDownRight size={70}/>} 
            <span className="text-2xl font-bold ml-1.5">{percentChange}%</span> 
          </div>
        </div>

        {/* Details Grid */}
        {/* Consider making this section grow to fill more space if needed */}
        <div className="grid grid-cols-2 gap-x-6 gap-y-4 text-base text-gray-950 dark:text-gray-300 flex-grow"> {/* Increased gaps and font size, added flex-grow */}
          <div>
            <div className="font-semibold">Volume</div> {/* Changed font-medium to font-semibold for more emphasis */}
            <div className="text-2xl font-bold">{volume.toLocaleString()}</div>
          </div>
          <div>
            <div className="font-semibold">Market Cap</div> {/* Changed font-medium to font-semibold */}
            <div className="text-2xl font-bold">{marketCap}</div>
          </div>
          <div>
            <div className="font-semibold">52W High</div> {/* Changed font-medium to font-semibold */}
            <div className="text-2xl font-bold">${high52w}</div>
          </div>
          <div>
            <div className="font-semibold">52W Low</div> {/* Changed font-medium to font-semibold */}
            <div className="text-2xl font-bold">${low52w}</div>
          </div>
          <div>
            <div className="font-semibold">P/E Ratio</div> {/* Changed font-medium to font-semibold */}
            <div className="text-2xl font-bold">{peRatio}</div>
          </div>
        </div>

        {/* Footer Icon */}
        <div className="flex items-center justify-end mt-auto pt-4"> {/* mt-auto to push to bottom, added padding top */}
          <BarChart2 size={24} className="text-gray-400 dark:text-gray-500" /> {/* Increased icon size */}
        </div>
      </CardContent>
    </Card>
  );
}
