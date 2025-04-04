import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useLocation, useNavigate } from 'react-router-dom';
import auth from '../Firebase.init';
import useAdmin from './useAdmin';
import "./css_for_condition.css"

const Condition = () => {
  const navigate = useNavigate()
  const [user] = useAuthState(auth)
  const [admin, adminLoading] = useAdmin(user);
  const [timeErr, setTimeErr] = useState("")
  const [photoErr, setPhotoErr] = useState("")
  // const location=useLocation()
  // useEffect(()=>{
  //   if(!window.location.reload()){
  //     window.stop() 

  //   }
  // },[])  

  // if (window.performance) {
  //   if (performance.navigation.type == 1) {
  //     console.log( "This page is reloaded" ); 
  //   } else {
  //     console.log( "This page is not reloaded");
  //   }
  // }


  const timeWorking = (e) => {
    e.preventDefault()
    const time = e.target.time.value
    console.log(time);
    if (Number(time) < 1) {
      setTimeErr("Must be at least 1")

    }
    else {
      navigate(`/timeWorking/${time}`)
    }

  }

  const photosNumber = (e) => {
    e.preventDefault()
    const count = e.target.photoNo.value
    if (Number(count) < 1) {
      setPhotoErr("Must be at least 1")

    }
    else {
      navigate(`/photos/${count}`)
    }


  }
  const allPhotos = (e) => {
    e.preventDefault()
    // const count = e.target.photoNo.value
    // console.log(count);
    navigate('/allPhotos')
  }



  return (
    <div className='condition'>
      <div
        className="mt-[60px] bg-white max-w-[650px] rounded-xl mx-auto p-4"
      >
        <div className=' '>
          <h1 className='text-4xl font-bold mb-[40px] mt-[20px] text-black text-decoration-line: underline'>Select Your Preferences</h1>
          <h1 className='text-xl font-bold text-black'>How many minutes do you want to annotate?</h1>
          <form onSubmit={timeWorking}>
            <input type="number" placeholder='Enter minutes' name="time" id="" className='bg-slate-200 my-8 p-3 text-lg w-10/12 mx-auto' /><br />
            <p className='text-red-500 font-bold mb-2'>{timeErr}</p>
            <button
              className='bg-[#3274D6] text-white py-2 px-10 font-semibold text-lg rounded-md'
              type='submit' >Submit</button>
          </form>

        </div>
        <div class="divider w-10/12 mx-auto mt-10 text-xl text-black font-bold">OR</div>
        <div className='my-10 '>
          <h1 className='text-xl font-bold text-black mt-5'>How many photos do you want to annotate?</h1>
          <form onSubmit={photosNumber}>
            <input type="number" name="photoNo" placeholder='Enter photos number' id="" className='bg-slate-200 my-8 p-3 text-lg w-10/12 mx-auto' /><br />
            <p className='text-red-500 font-bold mb-2'>{photoErr}</p>
            <button className='bg-[#3274D6] text-white py-2 px-10 font-semibold text-lg rounded-md' type='submit'>Submit</button>
          </form>

          <div class="divider w-10/12 mx-auto mt-10 text-xl text-black font-bold border-color: rgb(248 250 252)">AND</div>
          {/* <h1 className='text-4xl font-bold mb-[40px] mt-[20px] text-black'>Without Preferences</h1> */}
          <button onClick={allPhotos} className='bg-[#3274D6] text-white py-2 mt-4 px-10 font-semibold text-xl rounded-md' type='submit'>Procced Without Preferences</button>


        </div>
      </div>
    </div>
  );

};


export default Condition;