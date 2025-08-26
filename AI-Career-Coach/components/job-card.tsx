"use client"

import { MapPin, DollarSign, Clock, Bookmark, ExternalLink, Building, Users, Zap } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

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

interface JobCardProps {
  job: Job
  isSaved: boolean
  onToggleSave: (jobId: string) => void
}

export function JobCard({ job, isSaved, onToggleSave }: JobCardProps) {
  const getMatchScoreColor = (score: number) => {
    if (score >= 90) return "text-green-600 bg-green-50"
    if (score >= 80) return "text-blue-600 bg-blue-50"
    if (score >= 70) return "text-yellow-600 bg-yellow-50"
    return "text-gray-600 bg-gray-50"
  }

  return (
    <Card className="border-border hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <CardTitle className="text-lg">{job.title}</CardTitle>
              <Badge className={`${getMatchScoreColor(job.matchScore)} border-0`}>{job.matchScore}% match</Badge>
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
            onClick={() => onToggleSave(job.id)}
            className={isSaved ? "text-secondary" : ""}
          >
            <Bookmark className={`w-4 h-4 ${isSaved ? "fill-current" : ""}`} />
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
  )
}
