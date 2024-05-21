"use client"
import Banner from "@/components/banner/banner";
import Gallery from "@/components/gallery";
import categoryData from "@/constants/categoryData";
import { useState } from "react";

export default function Home() {
  const keys = Object.keys(categoryData);
  const [categoryName,setcategoryName] =useState(keys[0]);
  return (
    <>
      <div className="lg:w-[724px] m-auto">
        <Gallery categoryName={categoryName}/>
        <Banner/>
      </div>
    </>
  );
}
