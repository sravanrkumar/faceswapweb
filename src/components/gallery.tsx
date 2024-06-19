"use client";
import Image from "next/image";
import { Suspense, useEffect, useState, memo } from "react";
import categoryData from "@/constants/categoryData";
import Link from "next/link";

interface Catimgs {
  url: string;
}

const Gallery = (props: { categoryName: string }) => {
  const [categoryimgs, setcategoryimgs] = useState<Catimgs[]>([]);
  const [limit, setlimit] = useState(12);
  const [loading, setLoading] = useState(true);

  const categoryName: string = props?.categoryName.replace(/_/g, ' ');

  useEffect(() => {
    if (categoryData.hasOwnProperty(categoryName)) {
      const trendingCategory: any = categoryData[categoryName as keyof typeof categoryData];
      const categoryUrl = trendingCategory[categoryName.replace(/\s/g, '').toLowerCase() + "_urls"];
      setcategoryimgs(categoryUrl);
      setlimit(12);
      setLoading(false); // Set loading to false after setting images
    }
  }, [categoryName]);

  const handleLoadMore = () => {
    setlimit(prevLimit => prevLimit + 6);
  };

  return (
    <>
      <main id="main" data-aos="fade" data-aos-delay="1500">
        <div id="gallery" className="gallery">
          <div className="container m-auto">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 justify-center" data-masonry='{"percentPosition": true }'>
              {loading ? (
                <div className="skeleton-loader-container">
                  {Array.from({ length: limit }).map((_, index) => (
                    <div key={index} className="skeleton-loader"></div>
                  ))}
                </div>
              ) : (
                categoryimgs.slice(0, limit).map((CategoryDetails: Catimgs, itemIndex) => (
                  <div className="" key={itemIndex}>
                    <div className="gallery-item">
                      <Link href={'image/' + categoryName.replace(/\s/g, '_') + '/' + itemIndex}>
                        {CategoryDetails?.url && CategoryDetails?.url.toLowerCase().endsWith('.mp4') ? (
                          <video controls width={400} height={400} className="video-item">
                            <source src={CategoryDetails?.url} type="video/mp4" />
                          </video>
                        ) : (
                          <Image
                            src={CategoryDetails?.url}
                            alt={`Image ${itemIndex}`}
                            width={400}
                            height={400}
                            className="img-fluid"
                            placeholder="blur"
                            blurDataURL="/path/to/placeholder.png" // Placeholder image
                          />
                        )}
                      </Link>
                    </div>
                  </div>
                ))
              )}
            </div>
            <div className="my-6 text-center" style={{ display: limit >= categoryimgs?.length ? 'none' : '' }}>
              <button
                type="button"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
                onClick={handleLoadMore}
              >
                Load More...
              </button>
            </div>
          </div>
        </div>
      </main>

      <style jsx>{`
        .skeleton-loader-container {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 16px;
        }
        .skeleton-loader {
          background: #e0e0e0;
          height: 400px;
          width: 100%;
          animation: pulse 1.5s infinite;
        }
        @keyframes pulse {
          0% {
            background-color: #e0e0e0;
          }
          50% {
            background-color: #f0f0f0;
          }
          100% {
            background-color: #e0e0e0;
          }
        }
        .video-item {
          background: #000;
        }
      `}</style>
    </>
  );
};

export default memo(Gallery);
