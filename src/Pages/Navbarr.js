import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import auth from '../Firebase.init';
import Loading from './Loading';
import useAdmin from './useAdmin';

const Navbarr = () => {
    const [user, loading] = useAuthState(auth)
    const [admin, adminLoading] = useAdmin(user)
    const navigate = useNavigate()

    if (loading || adminLoading) {
        return <Loading />
    }

    const signOut = (e) => {
        e.preventDefault()
        auth.signOut()
    }
    return (
        <div>
            {user && <div class="navbar bg-base-100">
                <div class="flex-1">
                    <a className='text-3xl font-bold cursor-pointer mx-3' onClick={(e) => {
                        e.preventDefault()
                        navigate("/")
                    }}>Home</a>
                </div>
                <div class="flex-none">
                    <ul class="menu menu-horizontal p-0">
                        {admin &&
                            <>
                                <li onClick={() => navigate("/addPic")} className='text-base font-semibold cursor-pointer mx-3'>Add Characters</li>
                                <li onClick={() => navigate("/extractAll")} className='text-base font-semibold cursor-pointer mx-3'>Extract Photos</li>
                                <li onClick={() => navigate("/all-comments")} className='text-base font-semibold cursor-pointer mx-3' >Annotated</li>
                                <li onClick={() => navigate("/users")} className='text-base font-semibold cursor-pointer mx-3' >Users</li>
                                <li onClick={() => navigate("/login-control")} className='text-base font-semibold cursor-pointer mx-3' >Login Control</li>
                            </>
                        }
                        <li onClick={signOut} className='text-base font-semibold cursor-pointer mx-3'>Log out</li>
                    </ul>
                </div>
            </div>}

        </div>
    );
};

export default Navbarr;