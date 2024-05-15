"use client";
import Image from "next/image";
import HeaderNavbar from "@/components/navbar/headerNavBar";
import Footer from "@/components/footer/footer";
import Banner from "@/components/banner/banner";
import { Modal,Button, Spinner } from "flowbite-react";
import categoryData from "@/constants/categoryData";
import UseImageProcessApi from "@/hooks/UseImageProcessApi";
import { useEffect, useState } from "react";
import App from "@/components/imagecrop";
interface categoryPageProps {
  params: {
    category: string;
    id: string ;
  };
}
  
export default function image(props: categoryPageProps) {
  
  const [openImageModal, setOpenImageModal] = useState(false);
  const [catImg, setCatImg] = useState('');
  const [catfoldername, setcatfoldername] = useState('');
  const [catimagename, setcatimagename] = useState('');
  const [receivedData, setReceivedData] = useState('');
  const [genratedimageUrl, setgenratedimageUrl] = useState('');
  const [loading, setLoading] = useState(true); // State to track loading
  const categoryName: string = props?.params?.category;
  const id = props?.params?.id;
  useEffect(() => {
  if (categoryData.hasOwnProperty(categoryName)) {
    const trendingCategory: any = categoryData[categoryName as keyof typeof categoryData];
    const categoryUrl = trendingCategory[categoryName.replace(/\s/g, '').toLowerCase() + "_urls"][id]['url'];
    setCatImg(categoryUrl);
   const urlSplite =  categoryUrl.split('/');
   setcatfoldername( urlSplite[4]);
   setcatimagename( urlSplite[5]);
   setLoading(false);
  }
},[categoryName]);
const handleDataReceived = (data:string) => {
  // Handle the received data from the child component
  setgenratedimageUrl(data);
  
};
const handleDownload = () => {
  if (genratedimageUrl) {
    // Create a dummy <a> element
    const link = document.createElement('a');
    link.href = genratedimageUrl;
    link.download = 'image.jpg';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } else {
    console.log('Please enter a valid image URL');
  }
};
  return (
    <>
    <HeaderNavbar/>
    <div className="container lg:w-[1024px] m-auto">
    <main id="main" data-aos="fade" data-aos-delay="1500" style={{paddingTop:'20px'}}>
      <div>
        <div className="grid grid-cols-1 gap-4 justify-items-center">
        {loading ? ( // Conditionally render spinner while loading
              <div className="spinner-container">
                <Spinner />
              </div>
            ) : catImg && catImg.toLowerCase().endsWith('.mp4') ? ( // Check if URL ends with .mp4
          <div>
            <video controls width={400} height={400} >
              <source src={catImg} type="video/mp4" />
            </video>
          </div>
        ) : (
          <div>
            <Image src={catImg} width={400} height={400} className="img-fluid rounded" alt=""/>
          </div>
        )}
        
        </div>
        <div className="hero text-center my-6">
        <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2" onClick={()=>{setOpenImageModal(true)}}> Apply to your photo</button>
        </div>
        <div className="hero text-center" style={{paddingTop:'50px',paddingBottom:'50px',minHeight:'auto', display:genratedimageUrl ==''?'none':''}}>
        <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"  onClick={()=>{handleDownload}}>Download Image</button>
        </div>
    
      </div>
     
    </main>
    <Banner/>
    <Footer/>
    </div>
  


      <div id="default-modal"  className="${openImageModal ? 'visible' : 'hidden'}   overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
    <div className="relative p-4 w-full max-w-2xl max-h-full">
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                   Upload an Image
                </h3>
                <button type="button" onClick={()=>{setOpenImageModal(false)}} className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="default-modal">
                    <svg className="w-3 h-3"  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                    </svg>
                    <span className="sr-only">Close modal</span>
                </button>
            </div>
            <div className="p-4 md:p-5 space-y-4">
                
                <App catfoldername={catfoldername} catimagename={catimagename} onDataReceived={handleDataReceived}/>
            </div>
            <div className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
                <button data-modal-hide="default-modal" type="button" onClick={()=>{setOpenImageModal(false)}} className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100">Cancel</button>
            </div>
        </div>
    </div>
</div>
    </>
    
  );
 
}