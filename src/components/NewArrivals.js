import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
// images
import img1 from '../Assets/images/Icons/new.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faHeart } from '@fortawesome/free-solid-svg-icons';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const NewArrivals = () => {
  const [deals, setDeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDeals = async () => {
      const apiKey = "d2db2862682ea1b7618cca9b3180e04e";
      const url = 'https://tencowry-api-staging.onrender.com/api/v1/ecommerce/product/newarrival?skip=0&limit=20';

      try {
        const response = await fetch(url, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'x-access-token': apiKey
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();

        setDeals(data.data || []);
        console.log(deals);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDeals();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!Array.isArray(deals)) {
    return <div>Error: Invalid data format</div>;
  }

  const settings = {
    dots: true,
    infinite: true,
    speed: 3000,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1536,
        settings: { slidesToShow: 5, slidesToScroll: 1 },
      },
      {
        breakpoint: 1024,
        settings: { slidesToShow: 4, slidesToScroll: 1 },
      },
      {
        breakpoint: 768,
        settings: { slidesToShow: 3, slidesToScroll: 1 },
      },
      {
        breakpoint: 480,
        settings: { slidesToShow: 1, slidesToScroll: 1 },
      },
      {
        breakpoint: 320,
        settings: { slidesToShow: 1, slidesToScroll: 1 },
      },
    ],
  };

  return (
    <div className="px-4 mt-12 mb-24 w-full pb-8">
      <div className='w-full flex items-center justify-between border-b-2 border-gray-300'>
        <div className="relative flex items-center gap-2 lg:text-2xl text-xl">
          <img src={img1} className='lg:h-[50px] h-[40px]' alt="new-icon" />
          <h1 className="border-b-2 border-[#ff5c40]">New Arrivals</h1>
        </div>

        <div className='flex items-center text-[#ff5c40] font-medium'>
          <Link to={'/new-arrivals'}>
            View all <FontAwesomeIcon icon={faArrowRight} className='text-black' />
          </Link>
        </div>
      </div>

      <Slider {...settings} className="mySwiper relative mt-8 w-full p-4">
        {deals.map((item) => (
          <div className="swiperItem max:h-[400px] cursor-pointer rounded-lg shadow-lg mb-2 transition ease-in delay-150" key={item.id}>
            <Link to={`/item/${item.productCode}`}>
              <img className="h-[200px] w-full object-cover rounded-t-lg" src={item.main_picture} alt={item.product_name} />
              <FontAwesomeIcon icon={faHeart} title="Add to Favorites" className="FavoriteIcon text-gray-400 text-sm absolute top-2 right-2 hover:text-black" />
              <div className="bg-white p-6 flex flex-col gap-2 rounded-b-lg">
                <h1 className="text-gray-500 font-bold text-sm line-clamp-1">{item.product_name}</h1>
                <div className="flex items-center justify-between font-bold text-sm">
                  <p className="text-gray-500 line-through">
                    ₦{item.product_variants.length > 0 && item.product_variants[0].naira_price}
                  </p>
                  <p className="text-green-400">
                    ₦{item.product_variants.length > 0 && item.product_variants[0].product_rrp_naira}
                  </p>
                  <p className="text-red-400">
                    ₦{item.product_variants.length > 0 && item.product_variants[0].product_discount}
                  </p>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default NewArrivals;
