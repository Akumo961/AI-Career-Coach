import { type NextRequest, NextResponse } from "next/server"

const questionBank = {
  technical: [
    "Explain the difference between let, const, and var in JavaScript.",
    "How does React's virtual DOM work?",
    "What are the benefits of using TypeScript over JavaScript?",
    "Explain the concept of closures in JavaScript.",
    "How would you optimize a React application's performance?",
  ],
  behavioral: [
    "Tell me about a challenging project you worked on.",
    "How do you handle tight deadlines and pressure?",
    "Describe a time when you had to learn a new technology quickly.",
    "How do you approach debugging complex issues?",
    "Tell me about a time you disagreed with a team member.",
  ],
  situational: [
    "How would you handle a situation where requirements change mid-project?",
    "What would you do if you discovered a security vulnerability in production?",
    "How would you approach mentoring a junior developer?",
    "What steps would you take to improve team productivity?",
    "How would you handle conflicting priorities from different stakeholders?",
  ],
}

export async function POST(request: NextRequest) {
  try {
    const { message, sessionId, questionType } = await request.json()

    // Simulate AI processing
    await new Promise((resolve) => setTimeout(resolve, 1500))

    if (!message) {
      // Generate initial question
      const questions = questionBank[questionType as keyof typeof questionBank] || questionBank.technical
      const randomQuestion = questions[Math.floor(Math.random() * questions.length)]

      return NextResponse.json({
        response: `Hello! I'm your AI interviewer. Let's start with this ${questionType} question: ${randomQuestion}`,
        question: randomQuestion,
        feedback: null,
        score: null,
      })
    }

    // Analyze user response and provide feedback
    const score = Math.floor(Math.random() * 30) + 70 // 70-100
    const feedback = generateFeedback(message, score)

    // Generate follow-up question
    const questions = questionBank[questionType as keyof typeof questionBank] || questionBank.technical
    const nextQuestion = questions[Math.floor(Math.random() * questions.length)]

    return NextResponse.json({
      response: `${feedback.comment} Let's continue with: ${nextQuestion}`,
      question: nextQuestion,
      feedback: feedback,
      score: score,
    })
  } catch (error) {
    return NextResponse.json({ error: "Interview simulation failed" }, { status: 500 })
  }
}

function generateFeedback(answer: string, score: number) {
  const wordCount = answer.split(" ").length

  if (score >= 90) {
    return {
      comment: "Excellent answer! You demonstrated deep understanding and provided specific examples.",
      strengths: ["Clear communication", "Technical depth", "Practical examples"],
      improvements: ["Consider adding more context about trade-offs"],
    }
  } else if (score >= 80) {
    return {
      comment: "Good response! You covered the key points well.",
      strengths: ["Good technical knowledge", "Structured approach"],
      improvements: ["Add more specific examples", "Elaborate on implementation details"],
    }
  } else if (score >= 70) {
    return {
      comment: "Decent answer, but there's room for improvement.",
      strengths: ["Basic understanding demonstrated"],
      improvements: [
        "Provide more detailed explanations",
        "Include practical examples",
        "Show deeper technical knowledge",
      ],
    }
  } else {
    return {
      comment: "Your answer needs more development. Try to be more specific and detailed.",
      strengths: ["Attempted to answer"],
      improvements: [
        "Study the topic more thoroughly",
        "Practice explaining concepts clearly",
        "Prepare specific examples",
      ],
    }
  }
}
