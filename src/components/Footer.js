import React from 'react';

// images
import logo from '../Assets/images/logo_3_main.jpeg';

// FontAwesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faHeadset, faEnvelope, faClock } from '@fortawesome/free-solid-svg-icons';

const Footer = () => {
  return (
    <footer>    
      <div className='grid lg:grid-cols-4 lg:px-12 px-8 py-8 bg-white gap-8 lg:gap-0'>
        {/* address */}
        <div className='flex flex-col '>
          <img src={logo} className='h-[50px] w-[100px] object-cover' alt="logo" />
          <div className='flex flex-col items-start gap-4 text-sm text-black'>
            <div className='flex items-start gap-2'>
              <FontAwesomeIcon icon={faMapMarkerAlt} style={{ fontSize: '20px' }} />
              <p>Plot 307, Premier Layout Goshen, Enugu.</p>
            </div>
            <div className='flex items-start gap-2'>
              <FontAwesomeIcon icon={faHeadset} style={{ fontSize: '20px' }} />
              <p>(+234)-818-630-4114</p>
            </div>
            <div className='flex items-start gap-2'>
              <FontAwesomeIcon icon={faEnvelope} style={{ fontSize: '20px' }} />
              <p>info@tencowry.com</p>
            </div>
            <div className='flex items-start gap-2'>
              <FontAwesomeIcon icon={faClock} style={{ fontSize: '20px' }} />
              <p>Open Time: 9:00am - 6:00pm</p>
            </div>
          </div>
        </div>

        {/* information */}
        <div className='flex flex-col items-start justify-around'>
          <h1 className='font-bold border-b-2 border-[#ff5c40]'>INFORMATION</h1>
          <div className='flex flex-col gap-4 mt-2'>
            <a href="" className='cursor-pointer hover:text-[#ff5c40] text-sm'>About Us</a>
            <a href="" className='cursor-pointer hover:text-[#ff5c40] text-sm'>FAQ</a>
            <a href="" className='cursor-pointer hover:text-[#ff5c40] text-sm'>Support 24/7</a>
          </div>
        </div>

        {/* my account */}
        <div className='flex flex-col items-start justify-around'>
          <h1 className='font-bold border-b-2 border-[#ff5c40]'>MY ACCOUNT</h1>
          <div className='flex flex-col gap-4 mt-2'>
            <a href="" className='cursor-pointer hover:text-[#ff5c40] text-sm'>Brands</a>
            <a href="" className='cursor-pointer hover:text-[#ff5c40] text-sm'>Specials</a>
            <a href="" className='cursor-pointer hover:text-[#ff5c40] text-sm'>Affiliates</a>
          </div>
        </div>

        {/* services */}
        <div className='flex flex-col items-start justify-around'>
          <h1 className='font-bold border-b-2 border-[#ff5c40]'>SERVICES</h1>
          <div className='flex flex-col gap-4 mt-2'>
            <a href="" className='cursor-pointer hover:text-[#ff5c40] text-sm'>Contact Us</a>
            <a href="" className='cursor-pointer hover:text-[#ff5c40] text-sm'>Customer Service</a>
            <a href="" className='cursor-pointer hover:text-[#ff5c40] text-sm'>Site Map</a>
          </div>
        </div>

      </div>
      <div className='bg-[#232f3e] text-white w-full p-4 flex items-center justify-center text-center text-sm h-[40px]'> 
        © TenCowry 2024. All Rights Reserved. 
      </div>
    </footer>
  );
}

export default Footer;
