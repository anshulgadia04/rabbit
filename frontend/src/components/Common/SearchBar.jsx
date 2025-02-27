import React, { useState } from 'react'
import { HiMagnifyingGlass, HiMiniXMark } from 'react-icons/hi2';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchProductsByFilter, setFilters } from '../../redux/slices/productsSlice';

const SearchBar = () => {

    const [searchTerm , setSearchTerm] = useState("");
    const [isOpen , setIsOpen] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSearchToggle = ()=>{
        setIsOpen(!isOpen);
    }

    const handleSearch = (e) => {
        e.preventDefault();
        dispatch(setFilters({search : searchTerm}));
        dispatch(fetchProductsByFilter({search : searchTerm}));
        navigate(`/collections/all?search=${searchTerm}`);
        setIsOpen(false);       
    }

  return (
    <div className={`flex items-center justify-center w-full transition-all duration-200 ${isOpen ? "absolute top-0 left-0 w-full bg-white h-24 z-50" : "w-auto"}`}>
       { isOpen 
       
       ? 
       
       (<form onSubmit={handleSearch} className='relative flex items-center justify-center w-full'>
            <div className='relative w-1/2'>
                <input
                onChange={(e)=> setSearchTerm(e.target.value)}
                type='text'
                placeholder='Search'
                value={searchTerm}
                className=' bg-gray-100 px-4 py-2 pl-2 pr-12 rounded-lg focus:outline-none w-full placeholder:text-gray-700'
                />

                <button className=' cursor-pointer absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-gray-800'>
                    <HiMagnifyingGlass className=' w-6 h-6'/>
                </button>
            </div>
            <button onClick={handleSearchToggle} className=' cursor-pointer absolute right-4 top-1/2 tranform -translate-y-1/2 text-gray-600 hover:text-gray-800 hover:scale-110'>
                <HiMiniXMark className='h-6 w-6'/>
            </button>
       </form>) 
       
       : 
       
       (<button className=' cursor-pointer' onClick={handleSearchToggle}>
        
        <HiMagnifyingGlass className=' h-6 w-6'/></button>)}


    </div>
  )
}

export default SearchBar