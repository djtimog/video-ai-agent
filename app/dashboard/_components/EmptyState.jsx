import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'

function EmptyState() {
  return (
    <div className='p-5 py-24 flex flex-col items-center justify-center mt-10 mx-5 border-2 border-dashed border-primary rounded-lg'>
        <h2>You don't have any video created</h2>
        <Link href="/dashboard/create-new">
            <Button className='mt-3'>
                Create New Video
            </Button>
        </Link>
    </div>
  )
}

export default EmptyState