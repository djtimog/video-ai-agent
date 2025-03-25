'use client'
import React from 'react'
import SelectTopic from './_components/SelectTopic'
import { useState } from 'react'
import SelectDuration from './_components/SelectDuration'
import { Button } from '@/components/ui/button'
import SelectStyle from './_components/SelectStyle'
import { Video } from 'lucide-react'
function CreateNew() {

  const [formData, setFormData] = useState([])

  const onHandleInputChange = (field, value) => {
    console.log(field, value)

    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }
  return (
    <div className='md:px-10 lg:px-20'>
      <h2 className='font-bold text-4xl text-primary text-center mt-5'>Create New</h2>

      <div className='mt-7 p-10 shadow-md rounded-md'>
        <SelectTopic onUserSelect={onHandleInputChange} />

        <SelectStyle onUserSelect={onHandleInputChange} />

        <SelectDuration onUserSelect={onHandleInputChange}/>

        <Button className={'w-full mt-10'}>Create Video <Video /></Button>
      </div>
    </div>
  )
}

export default CreateNew