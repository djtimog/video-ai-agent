import {
  CircleUserIcon,
  FileVideo,
  PanelsTopLeft,
  ShieldPlus,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { usePathname } from "next/navigation";

// Menu items.
const MenuOption = [
  {
    id: 1,
    name: "Dashboard",
    icon: PanelsTopLeft,
    path: "/dashboard",
  },
  {
    id: 2,
    name: "Create New",
    icon: FileVideo,
    path: "/dashboard/create-new",
  },
  {
    id: 3,
    name: "Upgrade",
    icon: ShieldPlus,
    path: "/upgrade",
  },
  {
    id: 4,
    name: "Account",
    icon: CircleUserIcon,
    path: "/account",
  },
];

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel
            className={"text-xl font-bold mt-3 mb-10 text-center w-full"}
          >
            Video AI Agent
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className={"space-y-5"}>
              {MenuOption.map((item) => (
                <SidebarMenuItem
                  key={item.id}
                  
                >
                  <SidebarMenuButton className={`hover:bg-primary hover:text-white cursor-pointer rounded-sm ${
                    pathname === item.path && "bg-primary text-white"
                  }`} asChild>
                    <Link href={item.path}>
                      <div className={`flex items-center gap-3 w-full p-3`}>
                        <item.icon />
                        <h2>{item.name}</h2>
                      </div>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
