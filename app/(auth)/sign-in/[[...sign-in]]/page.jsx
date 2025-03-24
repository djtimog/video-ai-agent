import { SignIn } from '@clerk/nextjs'
import Image from 'next/image'

export default function Page() {
  return (
    <main className='grid grid-cols-1 md:grid-cols-2'>
        <div className='hidden md:block w-full'>
            <Image src="/login.jpg" alt="login" width={500} height={500} className="h-full w-full object-cover" />
        </div>
        <div className='flex items-center justify-center h-screen'>
            <SignIn />
        </div>
    </main>
  )
}