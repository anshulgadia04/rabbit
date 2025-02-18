import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const OrderDetailsPage = () => {

    const id = useParams();
    const [orderDetails , setOrderDetails] = useState(null);
    
    useEffect(() => {
        const mockOrderDetails = {
            _id : id,
            createdAt : new Date(),
            isPaid : true,
            isDelivered : false,
            paymentMethod : "PayPal",
            shippingMethod : "Standard",
            shippingAddress : {city : "Gurgaon" , country : "India"},
            orderItems : [
                {
                    productId : "1",
                    name : "Stylish Jacket",
                    price : 100,
                    quantity : 1,
                    image : "https://picsum.photos/150?random=1",
                },
                {
                    productId : "2",
                    name : "Black Jacket",
                    price : 149,
                    quantity : 1,
                    image : "https://picsum.photos/150?random=2",
                }
            ]
        };

        setOrderDetails(mockOrderDetails)
    },[id])
  
    return (
    <div className='max-w-7xl mx-auto p-4 sm:p-6'>
        <h2 className='text-2xl md:text-3xl font-bold m-6'>Order Details</h2>
        {
            orderDetails ? (<p>No Order Details Found</p>) : 
            (
            <div className='p-4 sm:p-6 rounded-lg border'>
                {/* order info */}
                <div className='flex flex-col sm:flex-row justify-between mb-8'>
                    <div>
                        <h3 className='text-lg md:text-xl font-semibold'>Order Id : {orderDetails._id}</h3>
                        <p className=''>{new Date(orderDetails.createdAt).toLocaleDateString()}</p>
                    </div>
                    <div className='flex flex-col items-start sm:items-end mt-4 sm:mt-0'>
                        <span className={`${orderDetails.isPaid ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}></span>
                    </div>
                </div>
            </div>
            
        )}
    </div>
  )
}

export default OrderDetailsPage