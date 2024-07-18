import React from "react";
import Slider from "react-slick";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faListAlt } from "@fortawesome/free-solid-svg-icons";
import Category from "./Data/Categories";

const Featured = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      { breakpoint: 1536, settings: { slidesToShow: 5 } },
      { breakpoint: 1024, settings: { slidesToShow: 4 } },
      { breakpoint: 768, settings: { slidesToShow: 3 } },
      { breakpoint: 480, settings: { slidesToShow: 1 } },
      { breakpoint: 320, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <div className="px-4 mt-12 mb-18 w-full pb-8">
      <div className="flex items-center gap-2 lg:text-2xl text-xl border-b-2 border-gray-300">
        <FontAwesomeIcon icon={faListAlt} style={{ color: '#ff5c40' }} />
        <h1 className="border-b-2 border-[#ff5c40] font-medium">Featured Categories</h1>
      </div>
      <Slider {...settings} className="mySlider relative mt-2 w-full p-4 px-4">
        {Category.map((item) => (
          <div key={item.id} className="bg-white shadow shadow-xl p-2 rounded-lg mb-2">
            <div className="flex items-center justify-between w-full absolute z-10">
              <div className="rounded-full bg-[#0f3460] px-2 py-1 text-xs text-white">{item.name}</div>
              <div className="rounded-full bg-[#f0f8ff] px-2 py-1 text-xs text-black transform -translate-x-[15px]">{item.orders}</div>
            </div>
            <img className="rounded-lg relative" src={item.image} alt={item.name} />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Featured;
