import React, { useEffect, useState } from 'react';
import Hero from '../components/Layout/Hero';
import GenderCollectionSection from '../components/Products/GenderCollectionSection';
import NewArrivals from '../components/Products/NewArrivals';
import ProductDetails from '../components/Products/ProductDetails';
import ProductGrid from '../components/Products/ProductGrid';
import FeaturedCollection from '../components/Products/FeaturedCollection';
import FeatureSection from '../components/Products/FeatureSection';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductsByFilter } from '../redux/slices/productsSlice'
import axios from 'axios'; // Import axios

const Home = () => {
    const dispatch = useDispatch();
    const { products, loading, error } = useSelector(state => state.products); // Corrected destructuring

    const [bestSellerProduct, setBestSellerProduct] = useState(null);

    useEffect(() => {
        // Fetch products for a specific collection
        dispatch(fetchProductsByFilter({
            gender: "Women",
            category: "Bottom Wear",
            limit: 8
        }));

        // Fetch best seller product
        const fetchBestSeller = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/products/best-seller`);
                // console.log("I am in Home.jsx and bestseller res is : " , response.data);
                // console.log("Best Seller Product:", response.data);
                
                setBestSellerProduct(response.data);
            } catch (error) {
                console.error("Error fetching best-seller product:", error);
            }
        };

        fetchBestSeller();
    }, [dispatch]);

    return (
        <>
            <Hero />
            <GenderCollectionSection />
            <NewArrivals />

            {/* Best Seller */}
            <h2 className="text-3xl text-center font-bold mb-4">Best Seller</h2>
            {
                bestSellerProduct ? (
                    <ProductDetails productId={bestSellerProduct._id} />
                ) : (
                    <p className="text-center">Loading Best Seller Products...</p>
                )
            }

            {/* Top wears for women */}
            <div className="container mx-auto">
                <h2 className="text-3xl text-center font-bold mb-4">Top Wears for Women</h2>
                <ProductGrid products={products} loading={loading} error={error} />
            </div>

            {/* Featured Collection */}
            <FeaturedCollection />

            {/* features */}
            <FeatureSection />
        </>
    );
};

export default Home;
