import React from "react";
import { Link } from "react-router-dom";
import {HiOutlineUser , HiOutlineShoppingBag , HiBars3BottomRight} from 'react-icons/hi2'
import SearchBar from "./SearchBar";
import CartDrawer from "../Layout/CartDrawer";
import { useState } from "react";
import { IoMdAdd, IoMdClose } from "react-icons/io";
const Navbar = () => {


  const [isdrawerOpen , setIsDrawerOpen] = useState(false);
  const toggleCartDrawer = () => {
      setIsDrawerOpen(!isdrawerOpen)
  }

  const [navBarOpen , setNavBarOpen] = useState(false);
  const toogleNavBar = () => {
    setNavBarOpen(!navBarOpen);
  }

  return (
    <>
        <nav className="container flex items-center justify-between py-4 px-6 mx-auto">
      {/* left logo */}
      <div>
        <Link className="text-2xl font-medium">Rabbit</Link>
      </div>

      {/* center navigation icons*/}
      <div className="hidden md:flex space-x-6">
        <Link
          to="collections/all"
          className=" text-gray-700 hover:text-black text-sm font-medium uppercase"
        >
          Men
        </Link>

        <Link
          to="#"
          className=" text-gray-700 hover:text-black text-sm font-medium uppercase"
        >
          Women
        </Link>

        <Link
          to="#"
          className=" text-gray-700 hover:text-black text-sm font-medium uppercase"
        >
          Top wear
        </Link>

        <Link
          to="#"
          className=" text-gray-700 hover:text-black text-sm font-medium uppercase"
        >
          Bottom Wear
        </Link>
      </div>

      {/* right icons */}
      <div className="flex items-center space-x-4">

        <Link to="/admin" className="block bg-black px-2 rounded text-sm text-white">Admin</Link>

        <Link to='/profile' className=' hover:text-black'>
          <HiOutlineUser className="h-6 w-6 text-gray-700"/>
        </Link>

        <button onClick={toggleCartDrawer} className="relative hover:text-black cursor-pointer">
          <HiOutlineShoppingBag className="h-6 w-6 text-gray-700"/>
          <span className="absolute -top-1 bg-[#e22e0e] text-white text-xs rounded-full px-2 py-0.5">4</span>
        </button>

        {/* search */}
        <SearchBar/>

        <button
        onClick={toogleNavBar}
        className="md:hidden">
          <HiBars3BottomRight className="w-6 h-6 text-gray-700"/>
        </button>
      </div>


    </nav>

    <CartDrawer isdrawerOpen={isdrawerOpen} toggleCartDrawer={toggleCartDrawer}/>

    {/* mobile nav bar */}
    <div className={`fixed top-0 left-0 w-3/4 sm:w-1/2 md:w-1/3 h-full bg-white shadow-lg transform transition-transform duration-300 z-50 ${navBarOpen ? "translate-x-0" : "-translate-x-full"}`}>
      <div className="flex justify-end p-4">
        <button onClick={toogleNavBar}>
          <IoMdClose className=" h-6 w-6 text-gray-600"/>
        </button>
      </div>
      <div className="p-4">
        <h2 className="text-xl font-bold mb-4">Menu</h2>
        <nav className="space-y-4">
        <Link onClick={toogleNavBar} to={"collections/all"} className="block text-gray-600 hover:text-black">Men</Link>
        <Link onClick={toogleNavBar} to={"#"} className="block text-gray-600 hover:text-black">Women</Link>
        <Link onClick={toogleNavBar} to={"#"} className="block text-gray-600 hover:text-black">Top Wear</Link>
        <Link onClick={toogleNavBar} to={"#"} className="block text-gray-600 hover:text-black">Bottom Wear</Link>
        </nav>
      </div>
    </div>
    </>
  );
};

export default Navbar;
