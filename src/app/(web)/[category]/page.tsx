"use client"
import categoryData from "@/constants/categoryData";
import { useEffect, useState } from "react";
import Gallery from "@/components/gallery";
import { useAdminContext } from "@/context/storeAdmin";
interface AdmincategoryPageProps {
  params: {
    category:  string ;
  };
}
export default function Home(props: AdmincategoryPageProps) {
  const Catname = props?.params?.category;
  const keys = Object.keys(categoryData);
  const { setAdmin,admin ,setIp,ip} = useAdminContext();
  const [IpAddress,setIpAddress] = useState<any>(null);
  const [categoryName,setcategoryName] = useState(Catname);
  return (
    <>
   
    <div className="lg:w-[724px] m-auto">
      <Gallery categoryName={Catname}/>
    
    </div>
    </>
  );
}
