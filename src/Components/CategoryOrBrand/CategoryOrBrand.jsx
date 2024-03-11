import React from 'react'

export default function CategoryOrBrand({ image, name, brand }) {
  return (
    <div>
      <img src={image} className={`w-100 object-fit-contain ${brand? "border" : ""}`} height={350} alt={name} />
      <h3 className='mt-3'>{brand? "" : name}</h3>
    </div>
  )
}
