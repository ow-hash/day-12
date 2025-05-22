import { Component as CustomHistChart } from "@/app/components/Hist";
import StockCard from "@/app/components/Card";
import { Component as CustomLineHistChart } from "@/app/components/Combined";
import { CustomCarousel } from "@/app/components/Carousel";
import insightData from "@/data.json"; 
import { TrendingUp } from "lucide-react"; 
import CardInfo from "@/app/components/CardInfo"; // Added import

export default function DashboardPage() {

  const aaplData = insightData.dailyData.AAPL;
  const currentStats = aaplData.currentStats;
  const financialHighlights = aaplData.insightData.financialHighlights; 


  
  return (
    <div className="p-6 min-h-screen bg-gray-100">
      {/* Header */}
      <h2 className="text-7xl font-bold mb-5">AAPL <span className="text-[#facc15] animate-bounce inline-block">Stock Overview</span></h2>
      <p className="text-gray-600 text-3xl mb-7">Key metrics and performance for Apple Inc. (AAPL).</p>

      {/* Top Two Side-by-Side Cards */}
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

      {/* Middle Full-width Card for Combined Chart */}
      <div className="bg-white rounded-2xl shadow p-6 mb-6">
        <CustomLineHistChart />
      </div>


      {/* News & Analysis Section */}
      <div className="bg-white rounded-2xl shadow p-6 mb-6">
        <h3 className="text-3xl font-bold">AAPL <span className="text-[#facc15]">News & Analysis</span></h3>
        <p className="text-gray-950 mb-5 font-bold text-xl"><span className="text-[#facc15]">Latest</span> news, and <span className="text-[#facc15]">insights</span> for AAPL.</p>
        <CustomCarousel />
      </div>


      {/* Financial Highlights Section */}
      <CardInfo financialHighlights={financialHighlights} />

      

    </div>
  );
}
