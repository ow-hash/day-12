"use client";

import { TrendingUp } from "lucide-react";

interface Metric {
  label: string;
  value: string;
  trend?: "up" | "down";
}

interface FinancialHighlight {
  id: string;
  title: string;
  metrics: Metric[];
  summary: string;
}

interface CardInfoProps {
  financialHighlights: FinancialHighlight[];
}

export default function CardInfo({ financialHighlights }: CardInfoProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
      {financialHighlights && financialHighlights.length > 0 && (
        <>
          {financialHighlights.map((highlight) => (
            <div key={highlight.id} className="bg-white rounded-2xl shadow p-6">
              <h4 className="text-3xl mb-2 font-bold text-black bg-[#facc15] p-5 rounded-xl inline-block hover:animate-bounce">
                {highlight.title}
              </h4>
              {highlight.metrics.map((metric) => (
                <p key={metric.label} className="text-xl text-[gray-950] my-5 ">
                  {metric.label}: {metric.value}
                  {metric.trend === "up" && (
                    <TrendingUp className="inline-block h-4 w-4 ml-1 text-green-500" />
                  )}
                  {metric.trend === "down" && (
                    <TrendingUp className="inline-block h-4 w-4 ml-1 text-red-500 transform rotate-180" />
                  )}
                </p>
              ))}
              <p className="text-md text-gray-950 mt-2">
                <span className="text-[black] font-bold bg-[#facc15] py-1 px-2 rounded-xl mr-2">
                  Conclude :{" "}
                </span>
                {highlight.summary}
              </p>
            </div>
          ))}
        </>
      )}
    </div>
  );
}