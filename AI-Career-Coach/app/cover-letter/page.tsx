"use client"

import { useState } from "react"
import { PenTool, Download, Copy, RefreshCw, Zap, FileText, Building, User, Sparkles } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"

interface CoverLetterData {
  jobTitle: string
  companyName: string
  jobDescription: string
  hiringManager: string
  tone: "professional" | "enthusiastic" | "creative" | "formal"
  template: "modern" | "classic" | "creative" | "minimal"
  userInfo: {
    name: string
    email: string
    phone: string
    experience: string
    skills: string[]
  }
}

interface GeneratedLetter {
  content: string
  wordCount: number
  readingTime: number
  tone: string
  template: string
}

const mockTemplates = {
  modern: {
    name: "Modern Professional",
    description: "Clean, contemporary style with subtle personality",
    preview: "Dear [Hiring Manager],\n\nI am excited to apply for the [Position] role at [Company]...",
  },
  classic: {
    name: "Classic Business",
    description: "Traditional, formal business letter format",
    preview: "Dear Sir/Madam,\n\nI am writing to express my interest in the [Position] position...",
  },
  creative: {
    name: "Creative & Engaging",
    description: "Dynamic approach with storytelling elements",
    preview: "Hello [Hiring Manager],\n\nWhen I discovered the [Position] opportunity at [Company]...",
  },
  minimal: {
    name: "Minimal & Direct",
    description: "Concise, straight-to-the-point approach",
    preview: "Dear [Hiring Manager],\n\nI'm applying for the [Position] role. Here's why I'm perfect for it...",
  },
}

