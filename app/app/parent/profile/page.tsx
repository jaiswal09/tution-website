"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

// In a real app, this data would come from your backend
const mockParentData = {
  name: "Jane Smith",
  email: "jane.smith@example.com",
  childName: "Tommy",
  childAge: 10,
  subjects: ["English", "History"],
  profilePicture: "/placeholder.svg",
}

export default function ParentProfile() {
  const [parentData, setParentData] = useState(mockParentData)

  // In a real app, you would fetch the parent data here
  useEffect(() => {
    // Simulating an API call
    setTimeout(() => setParentData(mockParentData), 1000)
  }, [])

  return (
    <div className="container mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle>Parent Profile</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-4 mb-4">
            <Avatar className="w-20 h-20">
              <AvatarImage src={parentData.profilePicture} alt={parentData.name} />
              <AvatarFallback>{parentData.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-2xl font-bold">{parentData.name}</h2>
              <p className="text-gray-500">{parentData.email}</p>
            </div>
          </div>
          <div className="space-y-2">
            <p>
              <strong>Child's Name:</strong> {parentData.childName}
            </p>
            <p>
              <strong>Child's Age:</strong> {parentData.childAge}
            </p>
            <p>
              <strong>Subjects Needed:</strong> {parentData.subjects.join(", ")}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

