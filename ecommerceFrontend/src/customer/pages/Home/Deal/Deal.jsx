import React from 'react'
import DealCard from './DealCard'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { useAppSelector } from '../../../../State/Store';

const Deal = () => {
  const {home}=useAppSelector(store=>store);
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 5
  };

  return (
    <div className='py-5 lg:px-20'>
      <Slider {...settings}>
        {home.homePageData?.deals.map((item, index) => (
          <DealCard key={index} item={item} />
        ))}
      </Slider>
    </div>
  );
};

export default Deal;
