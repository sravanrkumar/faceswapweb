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
                    <div key={index} className="skeleton-loader">
                       <svg aria-hidden="true" className="w-14 h-12 m-auto text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                          <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                      </svg>
                    </div>
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
