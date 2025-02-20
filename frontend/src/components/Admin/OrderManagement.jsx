import React from 'react'

const OrderManagement = () => {

    const orders = [
        {
            _id : "1234234",
            user : {
                name :"John Doe"
            },
            totalPrice : 100,
            status : "processing"
        }
    ]

    const handleStatusChange = (orderId , status) => {
        console.log({orderId : orderId , status : status});
        
    }

  return (
    <div className='max-w-7xl p-6 mx-auto'>
        <h2 className='text-2xl font-bold mb-6'>Order Management</h2>
        <div className='overflow-x-auto shadow-md sm:rounded-md'>
            <table className='min-w-full text-left text-gray-500'>
                <thead className='bg-gray-100 text-xs uppercase text-gray-700'>
                    <tr>
                        <th className='px-4 py-3'>Order ID</th>
                        <th className='px-4 py-3'>Customer</th>
                        <th className='px-4 py-3'>Total Price</th>
                        <th className='px-4 py-3'>Status</th>
                        <th className='px-4 py-3'>Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {
                        orders.length > 0 ? (orders.map((order , index) => (
                            <tr key={order._id} className='border-b hover:bg-gray-50 hover:cursor-pointer'>
                                <td className='px-4 py-3 font-medium text-gray-900 whitespace-nowrap'>
                                    {order._id}
                                </td>
                                <td className='p-4'>{order.user.name}</td>
                                <td className='p-4'>${order.totalPrice}</td>
                                <td className='p-4'>
                                    <select 
                                        value={order.status} 
                                        className='bg-gray-50 border border-gray-300 text-gray-900 rounded-lg text-sm focus:ring-blue-900 focus:border-blue-500 block p-2.5 cursor-pointer' 
                                        onChange={(e) => handleStatusChange(order._id , e.target.value)}>
                                        <option value="processing">Processing</option>
                                        <option value="shipped">Shipped</option>
                                        <option value="delivered">Delivered</option>
                                        <option value="cancelled">Cancelled</option>
                                    </select>
                                </td>
                                <td className='p-4'>
                                    <button 
                                    className='text-white bg-green-500 px-4 py-2 rounded hover:bg-green-600 cursor-pointer'
                                    onClick={(e) => handleStatusChange(order._id , "delivered")}>Mark as Deliverd</button>
                                </td>
                            </tr>
                        ))) : (<tr>
                            <td colSpan={5} className='p-4 text-center text-gray-500'>No Orders Found.</td>
                        </tr>)
                    }
                </tbody>
            </table>
        </div>
    </div>
  )
}

export default OrderManagement