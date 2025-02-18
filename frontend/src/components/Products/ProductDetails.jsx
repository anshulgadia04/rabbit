import React, { use, useEffect, useState } from 'react'
import {toast } from 'sonner';
import ProductGrid from './ProductGrid.jsx'




const ProductDetails = () => {

    const [mainImage , setMainImage] = useState("");
    const [selectedSize , setSelectedSize] = useState("");
    const [selectedColor , setSelectedColor] = useState("");
    const [quantity , setQuantity] = useState(1);
    const [isbuttonDisabled , setIsButtonDisabled] = useState(false);


    

    const selectedProduct = {
        name : "Stylish Jacket",
        price : 120,
        originalPrice : 150,
        desc : "This is stylish jacket perfect for any occasion.",
        brand : "FashionHub",
        material : "Leather",
        sizes : ["S","M","L","XL"],
        colors : ["Red" , "Black"],
        images : [
            {
                url : "https://picsum.photos/500/500?random=1",
                alt : "Stylish Jacket 1"
            },
            {
                url : "https://picsum.photos/500/500?random=2",
                alt : "Stylish Jacket 2"
            }
        ]
    };

    const similarProducts = [
        {
            _id: 1,
            name: "Casual T-Shirt",
            price: 499,
            images: [{ url: "https://picsum.photos/500/500?random=101" }]
        },
        {
            _id: 2,
            name: "Denim Jacket",
            price: 1499,
            images: [{ url: "https://picsum.photos/500/500?random=102" }]
        },
        {
            _id: 3,
            name: "Summer Dress",
            price: 1299,
            images: [{ url: "https://picsum.photos/500/500?random=103" }]
        },
        {
            _id: 4,
            name: "Running Shoes",
            price: 2499,
            images: [{ url: "https://picsum.photos/500/500?random=104" }]
        },
    ];
    

    useEffect(()=>{
        if(selectedProduct?.images?.length > 0)
        {
            setMainImage(selectedProduct.images[0].url);            
        }
    },[])   

    const handleQuantityChange = (action) => {
        if(action === "plus") setQuantity((prev) => prev + 1);
        if(action === "minus" && quantity > 1) setQuantity((prev) => prev - 1);
    }

    const handleAddToCart = () => {
        if(!selectedColor || !selectedSize){
            toast.error("Please select a size and color before adding to cart." , {
                duration : 1000,
            });
            return;
        }

        setIsButtonDisabled(true);
        setTimeout(() => {
            toast.success("Product added to cart!" , {duration : 1000});
            setIsButtonDisabled(false)
        } , 500);
       
    }

  return (
    <div className='p-6'>
        <div className='max-w-6xl mx-auto bg-white p-4 rounded-lg'>
            <div className='flex flex-col md:flex-row'>
                {/* left thumbnail */}
                <div className='hidden md:flex flex-col space-y-4 mr-6'>
                    {
                        selectedProduct.images.map((image , index) => {
                            return (
                                <img 
                                onClick={()=>setMainImage(image.url)}
                                key={index}
                                className={`w-20 h-20 object-cover rounded-lg cursor-pointer border ${mainImage === image.url ? "border-black scale-105 transition-all" : "border-gray-200"}`}
                                src={image.url} alt={image.alt}/>
                            )
                        })
                    }
                </div>

                {/* main content */}
                <div className='md:w-1/2'>
                    <div className='mb-4'>
                        <img src={mainImage}
                             alt="Main Product"
                             className='w-full h-auto object-cover rounded-lg'
                        />
                    </div>
                </div>

                {/* mobile thumbnail */}
                <div className='md:hidden flex overflow-x-scroll space-x-4 mb-4'>
                {
                        selectedProduct.images.map((image , index) => {
                            return (
                                <img 
                                key={index}
                                onClick={()=>setMainImage(image.url)}
                                className='w-20 h-20 object-cover'
                                src={image.url} alt={image.alt}/>
                            )
                        })
                    }
                </div>

                {/* right side */}
                <div className='md:w-1/2 md:ml-10'>
                    <h1 className='text-2xl md:text-3xl font-semibold mb-2'
                         >{selectedProduct.name}
                    </h1>
                    <p className='text-lg text-gray-600 mb-1 line-through'>
                        {selectedProduct.originalPrice && `${selectedProduct.originalPrice}`}
                    </p>
                    <p className='text-xl text-gray-500 mb-2'>
                        {selectedProduct.price}
                    </p>
                    <p className='mb-4 text-gray-600'>
                        {selectedProduct.desc}
                    </p>
                    <div className='mb-4'>
                        <p className='text-gray-700'>Colors:</p>
                        <div className='flex gap-2 mt-2'>
                            {
                                selectedProduct.colors.map((color , index) => (
                                    <button 
                                    key={color} 
                                    onClick={()=>setSelectedColor(color)}
                                    className={`w-8 h-8 rounded-full border cursor-pointer ${selectedColor === color ? "border-4 border-black" : "border-gray-300"}`}
                                    style={{backgroundColor:color.toLocaleLowerCase(),
                                        filter : "brightness(0.5)"
                                     }}></button>
                                ))
                            }
                        </div>
                    </div>

                    <div className='mb-4'>
                        <p className='text-gray-700'>Sizes : </p>
                        <div className='flex gap-2 mt-2'>
                            {
                                selectedProduct.sizes.map((size , index) => (
                                    <button 
                                    key={size}
                                    onClick={()=>setSelectedSize(size)} 
                                    className={`cursor-pointer px-4 py-2 rounded border ${selectedSize === size ? "bg-black text-white" : ""}`}>
                                    {size}</button>
                                ))
                            }
                        </div>
                    </div>

                    <div className='mb-4'>
                        <p className='text-gray-700'>Quantity : </p>
                        <div className='flex items-center space-x-4 mt-2'>
                            <button 
                            onClick={()=>handleQuantityChange("minus")}
                            className='cursor-pointer px-3 py-1 bg-gray-200 rounded text-lg'>-</button>
                            <span>{quantity}</span>
                            <button
                            onClick={()=>handleQuantityChange("plus")}
                            className='cursor-pointer px-3 py-1 bg-gray-200 rounded text-lg'>+</button>
                        </div>
                    </div>

                    <button 
                    disabled = {isbuttonDisabled}
                    onClick={handleAddToCart} 
                    className={`bg-black text-white py-2 px-6 cursor-pointer rounded w-full mb-4 ${isbuttonDisabled ? "cursor-not-allowed bg-black/50" : "hover:bg-gray-900"}`}>
                        {isbuttonDisabled ? "Adding..." : "ADD TO CART"}
                    </button>

                    <div className='mt-10 text-gray-700'>
                        <h3 className='text-xl font-bold mb-4'>Characteristics : </h3>
                        <table className='w-full text-left text-sm text-gray-600'>
                            <tbody>
                                <tr>
                                    <td className='py-1'>Brand</td>
                                    <td className='py-1'>{selectedProduct.brand}</td>
                                </tr>
                                <tr>
                                    <td className='py-1'>Material</td>
                                    <td className='py-1'>{selectedProduct.material}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                </div>
            </div>
            
            {/* You may also like section */}
            <div className='mt-20'>
                <h2 className='text-2xl text-center font-medium mb-4'>You May Also Like</h2>
                <ProductGrid products = {similarProducts}/>
            </div>

        </div>
    </div>
  )
}

export default ProductDetails