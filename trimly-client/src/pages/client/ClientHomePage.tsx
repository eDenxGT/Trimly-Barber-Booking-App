"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Search, MapPin, Calendar, CheckCircle, Clock, Scissors } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/sidebar/app-sidebar"
import { Chip, Rating, Tooltip } from "@mui/material"

// Sample data
const popularBarbers = [
  {
    id: 1,
    name: "Vintage Barbershop",
    services: ["Haircut/Styling", "Hair Coloring"],
    rating: 4.8,
    reviews: 120,
    location: "123 Main Street",
    distance: "0.5 miles",
    image: "/placeholder.svg?height=300&width=200",
    verified: true,
  },
  {
    id: 2,
    name: "Vintage Barbershop",
    services: ["Haircut/Styling", "Hair Coloring"],
    rating: 4.7,
    reviews: 98,
    location: "123 Main Street",
    distance: "0.8 miles",
    image: "/placeholder.svg?height=300&width=200",
    verified: true,
  },
  {
    id: 3,
    name: "Vintage Barbershop",
    services: ["Haircut/Styling", "Hair Coloring"],
    rating: 4.9,
    reviews: 156,
    location: "123 Main Street",
    distance: "1.2 miles",
    image: "/placeholder.svg?height=300&width=200",
    verified: true,
  },
  {
    id: 4,
    name: "Vintage Barbershop",
    services: ["Haircut/Styling", "Hair Coloring"],
    rating: 4.6,
    reviews: 85,
    location: "123 Main Street",
    distance: "1.5 miles",
    image: "/placeholder.svg?height=300&width=200",
    verified: true,
  },
]

const categories = [
  { id: 1, name: "Hair Cutting", icon: Scissors, count: 45 },
  { id: 2, name: "Beard Trimming", icon: Scissors, count: 32 },
  { id: 3, name: "Hair Coloring", icon: Scissors, count: 28 },
  { id: 4, name: "Hair Styling", icon: Scissors, count: 36 },
]

const bookingSteps = [
  { id: 1, name: "Book", status: "completed", icon: Calendar },
  { id: 2, name: "Pending", status: "current", icon: Clock },
  { id: 3, name: "On Way", status: "upcoming", icon: MapPin },
  { id: 4, name: "Finished", status: "upcoming", icon: CheckCircle },
]

