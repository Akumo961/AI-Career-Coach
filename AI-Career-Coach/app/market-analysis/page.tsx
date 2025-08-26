"use client"

import { useState } from "react"
import { TrendingUp, DollarSign, Users, MapPin, Briefcase, Filter } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart"
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, ResponsiveContainer } from "recharts"

const salaryData = [
  { role: "Frontend Developer", junior: 75000, mid: 95000, senior: 125000 },
  { role: "Backend Developer", junior: 80000, mid: 105000, senior: 135000 },
  { role: "Full Stack Developer", junior: 78000, mid: 100000, senior: 130000 },
  { role: "DevOps Engineer", junior: 85000, mid: 110000, senior: 145000 },
  { role: "Data Scientist", junior: 90000, mid: 120000, senior: 160000 },
  { role: "Product Manager", junior: 95000, mid: 125000, senior: 170000 },
]

const skillsTrendData = [
  { skill: "React", demand: 95, growth: 12, jobs: 15420 },
  { skill: "TypeScript", demand: 88, growth: 25, jobs: 12350 },
  { skill: "Python", demand: 92, growth: 8, jobs: 18750 },
  { skill: "AWS", demand: 85, growth: 18, jobs: 11200 },
  { skill: "Docker", demand: 78, growth: 22, jobs: 9800 },
  { skill: "Kubernetes", demand: 72, growth: 35, jobs: 7650 },
  { skill: "Next.js", demand: 68, growth: 45, jobs: 6200 },
  { skill: "GraphQL", demand: 65, growth: 28, jobs: 5800 },
]

const jobGrowthData = [
  { month: "Jan", jobs: 12500, applications: 45000 },
  { month: "Feb", jobs: 13200, applications: 48000 },
  { month: "Mar", jobs: 14800, applications: 52000 },
  { month: "Apr", jobs: 15600, applications: 55000 },
  { month: "May", jobs: 16200, applications: 58000 },
  { month: "Jun", jobs: 17800, applications: 62000 },
]

const locationData = [
  { city: "San Francisco", avgSalary: 145000, jobs: 8500, cost: "High" },
  { city: "New York", avgSalary: 135000, jobs: 12000, cost: "High" },
  { city: "Seattle", avgSalary: 125000, jobs: 6800, cost: "Medium" },
  { city: "Austin", avgSalary: 110000, jobs: 4200, cost: "Medium" },
  { city: "Denver", avgSalary: 105000, jobs: 3100, cost: "Medium" },
  { city: "Remote", avgSalary: 115000, jobs: 15600, cost: "Variable" },
]

const companyData = [
  { name: "Tech Giants", percentage: 25, color: "#8b5cf6" },
  { name: "Startups", percentage: 35, color: "#06b6d4" },
  { name: "Mid-size", percentage: 28, color: "#10b981" },
  { name: "Enterprise", percentage: 12, color: "#f59e0b" },
]

const chartConfig = {
  junior: { label: "Junior", color: "#8b5cf6" },
  mid: { label: "Mid-level", color: "#06b6d4" },
  senior: { label: "Senior", color: "#10b981" },
  jobs: { label: "Job Postings", color: "#8b5cf6" },
  applications: { label: "Applications", color: "#06b6d4" },
}

