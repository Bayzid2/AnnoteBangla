import React, { useEffect, useRef, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import auth from '../Firebase.init';
import useAdmin from './useAdmin';
import Modal from 'react-modal';
import SingleComment from './SingleComment';
import { useDownloadExcel } from 'react-export-table-to-excel';

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

const AllComments = () => {
    const [images, setImages] = useState([])
    const [user, loading] = useAuthState(auth)
    const [admin, adminLoading] = useAdmin(user)
    const [singleComment, setSingleComment] = useState({})
    const [modalIsOpen, setIsOpen] = React.useState(false);
    const tableRef = useRef(null);
    const [refresh, setRefresh] = useState(false)

    useEffect(() => {
        fetch("https://piccomment.onrender.com/images")
            .then(res => res.json())
            .then(data => {
                // console.log("idata is", data);
                setImages(data)

            })
    }, [refresh])

    const { onDownload } = useDownloadExcel({
        currentTableRef: tableRef.current,
        filename: 'Comments table',
        sheet: 'Comments'
    })


    if (loading || adminLoading) {
        return <loading />
    }
    if (!admin) {
        auth.signOut()
        // navigate("/login") 

    }

    Modal.setAppElement(document.getElementById('root'));


    function openModal(i) {
        setSingleComment(i)
        setIsOpen(true);
    }


    function closeModal() {
        setIsOpen(false);
    }

    let maxArr = []
    console.log(maxArr, "max");

    const removeData = (id) => {

        fetch(`https://piccomment.onrender.com/comments/${id}`, {
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



    return (
        <div className='overflow-auto'>
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
            <div className='my-6 w-screen lg:w-11/12 mx-auto'>
                <div className="overflow-x-auto w-full flex  flex-col-reverse">
                    <div className='py-10'></div>
                    <table className="table w-full mb-14 overflow-x-auto mt-6">

                        <thead>
                            <tr>

                                <th className='text-lg'>Image</th>
                                <th className='text-lg'>id</th>
                                <th className='text-lg'>See Annotation</th>
                                <th className='text-lg'>Most Annotated</th>
                                <th className='text-lg'>Count</th>
                                <th className='text-lg'>Total Annotation</th>
                                <th className='text-lg'>Remove</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                images &&
                                images.map(u => {


                                    let arr2 = []
                                    u.comments.map(c => {
                                        c[Object.keys(c)[0]]?.map(d =>
                                            arr2.push(d)
                                            // setArr2([...arr2,d])
                                        )



                                    })


                                    function mode(array) {
                                        if (array.length == 0)
                                            return null;
                                        var modeMap = {};
                                        var maxEl = array[0], maxCount = 1;
                                        for (var i = 0; i < array.length; i++) {
                                            var el = array[i];
                                            if (modeMap[el] == null)
                                                modeMap[el] = 1;
                                            else
                                                modeMap[el]++;
                                            if (modeMap[el] > maxCount) {
                                                maxEl = el;
                                                maxCount = modeMap[el];
                                            }
                                        }
                                        return maxEl;
                                    }
                                    let allCom = mode(arr2)
                                    let num = 0
                                    for (const no of arr2) {
                                        if (no == allCom) {
                                            num = num + 1

                                        }
                                    }



                                    if ((num / arr2.length) >= 0.60) {

                                        maxArr.push(u)
                                    }


                                    return (
                                        <tr>
                                            <td className='break-all'>
                                                <td>
                                                    <div className="flex items-center space-x-3">
                                                        <div className="avatar">
                                                            <div className="mask mask-squircle w-12 h-12">
                                                                <img src={u.link} alt="Avatar Tailwind CSS Component" />
                                                            </div>
                                                        </div>

                                                    </div>
                                                </td>
                                            </td>
                                            <td className='break-all'>
                                                {u._id}
                                            </td>
                                            <td onClick={() => openModal(u)} className='break-all font-bold cursor-pointer text-blue-500'>Annotations</td>
                                            <td className='break-all text-center font-bold'>
                                                {allCom}
                                            </td>
                                            <td className='break-all text-center font-bold'>
                                                {num}
                                            </td>
                                            <td className='break-all text-center font-bold'>
                                                {arr2.length}
                                            </td>
                                            <td className='break-all font-bold'>
                                                <button className='bg-red-600 text-white px-2 py-1 rounded-lg' onClick={() => removeData(u._id)}>Remove</button>
                                            </td>
                                        </tr>

                                    )
                                })
                            }



                        </tbody>

                    </table>
                    <div>
                        <div className='mt-8 mb-8 flex justify-between items-center'>
                            <h3 className='text-3xl font-bold text-black '>Greater than 60% annotation for same image </h3>
                            <button className='mr-4 btn btn-primary' onClick={onDownload}>Download</button>
                        </div>
                        <table className="table w-full overflow-x-auto" ref={tableRef}>

                            <thead>
                                <tr>
                                    <th className='text-lg'>Id</th>
                                    <th className='text-lg'>Image name</th>
                                    <th className='text-lg'>Most Annotated</th>
                                    <th className='text-lg'>Count</th>
                                    <th className='text-lg'>Total Annotations</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    maxArr &&
                                    maxArr.map(u => {


                                        let arr2 = []
                                        u.comments.map(c => {
                                            c[Object.keys(c)[0]]?.map(d =>
                                                arr2.push(d)
                                                // setArr2([...arr2,d])
                                            )



                                        })


                                        function mode(array) {
                                            if (array.length == 0)
                                                return null;
                                            var modeMap = {};
                                            var maxEl = array[0], maxCount = 1;
                                            for (var i = 0; i < array.length; i++) {
                                                var el = array[i];
                                                if (modeMap[el] == null)
                                                    modeMap[el] = 1;
                                                else
                                                    modeMap[el]++;
                                                if (modeMap[el] > maxCount) {
                                                    maxEl = el;
                                                    maxCount = modeMap[el];
                                                }
                                            }
                                            return maxEl;
                                        }
                                        let allCom = mode(arr2)
                                        let num = 0
                                        for (const no of arr2) {
                                            if (no == allCom) {
                                                num = num + 1

                                            }
                                        }



                                        return (
                                            <>
                                                {
                                                    num > 1 &&
                                                    <tr>

                                                        <td className='break-all'>
                                                            {u._id}
                                                        </td>
                                                        <td className='break-all'>
                                                            {u.name.substring(0, 10)}
                                                        </td>

                                                        <td className='break-all font-bold text-center'>
                                                            {allCom}
                                                        </td>
                                                        <td className='break-all font-bold text-center'>
                                                            {num}
                                                        </td>
                                                        <td className='break-all font-bold text-center'>
                                                            {arr2.length}
                                                        </td>
                                                    </tr>
                                                }
                                            </>

                                        )
                                    })
                                }



                            </tbody>

                        </table>
                        <h3 className='text-2xl font-bold text-black mt-[30px]'>Annotation Details</h3>
                    </div>


                </div>

            </div>

        </div>
    );
};

export default AllComments;