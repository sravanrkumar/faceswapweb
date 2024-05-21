"use client"
import categoryData from "@/constants/categoryData";
import { useState } from "react";
import Gallery from "@/components/gallery";
interface AdmincategoryPageProps {
  params: {
    category:  string ;
  };
}
export default function Home(props: AdmincategoryPageProps) {
  const Catname = props?.params?.category;
  const keys = Object.keys(categoryData);
  const [categoryName,setcategoryName] =useState(Catname);
  return (
    <>
   
    <div className="lg:w-[724px] m-auto">
      <Gallery categoryName={Catname}/>
    
    </div>
    </>
  );
}
