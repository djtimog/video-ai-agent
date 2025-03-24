'use client'
import { db } from '@/configs/db';
import { Users } from '@/configs/schema';
import { useUser } from '@clerk/nextjs'
import { eq } from 'drizzle-orm';
import React, { useEffect } from 'react'

function Provider({children}) {

    const {user} =useUser();

    useEffect(() => {
      user && isNeUser();
    
    }, [user])
    
    const userEmail = user?.emailAddresses[0]?.emailAddress;
    const isNeUser = async() => {
        const result = await db.select().from(Users).where(eq(Users.email,userEmail));

        if(!result[0]){
            await db.insert(Users).values({
                name: user.firstName,
                email: userEmail,
                imageUrl: user.imageUrl,
                subscription: false
            });
        }
    }
  return (
    <div>{children}</div>
  )
}

export default Provider