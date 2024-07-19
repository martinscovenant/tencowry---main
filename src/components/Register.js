import React, { useState } from 'react';
import { Navbar, Footer } from './';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

// FontAwesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

const Register = () => {
    const [state, setState] = useState({
        first_name: '',
        last_name: '',
        phone: '',
        email: '',
        password: '',
    });

    const [isRegistered, setIsRegistered] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setState((prevState) => ({ ...prevState, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await registerUser(state);
            setIsRegistered(true);
            setState({
                first_name: '',
                last_name: '',
                phone: '',
                email: '',
                password: '',
            });
        } finally {
            setLoading(false);
        }
    };

    const registerUser = async (userData) => {
        const { first_name, last_name, phone, email, password } = userData;
        const apiKey = "d2db2862682ea1b7618cca9b3180e04e"; 
        const url = 'https://tencowry-api-staging.onrender.com/api/v1/ecommerce/signup/customer';

        console.log('Sending request with data:', userData);

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-access-token': apiKey,
                },
                body: JSON.stringify({
                    first_name,
                    last_name,
                    phone,
                    email,
                    password,
                }),
            });

            const data = await response.json();
            console.log('Response:', data);

            if (response.ok) {
                Swal.fire({
                    title: 'Registration Successful',
                    icon: 'success',
                    toast: true,
                    timer: 1000,
                    position: 'top-right',
                    timerProgressBar: true,
                    showConfirmButton: false,
                });
            } else {
                console.error('Registration failed:', response.status, data);
                Swal.fire({
                    title: '' + (data.message || response.status),
                    icon: 'error',
                    toast: true,
                    timer: 1000,
                    position: 'top-right',
                    timerProgressBar: true,
                    showConfirmButton: false,
                });
            }
        } catch (error) {
            console.error('An error occurred during registration:', error);
            Swal.fire({
                title: 'An Error Occurred',
                icon: 'error',
                toast: true,
                timer: 1000,
                position: 'top-right',
                timerProgressBar: true,
                showConfirmButton: false,
            });
        }
    };

    return (
        <section>
            <Navbar />
            {isRegistered === false ? (
                <div className='w-full flex items-center justify-center bg-slate-100'>
                    <div className='p-6 flex flex-col items-center gap-4 bg-white w-[400px] my-2 shadow-xl'>
                        <h1 className='text-gray-700 font-semibold text-center text-lg lg:text-2xl py'>REGISTER ACCOUNT</h1>
                        <p className='font-semibold text-xs text-center'>
                            If you already have an account with us, please <Link className='text-[#ff5c40]' to='/login'>Login</Link>
                        </p>
                        <div className='w-full h-[1px] bg-gray-400'></div>
                        <form className='w-full flex flex-col gap-2' name='register' onSubmit={handleSubmit}>
                            <div className='w-full my-3 flex flex-col items-start gap-2'>
                                <label htmlFor='first_name' className='flex gap-1 w-full'><span className='text-red-400'>*</span>First Name</label>
                                <input value={state.first_name} onChange={handleChange} id='first_name' name='first_name' className='border border-gray-400 w-full p-2 rounded-md hover:border-blue-400' type="text" />
                            </div>
                            <div className='w-full flex flex-col items-start gap-2'>
                                <label htmlFor='last_name' className='flex gap-1 w-full'><span className='text-red-400'>*</span>Last Name</label>
                                <input value={state.last_name} onChange={handleChange} id='last_name' name='last_name' className='border border-gray-400 w-full p-2 rounded-md hover:border-blue-400' type="text" />
                            </div>
                            <div className='w-full flex flex-col items-start gap-2'>
                                <label htmlFor='phone' className='flex gap-1 w-full'><span className='text-red-400'>*</span>Phone</label>
                                <input value={state.phone} onChange={handleChange} id='phone' name='phone' className='border border-gray-400 w-full p-2 rounded-md hover:border-blue-400' type="text" placeholder='number' />
                            </div>
                            <div className='w-full flex flex-col items-start gap-2'>
                                <label htmlFor='email' className='flex gap-1 w-full'><span className='text-red-400'>*</span>Email</label>
                                <input value={state.email} onChange={handleChange} id='email' name='email' className='border border-gray-400 w-full p-2 rounded-md hover:border-blue-400' type="email" />
                            </div>
                            <div className='w-full flex flex-col items-start gap-2'>
                                <label htmlFor='password' className='flex gap-1 w-full'><span className='text-red-400'>*</span>Password</label>
                                <input value={state.password} onChange={handleChange} id='password' name='password' className='border border-gray-400 w-full p-2 rounded-md hover:border-blue-400' type="password" />
                            </div>
                            <button
                                className={`w-full p-1 rounded-md ${state.email === '' ||
                                    state.first_name === '' ||
                                    state.last_name === '' ||
                                    state.password === '' ||
                                    state.phone === ''
                                    ? 'bg-gray-400'
                                    : 'bg-[#ff5c40]'
                                    } text-white ${loading ? 'bg-[#ff5d4093] cursor-not-allowed' : ''}`}
                                disabled={
                                    state.email === '' ||
                                    state.first_name === '' ||
                                    state.last_name === '' ||
                                    state.password === '' ||
                                    state.phone === '' ||
                                    loading
                                }
                                type="submit"
                            >
                                {loading ? (
                                    <div className='flex items-center justify-center gap-2'>
                                        <FontAwesomeIcon icon={faSpinner} spin />
                                        <p>Submitting</p>
                                    </div>
                                ) : (
                                    'Submit'
                                )}
                            </button>
                        </form>
                    </div>
                </div>
            ) : (
                <div className='show w-full flex items-center justify-center bg-slate-100 py-20'>
                    <div className='flex flex-col items-center text-center gap-4 p-4 shadow-xl bg-white w-[400px]'>
                        <h1 className='text-2xl font-bold text-gray-500'>Your Account Has Been Created!</h1>
                        <p>You can now take advantage of member privileges to enhance your online shopping experience with us.</p>
                        <p>A confirmation has been sent to the provided e-mail address.</p>
                        <p>Please <Link className='text-[#ff5c40]' to='/login'>Login</Link> to continue.</p>
                    </div>
                </div>
            )}
            <Footer />
        </section>
    );
};

export default Register;
