import { Component as CustomHistChart } from "@/app/components/Hist";
import StockCard from "@/app/components/Card";
import { Component as CustomLineHistChart } from "@/app/components/Combined";
import { CarouselDemo } from "@/app/components/Carousel";
import insightData from "@/data.json"; 
import { TrendingUp } from "lucide-react"; 



export default function DashboardPage() {

  const aaplData = insightData.dailyData.AAPL;
  const currentStats = aaplData.currentStats;
  const financialHighlights = aaplData.insightData.financialHighlights; 


  
  return (
    <div className="p-6 min-h-screen bg-gray-100">

      <h2 className="text-7xl font-bold mb-5">AAPL <span className="text-[#facc15] animate-bounce inline-block">Stock Overview</span></h2>
      <p className="text-gray-600 text-3xl mb-7">Key metrics and performance for Apple Inc. (AAPL).</p>


      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="bg-white rounded-2xl shadow p-6 ">
          <StockCard
            name="AAPL"
            currentPrice={currentStats.currentPrice}
            percentChange={currentStats.percentChange}
            volume={currentStats.volume}
            high52w={currentStats.high52w}
            low52w={currentStats.low52w}
            marketCap={currentStats.marketCap}
            peRatio={currentStats.peRatio}
          />

        </div>

        <div className="bg-white rounded-2xl shadow p-6">
          <CustomHistChart />
        </div>
      </div>

      {/* Top Full-width Card */}
      <div className="bg-white rounded-2xl shadow p-6 mb-6">
        <CustomLineHistChart />
      </div>

      {/* Middle Two Side-by-Side Cards */}

      {/* Bottom Full-width Card for News Carousel */}
      <div className="bg-white rounded-2xl shadow p-6 mb-6">
        <h3 className="text-3xl font-bold">AAPL <span className="text-[#facc15]">News & Analysis</span></h3>
        <p className="text-gray-950 mb-5 font-bold text-xl"><span className="text-[#facc15]">Latest</span> news, and <span className="text-[#facc15]">insights</span> for AAPL.</p>
        <CarouselDemo />
      </div>


      {/* Financial Highlights 3 Card Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        {financialHighlights && financialHighlights.length > 0 && (
          <>
            {financialHighlights.map((highlight) => (
              <div key={highlight.id} className="bg-white rounded-2xl shadow p-6">
                <h4 className="text-3xl mb-2 font-bold text-black bg-[#facc15] p-5 rounded-xl inline-block hover:animate-bounce">{highlight.title}</h4>
                {highlight.metrics.map(metric => (
                  <p key={metric.label} className="text-xl text-[gray-950] my-5 ">
                    {metric.label}: {metric.value}
                    {metric.trend === "up" && <TrendingUp className="inline-block h-4 w-4 ml-1 text-green-500" />}
                    {metric.trend === "down" && <TrendingUp className="inline-block h-4 w-4 ml-1 text-red-500 transform rotate-180" />}
                  </p>
                ))}
                <p className="text-md text-gray-950 mt-2"><span className="text-[black] font-bold bg-[#facc15] py-1 px-2 rounded-xl mr-2">Conclude : </span>{highlight.summary}</p>
              </div>
            ))}
          </>
        )}
      </div>

      {/* New Section for Radial and Bar Charts */}
      

    </div>
  );
}
