import { useState, useEffect } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Search, Store } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { debounce } from "lodash"
import { Pagination1 } from "@/components/common/paginations/Pagination1"
import { useToaster } from "@/hooks/ui/useToaster"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"

// Interface based on the provided entity
interface IBarberShopEntity {
  id?: string
  shopId?: string
  name: string
  owner: string
  barbers?: string[]
  paymentMode?: "shop_wallet" | "direct_payment"
  description?: string
  contactNumber?: string
  address: {
    display?: string
    street?: string
    city?: string
    state?: string
    country?: string
    zipCode?: string
    location: {
      latitude: number
      longitude: number
    }
  }
  commissionPercentage?: number
  walletBalance?: number
  barberEarnings?: Record<string, number>
  status: "active" | "pending" | "blocked"
  bannerImage?: string
  logoImage?: string
  daysOpen?: string[]
  openingTime?: string
  closingTime?: string
  amenities: {
    wifi: boolean
    parking: boolean
  }
  createdBy: string
  approvedBy?: string
  createdAt?: Date
  updatedAt?: Date
}

// Mock data for demonstration
const mockBarberShops: IBarberShopEntity[] = [
  {
    id: "1",
    shopId: "SHOP001",
    name: "Elite Cuts Barber Shop",
    owner: "John Smith",
    barbers: ["Barber1", "Barber2", "Barber3"],
    paymentMode: "shop_wallet",
    description: "Premium barber shop offering high-quality haircuts and styling",
    contactNumber: "+1 (555) 123-4567",
    address: {
      display: "123 Main St, New York, NY 10001",
      street: "123 Main St",
      city: "New York",
      state: "NY",
      country: "USA",
      zipCode: "10001",
      location: {
        latitude: 40.7128,
        longitude: -74.006,
      },
    },
    commissionPercentage: 15,
    walletBalance: 2500,
    status: "active",
    logoImage: "/placeholder.svg?height=80&width=80",
    daysOpen: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    openingTime: "09:00",
    closingTime: "19:00",
    amenities: {
      wifi: true,
      parking: true,
    },
    createdBy: "admin",
    createdAt: new Date("2023-01-15"),
    updatedAt: new Date("2023-06-20"),
  },
  {
    id: "2",
    shopId: "SHOP002",
    name: "Modern Grooming",
    owner: "Michael Johnson",
    barbers: ["Barber4", "Barber5"],
    paymentMode: "direct_payment",
    description: "Contemporary barber shop specializing in modern styles",
    contactNumber: "+1 (555) 987-6543",
    address: {
      display: "456 Broadway, New York, NY 10002",
      street: "456 Broadway",
      city: "New York",
      state: "NY",
      country: "USA",
      zipCode: "10002",
      location: {
        latitude: 40.7168,
        longitude: -74.003,
      },
    },
    commissionPercentage: 20,
    walletBalance: 1800,
    status: "active",
    logoImage: "/placeholder.svg?height=80&width=80",
    daysOpen: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    openingTime: "10:00",
    closingTime: "20:00",
    amenities: {
      wifi: true,
      parking: false,
    },
    createdBy: "admin",
    createdAt: new Date("2023-02-10"),
    updatedAt: new Date("2023-07-15"),
  },
  {
    id: "3",
    shopId: "SHOP003",
    name: "Classic Cuts",
    owner: "Robert Williams",
    barbers: ["Barber6", "Barber7", "Barber8", "Barber9"],
    paymentMode: "shop_wallet",
    description: "Traditional barber shop with classic services",
    contactNumber: "+1 (555) 456-7890",
    address: {
      display: "789 5th Ave, New York, NY 10003",
      street: "789 5th Ave",
      city: "New York",
      state: "NY",
      country: "USA",
      zipCode: "10003",
      location: {
        latitude: 40.7308,
        longitude: -73.9973,
      },
    },
    commissionPercentage: 10,
    walletBalance: 3200,
    status: "pending",
    logoImage: "/placeholder.svg?height=80&width=80",
    daysOpen: ["Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
    openingTime: "08:00",
    closingTime: "18:00",
    amenities: {
      wifi: false,
      parking: true,
    },
    createdBy: "admin",
    createdAt: new Date("2023-03-05"),
    updatedAt: new Date("2023-08-10"),
  },
  {
    id: "4",
    shopId: "SHOP004",
    name: "Urban Styles",
    owner: "David Brown",
    barbers: ["Barber10", "Barber11"],
    paymentMode: "direct_payment",
    description: "Urban-themed barber shop for modern styles",
    contactNumber: "+1 (555) 789-0123",
    address: {
      display: "321 Park Ave, New York, NY 10004",
      street: "321 Park Ave",
      city: "New York",
      state: "NY",
      country: "USA",
      zipCode: "10004",
      location: {
        latitude: 40.7418,
        longitude: -73.9901,
      },
    },
    commissionPercentage: 18,
    walletBalance: 1500,
    status: "blocked",
    logoImage: "/placeholder.svg?height=80&width=80",
    daysOpen: ["Monday", "Wednesday", "Friday", "Saturday"],
    openingTime: "11:00",
    closingTime: "21:00",
    amenities: {
      wifi: true,
      parking: true,
    },
    createdBy: "admin",
    createdAt: new Date("2023-04-20"),
    updatedAt: new Date("2023-09-05"),
  },
  {
    id: "5",
    shopId: "SHOP005",
    name: "Gentleman's Corner",
    owner: "James Wilson",
    barbers: ["Barber12", "Barber13", "Barber14"],
    paymentMode: "shop_wallet",
    description: "Upscale barber shop for the modern gentleman",
    contactNumber: "+1 (555) 234-5678",
    address: {
      display: "567 Madison Ave, New York, NY 10005",
      street: "567 Madison Ave",
      city: "New York",
      state: "NY",
      country: "USA",
      zipCode: "10005",
      location: {
        latitude: 40.7528,
        longitude: -73.9765,
      },
    },
    commissionPercentage: 25,
    walletBalance: 4500,
    status: "active",
    logoImage: "/placeholder.svg?height=80&width=80",
    daysOpen: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
    openingTime: "09:30",
    closingTime: "19:30",
    amenities: {
      wifi: true,
      parking: true,
    },
    createdBy: "admin",
    createdAt: new Date("2023-05-15"),
    updatedAt: new Date("2023-10-01"),
  },
]

export  function AdminBarberShopManagement() {
  const [searchQuery, setSearchQuery] = useState("")
  const [debouncedSearch, setDebouncedSearch] = useState(searchQuery)
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedShop, setSelectedShop] = useState<IBarberShopEntity | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const limit = 10
  const { errorToast, successToast } = useToaster()

  // Mock total pages calculation
  const filteredShops = mockBarberShops.filter(
    (shop) =>
      shop.name.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
      shop.owner.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
      shop.shopId?.toLowerCase().includes(debouncedSearch.toLowerCase()),
  )

  const totalPages = Math.ceil(filteredShops.length / limit)

  // Paginated shops
  const paginatedShops = filteredShops.slice((currentPage - 1) * limit, currentPage * limit)

  useEffect(() => {
    const handler = debounce(() => setDebouncedSearch(searchQuery), 300)
    handler()
    return () => handler.cancel()
  }, [searchQuery])

  const handleStatusToggle = (shop: IBarberShopEntity) => {
    // Mock status update
    const newStatus = shop.status === "active" ? "blocked" : "active"
    successToast(`Shop status updated to ${newStatus}`)
  }

  const openDetailsModal = (shop: IBarberShopEntity) => {
    setSelectedShop(shop)
    setIsModalOpen(true)
  }

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-50 text-green-600 hover:bg-green-100 border-green-200"
      case "pending":
        return "bg-yellow-50 text-yellow-600 hover:bg-yellow-100 border-yellow-200"
      case "blocked":
        return "bg-red-50 text-red-600 hover:bg-red-100 border-red-200"
      default:
        return "bg-gray-50 text-gray-600 hover:bg-gray-100 border-gray-200"
    }
  }

  return (
    <div className="min-h-screen mt-14 bg-gray-200">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Barber Shop Management</h1>

        {/* Search Input */}
        <div className="mb-6 flex items-center relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <Input
            type="text"
            placeholder="Search barber shops..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value)
              setCurrentPage(1)
            }}
            className="pl-10 bg-white border border-gray-200 rounded-md"
          />
        </div>

        {/* Barber Shops Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <Table>
            <TableHeader className="bg-gray-50">
              <TableRow>
                <TableHead className="w-12">No.</TableHead>
                <TableHead>Shop</TableHead>
                <TableHead>Owner</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedShops.map((shop, index) => (
                <TableRow key={shop.id} className="hover:bg-gray-50">
                  <TableCell>{(currentPage - 1) * limit + index + 1}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10 bg-gray-200">
                        <AvatarImage src={shop.logoImage} alt={shop.name} />
                        <AvatarFallback>
                          <Store className="h-5 w-5" />
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{shop.name}</p>
                        {shop.shopId && <p className="text-sm text-gray-500">{shop.shopId}</p>}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{shop.owner}</TableCell>
                  <TableCell>{shop.contactNumber || "N/A"}</TableCell>
                  <TableCell>
                    <Button
                      variant="outline"
                      size="sm"
                      className={getStatusBadgeColor(shop.status)}
                      onClick={() => handleStatusToggle(shop)}
                    >
                      {shop.status.charAt(0).toUpperCase() + shop.status.slice(1)}
                    </Button>
                  </TableCell>
                  <TableCell>
                    <Button variant="outline" size="sm" onClick={() => openDetailsModal(shop)}>
                      More Details
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Pagination */}
        <div className="mt-6 flex justify-center items-center">
          <Pagination1
            currentPage={currentPage}
            totalPages={totalPages}
            onPageNext={() => setCurrentPage(currentPage + 1)}
            onPagePrev={() => setCurrentPage(currentPage - 1)}
          />
        </div>

        {/* Details Modal */}
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
            {selectedShop && (
              <>
                <DialogHeader>
                  <DialogTitle className="text-xl flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={selectedShop.logoImage} alt={selectedShop.name} />
                      <AvatarFallback>
                        <Store className="h-4 w-4" />
                      </AvatarFallback>
                    </Avatar>
                    {selectedShop.name}
                  </DialogTitle>
                  <DialogDescription>Shop ID: {selectedShop.shopId}</DialogDescription>
                </DialogHeader>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                  {/* Basic Information */}
                  <Card>
                    <CardContent className="pt-6">
                      <h3 className="text-lg font-semibold mb-4">Basic Information</h3>
                      <div className="space-y-3">
                        <div>
                          <p className="text-sm text-gray-500">Owner</p>
                          <p>{selectedShop.owner}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Status</p>
                          <Badge className={getStatusBadgeColor(selectedShop.status)}>
                            {selectedShop.status.charAt(0).toUpperCase() + selectedShop.status.slice(1)}
                          </Badge>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Contact Number</p>
                          <p>{selectedShop.contactNumber || "N/A"}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Payment Mode</p>
                          <p>{selectedShop.paymentMode === "shop_wallet" ? "Shop Wallet" : "Direct Payment"}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Commission</p>
                          <p>{selectedShop.commissionPercentage}%</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Wallet Balance</p>
                          <p>${selectedShop.walletBalance?.toFixed(2) || "0.00"}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Address Information */}
                  <Card>
                    <CardContent className="pt-6">
                      <h3 className="text-lg font-semibold mb-4">Address</h3>
                      <div className="space-y-3">
                        <div>
                          <p className="text-sm text-gray-500">Display Address</p>
                          <p>{selectedShop.address.display || "N/A"}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Street</p>
                          <p>{selectedShop.address.street || "N/A"}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">City</p>
                          <p>{selectedShop.address.city || "N/A"}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">State</p>
                          <p>{selectedShop.address.state || "N/A"}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Country</p>
                          <p>{selectedShop.address.country || "N/A"}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Zip Code</p>
                          <p>{selectedShop.address.zipCode || "N/A"}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Business Hours */}
                  <Card>
                    <CardContent className="pt-6">
                      <h3 className="text-lg font-semibold mb-4">Business Hours</h3>
                      <div className="space-y-3">
                        <div>
                          <p className="text-sm text-gray-500">Days Open</p>
                          <p>{selectedShop.daysOpen?.join(", ") || "N/A"}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Opening Time</p>
                          <p>{selectedShop.openingTime || "N/A"}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Closing Time</p>
                          <p>{selectedShop.closingTime || "N/A"}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Amenities & Other Details */}
                  <Card>
                    <CardContent className="pt-6">
                      <h3 className="text-lg font-semibold mb-4">Amenities & Other Details</h3>
                      <div className="space-y-3">
                        <div>
                          <p className="text-sm text-gray-500">Amenities</p>
                          <div className="flex gap-2 mt-1">
                            {selectedShop.amenities.wifi && <Badge variant="outline">WiFi</Badge>}
                            {selectedShop.amenities.parking && <Badge variant="outline">Parking</Badge>}
                          </div>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Description</p>
                          <p>{selectedShop.description || "N/A"}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Created By</p>
                          <p>{selectedShop.createdBy}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Created At</p>
                          <p>{selectedShop.createdAt?.toLocaleDateString()}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Last Updated</p>
                          <p>{selectedShop.updatedAt?.toLocaleDateString()}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Barbers Section */}
                <div className="mt-6">
                  <h3 className="text-lg font-semibold mb-4">Barbers</h3>
                  <div className="bg-gray-50 p-4 rounded-md">
                    {selectedShop.barbers && selectedShop.barbers.length > 0 ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                        {selectedShop.barbers.map((barber, index) => (
                          <div key={index} className="flex items-center gap-2 p-2 bg-white rounded-md border">
                            <Avatar className="h-8 w-8">
                              <AvatarFallback>{barber.substring(0, 2).toUpperCase()}</AvatarFallback>
                            </Avatar>
                            <span>{barber}</span>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray-500">No barbers assigned to this shop</p>
                    )}
                  </div>
                </div>

                <DialogFooter className="mt-6">
                  <Button variant="outline" onClick={() => setIsModalOpen(false)}>
                    Close
                  </Button>
                </DialogFooter>
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}

