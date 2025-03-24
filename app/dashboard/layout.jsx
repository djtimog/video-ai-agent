import React from 'react'
import Header from './_components/Header'
import SideNav from './_components/SideNav'

function DashboardLayout({children}) {
  return (
    <main>
        <div className='hidden md:block h-screen fixed mt-[65px] w-64'>
            <SideNav />
        </div>
        <div>
            <Header />
            <div className='md:ml-64'>
                {children}
            </div>
        </div>
    </main>
  )
}

export default DashboardLayout