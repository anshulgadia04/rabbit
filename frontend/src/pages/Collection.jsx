import React, { useEffect, useRef, useState } from 'react'
import {FaFilter} from "react-icons/fa"
import FiltterSideBar from '../components/Products/FiltterSideBar';
import SortOptions from '../components/Products/SortOptions';
import ProductGrid from '../components/Products/ProductGrid.jsx'




const Collection = () => {

    const [products , setProducts] = useState([]);
    const sideBarRef = useRef(null);
    const [isSideBarOpen , setIsSideBarOpen] = useState(false);

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

    useEffect(()=>{
        setTimeout(()=>{
            const fetchedProducts = [
                {
                  _id: 1,
                  name: "Classic Leather Jacket",
                  price: 120,
                  images: [
                    {
                      url: "https://picsum.photos/500/500?random=1"
                    }
                  ]
                },
                {
                  _id: 2,
                  name: "Modern Denim Jacket",
                  price: 120,
                  images: [
                    {
                      url: "https://picsum.photos/500/500?random=2"
                    }
                  ]
                },
                {
                  _id: 3,
                  name: "Casual Windbreaker",
                  price: 120,
                  images: [
                    {
                      url: "https://picsum.photos/500/500?random=3"
                    }
                  ]
                },
                {
                  _id: 4,
                  name: "Elegant Blazer",
                  price: 120,
                  images: [
                    {
                      url: "https://picsum.photos/500/500?random=4"
                    }
                  ]
                },
                {
                  _id: 5,
                  name: "Chic Bomber Jacket",
                  price: 120,
                  images: [
                    {
                      url: "https://picsum.photos/500/500?random=5"
                    }
                  ]
                },
                {
                  _id: 6,
                  name: "Vintage Suede Jacket",
                  price: 120,
                  images: [
                    {
                      url: "https://picsum.photos/500/500?random=6"
                    }
                  ]
                },
                {
                  _id: 7,
                  name: "Sporty Track Jacket",
                  price: 120,
                  images: [
                    {
                      url: "https://picsum.photos/500/500?random=7"
                    }
                  ]
                },
                {
                  _id: 8,
                  name: "Trendy Puffer Jacket",
                  price: 120,
                  images: [
                    {
                      url: "https://picsum.photos/500/500?random=8"
                    }
                  ]
                }];

        setProducts(fetchedProducts);

        },1000)
    },[]);

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
            <ProductGrid products={products} />
        </div>

    </div>
  )
}

export default Collection