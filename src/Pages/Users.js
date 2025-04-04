import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import auth from '../Firebase.init';
import Loading from './Loading';
import useAdmin from './useAdmin';

const Users = () => {
    const [users, setUsers] = useState([])
    const [user, loading] = useAuthState(auth)
    const [admin, adminLoading] = useAdmin(user)
    const navigate=useNavigate()
    const [refresh, setRefresh]=useState(false)

    useEffect(() => {
        fetch("https://piccomment.onrender.com/users")
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

    const makeAdmin=(email)=>{
        fetch(`https://piccomment.onrender.com/users/${email}`,{
            method:"PATCH",
            headers: {
                'content-type': 'application/json',
                // 'authorization': `Bearer ${localStorage.getItem('accessToken')}`
            },
        })
        .then(res => {
            console.log(res);
            setRefresh(!refresh)
        })
        .catch(err => {
            alert("something wrong")
            console.log(err);
        })
        
    }
    const RemoveUser=(id)=>{
        fetch(`https://piccomment.onrender.com/user/${id}`,{
            method:"DELETE",
            headers: {
                'content-type': 'application/json',
                // 'authorization': `Bearer ${localStorage.getItem('accessToken')}`
            },
        })
        .then(res => {
            console.log(res);
            setRefresh(!refresh)
        })
        .catch(err => {
            alert("something wrong")
            console.log(err);
        })

    }
    return (
        <div className='my-6 w-screen lg:w-10/12 mx-auto'>
            <div className="overflow-x-auto w-full">
                <table className="table w-full">

                    <thead>
                        <tr>

                            <th className='text-lg'>Email</th>
                            <th className='text-lg'>Password</th>
                            <th className='text-lg'>Role</th>
                            <th className='text-lg'>Update</th>
                            <th className='text-lg'>Remove</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users &&
                            users.map(u=>{
                                return(
                                    <tr>
                                    <td className='break-all'>
                                        {u.email}
                                    </td>
                                    <td className='break-all'>
                                        {u.password}
                                    </td>
                                    <td className='break-all'>{u.role}</td>
                                    <td className='break-all'>
                                       {(u.role=="admin") &&
                                       <button onClick={()=>makeAdmin(u.email)} className="btn bg-teal-700 text-white border-none btn-xs font-bold">make admin</button>
                                       }
                                      
                                       
                                    </td>
                                    <td className='break-all'>
                                    <button onClick={()=>RemoveUser(u._id)} className="btn bg-red-500 btn-xs font-bold">Remove</button>
                                        
                                    </td>
                                </tr>

                                )
                            })
                        }

                      

                    </tbody>

                </table>
            </div>

        </div>
    );
};

export default Users;