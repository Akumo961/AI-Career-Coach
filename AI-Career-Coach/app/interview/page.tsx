"use client"

import { useState, useRef, useEffect } from "react"
import { MessageSquare, Send, Mic, MicOff, Play, RotateCcw, Target, Clock, Brain } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface Message {
  id: string
  role: "user" | "interviewer"
  content: string
  timestamp: Date
  questionType?: "technical" | "behavioral" | "situational"
  feedback?: {
    score: number
    strengths: string[]
    improvements: string[]
  }
}

interface InterviewSession {
  role: string
  difficulty: string
  duration: number
  questionsAsked: number
  currentScore: number
  status: "setup" | "active" | "completed"
}

const mockQuestions = {
  technical: [
    "Can you explain the difference between let, const, and var in JavaScript?",
    "How would you optimize a React component that's rendering slowly?",
    "Describe how you would implement a REST API with proper error handling.",
    "What's the difference between SQL and NoSQL databases? When would you use each?",
  ],
  behavioral: [
    "Tell me about a time when you had to work with a difficult team member.",
    "Describe a challenging project you worked on and how you overcame obstacles.",
    "How do you handle tight deadlines and competing priorities?",
    "Tell me about a time when you had to learn a new technology quickly.",
  ],
  situational: [
    "If you discovered a security vulnerability in production, what would you do?",
    "How would you approach debugging a performance issue in a large application?",
    "If a client requested a feature that you knew was technically unfeasible, how would you handle it?",
    "How would you onboard a new team member to a complex codebase?",
  ],
}

