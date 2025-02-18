import React, { useEffect, useRef, useState } from 'react'
import {FiChevronLeft} from 'react-icons/fi'
import {Link} from 'react-router-dom'
import {FiChevronRight} from 'react-icons/fi'
const NewArrivals = () => {

  const scrollRef = useRef(null);
  const [isDragging , setIsDragging] = useState(false);
  const [startX , setStartX] = useState(0);
  const [scrollLeft , setScrollLeft] = useState(false);
  const [canScrollLeft , setCanScrollLeft] = useState(false);
  const [canScrollRight , setCanScrollRight] = useState(true);



  const newArrivalArray = [
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
    },
];

const scroll = (direction) => {
  const scrollAmount = direction === "left" ? -300 : 300;
  scrollRef.current.scrollBy({left : scrollAmount , behavior : "smooth"});
};

const updateScrollButtons = () => {
  const container = scrollRef.current;

  if(container){
    const leftScroll = container.scrollLeft;
    const rightScrollable = container.scrollWidth > leftScroll + container.clientWidth;

    setCanScrollLeft(leftScroll > 0);
    setCanScrollRight(rightScrollable);
  }

}

const handleMouseDown = (e) => {
  e.preventDefault();
  setIsDragging(true);
  setStartX(e.pageX - scrollRef.current.offsetLeft);
  setScrollLeft(scrollRef.current.scrollLeft);
};

const handleMouseMove = (e) =>{
  if(!isDragging) return;

  const x = e.pageX - scrollRef.current.offsetLeft;
  const walk = (x - startX)*2;
  scrollRef.current.scrollLeft = scrollLeft - walk;
}

const handleMouseUporLeave = () => {
  setIsDragging(false);
}

useEffect(() => {
  const container = scrollRef.current;
  if (container) {
    container.addEventListener("scroll", updateScrollButtons);
    updateScrollButtons();
  }
  return () => {
    if (container) {
      container.removeEventListener("scroll", updateScrollButtons);
    }
  };
}, []);



  return (
    <section className='py-16 px-4 lg:px-0'>
      <div className='container mx-auto text-center mb-10 relative'>
        
        <h2 className='text-3xl font-bold mb-4'>Explore New Arrivals</h2>
        <p className='text-lg text-gray-600 mb-8'>
          Discover the latest style straight off the runway, freshly added to keep your wardrobe on the cutting edge of fashion.
        </p>

        {/* scroll buttons */}
        <div className='absolute right-0 bottom-[-30px] flex space-x-2'>
          <button
          disabled = {!canScrollLeft}
          onClick={()=> scroll("left")} 
          className={`p-2 rounded border ${canScrollLeft ? "bg-white cursor-pointer text-black" : "text-gray-400 bg-gray-200 cursor-not-allowed"} `}>
            <FiChevronLeft className='text-2xl'/>
          </button>

          <button 
          disabled = {!canScrollRight}
          onClick={()=> scroll("right")} 
          className={`p-2 rounded border ${canScrollRight ? "cursor-pointer bg-white text-black" : "text-gray-400 bg-gray-200 cursor-not-allowed"} `}>
            <FiChevronRight className='text-2xl'/>
          </button>
        </div>  
      </div>

      {/* scrollable area */}
      <div 
      ref={scrollRef} 
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUporLeave}
      onMouseLeave={handleMouseUporLeave}
      className={`container mx-auto overflow-x-auto flex space-x-6 relative ${isDragging ? "cursor-grabbing" : "cursor-grab"}`}>
        {
          newArrivalArray.map((product , index) => (
            <div key={product._id} className='min-w-[100%] sm:min-w-[50%] lg:min-w-[30%] relative'>
              <img
              src={product.images[0]?.url}  
              draggable = "false"
              // alt={product.images[0]?.al}
              className='w-full h-[500px] object-cover rounded-lg '
              />
              <div className=' absolute bottom-0 left-0 right-0 text-white p-4 rounded-b-lg backdrop-blur-md'>
                <Link to={`/product/${product._id}`} className="block">
                  <h4 className='font-medium'>{product.name}</h4>
                  <p className='mt-1'>${product.price}</p>
                </Link>
              </div>

            </div>
          ))
        }
      </div>
    </section>
  )
}

export default NewArrivals