import React, { useEffect, useState } from 'react';
import "./comments.css"
import Modal from 'react-modal';
import SingleComment from './SingleComment';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../Firebase.init';
import useAdmin from './useAdmin';
import { useNavigate } from 'react-router-dom';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};


const Comments = () => {
    const [images, setImages] = useState([])
    const [user, loading] = useAuthState(auth)
    const [admin, adminLoading] = useAdmin(user)
    const [singleComment, setSingleComment] = useState({})
    const [modalIsOpen, setIsOpen] = React.useState(false);
    const navigate=useNavigate()

    useEffect(() => {
        fetch("https://piccomment.onrender.com/images")
            .then(res => res.json())
            .then(data => {
                // console.log("idata is", data);
                setImages(data)

            })
    }, [])
    console.log("adminis ", admin);

    if (loading || adminLoading) {
        return <loading />
    }
    if (!admin) {
        auth.signOut()
        // navigate("/login")

    }

    // modal 

    Modal.setAppElement(document.getElementById('root'));


    function openModal(i) {
        setSingleComment(i)
        setIsOpen(true);
    }


    function closeModal() {
        setIsOpen(false);
    }



    return (
        <div>
            {/* modal  */}

            <Modal
                isOpen={modalIsOpen}
                // onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example Modal"
            >
                <SingleComment closeModal={closeModal} singleComment={singleComment} ></SingleComment>
            </Modal>


            <h3 className='font-bold text-center text-3xl my-8'>click on any image to see comments</h3>
            <div className='image-body w-10/12 mx-auto mt-16'>
                {
                    images && images.map(i => {
                        return (
                            <div onClick={() => openModal(i)} className='image-card cursor-pointer shadow-2xl'>
                                <img className='w-full h-[200px]' src={i.link} alt="" /><br />
                                <p className='mt-[-10px] pb-2 font-bold'>{i.name}</p>

                            </div>
                        )
                    })
                }

            </div>
        </div>
    );
};

export default Comments;