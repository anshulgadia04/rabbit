import React, { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom';

const FiltterSideBar = () => {

    const navigate = useNavigate();
    const [searchParams , setSearchParams] =  useSearchParams();
    const [filters , setFilters] = useState({
        category : "",
        gender : "",
        color : "",
        size : [],
        material : [],
        brand : [],
        minPrice : 0,
        maxPrice : 100,
    });

    const [priceRange , setPriceRange] = useState([0,100]);

    const categories = ["Top Wear" , "Bottom Wear"];
    const colors = ["Red" , "Blue" , "Black" , "Green" , "Yellow" , "Gray" , "White" , "Pink" , "Beige" , "Navy"];
    const sizes = ["XS" , "S" , "M" , "L" , "XL" , "XXl"];
    const materials = ["Cotton" , "Wool" , "Denim" , "Polyester" , "Silk" , "Linen" , "Viscose" , "Fleece"];
    const brands = ["Urban Threads" , "Modern Fit" , "Street Style" , "Beach Breeze" , "Fashionista" , "ChicStyle"];
    const genders = ["Men" , "Women"];


    const handleFliterChange = (e) => {
        const {name , value , checked ,type } = e.target;
        let newFilters = {...filters};

        if(type === "checkbox"){
            if(checked){
                newFilters[name] = [...(newFilters[name] || []) , value];
            }
            else{
                newFilters[name] = newFilters[name].filter((item) => item !== value);
            }
        }
        else{
            newFilters[name] = value;
        }
        
      setFilters(newFilters);
    //   console.log(newFilters);
    updateURLParams(newFilters);
        
    };

    const updateURLParams = (newFilters) => {
        const params = new URLSearchParams();

        Object.keys(newFilters).forEach((key)=>{
            if(Array.isArray(newFilters[key]) && newFilters[key].length > 0){
                params.append(key , newFilters[key].join(","));
            }
            else if(newFilters[key]){
                params.append(key , newFilters[key]);
            }
        });
        setSearchParams(params);
        navigate(`?${params.toString()}`);
    };

    const handlePriceChange = (e) => {
        const newPrice = e.target.value;
        setPriceRange([0 , newPrice]);
        const newFilters = {...filters , minPrice : 0 , maxPrice : newPrice};
        setFilters(newFilters);
        updateURLParams(newFilters);
    }

    useEffect(()=>{
        const params = Object.fromEntries([...searchParams]);

        setFilters({
            category : params.category || "",
            gender : params.gender || "",
            color : params.color || "",
            size : params.size ? params.size.split(",") : [],
            material : params.material ? params.material.split(",") : [],
            brand : params.brand ? params.brand.split(",") : [],
            minPrice : params.minPrice || 0,
            maxPrice : params.maxPrice || 100
        });
        setPriceRange([0 , params.maxPrice || 100]);
    } , [searchParams]);

  return (
    <div className='p-4'>
        <h3 className='text-xl font-medium text-gray-800 mb-4'>Filter</h3>

        {/* Category Filter */}
        <div className='mb-6'>
            <label className='block text-gray-600 font-medium mb-2'>Category</label>
            {
                categories.map((category) => (
                    <div key={category}  className='flex items-center mb-1'>
                        <input 
                        type='radio' 
                        onChange={handleFliterChange} 
                        value={category} name='category' 
                        checked={filters.category === category}
                        className='mr-3 h-4 w-4 text-blue-500 focus:ring-blue-400 border-gray-400'/>
                        <span>{category}</span>
                    </div>
                ))
            }
        </div>

        {/* Gender Filter */}
        <div className='mb-6'>
            <label className='block text-gray-600 font-medium mb-2'>Gender</label>
            {
                genders.map((gender) => (
                    <div key={gender}  className='flex items-center mb-1'>
                        <input 
                        type='radio' 
                        value={gender} 
                        onChange={handleFliterChange} 
                        name='gender' 
                        checked={filters.gender === gender}
                        className='mr-3 h-4 w-4 text-blue-500 focus:ring-blue-400 border-gray-400'/>
                        <span>{gender}</span>
                    </div>
                ))
            }
        </div>

         {/* Colors Filter */}
        <div className='mb-6'>
            <label className='block text-gray-600 font-medium mb-2'>Color</label>
           <div className='flex flex-wrap gap-2'>
                {
                colors.map((color) => (
                    <button 
                    onClick={handleFliterChange}
                    key={color}
                    value={color}
                    name='color'
                    className={`w-8 h-8 rounded-full border border-gray-300 cursor-pointer transition hover:scale-110 ${filters.color === color ? "ring-2 ring-blue-500" : ""}`}
                    style={{backgroundColor : color.toLowerCase()}}>
                    
                    </button>
                ))
                }
           </div>
        </div>

        
        {/* Size Filter */}
        <div className='mb-6'>
            <label className='block text-gray-600 font-medium mb-2'>Size</label>
            {
                sizes.map((size) => (
                    <div key={size} className='flex items-center mb-1'>
                        <input 
                        value={size} 
                        onChange={handleFliterChange} 
                        type='checkbox' name='size' 
                        checked={filters.size.includes(size)}
                        className='mr-3 h-4 w-4 text-blue-500 focus:ring-blue-400 border-gray-400'/>
                        <span>{size}</span>
                    </div>
                ))
            }
        </div>

         {/* Material Filter */}
         <div className='mb-6'>
            <label className='block text-gray-600 font-medium mb-2'>Material</label>
            {
                materials.map((material) => (
                    <div key={material} className='flex items-center mb-1'>
                        <input 
                        value={material} 
                        onChange={handleFliterChange} 
                        type='checkbox' name='material' 
                        checked={filters.material.includes(material)}
                        className='mr-3 h-4 w-4 text-blue-500 focus:ring-blue-400 border-gray-400'/>
                        <span>{material}</span>
                    </div>
                ))
            }
        </div>

        {/* Brand Filter */}
        <div className='mb-6'>
            <label className='block text-gray-600 font-medium mb-2'>Brand</label>
            {
                brands.map((brand) => (
                    <div key={brand} className='flex items-center mb-1'>
                        <input 
                        onChange={handleFliterChange} 
                        value={brand} type='checkbox' 
                        name='brand' 
                        checked={filters.brand.includes(brand)}
                        className='mr-3 h-4 w-4 text-blue-500 focus:ring-blue-400 border-gray-400'/>
                        <span>{brand}</span>
                    </div>
                ))
            }
        </div>  

        {/* price range */}
        <div className='mb-8'>
            <label className='block text-gray-600 font-medium mb-2'>Price</label>
            <input 
            type='range' 
            name='priceRange' 
            min={0} 
            max={100}
            value={priceRange[1]}
            onChange={handlePriceChange}
            className='w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer'/>
            <div className='flex justify-between text-gray-600 mt-2'>
                <span>$0</span>
                <span>${priceRange[1]}</span>
            </div>

        </div>


    </div>
  )
}

export default FiltterSideBar