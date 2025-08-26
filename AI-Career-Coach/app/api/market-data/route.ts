import { NextResponse } from "next/server"

export async function GET() {
  try {
    // Simulate API processing
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const marketData = {
      overview: {
        totalJobs: 45672,
        growthRate: 12.5,
        averageSalary: 125000,
        topCompanies: ["Google", "Microsoft", "Amazon", "Meta", "Apple"],
      },
      salaryTrends: [
        { role: "Frontend Developer", junior: 75000, mid: 105000, senior: 145000 },
        { role: "Backend Developer", junior: 80000, mid: 115000, senior: 155000 },
        { role: "Full Stack Developer", junior: 78000, mid: 110000, senior: 150000 },
        { role: "DevOps Engineer", junior: 85000, mid: 125000, senior: 170000 },
        { role: "Data Scientist", junior: 90000, mid: 130000, senior: 180000 },
      ],
      skillsDemand: [
        { skill: "React", demand: 95, growth: 15 },
        { skill: "TypeScript", demand: 88, growth: 25 },
        { skill: "Python", demand: 92, growth: 18 },
        { skill: "AWS", demand: 85, growth: 30 },
        { skill: "Docker", demand: 78, growth: 22 },
        { skill: "Kubernetes", demand: 65, growth: 35 },
      ],
      locationData: [
        { city: "San Francisco", jobs: 8500, avgSalary: 165000, remote: 75 },
        { city: "New York", jobs: 7200, avgSalary: 145000, remote: 68 },
        { city: "Seattle", jobs: 6800, avgSalary: 155000, remote: 72 },
        { city: "Austin", jobs: 4200, avgSalary: 125000, remote: 80 },
        { city: "Remote", jobs: 12500, avgSalary: 135000, remote: 100 },
      ],
      industryTrends: [
        { month: "Jan", jobs: 3200, applications: 15600 },
        { month: "Feb", jobs: 3800, applications: 18200 },
        { month: "Mar", jobs: 4200, applications: 19800 },
        { month: "Apr", jobs: 4600, applications: 21500 },
        { month: "May", jobs: 5100, applications: 23200 },
        { month: "Jun", jobs: 4800, applications: 22100 },
      ],
      companyInsights: [
        { company: "Google", openings: 1250, avgSalary: 180000, difficulty: "High" },
        { company: "Microsoft", openings: 980, avgSalary: 165000, difficulty: "High" },
        { company: "Amazon", openings: 1500, avgSalary: 155000, difficulty: "Medium" },
        { company: "Meta", openings: 750, avgSalary: 175000, difficulty: "High" },
        { company: "Netflix", openings: 320, avgSalary: 190000, difficulty: "Very High" },
      ],
    }

    return NextResponse.json(marketData)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch market data" }, { status: 500 })
  }
}
