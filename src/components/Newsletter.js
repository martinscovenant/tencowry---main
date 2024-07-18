import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle, faFacebook, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons'

const Newsletter = () => {
  return (
    <div className='grid lg:grid-cols-3 bg-[#232f3e] p-8 text-white gap-4'>
      <div className='lg:flex hidden items-center gap-4'>
        <FontAwesomeIcon icon={faPaperPlane} size="2x" className='transform -rotate-45' />
        <div className='flex flex-col items-start gap-2'>
          <h1 className='text-2xl font-bold'>Signup For Newsletter</h1>
          <p className=' text-gray-300'>We’ll never share your email address with a third-party.</p>
        </div>
      </div>
      <div className='flex items-center justify-center '>
        <input className='border border-[#ff5c40] p-2 w-full bg-white text-black rounded-l-lg' type="email" placeholder='Your email address....' />
        <div className='bg-[#ff5c40] rounded-r-lg p-2 border border-[#ff5c40] text-white'> Subscribe </div>
      </div>
      <div className='flex items-center justify-center gap-4 w-full'>
        <div className='newsIcon h-[40px] w-[40px] rounded-full flex items-center justify-center'>
          <FontAwesomeIcon icon={faGoogle} />
        </div>
        <div className='newsIcon h-[40px] w-[40px] rounded-full flex items-center justify-center'>
          <FontAwesomeIcon icon={faFacebook} />
        </div>
        <div className='newsIcon h-[40px] w-[40px] rounded-full flex items-center justify-center'>
          <FontAwesomeIcon icon={faTwitter} />
        </div>
        <div className='newsIcon h-[40px] w-[40px] rounded-full flex items-center justify-center'>
          <FontAwesomeIcon icon={faInstagram} />
        </div>
      </div>
    </div>
  );
}

export default Newsletter;
