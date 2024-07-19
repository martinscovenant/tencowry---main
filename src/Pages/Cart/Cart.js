
import React, { useState, useContext } from 'react';
import { Navbar, Footer } from '../../components';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faPlus, faMinus, faTimes } from '@fortawesome/free-solid-svg-icons';
import placeholderImage from '../../Assets/images/home-placeholder.jpeg';
import { CartContext } from '../ItemDetails/ItemDetails';
import cartIcon from '../../Assets/images/cartbg1.jpg';

const Cart = () => {
    const { cart, setCart } = useContext(CartContext);
    const [count, setCount] = useState(0);
    const [deletedItem, setDeletedItem] = useState(null);
    const token = localStorage.getItem("authTokens");
    let email = '';

    if (token) {
        try {
            const parsedToken = JSON.parse(token);
            email = parsedToken.data.email;
        } catch (error) {
            console.error("Error parsing token:", error.message);
        }
    }

    const toggleDelete = (item) => {
        setDeletedItem(item);
    };

    const deleteItemFromCart = async (item) => {
        const apiKey = 'd2db2862682ea1b7618cca9b3180e04e';

        const url = `https://tencowry-api-staging.onrender.com/api/v1/ecommerce/cart/record/${email}`;
        const payload = {
            product_sku: item.product_sku,
        };

        try {
            const response = await fetch(url, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'x-access-token': apiKey,
                },
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error('Error response:', errorData);
                alert(`Error: ${errorData.message}`);
                throw new Error('Failed to delete item from cart');
            }

            Swal.fire({
                title: 'Item deleted from cart',
                icon: 'success',
                toast: true,
                timer: 1000,
                position: 'top-right',
                timerProgressBar: true,
                showConfirmButton: false,
            });

            // Update local storage and context state
            const updatedCart = cart.filter((cartItem) => cartItem.product_sku !== item.product_sku);
            setCart(updatedCart);
            localStorage.setItem('cart', JSON.stringify(updatedCart));
        } catch (error) {
            console.error('Error deleting item from cart:', error);
        } finally {
            setDeletedItem(null);
        }
    };

    const handleIncrement = () => {
        if (cart && cart.length > 0 && cart[0].product_variants && count < cart[0].product_variants[0].stock_quantity) {
            setCount(count + 1);
        }
    };

    const handleDecrement = () => {
        if (count > 0) {
            setCount(count - 1);
        }
    };

    const totalAmount = cart.reduce((acc, item) => acc + (item.naira_price * item.quantity), 0);

    return (
        <div>
            <section className='relative'>
                <Navbar />

                {cart.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-screen">
                        <img src={cartIcon} alt="Empty Cart" className="w-48 h-48 mb-4"/>
                        <h1 className="text-2xl text-gray-500">Your cart is empty</h1>
                        <Link to='/' className='mt-4 p-2 text-sm border border-gray-500 rounded-md hover:text-blue-400 hover:border-blue-400'>
                            Continue Shopping
                        </Link>
                    </div>
                ) : (
                    <div className='bg-[#f2f2f2] p-4'>
                        {/* header */}
                        <div className='w-full p-3 flex items-center justify-between mb-2'>
                            <h1 className='text-gray-500 lg:text-3xl'>Shopping Cart</h1>
                            <Link to='/' className='p-2 text-sm border border-gray-500 rounded-md hover:text-blue-400 hover:border-blue-400'>
                                Continue Shopping
                            </Link>
                        </div>
                        <hr />

                        <div className='flex lg:flex-row flex-col w-full items-start mt-8 gap-4 lg:gap-32'>
                            {/* order details */}
                            <div className='lg:w-2/3  flex flex-col '>
                                {cart.map((item) => (
                                    <div
                                        key={item.product_key}
                                        className='w-full bg-white text-sm shadow-xl gap-2 h-max lg:h-[200px] mb-8 rounded-md p-6 flex flex-col items-start justify-between'
                                    >
                                        <div className='w-full flex lg:flex-row md:flex-col flex-col justify-between items-start gap-4 lg:gap-8'>
                                            <img
                                                className='h-[100px] w-[100px] object-cover'
                                                src={item.main_picture ? item.main_picture : placeholderImage}
                                                alt={item.product_name || 'No image available'}
                                            />
                                            {/* product details */}
                                            <div className='flex flex-col gap-3 items-start'>
                                                <h1 className='text-gray-500'>{item.product_name}</h1>
                                                    <>
                                                        <div className='flex gap-2'>
                                                            <p className='font-bold'>Color:</p>
                                                            <p>{item.colour}</p>
                                                        </div>
                                                        <div className='flex gap-2'>
                                                            <p className='font-bold'>Size:</p>
                                                            <p className='text-[#ff5c40] font-semibold'>
                                                                {item.size}
                                                            </p>
                                                        </div>
                                                    </>
                                            </div>
                                            {/* product quantity */}
                                            <div className='flex flex-col gap-3 items-start'>
                                                <div className='flex gap-4 items-center'>
                                                    <div className='flex gap-2'>
                                                        <p className='font-bold'>Quantity:</p>
                                                        <p className='text-green-500 font-semibold italic'>X {item.quantity}</p>
                                                    </div>
                                                    <div className='flex items-center gap-2'>
                                                        <div onClick={handleDecrement} disabled={count <= 0} className='flex items-center justify-center bg-slate-300 cursor-pointer'>
                                                            <FontAwesomeIcon icon={faMinus} />
                                                        </div>
                                                        <div onClick={handleIncrement} disabled={item.product_variants && count >= item.product_variants[0].stock_quantity} className='flex items-center justify-center border-gray-400 border cursor-pointer'>
                                                            <FontAwesomeIcon icon={faPlus} style={{ color: '#ff5c40' }} />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className='flex gap-2'>
                                                    <p className='font-bold'>Price:</p>
                                                    <p className='text-[#ff5c40]'>₦{item.naira_price}</p>
                                                </div>
                                            </div>
                                        </div>

                                        {/* delete api */}
                                        <div onClick={() => toggleDelete(item)} className='cursor-pointer'>
                                            <FontAwesomeIcon icon={faTrashAlt} style={{ color: '#ff5c40' }} />
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* order summary */}
                            <div className='text-sm lg:w-1/3 w-full p-3 bg-white shadow-xl flex flex-col gap-2 sticky'>
                                <div className='flex p-x py-3 items-center justify-between'>
                                    <h1 className='text-[#ff5c40] font-bold'>Order Summary</h1>
                                    <p className='font-bold'>{cart.length} Item{cart.length > 1 ? 's' : ''}</p>
                                </div>
                                <hr />
                                <div className='flex p-x py-3 items-center justify-between'>
                                    <h1 className='text-gray-500'>Delivery Charges</h1>
                                    <p>N/A</p>
                                </div>
                                <hr />
                                <div className='flex p-x py-3 items-center justify-between'>
                                    <h1 className='text-gray-500'>SubTotal</h1>
                                    <p className='font-bold'>₦{totalAmount}</p>
                                </div>
                                <hr />
                                <div className='flex p-x py-3 items-center justify-between'>
                                    <h1 className='font-semibold'>Total</h1>
                                    <p className='font-bold text-green-500'>₦{totalAmount}</p>
                                </div>
                                <hr />
                                <div className='p-2 text-white bg-[#ff5c40] rounded-md text-center cursor-pointer'>
                                    Proceed to Checkout
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                <Footer />
            </section>

            {/* delete item */}
            {deletedItem && (
                <div className='absolute h-[100vh] px-2 overflow-y-none w-full bg-[#00000078] top-0 z-40 flex justify-center'>
                    <div className='bg-white shadow-xl rounded-md p-4 flex flex-col gap-3 w-[500px] h-[150px] mt-16'>
                        <div className='flex items-center justify-between'>
                            <h1 className='font-semibold'>Confirm Delete</h1>
                            <FontAwesomeIcon icon={faTimes} onClick={() => setDeletedItem(null)} className='text-gray-400 cursor-pointer' />
                        </div>
                        <p className='text-sm'>Are you sure you want to delete this item from the cart?</p>
                        <div className='w-full flex items-center justify-end gap-2'>
                            <div onClick={() => setDeletedItem(null)} className='border border-gray-400 rounded-md p-1 cursor-pointer'>
                                Cancel
                            </div>
                            <div onClick={() => deleteItemFromCart(deletedItem)} className='text-[#ff5c40] font-semibold cursor-pointer'>
                                Delete
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Cart;