export default function MarketAnalysisPage() {
  const [selectedTimeframe, setSelectedTimeframe] = useState("6months")
  const [selectedLocation, setSelectedLocation] = useState("all")
  const [selectedRole, setSelectedRole] = useState("all")

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 bg-secondary/10 rounded-lg">
              <TrendingUp className="w-6 h-6 text-secondary" />
            </div>
            <div>
              <h1 className="text-2xl font-black text-foreground">Market Analysis</h1>
              <p className="text-sm text-muted-foreground">Real-time insights on tech job market trends</p>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Filters */}
        <div className="flex flex-wrap items-center gap-4 mb-8">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm font-medium text-foreground">Filters:</span>
          </div>
          <Select value={selectedTimeframe} onValueChange={setSelectedTimeframe}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="3months">Last 3 months</SelectItem>
              <SelectItem value="6months">Last 6 months</SelectItem>
              <SelectItem value="1year">Last year</SelectItem>
              <SelectItem value="2years">Last 2 years</SelectItem>
            </SelectContent>
          </Select>
          <Select value={selectedLocation} onValueChange={setSelectedLocation}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All locations</SelectItem>
              <SelectItem value="sf">San Francisco</SelectItem>
              <SelectItem value="ny">New York</SelectItem>
              <SelectItem value="seattle">Seattle</SelectItem>
              <SelectItem value="remote">Remote</SelectItem>
            </SelectContent>
          </Select>
          <Select value={selectedRole} onValueChange={setSelectedRole}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All roles</SelectItem>
              <SelectItem value="frontend">Frontend</SelectItem>
              <SelectItem value="backend">Backend</SelectItem>
              <SelectItem value="fullstack">Full Stack</SelectItem>
              <SelectItem value="devops">DevOps</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="border-border">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-muted-foreground">Total Job Postings</CardTitle>
                <Briefcase className="w-4 h-4 text-muted-foreground" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">89,420</div>
              <div className="flex items-center gap-1 text-sm">
                <TrendingUp className="w-3 h-3 text-green-600" />
                <span className="text-green-600">+12.5%</span>
                <span className="text-muted-foreground">vs last month</span>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-muted-foreground">Avg Salary</CardTitle>
                <DollarSign className="w-4 h-4 text-muted-foreground" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">$118,500</div>
              <div className="flex items-center gap-1 text-sm">
                <TrendingUp className="w-3 h-3 text-green-600" />
                <span className="text-green-600">+8.2%</span>
                <span className="text-muted-foreground">vs last year</span>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-muted-foreground">Companies Hiring</CardTitle>
                <Users className="w-4 h-4 text-muted-foreground" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">2,847</div>
              <div className="flex items-center gap-1 text-sm">
                <TrendingUp className="w-3 h-3 text-green-600" />
                <span className="text-green-600">+15.3%</span>
                <span className="text-muted-foreground">vs last month</span>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-muted-foreground">Remote Jobs</CardTitle>
                <MapPin className="w-4 h-4 text-muted-foreground" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">67%</div>
              <div className="flex items-center gap-1 text-sm">
                <TrendingUp className="w-3 h-3 text-green-600" />
                <span className="text-green-600">+5.1%</span>
                <span className="text-muted-foreground">vs last year</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Dashboard */}
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="salaries">Salaries</TabsTrigger>
            <TabsTrigger value="skills">Skills</TabsTrigger>
            <TabsTrigger value="locations">Locations</TabsTrigger>
            <TabsTrigger value="companies">Companies</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Job Growth Trend */}
              <Card className="border-border">
                <CardHeader>
                  <CardTitle className="text-lg">Job Market Growth</CardTitle>
                  <CardDescription>Monthly job postings and applications over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <ChartContainer config={chartConfig} className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={jobGrowthData}>
                        <XAxis dataKey="month" />
                        <YAxis />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <ChartLegend content={<ChartLegendContent />} />
                        <Line
                          type="monotone"
                          dataKey="jobs"
                          stroke="var(--color-jobs)"
                          strokeWidth={2}
                          dot={{ fill: "var(--color-jobs)" }}
                        />
                        <Line
                          type="monotone"
                          dataKey="applications"
                          stroke="var(--color-applications)"
                          strokeWidth={2}
                          dot={{ fill: "var(--color-applications)" }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>

              {/* Company Distribution */}
              <Card className="border-border">
                <CardHeader>
                  <CardTitle className="text-lg">Hiring by Company Size</CardTitle>
                  <CardDescription>Distribution of job postings by company type</CardDescription>
                </CardHeader>
                <CardContent>
                  <ChartContainer config={chartConfig} className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={companyData}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={120}
                          paddingAngle={5}
                          dataKey="percentage"
                        >
                          {companyData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <ChartTooltip content={<ChartTooltipContent />} />
                      </PieChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                  <div className="grid grid-cols-2 gap-4 mt-4">
                    {companyData.map((item, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                        <span className="text-sm text-foreground">{item.name}</span>
                        <span className="text-sm text-muted-foreground">{item.percentage}%</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Hot Skills */}
            <Card className="border-border">
              <CardHeader>
                <CardTitle className="text-lg">Trending Skills This Month</CardTitle>
                <CardDescription>Most in-demand technologies and their growth rates</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {skillsTrendData.slice(0, 8).map((skill, index) => (
                    <div key={index} className="p-4 bg-card border border-border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-foreground">{skill.skill}</span>
                        <Badge variant="secondary" className="text-xs">
                          +{skill.growth}%
                        </Badge>
                      </div>
                      <div className="text-sm text-muted-foreground mb-1">{skill.jobs.toLocaleString()} jobs</div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div className="bg-secondary h-2 rounded-full" style={{ width: `${skill.demand}%` }}></div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="salaries" className="space-y-6">
            <Card className="border-border">
              <CardHeader>
                <CardTitle className="text-lg">Salary Ranges by Role</CardTitle>
                <CardDescription>Average compensation across experience levels</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer config={chartConfig} className="h-96">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={salaryData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                      <XAxis dataKey="role" angle={-45} textAnchor="end" height={100} />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <ChartLegend content={<ChartLegendContent />} />
                      <Bar dataKey="junior" fill="var(--color-junior)" />
                      <Bar dataKey="mid" fill="var(--color-mid)" />
                      <Bar dataKey="senior" fill="var(--color-senior)" />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="border-border">
                <CardHeader>
                  <CardTitle className="text-lg">Salary Growth</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-secondary mb-2">+8.2%</div>
                  <p className="text-sm text-muted-foreground">Average salary increase year-over-year</p>
                </CardContent>
              </Card>

              <Card className="border-border">
                <CardHeader>
                  <CardTitle className="text-lg">Highest Paying</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-secondary mb-2">$170k</div>
                  <p className="text-sm text-muted-foreground">Senior Product Manager average</p>
                </CardContent>
              </Card>

              <Card className="border-border">
                <CardHeader>
                  <CardTitle className="text-lg">Fastest Growing</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-secondary mb-2">DevOps</div>
                  <p className="text-sm text-muted-foreground">+15% salary growth this year</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="skills" className="space-y-6">
            <Card className="border-border">
              <CardHeader>
                <CardTitle className="text-lg">Skills Demand Analysis</CardTitle>
                <CardDescription>Current demand and growth trends for key technologies</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {skillsTrendData.map((skill, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 bg-card border border-border rounded-lg"
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="font-medium text-foreground">{skill.skill}</span>
                          <Badge variant={skill.growth > 20 ? "default" : "secondary"}>
                            {skill.growth > 20 ? "Hot" : "Growing"}
                          </Badge>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {skill.jobs.toLocaleString()} job postings • {skill.growth}% growth
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-secondary">{skill.demand}%</div>
                        <div className="text-xs text-muted-foreground">Demand Score</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="locations" className="space-y-6">
            <Card className="border-border">
              <CardHeader>
                <CardTitle className="text-lg">Top Tech Hubs</CardTitle>
                <CardDescription>Job opportunities and compensation by location</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {locationData.map((location, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 bg-card border border-border rounded-lg"
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="font-medium text-foreground">{location.city}</span>
                          <Badge
                            variant={
                              location.cost === "High"
                                ? "destructive"
                                : location.cost === "Medium"
                                  ? "secondary"
                                  : "default"
                            }
                          >
                            {location.cost} Cost
                          </Badge>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {location.jobs.toLocaleString()} active jobs
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-secondary">${location.avgSalary.toLocaleString()}</div>
                        <div className="text-xs text-muted-foreground">Avg Salary</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="companies" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="border-border">
                <CardHeader>
                  <CardTitle className="text-lg">Top Hiring Companies</CardTitle>
                  <CardDescription>Companies with most active job postings</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {[
                      { name: "Google", jobs: 1250, growth: "+15%" },
                      { name: "Microsoft", jobs: 980, growth: "+22%" },
                      { name: "Amazon", jobs: 1450, growth: "+8%" },
                      { name: "Meta", jobs: 720, growth: "+35%" },
                      { name: "Apple", jobs: 650, growth: "+12%" },
                    ].map((company, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-3 bg-card border border-border rounded-lg"
                      >
                        <div>
                          <div className="font-medium text-foreground">{company.name}</div>
                          <div className="text-sm text-muted-foreground">{company.jobs} open positions</div>
                        </div>
                        <Badge variant="secondary">{company.growth}</Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="border-border">
                <CardHeader>
                  <CardTitle className="text-lg">Industry Trends</CardTitle>
                  <CardDescription>Hiring activity by industry sector</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {[
                      { industry: "AI/Machine Learning", percentage: 28, trend: "up" },
                      { industry: "Cloud Computing", percentage: 24, trend: "up" },
                      { industry: "Cybersecurity", percentage: 18, trend: "up" },
                      { industry: "Fintech", percentage: 15, trend: "stable" },
                      { industry: "E-commerce", percentage: 15, trend: "down" },
                    ].map((item, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-3 bg-card border border-border rounded-lg"
                      >
                        <div>
                          <div className="font-medium text-foreground">{item.industry}</div>
                          <div className="text-sm text-muted-foreground">{item.percentage}% of all postings</div>
                        </div>
                        <div className="flex items-center gap-1">
                          <TrendingUp
                            className={`w-4 h-4 ${
                              item.trend === "up"
                                ? "text-green-600"
                                : item.trend === "down"
                                  ? "text-red-600"
                                  : "text-yellow-600"
                            }`}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
