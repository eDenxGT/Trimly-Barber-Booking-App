"use client"

import * as React from "react"
import { MapPin, Bell, Search, Settings2 } from "lucide-react"
import { motion } from "framer-motion"
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { FaScissors } from "react-icons/fa"

// Sample search data
const searchItems = [
  {
    category: "Barbers",
    items: [
      { id: 1, name: "Classic Cuts Barbershop", type: "barber", rating: 4.8 },
      { id: 2, name: "Modern Style Studio", type: "barber", rating: 4.9 },
      { id: 3, name: "Vintage Barbers", type: "barber", rating: 4.7 },
    ],
  },
  {
    category: "Services",
    items: [
      { id: 4, name: "Haircut", type: "service", price: "$30" },
      { id: 5, name: "Beard Trim", type: "service", price: "$20" },
      { id: 6, name: "Hair Coloring", type: "service", price: "$50" },
    ],
  },
]

interface AppHeaderProps {
  userName: string
  userLocation: string
  userAvatar?: string
  notifications?: number
}

export function AppHeader({
  userName = "Aaron Ramsdale",
  userLocation = "California, US",
  userAvatar = "",
  notifications = 2,
}: AppHeaderProps) {
  const [open, setOpen] = React.useState(false)
  const [searchQuery, setSearchQuery] = React.useState("")

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }
    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="sticky top-0 z-50 w-full border-b bg-[#121212] shadow-sm"
    >
      <div className="container flex h-16 items-center px-4">
        {/* Logo */}
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.3 }}
          className="mr-8 flex items-center space-x-2"
        >
          <FaScissors className="h-8 w-8 text-white" />
          <span className="text-xl font-bold text-white">Trimly</span>
        </motion.div>

        {/* Search */}
        <div className="flex flex-1 items-center justify-center">
          <motion.div
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.3 }}
            className="w-full max-w-2xl"
          >
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              onClick={() => setOpen(true)}
              className="w-full justify-between bg-[#1e1e1e] text-white border-0 hover:bg-[#2a2a2a]"
            >
              <div className="flex items-center">
                <Search className="mr-2 h-4 w-4" />
                <span className="text-muted-foreground">Search barbers or services...</span>
              </div>
              <kbd className="pointer-events-none hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
                <span className="text-xs">⌘</span>K
              </kbd>
            </Button>
            <CommandDialog open={open} onOpenChange={setOpen}>
              <Command className="rounded-lg border shadow-md">
                <CommandInput placeholder="Type to search..." />
                <CommandList>
                  <CommandEmpty>No results found.</CommandEmpty>
                  {searchItems.map((group) => (
                    <CommandGroup key={group.category} heading={group.category}>
                      {group.items.map((item) => (
                        <CommandItem
                          key={item.id}
                          onSelect={() => {
                            setSearchQuery(item.name)
                            setOpen(false)
                          }}
                        >
                          <div className="flex items-center justify-between w-full">
                            <span>{item.name}</span>
                            {item.type === "barber" ? (
                              <Badge variant="secondary">⭐ {item.rating}</Badge>
                            ) : (
                              <Badge variant="outline">{item.price}</Badge>
                            )}
                          </div>
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  ))}
                </CommandList>
              </Command>
            </CommandDialog>
          </motion.div>
        </div>

        {/* Right Section */}
        <motion.div
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.3 }}
          className="ml-8 flex items-center space-x-6"
        >
          {/* Settings */}
          <Button variant="ghost" size="icon" className="text-white hover:bg-[#2a2a2a]">
            <Settings2 className="h-5 w-5" />
          </Button>

          {/* User Info */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="flex flex-col items-end">
              <span className="text-sm font-medium text-white">Hi, {userName}</span>
              <div className="flex items-center text-xs text-gray-400">
                <MapPin className="mr-1 h-3 w-3" />
                {userLocation}
              </div>
            </div>
          </div>

          {/* Notifications */}
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="ghost" size="icon" className="relative text-white hover:bg-[#2a2a2a]">
                <Bell className="h-5 w-5" />
                {notifications > 0 && (
                  <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-red-500 text-[10px] font-medium text-white flex items-center justify-center">
                    {notifications}
                  </span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80" align="end">
              <div className="space-y-2">
                <h4 className="font-medium leading-none">Notifications</h4>
                <p className="text-sm text-muted-foreground">You have {notifications} unread notifications.</p>
                <div className="border-t pt-2 mt-2">
                  {/* Sample notifications */}
                  <div className="flex items-start space-x-2 mb-2">
                    <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center text-white">
                      <FaScissors className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Appointment Reminder</p>
                      <p className="text-xs text-muted-foreground">Your haircut appointment is in 2 hours</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-2">
                    <div className="h-8 w-8 rounded-full bg-green-500 flex items-center justify-center text-white">
                      <MapPin className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">New Barber Nearby</p>
                      <p className="text-xs text-muted-foreground">Classic Cuts opened near you</p>
                    </div>
                  </div>
                </div>
              </div>
            </PopoverContent>
          </Popover>

          {/* Avatar */}
          <Avatar className="h-8 w-8 cursor-pointer">
            <AvatarImage src={userAvatar} alt={userName} />
            <AvatarFallback className="bg-[var(--yellow)] text-black">
              {userName
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
        </motion.div>
      </div>
    </motion.header>
  )
}

