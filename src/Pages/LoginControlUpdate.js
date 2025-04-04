import { useEffect, useRef, useState } from 'react';
import { Group, Stack, Text, Image, Progress, Button } from '@mantine/core';
import { Dropzone, IMAGE_MIME_TYPE } from '@mantine/dropzone';
import { createWorker } from 'tesseract.js';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import auth, { storage } from '../Firebase.init';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';

const Home = (props) => {
    const [imageData, setImageData] = useState(null);
    const [img, setImg] = useState()
    const [success, setSuccess] = useState("")
    const [error, setError] = useState("")
    const [user] = useAuthState(auth)
    const navigate = useNavigate()

    const loadFile = (file) => {
        const reader = new FileReader();
        reader.onloadend = () => {
            const imageDataUri = reader.result;
            setImageData(imageDataUri);
        };
        reader.readAsDataURL(file);
    };
    const crop = () => {
        navigate("/login-control-crop")
    }

    const [progress, setProgress] = useState(0);
    const [progressLabel, setProgressLabel] = useState('idle');  
    const [ocrResult, setOcrResult] = useState('');
    const workerRef = useRef(null);

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
    }, []);

    useEffect(() => {
        if (props.imagLog) {
            loadFile(props.imagLog)
            setImg(props.imagLog)
        }
    }, [props.imagLog])



    const handleExtract = async () => {
        setProgress(0);
        setProgressLabel('starting');

        const worker = workerRef.current;
        await worker.load();
        await worker.loadLanguage('ben');
        await worker.initialize('ben');

        const response = await worker.recognize(imageData);
        setOcrResult(response.data.text);
        console.log(response.data);
    };


    const submitData = async () => {
        if (!ocrResult) {
            setError("text null")
            return;
        }

        const storageRef = ref(storage, `/loginImages/${img.name}`)
        const uploadTask = uploadBytesResumable(storageRef, img);
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
                 
                  
                    const photoData={
                        name:img.name,
                        link:url,
                        comment:ocrResult,
            
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

    return (<>
        <div className='text-center pt-2'>
            <h2 className='text-3xl font-bold'>Images for sign up</h2>
            <p className='my-2'><button onClick={crop} className='border-none bg-inherit font-bold text-blue-600 mb-6'>Crop image</button> here</p>

        </div>
        <Group align='initial' style={{ padding: '10px' }}>
            <Stack style={{ flex: '1' }}>
                <Dropzone
                    onDrop={(files) => {
                        loadFile(files[0])
                        setImg(files[0])
                    }}
                    accept={IMAGE_MIME_TYPE}
                    multiple={false}
                >{() => (
                    <Text size="xl" inline className=' ! text-red-500'>
                        Drag image here or click to select file
                    </Text>
                )}</Dropzone>

                {!!imageData && <Image src={imageData} style={{ width: 'auto', height:"400px", border:"2px solid black" }}  />}
            </Stack>

            <Stack style={{ flex: '1' }}> 
                <Button disabled={!imageData || !workerRef.current} onClick={handleExtract}>Extract</Button>
                <Text>{progressLabel.toUpperCase()}</Text>
                <Progress value={progress * 100} />

                {!!ocrResult && <Stack>
                    <Text size='xl'>RESULT</Text>
                    <Text style={{ fontFamily: 'monospace', background: 'black', padding: '10px', color: "white" }}>{ocrResult}</Text>
                </Stack>}
            </Stack>
        </Group>

        <div className='text-left w-fit mb-10'>
            <div>
                <p className="my-2 text-green-500 font-bold text-center">{success}</p>
                <p className="my-2 text-red-500 font-bold text-center">{error}</p>
            </div>
            <button onClick={submitData} className='py-2 px-6 bg-blue-600 text-white font-bold rounded ml-2 '>Upload data</button>
        </div>
    </>);
}

export default Home;