import React, { useState , useEffect } from 'react'
import {Link, useLocation, useNavigate} from 'react-router-dom'
import registerImg from '../assets/register.webp'
import { useDispatch, useSelector } from 'react-redux'
import { registerUser } from '../redux/slices/authSlice'
import { mergeCart } from '../redux/slices/cartSlice'


const Register = () => {
    const [name , setName] = useState("");
    const [email , setEmail] = useState("");
    const [password , setPassword] = useState("");
    
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const {user , guestId} = useSelector(state => state.auth);
    const {cart} = useSelector(state => state.cart);


    //get the redirect url from query params if its checkout then redirect to checkout page
    const redirect = new URLSearchParams(location.search).get("redirect") || "/";
    const isCheckoutRedirect = redirect.includes("checkout");

    useEffect(() => {
        if (user) {
            if (cart?.products.length > 0 && guestId) {
                dispatch(mergeCart({ user, guestId }));
            }
            navigate(isCheckoutRedirect ? "/checkout" : "/");
        }
    }, [dispatch, user, cart, guestId, navigate, isCheckoutRedirect]);

    const handleSubmit = (e) => {
        e.preventDefault();
        // console.log("User Registered : " , {name , email , password});
        dispatch(registerUser({name , email , password}));
    }


  return (
    <div className='flex'>
        <div className='w-full md:w-1/2 flex flex-col justify-center items-center p-8 md:p-12'>
            <form onSubmit={handleSubmit} className='w-full max-w-md bg-white p-8 rounded-lg border shadow-sm'>
                <div className='flex justify-center mb-6'>
                    <h2 className='text-xl font-medium'>Rabbit</h2>
                </div>
                <h2 className='text-2xl font-bold text-center mb-6'>Hey there! 👋</h2>
                <p className='text-center mb-6'>
                    Enter your username and password to Register
                </p>

                <div className='mb-4'>
                    <label className='block text-sm font-semibold mb-2'>Name</label>
                    <input type='text' 
                    value={name} 
                    onChange={(e) => setName(e.target.value)}
                    className='w-full p-2 border rounded'
                    placeholder='Enter Your Name'
                    />
                </div>

                <div className='mb-4'>
                    <label className='block text-sm font-semibold mb-2'>Email</label>
                    <input type='email' 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)}
                    className='w-full p-2 border rounded'
                    placeholder='Enter your email'
                    />
                </div>

                <div className='mb-4'>
                    <label className='block text-sm font-semibold mb-2'>Password</label>
                    <input type='password' 
                    value={password} onChange={(e) => setPassword(e.target.value)}
                    className='w-full p-2 border rounded'
                    placeholder='Enter your password'
                    />
                </div>

                <button type='submit' className='w-full bg-black text-white rounded-lg font-semibold p-2 hover:bg-gray-800 transition'>Sign Up</button>

                <p className='mt-6 text-center text-sm'>
                    Already have an account?
                    <Link to={`/login?redirect=${encodeURIComponent(redirect)}`} className="ml-1 text-blue-500">
                 Login</Link></p>

            </form>

        </div>

        <div className='hidden md:block w-1/2 bg-gray-800'>
            <div className='h-full flex flex-col justify-center items-center'>
                <img src={registerImg} alt='Login to account' className='h-[750px] w-full object-cover'/>
            </div>
        </div>
    </div>
  )
}

export default Register