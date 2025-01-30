"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Label } from "@/components/ui/label"
import { toast } from "@/components/ui/use-toast"

// Mock data (in a real app, this would come from your backend)
const mockStudents = [
  {
    id: 1,
    name: "Alice",
    age: 10,
    subjects: ["Math", "Science"],
    parent: "Mr. Johnson",
    profilePicture: "/placeholder.svg",
  },
  {
    id: 2,
    name: "Bob",
    age: 12,
    subjects: ["English", "History"],
    parent: "Mrs. Smith",
    profilePicture: "/placeholder.svg",
  },
  {
    id: 3,
    name: "Charlie",
    age: 11,
    subjects: ["Physics", "Chemistry"],
    parent: "Dr. Brown",
    profilePicture: "/placeholder.svg",
  },
]

const mockTutors = [
  {
    id: 1,
    name: "Mr. Smith",
    subjects: ["Math", "Science"],
    experience: "5 years",
    profilePicture: "/placeholder.svg",
  },
  {
    id: 2,
    name: "Ms. Johnson",
    subjects: ["English", "History"],
    experience: "3 years",
    profilePicture: "/placeholder.svg",
  },
  {
    id: 3,
    name: "Dr. Williams",
    subjects: ["Physics", "Chemistry"],
    experience: "7 years",
    profilePicture: "/placeholder.svg",
  },
]

const mockParents = [
  { id: 1, name: "Mr. Johnson", email: "johnson@example.com", childName: "Alice", childAge: 10 },
  { id: 2, name: "Mrs. Smith", email: "smith@example.com", childName: "Bob", childAge: 12 },
  { id: 3, name: "Dr. Brown", email: "brown@example.com", childName: "Charlie", childAge: 11 },
]

export default function AdminDashboard() {
  const [students, setStudents] = useState(mockStudents)
  const [tutors, setTutors] = useState(mockTutors)
  const [parents, setParents] = useState(mockParents)
  const [selectedStudent, setSelectedStudent] = useState("")
  const [selectedTutor, setSelectedTutor] = useState("")
  const [tutorFee, setTutorFee] = useState("")

  const handleAssignment = () => {
    if (selectedStudent && selectedTutor && tutorFee) {
      console.log(`Assigning student ${selectedStudent} to tutor ${selectedTutor} with fee ${tutorFee}`)
      // Here you would typically send this data to your backend
      // and update the state accordingly
      toast({
        title: "Assignment Created",
        description: `Student ${selectedStudent} assigned to Tutor ${selectedTutor} with fee $${tutorFee}`,
      })
      // Reset the form
      setSelectedStudent("")
      setSelectedTutor("")
      setTutorFee("")
    } else {
      toast({
        title: "Error",
        description: "Please select a student, tutor, and set a fee",
        variant: "destructive",
      })
    }
  }

  const ProfileDialog = ({ user, type }: { user: any; type: "student" | "tutor" }) => (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">View Profile</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{type === "student" ? "Student" : "Tutor"} Profile</DialogTitle>
          <DialogDescription>Review the {type}'s information before assigning.</DialogDescription>
        </DialogHeader>
        <div className="flex flex-col items-center space-y-4">
          <Avatar className="w-24 h-24">
            <AvatarImage src={user.profilePicture} alt={user.name} />
            <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <h2 className="text-2xl font-bold">{user.name}</h2>
          {type === "student" ? (
            <>
              <p>
                <strong>Age:</strong> {user.age}
              </p>
              <p>
                <strong>Subjects:</strong> {user.subjects.join(", ")}
              </p>
              <p>
                <strong>Parent:</strong> {user.parent}
              </p>
            </>
          ) : (
            <>
              <p>
                <strong>Subjects:</strong> {user.subjects.join(", ")}
              </p>
              <p>
                <strong>Experience:</strong> {user.experience}
              </p>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
        </div>
      </header>
      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-8">
              <div className="px-4 py-5 sm:px-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900">Assign Students to Tutors</h3>
              </div>
              <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
                <dl className="sm:divide-y sm:divide-gray-200">
                  <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">Select Student</dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      <div className="flex items-center space-x-4">
                        <Select value={selectedStudent} onValueChange={setSelectedStudent}>
                          <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Select a student" />
                          </SelectTrigger>
                          <SelectContent>
                            {students.map((student) => (
                              <SelectItem key={student.id} value={student.id.toString()}>
                                {student.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        {selectedStudent && (
                          <ProfileDialog
                            user={students.find((s) => s.id.toString() === selectedStudent)}
                            type="student"
                          />
                        )}
                      </div>
                    </dd>
                  </div>
                  <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">Select Tutor</dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      <div className="flex items-center space-x-4">
                        <Select value={selectedTutor} onValueChange={setSelectedTutor}>
                          <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Select a tutor" />
                          </SelectTrigger>
                          <SelectContent>
                            {tutors.map((tutor) => (
                              <SelectItem key={tutor.id} value={tutor.id.toString()}>
                                {tutor.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        {selectedTutor && (
                          <ProfileDialog user={tutors.find((t) => t.id.toString() === selectedTutor)} type="tutor" />
                        )}
                      </div>
                    </dd>
                  </div>
                  <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">Set Tutor Fee</dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      <div className="flex items-center space-x-4">
                        <Input
                          type="number"
                          placeholder="Enter fee amount"
                          value={tutorFee}
                          onChange={(e) => setTutorFee(e.target.value)}
                        />
                      </div>
                    </dd>
                  </div>
                </dl>
              </div>
              <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                <Button onClick={handleAssignment}>Assign and Notify Tutor</Button>
              </div>
            </div>

            <Tabs defaultValue="students" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="students">Students</TabsTrigger>
                <TabsTrigger value="tutors">Tutors</TabsTrigger>
                <TabsTrigger value="parents">Parents</TabsTrigger>
              </TabsList>
              <TabsContent value="students">
                <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Age</TableHead>
                        <TableHead>Subjects</TableHead>
                        <TableHead>Parent</TableHead>
                        <TableHead>Profile</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {students.map((student) => (
                        <TableRow key={student.id}>
                          <TableCell>{student.name}</TableCell>
                          <TableCell>{student.age}</TableCell>
                          <TableCell>{student.subjects.join(", ")}</TableCell>
                          <TableCell>{student.parent}</TableCell>
                          <TableCell>
                            <ProfileDialog user={student} type="student" />
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </TabsContent>
              <TabsContent value="tutors">
                <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Subjects</TableHead>
                        <TableHead>Experience</TableHead>
                        <TableHead>Profile</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {tutors.map((tutor) => (
                        <TableRow key={tutor.id}>
                          <TableCell>{tutor.name}</TableCell>
                          <TableCell>{tutor.subjects.join(", ")}</TableCell>
                          <TableCell>{tutor.experience}</TableCell>
                          <TableCell>
                            <ProfileDialog user={tutor} type="tutor" />
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </TabsContent>
              <TabsContent value="parents">
                <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Child's Name</TableHead>
                        <TableHead>Child's Age</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {parents.map((parent) => (
                        <TableRow key={parent.id}>
                          <TableCell>{parent.name}</TableCell>
                          <TableCell>{parent.email}</TableCell>
                          <TableCell>{parent.childName}</TableCell>
                          <TableCell>{parent.childAge}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
    </div>
  )
}

