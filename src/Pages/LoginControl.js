import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import auth from '../Firebase.init';
import Loading from './Loading';
import useAdmin from './useAdmin';

const LoginControl = () => {

    const [users, setUsers] = useState([])
    const [user, loading] = useAuthState(auth)
    const [admin, adminLoading] = useAdmin(user)
    const navigate = useNavigate()
    const [refresh, setRefresh] = useState(false)
    const [newSuccess, setNewSuccess] = useState("")
    const [newError, setNewError] = useState("")
    const [photoUid, setPhotoUid] = useState("")

    // https://piccomment.onrender.com/users

    useEffect(() => {
        fetch("https://piccomment.onrender.com/signimages")
            .then(res => res.json())
            .then(data => {
                setUsers(data)
            })
            .catch(err => {
                console.log(err);
            })
    }, [refresh])

    if (loading || adminLoading) {
        return <Loading />
    }

    if (!admin) {
        auth.signOut()
        // navigate("/login")
    }

    // const addPhoto=(e)=>{
    //     e.preventDefault();
    //     const photoData={
    //         name:e.target.name.value,
    //         link:e.target.link.value,
    //         comment:e.target.comment.value,

    //     }
    //     fetch("https://piccomment.onrender.com/signimages",{
    //         method:"POST",
    //         headers:{
    //             'content-type': 'application/json',
    //         },
    //         body: JSON.stringify(photoData)
    //     })
    //     .then(res => {
    //         // console.log(res);
    //         setRefresh(!refresh)
    //         setNewSuccess("Successfully added")
    //         setNewError("")
    //     })
    //     .catch(err => {
    //         // console.log(err);
    //         setNewSuccess("")
    //         setNewError(err)
    //     })

    // }

    const editPhotoOption = (id) => {
        setPhotoUid(id)
        document.querySelector(".modalForEdit").click()

    }
    const editPhoto = (e) => {
        e.preventDefault();
        const photoDatas = {
            name: e.target.name.value,
            link: e.target.link.value,
            comment: e.target.comment.value,

        }
        fetch(`https://piccomment.onrender.com/signimages/${photoUid}`, {
            method: "PATCH",
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify(photoDatas)
        })
            .then(res => {
                // console.log(res);
                setRefresh(!refresh)
                setNewSuccess("Successfully added")
                setNewError("")
            })
            .catch(err => {
                // alert(err);
                setNewSuccess("")
                setNewError(err)
            })

    }

    const RemovePhoto = (id) => {
        fetch(`https://piccomment.onrender.com/signimages/${id}`, {
            method: "DELETE",
            headers: {
                'content-type': 'application/json',
            },

        })
            .then(res => {
                console.log(res);
                // alert("Removed")
                setRefresh(!refresh)
                // setNewSuccess("Successfully added")
                // setNewError("")
            })
            .catch(err => {
                console.log(err);
                alert(err)
                // setNewSuccess("")
                // setNewError(err)
            })

    }


    const addNew = () => {
        navigate("/login-control-update")
    }
    const art = () => {
        navigate("/login-art")
    }

    return (
        <div>
            {/* <!-- Put this part before </body> tag-- > */}

            <input type="checkbox" id="my-modal-4" className="modal-toggle" />
            <label htmlFor="my-modal-4" className="modal cursor-pointer">
                <label className="modal-box relative" for="">
                    <div className=' '>
                        <h3 className='text-2xl font-bold mb-8'>Add Login Photo</h3>
                        <form
                        // onSubmit={addPhoto}
                        >
                            <input type="text" placeholder='Photo Name ' name="name" id="" className='bg-slate-200 my-3 p-3 text-lg w-10/12 mx-auto' required /><br />
                            <input type="text" placeholder='Comment' name="comment" id="" className='bg-slate-200 my-3 p-3 text-lg w-10/12 mx-auto' required /><br />
                            <input type="text" placeholder='Photo url' name="link" id="" className='bg-slate-200 my-3 p-3 text-lg w-10/12 mx-auto' required /><br />
                            <p className='text-primary font-semibold'>{newSuccess}</p>
                            <p className='text-red-400 font-semibold'>{newError}</p>
                            <button

                                className='bg-[#3274D6] mt-5 text-white py-2 px-10 font-semibold text-lg rounded-md'
                                type='submit' >submit</button>
                        </form>

                    </div>

                </label>
            </label>

            {/* modal for edit  */}
            <label htmlFor="my-modal-22" className="btn bg-lime-600 btn-xs font-bold px-6 modalForEdit absolute top-[-600px]">Edit</label>

            <input type="checkbox" id="my-modal-22" className="modal-toggle" />
            <label htmlFor="my-modal-22" className="modal cursor-pointer">
                <label className="modal-box relative" for="">
                    <div className=' '>
                        <h3 className='text-2xl font-bold mb-8'>Edit Login Photo</h3>
                        <form
                            onSubmit={editPhoto}
                        >
                            <input type="text" placeholder='Photo Name ' name="name" id="" className='bg-slate-200 my-3 p-3 text-lg w-10/12 mx-auto' required /><br />
                            <input type="text" placeholder='Comment' name="comment" id="" className='bg-slate-200 my-3 p-3 text-lg w-10/12 mx-auto' required /><br />
                            <input type="text" placeholder='Photo url' name="link" id="" className='bg-slate-200 my-3 p-3 text-lg w-10/12 mx-auto' required /><br />
                            <p className='text-primary font-semibold'>{newSuccess}</p>
                            <p className='text-red-400 font-semibold'>{newError}</p>
                            <button

                                className='bg-[#3274D6] mt-5 text-white py-2 px-10 font-semibold text-lg rounded-md'
                                type='submit' >submit</button>
                        </form>

                    </div>

                </label>
            </label>


            <div className='my-6 w-screen lg:w-10/12 mx-auto'>
                <h3 className='text-3xl font-bold mt-6 mb-2'>Login Control Pictures</h3>
                <p className='mb-8'>
                    {/* <label htmlFor="my-modal-4" className="text-blue-700 font-bold cursor-pointer uppercase hover:bg-slate-400 py-1 px-2">Add new</label> */}
                    <label onClick={addNew} className="text-blue-700 font-bold cursor-pointer uppercase hover:bg-slate-400 py-1 px-2 rounded">Add new</label>
                    <label htmlFor=""> or </label>
                    <label onClick={art} className="text-blue-700 font-bold cursor-pointer uppercase hover:bg-slate-400 py-1 px-2 rounded">Draw Images</label>
                </p>
                <div className="overflow-x-auto w-full">
                    <table className="table w-full">

                        <thead>
                            <tr>


                                <th className='text-lg'>image</th>
                                <th className='text-lg'>Name</th>
                                <th className='text-lg'>Comment</th>
                                <th className='text-lg'>Remove</th>
                                <th className='text-lg'>Edit</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                users &&
                                users.map(u => {
                                    return (
                                        <tr>
                                            <td className='break-all'>
                                                <div className="flex items-center space-x-3">
                                                    <div className="avatar">
                                                        <div className="mask mask-squircle w-12 h-12">
                                                            <img src={u.link} alt="Avatar Tailwind CSS Component" />
                                                        </div>
                                                    </div>

                                                </div>
                                            </td>
                                            <td className='break-all'>
                                                {u.name.substring(0, 10)}
                                            </td>
                                            <td className='break-all'>{u.comment}</td>

                                            <td className='break-all'>
                                                <button
                                                    onClick={() => RemovePhoto(u._id)}
                                                    className="btn bg-red-500 btn-xs font-bold ">Remove</button>

                                            </td>
                                            <td className='break-all'>
                                                <label className="btn bg-lime-600 btn-xs font-bold px-6  " onClick={() => editPhotoOption(u._id)}>Edit</label>

                                            </td>
                                        </tr>

                                    )
                                })
                            }



                        </tbody>

                    </table>
                </div>

            </div>
        </div >
    );
};

export default LoginControl;