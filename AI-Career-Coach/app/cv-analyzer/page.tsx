"use client"

import type React from "react"

import { useState } from "react"
import { Upload, FileText, CheckCircle, AlertCircle, TrendingUp, Target, Zap } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface AnalysisResult {
  overallScore: number
  atsScore: number
  sections: {
    name: string
    score: number
    feedback: string
    suggestions: string[]
  }[]
  skills: {
    found: string[]
    missing: string[]
    trending: string[]
  }
  keywords: {
    present: string[]
    missing: string[]
  }
}

export default function CVAnalyzerPage() {
  const [file, setFile] = useState<File | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null)

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = event.target.files?.[0]
    if (uploadedFile) {
      setFile(uploadedFile)
    }
  }

  const analyzeCV = async () => {
    if (!file) return

    setIsAnalyzing(true)

    // Simulate AI analysis
    setTimeout(() => {
      setAnalysisResult({
        overallScore: 78,
        atsScore: 85,
        sections: [
          {
            name: "Professional Summary",
            score: 85,
            feedback: "Strong summary that highlights key achievements",
            suggestions: [
              "Add specific metrics to quantify your impact",
              "Include 2-3 relevant keywords for your target role",
            ],
          },
          {
            name: "Work Experience",
            score: 90,
            feedback: "Excellent use of action verbs and quantified results",
            suggestions: [
              "Consider adding more recent technologies you've worked with",
              "Expand on leadership experiences",
            ],
          },
          {
            name: "Skills Section",
            score: 65,
            feedback: "Good technical skills coverage but missing some trending technologies",
            suggestions: [
              "Add cloud platforms (AWS, Azure, GCP)",
              "Include AI/ML frameworks if relevant",
              "Mention DevOps tools and practices",
            ],
          },
          {
            name: "Education",
            score: 80,
            feedback: "Well-structured education section",
            suggestions: ["Add relevant certifications", "Include notable projects or thesis work"],
          },
        ],
        skills: {
          found: ["JavaScript", "React", "Node.js", "Python", "SQL", "Git"],
          missing: ["TypeScript", "Docker", "Kubernetes", "AWS", "GraphQL"],
          trending: ["Next.js", "Tailwind CSS", "Prisma", "tRPC", "Vercel"],
        },
        keywords: {
          present: ["Full-stack", "Agile", "API", "Database", "Frontend", "Backend"],
          missing: ["Microservices", "CI/CD", "DevOps", "Cloud", "Scalable", "Performance"],
        },
      })
      setIsAnalyzing(false)
    }, 3000)
  }

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600"
    if (score >= 60) return "text-yellow-600"
    return "text-red-600"
  }

  const getScoreBadgeVariant = (score: number) => {
    if (score >= 80) return "default"
    if (score >= 60) return "secondary"
    return "destructive"
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 bg-secondary/10 rounded-lg">
              <FileText className="w-6 h-6 text-secondary" />
            </div>
            <div>
              <h1 className="text-2xl font-black text-foreground">CV Analyzer</h1>
              <p className="text-sm text-muted-foreground">AI-powered resume optimization and ATS analysis</p>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {!analysisResult ? (
          <div className="max-w-2xl mx-auto">
            {/* Upload Section */}
            <Card className="border-border">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl font-black">Upload Your CV</CardTitle>
                <CardDescription>Get instant AI-powered analysis and optimization recommendations</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-secondary/50 transition-colors">
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileUpload}
                    className="hidden"
                    id="cv-upload"
                  />
                  <label htmlFor="cv-upload" className="cursor-pointer">
                    <Upload className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-lg font-semibold text-foreground mb-2">
                      {file ? file.name : "Choose your CV file"}
                    </p>
                    <p className="text-sm text-muted-foreground">Supports PDF, DOC, and DOCX files up to 10MB</p>
                  </label>
                </div>

                {file && (
                  <div className="flex items-center justify-between p-4 bg-card rounded-lg border border-border">
                    <div className="flex items-center gap-3">
                      <FileText className="w-5 h-5 text-secondary" />
                      <div>
                        <p className="font-medium text-foreground">{file.name}</p>
                        <p className="text-sm text-muted-foreground">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                      </div>
                    </div>
                    <Button onClick={analyzeCV} disabled={isAnalyzing} className="bg-primary hover:bg-primary/90">
                      {isAnalyzing ? (
                        <>
                          <Zap className="w-4 h-4 mr-2 animate-spin" />
                          Analyzing...
                        </>
                      ) : (
                        <>
                          <Zap className="w-4 h-4 mr-2" />
                          Analyze CV
                        </>
                      )}
                    </Button>
                  </div>
                )}

                {isAnalyzing && (
                  <div className="space-y-4">
                    <div className="text-center">
                      <p className="font-medium text-foreground mb-2">Analyzing your CV...</p>
                      <Progress value={66} className="w-full" />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                      <div className="p-4 bg-card rounded-lg border border-border">
                        <CheckCircle className="w-6 h-6 text-green-600 mx-auto mb-2" />
                        <p className="text-sm font-medium">Parsing Content</p>
                      </div>
                      <div className="p-4 bg-card rounded-lg border border-border">
                        <Zap className="w-6 h-6 text-secondary mx-auto mb-2 animate-pulse" />
                        <p className="text-sm font-medium">AI Analysis</p>
                      </div>
                      <div className="p-4 bg-card rounded-lg border border-border opacity-50">
                        <Target className="w-6 h-6 text-muted-foreground mx-auto mb-2" />
                        <p className="text-sm font-medium">Generating Report</p>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        ) : (
          /* Analysis Results */
          <div className="space-y-8">
            {/* Overall Score */}
            <Card className="border-border">
              <CardHeader>
                <CardTitle className="text-2xl font-black">Analysis Results</CardTitle>
                <CardDescription>Comprehensive AI analysis of your CV</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="text-center">
                    <div className={`text-4xl font-black mb-2 ${getScoreColor(analysisResult.overallScore)}`}>
                      {analysisResult.overallScore}/100
                    </div>
                    <p className="text-lg font-semibold text-foreground">Overall Score</p>
                    <p className="text-sm text-muted-foreground">Based on content quality and structure</p>
                  </div>
                  <div className="text-center">
                    <div className={`text-4xl font-black mb-2 ${getScoreColor(analysisResult.atsScore)}`}>
                      {analysisResult.atsScore}/100
                    </div>
                    <p className="text-lg font-semibold text-foreground">ATS Compatibility</p>
                    <p className="text-sm text-muted-foreground">Applicant Tracking System optimization</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Detailed Analysis */}
            <Tabs defaultValue="sections" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="sections">Sections</TabsTrigger>
                <TabsTrigger value="skills">Skills</TabsTrigger>
                <TabsTrigger value="keywords">Keywords</TabsTrigger>
                <TabsTrigger value="recommendations">Tips</TabsTrigger>
              </TabsList>

              <TabsContent value="sections" className="space-y-4">
                {analysisResult.sections.map((section, index) => (
                  <Card key={index} className="border-border">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">{section.name}</CardTitle>
                        <Badge variant={getScoreBadgeVariant(section.score)}>{section.score}/100</Badge>
                      </div>
                      <CardDescription>{section.feedback}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <p className="font-medium text-foreground">Suggestions:</p>
                        <ul className="space-y-1">
                          {section.suggestions.map((suggestion, idx) => (
                            <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                              <AlertCircle className="w-4 h-4 text-secondary mt-0.5 flex-shrink-0" />
                              {suggestion}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>

              <TabsContent value="skills" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Card className="border-border">
                    <CardHeader>
                      <CardTitle className="text-lg text-green-600">Found Skills</CardTitle>
                      <CardDescription>Skills detected in your CV</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2">
                        {analysisResult.skills.found.map((skill, index) => (
                          <Badge key={index} variant="default" className="bg-green-100 text-green-800">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-border">
                    <CardHeader>
                      <CardTitle className="text-lg text-yellow-600">Missing Skills</CardTitle>
                      <CardDescription>Recommended skills to add</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2">
                        {analysisResult.skills.missing.map((skill, index) => (
                          <Badge key={index} variant="secondary" className="bg-yellow-100 text-yellow-800">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-border">
                    <CardHeader>
                      <CardTitle className="text-lg text-secondary">Trending Skills</CardTitle>
                      <CardDescription>Hot skills in the market</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2">
                        {analysisResult.skills.trending.map((skill, index) => (
                          <Badge key={index} variant="secondary">
                            <TrendingUp className="w-3 h-3 mr-1" />
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="keywords" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card className="border-border">
                    <CardHeader>
                      <CardTitle className="text-lg text-green-600">Present Keywords</CardTitle>
                      <CardDescription>Keywords found in your CV</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2">
                        {analysisResult.keywords.present.map((keyword, index) => (
                          <Badge key={index} variant="default" className="bg-green-100 text-green-800">
                            {keyword}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-border">
                    <CardHeader>
                      <CardTitle className="text-lg text-red-600">Missing Keywords</CardTitle>
                      <CardDescription>Important keywords to consider adding</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2">
                        {analysisResult.keywords.missing.map((keyword, index) => (
                          <Badge key={index} variant="destructive" className="bg-red-100 text-red-800">
                            {keyword}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="recommendations" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Alert>
                    <CheckCircle className="h-4 w-4" />
                    <AlertDescription>
                      <strong>Strong Points:</strong> Your CV shows excellent use of action verbs and quantified
                      achievements. The work experience section is particularly well-structured.
                    </AlertDescription>
                  </Alert>

                  <Alert>
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>
                      <strong>Areas for Improvement:</strong> Consider adding more recent technologies and cloud
                      platforms to stay competitive in the current market.
                    </AlertDescription>
                  </Alert>
                </div>

                <Card className="border-border">
                  <CardHeader>
                    <CardTitle className="text-lg">Action Plan</CardTitle>
                    <CardDescription>Prioritized steps to improve your CV</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ol className="space-y-3">
                      <li className="flex items-start gap-3">
                        <div className="flex items-center justify-center w-6 h-6 bg-primary text-primary-foreground rounded-full text-sm font-bold">
                          1
                        </div>
                        <div>
                          <p className="font-medium text-foreground">Add missing technical skills</p>
                          <p className="text-sm text-muted-foreground">
                            Include TypeScript, Docker, and cloud platforms
                          </p>
                        </div>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="flex items-center justify-center w-6 h-6 bg-primary text-primary-foreground rounded-full text-sm font-bold">
                          2
                        </div>
                        <div>
                          <p className="font-medium text-foreground">Optimize for ATS systems</p>
                          <p className="text-sm text-muted-foreground">
                            Include more industry keywords and standard formatting
                          </p>
                        </div>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="flex items-center justify-center w-6 h-6 bg-primary text-primary-foreground rounded-full text-sm font-bold">
                          3
                        </div>
                        <div>
                          <p className="font-medium text-foreground">Quantify achievements</p>
                          <p className="text-sm text-muted-foreground">
                            Add specific metrics and percentages to your accomplishments
                          </p>
                        </div>
                      </li>
                    </ol>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>

            {/* Action Buttons */}
            <div className="flex items-center justify-center gap-4">
              <Button
                onClick={() => {
                  setAnalysisResult(null)
                  setFile(null)
                }}
                variant="outline"
              >
                Analyze Another CV
              </Button>
              <Button className="bg-primary hover:bg-primary/90">Download Report</Button>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
