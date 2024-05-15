"use client"
import React, { useState, useRef, useEffect } from 'react'
import ReactCrop, {
  centerCrop,
  makeAspectCrop,
  Crop,
  PixelCrop,
} from 'react-image-crop'
import { canvasPreview } from './canvasPreview'
import { useDebounceEffect } from './useDebounceEffect'

import 'react-image-crop/dist/ReactCrop.css'
import UseImageProcessApi from '@/hooks/UseImageProcessApi'
import { Button } from 'flowbite-react'
import { getEndpointUrl } from '@/constants/endpoints'
import UseGetApi from '@/hooks/UseGetApi'
// This is to demonstate how to make and center a % aspect crop
// which is a bit trickier so we use some helper functions.
function centerAspectCrop(
  mediaWidth: number,
  mediaHeight: number,
  aspect: number,
) {
  return centerCrop(
    makeAspectCrop(
      {
        unit: '%',
        width: 90,
      },
      aspect,
      mediaWidth,
      mediaHeight,
    ),
    mediaWidth,
    mediaHeight,
  )
}

export default function App(props:any) {
  const catfoldername = props.catfoldername;
  const catimagename = props.catimagename;
  const [imgSrc, setImgSrc] = useState('')
  const previewCanvasRef = useRef<HTMLCanvasElement>(null)
  const imgRef = useRef<HTMLImageElement>(null)
  const hiddenAnchorRef = useRef<HTMLAnchorElement>(null)
  const blobUrlRef = useRef('')
  const [crop, setCrop] = useState<Crop>()
  const [completedCrop, setCompletedCrop] = useState<PixelCrop>()
  const [scale, setScale] = useState(1)
  const [rotate, setRotate] = useState(0)
  const [aspect, setAspect] = useState<number | undefined>(undefined)
  const [uploadimg, setuploadimg] = useState('')
  const [cropstatus, setcropstatus] = useState(false)
  const [uploadedimage,setuploadedimage] = useState<File | null>(null);
useEffect(()=>{
  
},[imgSrc])

  function onSelectFile(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files.length > 0) {
      setuploadimg(e.target.files[0].name);
      setCrop(undefined) // Makes crop preview update between images.
   
      // Reset the preview canvas
      const reader = new FileReader();
      reader.addEventListener('load', () => {
        setImgSrc(reader.result?.toString() || '');
  
        // Update preview canvas with the uploaded image
        const previewCanvas = previewCanvasRef.current;
        if (previewCanvas) {
        const context = previewCanvas.getContext('2d');
        if (context) {
          const image = new Image();
          image.src = reader.result?.toString() || '';
          image.onload = () => {
            // Clear canvas
            context.clearRect(0, 0, image.width, image.height);
            // Draw the uploaded image onto the canvas
            context.drawImage(image, 0, 0, image.width, image.height);
          };
        }
      }
      });
        reader.readAsDataURL(e.target.files[0])
        setuploadedimage(e.target.files[0]);
        const image = new Image();
        
        image.src = URL.createObjectURL(e.target.files[0]);
        image.onload = () => {
          const width = image.width;
          const height = image.height;
          const aspectRatio = width / height;
          // Set aspect ratio based on image dimensions
          setAspect(aspectRatio);
          // Set initial crop state to cover the entire image
          setCrop(centerAspectCrop(width, height, aspectRatio));
          // Set completed crop to null initially
          setCompletedCrop(undefined);
        }
        setcropstatus(false);
    }
  }
  async function onDownloadCropClick() {
    
    const image = imgRef.current;
    const previewCanvas = previewCanvasRef.current;
    
    if (!image || !previewCanvas || !completedCrop) {

      if (uploadedimage) {
        const formData = new FormData();
        formData.append('sourceImage', uploadedimage);
        formData.append('destImage', '');
       
        const apiUrl = 'http://164.52.194.62:9096/upload/'+catfoldername+'/'+catimagename+'?app_name=NaturePhotoFramesandEditor';
        const res = await imgProcessApi(formData, apiUrl);

        if (res !== null && res !== undefined) {
          const url_id = typeof res === 'number' ? res : '';
          if (url_id !== '') {
            //const apiUrl = `http://164.52.194.62:9096/examples/results/NaturePhotoFramesandEditor/${url_id}`;
            try {
           
                const apiUrl = `http://164.52.194.62:9096/examples/results/NaturePhotoFramesandEditor/${url_id}`;
                let blob1: Blob | null = null; // Initialize blob1 to null
                
                await delay(10000); // 10-second delay
                const data = await UseGetApi(apiUrl);
           
              if (data && data.data != null && data.data != '') {
                  if (data.data instanceof Blob) {
                    blob1 = data.data;
                  } else {
                      //blob1 = new Blob([data.data], { type: 'image/jpeg' });
                      // Convert byteArray to Uint8Array
                      const uint8Array = new Uint8Array(data.data);

                      // Create a Blob from Uint8Array
                      const blob1 = new Blob([uint8Array], { type: 'application/octet-stream' });
                  }

                  if (blob1) {
                      // Create object URL from the Blob
                      var urlCreator = window.URL || window.webkitURL;
                      const url = urlCreator.createObjectURL(blob1);
                      const link = document.createElement('a');
                      link.href = url;
                      link.setAttribute('download', 'image.jpeg');
                      document.body.appendChild(link);
                      link.click();
                      document.body.removeChild(link);
                      window.URL.revokeObjectURL(url);

                  }
                  //props.onDataReceived(data.data);
              }

                
                  //props.onDataReceived(data.data);
                
            } catch (error) {
              console.error("Error occurred while fetching data:", error);
              props.onDataReceived('');
            }
          } else {
            console.error("Image uploaded is not correct");
            props.onDataReceived('');
          }
        } else {
          console.error("Response is null or undefined");
          props.onDataReceived('');
        }
        
       
      } else {
        // Handle case where uploadedimage is null
        console.error("No image uploaded");
      }
        
    } else {
  
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
  
    const offscreen = new OffscreenCanvas(
      completedCrop.width * scaleX,
      completedCrop.height * scaleY,
    );
    const ctx = offscreen.getContext('2d');
  
    if (!ctx) {
      throw new Error('No 2d context');
    }
  
    ctx.drawImage(
      previewCanvas,
      0,
      0,
      previewCanvas.width,
      previewCanvas.height,
      0,
      0,
      offscreen.width,
      offscreen.height,
    );
    const fileNameParts = uploadimg.split('.');
    const name = fileNameParts[0];
    const types: string = fileNameParts[1];
    const arrext: { [key: string]: string } = { 'jpg': 'jpeg', 'jpeg': 'jpeg ', 'png': 'png', 'gif': 'gif' };
    const arrextValue: string | undefined = arrext[types];
    return new Promise<void>(async (resolve, reject) => {
      try {
        const blob = await offscreen.convertToBlob({ type: 'image/' + arrextValue });
        // Convert Blob to ArrayBuffer
        const arrayBuffer = await blob.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer); // Convert ArrayBuffer to Buffer
        // Convert Blob to File
        const fileName = `${name}.${arrextValue}`;
        const fileType = 'image/' + arrextValue;
        const file = new File([blob], fileName, { type: fileType });
        const formData = new FormData();
        // Append the ReadStream to FormData
        formData.append('sourceImage', file);
        formData.append('destImage', '');
        const apiUrl = 'http://164.52.194.62:9096/upload/'+catfoldername+'/'+catimagename+'?app_name=NaturePhotoFramesandEditor';
        const res =imgProcessApi(formData,apiUrl);
        if (res !== null && res !== undefined) {
          const url_id = typeof res === 'string' ? res : '';
          if (url_id !== '') {
            //const apiUrl = `http://164.52.194.62:9096/examples/results/NaturePhotoFramesandEditor/${url_id}`;
            try {
              //const data = await UseGetApi(apiUrl);
              const apiUrl = `http://164.52.194.62:9096/examples/results/NaturePhotoFramesandEditor/${url_id}`;
              let blob1: Blob | null = null; // Initialize blob1 to null
              
             
              await delay(10000); // 10-second delay
                const data = await UseGetApi(apiUrl);
                if (data && data.data != null && data.data != '') {
                    // Create a new Blob with the correct MIME type
                    if (data.data instanceof Blob) {
                      blob1 = data.data;
                    } else {
                        blob1 = new Blob([data.data], { type: 'image/jpeg' });
                    }
                
                    if (blob1) {
                        // Create object URL from the Blob
                        var urlCreator = window.URL || window.webkitURL;
                        const url = urlCreator.createObjectURL(blob1);
                        const link = document.createElement('a');
                        link.href = url;
                        link.setAttribute('download', 'image.jpeg');
                        document.body.appendChild(link);
                        link.click();
                        document.body.removeChild(link);
                        window.URL.revokeObjectURL(url);

                    }
                    //props.onDataReceived(data.data);
                }
                
              // props.onDataReceived(data);
            } catch (error) {
              console.error("Error occurred while fetching data:", error);
              props.onDataReceived('');
            }
          } else {
            console.error("Image uploaded is not correct");
            props.onDataReceived('');
          }
        } else {
          console.error("Response is null or undefined");
          props.onDataReceived('');
        }

        resolve();
      } catch (error) {
        console.error('Error uploading cropped image:', error);
        reject(error);
        // Handle error
      }
    });
    }
}
async function checkimage () {
      //const data = await UseGetApi(apiUrl);
      const apiUrl = `http://164.52.194.62:9096/examples/results/NaturePhotoFramesandEditor/953365.7167202904`;
      let blob1: Blob | null = null; // Initialize blob1 to null
        const data : any = await UseGetApi(apiUrl);
      
        if (data && data.data != null && data.data != '') {
            // Create a new Blob with the correct MIME type
          console.log(data.data)
            if (data.data instanceof Blob) {
              blob1 = data.data;
            } else {
              
                 const uint8Array = new Uint8Array(data.data);
                 // Create a Blob from the Uint8Array
                 blob1 = new Blob([uint8Array.buffer], { type: 'image/jpeg' });
            }
            
            if (blob1) {
                // Create object URL from the Blob
                var urlCreator = window.URL || window.webkitURL;
                const url = urlCreator.createObjectURL(data.data);
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', 'image.jpeg');
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                window.URL.revokeObjectURL(url);

            }
            //props.onDataReceived(data.data);
        }
        
      // props.onDataReceived(data);
 
    return;
}
const  CropImage=()=> {
  setcropstatus(!cropstatus);
}
const imgProcessApi = (formData :any,apiUrl:string)=>{
  console.log(apiUrl);
  const res = UseImageProcessApi(apiUrl,formData);
  console.log(res);
  return res;
}

  useDebounceEffect(
  
    async () => {
      setcropstatus(true);
      if (
        completedCrop?.width &&
        completedCrop?.height &&
        imgRef.current &&
        previewCanvasRef.current
      ) {
        // We use canvasPreview as it's much faster than imgPreview.
        canvasPreview(
          imgRef.current,
          previewCanvasRef.current,
          completedCrop,
          scale,
          rotate,
        )
      }
    },
    100,
    [completedCrop, scale, rotate],
  )
  return (
    <div className="App ">
      <div className='flex space-x-2 py-4'>
      <div className="Crop-Controls ">
        <input type="file" name='uploadedImg' accept="image/*" onChange={onSelectFile} />
       
      </div>
      {!!imgSrc && (
        <>
      <div className="Crop-Controls ">
      <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2" onClick={onDownloadCropClick}>Submit</button>
       
      </div>
      <div className="Crop-Controls " style={{display: cropstatus  ? 'block':'none'}}>
      <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"  onClick={CropImage}>Crop Image</button>
       
      </div>
      </>
      )}
     </div>
        
      {!!imgSrc && (
        <>
          <ReactCrop 
          style={{ width: '100%', height: 'auto',display: !cropstatus  ? 'block':'none'}}
            crop={crop}
            onChange={(_, percentCrop) => setCrop(percentCrop)}
            onComplete={(c) => setCompletedCrop(c)}
            aspect={aspect}
            minHeight={100}
          >
            <img
              ref={imgRef}
              alt="Crop me"
              src={imgSrc}
              style={{ transform: `scale(${scale}) rotate(${rotate}deg)`,width :'100%'} }
            />
            
          </ReactCrop>
          {completedCrop && (
            <div style={{display: cropstatus  ? 'block':'none'}}>
              <canvas
                ref={previewCanvasRef}
                style={{
                  border: '1px solid black',
                  objectFit: 'contain',
                  width: completedCrop.width,
                  height: completedCrop.height,
                }}
              />
            
            </div>
          )}
        </>
      )}
    </div>
  )

}
function doOCR(arg0: string) {
  throw new Error('Function not implemented.')
}
// Function to simulate a 10-second delay
function delay(ms:any) {
  return new Promise(resolve => setTimeout(resolve, ms));
}