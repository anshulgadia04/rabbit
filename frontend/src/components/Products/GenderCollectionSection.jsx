import React from 'react'
import mensCollectionImg from '../../assets/mens-collection.webp'
import womensCollectionImg from '../../assets/womens-collection.webp'
import { Link } from 'react-router-dom'
const GenderCollectionSection = () => {
  return (
    <section className='py-16 px-4 lg:px-0'>
        <div className='container mx-auto flex flex-col md:flex-row gap-8'>

            {/* womens collections */}
            <div className='relative flex-1'>
                <img src={womensCollectionImg} alt='womens collection' className='w-full h-[700px] object-cover'/>
                <div className='absolute left-8 bottom-8 bg-white p-4'>
                    <h2 className='text-2xl font-bold text-gray-800 mb-3'>Women's Collection</h2>
                    <Link
                    to="/collections/all?gender=Women"
                    className='text-gray-700 font-semibold underline'
                    >Women's Collections</Link>
                </div>
            </div>

            {/* mens collections */}
            <div className='relative flex-1'>
                <img src={mensCollectionImg} alt='mens collection' className='w-full h-[700px] object-cover'/>
                <div className='absolute left-8 bottom-8 bg-white p-4'>
                    <h2 className='text-2xl font-bold text-gray-800 mb-3'>Men's Collection</h2>
                    <Link
                    to="/collections/all?gender=Men"
                    className='text-gray-700 font-semibold underline'
                    >Men's Collections</Link>
                </div>
            </div>

        </div>
    </section>
  )
}

export default GenderCollectionSection