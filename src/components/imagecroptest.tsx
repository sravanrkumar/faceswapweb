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
    const apiUrl = 'http://164.52.194.62:9096/upload/'+catfoldername+'/'+catimagename+'?app_name=NaturePhotoFramesandEditor';
    const res = await imgProcessApi(formData,apiUrl);
    if (res !== null && res !== undefined ) {
      const url_id = res ;
      if (!isNaN(url_id )) {
        try {
          await delay(10000); // 10-second delay
          const apiUrl = `http://164.52.194.62:9096/examples/results/NaturePhotoFramesandEditor/${url_id}`;
          const response = await fetch(apiUrl);
          const imageArrayBuffer = await response.arrayBuffer();
                const base64String = btoa(
                  new Uint8Array(imageArrayBuffer)
                    .reduce((data, byte) => data + String.fromCharCode(byte), '')
                );
            // Create a blob from the base64 string
           const blob = new Blob([Uint8Array.from(atob(base64String), c => c.charCodeAt(0))], { type: 'image/jpeg' });
            props.onDataReceived(blob);
        } catch (error) {
          props.onDataReceived(error);
        }
      } else {
        props.onDataReceived("Image uploaded is not correct");
      }
    } else {
      props.onDataReceived("Response is null or undefined");
    }
  };

  const imgProcessApi = (formData :any,apiUrl:string)=>{
    const res = UseImageProcessApi(apiUrl,formData);
    return res;
  }
  return (
    <>
     
    <div id="default-modal"  className={`overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full ${openImageModal1 === 1 ? 'visible' : 'hidden'}`}>
      <div className="relative p-4 w-full max-w-2xl max-h-full m-auto">
     
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
          <div className="relative zindex-2 flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b justify-center">
                <h1 className="text-black ">Crop and drag your photo click to adjust position</h1> 
             
                <button type="button" onClick={()=>{setopenImageModal1(0); props.onDataReceived('');}} className=" text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="default-modal" style={{zIndex:'6'}}>
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
                  <input
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
            <div className="relative zindex-2 flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b justify-end">
                <button data-modal-hide="default-modal" type="button"  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2" onClick={SubmitImage}>Contiune </button>
            </div>
          </div>
      </div>
    </div>
    </>
  )
}

// Function to simulate a 10-second delay
function delay(ms:any) {
  return new Promise(resolve => setTimeout(resolve, ms));
}


export default Imagecroptest;