export default function ClientHomePage() {
  const [searchQuery, setSearchQuery] = useState("")

  const handleLogout = () => {
    console.log("Logging out...")
  }

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 },
    },
  }

  return (
    <div className="min-h-screen bg-background">
      <SidebarProvider>
        <AppSidebar userRole="client" userName="John Doe" onLogout={handleLogout} />
        <SidebarInset>
          <main className="flex-1">
            {/* Hero Section */}
            <motion.section
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="relative bg-[var(--yellow)] text-black overflow-hidden"
            >
              <div className="container mx-auto px-4 py-12 md:py-16 flex flex-col md:flex-row items-center">
                <motion.div
                  initial={{ x: -50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                  className="md:w-1/2 z-10"
                >
                  <h1 className="text-4xl md:text-5xl font-bold mb-4">
                    Find the Best
                    <br />
                    Barbers Near You!
                  </h1>
                  <div className="relative max-w-md mt-6">
                    <Input
                      type="text"
                      placeholder="Search barbers or services..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 pr-4 py-3 rounded-lg border-none bg-white shadow-lg"
                    />
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <Button className="absolute right-1 top-1/2 transform -translate-y-1/2 bg-[var(--yellow)] hover:bg-[var(--yellow-hover)] text-black">
                      Search
                    </Button>
                  </div>
                </motion.div>
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                  className="md:w-1/2 relative z-10 mt-8 md:mt-0"
                >
                  <img
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-udOImAMFIIt3brZaKDCefd7JZ7IGly.png"
                    alt="Barber with phone"
                    className="w-full max-w-md mx-auto object-contain"
                    style={{ maxHeight: "400px" }}
                  />
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.6, duration: 0.5 }}
                    className="absolute bottom-4 left-1/2 transform -translate-x-1/2"
                  >
                    <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white font-medium">
                      Find Now!
                    </Button>
                  </motion.div>
                </motion.div>
                {/* Background pattern */}
                <div className="absolute inset-0 opacity-10 pattern-bg">
                  <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                      <pattern id="barberPattern" patternUnits="userSpaceOnUse" width="100" height="100">
                        <path d="M20,20 L80,20 L80,80 L20,80 Z" fill="none" stroke="currentColor" strokeWidth="2" />
                      </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#barberPattern)" />
                  </svg>
                </div>
              </div>
            </motion.section>

            {/* Popular Barbers Section */}
            <motion.section
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="py-12 px-4"
            >
              <motion.h2 variants={itemVariants} className="text-2xl font-bold text-center mb-8">
                Popular Barbers Near You!
              </motion.h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
                {popularBarbers.map((barber, index) => (
                  <motion.div
                    key={barber.id}
                    variants={itemVariants}
                    whileHover={{ y: -5, transition: { duration: 0.2 } }}
                    className="group"
                  >
                    <Card className="overflow-hidden h-full border border-gray-200 hover:shadow-lg transition-shadow duration-300">
                      <div className="relative">
                        <img
                          src={barber.image || "/placeholder.svg"}
                          alt={barber.name}
                          className="w-full h-64 object-cover"
                        />
                        {barber.verified && (
                          <Badge className="absolute top-2 left-2 bg-blue-600 text-white">VERIFIED</Badge>
                        )}
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                          <h3 className="text-white font-semibold">{barber.name}</h3>
                          <p className="text-white/80 text-sm">{barber.services.join(" • ")}</p>
                        </div>
                      </div>
                      <CardContent className="p-4">
                        <div className="flex items-center mb-2">
                          <Rating
                            value={barber.rating}
                            precision={0.1}
                            readOnly
                            size="small"
                            sx={{ color: "var(--yellow)" }}
                          />
                          <span className="ml-2 text-sm text-gray-600">({barber.reviews})</span>
                        </div>
                        <div className="flex items-center text-sm text-gray-600 mb-3">
                          <MapPin className="h-4 w-4 mr-1" />
                          <span>{barber.location}</span>
                          <span className="mx-2">•</span>
                          <span>{barber.distance}</span>
                        </div>
                        <Button className="w-full bg-[var(--yellow)] hover:bg-[var(--yellow-hover)] text-black">
                          Book Now
                        </Button>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.section>

            {/* Categories Section */}
            <motion.section
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="py-12 px-4 bg-gray-50"
            >
              <motion.h2 variants={itemVariants} className="text-2xl font-bold text-center mb-8">
                Categories
              </motion.h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
                {categories.map((category) => (
                  <motion.div
                    key={category.id}
                    variants={itemVariants}
                    whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
                  >
                    <Card className="overflow-hidden cursor-pointer border border-gray-200 hover:shadow-md transition-shadow duration-300">
                      <div className="relative h-40">
                        <img
                          src="/placeholder.svg?height=160&width=300"
                          alt={category.name}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                          <div className="text-center">
                            <category.icon className="h-8 w-8 text-white mx-auto mb-2" />
                            <h3 className="text-white font-medium">{category.name}</h3>
                          </div>
                        </div>
                        <Badge className="absolute top-2 right-2 bg-[var(--yellow)] text-black">
                          {category.count} category
                        </Badge>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.section>

            {/* Booking Status & Map Section */}
            <motion.section
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="py-12 px-4"
            >
              <div className="max-w-6xl mx-auto bg-gray-200 rounded-lg overflow-hidden">
                <div className="grid grid-cols-1 md:grid-cols-2">
                  {/* Booking Status */}
                  <motion.div variants={itemVariants} className="p-6">
                    <h3 className="text-xl font-bold mb-6 text-center">Your Booking Status</h3>
                    <div className="relative">
                      {/* Progress line */}
                      <div className="absolute top-5 left-0 right-0 h-1 bg-gray-300 z-0">
                        <div className="absolute top-0 left-0 h-full bg-[var(--yellow)]" style={{ width: "30%" }}></div>
                      </div>

                      {/* Steps */}
                      <div className="flex justify-between relative z-10">
                        {bookingSteps.map((step, index) => (
                          <div key={step.id} className="flex flex-col items-center">
                            <div
                              className={`w-10 h-10 rounded-full flex items-center justify-center ${
                                step.status === "completed"
                                  ? "bg-[var(--yellow)] text-black"
                                  : step.status === "current"
                                    ? "bg-blue-500 text-white"
                                    : "bg-gray-300 text-gray-600"
                              }`}
                            >
                              <step.icon className="h-5 w-5" />
                            </div>
                            <span className="mt-2 text-sm font-medium">{step.name}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Current Booking Card */}
                    <motion.div
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.5, duration: 0.5 }}
                      className="mt-12 bg-white rounded-lg shadow-md p-4"
                    >
                      <div className="flex items-start">
                        <img
                          src="/placeholder.svg?height=80&width=80"
                          alt="Barber"
                          className="w-20 h-20 object-cover rounded-md mr-4"
                        />
                        <div className="flex-1">
                          <h4 className="font-semibold">Porter place Barbershop</h4>
                          <div className="flex items-center mt-1">
                            <Rating value={4.8} precision={0.1} readOnly size="small" sx={{ color: "var(--yellow)" }} />
                            <span className="ml-1 text-sm text-gray-600">(124)</span>
                          </div>
                          <div className="flex mt-2 gap-2">
                            <Chip
                              icon={<Calendar className="h-3 w-3" />}
                              label="Today"
                              size="small"
                              sx={{ backgroundColor: "#f0f0f0" }}
                            />
                            <Chip
                              icon={<Clock className="h-3 w-3" />}
                              label="2:30 PM"
                              size="small"
                              sx={{ backgroundColor: "#f0f0f0" }}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="flex justify-between mt-4">
                        <Button variant="outline" size="sm">
                          Cancel
                        </Button>
                        <Button size="sm" className="bg-[var(--yellow)] hover:bg-[var(--yellow-hover)] text-black">
                          Reschedule
                        </Button>
                      </div>
                    </motion.div>
                  </motion.div>

                  {/* Map */}
                  <motion.div variants={itemVariants} className="p-6">
                    <h3 className="text-xl font-bold mb-6 text-center">Find nearby barbers</h3>
                    <div className="relative h-[300px] rounded-lg overflow-hidden border border-gray-300">
                      <img
                        src="/placeholder.svg?height=300&width=500&text=Map"
                        alt="Map"
                        className="w-full h-full object-cover"
                      />
                      {/* Map markers */}
                      <div className="absolute top-1/4 left-1/4 transform -translate-x-1/2 -translate-y-1/2">
                        <Tooltip title="Vintage Barbershop">
                          <div className="w-6 h-6 bg-[var(--yellow)] rounded-full flex items-center justify-center cursor-pointer">
                            <Scissors className="h-3 w-3 text-black" />
                          </div>
                        </Tooltip>
                      </div>
                      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                        <Tooltip title="Modern Cuts">
                          <div className="w-6 h-6 bg-[var(--yellow)] rounded-full flex items-center justify-center cursor-pointer">
                            <Scissors className="h-3 w-3 text-black" />
                          </div>
                        </Tooltip>
                      </div>
                      <div className="absolute bottom-1/3 right-1/4 transform -translate-x-1/2 -translate-y-1/2">
                        <Tooltip title="Classic Barbers">
                          <div className="w-6 h-6 bg-[var(--yellow)] rounded-full flex items-center justify-center cursor-pointer">
                            <Scissors className="h-3 w-3 text-black" />
                          </div>
                        </Tooltip>
                      </div>
                      <div className="absolute bottom-1/4 right-1/3 transform -translate-x-1/2 -translate-y-1/2">
                        <Tooltip title="Your Location">
                          <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center cursor-pointer">
                            <MapPin className="h-3 w-3 text-white" />
                          </div>
                        </Tooltip>
                      </div>
                      <Button className="absolute bottom-4 right-4 bg-blue-600 hover:bg-blue-700 text-white">
                        Explore
                      </Button>
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.section>
          </main>
        </SidebarInset>
      </SidebarProvider>
    </div>
  )
}

