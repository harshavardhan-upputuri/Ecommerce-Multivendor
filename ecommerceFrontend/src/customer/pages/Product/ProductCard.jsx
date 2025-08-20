import React, { useEffect, useState } from 'react'
import "./ProductCard.css"
import { Button } from '@mui/material';
import { Favorite, ModeComment } from '@mui/icons-material';
import { teal } from '@mui/material/colors';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../../State/Store';
import { addProductToWishlist } from '../../../State/customers/wishListSlice';

// const images = [
//   "https://res.cloudinary.com/dxoqwusir/image/upload/v1727460133/4QdHw1UN_f8db19fa1b1947689b2cc1f461b25b14_fc2y1j.jpg",
//   "https://res.cloudinary.com/dxoqwusir/image/upload/v1727460139/6ip1jSbB_f6fe477ff55a4f9fa3f929f3c2d28ad9_ikswnv.jpg",
//   "https://res.cloudinary.com/dxoqwusir/image/upload/v1727446516/banarasi-saree_1_gyfb6t.jpg",
//   "https://res.cloudinary.com/dxoqwusir/image/upload/v1727446528/banarasi-saree_3_a4orxn.webp",
//   "https://res.cloudinary.com/dxoqwusir/image/upload/v1727446522/banarasi-saree_2_cb80fp.webp"
// ]
const ProductCard = ({item}) => {
  const [currentImage, setCurrentImage] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();
  const dispatch=useAppDispatch();


  useEffect(() => {
    let interval;
    if (isHovered) {
      interval = setInterval(() => {
        setCurrentImage((prevImage) => (prevImage + 1) % item.images.length);
      }, 1000);
    } else if (interval) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);

  }, [isHovered]);

  const handleWishlist=(e)=>{
    e.stopPropagation()
    item.id && dispatch(addProductToWishlist({productId:item.id}))
  }

  return (
    <>
      <div onClick={()=>navigate(`/product-details/${item.category?.categoryId}/${item.title}/${item.id}`)} className="group px-4 relative">
        <div className="card" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
          {item.images.map((item, index) => <img key={index} className="card-media object-top" style={{ transform: `translateX(${(index - currentImage) * 100}%)` }} src={item} alt='' />)}

          {isHovered && <div className='indicator flex flex-col items-center space-y-2'>
            <div className='flex gap-3'>
              <Button onClick={(e)=> handleWishlist(e)} variant='contained' color='secondary'>
                <Favorite sx={{ color: teal[500] }} />
              </Button>
              <Button variant='contained' color='secondary'>
                <ModeComment sx={{ color: teal[500] }} />
              </Button>
            </div>
          </div>
          }


        </div>
        <div className='details pt-3 space-y-1 group-hover-effect rounded-md'>
          <div className='name'>
            <h1>{item.seller?.businessDetails.businessName}</h1>
            <p>{item.title}</p>
          </div>
          <div className='price flex items-center gap-3'>
            <span className="font-sans text-gray-800">
              ₹ {item.sellingPrice}
            </span>
            <span className="thin-line-through text-gray-400">
              ₹ {item.mrpPrice}
            </span>
            <span className="text-primary font-semibold">
              {item.discountPercent}%
            </span>
          </div>
        </div>
      </div>
      
    </>
  )
}

export default ProductCard
