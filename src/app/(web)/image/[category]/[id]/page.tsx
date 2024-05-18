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
import Imagecroptest from "@/components/imagecroptest";
import Header from "@/components/header/header";
interface categoryPageProps {
  params: {
    category: string;
    id: string ;
  };
}
  
export default function image(props: categoryPageProps) {
  
  const [openImageModal, setOpenImageModal] = useState(0);
  const [catImg, setCatImg] = useState('');
  const [catfoldername, setcatfoldername] = useState('');
  const [catimagename, setcatimagename] = useState('');
  const [receivedData, setReceivedData] = useState('');
  const [genratedimageUrl, setgenratedimageUrl] = useState<File | Blob | null>(null);
  const [loading, setLoading] = useState(true); // State to track loading
  const [uploadedImage, setUploadedImage] = useState<File | null>(null); // State to track loading
  const [errorDisplay, setErrorDisplay] = useState<string>(''); // State to track loading
  const categoryName: string = props?.params?.category.replace(/_/g, ' ');
  const id = props?.params?.id;
  useEffect(() => {
  if (categoryData.hasOwnProperty(categoryName)) {
    const trendingCategory: any = categoryData[categoryName as keyof typeof categoryData];
    const categoryUrl = trendingCategory[categoryName.replace(/\s/g, '').toLowerCase() + "_urls"][id]['url'];
    setCatImg(categoryUrl);
   const urlSplite =  categoryUrl.split('/');
   const folderimg = urlSplite.slice(-2);
   setcatfoldername(folderimg[0]);
   setcatimagename(folderimg[1]);
   setLoading(false);
  }
},[categoryName]);
const handleDataReceived = (data:any) => {
  // Handle the received data from the child component
  if( typeof data === 'string'){
   setErrorDisplay(data);
   setgenratedimageUrl(null);
  } else {
    setgenratedimageUrl(data);
    setErrorDisplay('');
  }
  setOpenImageModal(0);
};
const handleDownload = async () => {
  
  if (genratedimageUrl) {
   // Create a temporary anchor element to trigger the download
    const downloadLink = document.createElement('a');
    downloadLink.href = URL.createObjectURL(genratedimageUrl);
    const ext = catimagename.split('.');
    if (ext[1] == 'gif') {
      downloadLink.download = 'image.mp4';
    } else {
      downloadLink.download = 'image.jpg';
    }
  
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  }
};

  return (
    <>
 
    <div className="container lg:w-[724px] m-auto">
    <main id="main" data-aos="fade" data-aos-delay="1500" style={{paddingTop:'20px'}}>
      <div>
        <div className={`grid  gap-1 justify-items-center ${genratedimageUrl != null ? 'grid-cols-2' : 'grid-cols-1'}`}>
        {loading ? ( // Conditionally render spinner while loading
              <div className="">
                <Spinner />
              </div>
            ) : catImg && catImg.toLowerCase().endsWith('.mp4') ? ( // Check if URL ends with .mp4
          <div className="items-end">
            <video controls width={400} height={400} >
              <source src={catImg} type="video/mp4" />
            </video>
          </div>
        ) : (<>
          <div className="items-end">
            <Image src={catImg} width={300} height={400} className="img-fluid rounded" alt=""/>
            {genratedimageUrl != null &&(
            <p className="justify-items-center text-center mt-2" >Original Image</p>
          )}
          </div>
          {genratedimageUrl != null && ( 
            
          <div className="">
           { catImg && catImg.toLowerCase().endsWith('.gif') ? (
             <video controls width={300} height={400} >
             <source src={URL.createObjectURL(genratedimageUrl)} type="video/mp4" />
           </video>
           ) : (
            <Image src={URL.createObjectURL(genratedimageUrl)} width={300} height={400} className="img-fluid rounded" alt=""/>
           ) }
            {genratedimageUrl != null &&(
            <p className="justify-items-center text-center mt-2" >Generated Image</p>
         
         )}
          </div>
            )}
          </>
        )}
        
        </div>
       
        <div className="hero text-center" style={{paddingTop:'50px',paddingBottom:'50px',minHeight:'auto', display:genratedimageUrl ==null?'none':''}}>
        <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"  onClick={handleDownload}>Download Image</button>
        </div>
        {genratedimageUrl == null && ( 
        <div className="text-center my-12" >
          <label htmlFor="upload" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">
            Apply to your photo
          </label>
          <input
            type="file"
            id="upload"
            accept="image/*"
            onChange={(e) => {
              if (e.target.files && e.target.files.length > 0) {
                setUploadedImage(e.target.files[0]);
                setOpenImageModal(1);
                setgenratedimageUrl(null);
                setErrorDisplay('');
              }
              e.target.value = '';
            }}
            style={{display: 'none'}}
          />
          { errorDisplay != '' && (
            <div>{errorDisplay}</div>
          )
          }
          
        </div>)}
      </div>
     
    </main>
    <Banner/>
    
    </div>
  { openImageModal == 1 && (
    <Imagecroptest uploadedImage={uploadedImage} catfoldername={catfoldername}  openImageModal={openImageModal} catimagename={catimagename} onDataReceived={handleDataReceived} />
  )}

    </>
    
  );
 
}