"use client";

import * as React from "react";
import {
  Film,
  Flag,
  PieChart,
} from "lucide-react";

import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import { Header } from "@/components/nav-header";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";

// This is sample data.
const data = {
  user: {
    name: "Yazid Kurdi",
    email: "yazidkurdi@gmail.com",
    avatar: "/next.svg",
  },
  navMain: [
    {
      name: "Movies",
      url: "/movies",
      icon: Film,
    },
    {
      name: "Leaderboards",
      url: "/leaderboards",
      icon: Flag,
    },
    {
      name: "Analytics",
      url: "/analytics",
      icon: PieChart,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <Header />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
