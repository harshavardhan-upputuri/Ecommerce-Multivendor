import React from 'react'

const SimilarProductCard = () => {
    return (
        <div>
            <div className="group px-4 relative">
                <div className="card" >
                    {/* w-[250px] h-[350px] */}
                    <img className="card-media object-top"   style={{ objectFit: 'cover', objectPosition: 'top' }}  src="https://res.cloudinary.com/dxoqwusir/image/upload/v1727451023/green_1_tm1yuw.jpg" alt='' />
                </div>
                <div className='details pt-3 space-y-1 group-hover-effect rounded-md'>
                    <div className='name'>
                        <h1>Nike</h1>
                        <p>Blue Shirt</p>
                    </div>
                    <div className='price flex items-center gap-3'>
                        <span className="font-sans text-gray-800">
                            ₹ 400
                        </span>
                        <span className="thin-line-through text-gray-400">
                            ₹ 999
                        </span>
                        <span className="text-primary font-semibold">
                            60%
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SimilarProductCard
