import { Button } from '@/components/ui/button'
import { UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import React from 'react'

function Header() {
  return (
    <div className='px-5 py-3 flex items-center justify-between shadow-md'>
        <div >
            <Image src={"/video-ai-logo.png"} alt="logo" width={150} height={50} />
        </div>
        <div className='flex items-center gap-5'>
            <Button>
                Dashboard
            </Button>
            <UserButton />
        </div>
    </div>
  )
}

export default Header