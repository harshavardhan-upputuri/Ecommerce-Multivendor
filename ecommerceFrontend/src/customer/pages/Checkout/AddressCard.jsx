import { Radio } from '@mui/material'
import React from 'react'

const AddressCard = () => {
    const handleChange=(event)=>{
        
    }
  return (
    <div className='p-5 border rounded-md flex'>
      <div>
        <Radio checked={true} onChange={handleChange} value="" name="radio-button" />

      </div>
      <div className='space-y-3 pt-3'>
        <h1>Harsha</h1>
        <p className='w-[320px]'>Neredmet, Hyderabad, Telanngana -500056</p>
        <p><strong>Mobile :</strong> 9023379136</p>
      </div>
    </div>
  )
}

export default AddressCard
