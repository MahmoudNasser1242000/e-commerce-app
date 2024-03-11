import React from 'react'

export default function PriceAndRate({price, ratingsAverage}) {
    return (
        <div className='d-flex justify-content-between align-items-center py-3'>
            <p className='m-0'>{price} EGP</p>
            <span>{ratingsAverage}⭐</span>
        </div>
    )
}
