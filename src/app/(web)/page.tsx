"use client"
import Image from "next/image";
import 'bootstrap/dist/css/bootstrap.min.css';
import '/assets/css/main.css';
import HeaderNavbar from "../../components/navbar/headerNavBar";
import Footer from "../../components/footer/footer";
import Banner from "@/components/banner/banner";
import Gallery from "@/components/gallery";
import categoryData from "@/constants/categoryData";
import { useState } from "react";
import { Button } from "flowbite-react";


export default function Home() {

  const keys = Object.keys(categoryData);
  const [categoryName,setcategoryName] =useState(keys[1]);
  return (
    <>
    <HeaderNavbar/>
    <div>
   
            
            <Button.Group className="flex">
    {keys.map(key => {
        // Render JSX based on key and value here if needed
        return (
     
          <Button  key={key}  onClick={()=>{setcategoryName(key)}}> {key}</Button>
          
      
        
        );
      })}
      </Button.Group>
          </div>
   
    <Gallery categoryName={categoryName}/>
    <Banner/>
    <Footer/>
    </>
  );
}
