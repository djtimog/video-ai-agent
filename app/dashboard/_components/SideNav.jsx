'use client'
import { CircleUserIcon, FileVideo, PanelsTopLeft, ShieldPlus } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

function SideNav() {

    const MenuOption =[
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
        }
 
    ]

    const pathname = usePathname();

  return (
    <div className='w-64 h-screen shadow-md p-5'>
        <div className='grid gap-3'>
            {
                MenuOption.map((item, index)=>(
                    <Link href={item.path} key={index}>
                        <div className={`flex items-center gap-3 p-3 hover:bg-primary hover:text-white cursor-pointer ${pathname === item.path ? "bg-primary text-white" : ""}`}>
                            <item.icon />
                            <h2>{item.name}</h2>
                        </div>
                    </Link>
                ))
            }
        </div>
    </div>
  )
}

export default SideNav