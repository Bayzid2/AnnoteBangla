import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';

const AdminPage = () => {
    const [data, setData] = useState([])
    useEffect(() => {

        fetch("https://piccomment.onrender.com/images")
            .then(res => res.blob())
            .then(blob => {
                console.log(blob);
                let objectURL = URL.createObjectURL(blob);
            
                // setData([...data,objectURL ])
             
            })
        .catch(err=>{
            console.log(err);
        })
    }, [])

    // fetch("https://piccomment.onrender.com/img")
    // // .then(res=>res.json())
    // .then(data=>{
    //     console.log(data);
    // })
    console.log(data);

    // const submit=()=>{
    //     fetch("https://piccomment.onrender.com/",{
    //         method:"POST",


    //     })
    // }
    return (
        <div>
            <form
                // onSubmit={submit}
                action='https://piccomment.onrender.com/'
                method='post'
                enctype='multipart/form-data'

            >
                <input type="file" name="avatar" id="" />
                <input type="submit" value="Submit" />
            </form>
            <div>


                {/* <p>{data[0].filename}</p> */}
                {/* <img src={"https://piccomment.onrender.com/images"} width="50" height="58" rounded alt="" /> */}
                {/* <img src={data} alt="" width="50" height="58" rounded /> */}
                {data.map(single=>{
                   <img src={single} alt="" width="50" height="58" rounded /> 

                })}

               <div className='img' style={{width:"100px"}}>
               {/* <div  id="myImg" ></div> */}
               </div>


            </div>

        </div>
    );
};

export default AdminPage;