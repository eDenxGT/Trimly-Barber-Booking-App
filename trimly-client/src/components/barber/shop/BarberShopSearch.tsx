"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Search, Plus, MapPin, Star, Filter, X, ChevronDown, Scissors } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
  SheetClose,
} from "@/components/ui/sheet"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Skeleton } from "@/components/ui/skeleton"

// Mock data for shops
const MOCK_SHOPS = [
  {
    id: "1",
    name: "Classic Cuts Barbershop",
    image: "/placeholder.svg?height=200&width=300",
    logo: "/placeholder.svg?height=80&width=80",
    address: "123 Main St, New York, NY",
    rating: 4.8,
    reviewCount: 124,
    status: "verified",
    distance: "0.8 miles",
    amenities: ["Free WiFi", "Walk-ins Welcome", "Card Payment"],
    isAssociated: false,
  },
  {
    id: "2",
    name: "Modern Man Barbers",
    image: "/placeholder.svg?height=200&width=300",
    logo: "/placeholder.svg?height=80&width=80",
    address: "456 Park Ave, Brooklyn, NY",
    rating: 4.5,
    reviewCount: 89,
    status: "verified",
    distance: "1.2 miles",
    amenities: ["Parking", "Appointment Only", "Card Payment"],
    isAssociated: true,
  },
  {
    id: "3",
    name: "The Gentleman's Lounge",
    image: "/placeholder.svg?height=200&width=300",
    logo: "/placeholder.svg?height=80&width=80",
    address: "789 Broadway, Manhattan, NY",
    rating: 4.9,
    reviewCount: 210,
    status: "verified",
    distance: "2.5 miles",
    amenities: ["Free WiFi", "Parking", "Card Payment", "Wheelchair Access"],
    isAssociated: false,
  },
  {
    id: "4",
    name: "Sharp Edge Barbers",
    image: "/placeholder.svg?height=200&width=300",
    logo: "/placeholder.svg?height=80&width=80",
    address: "101 Queens Blvd, Queens, NY",
    rating: 4.2,
    reviewCount: 56,
    status: "pending",
    distance: "3.7 miles",
    amenities: ["Walk-ins Welcome", "Card Payment"],
    isAssociated: false,
  },
  {
    id: "5",
    name: "Urban Cuts & Styles",
    image: "/placeholder.svg?height=200&width=300",
    logo: "/placeholder.svg?height=80&width=80",
    address: "202 Atlantic Ave, Brooklyn, NY",
    rating: 4.7,
    reviewCount: 143,
    status: "verified",
    distance: "1.5 miles",
    amenities: ["Free WiFi", "Parking", "Walk-ins Welcome", "Card Payment"],
    isAssociated: false,
  },
]

// Filter options
const FILTER_OPTIONS = {
  distance: ["Under 1 mile", "Under 3 miles", "Under 5 miles", "Under 10 miles", "Any distance"],
  amenities: ["Free WiFi", "Parking", "Walk-ins Welcome", "Appointment Only", "Card Payment", "Wheelchair Access"],
  status: ["Verified", "Pending", "All"],
}

// Shop card component
interface ShopCardProps {
  shop: (typeof MOCK_SHOPS)[0]
  onJoinRequest: (shopId: string) => void
}

const ShopCard = ({ shop, onJoinRequest }: ShopCardProps) => {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
      <Card className="overflow-hidden h-full flex flex-col">
        <div className="relative h-40">
          <img src={shop.image || "/placeholder.svg"} alt={shop.name} className="w-full h-full object-cover" />
          <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-black/70 to-transparent">
            <div className="flex items-center">
              <div className="h-12 w-12 rounded-full bg-white p-1 mr-3">
                <img
                  src={shop.logo || "/placeholder.svg"}
                  alt={`${shop.name} logo`}
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
              <div>
                <h3 className="font-bold text-white">{shop.name}</h3>
                <div className="flex items-center text-white/90 text-xs">
                  <MapPin className="h-3 w-3 mr-1" />
                  <span>{shop.distance}</span>
                </div>
              </div>
            </div>
          </div>
          <Badge variant={shop.status === "verified" ? "default" : "outline"} className="absolute top-3 right-3">
            {shop.status === "verified" ? "Verified" : "Pending"}
          </Badge>
        </div>
        <CardContent className="flex-grow p-4">
          <div className="flex items-center mb-2">
            <div className="flex items-center">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span className="ml-1 text-sm font-medium">{shop.rating}</span>
            </div>
            <span className="text-xs text-muted-foreground ml-1">({shop.reviewCount} reviews)</span>
            <div className="ml-auto">
              <Badge variant="outline" className="text-xs">
                {shop.distance}
              </Badge>
            </div>
          </div>
          <p className="text-sm text-muted-foreground mb-3 flex items-start">
            <MapPin className="h-4 w-4 mr-1 flex-shrink-0 mt-0.5" />
            <span>{shop.address}</span>
          </p>
          <div className="flex flex-wrap gap-1 mt-2">
            {shop.amenities.slice(0, 3).map((amenity, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {amenity}
              </Badge>
            ))}
            {shop.amenities.length > 3 && (
              <Badge variant="secondary" className="text-xs">
                +{shop.amenities.length - 3} more
              </Badge>
            )}
          </div>
        </CardContent>
        <CardFooter className="p-4 pt-0 mt-auto">
          {shop.isAssociated ? (
            <Button variant="outline" className="w-full" disabled>
              Already Associated
            </Button>
          ) : (
            <Button variant="default" className="w-full" onClick={() => onJoinRequest(shop.id)}>
              Request to Join
            </Button>
          )}
        </CardFooter>
      </Card>
    </motion.div>
  )
}

