import { type NextRequest, NextResponse } from "next/server"

const mockJobs = [
  {
    id: "1",
    title: "Senior Frontend Developer",
    company: "TechCorp",
    location: "San Francisco, CA",
    salary: "$120k - $160k",
    type: "Full-time",
    remote: true,
    matchScore: 95,
    matchReasons: [
      "Strong React experience match",
      "TypeScript skills align perfectly",
      "Previous startup experience valued",
    ],
    description: "We are looking for a Senior Frontend Developer to join our growing team...",
    requirements: ["React", "TypeScript", "Next.js", "Tailwind CSS"],
    benefits: ["Health insurance", "Remote work", "401k matching", "Stock options"],
    posted: "2 days ago",
    applicants: 45,
    logo: "/abstract-tech-logo.png",
  },
  {
    id: "2",
    title: "Full Stack Engineer",
    company: "StartupXYZ",
    location: "New York, NY",
    salary: "$100k - $140k",
    type: "Full-time",
    remote: false,
    matchScore: 88,
    matchReasons: ["Full-stack experience matches", "Node.js background required", "Fast-paced environment fit"],
    description: "Join our innovative startup as a Full Stack Engineer...",
    requirements: ["React", "Node.js", "PostgreSQL", "AWS"],
    benefits: ["Equity", "Flexible hours", "Learning budget", "Gym membership"],
    posted: "1 week ago",
    applicants: 23,
    logo: "/abstract-startup-logo.png",
  },
  {
    id: "3",
    title: "React Developer",
    company: "Enterprise Solutions",
    location: "Austin, TX",
    salary: "$90k - $120k",
    type: "Full-time",
    remote: true,
    matchScore: 82,
    matchReasons: ["React specialization match", "Enterprise experience valued", "Remote work preference"],
    description: "We need a React Developer to work on our enterprise applications...",
    requirements: ["React", "Redux", "JavaScript", "REST APIs"],
    benefits: ["Health insurance", "PTO", "Remote work", "Professional development"],
    posted: "3 days ago",
    applicants: 67,
    logo: "/enterprise-company-logo.png",
  },
]

export async function POST(request: NextRequest) {
  try {
    const { filters } = await request.json()

    // Simulate AI processing
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Filter jobs based on criteria
    let filteredJobs = mockJobs

    if (filters?.location && filters.location !== "all") {
      filteredJobs = filteredJobs.filter((job) => job.location.toLowerCase().includes(filters.location.toLowerCase()))
    }

    if (filters?.remote) {
      filteredJobs = filteredJobs.filter((job) => job.remote)
    }

    if (filters?.experience && filters.experience !== "all") {
      // Mock experience filtering logic
      if (filters.experience === "entry") {
        filteredJobs = filteredJobs.filter((job) => !job.title.includes("Senior"))
      } else if (filters.experience === "senior") {
        filteredJobs = filteredJobs.filter((job) => job.title.includes("Senior"))
      }
    }

    return NextResponse.json({
      jobs: filteredJobs,
      totalCount: filteredJobs.length,
      aiInsights: {
        topSkills: ["React", "TypeScript", "Node.js", "AWS"],
        averageSalary: "$125k",
        marketTrend: "Growing demand for full-stack developers",
        recommendation: "Focus on cloud technologies to increase match scores",
      },
    })
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch recommendations" }, { status: 500 })
  }
}