export default function InterviewPage() {
  const [session, setSession] = useState<InterviewSession>({
    role: "",
    difficulty: "",
    duration: 0,
    questionsAsked: 0,
    currentScore: 0,
    status: "setup",
  })
  const [messages, setMessages] = useState<Message[]>([])
  const [currentMessage, setCurrentMessage] = useState("")
  const [isRecording, setIsRecording] = useState(false)
  const [timeElapsed, setTimeElapsed] = useState(0)
  const [currentQuestionType, setCurrentQuestionType] = useState<"technical" | "behavioral" | "situational">(
    "technical",
  )
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (session.status === "active") {
      interval = setInterval(() => {
        setTimeElapsed((prev) => prev + 1)
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [session.status])

  const startInterview = () => {
    if (!session.role || !session.difficulty) return

    setSession((prev) => ({ ...prev, status: "active" }))
    setTimeElapsed(0)

    // Add welcome message
    const welcomeMessage: Message = {
      id: "welcome",
      role: "interviewer",
      content: `Hello! I'm your AI interviewer. I'll be conducting a ${session.difficulty} level interview for the ${session.role} position. We'll cover technical questions, behavioral scenarios, and situational problems. Are you ready to begin?`,
      timestamp: new Date(),
    }

    setMessages([welcomeMessage])

    // Ask first question after a delay
    setTimeout(() => {
      askNextQuestion()
    }, 2000)
  }

  const askNextQuestion = () => {
    const questionTypes: Array<"technical" | "behavioral" | "situational"> = ["technical", "behavioral", "situational"]
    const randomType = questionTypes[Math.floor(Math.random() * questionTypes.length)]
    const questions = mockQuestions[randomType]
    const randomQuestion = questions[Math.floor(Math.random() * questions.length)]

    setCurrentQuestionType(randomType)

    const questionMessage: Message = {
      id: `question-${Date.now()}`,
      role: "interviewer",
      content: randomQuestion,
      timestamp: new Date(),
      questionType: randomType,
    }

    setMessages((prev) => [...prev, questionMessage])
    setSession((prev) => ({ ...prev, questionsAsked: prev.questionsAsked + 1 }))
  }

  const sendMessage = () => {
    if (!currentMessage.trim()) return

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      role: "user",
      content: currentMessage,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setCurrentMessage("")

    // Simulate AI feedback
    setTimeout(() => {
      const feedback = generateFeedback(currentMessage, currentQuestionType)
      const feedbackMessage: Message = {
        id: `feedback-${Date.now()}`,
        role: "interviewer",
        content: `Thank you for your answer. ${feedback.comment}`,
        timestamp: new Date(),
        feedback: {
          score: feedback.score,
          strengths: feedback.strengths,
          improvements: feedback.improvements,
        },
      }

      setMessages((prev) => [...prev, feedbackMessage])
      setSession((prev) => ({
        ...prev,
        currentScore: Math.round((prev.currentScore + feedback.score) / 2),
      }))

      // Ask next question or end interview
      if (session.questionsAsked < 5) {
        setTimeout(() => {
          askNextQuestion()
        }, 3000)
      } else {
        setTimeout(() => {
          endInterview()
        }, 2000)
      }
    }, 2000)
  }

  const generateFeedback = (answer: string, questionType: string) => {
    // Mock AI feedback generation
    const scores = [75, 80, 85, 90, 70, 95]
    const score = scores[Math.floor(Math.random() * scores.length)]

    const feedbackOptions = {
      technical: {
        comment: "Good technical explanation. You demonstrated solid understanding of the concepts.",
        strengths: ["Clear explanation", "Good examples", "Technical accuracy"],
        improvements: ["Add more specific details", "Consider edge cases", "Mention best practices"],
      },
      behavioral: {
        comment: "Nice use of the STAR method. Your example was relevant and well-structured.",
        strengths: ["Structured response", "Relevant example", "Clear outcome"],
        improvements: ["More specific metrics", "Deeper reflection", "Alternative approaches"],
      },
      situational: {
        comment: "Thoughtful approach to the problem. You considered multiple perspectives.",
        strengths: ["Systematic thinking", "Risk awareness", "Stakeholder consideration"],
        improvements: ["More detailed action plan", "Timeline considerations", "Contingency planning"],
      },
    }

    return {
      score,
      ...feedbackOptions[questionType as keyof typeof feedbackOptions],
    }
  }

  const endInterview = () => {
    const endMessage: Message = {
      id: "end",
      role: "interviewer",
      content: `That concludes our interview session. You've answered ${session.questionsAsked} questions with an average score of ${session.currentScore}%. Great job! Let's review your performance.`,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, endMessage])
    setSession((prev) => ({ ...prev, status: "completed" }))
  }

  const resetInterview = () => {
    setSession({
      role: "",
      difficulty: "",
      duration: 0,
      questionsAsked: 0,
      currentScore: 0,
      status: "setup",
    })
    setMessages([])
    setTimeElapsed(0)
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  if (session.status === "setup") {
    return (
      <div className="min-h-screen bg-background">
        {/* Header */}
        <header className="border-b border-border bg-card/50 backdrop-blur-sm">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 bg-secondary/10 rounded-lg">
                <MessageSquare className="w-6 h-6 text-secondary" />
              </div>
              <div>
                <h1 className="text-2xl font-black text-foreground">Interview Simulator</h1>
                <p className="text-sm text-muted-foreground">Practice with AI-powered mock interviews</p>
              </div>
            </div>
          </div>
        </header>

        <main className="container mx-auto px-4 py-8">
          <div className="max-w-2xl mx-auto">
            <Card className="border-border">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl font-black">Setup Your Interview</CardTitle>
                <CardDescription>Configure your mock interview session</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Target Role</label>
                  <Select
                    value={session.role}
                    onValueChange={(value) => setSession((prev) => ({ ...prev, role: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Frontend Developer">Frontend Developer</SelectItem>
                      <SelectItem value="Backend Developer">Backend Developer</SelectItem>
                      <SelectItem value="Full Stack Developer">Full Stack Developer</SelectItem>
                      <SelectItem value="DevOps Engineer">DevOps Engineer</SelectItem>
                      <SelectItem value="Data Scientist">Data Scientist</SelectItem>
                      <SelectItem value="Product Manager">Product Manager</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Difficulty Level</label>
                  <Select
                    value={session.difficulty}
                    onValueChange={(value) => setSession((prev) => ({ ...prev, difficulty: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select difficulty" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Junior">Junior (0-2 years)</SelectItem>
                      <SelectItem value="Mid-level">Mid-level (3-5 years)</SelectItem>
                      <SelectItem value="Senior">Senior (5+ years)</SelectItem>
                      <SelectItem value="Lead">Lead/Principal (8+ years)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-3 gap-4 p-4 bg-card rounded-lg border border-border">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-secondary mb-1">5-7</div>
                    <div className="text-sm text-muted-foreground">Questions</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-secondary mb-1">15-20</div>
                    <div className="text-sm text-muted-foreground">Minutes</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-secondary mb-1">3</div>
                    <div className="text-sm text-muted-foreground">Categories</div>
                  </div>
                </div>

                <Alert>
                  <Brain className="h-4 w-4" />
                  <AlertDescription>
                    <strong>What to expect:</strong> You'll face technical questions, behavioral scenarios, and
                    situational problems. The AI will provide real-time feedback and suggestions for improvement.
                  </AlertDescription>
                </Alert>

                <Button
                  onClick={startInterview}
                  disabled={!session.role || !session.difficulty}
                  className="w-full bg-primary hover:bg-primary/90"
                  size="lg"
                >
                  <Play className="w-4 h-4 mr-2" />
                  Start Interview
                </Button>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    )
  }

  if (session.status === "completed") {
    return (
      <div className="min-h-screen bg-background">
        {/* Header */}
        <header className="border-b border-border bg-card/50 backdrop-blur-sm">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 bg-secondary/10 rounded-lg">
                <Target className="w-6 h-6 text-secondary" />
              </div>
              <div>
                <h1 className="text-2xl font-black text-foreground">Interview Complete</h1>
                <p className="text-sm text-muted-foreground">Review your performance and get improvement tips</p>
              </div>
            </div>
          </div>
        </header>

        <main className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto space-y-8">
            {/* Overall Score */}
            <Card className="border-border">
              <CardHeader>
                <CardTitle className="text-2xl font-black">Interview Results</CardTitle>
                <CardDescription>
                  {session.role} • {session.difficulty} Level • {formatTime(timeElapsed)}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                  <div>
                    <div className="text-4xl font-black text-secondary mb-2">{session.currentScore}%</div>
                    <p className="text-lg font-semibold text-foreground">Overall Score</p>
                    <p className="text-sm text-muted-foreground">Above average performance</p>
                  </div>
                  <div>
                    <div className="text-4xl font-black text-secondary mb-2">{session.questionsAsked}</div>
                    <p className="text-lg font-semibold text-foreground">Questions Answered</p>
                    <p className="text-sm text-muted-foreground">Complete session</p>
                  </div>
                  <div>
                    <div className="text-4xl font-black text-secondary mb-2">{formatTime(timeElapsed)}</div>
                    <p className="text-lg font-semibold text-foreground">Duration</p>
                    <p className="text-sm text-muted-foreground">Good pacing</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Detailed Feedback */}
            <Tabs defaultValue="summary" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="summary">Summary</TabsTrigger>
                <TabsTrigger value="transcript">Transcript</TabsTrigger>
                <TabsTrigger value="improvement">Improvement Plan</TabsTrigger>
              </TabsList>

              <TabsContent value="summary" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Card className="border-border">
                    <CardHeader>
                      <CardTitle className="text-lg text-green-600">Strengths</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2 text-sm">
                        <li>• Clear communication style</li>
                        <li>• Good technical knowledge</li>
                        <li>• Structured problem-solving</li>
                        <li>• Relevant examples provided</li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Card className="border-border">
                    <CardHeader>
                      <CardTitle className="text-lg text-yellow-600">Areas to Improve</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2 text-sm">
                        <li>• Add more specific metrics</li>
                        <li>• Consider edge cases</li>
                        <li>• Deeper technical details</li>
                        <li>• Better time management</li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Card className="border-border">
                    <CardHeader>
                      <CardTitle className="text-lg text-secondary">Question Breakdown</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Technical</span>
                          <Badge variant="outline">85%</Badge>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Behavioral</span>
                          <Badge variant="outline">78%</Badge>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Situational</span>
                          <Badge variant="outline">82%</Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="transcript" className="space-y-4">
                <Card className="border-border">
                  <CardHeader>
                    <CardTitle className="text-lg">Interview Transcript</CardTitle>
                    <CardDescription>Complete conversation with feedback scores</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4 max-h-96 overflow-y-auto">
                      {messages.map((message) => (
                        <div
                          key={message.id}
                          className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                        >
                          <div
                            className={`max-w-[80%] p-3 rounded-lg ${
                              message.role === "user"
                                ? "bg-primary text-primary-foreground"
                                : "bg-card border border-border"
                            }`}
                          >
                            <p className="text-sm">{message.content}</p>
                            {message.feedback && (
                              <div className="mt-2 pt-2 border-t border-border/50">
                                <div className="flex items-center gap-2 mb-1">
                                  <Badge variant="secondary">Score: {message.feedback.score}%</Badge>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="improvement" className="space-y-4">
                <Card className="border-border">
                  <CardHeader>
                    <CardTitle className="text-lg">Personalized Improvement Plan</CardTitle>
                    <CardDescription>Actionable steps to enhance your interview performance</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div>
                        <h4 className="font-semibold text-foreground mb-3">Immediate Actions (This Week)</h4>
                        <ol className="space-y-2">
                          <li className="flex items-start gap-3">
                            <div className="flex items-center justify-center w-6 h-6 bg-primary text-primary-foreground rounded-full text-sm font-bold">
                              1
                            </div>
                            <div>
                              <p className="font-medium text-foreground">Practice the STAR method</p>
                              <p className="text-sm text-muted-foreground">
                                Structure behavioral answers with Situation, Task, Action, Result
                              </p>
                            </div>
                          </li>
                          <li className="flex items-start gap-3">
                            <div className="flex items-center justify-center w-6 h-6 bg-primary text-primary-foreground rounded-full text-sm font-bold">
                              2
                            </div>
                            <div>
                              <p className="font-medium text-foreground">Prepare specific examples</p>
                              <p className="text-sm text-muted-foreground">
                                Have 3-5 detailed project examples ready with metrics
                              </p>
                            </div>
                          </li>
                        </ol>
                      </div>

                      <div>
                        <h4 className="font-semibold text-foreground mb-3">Medium-term Goals (This Month)</h4>
                        <ul className="space-y-2">
                          <li className="flex items-center gap-2 text-sm">
                            <div className="w-2 h-2 bg-secondary rounded-full"></div>
                            Deep dive into system design concepts
                          </li>
                          <li className="flex items-center gap-2 text-sm">
                            <div className="w-2 h-2 bg-secondary rounded-full"></div>
                            Practice coding problems on LeetCode
                          </li>
                          <li className="flex items-center gap-2 text-sm">
                            <div className="w-2 h-2 bg-secondary rounded-full"></div>
                            Mock interviews with peers
                          </li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>

            {/* Action Buttons */}
            <div className="flex items-center justify-center gap-4">
              <Button onClick={resetInterview} variant="outline">
                <RotateCcw className="w-4 h-4 mr-2" />
                New Interview
              </Button>
              <Button className="bg-primary hover:bg-primary/90">Download Report</Button>
            </div>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 bg-secondary/10 rounded-lg">
                <MessageSquare className="w-6 h-6 text-secondary" />
              </div>
              <div>
                <h1 className="text-xl font-black text-foreground">Live Interview</h1>
                <p className="text-sm text-muted-foreground">
                  {session.role} • {session.difficulty} Level
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-sm">
                <Clock className="w-4 h-4 text-muted-foreground" />
                <span className="font-mono">{formatTime(timeElapsed)}</span>
              </div>
              <Badge variant="secondary">Score: {session.currentScore}%</Badge>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-4">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Chat Interface */}
            <div className="lg:col-span-3">
              <Card className="border-border h-[600px] flex flex-col">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">Interview Session</CardTitle>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">Question {session.questionsAsked}/5</Badge>
                      <Progress value={(session.questionsAsked / 5) * 100} className="w-20" />
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col">
                  {/* Messages */}
                  <div className="flex-1 overflow-y-auto space-y-4 mb-4">
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                      >
                        <div
                          className={`max-w-[80%] p-3 rounded-lg ${
                            message.role === "user"
                              ? "bg-primary text-primary-foreground"
                              : "bg-card border border-border"
                          }`}
                        >
                          {message.questionType && (
                            <Badge variant="secondary" className="mb-2 text-xs">
                              {message.questionType}
                            </Badge>
                          )}
                          <p className="text-sm">{message.content}</p>
                          {message.feedback && (
                            <div className="mt-2 pt-2 border-t border-border/50">
                              <div className="flex items-center gap-2 mb-1">
                                <Badge variant="secondary">Score: {message.feedback.score}%</Badge>
                              </div>
                              <div className="text-xs text-muted-foreground">
                                <p>
                                  <strong>Strengths:</strong> {message.feedback.strengths.join(", ")}
                                </p>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                    <div ref={messagesEndRef} />
                  </div>

                  {/* Input */}
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setIsRecording(!isRecording)}
                      className={isRecording ? "text-red-500" : ""}
                    >
                      {isRecording ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                    </Button>
                    <Input
                      value={currentMessage}
                      onChange={(e) => setCurrentMessage(e.target.value)}
                      placeholder="Type your answer..."
                      onKeyPress={(e) => e.key === "Enter" && sendMessage()}
                      className="flex-1"
                    />
                    <Button
                      onClick={sendMessage}
                      disabled={!currentMessage.trim()}
                      className="bg-primary hover:bg-primary/90"
                    >
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-4">
              <Card className="border-border">
                <CardHeader>
                  <CardTitle className="text-lg">Progress</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Questions</span>
                      <span>{session.questionsAsked}/5</span>
                    </div>
                    <Progress value={(session.questionsAsked / 5) * 100} />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Current Score</span>
                      <span>{session.currentScore}%</span>
                    </div>
                    <Progress value={session.currentScore} />
                  </div>
                </CardContent>
              </Card>

              <Card className="border-border">
                <CardHeader>
                  <CardTitle className="text-lg">Tips</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• Be specific with examples</li>
                    <li>• Use the STAR method for behavioral questions</li>
                    <li>• Think out loud for technical problems</li>
                    <li>• Ask clarifying questions when needed</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
