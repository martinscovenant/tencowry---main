import React from 'react';
import { Link } from 'react-router-dom';

// FontAwesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faArrowRight } from '@fortawesome/free-solid-svg-icons';

// React Slick
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import TopDealsData from './Data/TopDealsData';
// import TopDealsData from './Data/TopDealsData.json';


const RecentlyViewed = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 3000,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: {
      delay: 3000,
      disableOnInteraction: true,
    },
    nextArrow: <FontAwesomeIcon icon={faArrowRight} className="slick-next" />,
    prevArrow: <FontAwesomeIcon icon={faArrowRight} className="slick-prev" />,
    responsive: [
      { breakpoint: 1536, settings: { slidesToShow: 5, slidesToScroll: 1 } },
      { breakpoint: 1024, settings: { slidesToShow: 4, slidesToScroll: 1 } },
      { breakpoint: 768, settings: { slidesToShow: 3, slidesToScroll: 1 } },
      { breakpoint: 480, settings: { slidesToShow: 1, slidesToScroll: 1 } },
      { breakpoint: 320, settings: { slidesToShow: 1, slidesToScroll: 1 } },
    ],
  };

  return (
    <div className="px-4 mt-12 mb-26 w-full pb-8">
      <div className="w-full flex items-center justify-between border-b-2 border-gray-300">
        <div className="relative flex items-center gap-2 lg:text-2xl text-xl">
          <h1 className="border-b-2 border-[#ff5c40]">Customers Also Viewed</h1>
        </div>
      </div>

      <Slider {...settings} className="mySlider relative mt-8 w-full p-4">
        {TopDealsData.map((item) => (
          <div className="sliderItem max:h-[400px] cursor-pointer rounded-lg shadow-lg mb-2 transition ease-in delay-150" key={item.id}>
            <Link to={`/item/${item.productCode}`}>
              <img className="h-[200px] w-full object-cover rounded-t-lg" src={item.image} alt={item.name} />
              <FontAwesomeIcon icon={faHeart} title="Add to Favorites" className="FavoriteIcon text-gray-400 text-sm absolute top-2 right-2 hover:text-black" />
              <div className="bg-white p-6 flex flex-col gap-2 rounded-b-lg">
                <h1 className="text-gray-500 font-bold text-sm line-clamp-1">{item.name}</h1>
                <div className="flex items-center justify-between font-bold text-sm">
                  <p className="text-gray-500 line-through">{item.formerPrice}</p>
                  <p className="text-green-400">{item.currentPrice}</p>
                  <p className="text-red-400">{item.discountRate}</p>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default RecentlyViewed;
