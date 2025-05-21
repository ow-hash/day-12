import { Component as CustomHistChart } from "@/app/components/Hist";
import StockCard from "@/app/components/Card";
import { Component as CustomLineHistChart } from "@/app/components/Combined";



export default function DashboardPage() {
  return (
    <div className="p-6 min-h-screen bg-gray-100">
      {/* Top Full-width Card */}
      <h2 className="text-xl font-semibold">AAPL Stock Overview</h2>
      <p className="text-gray-600">Key metrics and performance for Apple Inc. (AAPL).</p>
      <div className="bg-white rounded-2xl shadow p-6 mb-6">
        <CustomLineHistChart />
      </div>

      {/* Middle Two Side-by-Side Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="bg-white rounded-2xl shadow p-6">
          <CustomHistChart />
        </div>
        <div className="bg-white rounded-2xl shadow p-6">
          <StockCard
            name="AAPL"
            currentPrice={159}
            percentChange={1.27}
            volume={1120000}
            high52w={180}
            low52w={130}
            marketCap="2.5T"
            peRatio={28.5}
          />

        </div>
      </div>

      {/* Bottom Full-width Card */}
      <div className="bg-white rounded-2xl shadow p-6">
        <h3 className="text-lg font-semibold">AAPL News & Analysis</h3>
        <p className="text-gray-600">Latest news, analyst ratings, and insights for AAPL.</p>
      </div>
    </div>
  );
}
