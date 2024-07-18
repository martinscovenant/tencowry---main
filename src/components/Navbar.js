import * as React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import NavItems from './Data/NavItems';
import RegisterSeller from './RegisterSeller';
import logo from '../Assets/images/logo_2_main.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faShoppingCart, faBars, faTimes, faChevronDown } from '@fortawesome/free-solid-svg-icons';

const Navbar = (props) => {
  const { window } = props;
  const [open, setOpen] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [seller, setSeller] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const toggleDropdown = () => {
    setOpen((prevState) => !prevState);
  };

  const toggleSeller = () => {
    setSeller((prevState) => !prevState);
  };

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('https://tencowry-api-staging.onrender.com/api/v1/ecommerce/product/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': "d2db2862682ea1b7618cca9b3180e04e"
        },
        body: JSON.stringify({ query })
      });

      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await response.json();
      setResults(data.data || []);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const container = window !== undefined ? () => window().document.body : undefined;

  const drawer = (
    <div className='h-[100vh] flex flex-col items-start justify-center gap'>
      <button onClick={handleDrawerToggle} className='drawer-close-btn mx-8'>
        <FontAwesomeIcon icon={faTimes} />
      </button>
      <div onClick={handleDrawerToggle} className='w-full'>
        <ul className='w-full'>
          {NavItems.map((item) => (
            <li key={item.id} className='w-full text-center my-2'>
              <Link className='w-full' to={item.link}>
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );

  return (
    <div className='sticky top-0 z-10 bg-[#232f3e] h-[200px] w-full flex flex-col items-center lg:justify-around justify-evenly text-white text-sm'>
      {/* first layer */}
      <div className='flex lg:px-6 px-4 lg:pt-2 items-center justify-between w-full '>
        <div className='flex items-center gap-2 '>
          <p className='font-extra text-green-300'>Welcome to TenCowry!</p>
          <div className='flex items-center gap-1'>
            <Link className='text-[#ff5c40]' to='/login'>Login</Link>
            <span>or</span>
            <Link className='text-[#ff5c40]' to='/register'>Register</Link>
          </div>
        </div>
        <div className='flex items-center gap-3'>
          <button className='text-small' onClick={toggleSeller} style={{ background: '#ff5c40', color: 'white', display: 'none' }}>BECOME A SELLER</button>
          <a href="/">₦ Naira</a>
          <a className='lg:block hidden' href="/">English</a>
        </div>
      </div>

      {/* second layer */}
      <div className='grid lg:grid-cols-3 grid-cols-2 w-full lg:px-8 px-4'>
        <div className=' flex items-center justify-space-end'>
          <Link to='/'>
            <img className='h-[60px] cursor-pointer ' src={logo} alt="logo" />
          </Link>
        </div>
        <form onSubmit={handleSearch} className='lg:flex items-center justify-center hidden'>
          <input value={query} onChange={handleInputChange} className='border-0 p-3 w-full bg-white text-black rounded-l-lg' type="text" placeholder='enter full word e.g women not wom' />
          <button type='submit' className="searchBar" style={{ background: '#ff5c40', borderRadius: '0 8px 8px 0', padding: '12px' }}>
            <FontAwesomeIcon icon={faSearch} style={{ color: 'white' }} />
          </button>
          {loading && <p>Loading...</p>}
        </form>
        <div className=' flex items-center justify-end'>
          <Link to='/Cart'>
            <button>
              <FontAwesomeIcon icon={faShoppingCart} style={{ color: 'white' }} />
            </button>
          </Link>
        </div>
      </div>

      {/* third layer */}
      <div className='flex items-center w-full h-[50px]'>
        <button className='drawer-open-btn' onClick={handleDrawerToggle} style={{ background: 'white' }}>
          <FontAwesomeIcon icon={faBars} style={{ color: 'black' }} />
        </button>
        <div>
          <div onClick={toggleDropdown} className='flex items-center gap-2 cursor-pointer p-2 bg-[#ff5c40] text-sm'>
            <FontAwesomeIcon icon={faBars} />
            <p className='text-small'>ALL CATEGORIES</p>
            <FontAwesomeIcon icon={faChevronDown} />
          </div>
          <div className="dropdown relative">
            <ul className={open ? `hidden` : `block`} style={{ width: '100%', position: 'absolute' }}>
              <li className="flex flex-col bg-white text-black rounded">
                <button className='drawer-item' style={{ textAlign: 'center', width: '100%', marginTop: '6px' }}>
                  <a href="/">Juweris</a>
                </button>
                <button className='drawer-item' style={{ textAlign: 'center', width: '100%', marginTop: '6px' }}>
                  <a href="/">Men cloths</a>
                </button>
                <button className='drawer-item' style={{ textAlign: 'center', width: '100%', marginTop: '6px' }}>
                  <a href="/">Women cloths</a>
                </button>
                <button className='drawer-item' style={{ textAlign: 'center', width: '100%', marginTop: '6px' }}>
                  <a href="/">Boys cloths</a>
                </button>
                <button className='drawer-item' style={{ textAlign: 'center', width: '100%', marginTop: '6px' }}>
                  <a href="/">Girls cloths</a>
                </button>
                <button className='drawer-item' style={{ textAlign: 'center', width: '100%', marginTop: '6px' }}>
                  <a href="/">Electronics</a>
                </button>
              </li>
            </ul>
          </div>
        </div>
        <div className="gap-6 text-gray-300" style={{ display: 'flex' }}>
          {NavItems.map((item) => (
            <Link className='nav-item' to={item.link} key={item.id}>{item.name}</Link>
          ))}
        </div>
      </div>
      {seller && (
        <section className=' absolute top-40  w-full flex justify-center'>
          <RegisterSeller toggleSeller={toggleSeller} />
        </section>
      )}
    </div>
  );
};

export default Navbar;
