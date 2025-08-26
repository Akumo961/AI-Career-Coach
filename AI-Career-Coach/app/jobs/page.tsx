"use client"

import { useState } from "react"
import { Search, MapPin, DollarSign, Clock, Bookmark, ExternalLink, Filter, Zap, Building, Users } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "@/components/ui/separator"

interface Job {
  id: string
  title: string
  company: string
  location: string
  salary: string
  type: string
  experience: string
  description: string
  requirements: string[]
  benefits: string[]
  technologies: string[]
  matchScore: number
  matchReasons: string[]
  postedDate: string
  applicants: number
  companySize: string
  remote: boolean
}

const mockJobs: Job[] = [
  {
    id: "1",
    title: "Senior Full Stack Developer",
    company: "TechCorp Inc.",
    location: "San Francisco, CA",
    salary: "$120,000 - $160,000",
    type: "Full-time",
    experience: "5+ years",
    description:
      "We're looking for a senior full stack developer to join our growing team and help build the next generation of our platform.",
    requirements: ["5+ years of experience", "React/Next.js", "Node.js", "TypeScript", "AWS"],
    benefits: ["Health insurance", "401k matching", "Flexible PTO", "Remote work"],
    technologies: ["React", "Next.js", "Node.js", "TypeScript", "AWS", "PostgreSQL"],
    matchScore: 95,
    matchReasons: ["Perfect tech stack match", "Salary aligns with expectations", "Experience level matches"],
    postedDate: "2 days ago",
    applicants: 23,
    companySize: "100-500",
    remote: true,
  },
  {
    id: "2",
    title: "Frontend Developer",
    company: "StartupXYZ",
    location: "New York, NY",
    salary: "$90,000 - $120,000",
    type: "Full-time",
    experience: "3+ years",
    description:
      "Join our fast-paced startup and help build beautiful, responsive web applications that millions of users love.",
    requirements: ["3+ years React experience", "JavaScript/TypeScript", "CSS/SCSS", "Git"],
    benefits: ["Equity package", "Health insurance", "Learning budget", "Flexible hours"],
    technologies: ["React", "TypeScript", "Tailwind CSS", "Vite", "GraphQL"],
    matchScore: 88,
    matchReasons: ["Strong React skills match", "TypeScript experience", "Startup environment preference"],
    postedDate: "1 week ago",
    applicants: 45,
    companySize: "10-50",
    remote: false,
  },
  {
    id: "3",
    title: "DevOps Engineer",
    company: "CloudTech Solutions",
    location: "Austin, TX",
    salary: "$110,000 - $140,000",
    type: "Full-time",
    experience: "4+ years",
    description:
      "Help us scale our infrastructure and improve our deployment processes. Work with cutting-edge cloud technologies.",
    requirements: ["Docker/Kubernetes", "AWS/Azure", "CI/CD pipelines", "Infrastructure as Code"],
    benefits: ["Remote work", "Health insurance", "Stock options", "Conference budget"],
    technologies: ["Docker", "Kubernetes", "AWS", "Terraform", "Jenkins", "Python"],
    matchScore: 72,
    matchReasons: ["Cloud experience valuable", "Growing DevOps skills", "Remote work preference"],
    postedDate: "3 days ago",
    applicants: 18,
    companySize: "50-100",
    remote: true,
  },
]

