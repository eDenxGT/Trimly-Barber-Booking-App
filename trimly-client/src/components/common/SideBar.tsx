"use client"

import * as React from "react"
import { Calendar, Home, Users, Scissors, Settings, LogOut, Menu, BarChart3, Clock, User, CalendarDays } from 'lucide-react'
import { FaChair } from "react-icons/fa"
import { MdOutlineRateReview } from "react-icons/md"
import { BiSolidOffer } from "react-icons/bi"

import { UserRole } from "@/types/UserRoles"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarRail,
  SidebarTrigger,
} from "@/components/ui/sidebar"

interface AppSidebarProps {
  userRole: UserRole
  userName: string
  userAvatar?: string
  onLogout: () => void
}

export function AppSidebar({ 
  userRole, 
  userName, 
  userAvatar, 
  onLogout 
}: AppSidebarProps) {
  const nameInitial = userName.charAt(0).toUpperCase()

  const getNavItems = () => {
    const commonItems = [
      {
        title: "Dashboard",
        icon: Home,
        url: "/dashboard",
      },
      {
        title: "Appointments",
        icon: Calendar,
        url: "/appointments",
      },
    ]

    const adminItems = [
      ...commonItems,
      {
        title: "Barbers",
        icon: Scissors,
        url: "/barbers",
      },
      {
        title: "Clients",
        icon: Users,
        url: "/clients",
      },
      {
        title: "Analytics",
        icon: BarChart3,
        url: "/analytics",
        items: [
          {
            title: "Revenue",
            url: "/analytics/revenue",
          },
          {
            title: "Appointments",
            url: "/analytics/appointments",
          },
          {
            title: "Customer Retention",
            url: "/analytics/retention",
          },
        ],
      },
      {
        title: "Services",
        icon: FaChair,
        url: "/services",
      },
      {
        title: "Promotions",
        icon: BiSolidOffer,
        url: "/promotions",
      },
      {
        title: "Settings",
        icon: Settings,
        url: "/settings",
      },
    ]

    const barberItems = [
      ...commonItems,
      {
        title: "My Schedule",
        icon: Clock,
        url: "/schedule",
      },
      {
        title: "My Clients",
        icon: Users,
        url: "/my-clients",
      },
      {
        title: "Reviews",
        icon: MdOutlineRateReview,
        url: "/reviews",
      },
      {
        title: "Settings",
        icon: Settings,
        url: "/settings",
      },
    ]

    const clientItems = [
      ...commonItems,
      {
        title: "Book Appointment",
        icon: CalendarDays,
        url: "/book",
      },
      {
        title: "My Profile",
        icon: User,
        url: "/profile",
      },
      {
        title: "Reviews",
        icon: MdOutlineRateReview,
        url: "/reviews",
      },
    ]

    switch (userRole) {
      case "admin":
        return adminItems
      case "barber":
        return barberItems
      case "client":
        return clientItems
      default:
        return commonItems
    }
  }

  const navItems = getNavItems()

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <div className="flex items-center">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-[var(--yellow)] text-black">
                  <Scissors className="size-4" />
                </div>
                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="font-semibold">BarberBook</span>
                  <span className="text-xs text-muted-foreground capitalize">{userRole}</span>
                </div>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild tooltip={item.title}>
                    <a href={item.url}>
                      {typeof item.icon === 'function' ? (
                        React.createElement(item.icon, { className: "size-4" })
                      ) : (
                        <Menu className="size-4" />
                      )}
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                  
                  {item.items && (
                    <SidebarMenuSub>
                      {item.items.map((subItem) => (
                        <SidebarMenuSubItem key={subItem.title}>
                          <SidebarMenuSubButton asChild>
                            <a href={subItem.url}>{subItem.title}</a>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  )}
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip="Profile">
              <a href="/profile" className="flex items-center">
                <Avatar className="size-6 mr-1">
                  <AvatarImage src={userAvatar} alt={userName} />
                  <AvatarFallback className="bg-[var(--yellow)] text-black">
                    {nameInitial}
                  </AvatarFallback>
                </Avatar>
                <span className="truncate">{userName}</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
          
          <SidebarMenuItem>
            <SidebarMenuButton onClick={onLogout} tooltip="Logout">
              <LogOut className="size-4" />
              <span>Logout</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      
      <SidebarRail />
    </Sidebar>
  )
}
