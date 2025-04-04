import React, { useState } from "react";
import Cropper from "react-cropper";
import { dataUrlToFile, dataUrlToFileUsingFetch } from "./utils";
import "cropperjs/dist/cropper.css";
import "./Demo.css";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import auth, { storage } from "../Firebase.init";
import Keyboard from "./Keyboard";
import { useAuthState } from "react-firebase-hooks/auth";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const defaultSrc =
    "https://raw.githubusercontent.com/roadmanfong/react-cropper/master/example/img/child.jpg";

export const Demo = () => {
    const [user] = useAuthState(auth)
    const [image, setImage] = useState();
    const [cropData, setCropData] = useState("#");
    const [cropper, setCropper] = useState();
    const [fileName, setFileName] = useState("")
    const [success, setSuccess] = useState("")
    const [error, setError] = useState("")
    const [open, setOpen] = React.useState(false);
    const [text, setText] = useState("")
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const onChange = (e) => {
        e.preventDefault();
        setFileName(e.target.files[0].name)
        let files;
        if (e.dataTransfer) {
            files = e.dataTransfer.files;
        } else if (e.target) {
            files = e.target.files;
        }
        const reader = new FileReader();
        reader.onload = () => {
            setImage(reader.result);

        };
        reader.readAsDataURL(files[0]);
    };
    console.log(fileName);

  

    const getCropData = () => {
        if (typeof cropper !== "undefined") {
            setCropData(cropper.getCroppedCanvas().toDataURL());
        }
    };

    const handleUpload = async (url) => {
        if (!text) {
            setError("comment null")
            return;
        }

        // const file = dataUrlToFile(url, "output.png");
        const file = await dataUrlToFileUsingFetch(url, fileName, 'image/png')
        const storageRef = ref(storage, `/temImage/${fileName}`)
        const uploadTask = uploadBytesResumable(storageRef, file);
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
                    const userIs = user.displayName
                    const data = {
                        name: fileName,
                        link: url,
                        comments: [
                            { [userIs]: [text] }
                        ]
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
                            console.log(err);
                            setSuccess("")
                            setError(err)
                        })

                });
            }
        );


    };

    return (
        <div className="py-2">
            <div style={{ width: "100%" }}>
                <input type="file" onChange={onChange} />

                <br />
                <Cropper
                    style={{ height: "400px", width: "100%", marginTop:"10px" }} 
                    zoomTo={0.5}
                    initialAspectRatio={1}
                    preview=".img-preview"
                    src={image}
                    viewMode={1}
                    minCropBoxHeight={10}
                    minCropBoxWidth={10}
                    background={false}
                    responsive={true}
                    autoCropArea={1}
                    checkOrientation={false} // https://github.com/fengyuanchen/cropperjs/issues/671
                    onInitialized={(instance) => {
                        setCropper(instance);
                    }}
                    guides={true}
                />
            </div>
            {
                image &&
                <div className="flex flex-wrap justify-between align-top my-2">
                    <div className="box" style={{ width: "50%", float: "right" }}>
                        <h1 className="mb-8 font-bold">Preview</h1>
                        <div
                            className="img-preview"
                            style={{ width: "100%", float: "left", height: "300px" }}
                        />
                    </div>
                    <div
                        className="box"
                        style={{ width: "50%", float: "right", height: "300px" }}
                    >
                        <h1 className="text-center w-full flex justify-between flex-wrap">
                            {/* <span>Crop</span> */}
                            <button className="bg-blue-500 py-2 px-6 rounded mx-4 text-white mb-4" style={{ float: "" }} onClick={getCropData}>
                                Crop Image
                            </button>
                            {
                                cropData &&
                                <div className="h-[40px]  rounded w-[180px] text-white font-bold" > <label for="my-modal" onClick={handleOpen} className="block cursor-pointer w-full h-full rounded  bg-slate-400">{text}</label></div>
                            }
                            {cropData && (
                                <button className="bg-blue-500 py-2 px-6 rounded mx-4 text-white mb-4"
                                    style={{ float: "right" }}
                                    onClick={() => handleUpload(cropData)}
                                >
                                    Upload
                                </button>
                            )}
                        </h1>
                        <p className="mb-2 text-green-500 font-bold text-center">{success}</p>
                        <p className="mb-2 text-red-500 font-bold text-center">{error}</p>
                        <img style={{ width: "100%" }} src={cropData} alt="cropped" />
                    </div>
                </div>
            }
            <br style={{ clear: "both" }} />

            {/* <label htmlFor="my-modal" className="btn modal-button">open modal</label> */}


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

export default Demo;
