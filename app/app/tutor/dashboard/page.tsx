"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"
import { Bell } from "lucide-react"
import { getUserProfile, getTutorAssignments, updateAssignmentStatus } from "@/services/api"

export default function TutorDashboard() {
  const [tutorData, setTutorData] = useState(null)
  const [assignments, setAssignments] = useState([])
  const [selectedAssignment, setSelectedAssignment] = useState(null)
  const [denyReason, setDenyReason] = useState("")

  useEffect(() => {
    fetchTutorData()
    fetchAssignments()
  }, [])

  const fetchTutorData = async () => {
    try {
      const response = await getUserProfile()
      setTutorData(response.data)
    } catch (error) {
      console.error("Error fetching tutor data:", error)
    }
  }

  const fetchAssignments = async () => {
    try {
      const response = await getTutorAssignments()
      setAssignments(response.data)
    } catch (error) {
      console.error("Error fetching assignments:", error)
    }
  }

  const handleAcceptAssignment = async (assignmentId) => {
    try {
      await updateAssignmentStatus(assignmentId, "accepted")
      fetchAssignments()
      toast({
        title: "Assignment Accepted",
        description: "You have successfully accepted the assignment.",
      })
    } catch (error) {
      console.error("Error accepting assignment:", error)
      toast({
        title: "Error",
        description: "Failed to accept the assignment. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleDenyAssignment = async (assignmentId) => {
    try {
      await updateAssignmentStatus(assignmentId, "denied", denyReason)
      fetchAssignments()
      setSelectedAssignment(null)
      setDenyReason("")
      toast({
        title: "Assignment Denied",
        description: "You have successfully denied the assignment.",
      })
    } catch (error) {
      console.error("Error denying assignment:", error)
      toast({
        title: "Error",
        description: "Failed to deny the assignment. Please try again.",
        variant: "destructive",
      })
    }
  }

  const pendingAssignments = assignments.filter((a) => a.status === "pending")
  const activeAssignments = assignments.filter((a) => a.status === "accepted")

  return (
    <div className="container mx-auto p-4">
      <Card className="mb-8">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Tutor Profile</CardTitle>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" className="relative">
                  <Bell className="h-4 w-4" />
                  {pendingAssignments.length > 0 && (
                    <Badge variant="destructive" className="absolute -top-2 -right-2 px-2 py-1">
                      {pendingAssignments.length}
                    </Badge>
                  )}
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>New Assignment Offers</DialogTitle>
                  <DialogDescription>Review and respond to new assignment offers</DialogDescription>
                </DialogHeader>
                {pendingAssignments.map((assignment) => (
                  <Card key={assignment._id} className="mb-4">
                    <CardHeader>
                      <CardTitle>
                        {assignment.student.name} - {assignment.subject}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p>Offered Fee: ${assignment.fee}</p>
                    </CardContent>
                    <CardFooter className="flex justify-end space-x-2">
                      <Button onClick={() => setSelectedAssignment(assignment)} variant="outline">
                        Deny
                      </Button>
                      <Button onClick={() => handleAcceptAssignment(assignment._id)}>Accept</Button>
                    </CardFooter>
                  </Card>
                ))}
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          {tutorData && (
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
          )}
          {tutorData && (
            <div className="space-y-2">
              <p>
                <strong>Subjects:</strong> {tutorData.subjects.join(", ")}
              </p>
              <p>
                <strong>Experience:</strong> {tutorData.experience}
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Current Assignments</CardTitle>
        </CardHeader>
        <CardContent>
          {activeAssignments.length === 0 ? (
            <p>No current assignments.</p>
          ) : (
            <ul>
              {activeAssignments.map((assignment) => (
                <li key={assignment._id} className="mb-2">
                  {assignment.student.name} - {assignment.subject} (${assignment.fee})
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>

      <Dialog open={!!selectedAssignment} onOpenChange={() => setSelectedAssignment(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Deny Assignment</DialogTitle>
            <DialogDescription>Please provide a reason for denying this assignment (optional)</DialogDescription>
          </DialogHeader>
          <Textarea
            placeholder="Enter reason here..."
            value={denyReason}
            onChange={(e) => setDenyReason(e.target.value)}
          />
          <DialogFooter>
            <Button onClick={() => handleDenyAssignment(selectedAssignment?._id)} variant="destructive">
              Confirm Denial
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

