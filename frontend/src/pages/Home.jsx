import React from 'react'
import Hero from '../components/Layout/Hero'
import GenderCollectionSection from '../components/Products/GenderCollectionSection'
import NewArrivals from '../components/Products/NewArrivals'
import ProductDetails from '../components/Products/ProductDetails'
import ProductGrid from '../components/Products/ProductGrid'
import FeaturedCollection from '../components/Products/FeaturedCollection'
import FeatureSection from '../components/Products/FeatureSection'

const placeHolderProducts = [
  {
      _id: 1,
      name: "Floral Blouse",
      price: 899,
      images: [{ url: "https://picsum.photos/500/500?random=201" }]
  },
  {
      _id: 2,
      name: "Off-Shoulder Top",
      price: 1199,
      images: [{ url: "https://picsum.photos/500/500?random=202" }]
  },
  {
      _id: 3,
      name: "Crop Hoodie",
      price: 1599,
      images: [{ url: "https://picsum.photos/500/500?random=203" }]
  },
  {
      _id: 4,
      name: "Chiffon Tunic",
      price: 1399,
      images: [{ url: "https://picsum.photos/500/500?random=204" }]
  },
  {
      _id: 5,
      name: "Lace Peplum Top",
      price: 1299,
      images: [{ url: "https://picsum.photos/500/500?random=205" }]
  },
  {
      _id: 6,
      name: "Casual Tank Top",
      price: 799,
      images: [{ url: "https://picsum.photos/500/500?random=206" }]
  },
  {
      _id: 7,
      name: "V-Neck Sweater",
      price: 1799,
      images: [{ url: "https://picsum.photos/500/500?random=207" }]
  },
  {
      _id: 8,
      name: "Embroidered Kurti",
      price: 1899,
      images: [{ url: "https://picsum.photos/500/500?random=208" }]
  },
];



const Home = () => {
  return (
   <>
        <Hero/>
        <GenderCollectionSection/>
        <NewArrivals/>

        {/* best seller */}
        <h2 className='text-3xl text-center font-bold mb-4'>Best Seller</h2>
        <ProductDetails/>


        {/* Top wears for women */}
        <div className='container mx-auto'>
          <h2 className='text-3xl text-center font-bold mb-4'>Top Wears for Women</h2>
          <ProductGrid products={placeHolderProducts}/>
        </div>


        {/* Featured Collection */}
        <FeaturedCollection/>


        <FeatureSection/>
   </>
  )
}

export default Home