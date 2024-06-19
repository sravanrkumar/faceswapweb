import React, { useEffect, useState } from 'react';
import Cropper from 'react-easy-crop';
import UseImageProcessApi from '@/hooks/UseImageProcessApi';
import { generateToken } from '@/hooks/UseJWT';
import { FaceDetector, FilesetResolver, Detection } from '@mediapipe/tasks-vision';
interface Props {
  catfoldername: string;
  catimagename: string;
  openImageModal: number;
  uploadedImage: File | null;
  onDataReceived: (data: any) => void;
  ipToken :string;
}
const token = generateToken();
const Imagecroptest: React.FC<Props> = ({ catfoldername, catimagename, openImageModal, uploadedImage, onDataReceived,ipToken}) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [imageset, setImage] = useState<string>('');
  const [openImageModal1, setopenImageModal1] = useState<number>(openImageModal);
  const [cropImageAreaPixels, setCropImageAreaPixels] = useState<{ x: number; y: number; width: number; height: number } | null>(null);
  const [loader, setloader] = useState(false);
  const [errors, seterrors] = useState('');
  const [processingStatus, setprocessingStatus] = useState(1);
  const [aspectratio, setaspectratio] = useState(1);
  
  useEffect(() => {
    uploadedImage != null ? setImage(URL.createObjectURL(uploadedImage)):'';
  }, [uploadedImage,aspectratio]);

  const onCropComplete = (_croppedArea: any, croppedAreaPixels: { x: number; y: number; width: number; height: number }) => {
    setCropImageAreaPixels(croppedAreaPixels);
  };

  const SubmitImage = async () => {
    setprocessingStatus(1)
    seterrors('');
    if (!cropImageAreaPixels) return;

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
    canvas.width = cropImageAreaPixels.width;
    canvas.height = cropImageAreaPixels.height;
    ctx.drawImage(
      img,
      cropImageAreaPixels.x,
      cropImageAreaPixels.y,
      cropImageAreaPixels.width,
      cropImageAreaPixels.height,
      0,
      0,
      cropImageAreaPixels.width,
      cropImageAreaPixels.height
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
    formData.append('catname', catfoldername);
    formData.append('catimgname', catimagename);
    
    try {
       // Detect faces in the image before uploading
       const detections = await detectFaces(file);
       if (detections.length === 0) {
           seterrors("No face detected in the image.");
           setloader(true);
           return;
       }
       if (detections.length > 1) {
         seterrors("More than one face detected in the image.");
        setloader(true);
         return;
       }
      
       let faceperctage : number = parseInt(detections[0]?.categories[0]?.score.toString().split('.')[1].substring(0, 2));
       if(faceperctage < 90){
        seterrors("Face is not clear in the image.Try with another image.");
        setloader(true);
        return;
       }
    const response = await fetch(`/api/imageProcess`, {
      method: 'POST', // Specify the method as POST
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      body: formData // Convert the data object to a JSON string
    });
    if (response.ok) {
      setprocessingStatus(2)
      await delay(5000); // 35-second delay
      const data = await response.json();
      const result_id =data.request_id;
      if(!isNaN(result_id)) {
      try {
          
          const response:any = await fetch(`/api/imageResults`, {
            method: 'POST', // Specify the method as POST
            headers: {
              'Content-Type': 'application/json', // Specify the content type
              'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({
              'result_id': result_id,
              'catImgName':catimagename
            })
          });
        if(response != undefined && response != null ){
          const data = await response.json();
          const finalBlob = new Blob([Uint8Array.from(atob(data.image), c => c.charCodeAt(0))], { type: 'image/jpeg' });
          onDataReceived(finalBlob);
          setloader(false);
          setprocessingStatus(3)
        }
      } catch (error) {
        seterrors("Server side error. Please try after some time.");
        setloader(true);
        return
      }  
    } else {
      seterrors("Server side error. Please try after some time.");
      setloader(true);
      return
    }
    } else {
      seterrors("Server side error. Please try after some time.");
      setloader(true);
      return
    }
  } catch (error) {
    seterrors("Server side error. Please try after some time.");
    setloader(true);
    return
  }

  };
  const imgProcessApi = (formData: FormData, apiUrl: string) => {
    return UseImageProcessApi(apiUrl, formData);
  };
  // Function to detect faces using MediaPipe Face Detection
  const detectFaces = async (file: File): Promise<Detection[]> => {
    const vision = await FilesetResolver.forVisionTasks(
        "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.0/wasm"
    );
    const faceDetector = await FaceDetector.createFromOptions(vision, {
        baseOptions: {
            modelAssetPath: `https://storage.googleapis.com/mediapipe-models/face_detector/blaze_face_short_range/float16/1/blaze_face_short_range.tflite`,
            delegate: "GPU"
        },
        runningMode: "IMAGE"
    });

    return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = URL.createObjectURL(file);
        img.onload = async () => {
            const detections = await faceDetector.detect(img).detections;
            resolve(detections);
        };
        img.onerror = reject;
    });
  };
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
                    <button type="button" onClick={()=>{setopenImageModal1(0); onDataReceived('');}} className=" text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center relative right-3" data-modal-hide="default-modal" style={{zIndex:'6'}}>
                        <svg className="w-3 h-3"  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                        </svg>                  
                    </button>            
                </div>
                
                <div className="p-4 md:p-5 space-y-4 h-[320px]">
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
             
              { errors == '' ? (
                <>
                 <div className='absolute left-0 right-0 m-auto z-20 top-[40%]'>
                <div role="status  text-center">
                    <svg aria-hidden="true" className="w-14 h-12 m-auto text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                    </svg>
                    <div className=" text-center text-xl">Processing {processingStatus}/3...</div>
                </div>
                </div>
                </>
              ) : (
                <>
               <div className='absolute left-0 right-0 m-auto z-20 w-[500px] top-[40%]'>
                   
                    <span className="block text-xl">{errors}</span>
                    
                </div>
                
                </>
              )}
              
                  <div className="relative bg-gray-900 rounded-lg shadow border border-gray-800">
                    <div className="relative zindex-2 flex items-center  rounded-b justify-center">
                      <button  type="button" onClick={()=>{setopenImageModal1(0); onDataReceived('');}} className=" text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center relative right-3" data-modal-hide="default-modal" style={{zIndex:'6'}}>
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
  );
};

// Function to simulate a delay
function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export default Imagecroptest;
