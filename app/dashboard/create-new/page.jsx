'use client'
import React from 'react'
import SelectTopic from './_components/SelectTopic'
import { useState } from 'react'
function CreateNew() {

  const [formData, setFormData] = useState({
    topic: '',
    type: '',
    description: '',
    title: '',
    tags: [],
  })

  const onHandleInputChange = (field, value) => {
    console.log(field, value)
  }
  return (
    <div className='md:px-20'>
      <h2 className='font-bold text-4xl text-primary text-center mt-5'>Create New</h2>

      <div className='mx-2 mt-10 p-10 shadow-md rounded-md'>
        <SelectTopic onUserSelect={onHandleInputChange} />


      </div>
    </div>
  )
}

export default CreateNew