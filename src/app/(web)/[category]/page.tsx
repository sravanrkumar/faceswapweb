"use client"
import HeaderNavbar from "../../../components/navbar/headerNavBar";
import Footer from "../../../components/footer/footer";
import Banner from "@/components/banner/banner";
import Gallery from "@/components/gallery";
import categoryData from "@/constants/categoryData";
import { useState } from "react";
import Link from "next/link";
import Header from "@/components/header/header";
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
    <HeaderNavbar/>
    <Header/>
    <div className="lg:w-[724px] m-auto">
      <Gallery categoryName={Catname}/>
      <Banner/>
      <Footer/>
    </div>
    </>
  );
}
