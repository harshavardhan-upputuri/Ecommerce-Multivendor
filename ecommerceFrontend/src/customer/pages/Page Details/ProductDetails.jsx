import React, { useEffect, useState } from 'react'
import StarIcon from '@mui/icons-material/Star';
import AddIcon from '@mui/icons-material/Add';
import { Button, Divider } from '@mui/material';
import { teal } from '@mui/material/colors';
import { AddShoppingCart, FavoriteBorder, LocalShipping, Remove, Shield, Wallet, WorkspacePremium } from '@mui/icons-material';
import SimilarProduct from './SimilarProduct';
import Review from '../Review/Review';
import ReviewCard from '../Review/ReviewCard';
import { useAppDispatch, useAppSelector } from '../../../State/Store';
import { useParams } from 'react-router-dom';
import { fetchProductById } from '../../../State/customers/ProductSlice';

const ProductDetails = () => {
  const [Quantity, setQuantity] = useState(1);
  const dispatch = useAppDispatch();
  const { productId } = useParams();
  const { product } = useAppSelector(store => store)
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    dispatch(fetchProductById(productId));
  }, [dispatch, productId]);

  const handleActiveImage = (image) => {
    setActiveImage(image)
  }
 
 

  return (
    <div className='px-5 lg:px-20 pt-10'>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <section className="flex flex-col lg:flex-row gap-5">
          <div className="cursor-pointer w-full lg:w-[15%] flex flex-wrap lg:flex-col gap-3">
            {/* 'http://res.cloudinary.com/dxoqwusir/image/upload/v1727451187/SoftSilkZariBanarasiSaree_1_fwms3w.jpg' */}
            {product.product?.images.map((item, index) => <img onClick={() => handleActiveImage(index)} className='w-[50px] lg:w-full rounded-md' src={item} alt="" />)}
          </div>
          <div className="w-full lg:w-[85%]">
            {/* "http://res.cloudinary.com/dxoqwusir/image/upload/v1727451205/SoftSilkZariBanarasiSaree_4_fyohzg.jpg" */}
            <img className='w-full rounded-md' src={product.product?.images[activeImage]} alt="" />
          </div>
        </section>

        <section>
          <h1 className="font-bold text-primary text-lg">{product.product?.seller?.businessDetails.businessName}</h1>
          <p className="text-gray-500 font-semibold">{product.product?.title}</p>

          <div className="flex justify-between items-center py-2 border w-[180px] px-3 mt-5">
            <div className="flex gap-1 items-center">
              <span>4</span>
              <StarIcon sx={{ color: teal[500], fontSize: "17px" }} />
            </div>
            <Divider orientation='vertical' flexItem />
            <span>234 Ratings</span>
          </div>
          <div>
            <div className='price flex items-center gap-3 mt-5 text-2xl'>
              <span className="font-sans text-gray-800">
                ₹ {product.product?.sellingPrice}
              </span>
              <span className="line-through text-gray-400">
                ₹ {product.product?.mrpPrice}
              </span>
              <span className="text-primary font-semibold">
                {product.product?.discountPercent}%
              </span>
            </div>
            <p className='text-sm '>Inclusive of all taxes. Free Shipping above ₹1500</p>
          </div >

          <div className="mt-7 space-y-3">
            <div className="flex items-center gap-4">
              <Shield sx={{ color: teal[500] }} />
              <p>Authentic & Quality Assured</p>
            </div>
            <div className="flex items-center gap-4">
              <WorkspacePremium sx={{ color: teal[500] }} />
              <p>100% money back guarantee</p>
            </div>
            <div className="flex items-center gap-4">
              <LocalShipping sx={{ color: teal[500] }} />
              <p>Free Shipping & Returns</p>
            </div>
            <div className="flex items-center gap-4">
              <Wallet sx={{ color: teal[500] }} />
              <p>Pay on delivery might be available</p>
            </div>
          </div>

          <div className="mt-7 space-y-2">
            <h1>QUANTITY</h1>
            <div className='flex items-center gap-2 w-[140px] justify-between'>
              <Button variant='outlined' disabled={Quantity == 1} onClick={() => setQuantity(Quantity - 1)}>
                <Remove />
              </Button>
              <span>
                {Quantity}
              </span>
              <Button variant='outlined' onClick={() => setQuantity(Quantity + 1)}>
                <AddIcon />
              </Button>
            </div>
          </div>

          <div className="mt-12 flex items-center gap-5">
            <Button fullWidth variant='contained' startIcon={<AddShoppingCart />} sx={{ py: "1rem" }}>
              Add To Bag
            </Button>

            <Button fullWidth variant='outlined' startIcon={<FavoriteBorder />} sx={{ py: "1rem" }}>
              Wishlist
            </Button>
          </div>
          <div className='mt-5'>
            <p>{product.product?.description}</p>
          </div>

          <div className='mt-12 space-y-5'>
            <ReviewCard />
            <Divider />
          </div>

        </section>
      </div>

      <div className='mt-20'>
        <h1 className="text-lg font-bold">
          Similar Products
        </h1>
        <div className="pt-5">
          <SimilarProduct />
        </div>
      </div>
    </div>
  )
}

export default ProductDetails
