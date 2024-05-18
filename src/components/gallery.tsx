"use client"
import Image from "next/image";
import { useEffect, useState } from "react";
import categoryData from "@/constants/categoryData";
import Link from "next/link";
import { Button } from "flowbite-react";

interface CategoryDetails {
    content: string;
    tag: string;
    url: string;
    user_type: string;
    watch_ad: string;
}
 const Gallery = (props: { categoryName: string }) => {
    const [categoryimgs, setcategoryimgs] = useState([]);
    const [limit, setlimit] = useState(12);
    
    const categoryName: string = props.categoryName.replace(/_/g, ' ');
    
    useEffect(() => {
        if (categoryData.hasOwnProperty(categoryName)) {
            const trendingCategory: any = categoryData[categoryName as keyof typeof categoryData];
            const categoryUrl = trendingCategory[categoryName.replace(/\s/g, '').toLowerCase() + "_urls"];            
            setlimit(12);
            setcategoryimgs(categoryUrl)
        }
    }, [categoryName]);
  return (
    <>
    <main id="main" data-aos="fade" data-aos-delay="1500">
      <div id="gallery" className="gallery">
        <div className="container m-auto">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 justify-center" data-masonry='{"percentPosition": true }'>
          {categoryimgs && categoryimgs.slice(0, limit).map((CategoryDetails: any, itemIndex) => (
            <div className="" key={itemIndex}>
              <div className="gallery-item ">
                <Link href={'image/' + categoryName.replace(/\s/g, '_') + '/' + itemIndex}>
                  {CategoryDetails.url && CategoryDetails.url.toLowerCase().endsWith('.mp4') ? ( // Check if URL ends with .mp4
                    <video controls width={400} height={400}>
                      <source src={CategoryDetails.url} type="video/mp4" />
                    </video>
                  ) : (
                    <Image
                      src={CategoryDetails.url}
                      alt={`Image ${itemIndex}`}
                      width={400}
                      height={400}
                      className="img-fluid"
                    />
                  )}
                </Link>
              </div>
            </div>
          ))}
          </div>
          <div className="my-6 text-center" style={{display: limit > categoryimgs.length  ? 'none':'' }}>
          <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2" onClick={()=>{setlimit(limit+6)}}>Load More...</button>
          </div>
        </div>
      </div>
    </main>
    </>
  );
}
export default Gallery;