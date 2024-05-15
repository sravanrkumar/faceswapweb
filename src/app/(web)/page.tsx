"use client"
import HeaderNavbar from "../../components/navbar/headerNavBar";
import Footer from "../../components/footer/footer";
import Banner from "@/components/banner/banner";
import Gallery from "@/components/gallery";
import categoryData from "@/constants/categoryData";
import { useState } from "react";

export default function Home() {

  const keys = Object.keys(categoryData);
  const [categoryName,setcategoryName] =useState(keys[1]);
  return (
    <>
    <HeaderNavbar/>
    <div className="bg-gray-900 border border-gray-800 mb-6">
   
            
    <div className="rounded-md shadow-sm items-center justify-center flex" role="group">
    {keys.map(key => {
        // Render JSX based on key and value here if needed
        return (
          <button type="button" className="px-4 py-2 text-sm font-medium text-white bg-gray-900 border border-gray-800  hover:bg-gray-800 hover:text-blue-100 focus:z-10 "   key={key}  onClick={()=>{setcategoryName(key)}}> {key}</button>
        );
      })}
 </div>
          </div>
   <div className="lg:w-[1024px] m-auto">
    <Gallery categoryName={categoryName}/>
    <Banner/>
    <Footer/>
    </div>
    </>
  );
}
