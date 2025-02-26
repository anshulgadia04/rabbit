import React, { useEffect, useRef, useState } from 'react'
import {FaFilter} from "react-icons/fa"
import FiltterSideBar from '../components/Products/FiltterSideBar';
import SortOptions from '../components/Products/SortOptions';
import ProductGrid from '../components/Products/ProductGrid.jsx'

import { useParams , useSearchParams } from 'react-router-dom';
import { useDispatch , useSelector } from 'react-redux';
import {fetchProductsByFilter} from '../redux/slices/productsSlice';




const Collection = () => {

    // const [products , setProducts] = useState([]);
    const sideBarRef = useRef(null);
    const [isSideBarOpen , setIsSideBarOpen] = useState(false);


    const dispatch = useDispatch();
    const {collection} = useParams();
    const [searchParams] = useSearchParams();
    const {products , loading , error} = useSelector(state => state.products);
    const queryParams = Object.fromEntries([...searchParams]);

    useEffect(() => {
      dispatch(fetchProductsByFilter({collection , ...queryParams}));
    } ,[dispatch , collection , searchParams]);

    const toglleSideBar = () => {
        setIsSideBarOpen(!isSideBarOpen);
    }

    const handleClickedOutside = (e) => {
        if(sideBarRef.current && !sideBarRef.current.contains(e.target))
        {
            setIsSideBarOpen(false);
        }
    }

    useEffect(() => {
        document.addEventListener("mousedown", handleClickedOutside);
    
        return () => {
          document.removeEventListener("mousedown", handleClickedOutside);
        };
      }, []);


  return (
    <div className='flex flex-col lg:flex-row'>
        {/* mobile filter button */}
        <button onClick={toglleSideBar} className='lg:hidden border border-gray-300 p-2 flex justify-center items-center'>
            <FaFilter/> Filters
        </button>

        {/* filter sidebar */}
        <div ref={sideBarRef} className={`${isSideBarOpen ? "translate-x-0" : "-translate-x-full"} fixed inset-y-0 z-50 left-0 w-64 bg-white overflow-y-auto transition-transform duration-300 lg:static lg:translate-x-0`}>
            <FiltterSideBar/>
        </div>

        <div className='flex flex-col grow p-4'>
            <h2 className='uppercase text-2xl mb-4'>all Collection</h2>
            
            {/* sort options */}
            <SortOptions/>


            {/* product Grid */}
            <ProductGrid products={products} loading={loading} error={error} />
        </div>

    </div>
  )
}

export default Collection