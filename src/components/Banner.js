import React from 'react';
import slider1 from '../Assets/images/slider-1.webp';
import slider2 from '../Assets/images/slide-2.webp';
import slider3 from '../Assets/images/slide-3.webp';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

// Font Awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTruck, faHeadset, faCreditCard, faTag } from '@fortawesome/free-solid-svg-icons';

const Banner = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <div>
      {/* slider */}
      <Slider {...settings} className="mySlider w-full lg:h-[80vh] h-[200px] m-2 mx-8">
        <div>
          <img className='h-full w-full object-cover' src={slider1} alt="slider-1" />
        </div>
        <div>
          <img className='h-full w-full object-cover' src={slider2} alt="slider-2" />
        </div>
        <div>
          <img className='h-full w-full object-cover' src={slider3} alt="slider-3" />
        </div>
      </Slider>

      {/* features */}
      <div className='lg:grid hidden lg:grid-cols-4 gap-8 items-start m-4 border-2 border-gray-300 lg:px-14 lg:p-10 p-6 '>
        <div className='w-full flex items-center  justify-start gap-6 lg:border-r-2 border-gray-300'>
          <div>
            <FontAwesomeIcon icon={faTruck} style={{ color: '#ff5c40', fontSize: '36px' }} />
          </div>
          <div className='flex flex-col'>
            <h1 className='font-bold hover:text-[#ff5c40] ease cursor-pointer'>AFFORDABLE DELIVERY</h1>
            <p className='text-gray-400 text-sm'>From ₦2000 </p>
          </div>
        </div>
        <div className='w-full flex items-center justify-start gap-6 lg:border-r-2 border-gray-300'>
          <div>
            <FontAwesomeIcon icon={faHeadset} style={{ color: '#ff5c40', fontSize: '36px' }} />
          </div>
          <div className='flex flex-col'>
            <h1 className='font-bold hover:text-[#ff5c40] cursor-pointer'>SUPPORT 24/7</h1>
            <p className='text-gray-400 text-sm'>Online 24 Hours</p>
          </div>
        </div>
        <div className='w-full flex items-center justify-start gap-6 lg:border-r-2 border-gray-300'>
          <div>
            <FontAwesomeIcon icon={faCreditCard} style={{ color: '#ff5c40', fontSize: '36px' }} />
          </div>
          <div className='flex flex-col'>
            <h1 className='font-bold hover:text-[#ff5c40] cursor-pointer'>PAYMENT METHOD</h1>
            <p className='text-gray-400 text-sm'>Secure Payment</p>
          </div>
        </div>
        <div className='w-full flex items-center justify-start gap-6 '>
          <div>
            <FontAwesomeIcon icon={faTag} style={{ color: '#ff5c40', fontSize: '36px' }} />
          </div>
          <div className='flex flex-col'>
            <h1 className='font-bold hover:text-[#ff5c40] cursor-pointer'>BIG DISCOUNT</h1>
            <p className='text-gray-400 text-sm'>Every Weekend</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
