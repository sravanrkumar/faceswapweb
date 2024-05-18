import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import Cropper from 'react-easy-crop'
import UseImageProcessApi from '@/hooks/UseImageProcessApi';
import { Spinner } from 'flowbite-react';
const Imagecroptest = (props:any) => {

  const { catfoldername, catimagename, openImageModal, uploadedImage } = props;
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)
  const [imageset,setImage] =useState('');
  const [openImageModal1, setopenImageModal1] = useState(openImageModal);
  const [cropImageAreaPixels,setCropImageAreaPixels] = useState(null)
  const [loader,setloader] =useState(false);
  useEffect(()=>{
    setImage(URL.createObjectURL(uploadedImage));
  },[uploadedImage]);
  const onCropComplete = (croppedArea:any, croppedAreaPixels:any) => {
    console.log(croppedArea, croppedAreaPixels)
    setCropImageAreaPixels(croppedAreaPixels);
  }
  const SubmitImage = async () => {
    const croppedAreaPixels:any = cropImageAreaPixels;
    const image = imageset;
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) {
        console.error("Canvas context is null");
        return;
    }
    setloader(true);
    const img = new Image();
    img.src = image;
    await img.decode();
    canvas.width = croppedAreaPixels.width;
    canvas.height = croppedAreaPixels.height;
    ctx.drawImage(
      img,
      croppedAreaPixels.x,
      croppedAreaPixels.y,
      croppedAreaPixels.width,
      croppedAreaPixels.height,
      0,
      0,
      croppedAreaPixels.width,
      croppedAreaPixels.height
    );
    const base64Data = canvas.toDataURL('image/jpeg').replace(/^data:image\/(png|jpeg);base64,/, '');
    const byteString = atob(base64Data);
    const mimeString = 'image/jpeg';
    const buffer = new ArrayBuffer(byteString.length);
    const intArray = new Uint8Array(buffer);
    for (let i = 0; i < byteString.length; i++) {
      intArray[i] = byteString.charCodeAt(i);
    }
    const blob = new Blob([buffer], { type: mimeString });
    const file = new File([blob], 'uploadimage.jpeg', { type: 'image/jpeg' });
    const formData = new FormData();
    formData.append('sourceImage', file);
    formData.append('destImage', '');
    const ext = catimagename.split('.');
    let apiUrl;
    if (ext[1] == 'gif') {
       apiUrl = 'http://216.48.189.156:9098/upload/'+catfoldername+'/'+catimagename+'?app_name=NaturePhotoFramesandEditor&user_type=free';
    } else {
       apiUrl = 'http://164.52.194.62:9096/upload/'+catfoldername+'/'+catimagename+'?app_name=NaturePhotoFramesandEditor';
    }
   
    const res = await imgProcessApi(formData,apiUrl);
    if (res !== null && res !== undefined ) {
      const url_id = res ;
      if (!isNaN(url_id )) {
        try {
          await delay(10000); // 10-second delay
          let apiUrl2 ;
          if (ext[1] == 'gif') {
            formData.append('user_type', 'free');
            apiUrl2 = `http://216.48.189.156:9098/examples/results/NaturePhotoFramesandEditor/${url_id}`;
          } else {
            apiUrl2 = `http://164.52.194.62:9096/examples/results/NaturePhotoFramesandEditor/${url_id}`;
          }
         const response = await fetch(apiUrl2);
          const imageArrayBuffer = await response.arrayBuffer();
                const base64String = btoa(
                  new Uint8Array(imageArrayBuffer)
                    .reduce((data, byte) => data + String.fromCharCode(byte), '')
                );
            // Create a blob from the base64 string
           const blob = new Blob([Uint8Array.from(atob(base64String), c => c.charCodeAt(0))], { type: 'image/jpeg' });
            props.onDataReceived(blob);
            setloader(false);
        } catch (error) {
          setloader(false);
          props.onDataReceived(error);    
          props.onDataReceived("Server side error.Please try after some time.");   
        }
      } else {
        setloader(false);
        props.onDataReceived("Image uploaded is not correct");
      }
    } else {
      setloader(false);
      props.onDataReceived("Response is null or undefined");
    }
  };

  const imgProcessApi = (formData :any,apiUrl:string)=>{
    const res = UseImageProcessApi(apiUrl,formData);
    return res;
  }
  return (
    <>
      <div>
      {
      !loader ? ( // Conditionally render spinner while loading
      <div id="default-modal"  className={`overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full ${openImageModal1 === 1 ? 'visible' : 'hidden'}`}>
        <div className="relative p-4 w-full max-w-2xl max-h-full m-auto">
            <div className="relative bg-gray-900 rounded-lg shadow border border-gray-800">
            <div className="relative zindex-2 flex items-center  rounded-b justify-center">
                  <h1 className="text-xl font-semibold text-gray-200 p-2.5">Crop and drag your photo  Click to adjust position</h1> 
              
                  <button type="button" onClick={()=>{setopenImageModal1(0); props.onDataReceived('');}} className=" text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center relative right-3" data-modal-hide="default-modal" style={{zIndex:'6'}}>
                      <svg className="w-3 h-3"  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                      </svg>                  
                  </button>
                  
              </div>
              <div className="p-4 md:p-5 space-y-4 h-[300px]">
                <div className="imagecrop">
                  <div className="crop-container">
                    <Cropper
                      image={imageset}
                      crop={crop}
                      zoom={zoom}
                      aspect={1}
                      onCropChange={setCrop}
                      onCropComplete={onCropComplete}
                      onZoomChange={setZoom}
                      showGrid={false}
                    />
                  </div>
                  <div className="opertions">
                    <input disabled={loader}
                      type="range"
                      value={zoom}
                      min={1}
                      max={3}
                      step={0.1}
                      aria-labelledby="Zoom"
                      onChange={(e:any) => {
                        setZoom(e.target.value)
                      }}
                      className="zoom-range"
                    />
                  </div>
                </div>
              </div>
              <div className="relative zindex-2 flex items-center p-4 md:p-5 rounded-b justify-end">
                  <button data-modal-hide="default-modal" type="button"  className={`text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2`} disabled={loader} onClick={SubmitImage}>Contiune </button>
              </div>
            </div>
        </div>
      </div>
            ) : ( // Check if URL ends with .mp4
            <div id="default-modal"  className={`overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full ${openImageModal1 === 1 ? 'visible' : 'hidden'}`}>
            <div className="relative p-4 w-full max-w-2xl max-h-full m-auto">
            <div className='absolute left-0 right-0 m-auto z-20 w-[100px] top-[40%]'>
            { loader && (
              <div role="status">
                  <svg aria-hidden="true" className="w-12 h-12 m-auto  text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                      <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                  </svg>
                  <span className="block text-xl">Processing...</span>
              </div>
            )}
            </div>
                <div className="relative bg-gray-900 rounded-lg shadow border border-gray-800">
                <div className="relative zindex-2 flex items-center  rounded-b justify-center">
                <button  type="button" onClick={()=>{setopenImageModal1(0); props.onDataReceived('');}} className=" text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center relative right-3" data-modal-hide="default-modal" style={{zIndex:'6'}}>
                    <svg className="w-3 h-3"  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                    </svg>                  
                </button>
                      
                  </div>
                  <div className="p-4 md:p-5 space-y-4 h-[300px]">
                   
                  </div>
                  
                </div>
            </div>
          </div>
      )
      };
      </div>
 
    </>
  )
}

// Function to simulate a 10-second delay
function delay(ms:any) {
  return new Promise(resolve => setTimeout(resolve, ms));
}


export default Imagecroptest;
