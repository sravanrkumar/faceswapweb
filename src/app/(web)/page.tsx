"use client"
import HeaderNavbar from "../../components/navbar/headerNavBar";
import Footer from "../../components/footer/footer";
import Banner from "@/components/banner/banner";
import Gallery from "@/components/gallery";
import categoryData from "@/constants/categoryData";
import { useState } from "react";
import Link from "next/link";
import Header from "@/components/header/header";

export default function Home() {

  const keys = Object.keys(categoryData);
  const [categoryName,setcategoryName] =useState(keys[0]);
  return (
    <>
    <HeaderNavbar/>
    <Header/>
   <div className="lg:w-[724px] m-auto">
    <Gallery categoryName={categoryName}/>
    <Banner/>
    <Footer/>
    </div>
    </>
  );
}
