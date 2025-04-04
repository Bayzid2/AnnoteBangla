import React, { useEffect, useRef, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import auth from '../Firebase.init';
import { Group, Stack, Text, Image, Progress, Button } from '@mantine/core';
import Modal from 'react-modal';
import { createWorker } from 'tesseract.js';
import "./extractAll.css"
import { dataUrlToFileUsingFetch } from './utils';
import { Dropzone, IMAGE_MIME_TYPE } from '@mantine/dropzone';
import { saveAs } from 'file-saver'

// import { toPng, toJpeg, toBlob, toPixelData, toSvg } from 'html-to-image'; 


const ExtractAll = (props) => {

    const [images, setImages] = useState([])
    const [imageNo, setImageNo] = useState(0)
    const [commentError, setCommentError] = useState("")
    const [reload, setReload] = useState(false)
    const navigate = useNavigate()
    const [user] = useAuthState(auth)
    const [success, setSuccess] = useState("")
    const [err, setErr] = useState("")
    const [arrLength, setArrLength] = useState([])
    const [color, setColor] = useState(false)
    const [inputState, setInputState] = useState(false)
    const [modalIsOpen, setIsOpen] = React.useState(false);
    const [inputValue, setInputValue] = useState("")
    const [checking, setChecking] = useState(false)
    const [reloadCheck, setReloadCheck] = useState(false)
    const [imageData, setImageData] = useState(null);
    const [progress, setProgress] = useState(0);
    const [progressLabel, setProgressLabel] = useState('idle');
    const [ocrResult, setOcrResult] = useState('');
    const workerRef = useRef(null);
    const [imgLink, setImgLink] = useState("")
    const [temi, setTemi] = useState("")
    console.log(images);

    useEffect(() => {
        fetch("https://piccomment.onrender.com/images")
            .then(res => res.json())
            .then(data => {
                // console.log("idata is", data);
                setImages(data)

            })
    }, [])

    useEffect(() => {
        if (images.length < 1 && checking) {
            navigate("/")
        }
    }, [images.length, checking])

    useEffect(() => {
        images[imageNo]?.comments?.map(c => {
            let name = ""
            Object.keys(c).forEach(f => {
                name = f
            })
            let arr = c[Object.keys(c)[0]]
            if (name == user?.displayName) {
                setArrLength(arr)
                return;

            }
        })
    }, [imageNo, images, user.displayName])

    useEffect(() => {
        if (localStorage.getItem("reload")) {
            setReloadCheck(true)
        }
    }, [])

    useEffect(() => {
        if (window.performance) {
            if (performance.navigation.type == 1 && reloadCheck) {
                navigate("/")
                localStorage.removeItem("reload")
            }
        }
    }, [reloadCheck])


    const loadFile = (file) => {
        const reader = new FileReader();
        reader.onloadend = () => {
            const imageDataUri = reader.result;
            setImageData(imageDataUri);
        };
        reader.readAsDataURL(file);
    };


    useEffect(() => {
        workerRef.current = createWorker({
            logger: message => {
                if ('progress' in message) {
                    setProgress(message.progress);
                    setProgressLabel(message.progress == 1 ? 'Done' : message.status);
                }
            }
        });
        return () => {
            workerRef.current?.terminate();
            workerRef.current = null;
        }
    }, [images, imageNo, imgLink]);

    useEffect(() => {

        if (images[imageNo]?.link) {

            setImgLink(images[imageNo].link)
            console.log(images[imageNo].link);
        }




    }, [images, imageNo])

    //     var node = document.querySelector('imgIs'); 

    // htmlToImage.toPng(node)
    // .then(function (dataUrl) { 
    //   var img = new Image();
    //   img.src = dataUrl;

    //   setTemi(img)
    //   console.log(img);   

    // })
    // .catch(function (error) {
    //   console.error('oops, something went wrong!', error);
    // }); 


    // useEffect(() => {
    // //     const linkIs = images[imageNo]?.Link
    // //     //  dataUrlToFileUsingFetch(linkIs, images[imageNo]?.name, 'image/png')
    // //     //  .then(data=>{
    // //     //     console.log(data); 
    // //     //     loadFile(data)  
    // //     //  })

    //     fetch(imgLink)
    //         .then(response => response.blob())
    //         .then(blob => new File([blob], images[imageNo]?.name, {
    //             type: "image/png" 
    //         }))
    //         .then(file => {
    //             // setFileData(file);
    //             // setPreview(URL.createObjectURL(file));
    //             const fileType = file['type'];
    //             const validImageTypes = ['image/gif', 'image/jpeg', 'image/png'];
    //             if (!validImageTypes.includes(fileType)) {
    //                 // invalid file type code goes here.

    //                 console.log("file tyel knot");
    //             }

    //             else {
    //                 loadFile(file)
    //                 console.log(file); 
    //                 console.log("file ok");

    //             }

    //         })
    //         .catch(err => {
    //             console.log(err);
    //         })
    //     // blob.type


    // }, [images, imageNo, imgLink])

    useEffect(() => {
        //    saveAs(imgLink, images[imageNo]?.name)
        // console.log(theFile); 

        // fetch(imgLink) 
        // .then(res=>{
        //     res.blob()
        //     console.log(res); 
        // })
        // .then(data=>{

        //     loadFile(data) 


        // })




    }, [images, imageNo, imgLink])


    const handleExtract = async () => {
        setProgress(0);
        setProgressLabel('starting');

        const worker = workerRef.current;
        await worker.load();
        await worker.loadLanguage('ben');
        await worker.initialize('ben');

        const response = await worker.recognize(imageData);
        setOcrResult(response.data.text);
        document.getElementById("display").innerText = response.data.text;
        console.log(response.data.text);
    };







    if (images[imageNo] == -1) {
        setImageNo(0)
    }

    const increase = e => {
        // setSuccess("")
        setErr("")
        setCommentError("")
        // e.preventDefault()
        if ((imageNo == parseInt(images.length) - 1) || imageNo >= parseInt(images.length)) {
            setImageNo(0)
        }
        else {
            setImageNo(parseInt(imageNo) + 1)
        }

    }

    const decrease = e => {
        setSuccess("")
        setErr("")
        setCommentError("")
        e.preventDefault()
        if (imageNo == 0) {
            setImageNo(parseInt(images.length) - 1)
        }
        else {
            setImageNo(parseInt(imageNo) - 1)
        }
    }


    const inputValueIs = (e) => {
        setInputValue(e.target.value)

    }

    const arr = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', "0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]

    const submitComment = async (id) => {
        localStorage.setItem("reload", "reloaded")
        setErr("")
        setCommentError("")
        setSuccess("")

        const commentText = document.querySelector("#display")?.innerText

        if (!commentText) {
            setErr("No input found!")
            return;
        }

        const commentArr = commentText.split("")
        const isEnglish = await commentArr.find(d => {
            if (arr.includes(d)) {
                // console.log("object");
                return true



            }


        })
        if (isEnglish) {
            setErr("English not allowed")
            return;
        }
        // updateComments:id
        const commentBox = {
            name: user.displayName,
            comment: commentText
        }

        if (!commentText) {
            setCommentError("Comment is empty")

        }
        else if (arrLength.length >= 10) {
            const remaining = images.filter(r => r._id != id)

            setImages(remaining)

            setCommentError("Already 10 times comments on this photo")
            setInterval(function () {
                setCommentError("")
            }, 2000);
            return;

        }
        else {
            await fetch(`https://piccomment.onrender.com/updateComments/${id}`, {
                method: "PUT",
                headers: {
                    'content-type': 'application/json',
                    // 'authorization': `Bearer ${localStorage.getItem('accessToken')}`
                },
                body: JSON.stringify(commentBox)


            })
                // .then(res=>res.json())
                .then(data => {
                    setSuccess("Annotation Saved.")
                    setErr("")
                    const remaining = images.filter(r => r._id != id)

                    setImages(remaining)
                    setChecking(true)

                    setInputValue("")
                    setInterval(function () {
                        setSuccess("")
                    }, 2000);

                    if (document.getElementById('display')) {
                        document.getElementById('display').innerText = ""
                    }

                    // increase()
                    // random
                    // setComment("")
                    // setReload(!reload)
                    // console.log(data);
                })
                .catch(err => {
                    console.log(err);
                    setErr(err.message)
                    setSuccess("")
                })
        }

    }


    Modal.setAppElement(document.getElementById('root'));

    function openModal() {
        setIsOpen(true);
    }


    function closeModal() {
        setIsOpen(false);
    }




    var xy = '';
    var FcapsLock = '0';
    var Fshift = '0';

    //Function key start

    //BackSpace
    function funcDel() {
        var valu = document.getElementById('display').innerHTML;
        var x = document.getElementById('display').innerHTML.length;
        var y = 1;
        var z = x - y;
        document.getElementById('display').innerHTML = valu.slice(0, z);
    }
    //CapsLock
    function funcCL() {
        if (FcapsLock == '0') {
            FcapsLock = '1';
            document.getElementById('cl').style.backgroundColor = 'salmon';
        } else if (FcapsLock == '1') {
            FcapsLock = '0';
            document.getElementById('cl').style.backgroundColor = 'white';
        }
    }

    //Clear
    function funcClear() {
        var valu = document.getElementById('display').innerHTML = '';
        FcapsLock = '0';
        Fshift = '0';
        document.getElementById('cl').style.backgroundColor = 'white';
    }
    //Shift
    function funcShift() {
        if (Fshift == '0') {
            Fshift = '1';
        } else if (Fshift == '1') {
            Fshift = '0';
        }
    }
    //Enter
    function funcEnter() {
        var valu = document.getElementById('display').innerHTML;
        if (valu == '') {
            // alert('Not inserted : Empty innerHTML');
            // setComment(document.getElementById('display').innerHTML)
            closeModal()
        } else {
            // setComment(document.getElementById('display').innerHTML)
            closeModal()

        }
        // display.innerHTML = '';
    }
    //Tab
    function funcTab() {
        var valu = document.getElementById('display').innerHTML;
        document.getElementById('display').innerHTML = valu + '	';
    }
    //Space
    function funcSpace() {
        var valu = document.getElementById('display').innerHTML;
        document.getElementById('display').innerHTML = valu + ' ';
    }
    //Letter keys

    //q
    function funcq() {
        var valu = document.getElementById('display').innerHTML;
        if (FcapsLock == '0') {
            if (Fshift == '0') {
                document.getElementById('display').innerHTML = valu + 'দ';
            } else if (Fshift == '1') {
                Fshift = '0';
                document.getElementById('display').innerHTML = valu + 'ধ';
            }
        } else if (FcapsLock == '1') {
            if (Fshift == '0') {
                document.getElementById('display').innerHTML = valu + 'ধ';
            } else if (Fshift == '1') {
                Fshift = '0';
                document.getElementById('display').innerHTML = valu + 'দ';
            }
        }
    }
    //w
    function funcw() {
        var valu = document.getElementById('display').innerHTML;
        if (FcapsLock == '0') {
            if (Fshift == '0') {
                document.getElementById('display').innerHTML = valu + 'ূ';
            } else if (Fshift == '1') {
                Fshift = '0';
                document.getElementById('display').innerHTML = valu + 'ঊ';
            }
        } else if (FcapsLock == '1') {
            if (Fshift == '0') {
                document.getElementById('display').innerHTML = valu + 'ঊ';
            } else if (Fshift == '1') {
                Fshift = '0';
                document.getElementById('display').innerHTML = valu + 'ূ';
            }
        }
    }
    //e
    function funce() {
        var valu = document.getElementById('display').innerHTML;
        if (FcapsLock == '0') {
            if (Fshift == '0') {
                document.getElementById('display').innerHTML = valu + 'ী';
            } else if (Fshift == '1') {
                Fshift = '0';
                document.getElementById('display').innerHTML = valu + 'ঈ';
            }
        } else if (FcapsLock == '1') {
            if (Fshift == '0') {
                document.getElementById('display').innerHTML = valu + 'ঈ';
            } else if (Fshift == '1') {
                Fshift = '0';
                document.getElementById('display').innerHTML = valu + 'ী';
            }
        }
    }
    //r
    function funcr() {
        var valu = document.getElementById('display').innerHTML;
        if (FcapsLock == '0') {
            if (Fshift == '0') {
                document.getElementById('display').innerHTML = valu + 'র';
            } else if (Fshift == '1') {
                Fshift = '0';
                document.getElementById('display').innerHTML = valu + 'ড়';
            }
        } else if (FcapsLock == '1') {
            if (Fshift == '0') {
                document.getElementById('display').innerHTML = valu + 'ড়';
            } else if (Fshift == '1') {
                Fshift = '0';
                document.getElementById('display').innerHTML = valu + 'র';
            }
        }
    }
    //t
    function funct() {
        var valu = document.getElementById('display').innerHTML;
        if (FcapsLock == '0') {
            if (Fshift == '0') {
                document.getElementById('display').innerHTML = valu + 'ট';
            } else if (Fshift == '1') {
                Fshift = '0';
                document.getElementById('display').innerHTML = valu + 'ঠ';
            }
        } else if (FcapsLock == '1') {
            if (Fshift == '0') {
                document.getElementById('display').innerHTML = valu + 'ঠ';
            } else if (Fshift == '1') {
                Fshift = '0';
                document.getElementById('display').innerHTML = valu + 'ট';
            }
        }
    }
    //y
    function funcy() {
        var valu = document.getElementById('display').innerHTML;
        if (FcapsLock == '0') {
            if (Fshift == '0') {
                document.getElementById('display').innerHTML = valu + 'এ';
            } else if (Fshift == '1') {
                Fshift = '0';
                document.getElementById('display').innerHTML = valu + 'ঐ';
            }
        } else if (FcapsLock == '1') {
            if (Fshift == '0') {
                document.getElementById('display').innerHTML = valu + 'ঐ';
            } else if (Fshift == '1') {
                Fshift = '0';
                document.getElementById('display').innerHTML = valu + 'এ';
            }
        }
    }
    //u
    function funcu() {
        var valu = document.getElementById('display').innerHTML;
        if (FcapsLock == '0') {
            if (Fshift == '0') {
                document.getElementById('display').innerHTML = valu + 'ু';
            } else if (Fshift == '1') {
                Fshift = '0';
                document.getElementById('display').innerHTML = valu + 'উ';
            }
        } else if (FcapsLock == '1') {
            if (Fshift == '0') {
                document.getElementById('display').innerHTML = valu + 'উ';
            } else if (Fshift == '1') {
                Fshift = '0';
                document.getElementById('display').innerHTML = valu + 'ু';
            }
        }
    }
    //i
    function funci() {
        var valu = document.getElementById('display').innerHTML;
        if (FcapsLock == '0') {
            if (Fshift == '0') {
                document.getElementById('display').innerHTML = valu + 'ি';
            } else if (Fshift == '1') {
                Fshift = '0';
                document.getElementById('display').innerHTML = valu + 'ই';
            }
        } else if (FcapsLock == '1') {
            if (Fshift == '0') {
                document.getElementById('display').innerHTML = valu + 'ই';
            } else if (Fshift == '1') {
                Fshift = '0';
                document.getElementById('display').innerHTML = valu + 'ি';
            }
        }
    }
    //o
    function funco() {
        var valu = document.getElementById('display').innerHTML;
        if (FcapsLock == '0') {
            if (Fshift == '0') {
                document.getElementById('display').innerHTML = valu + 'ও';
            } else if (Fshift == '1') {
                Fshift = '0';
                document.getElementById('display').innerHTML = valu + 'ঔ';
            }
        } else if (FcapsLock == '1') {
            if (Fshift == '0') {
                document.getElementById('display').innerHTML = valu + 'ঔ';
            } else if (Fshift == '1') {
                Fshift = '0';
                document.getElementById('display').innerHTML = valu + 'ও';
            }
        }
    }
    //p
    function funcp() {
        var valu = document.getElementById('display').innerHTML;
        if (FcapsLock == '0') {
            if (Fshift == '0') {
                document.getElementById('display').innerHTML = valu + 'প';
            } else if (Fshift == '1') {
                Fshift = '0';
                document.getElementById('display').innerHTML = valu + 'ফ';
            }
        } else if (FcapsLock == '1') {
            if (Fshift == '0') {
                document.getElementById('display').innerHTML = valu + 'ফ';
            } else if (Fshift == '1') {
                Fshift = '0';
                document.getElementById('display').innerHTML = valu + 'প';
            }
        }
    }
    //a
    function funca() {
        var valu = document.getElementById('display').innerHTML;
        if (FcapsLock == '0') {
            if (Fshift == '0') {
                document.getElementById('display').innerHTML = valu + 'া';
            } else if (Fshift == '1') {
                Fshift = '0';
                document.getElementById('display').innerHTML = valu + 'অ';
            }
        } else if (FcapsLock == '1') {
            if (Fshift == '0') {
                document.getElementById('display').innerHTML = valu + 'অ';
            } else if (Fshift == '1') {
                Fshift = '0';
                document.getElementById('display').innerHTML = valu + 'aা';
            }
        }
    }
    //s
    function funcs() {
        var valu = document.getElementById('display').innerHTML;
        if (FcapsLock == '0') {
            if (Fshift == '0') {
                document.getElementById('display').innerHTML = valu + 'স';
            } else if (Fshift == '1') {
                Fshift = '0';
                document.getElementById('display').innerHTML = valu + 'ষ';
            }
        } else if (FcapsLock == '1') {
            if (Fshift == '0') {
                document.getElementById('display').innerHTML = valu + 'ষ';
            } else if (Fshift == '1') {
                Fshift = '0';
                document.getElementById('display').innerHTML = valu + 'স';
            }
        }
    }
    //d
    function funcd() {
        var valu = document.getElementById('display').innerHTML;
        if (FcapsLock == '0') {
            if (Fshift == '0') {
                document.getElementById('display').innerHTML = valu + 'ড';
            } else if (Fshift == '1') {
                Fshift = '0';
                document.getElementById('display').innerHTML = valu + 'ঢ';
            }
        } else if (FcapsLock == '1') {
            if (Fshift == '0') {
                document.getElementById('display').innerHTML = valu + 'ঢ';
            } else if (Fshift == '1') {
                Fshift = '0';
                document.getElementById('display').innerHTML = valu + 'ড';
            }
        }
    }
    //f
    function funcf() {
        var valu = document.getElementById('display').innerHTML;
        if (FcapsLock == '0') {
            if (Fshift == '0') {
                document.getElementById('display').innerHTML = valu + 'ত';
            } else if (Fshift == '1') {
                Fshift = '0';
                document.getElementById('display').innerHTML = valu + 'থ';
            }
        } else if (FcapsLock == '1') {
            if (Fshift == '0') {
                document.getElementById('display').innerHTML = valu + 'থ';
            } else if (Fshift == '1') {
                Fshift = '0';
                document.getElementById('display').innerHTML = valu + 'ত';
            }
        }
    }
    //g
    function funcg() {
        var valu = document.getElementById('display').innerHTML;
        if (FcapsLock == '0') {
            if (Fshift == '0') {
                document.getElementById('display').innerHTML = valu + 'গ';
            } else if (Fshift == '1') {
                Fshift = '0';
                document.getElementById('display').innerHTML = valu + 'ঘ';
            }
        } else if (FcapsLock == '1') {
            if (Fshift == '0') {
                document.getElementById('display').innerHTML = valu + 'ঘ';
            } else if (Fshift == '1') {
                Fshift = '0';
                document.getElementById('display').innerHTML = valu + 'গ';
            }
        }
    }
    //h
    function funch() {
        var valu = document.getElementById('display').innerHTML;
        if (FcapsLock == '0') {
            if (Fshift == '0') {
                document.getElementById('display').innerHTML = valu + 'হ';
            } else if (Fshift == '1') {
                Fshift = '0';
                document.getElementById('display').innerHTML = valu + 'ঃ';
            }
        } else if (FcapsLock == '1') {
            if (Fshift == '0') {
                document.getElementById('display').innerHTML = valu + 'ঃ';
            } else if (Fshift == '1') {
                Fshift = '0';
                document.getElementById('display').innerHTML = valu + 'হ';
            }
        }
    }
    //j
    function funcj() {
        var valu = document.getElementById('display').innerHTML;
        if (FcapsLock == '0') {
            if (Fshift == '0') {
                document.getElementById('display').innerHTML = valu + 'জ';

            } else if (Fshift == '1') {
                Fshift = '0';
                document.getElementById('display').innerHTML = valu + 'ঝ';
            }
        } else if (FcapsLock == '1') {
            if (Fshift == '0') {
                document.getElementById('display').innerHTML = valu + 'ঝ';
            } else if (Fshift == '1') {
                Fshift = '0';
                document.getElementById('display').innerHTML = valu + 'জ';
            }
        }
    }

    //k
    function funck() {
        var valu = document.getElementById('display').innerHTML;
        if (FcapsLock == '0') {
            if (Fshift == '0') {
                document.getElementById('display').innerHTML = valu + 'ক';
            } else if (Fshift == '1') {
                Fshift = '0';
                document.getElementById('display').innerHTML = valu + 'খ';
            }
        } else if (FcapsLock == '1') {
            if (Fshift == '0') {
                document.getElementById('display').innerHTML = valu + 'খ';
            } else if (Fshift == '1') {
                Fshift = '0';
                document.getElementById('display').innerHTML = valu + 'ক';
            }
        }
    }
    //l
    function funcl() {
        var valu = document.getElementById('display').innerHTML;
        if (FcapsLock == '0') {
            if (Fshift == '0') {
                document.getElementById('display').innerHTML = valu + 'ল';
            } else if (Fshift == '1') {
                Fshift = '0';
                document.getElementById('display').innerHTML = valu + 'ং';
            }
        } else if (FcapsLock == '1') {
            if (Fshift == '0') {
                document.getElementById('display').innerHTML = valu + 'ং';
            } else if (Fshift == '1') {
                Fshift = '0';
                document.getElementById('display').innerHTML = valu + 'ল';
            }
        }
    }

    //z
    function funcz() {
        var valu = document.getElementById('display').innerHTML;
        if (FcapsLock == '0') {
            if (Fshift == '0') {
                document.getElementById('display').innerHTML = valu + 'য়';
            } else if (Fshift == '1') {
                Fshift = '0';
                document.getElementById('display').innerHTML = valu + 'য';
            }
        } else if (FcapsLock == '1') {
            if (Fshift == '0') {
                document.getElementById('display').innerHTML = valu + 'য';
            } else if (Fshift == '1') {
                Fshift = '0';
                document.getElementById('display').innerHTML = valu + 'য়';
            }
        }
    }
    //x
    function funcx() {
        var valu = document.getElementById('display').innerHTML;
        if (FcapsLock == '0') {
            if (Fshift == '0') {
                document.getElementById('display').innerHTML = valu + 'শ';
            } else if (Fshift == '1') {
                Fshift = '0';
                document.getElementById('display').innerHTML = valu + 'ঢ়';
            }
        } else if (FcapsLock == '1') {
            if (Fshift == '0') {
                document.getElementById('display').innerHTML = valu + 'ঢ়';
            } else if (Fshift == '1') {
                Fshift = '0';
                document.getElementById('display').innerHTML = valu + 'শ';
            }
        }
    }
    //c
    function funcc() {
        var valu = document.getElementById('display').innerHTML;
        if (FcapsLock == '0') {
            if (Fshift == '0') {
                document.getElementById('display').innerHTML = valu + 'চ';
            } else if (Fshift == '1') {
                Fshift = '0';
                document.getElementById('display').innerHTML = valu + 'ছ';
            }
        } else if (FcapsLock == '1') {
            if (Fshift == '0') {
                document.getElementById('display').innerHTML = valu + 'ছ';
            } else if (Fshift == '1') {
                Fshift = '0';
                document.getElementById('display').innerHTML = valu + 'ছ';
            }
        }
    }
    //v
    function funcv() {
        var valu = document.getElementById('display').innerHTML;
        if (FcapsLock == '0') {
            if (Fshift == '0') {
                document.getElementById('display').innerHTML = valu + 'আ';
            } else if (Fshift == '1') {
                Fshift = '0';
                document.getElementById('display').innerHTML = valu + 'ঋ';
            }
        } else if (FcapsLock == '1') {
            if (Fshift == '0') {
                document.getElementById('display').innerHTML = valu + 'ঋ';
            } else if (Fshift == '1') {
                Fshift = '0';
                document.getElementById('display').innerHTML = valu + 'আ';
            }
        }
    }
    //b
    function funcb() {
        var valu = document.getElementById('display').innerHTML;
        if (FcapsLock == '0') {
            if (Fshift == '0') {
                document.getElementById('display').innerHTML = valu + 'ব';
            } else if (Fshift == '1') {
                Fshift = '0';
                document.getElementById('display').innerHTML = valu + 'ভ';
            }
        } else if (FcapsLock == '1') {
            if (Fshift == '0') {
                document.getElementById('display').innerHTML = valu + 'ভ';
            } else if (Fshift == '1') {
                Fshift = '0';
                document.getElementById('display').innerHTML = valu + 'ব';
            }
        }
    }
    //n
    function funcn() {
        var valu = document.getElementById('display').innerHTML;
        if (FcapsLock == '0') {
            if (Fshift == '0') {
                document.getElementById('display').innerHTML = valu + 'ন';
            } else if (Fshift == '1') {
                Fshift = '0';
                document.getElementById('display').innerHTML = valu + 'ণ';
            }
        } else if (FcapsLock == '1') {
            if (Fshift == '0') {
                document.getElementById('display').innerHTML = valu + 'ণ';
            } else if (Fshift == '1') {
                Fshift = '0';
                document.getElementById('display').innerHTML = valu + 'ন';
            }
        }
    }
    //m
    function funcm() {
        var valu = document.getElementById('display').innerHTML;
        if (FcapsLock == '0') {
            if (Fshift == '0') {
                document.getElementById('display').innerHTML = valu + 'ম';
            } else if (Fshift == '1') {
                Fshift = '0';
                document.getElementById('display').innerHTML = valu + 'ঙ';
            }
        } else if (FcapsLock == '1') {
            if (Fshift == '0') {
                document.getElementById('display').innerHTML = valu + 'ঙ';
            } else if (Fshift == '1') {
                Fshift = '0';
                document.getElementById('display').innerHTML = valu + 'ম';
            }
        }
    }
    //Number Keys
    //1
    function func1() {
        var valu = document.getElementById('display').innerHTML;
        if (Fshift == '0') {
            document.getElementById('display').innerHTML = valu + '১';
        } else if (Fshift = '1') {
            Fshift = '0';
            document.getElementById('display').innerHTML = valu + '!';
        }
    }
    //2
    function func2() {
        var valu = document.getElementById('display').innerHTML;
        if (Fshift == '0') {
            document.getElementById('display').innerHTML = valu + '২';
        } else if (Fshift = '1') {
            Fshift = '0';
            document.getElementById('display').innerHTML = valu + '@';
        }
    }
    //3
    function func3() {
        var valu = document.getElementById('display').innerHTML;
        if (Fshift == '0') {
            document.getElementById('display').innerHTML = valu + '৩';
        } else if (Fshift = '1') {
            Fshift = '0';
            document.getElementById('display').innerHTML = valu + '#';
        }
    }
    //4
    function func4() {
        var valu = document.getElementById('display').innerHTML;
        if (Fshift == '0') {
            document.getElementById('display').innerHTML = valu + '৪';
        } else if (Fshift = '1') {
            Fshift = '0';
            document.getElementById('display').innerHTML = valu + '$';
        }
    }
    //5
    function func5() {
        var valu = document.getElementById('display').innerHTML;
        if (Fshift == '0') {
            document.getElementById('display').innerHTML = valu + '৫';
        } else if (Fshift = '1') {
            Fshift = '0';
            document.getElementById('display').innerHTML = valu + '%';
        }
    }
    //6
    function func6() {
        var valu = document.getElementById('display').innerHTML;
        if (Fshift == '0') {
            document.getElementById('display').innerHTML = valu + '৬';
        } else if (Fshift = '1') {
            Fshift = '0';
            document.getElementById('display').innerHTML = valu + '^';
        }
    }
    //7
    function func7() {
        var valu = document.getElementById('display').innerHTML;
        if (Fshift == '0') {
            document.getElementById('display').innerHTML = valu + '৭';
        } else if (Fshift = '1') {
            Fshift = '0';
            document.getElementById('display').innerHTML = valu + '&';
        }
    }
    //8
    function func8() {
        var valu = document.getElementById('display').innerHTML;
        if (Fshift == '0') {
            document.getElementById('display').innerHTML = valu + '৮';
        } else if (Fshift = '1') {
            Fshift = '0';
            document.getElementById('display').innerHTML = valu + '*';
        }
    }
    //9
    function func9() {
        var valu = document.getElementById('display').innerHTML;
        if (Fshift == '0') {
            document.getElementById('display').innerHTML = valu + '৯';
        } else if (Fshift = '1') {
            Fshift = '0';
            document.getElementById('display').innerHTML = valu + '(';
        }
    }
    //0
    function func0() {
        var valu = document.getElementById('display').innerHTML;
        if (Fshift == '0') {
            document.getElementById('display').innerHTML = valu + '০';
        } else if (Fshift = '1') {
            Fshift = '0';
            document.getElementById('display').innerHTML = valu + ')';
        }
    }
    //Special keys
    function funcSc1() {
        var valu = document.getElementById('display').innerHTML;
        if (Fshift == '0') {
            document.getElementById('display').innerHTML = valu + '`';
        } else if (Fshift = '1') {
            Fshift = '0';
            document.getElementById('display').innerHTML = valu + '~';
        }
    }
    function funcSc2() {
        var valu = document.getElementById('display').innerHTML;
        if (Fshift == '0') {
            document.getElementById('display').innerHTML = valu + '_';
        } else if (Fshift = '1') {
            Fshift = '0';
            document.getElementById('display').innerHTML = valu + '-';
        }
    }
    function funcSc3() {
        var valu = document.getElementById('display').innerHTML;
        if (Fshift == '0') {
            document.getElementById('display').innerHTML = valu + 'ে';
        } else if (Fshift = '1') {
            Fshift = '0';
            document.getElementById('display').innerHTML = valu + 'ৈ';
        }
    }
    function funcSc4() {
        var valu = document.getElementById('display').innerHTML;
        if (Fshift == '0') {
            document.getElementById('display').innerHTML = valu + 'ো';
        } else if (Fshift = '1') {
            Fshift = '0';
            document.getElementById('display').innerHTML = valu + 'ৌ';
        }
    }
    function funcSc5() {
        var valu = document.getElementById('display').innerHTML;
        if (Fshift == '0') {
            document.getElementById('display').innerHTML = valu + '\\';
        } else if (Fshift = '1') {
            Fshift = '0';
            document.getElementById('display').innerHTML = valu + '|';
        }
    }
    function funcSc6() {
        var valu = document.getElementById('display').innerHTML;
        if (Fshift == '0') {
            document.getElementById('display').innerHTML = valu + ';';
        } else if (Fshift = '1') {
            Fshift = '0';
            document.getElementById('display').innerHTML = valu + ':';
        }
    }
    function funcSc7() {
        var valu = document.getElementById('display').innerHTML;
        if (Fshift == '0') {
            document.getElementById('display').innerHTML = valu + 'ৃ';
        } else if (Fshift = '1') {
            Fshift = '0';
            document.getElementById('display').innerHTML = valu + '্';
        }
    }
    function funcSc8() {
        var valu = document.getElementById('display').innerHTML;
        if (Fshift == '0') {
            document.getElementById('display').innerHTML = valu + '্';
        } else if (Fshift = '1') {
            Fshift = '0';
            document.getElementById('display').innerHTML = valu + '্';
        }
    }
    function funcSc9() {
        var valu = document.getElementById('display').innerHTML;
        if (Fshift == '0') {
            document.getElementById('display').innerHTML = valu + '/';
        } else if (Fshift = '1') {
            Fshift = '0';
            document.getElementById('display').innerHTML = valu + '?';
        }
    }
    function funcDot() {
        var valu = document.getElementById('display').innerHTML;
        if (Fshift == '0') {
            document.getElementById('display').innerHTML = valu + '্';
        } else if (Fshift = '1') {
            Fshift = '0';
            document.getElementById('display').innerHTML = valu + '্';
        }
    }


    return (
        <div>
            <div className='relative'>

                <div class="mt-8 mx-6 ">
                    <div class="flex justify-evenly items-center flex-col lg:flex-row">

                        {/* <Group align='initial' style={{ padding: '10px' }}>
            <Stack style={{ flex: '1' }}>
                <Dropzone
                    onDrop={(files) => {

                        loadFile(files[0])
                        // setImg(files[0])

                    }}
                    accept={IMAGE_MIME_TYPE}
                    multiple={false}
                >{() => (
                    <Text size="xl" inline className=' ! text-red-500'>
                        Drag image here or click to select file 
                    </Text>
                )}</Dropzone>

                {!!imageData && <Image src={imageData} style={{ width: 'auto', height:"400px", border:"2px solid black" }} />}
            </Stack>

            <Stack style={{ flex: '1' }} >
                <button disabled={!imageData || !workerRef.current} className="! bg-blue-600 " onClick={handleExtract}>Extract</button>
                <Text>{progressLabel.toUpperCase()}</Text>
                <Progress value={progress * 100} /> 

                {!!ocrResult && <Stack>
                    <Text size='xl'>RESULT</Text>
                    <Text style={{ fontFamily: 'monospace', background: 'black', padding: '10px', color: "white" }}>{ocrResult}</Text>
                </Stack>}
            </Stack>
        </Group> */}

                        <div class="card flex-shrink-0 w-full max-w-sm shadow-md picCard">

                            {/* <img src={temi} alt="dfdf" /> */}
                            <div class="card-body p-3 ">
                                <div>

                                    {
                                        images[imageNo] ?
                                            <>
                                                <p className='font-bold my-2'>{images[imageNo].name} </p>
                                                <img className='h-auto w-[300px] mx-auto imgIs' src={images[imageNo].link} alt="" />


                                                <p className='my-2'><span className="font-bold">{imageNo + 1}</span> of <span className="font-bold">{images.length}</span> </p>
                                            </>
                                            :
                                            <>

                                                "Click skip to navigate"
                                            </>
                                    }
                                </div>
                                <div className='text-center mx-auto '>
                                    {/* <button disabled={images.length < 2} className='bg-[#C8CACD] py-2 px-4 rounded-md block' onClick={decrease}>Previous</button> */}
                                    <button disabled={images.length < 2} className='bg-[#C8CACD] py-2 px-4 rounded-md block' onClick={increase}>Skip</button>

                                </div>

                            </div>
                        </div>
                        <div class="text-center lg:text-left w-[300px]">
                            <div>
                                <Stack>
                                    <Button disabled={!imageData || !workerRef.current} style={{ backgroundColor: "blue" }} onClick={handleExtract}>Extract</Button>
                                    <Text>{progressLabel.toUpperCase()}</Text>
                                    <Progress value={progress * 100} style={{ marginBottom: "8px" }} />

                                    {!!ocrResult && <Stack>
                                        <Text size='xl'>RESULT</Text>
                                        <Text style={{ fontFamily: 'monospace', background: 'black', padding: '10px', color: "white" }}>{ocrResult}</Text>
                                    </Stack>}
                                </Stack>
                            </div>
                            <div className='flex items-center'>
                                {/* {!inputState ? <input type="text" value={inputValue} name="" id="" className='py-4 px-6' onChange={inputValueIs} /> :
                                    <div className='display h-[60px]  flex items-center  bg-slate-300 text-black font-bold text-left  px-2 mx-auto mt-6 mb-3'
                                    //   onClick={
                                    //     () => {
                                    //         openModal()
                                    //         setSuccess("")
                                    //         setErr("")
                                    //     }
                                    // }
                                    >
                                        <p id="display" className=' display text-xl w-[230px]'> </p>

                                    </div>

                                } */}


                                <div className='display max-h-[100px] min-h-[50px]  overflow-auto flex  items-center  bg-slate-300 text-black font-bold text-left  px-2 mx-auto mt-4 mb-3'
                                //   onClick={
                                //     () => {
                                //         openModal()
                                //         setSuccess("")
                                //         setErr("")
                                //     }
                                // }
                                >
                                    <p id="display" className=' display  w-[230px] text-sm'> </p>

                                </div>

                                <button className='whitespace-nowrap mx-4 bg-cyan-600 py-3 text-white px-2 rounded' onClick={
                                    () => {
                                        setSuccess("")
                                        setErr("")
                                        if (modalIsOpen) {
                                            setInputState(false)
                                            document.querySelector("#display").innerText = ""
                                            closeModal()
                                        }
                                        else {
                                            openModal()
                                            setInputState(true)
                                            setInputValue("")
                                        }

                                    }
                                }
                                >{modalIsOpen ? "Close keyboard" : "Open kewboard"}</button>
                            </div>

                            <div>
                                <p className='text-primary font-semibold'>{success}</p>
                                <p className='text-red-400 font-semibold'>{err}</p>
                                <p className='text-red-400 font-semibold'>{commentError}</p>
                                <button className='bg-[#3274D6] text-white my-4 py-3 px-10 font-semibold text-lg rounded-md' onClick={() => submitComment(images[imageNo]._id)}>Submit</button> <br />
                            </div>



                        </div>
                    </div>
                </div>


                <div className='my-6'>
                    {
                        modalIsOpen &&
                        <div>
                            <div class="container">
                                <div class="Keyboard">
                                    {/* <div class="display" id="display"> */}

                                    {/* </div> */}

                                    <div class="buttons">
                                        <div class="row_1">
                                            <button onClick={funcSc1} class="key">`<sup>~</sup></button>
                                            <button onClick={func1} class="key">১<sup>!</sup></button>
                                            <button onClick={func2} class="key">২<sup>@</sup></button>
                                            <button onClick={func3} class="key">৩<sup>#</sup></button>
                                            <button onClick={func4} class="key">৪<sup>$</sup></button>
                                            <button onClick={func5} class="key">৫<sup>%</sup></button>
                                            <button onClick={func6} class="key">৬<sup>^</sup></button>
                                            <button onClick={func7} class="key">৭<sup>&</sup></button>
                                            <button onClick={func8} class="key">৮<sup>*</sup></button>
                                            <button onClick={func9} class="key">৯<sup>(</sup></button>
                                            <button onClick={func0} class="key">০<sup>)</sup></button>
                                            <button onClick={funcSc2} class="key">_<sup>-</sup></button>
                                            <button onClick={funcDel} class="BackSpace">BackSpace</button>
                                        </div>

                                        <div class="row_2">
                                            <button onClick={funcTab} class="key">Tab</button>
                                            <button onClick={funcq} class="key">দ<sup>ধ</sup></button>
                                            <button onClick={funcw} class="key">ূ<sup>ঊ</sup></button>
                                            <button onClick={funce} class="key">ী<sup>ঈ</sup></button>
                                            <button onClick={funcr} class="key">র<sup>ড়</sup></button>
                                            <button onClick={funct} class="key">ট<sup>ঠ</sup></button>
                                            <button onClick={funcy} class="key">এ<sup>ঐ</sup></button>
                                            <button onClick={funcu} class="key">ু<sup>উ</sup></button>
                                            <button onClick={funci} class="key">ি<sup>ই</sup></button>
                                            <button onClick={funco} class="key">ও<sup>ঔ</sup></button>
                                            <button onClick={funcp} class="key">প<sup>ফ</sup></button>
                                            <button onClick={funcSc3} class="key">ে<sup>ৈ</sup></button>
                                            <button onClick={funcSc4} class="key">ো<sup>ৌ</sup></button>
                                            <button onClick={funcSc5} class="key">\<sup>|</sup></button>
                                        </div>

                                        <div class="row_3">
                                            <button onClick={funcCL} class="CapsLock" id="cl">CapsLock<sup>|</sup></button>
                                            <button onClick={funca} class="key">া<sup>অ</sup></button>
                                            <button onClick={funcs} class="key">স<sup>ষ</sup></button>
                                            <button onClick={funcd} class="key">ড<sup>ঢ</sup></button>
                                            <button onClick={funcf} class="key">ত<sup>থ</sup></button>
                                            <button onClick={funcg} class="key">গ<sup>ঘ</sup></button>
                                            <button onClick={funch} class="key">হ<sup> ঃ</sup></button>
                                            <button onClick={funcj} class="key">জ<sup>ঝ</sup></button>
                                            <button onClick={funck} class="key">ক<sup>খ</sup></button>
                                            <button onClick={funcl} class="key">ল<sup>ং</sup></button>
                                            <button onClick={funcSc6} class="key">;<sup>:</sup></button>
                                            <button onClick={funcSc7} class="key">'<sup>"</sup></button>
                                            <button onClick={funcEnter} class="enter">enter</button>
                                        </div>

                                        <div class="row_4">
                                            <button onClick={funcClear} class="Shift">Clear</button>
                                            <button onClick={funcz} class="key">য়<sup>য</sup></button>
                                            <button onClick={funcx} class="key">শ<sup>ঢ়</sup></button>
                                            <button onClick={funcc} class="key">চ<sup>ছ</sup></button>
                                            <button onClick={funcv} class="key">আ<sup>ঋ</sup></button>
                                            <button onClick={funcb} class="key">ব<sup>ভ</sup></button>
                                            <button onClick={funcn} class="key">ন<sup>ণ</sup></button>
                                            <button onClick={funcm} class="key">ম<sup>ঙ</sup></button>
                                            <button onClick={funcSc8} class="key">ৃ</button>
                                            <button onClick={funcDot} class="key">্</button>
                                            <button onClick={funcSc9} class="key">/<sup>?</sup></button>
                                            <button onClick={funcShift} class="Shift">Shift</button>
                                        </div>

                                        <div class="row_5">
                                            <button onClick={funcSpace} class="Space">Space</button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    }
                </div>

            </div>
        </div>
    )

};

export default ExtractAll;