export default function CoverLetterPage() {
  const [step, setStep] = useState(1)
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedLetter, setGeneratedLetter] = useState<GeneratedLetter | null>(null)
  const [formData, setFormData] = useState<CoverLetterData>({
    jobTitle: "",
    companyName: "",
    jobDescription: "",
    hiringManager: "",
    tone: "professional",
    template: "modern",
    userInfo: {
      name: "John Doe",
      email: "john.doe@email.com",
      phone: "+1 (555) 123-4567",
      experience: "5+ years in full-stack development",
      skills: ["React", "Node.js", "TypeScript", "AWS", "Python"],
    },
  })

  const generateCoverLetter = async () => {
    setIsGenerating(true)

    // Simulate AI generation
    setTimeout(() => {
      const mockLetter = `Dear ${formData.hiringManager || "Hiring Manager"},

I am excited to apply for the ${formData.jobTitle} position at ${formData.companyName}. With ${formData.userInfo.experience}, I am confident that my technical expertise and passion for innovation make me an ideal candidate for this role.

In my previous roles, I have successfully developed and deployed scalable web applications using ${formData.userInfo.skills.slice(0, 3).join(", ")}, which aligns perfectly with the requirements outlined in your job posting. My experience includes:

• Building responsive, user-friendly interfaces with React and TypeScript
• Developing robust backend systems with Node.js and cloud technologies
• Collaborating with cross-functional teams to deliver high-quality products
• Implementing best practices for code quality, testing, and deployment

What particularly excites me about ${formData.companyName} is your commitment to innovation and technical excellence. I am eager to contribute to your team's success and help drive the company's mission forward.

I would welcome the opportunity to discuss how my skills and experience can benefit ${formData.companyName}. Thank you for considering my application.

Best regards,
${formData.userInfo.name}
${formData.userInfo.email}
${formData.userInfo.phone}`

      setGeneratedLetter({
        content: mockLetter,
        wordCount: mockLetter.split(" ").length,
        readingTime: Math.ceil(mockLetter.split(" ").length / 200),
        tone: formData.tone,
        template: formData.template,
      })
      setIsGenerating(false)
      setStep(3)
    }, 3000)
  }

  const copyToClipboard = () => {
    if (generatedLetter) {
      navigator.clipboard.writeText(generatedLetter.content)
    }
  }

  const downloadLetter = () => {
    if (generatedLetter) {
      const element = document.createElement("a")
      const file = new Blob([generatedLetter.content], { type: "text/plain" })
      element.href = URL.createObjectURL(file)
      element.download = `cover-letter-${formData.companyName.toLowerCase().replace(/\s+/g, "-")}.txt`
      document.body.appendChild(element)
      element.click()
      document.body.removeChild(element)
    }
  }

  const resetGenerator = () => {
    setStep(1)
    setGeneratedLetter(null)
    setFormData({
      ...formData,
      jobTitle: "",
      companyName: "",
      jobDescription: "",
      hiringManager: "",
    })
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 bg-secondary/10 rounded-lg">
              <PenTool className="w-6 h-6 text-secondary" />
            </div>
            <div>
              <h1 className="text-2xl font-black text-foreground">Cover Letter Generator</h1>
              <p className="text-sm text-muted-foreground">AI-powered personalized cover letters</p>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {step === 1 && (
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-black text-foreground mb-4">Create Your Perfect Cover Letter</h2>
              <p className="text-lg text-muted-foreground">
                Tell us about the job and we'll generate a personalized cover letter that stands out
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Form */}
              <Card className="border-border">
                <CardHeader>
                  <CardTitle className="text-xl">Job Details</CardTitle>
                  <CardDescription>Provide information about the position you're applying for</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="jobTitle">Job Title *</Label>
                    <Input
                      id="jobTitle"
                      placeholder="e.g., Senior Frontend Developer"
                      value={formData.jobTitle}
                      onChange={(e) => setFormData({ ...formData, jobTitle: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="companyName">Company Name *</Label>
                    <Input
                      id="companyName"
                      placeholder="e.g., TechCorp Inc."
                      value={formData.companyName}
                      onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="hiringManager">Hiring Manager (Optional)</Label>
                    <Input
                      id="hiringManager"
                      placeholder="e.g., Sarah Johnson"
                      value={formData.hiringManager}
                      onChange={(e) => setFormData({ ...formData, hiringManager: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="jobDescription">Job Description</Label>
                    <Textarea
                      id="jobDescription"
                      placeholder="Paste the job description here to get better AI matching..."
                      value={formData.jobDescription}
                      onChange={(e) => setFormData({ ...formData, jobDescription: e.target.value })}
                      rows={4}
                    />
                  </div>

                  <Separator />

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Tone</Label>
                      <Select
                        value={formData.tone}
                        onValueChange={(value: any) => setFormData({ ...formData, tone: value })}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="professional">Professional</SelectItem>
                          <SelectItem value="enthusiastic">Enthusiastic</SelectItem>
                          <SelectItem value="creative">Creative</SelectItem>
                          <SelectItem value="formal">Formal</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>Template</Label>
                      <Select
                        value={formData.template}
                        onValueChange={(value: any) => setFormData({ ...formData, template: value })}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="modern">Modern</SelectItem>
                          <SelectItem value="classic">Classic</SelectItem>
                          <SelectItem value="creative">Creative</SelectItem>
                          <SelectItem value="minimal">Minimal</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <Button
                    onClick={() => setStep(2)}
                    disabled={!formData.jobTitle || !formData.companyName}
                    className="w-full bg-primary hover:bg-primary/90"
                    size="lg"
                  >
                    Continue to Customization
                  </Button>
                </CardContent>
              </Card>

              {/* Template Preview */}
              <Card className="border-border">
                <CardHeader>
                  <CardTitle className="text-xl">Template Preview</CardTitle>
                  <CardDescription>
                    {mockTemplates[formData.template as keyof typeof mockTemplates].description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="bg-card border border-border rounded-lg p-4">
                    <pre className="text-sm text-muted-foreground whitespace-pre-wrap font-sans">
                      {mockTemplates[formData.template as keyof typeof mockTemplates].preview}
                    </pre>
                  </div>
                  <div className="mt-4 flex items-center gap-2">
                    <Badge variant="secondary">{formData.tone}</Badge>
                    <Badge variant="outline">
                      {mockTemplates[formData.template as keyof typeof mockTemplates].name}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-black text-foreground mb-4">Customize Your Profile</h2>
              <p className="text-lg text-muted-foreground">
                Review and adjust your information for the perfect personalization
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Profile Form */}
              <Card className="border-border">
                <CardHeader>
                  <CardTitle className="text-xl">Your Information</CardTitle>
                  <CardDescription>This information will be used to personalize your cover letter</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      value={formData.userInfo.name}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          userInfo: { ...formData.userInfo, name: e.target.value },
                        })
                      }
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.userInfo.email}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            userInfo: { ...formData.userInfo, email: e.target.value },
                          })
                        }
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone</Label>
                      <Input
                        id="phone"
                        value={formData.userInfo.phone}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            userInfo: { ...formData.userInfo, phone: e.target.value },
                          })
                        }
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="experience">Experience Summary</Label>
                    <Textarea
                      id="experience"
                      value={formData.userInfo.experience}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          userInfo: { ...formData.userInfo, experience: e.target.value },
                        })
                      }
                      rows={3}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Key Skills</Label>
                    <div className="flex flex-wrap gap-2 mb-2">
                      {formData.userInfo.skills.map((skill, index) => (
                        <Badge key={index} variant="secondary" className="cursor-pointer">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                    <Input placeholder="Add a skill and press Enter" />
                  </div>

                  <div className="flex gap-3">
                    <Button variant="outline" onClick={() => setStep(1)} className="flex-1">
                      Back
                    </Button>
                    <Button onClick={generateCoverLetter} className="flex-1 bg-primary hover:bg-primary/90">
                      <Sparkles className="w-4 h-4 mr-2" />
                      Generate Letter
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* AI Insights */}
              <Card className="border-border">
                <CardHeader>
                  <CardTitle className="text-xl">AI Insights</CardTitle>
                  <CardDescription>How we'll personalize your cover letter</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="flex items-center justify-center w-8 h-8 bg-secondary/10 rounded-lg">
                        <Building className="w-4 h-4 text-secondary" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">Company Research</p>
                        <p className="text-sm text-muted-foreground">
                          We'll tailor your letter to {formData.companyName}'s values and culture
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="flex items-center justify-center w-8 h-8 bg-secondary/10 rounded-lg">
                        <User className="w-4 h-4 text-secondary" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">Skills Matching</p>
                        <p className="text-sm text-muted-foreground">
                          Highlighting your {formData.userInfo.skills.slice(0, 2).join(" and ")} experience
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="flex items-center justify-center w-8 h-8 bg-secondary/10 rounded-lg">
                        <Zap className="w-4 h-4 text-secondary" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">Tone Optimization</p>
                        <p className="text-sm text-muted-foreground">
                          Using a {formData.tone} tone with {formData.template} formatting
                        </p>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div className="bg-secondary/5 rounded-lg p-4">
                    <h4 className="font-semibold text-foreground mb-2">Job Match Analysis</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Skills Alignment</span>
                        <Badge variant="default">92%</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Experience Match</span>
                        <Badge variant="default">88%</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Culture Fit</span>
                        <Badge variant="default">85%</Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {(isGenerating || step === 3) && (
          <div className="max-w-6xl mx-auto">
            {isGenerating ? (
              <div className="text-center py-12">
                <div className="flex items-center justify-center w-16 h-16 bg-secondary/10 rounded-full mx-auto mb-6">
                  <Sparkles className="w-8 h-8 text-secondary animate-pulse" />
                </div>
                <h2 className="text-2xl font-black text-foreground mb-4">Generating Your Cover Letter</h2>
                <p className="text-lg text-muted-foreground mb-8">
                  Our AI is crafting a personalized cover letter just for you...
                </p>
                <div className="max-w-md mx-auto space-y-4">
                  <div className="flex items-center gap-3 text-sm">
                    <div className="w-2 h-2 bg-secondary rounded-full animate-pulse"></div>
                    <span>Analyzing job requirements</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <div className="w-2 h-2 bg-secondary rounded-full animate-pulse"></div>
                    <span>Matching your skills and experience</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <div className="w-2 h-2 bg-secondary rounded-full animate-pulse"></div>
                    <span>Crafting personalized content</span>
                  </div>
                </div>
              </div>
            ) : (
              generatedLetter && (
                <div>
                  <div className="text-center mb-8">
                    <h2 className="text-3xl font-black text-foreground mb-4">Your Cover Letter is Ready!</h2>
                    <p className="text-lg text-muted-foreground">
                      Review, edit, and download your personalized cover letter
                    </p>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Cover Letter Content */}
                    <div className="lg:col-span-2">
                      <Card className="border-border">
                        <CardHeader>
                          <div className="flex items-center justify-between">
                            <div>
                              <CardTitle className="text-xl">
                                Cover Letter for {formData.jobTitle} at {formData.companyName}
                              </CardTitle>
                              <CardDescription>
                                {generatedLetter.wordCount} words • {generatedLetter.readingTime} min read
                              </CardDescription>
                            </div>
                            <div className="flex items-center gap-2">
                              <Button variant="outline" size="sm" onClick={copyToClipboard}>
                                <Copy className="w-4 h-4 mr-2" />
                                Copy
                              </Button>
                              <Button variant="outline" size="sm" onClick={downloadLetter}>
                                <Download className="w-4 h-4 mr-2" />
                                Download
                              </Button>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="bg-white border border-border rounded-lg p-6 shadow-sm">
                            <pre className="whitespace-pre-wrap font-sans text-sm text-foreground leading-relaxed">
                              {generatedLetter.content}
                            </pre>
                          </div>
                        </CardContent>
                      </Card>
                    </div>

                    {/* Actions & Stats */}
                    <div className="space-y-6">
                      <Card className="border-border">
                        <CardHeader>
                          <CardTitle className="text-lg">Letter Stats</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-muted-foreground">Word Count</span>
                            <Badge variant="outline">{generatedLetter.wordCount}</Badge>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-muted-foreground">Reading Time</span>
                            <Badge variant="outline">{generatedLetter.readingTime} min</Badge>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-muted-foreground">Tone</span>
                            <Badge variant="secondary">{generatedLetter.tone}</Badge>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-muted-foreground">Template</span>
                            <Badge variant="secondary">{generatedLetter.template}</Badge>
                          </div>
                        </CardContent>
                      </Card>

                      <Card className="border-border">
                        <CardHeader>
                          <CardTitle className="text-lg">Actions</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                          <Button className="w-full bg-primary hover:bg-primary/90">
                            <FileText className="w-4 h-4 mr-2" />
                            Export as PDF
                          </Button>
                          <Button variant="outline" className="w-full bg-transparent">
                            <RefreshCw className="w-4 h-4 mr-2" />
                            Regenerate
                          </Button>
                          <Button variant="outline" className="w-full bg-transparent" onClick={resetGenerator}>
                            Create New Letter
                          </Button>
                        </CardContent>
                      </Card>

                      <Card className="border-border">
                        <CardHeader>
                          <CardTitle className="text-lg">AI Analysis</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-3">
                            <div className="flex justify-between items-center">
                              <span className="text-sm">Personalization</span>
                              <Badge variant="default">95%</Badge>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-sm">Keyword Match</span>
                              <Badge variant="default">88%</Badge>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-sm">Readability</span>
                              <Badge variant="default">92%</Badge>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </div>
              )
            )}
          </div>
        )}
      </main>
    </div>
  )
}
