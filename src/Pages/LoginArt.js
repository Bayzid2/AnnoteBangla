import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useRef } from 'react';
import Keyboard from './Keyboard';
import { dataUrlToFileUsingFetch } from './utils';
import "./latest.css" 
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import auth, { storage } from '../Firebase.init';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';

const LoginArt = (props) => {
    const [success, setSuccess] = useState("")  
    const [error, setError] = useState("")
    const [user] = useAuthState(auth)
    const navigate=useNavigate() 

    const canvasRef=useRef(null)
    const contextRef=useRef(null)
    const [isDrawing, setIsDrawing]=useState(false)
    const [file, setFile]=useState()

    const [open, setOpen] = React.useState(false);
    const [text, setText] = useState("")
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    useEffect(()=>{
        const canvas=canvasRef.current
        canvas.width=500
        canvas.height=500
        const context=canvas.getContext("2d")
        context.lineCap="round"
        context.strokeStyle="black"
        context.lineWidth=5
        contextRef.current=context  
        

    }, [])

    useEffect(()=>{
        if(text){
            setError("")
        }
    },[text])

   

    const startDrawing=({nativeEvent})=>{
        const {offsetX, offsetY}=nativeEvent
        contextRef.current.beginPath()
        contextRef.current.moveTo(offsetX, offsetY)
        contextRef.current.lineTo(offsetX, offsetY)
        contextRef.current.stroke()
        setIsDrawing(true)
        nativeEvent.preventDefault() 

        
    }
    const draw=({nativeEvent})=>{
        if(!isDrawing){
            return;
        }
        const {offsetX, offsetY}=nativeEvent
        contextRef.current.lineTo(offsetX, offsetY)
        contextRef.current.stroke()
        nativeEvent.preventDefault()

    }
    const stop=()=>{

        contextRef.current.closePath()
        setIsDrawing(false)

    }

    const modify=async()=>{
        setSuccess("")
        setError("")
        const date=new Date()
        const imgName=`image${+date.getDate()+Math.floor(Math.random() * 1000)}`
        // const link = document.createElement("a"); // creating <a> element
        // link.download = `${Date.now()}.jpg`; 
        // link.href = canvasRef.current.toDataURL(); 
         // link.click(); 
        const linkIs = canvasRef.current.toDataURL(); 
        const file2 = await dataUrlToFileUsingFetch(linkIs, imgName, 'image/png')
        props.setImagLog(file2)
        // setFile(file2)
        if(file2){
            navigate("/login-control-update")
        }
        else{
            setError("file not found")
        }
       
    }

    const save=async()=>{
        setSuccess("")
        setError("")
        if(!text){
            setError("comment null");
            return;
        }
        const date=new Date()
        const imgName=`image${+date.getDate()+Math.floor(Math.random() * 1000)}`
        // const link = document.createElement("a"); // creating <a> element
        // link.download = `${Date.now()}.jpg`; 
        // link.href = canvasRef.current.toDataURL(); 
         // link.click(); 
        const linkIs = canvasRef.current.toDataURL(); 
        const file2 = await dataUrlToFileUsingFetch(linkIs, imgName, 'image/png')
        // props.setImag(file2)
        setFile(file2)
        

        
        const storageRef = ref(storage, `/temImage/${imgName}`)
        const uploadTask = uploadBytesResumable(storageRef, file2);  
        uploadTask.on(
            "state_changed",
            (snapshot) => {
                const percent = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );

                // update progress
                // setPercent(percent);
            },
            (err) => console.log(err),
            () => {
                // download url
                getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                    // setUrl(url)
                    console.log(url);
                    // const userIs = user.displayName
                    const photoData={
                        name:imgName,
                        link:url,
                        comment:text,
            
                    }
                    
                    fetch("https://piccomment.onrender.com/signimages", {
                        method: "POST",
                        headers: {
                            'content-type': 'application/json',
                        },
                        body: JSON.stringify(photoData)
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
                            setError(err?.message) 
                        })

                });
            })
    }
    // console.log(file);
    return (
       <div>
         <div className='flex justify-start items-center'> 
            <canvas className='w-[500px] h-[500px] border bg-white my-4 mx-4 ' ref={canvasRef}
            onMouseDown={startDrawing} 
            onMouseMove={draw}
            onMouseUp={stop} 
            ></canvas>

           <div className='ml-[60px] text-left' >
            <p className='font-semibold text-green-600 my-2'>{success}</p>
            <p className='font-semibold text-red-600 my-2'>{error}</p>
           <div className=" text-white font-bold flex " > <label for="my-modal" onClick={handleOpen} className="block h-[40px]  rounded w-[180px] cursor-pointer   bg-slate-400">{text}</label>
           <button className="bg-blue-500 py-2 px-6 rounded mx-4 text-white mb-4" onClick={save}>Save</button>
           </div>

           <button className="bg-red-500 py-2 px-6 rounded mx-4 text-white mb-4 font-bold" onClick={modify}>Modify</button>
           
           
           </div>



            
        </div>



        
        <input type="checkbox" id="my-modal" className="modal-toggle" />
            {
                open &&
                <div className="modal keyModal">
                    <div className=" pt-6">
                        <Keyboard closeModal={handleClose} setComment={setText} />
                        <div className="modal-action">
                            {/* <label htmlFor="my-modal" className="btn actionBtn hidden">Yay!</label> */}
                        </div>
                    </div>
                </div>
            }
       </div>
    );
};

export default LoginArt;