export default function JobsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedLocation, setSelectedLocation] = useState("Any location")
  const [selectedExperience, setSelectedExperience] = useState("Any experience")
  const [selectedType, setSelectedType] = useState("Any type")
  const [salaryRange, setSalaryRange] = useState([80000])
  const [remoteOnly, setRemoteOnly] = useState(false)
  const [showFilters, setShowFilters] = useState(false)
  const [savedJobs, setSavedJobs] = useState<string[]>([])

  const toggleSaveJob = (jobId: string) => {
    setSavedJobs((prev) => (prev.includes(jobId) ? prev.filter((id) => id !== jobId) : [...prev, jobId]))
  }

  const getMatchScoreColor = (score: number) => {
    if (score >= 90) return "text-green-600 bg-green-50"
    if (score >= 80) return "text-blue-600 bg-blue-50"
    if (score >= 70) return "text-yellow-600 bg-yellow-50"
    return "text-gray-600 bg-gray-50"
  }

  const filteredJobs = mockJobs.filter((job) => {
    if (
      searchQuery &&
      !job.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !job.company.toLowerCase().includes(searchQuery.toLowerCase())
    )
      return false
    if (selectedLocation !== "Any location" && !job.location.includes(selectedLocation)) return false
    if (selectedExperience !== "Any experience" && !job.experience.includes(selectedExperience)) return false
    if (selectedType !== "Any type" && !job.type.includes(selectedType)) return false
    if (remoteOnly && !job.remote) return false
    return true
  })

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 bg-secondary/10 rounded-lg">
              <Search className="w-6 h-6 text-secondary" />
            </div>
            <div>
              <h1 className="text-2xl font-black text-foreground">Job Matcher</h1>
              <p className="text-sm text-muted-foreground">AI-powered job recommendations tailored for you</p>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <aside className="lg:w-80">
            <Card className="border-border sticky top-4">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">Filters</CardTitle>
                  <Button variant="ghost" size="sm" onClick={() => setShowFilters(!showFilters)} className="lg:hidden">
                    <Filter className="w-4 h-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className={`space-y-6 ${showFilters ? "block" : "hidden lg:block"}`}>
                {/* Search */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Search</label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      placeholder="Job title or company"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>

                {/* Location */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Location</label>
                  <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                    <SelectTrigger>
                      <SelectValue placeholder="Any location" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Any location">Any location</SelectItem>
                      <SelectItem value="San Francisco">San Francisco, CA</SelectItem>
                      <SelectItem value="New York">New York, NY</SelectItem>
                      <SelectItem value="Austin">Austin, TX</SelectItem>
                      <SelectItem value="Seattle">Seattle, WA</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Experience Level */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Experience Level</label>
                  <Select value={selectedExperience} onValueChange={setSelectedExperience}>
                    <SelectTrigger>
                      <SelectValue placeholder="Any experience" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Any experience">Any experience</SelectItem>
                      <SelectItem value="Entry">Entry level (0-2 years)</SelectItem>
                      <SelectItem value="Mid">Mid level (3-5 years)</SelectItem>
                      <SelectItem value="Senior">Senior level (5+ years)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Job Type */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Job Type</label>
                  <Select value={selectedType} onValueChange={setSelectedType}>
                    <SelectTrigger>
                      <SelectValue placeholder="Any type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Any type">Any type</SelectItem>
                      <SelectItem value="Full-time">Full-time</SelectItem>
                      <SelectItem value="Part-time">Part-time</SelectItem>
                      <SelectItem value="Contract">Contract</SelectItem>
                      <SelectItem value="Freelance">Freelance</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Salary Range */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">
                    Minimum Salary: ${salaryRange[0].toLocaleString()}
                  </label>
                  <Slider
                    value={salaryRange}
                    onValueChange={setSalaryRange}
                    max={200000}
                    min={40000}
                    step={10000}
                    className="w-full"
                  />
                </div>

                {/* Remote Work */}
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="remote"
                    checked={remoteOnly}
                    onCheckedChange={(checked) => setRemoteOnly(checked as boolean)}
                  />
                  <label htmlFor="remote" className="text-sm font-medium text-foreground">
                    Remote work only
                  </label>
                </div>

                <Separator />

                {/* AI Recommendations */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Zap className="w-4 h-4 text-secondary" />
                    <span className="text-sm font-medium text-foreground">AI Recommendations</span>
                  </div>
                  <div className="space-y-2">
                    <Badge variant="secondary" className="w-full justify-start">
                      Based on your CV: React + TypeScript
                    </Badge>
                    <Badge variant="secondary" className="w-full justify-start">
                      Trending: Next.js positions
                    </Badge>
                    <Badge variant="secondary" className="w-full justify-start">
                      Salary match: $100k - $150k
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </aside>

          {/* Job Listings */}
          <div className="flex-1 space-y-6">
            {/* Results Header */}
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-foreground">{filteredJobs.length} jobs found</h2>
                <p className="text-sm text-muted-foreground">Sorted by AI match score</p>
              </div>
              <Button variant="outline" size="sm">
                <Filter className="w-4 h-4 mr-2" />
                Sort by
              </Button>
            </div>

            {/* Job Cards */}
            <div className="space-y-4">
              {filteredJobs.map((job) => (
                <Card key={job.id} className="border-border hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <CardTitle className="text-lg">{job.title}</CardTitle>
                          <Badge className={`${getMatchScoreColor(job.matchScore)} border-0`}>
                            {job.matchScore}% match
                          </Badge>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
                          <div className="flex items-center gap-1">
                            <Building className="w-4 h-4" />
                            {job.company}
                          </div>
                          <div className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            {job.location}
                          </div>
                          <div className="flex items-center gap-1">
                            <DollarSign className="w-4 h-4" />
                            {job.salary}
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {job.postedDate}
                          </div>
                        </div>
                        <CardDescription className="mb-3">{job.description}</CardDescription>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleSaveJob(job.id)}
                        className={savedJobs.includes(job.id) ? "text-secondary" : ""}
                      >
                        <Bookmark className={`w-4 h-4 ${savedJobs.includes(job.id) ? "fill-current" : ""}`} />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    {/* Technologies */}
                    <div className="mb-4">
                      <div className="flex flex-wrap gap-2">
                        {job.technologies.map((tech, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Match Reasons */}
                    <div className="mb-4">
                      <p className="text-sm font-medium text-foreground mb-2">Why this matches you:</p>
                      <ul className="space-y-1">
                        {job.matchReasons.map((reason, index) => (
                          <li key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Zap className="w-3 h-3 text-secondary" />
                            {reason}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Job Details */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Type:</span>
                        <p className="font-medium text-foreground">{job.type}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Experience:</span>
                        <p className="font-medium text-foreground">{job.experience}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Company Size:</span>
                        <p className="font-medium text-foreground">{job.companySize}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Applicants:</span>
                        <p className="font-medium text-foreground flex items-center gap-1">
                          <Users className="w-3 h-3" />
                          {job.applicants}
                        </p>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center gap-3">
                      <Button className="bg-primary hover:bg-primary/90">Apply Now</Button>
                      <Button variant="outline">
                        <ExternalLink className="w-4 h-4 mr-2" />
                        View Details
                      </Button>
                      <Button variant="outline">Generate Cover Letter</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Load More */}
            <div className="text-center">
              <Button variant="outline" size="lg">
                Load More Jobs
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
