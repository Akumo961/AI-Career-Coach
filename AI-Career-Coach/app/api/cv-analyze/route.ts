import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get("file") as File

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 })
    }

    // Simulate AI processing delay
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Mock CV analysis results
    const analysis = {
      overallScore: Math.floor(Math.random() * 20) + 75, // 75-95
      sections: {
        contact: { score: 95, feedback: "Contact information is complete and professional" },
        summary: { score: 82, feedback: "Summary could be more specific about achievements" },
        experience: { score: 88, feedback: "Good experience section, consider adding more metrics" },
        skills: { score: 76, feedback: "Skills section needs more relevant technologies" },
        education: { score: 90, feedback: "Education section is well formatted" },
      },
      atsCompatibility: {
        score: 85,
        issues: [
          "Consider using standard section headers",
          "Add more keywords from job descriptions",
          "Ensure consistent formatting",
        ],
      },
      skillsGap: [
        { skill: "React", current: "Intermediate", target: "Advanced", priority: "High" },
        { skill: "TypeScript", current: "Beginner", target: "Intermediate", priority: "Medium" },
        { skill: "AWS", current: "None", target: "Beginner", priority: "High" },
      ],
      keywords: {
        missing: ["cloud computing", "microservices", "agile", "CI/CD"],
        present: ["JavaScript", "React", "Node.js", "MongoDB"],
      },
      recommendations: [
        {
          priority: "High",
          category: "Content",
          suggestion: "Add quantifiable achievements with specific metrics",
          impact: "Increases recruiter interest by 40%",
        },
        {
          priority: "Medium",
          category: "Keywords",
          suggestion: "Include more industry-specific keywords",
          impact: "Improves ATS compatibility by 25%",
        },
        {
          priority: "High",
          category: "Skills",
          suggestion: "Add cloud computing and DevOps skills",
          impact: "Matches 60% more job requirements",
        },
      ],
    }

    return NextResponse.json(analysis)
  } catch (error) {
    return NextResponse.json({ error: "Analysis failed" }, { status: 500 })
  }
}
