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
    const [limit, setlimit] = useState(5);
    
    const categoryName: string = props.categoryName;
    
    useEffect(() => {
        if (categoryData.hasOwnProperty(categoryName)) {
            const trendingCategory: any = categoryData[categoryName as keyof typeof categoryData];
            const categoryUrl = trendingCategory[categoryName.replace(/\s/g, '').toLowerCase() + "_urls"];            
            setlimit(5);
            setcategoryimgs(categoryUrl)
        
        }
    }, [categoryName]);
  return (
    <>
    <main id="main" style={{ paddingTop: '0px' }} data-aos="fade" data-aos-delay="1500">
      <div id="gallery" className="gallery">
        <div className="container">
          <div className="row gy-4 justify-content-center" data-masonry='{"percentPosition": true }'>
          {categoryimgs && categoryimgs.slice(0, limit).map((CategoryDetails: any, itemIndex) => (
            <div className="col-xl-4 col-lg-4 col-md-6" key={itemIndex}>
              <div className="gallery-item h-100">
                <Link href={'image/' + categoryName + '/' + itemIndex}>
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
          <div className="hero text-center" style={{paddingTop:'100px',paddingBottom:'50px',display: limit > categoryimgs.length  ? 'none':'' }}><Button  className="btn-get-started" onClick={()=>{setlimit(limit+5)}}>Load More...</Button>
          </div>
        </div>
      </div>
    </main>
    </>
  );
}
export default Gallery;