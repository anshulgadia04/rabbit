import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const cart = {
    products : [
        {
            name : "Stylish jacket",
            size: "M",
            color : "Black",
            price : 120,
            image : "https://picsum.photos/500/500?random=1",
        },
        {
            name : "Casual Shirt",
            size: "42",
            color : "Black",
            price : 70  ,
            image : "https://picsum.photos/500/500?random=2",
        },
    ],
    totalPrice : 200
};


const Checkout = () => {

    const [checkoutId , setCheckOutId] = useState(null);

    const navigate = useNavigate();
    const [shippingAddress , setShippingAddress] = useState({
        firstName : "",
        lastName : "",
        address : "",
        city : "",
        postalCode : "",
        country : "",
        phone : "",
    });

    const handleCreateCheckout = (e) => {
        e.preventDefault();
        setCheckOutId(123)
        navigate("/order-confirmation")
    }

  return (
    <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 mx-auto py-10 px-6 tracking-tighter max-w-7xl'>
        {/* left section */}
        <div className='bg-white rounded-lg p-6'>
            <h2 className='text-2xl uppercase mb-6'>Checkout</h2>
            <form onClick={handleCreateCheckout}>
                <h3 className='text-lg mb-4'>Contact Details</h3>
                <div className='mb-4'>
                    <label className='block text-gray-700 '>Email</label>
                    <input disabled type='email' value="user@example.com" className='w-full p-2 border rounded'/>
                </div>
                <h3 className='text-lg mb-4'>Delivery</h3>
                <div className='mb-4 grid grid-cols-2 gap-4'>
                    <div className=''>
                        <label className='block text-gray-700'>First Name</label>
                        <input 
                        onChange={(e) => setShippingAddress({...shippingAddress , firstName : e.target.value})}
                        type='text' 
                        className='w-full p-2 border rounded' 
                        required 
                        value={shippingAddress.firstName}/>
                    </div>

                    <div className=''>
                        <label className='block text-gray-700'>Last Name</label>
                        <input 
                        onChange={(e) => setShippingAddress({...shippingAddress , lastName : e.target.value})}
                        type='text' 
                        className='w-full p-2 border rounded' 
                        required 
                        value={shippingAddress.lastName}/>
                    </div>
                </div>


                <div className='mb-4'>
                    <label className='block text-gray-700'>Address</label>
                    <input type='text'
                    value={shippingAddress.address}
                    onChange={(e) => setShippingAddress({...shippingAddress , address : e.target.value})}
                    className='w-full p-2 border rounded'
                    required
                    />
                </div>


                <div className='mb-4 grid grid-cols-2 gap-4'>
                    <div className=''>
                        <label className='block text-gray-700'>City</label>
                        <input 
                        onChange={(e) => setShippingAddress({...shippingAddress , city : e.target.value})}
                        type='text' 
                        className='w-full p-2 border rounded' 
                        required 
                        value={shippingAddress.city}/>
                    </div>

                    <div className=''>
                        <label className='block text-gray-700'>Postal Code</label>
                        <input 
                        onChange={(e) => setShippingAddress({...shippingAddress , postalCode : e.target.value})}
                        type='text' 
                        className='w-full p-2 border rounded' 
                        required 
                        value={shippingAddress.postalCode}/>
                    </div>
                </div>

                <div className='mb-4'>
                    <label className='block text-gray-700'>Country</label>
                    <input type='text'
                    value={shippingAddress.country}
                    onChange={(e) => setShippingAddress({...shippingAddress , country : e.target.value})}
                    className='w-full p-2 border rounded'
                    required
                    />
                </div>

                <div className='mb-4'>
                    <label className='block text-gray-700'>Phone No.</label>
                    <input type='text'
                    value={shippingAddress.phone}
                    onChange={(e) => setShippingAddress({...shippingAddress , phone : e.target.value})}
                    className='w-full p-2 border rounded'
                    required
                    />
                </div>

                <div className='mb-6'>
                    {
                        !checkoutId ? (<button type='submit' className='w-full bg-black text-white py-3 rounded'>Continue to Payment</button>)
                        : (<h3 className='text-lg mb-4'>Pay with Paypal</h3>)
                    }
                </div>
                
            </form>
        </div>


        {/* right section */}
        <div className='bg-gray-50 p-6 rounded-lg'>
            <h3 className='text-lg mb-4'>Order Summary</h3>
            <div className='border-t mb-4 py-4'>
                {
                    cart.products.map((product , index) => (
                        <div key={index} className='flex items-start justify-between py-2 border-b'>
                            <div className='flex items-start'>
                                <img src={product.image} alt={product.name} className='w-20 h-24 object-cover mr-4'/>
                                <div>
                                    <h3 className='text-md'>{product.name}</h3>
                                    <p className='text-gray-500'>Size : {product.size}</p>
                                    <p className='text-gray-500'>Color : {product.color}</p>
                                </div>
                             </div>
                             <p className='text-xl'>${product.price?.toLocaleString( )}</p>
                        </div>
                    ))
                }
            </div>
            <div className='flex justify-between items-center text-lg mb-4'>
                <p>Sub Total</p>
                <p>${cart.totalPrice?.toLocaleString()}</p>
            </div>

            <div className='flex justify-between items-center text-lg'>
                <p>Shipping</p>
                <p>Free</p> 
            </div>

            <div className='flex justify-between items-center text-lg mt-4 border-t pt-4'>
                <p>Total</p>
                <p>${cart.totalPrice?.toLocaleString()}</p>

            </div>
        </div>
    </div>
  )
}

export default Checkout