// Loading skeleton for shop cards
const ShopCardSkeleton = () => (
  <Card className="overflow-hidden h-full">
    <Skeleton className="h-40 w-full" />
    <CardContent className="p-4">
      <div className="flex items-center mb-4">
        <Skeleton className="h-10 w-10 rounded-full" />
        <div className="ml-3 space-y-2">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-3 w-24" />
        </div>
      </div>
      <Skeleton className="h-4 w-full mb-2" />
      <Skeleton className="h-4 w-3/4 mb-4" />
      <div className="flex gap-2">
        <Skeleton className="h-6 w-16" />
        <Skeleton className="h-6 w-16" />
        <Skeleton className="h-6 w-16" />
      </div>
    </CardContent>
    <CardFooter className="p-4 pt-0">
      <Skeleton className="h-10 w-full" />
    </CardFooter>
  </Card>
)

export default function ShopSearchPage() {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [activeFilters, setActiveFilters] = useState({
    distance: "Any distance",
    amenities: [] as string[],
    status: "All",
  })
  const [filteredShops, setFilteredShops] = useState(MOCK_SHOPS)

  // Handle search
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      const results = MOCK_SHOPS.filter(
        (shop) =>
          shop.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          shop.address.toLowerCase().includes(searchTerm.toLowerCase()),
      )
      setFilteredShops(results)
      setIsLoading(false)
    }, 800)
  }

  // Handle filter changes
  const applyFilters = (newFilters: typeof activeFilters) => {
    setIsLoading(true)

    // Simulate API call with filters
    setTimeout(() => {
      // In a real app, you would apply these filters in your API call
      // This is just a simple simulation
      let results = [...MOCK_SHOPS]

      // Filter by status if not "All"
      if (newFilters.status !== "All") {
        results = results.filter((shop) => shop.status.toLowerCase() === newFilters.status.toLowerCase())
      }

      // Filter by amenities if any selected
      if (newFilters.amenities.length > 0) {
        results = results.filter((shop) => newFilters.amenities.some((amenity) => shop.amenities.includes(amenity)))
      }

      // Apply search term if present
      if (searchTerm) {
        results = results.filter(
          (shop) =>
            shop.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            shop.address.toLowerCase().includes(searchTerm.toLowerCase()),
        )
      }

      setFilteredShops(results)
      setActiveFilters(newFilters)
      setIsLoading(false)
    }, 800)
  }

  // Handle join request
  const handleJoinRequest = (shopId: string) => {
    // In a real app, you would send a request to join the shop
    console.log(`Requesting to join shop ${shopId}`)
    // Show success message or open a confirmation dialog
    alert(`Request to join shop ${shopId} sent successfully!`)
  }

  // Handle create shop button click
  const handleCreateShop = () => {
    router.push("/barber/shops/register")
  }

  // Count active filters
  const activeFilterCount = (activeFilters.status !== "All" ? 1 : 0) + activeFilters.amenities.length

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold flex items-center">
            <Scissors className="mr-2 h-8 w-8" />
            Barber Shops
          </h1>
          <p className="text-muted-foreground mt-1">Find and join existing shops or create your own</p>
        </div>
        <Button onClick={handleCreateShop} className="shrink-0">
          <Plus className="mr-2 h-4 w-4" /> Create Shop
        </Button>
      </div>

      <div className="mb-6">
        <form onSubmit={handleSearch} className="flex gap-2">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              type="text"
              placeholder="Search shops by name or location..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button type="submit">Search</Button>

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" className="gap-2">
                <Filter className="h-4 w-4" />
                Filters
                {activeFilterCount > 0 && (
                  <Badge className="ml-1 h-5 w-5 p-0 flex items-center justify-center">{activeFilterCount}</Badge>
                )}
              </Button>
            </SheetTrigger>
            <SheetContent className="w-full sm:max-w-md">
              <SheetHeader>
                <SheetTitle>Filter Shops</SheetTitle>
                <SheetDescription>Refine your search results with these filters</SheetDescription>
              </SheetHeader>

              <div className="py-6 space-y-6">
                <div className="space-y-4">
                  <h3 className="text-sm font-medium">Distance</h3>
                  <Select
                    defaultValue={activeFilters.distance}
                    onValueChange={(value) => {
                      const newFilters = { ...activeFilters, distance: value }
                      applyFilters(newFilters)
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select distance" />
                    </SelectTrigger>
                    <SelectContent>
                      {FILTER_OPTIONS.distance.map((option) => (
                        <SelectItem key={option} value={option}>
                          {option}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="text-sm font-medium">Amenities</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {FILTER_OPTIONS.amenities.map((amenity) => (
                      <div key={amenity} className="flex items-center space-x-2">
                        <Checkbox
                          id={`amenity-${amenity}`}
                          checked={activeFilters.amenities.includes(amenity)}
                          onCheckedChange={(checked) => {
                            const newAmenities = checked
                              ? [...activeFilters.amenities, amenity]
                              : activeFilters.amenities.filter((a) => a !== amenity)

                            const newFilters = { ...activeFilters, amenities: newAmenities }
                            applyFilters(newFilters)
                          }}
                        />
                        <Label htmlFor={`amenity-${amenity}`} className="text-sm">
                          {amenity}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="text-sm font-medium">Status</h3>
                  <Select
                    defaultValue={activeFilters.status}
                    onValueChange={(value) => {
                      const newFilters = { ...activeFilters, status: value }
                      applyFilters(newFilters)
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      {FILTER_OPTIONS.status.map((option) => (
                        <SelectItem key={option} value={option}>
                          {option}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <SheetFooter className="flex flex-row gap-3 sm:justify-between">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => {
                    const defaultFilters = {
                      distance: "Any distance",
                      amenities: [] as string[],
                      status: "All",
                    }
                    applyFilters(defaultFilters)
                  }}
                >
                  Reset Filters
                </Button>
                <SheetClose asChild>
                  <Button className="flex-1">Apply Filters</Button>
                </SheetClose>
              </SheetFooter>
            </SheetContent>
          </Sheet>
        </form>
      </div>

      {/* Active filters display */}
      {activeFilterCount > 0 && (
        <div className="flex flex-wrap gap-2 mb-6">
          {activeFilters.status !== "All" && (
            <Badge variant="secondary" className="flex items-center gap-1">
              Status: {activeFilters.status}
              <X
                className="h-3 w-3 cursor-pointer"
                onClick={() => {
                  const newFilters = { ...activeFilters, status: "All" }
                  applyFilters(newFilters)
                }}
              />
            </Badge>
          )}

          {activeFilters.amenities.map((amenity) => (
            <Badge key={amenity} variant="secondary" className="flex items-center gap-1">
              {amenity}
              <X
                className="h-3 w-3 cursor-pointer"
                onClick={() => {
                  const newAmenities = activeFilters.amenities.filter((a) => a !== amenity)
                  const newFilters = { ...activeFilters, amenities: newAmenities }
                  applyFilters(newFilters)
                }}
              />
            </Badge>
          ))}

          <Button
            variant="ghost"
            size="sm"
            className="h-6 text-xs"
            onClick={() => {
              const defaultFilters = {
                distance: "Any distance",
                amenities: [] as string[],
                status: "All",
              }
              applyFilters(defaultFilters)
            }}
          >
            Clear All
          </Button>
        </div>
      )}

      {/* Results count and sort */}
      <div className="flex justify-between items-center mb-6">
        <p className="text-sm text-muted-foreground">
          {isLoading ? "Searching..." : `${filteredShops.length} shops found`}
        </p>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="gap-1">
              Sort by <ChevronDown className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Sort Options</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>Distance: Nearest First</DropdownMenuItem>
              <DropdownMenuItem>Rating: Highest First</DropdownMenuItem>
              <DropdownMenuItem>Name: A to Z</DropdownMenuItem>
              <DropdownMenuItem>Most Popular</DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Shop grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoading ? (
          Array.from({ length: 6 }).map((_, index) => <ShopCardSkeleton key={index} />)
        ) : filteredShops.length > 0 ? (
          filteredShops.map((shop) => <ShopCard key={shop.id} shop={shop} onJoinRequest={handleJoinRequest} />)
        ) : (
          <div className="col-span-full py-12 text-center">
            <div className="mx-auto w-24 h-24 rounded-full bg-muted flex items-center justify-center mb-4">
              <Search className="h-12 w-12 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-medium mb-2">No shops found</h3>
            <p className="text-muted-foreground mb-6">
              Try adjusting your search or filters to find what you're looking for.
            </p>
            <Button
              onClick={() => {
                setSearchTerm("")
                applyFilters({
                  distance: "Any distance",
                  amenities: [],
                  status: "All",
                })
              }}
            >
              Reset Search
            </Button>
          </div>
        )}
      </div>

      {/* Pagination - would be implemented with real data */}
      {filteredShops.length > 0 && !isLoading && (
        <div className="mt-8 flex justify-center">
          <div className="flex gap-1">
            <Button variant="outline" size="sm" disabled>
              Previous
            </Button>
            <Button variant="outline" size="sm" className="bg-primary text-primary-foreground">
              1
            </Button>
            <Button variant="outline" size="sm">
              2
            </Button>
            <Button variant="outline" size="sm">
              3
            </Button>
            <Button variant="outline" size="sm">
              Next
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}

