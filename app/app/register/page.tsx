"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"

export default function Register() {
  const router = useRouter()
  const [tutorData, setTutorData] = useState({
    name: "",
    email: "",
    password: "",
    subjects: "",
    experience: "",
    profilePicture: null as File | null,
  })
  const [parentData, setParentData] = useState({
    name: "",
    email: "",
    password: "",
    childName: "",
    childAge: "",
    subjects: "",
    profilePicture: null as File | null,
  })

  const handleTutorSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Tutor registration:", tutorData)
    // Here you would typically send the data to your backend
    router.push("/tutor/profile")
  }

  const handleParentSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Parent registration:", parentData)
    // Here you would typically send the data to your backend
    router.push("/parent/profile")
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, setData: Function) => {
    if (e.target.files && e.target.files[0]) {
      setData((prev: any) => ({ ...prev, profilePicture: e.target.files![0] }))
    }
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      <div className="m-auto w-full max-w-4xl p-8">
        <h1 className="text-3xl font-bold text-center mb-6">Sign Up for TutorConnect</h1>
        <Tabs defaultValue="tutor" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="tutor">Tutor</TabsTrigger>
            <TabsTrigger value="parent">Parent</TabsTrigger>
          </TabsList>
          <TabsContent value="tutor">
            <form onSubmit={handleTutorSubmit} className="space-y-4 bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
              <div>
                <Label htmlFor="tutor-name">Full Name</Label>
                <Input
                  id="tutor-name"
                  value={tutorData.name}
                  onChange={(e) => setTutorData({ ...tutorData, name: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="tutor-email">Email</Label>
                <Input
                  id="tutor-email"
                  type="email"
                  value={tutorData.email}
                  onChange={(e) => setTutorData({ ...tutorData, email: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="tutor-password">Password</Label>
                <Input
                  id="tutor-password"
                  type="password"
                  value={tutorData.password}
                  onChange={(e) => setTutorData({ ...tutorData, password: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="tutor-subjects">Subjects (comma-separated)</Label>
                <Input
                  id="tutor-subjects"
                  value={tutorData.subjects}
                  onChange={(e) => setTutorData({ ...tutorData, subjects: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="tutor-experience">Experience</Label>
                <Textarea
                  id="tutor-experience"
                  value={tutorData.experience}
                  onChange={(e) => setTutorData({ ...tutorData, experience: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="tutor-profile-picture">Profile Picture</Label>
                <Input
                  id="tutor-profile-picture"
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileChange(e, setTutorData)}
                />
              </div>
              <Button type="submit">Register as Tutor</Button>
            </form>
          </TabsContent>
          <TabsContent value="parent">
            <form onSubmit={handleParentSubmit} className="space-y-4 bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
              <div>
                <Label htmlFor="parent-name">Full Name</Label>
                <Input
                  id="parent-name"
                  value={parentData.name}
                  onChange={(e) => setParentData({ ...parentData, name: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="parent-email">Email</Label>
                <Input
                  id="parent-email"
                  type="email"
                  value={parentData.email}
                  onChange={(e) => setParentData({ ...parentData, email: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="parent-password">Password</Label>
                <Input
                  id="parent-password"
                  type="password"
                  value={parentData.password}
                  onChange={(e) => setParentData({ ...parentData, password: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="child-name">Child's Name</Label>
                <Input
                  id="child-name"
                  value={parentData.childName}
                  onChange={(e) => setParentData({ ...parentData, childName: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="child-age">Child's Age</Label>
                <Input
                  id="child-age"
                  type="number"
                  value={parentData.childAge}
                  onChange={(e) => setParentData({ ...parentData, childAge: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="parent-subjects">Subjects Needed (comma-separated)</Label>
                <Input
                  id="parent-subjects"
                  value={parentData.subjects}
                  onChange={(e) => setParentData({ ...parentData, subjects: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="parent-profile-picture">Profile Picture</Label>
                <Input
                  id="parent-profile-picture"
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileChange(e, setParentData)}
                />
              </div>
              <Button type="submit">Register as Parent</Button>
            </form>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

