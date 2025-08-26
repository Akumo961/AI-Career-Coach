import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { jobDetails, userProfile, template, tone } = await request.json()

    // Simulate AI processing
    await new Promise((resolve) => setTimeout(resolve, 2000))

    const coverLetter = generateCoverLetter(jobDetails, userProfile, template, tone)

    return NextResponse.json({
      coverLetter,
      analysis: {
        matchScore: Math.floor(Math.random() * 20) + 80,
        keywordMatch: Math.floor(Math.random() * 15) + 85,
        readabilityScore: Math.floor(Math.random() * 10) + 90,
        suggestions: [
          "Consider adding more specific achievements",
          "Mention company values alignment",
          "Include relevant project examples",
        ],
      },
      statistics: {
        wordCount: coverLetter.split(" ").length,
        readingTime: Math.ceil(coverLetter.split(" ").length / 200),
        sentenceCount: coverLetter.split(".").length - 1,
      },
    })
  } catch (error) {
    return NextResponse.json({ error: "Cover letter generation failed" }, { status: 500 })
  }
}

function generateCoverLetter(jobDetails: any, userProfile: any, template: string, tone: string) {
  const { company, position, description } = jobDetails
  const { name, experience, skills } = userProfile

  const toneAdjustments = {
    professional: "I am writing to express my strong interest",
    friendly: "I'm excited to apply for",
    confident: "I am the ideal candidate for",
    creative: "Your innovative approach to",
  }

  const opening = toneAdjustments[tone as keyof typeof toneAdjustments] || toneAdjustments.professional

  return `Dear Hiring Manager,

${opening} in the ${position} position at ${company}. With ${experience} years of experience in software development and expertise in ${skills?.join(", ")}, I am confident I would be a valuable addition to your team.

In my previous roles, I have successfully delivered high-quality applications using modern technologies including React, TypeScript, and Node.js. My experience with agile development methodologies and collaborative team environments aligns perfectly with what you're looking for in this role.

What particularly excites me about ${company} is your commitment to innovation and user-centric design. I am eager to contribute my technical skills and passion for creating exceptional user experiences to help drive your mission forward.

I have attached my resume for your review and would welcome the opportunity to discuss how my background and enthusiasm can contribute to ${company}'s continued success. Thank you for considering my application.

Best regards,
${name || "Your Name"}`
}
