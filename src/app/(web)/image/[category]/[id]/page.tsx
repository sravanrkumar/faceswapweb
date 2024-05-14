"use client";
import Image from "next/image";
import HeaderNavbar from "@/components/navbar/headerNavBar";
import Footer from "@/components/footer/footer";
import Banner from "@/components/banner/banner";
import { Modal,Button, Spinner } from "flowbite-react";
import categoryData from "@/constants/categoryData";
import Usepostimageupload from "@/hooks/UsePostImageUpload";
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
const handleFileUpload = (target: HTMLInputElement) => {
  const files = target.files;
  const formData = new FormData();
  if (files && files.length > 0) {
    const file = files[0];
    formData.append('sourceImage',file);
    formData.append('destImage','');
    
  }
  const apiUrl = 'https://216.48.189.156:9033/upload/'+catfoldername+'/'+catimagename+'?app_name=NaturePhotoFramesandEditor';
  const response = Usepostimageupload(apiUrl,formData);
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
    alert('Please enter a valid image URL');
  }
};
  return (
    <>
    <HeaderNavbar/>
    <main id="main" data-aos="fade" data-aos-delay="1500" style={{paddingTop:'20px'}}>
      <div className="container">
        <div className="row">
        {loading ? ( // Conditionally render spinner while loading
              <div className="spinner-container">
                <Spinner />
              </div>
            ) : catImg && catImg.toLowerCase().endsWith('.mp4') ? ( // Check if URL ends with .mp4
          <div className="col-md-6">
            <video controls width={400} height={400} >
              <source src={catImg} type="video/mp4" />
            </video>
          </div>
        ) : (
          <div className="col-md-6">
            <Image src={catImg} width={400} height={400} className="img-fluid rounded" alt=""/>
          </div>
        )}
        
        </div>
        <div className="hero text-center" style={{paddingTop:'50px',paddingBottom:'50px',minHeight:'auto'}}>
          <Button  className="btn-get-started" onClick={()=>{setOpenImageModal(true)}}>Apply to your photo</Button>
        </div>
        <div className="hero text-center" style={{paddingTop:'50px',paddingBottom:'50px',minHeight:'auto', display:genratedimageUrl ==''?'none':''}}>
          <Button  className="btn-get-started" onClick={()=>{handleDownload}}>Download Image</Button>
        </div>
    
      </div>
     
    </main>
    <Banner/>
    <Footer/>
    <Modal
        show={openImageModal}
        size="lg"
        popup
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
         
            <div >

              <App catfoldername={catfoldername} catimagename={catimagename} onDataReceived={handleDataReceived}/>
            </div>
            <div className="flex justify-center gap-4">
              <Button
                className="btn btn-secondary"
                onClick={()=>{setOpenImageModal(false)}}
              >
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
    
  );
 
}