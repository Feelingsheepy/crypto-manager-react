import { cn } from "@/lib/utils"
import ClientPortfolio from "./components/client-portfolio"

export default async function Home() {
  return (
    <div className="space-y-6">
      {/* Hero Section */}
      <div className="hero bg-base-100 rounded-lg shadow-xl">
        <div className="hero-content text-center">
          <div className="max-w-md">
            <h1 className="text-5xl font-bold">Crypto Portfolio</h1>
            <p className="py-6">Manage your cryptocurrency investments with real-time tracking and analytics.</p>
            <button className="btn btn-primary">Get Started</button>
          </div>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="stats shadow w-full">
        <div className="stat">
          <div className="stat-title">Total Portfolio Value</div>
          <div className="stat-value">$89,400</div>
          <div className="stat-desc">↗︎ 14% compared to last month</div>
        </div>
        <div className="stat">
          <div className="stat-title">Active Coins</div>
          <div className="stat-value">15</div>
          <div className="stat-desc">↗︎ 2 new additions</div>
        </div>
        <div className="stat">
          <div className="stat-title">24h Change</div>
          <div className="stat-value text-success">+5.2%</div>
          <div className="stat-desc">↗︎ 300 (22%)</div>
        </div>
      </div>

      {/* Portfolio Section */}
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title">Your Portfolio</h2>
          <ClientPortfolio />
        </div>
      </div>
    </div>
  )
}