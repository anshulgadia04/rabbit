import React, { useState } from 'react'

const UserManagement = () => {

    const users = [
        {
            _id : "23456",
            name : "John",
            email : "john@example.com",
            role : "admin"
        },
    ];

    const [formData , setFormData] = useState({
        name : "",
        email : "",
        password : "",
        role : "customer"  //default role
    });

    const hanleChange = (e) => {
        setFormData({
            ...formData , 
            [e.target.name] : e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        console.log(formData);
        

        //reset the form after submission
        setFormData({
            name : "",
            email : "",
            password : "",
            role : "customer"

        })
    }

    const handleRoleChange = (userId , newRole) => {
        console.log({id : userId , role : newRole})
    };

    const handleDeleteUser = (userId) => {
        if(window.confirm("Are you sure you want to delete this user ? ")){
            console.log("Deleting user with id : " , userId);
            
        }
    }

  return (
    <div className='max-w-7xl mx-auto p-6'>
        <h2 className='text-2xl font-bold mb-6'>User Management</h2>
        

        <div className='p-6 mb-6 rounded-lg'>
            <h3 className='text-lg font-bold mb-4'>Add New User</h3>
            <form onSubmit={handleSubmit}>
                <div className='mb-4'>
                    <label className='block text-gray-700'>Name</label>
                    <input type='text' name='name' value={formData.name} onChange={hanleChange} className='w-full p-2 border rounded' required/>
                </div>

                <div className='mb-4'>
                    <label className='block text-gray-700'>Email</label>
                    <input type='text' name='email' value={formData.email} onChange={hanleChange} className='w-full p-2 border rounded' required/>
                </div>

                <div className='mb-4'>
                    <label className='block text-gray-700'>Password</label>
                    <input type='text' name='password' value={formData.password} onChange={hanleChange} className='w-full p-2 border rounded' required/>
                </div>

                <div className='mb-4'>
                    <label className='block text-gray-700'>Name</label>
                    <select name='role' value={formData.role} onChange={hanleChange} className='w-full p-2 border rounded'>
                        <option value="customer">Customer</option>
                        <option value="admin">Admin</option>
                    </select>
                </div>  
                <button type='submit' className='bg-green-500 text-white py-2 px-4 rounded hover:bg-gray-600'>Add User</button>
            </form>
        </div>

        {/* user list management */}
        <div className='overflow-x-auto shadow-md sm:rounded-lg'>
            <table className='min-w-full text-left text-gray-500'>
                <thead className='text-xs bg-gray-100 uppercase text-gray-700'>
                    <tr>
                                <th className='py-3 px-4'>Name</th>
                                <th className='py-3 px-4'>Email</th>
                                <th className='py-3 px-4'>Role</th>
                                <th className='py-3 px-4'>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        users.map((user) => (
                            <tr key={user._id} className='border-b hover:bg-gray-50'>

                                <td className='p-4 font-medium text-gray-900 whitespace-nowrap'>
                                    {user.name}
                                </td>

                                <td className='p-4'>{user.email}</td>


                                <td className='p-4'>
                                    <select 
                                    value={user.role} 
                                    onChange={(e) => handleRoleChange(user._id , e.target.value)}
                                    className='p-2 border rounded'>
                                        <option value="customer">Customer</option>
                                        <option value="admin">Admin</option>
                                    </select>
                                </td>


                                <td className='p-4'>
                                    <button onClick={() => handleDeleteUser(user._id)}
                                    className='bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600'
                                    >Delete</button>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>    
        </div>

    </div>
  )
}

export default UserManagement