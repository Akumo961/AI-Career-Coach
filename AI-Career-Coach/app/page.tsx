import { Brain, FileText, Search, MessageSquare, PenTool, TrendingUp, Zap } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 bg-primary rounded-lg">
                <Brain className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-xl font-black text-foreground">AI Career Coach</h1>
                <p className="text-sm text-muted-foreground">Your Intelligent Job Search Assistant</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Badge variant="secondary" className="bg-secondary/10 text-secondary border-secondary/20">
                <Zap className="w-3 h-3 mr-1" />
                AI-Powered
              </Badge>
              <Button variant="outline" size="sm">
                Sign In
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <section className="text-center mb-12">
          <h2 className="text-4xl font-black text-foreground mb-4">Accelerate Your Tech Career with AI</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            Get personalized CV optimization, job recommendations, interview practice, and market insights powered by
            advanced AI to land your dream tech job faster.
          </p>
          <div className="flex items-center justify-center gap-4">
            <Button size="lg" className="bg-primary hover:bg-primary/90">
              Get Started Free
            </Button>
            <Button variant="outline" size="lg">
              Watch Demo
            </Button>
          </div>
        </section>

        {/* Features Grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          <Card className="border-border hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <div className="flex items-center justify-center w-10 h-10 bg-secondary/10 rounded-lg">
                  <FileText className="w-5 h-5 text-secondary" />
                </div>
                <CardTitle className="text-lg">CV Optimizer</CardTitle>
              </div>
              <CardDescription className="text-black">
                AI-powered analysis to optimize your resume for ATS systems and hiring managers
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/cv-analyzer">
                <Button variant="outline" className="w-full bg-transparent">
                  Analyze My CV
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="border-border hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <div className="flex items-center justify-center w-10 h-10 bg-secondary/10 rounded-lg">
                  <Search className="w-5 h-5 text-secondary" />
                </div>
                <CardTitle className="text-lg">Job Matcher</CardTitle>
              </div>
              <CardDescription className="text-black">
                Find perfect job opportunities based on your skills, experience, and career goals
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/jobs">
                <Button variant="outline" className="w-full bg-transparent">
                  Find Jobs
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="border-border hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <div className="flex items-center justify-center w-10 h-10 bg-secondary/10 rounded-lg">
                  <MessageSquare className="w-5 h-5 text-secondary" />
                </div>
                <CardTitle className="text-lg">Interview Simulator</CardTitle>
              </div>
              <CardDescription className="text-black">
                Practice with AI-powered mock interviews tailored to your target roles
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/interview">
                <Button variant="outline" className="w-full bg-transparent">
                  Start Practice
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="border-border hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <div className="flex items-center justify-center w-10 h-10 bg-secondary/10 rounded-lg">
                  <PenTool className="w-5 h-5 text-secondary" />
                </div>
                <CardTitle className="text-lg">Cover Letter Generator</CardTitle>
              </div>
              <CardDescription className="text-black">
                Generate personalized, compelling cover letters for any job application
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/cover-letter">
                <Button variant="outline" className="w-full bg-transparent">
                  Create Letter
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="border-border hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <div className="flex items-center justify-center w-10 h-10 bg-secondary/10 rounded-lg">
                  <TrendingUp className="w-5 h-5 text-secondary" />
                </div>
                <CardTitle className="text-lg">Market Analytics</CardTitle>
              </div>
              <CardDescription className="text-black">
                Real-time insights on job market trends, salary data, and in-demand skills
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/market-analysis">
                <Button variant="outline" className="w-full bg-transparent">
                  View Trends
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="border-border hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <div className="flex items-center justify-center w-10 h-10 bg-secondary/10 rounded-lg">
                  <Brain className="w-5 h-5 text-secondary" />
                </div>
                <CardTitle className="text-lg">Career Guidance</CardTitle>
              </div>
              <CardDescription className="text-black">
                Personalized career path recommendations and skill development plans
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full bg-transparent">
                Get Guidance
              </Button>
            </CardContent>
          </Card>
        </section>

        {/* Stats Section */}
        <section className="bg-card rounded-lg p-8 text-center">
          <h3 className="text-2xl font-black text-foreground mb-6">Trusted by Tech Professionals Worldwide</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="text-3xl font-black text-secondary mb-2">10,000+</div>
              <div className="text-muted-foreground">CVs Optimized</div>
            </div>
            <div>
              <div className="text-3xl font-black text-secondary mb-2">85%</div>
              <div className="text-muted-foreground">Interview Success Rate</div>
            </div>
            <div>
              <div className="text-3xl font-black text-secondary mb-2">500+</div>
              <div className="text-muted-foreground">Companies Hiring</div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-border mt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-8 h-8 bg-primary rounded-lg">
                <Brain className="w-4 h-4 text-primary-foreground" />
              </div>
              <span className="font-bold text-foreground">AI Career Coach</span>
            </div>
            <p className="text-sm text-muted-foreground">© 2025 AI Career Coach. Empowering tech careers with AI.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
