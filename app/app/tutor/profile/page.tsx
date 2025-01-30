"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

// In a real app, this data would come from your backend
const mockTutorData = {
  name: "John Doe",
  email: "john.doe@example.com",
  subjects: ["Math", "Science"],
  experience: "5 years of teaching experience",
  profilePicture: "/placeholder.svg",
}

export default function TutorProfile() {
  const [tutorData, setTutorData] = useState(mockTutorData)

  // In a real app, you would fetch the tutor data here
  useEffect(() => {
    // Simulating an API call
    setTimeout(() => setTutorData(mockTutorData), 1000)
  }, [])

  return (
    <div className="container mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle>Tutor Profile</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-4 mb-4">
            <Avatar className="w-20 h-20">
              <AvatarImage src={tutorData.profilePicture} alt={tutorData.name} />
              <AvatarFallback>{tutorData.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-2xl font-bold">{tutorData.name}</h2>
              <p className="text-gray-500">{tutorData.email}</p>
            </div>
          </div>
          <div className="space-y-2">
            <p>
              <strong>Subjects:</strong> {tutorData.subjects.join(", ")}
            </p>
            <p>
              <strong>Experience:</strong> {tutorData.experience}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

