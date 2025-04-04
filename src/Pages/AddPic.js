import React, { useEffect, useRef } from 'react';
import { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import auth from '../Firebase.init';
import useAdmin from './useAdmin';

import { Helmet } from "react-helmet";
import ReactCrop, {
    centerCrop,
    makeAspectCrop,
    Crop,
    PixelCrop,
} from 'react-image-crop'
import 'react-image-crop/dist/ReactCrop.css'
import { db, storage } from '../Firebase.init';

import {
    getDownloadURL,
    ref,
    uploadBytesResumable
} from "firebase/storage";
import { useDebounceEffect } from './useBounceEffect';
import { CanvasPreview } from './Canvaspreview';
// import { canvasPreview } from './Canvaspreview';



function centerAspectCrop() {
    return centerCrop(
        makeAspectCrop(
            {
                unit: '%',
                width: 90,
            },

        ),

    )
}


const AddPic = () => {


    const [user, loading] = useAuthState(auth)
    const [admin, adminLoading] = useAdmin(user)
    const [success, setSuccess] = useState("")
    const [error, setError] = useState("")
    const navigate = useNavigate()
    const [imgSrc, setImgSrc] = useState('')
    const previewCanvasRef = useRef(null)
    const imgRef = useRef(null)
    const [crop, setCrop] = useState()
    const [scale, setScale] = useState(1)
    const [rotate, setRotate] = useState(0)
    const [aspect, setAspect] = useState(16 / 9)
    const [fileName, setFileName] = useState("")
    const [completedCrop, setCompletedCrop] = useState()

    const [image, setImage] = useState('');
    const [Url, setUrl] = useState('');
    const [percent, setPercent] = useState(0)
    const [working, setWorking]=useState(false)
    const [resultImg,setResultImg]=useState()
    const [imageUrl, setImageUrl]=useState("")
    const TO_RADIANS = Math.PI / 180

  
    useDebounceEffect(
        async () => {
          if (
            completedCrop?.width &&
            completedCrop?.height &&
            imgRef.current &&
            previewCanvasRef.current
          ) {
            // We use canvasPreview as it's much faster than imgPreview.
            //  CanvasPreview(
            //   imgRef.current,
            //   previewCanvasRef.current,
            //   completedCrop,
            //   scale,
            //   rotate,
            // )

            const ctx = previewCanvasRef.current.getContext('2d')
   
          
            if (!ctx) {
              throw new Error('No 2d context')
            }
          
            const scaleX = imgRef.current.naturalWidth / imgRef.current.width
            const scaleY = imgRef.current.naturalHeight / imgRef.current.height
            // devicePixelRatio slightly increases sharpness on retina devices
            // at the expense of slightly slower render times and needing to
            // size the image back down if you want to download/upload and be
            // true to the images natural size.
            const pixelRatio = window.devicePixelRatio
            // const pixelRatio = 1
          
            previewCanvasRef.current.width = Math.floor(crop.width * scaleX * pixelRatio)
            previewCanvasRef.current.height = Math.floor(crop.height * scaleY * pixelRatio)
          
            ctx.scale(pixelRatio, pixelRatio)
            ctx.imageSmoothingQuality = 'high'
          
            const cropX = crop.x * scaleX
            const cropY = crop.y * scaleY
          
            const rotateRads = rotate * TO_RADIANS
            const centerX = imgRef.current.naturalWidth / 2
            const centerY = imgRef.current.naturalHeight / 2
          
            ctx.save()
          
            // 5) Move the crop origin to the canvas origin (0,0)
            ctx.translate(-cropX, -cropY)
            // 4) Move the origin to the center of the original position
            ctx.translate(centerX, centerY)
            // 3) Rotate around the origin
            ctx.rotate(rotateRads)
            // 2) Scale the image
            ctx.scale(scale, scale)
            // 1) Move the center of the image to the origin (0,0)
            ctx.translate(-centerX, -centerY)
            ctx.drawImage(
                imgRef.current,
              0,
              0,
              imgRef.current.naturalWidth,
              imgRef.current.naturalHeight,
              0,
              0,
              imgRef.current.naturalWidth,
              imgRef.current.naturalHeight,
            )
            return new Promise((reject, resolve) => {
                ctx.toBlob((blob) => {
                  if (!blob) {
                    reject(new Error("the image canvas is empty"));
                    return;
                  }
                  blob.name = fileName;
                  let imageURL;
                  window.URL.revokeObjectURL(imageURL);
                  imageURL = window.URL.createObjectURL(blob);
                  resolve(imageURL);
                  setImageUrl(blob);
                }, "image1/jpeg");
                // console.log(imageUrl);
              });

            


            // end 
          }
        },
        100,
        [completedCrop, scale, rotate],
      )
      console.log(imageUrl); 
      if (loading || adminLoading) {
        return <loading />
    }

    // console.log(finalImg);
    // console.log(resultImg);
    if (!admin) {
        auth.signOut()
        // navigate("/login")
    }

    const upload = (e) => {
        // setImg(e.target.file)

    }
    function onSelectFile(e) {
        if (e.target.files && e.target.files.length > 0) {
            setCrop(undefined) // Makes crop preview update between images.
            const reader = new FileReader()
            reader.addEventListener('load', () =>
                setImgSrc(reader.result?.toString() || ''),
            )
            reader.readAsDataURL(e.target.files[0])
            setFileName(e.target.files[0].name)
        }
    }

    function onImageLoad(e) {
        if (aspect) {
            const { width, height } = e.currentTarget
            setCrop(centerAspectCrop(width, height, aspect))
        }
    }

    function handleToggleAspectClick() {
        if (aspect) {
            setAspect(undefined)
        } else if (imgRef.current) {
            const { width, height } = imgRef.current
            setAspect(16 / 9)
            setCrop(centerAspectCrop(width, height, 16 / 9))
        }
    }


    const submitPic = async (e) => {
        e.preventDefault();

        setUrl("")

        const storageRef = ref(storage, `/temImage/${fileName}`)
        const uploadTask = uploadBytesResumable(storageRef, previewCanvasRef);  
        uploadTask.on(
            "state_changed",
            (snapshot) => {
                const percent = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );

                // update progress
                setPercent(percent);
            },
            (err) => console.log(err),
            () => {
                // download url
                getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                    setUrl(url)
                    console.log(url);
                    const data = {
                        name: fileName,
                        link: url,
                        comments: []
                    }
                 fetch("https://piccomment.onrender.com/images", {
                        method: "POST",
                        headers: {
                            'content-type': 'application/json',
                            // 'authorization': `Bearer ${localStorage.getItem('accessToken')}`
                        },
                        body: JSON.stringify(data)
                    })
                        .then(res => {
                            console.log(res);
                            console.log("succeccc");
                            setSuccess("Successfully added")
                            setError("")
                        })
                        .catch(err => {
                            // console.log(err);
                            setSuccess("")
                            setError(err)
                        })

                });
            }
        );

    }

 
    return (
        <div className='addpicSection'>

            {/* <div
                className="mt-[90px] bg-white max-w-[450px] rounded-xl mx-auto px-4 py-16"
            >
                <div className=' '>
                    <h3 className='text-2xl font-bold mb-8'>Add photos</h3>
                    <form
                        onSubmit={submitPhoto}
                    >
                        <input type="text" placeholder='Photo Name [optional]' name="name" id="" className='bg-slate-200 my-3 p-3 text-lg w-10/12 mx-auto' /><br />
                        <input type="text" placeholder='Photo url' name="url" id="" className='bg-slate-200 my-3 p-3 text-lg w-10/12 mx-auto' required/><br />
                        <p className='text-primary font-semibold'>{success}</p>
                        <p className='text-red-400 font-semibold'>{error}</p>
                        <button
                            className='bg-[#3274D6] mt-5 text-white py-2 px-10 font-semibold text-lg rounded-md'
                            type='submit' >submit</button>
                    </form>



                </div>

            </div> */}

            {/* upload image  */}
            

            <div className="App min-h-screen pb-10">
                <div className="Crop-Controls text-left my-6">
                    <input type="file" accept="image/*" onChange={onSelectFile} />
                    <div className='my-4 text-white'>
                        <label htmlFor="scale-input">Scale: </label>
                        <input
                            id="scale-input"
                            type="number"
                            step="0.1"
                            value={scale}
                            disabled={!imgSrc}
                            onChange={(e) => setScale(Number(e.target.value))}
                        />
                    </div>
                    <div className='my-4 text-white'>
                        <label htmlFor="rotate-input">Rotate: </label>
                        <input
                            id="rotate-input"
                            type="number"
                            value={rotate}
                            disabled={!imgSrc}
                            onChange={(e) =>
                                setRotate(Math.min(180, Math.max(-180, Number(e.target.value))))
                            }
                        />
                    </div>
                    <div className='my-4 text-white  flex justify-between align-bottom '>
                        <button className='hover:text-red-400 font-semibold' onClick={handleToggleAspectClick}>
                            Toggle aspect {aspect ? 'off' : 'on'}
                        </button>
                        <button className='bg-red-400 py-1 px-6 font-bold  rounded-md' onClick={submitPic}>Submit</button>
                    </div>
                    <div className='my-4 text-white  flex justify-between align-bottom '>
                        {working &&
                        <p className='my-2 font-bold text-red-500'>Working: {percent} </p>
                        }
                        
                    </div>
                </div>
                {!!imgSrc && (
                    <ReactCrop
                        crop={crop}
                        onChange={(_, percentCrop) => setCrop(percentCrop)}
                        onComplete={(c) => setCompletedCrop(c)}
                        aspect={aspect}
                    >
                        <img
                            ref={imgRef}
                            alt="Crop me"
                            src={imgSrc}
                            style={{ transform: `scale(${scale}) rotate(${rotate}deg)` }}
                            onLoad={onImageLoad}
                        />
                    </ReactCrop>
                )}
                <div>
                    {!!completedCrop && (
                        <canvas
                            ref={previewCanvasRef}
                            style={{
                                border: '1px solid black',
                                objectFit: 'contain',
                                width: completedCrop.width,
                                height: completedCrop.height,
                            }}
                        />
                    )}
                </div>
            </div>


        </div>
    );
};

export default AddPic;