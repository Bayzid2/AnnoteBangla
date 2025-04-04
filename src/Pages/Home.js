import React from 'react';

import { useState } from 'react';
import { useEffect } from 'react';
import Countdown from 'react-countdown';
import Keyboard from './Keyboard';

const Home = () => {
    const [images, setImages] = useState([])
    const [imageNo, setImageNo] = useState(0)


    const Completionist = () => <span>You are good to go!</span>;

    const renderer = ({ hours, minutes, seconds, completed }) => {
        if (completed) {
            // Render a completed state
            return <Completionist />;
        } else {
            // Render a countdown
            return <span>{hours}:{minutes}:{seconds}</span>;
        }
    };

    //   get images 

    useEffect(() => {
        fetch("https://piccomment.onrender.com/images")
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setImages(data)

            })
    }, [])


    // increase 
    const increase = e => {
        e.preventDefault()
        if (imageNo == parseInt(images.length) - 1) {
            setImageNo(0)
        }
        else {
            setImageNo(parseInt(imageNo) + 1)
        }

    }
    const decrease = e => {
        e.preventDefault()
        if (imageNo == 0) {
            setImageNo(parseInt(images.length) - 1)
        }
        else {
            setImageNo(parseInt(imageNo) - 1)
        }
    }

    // submitComment 

    const submitComment = (id) => {
        console.log(id);
        // updateComments:id
        fetch(`https://piccomment.onrender.com/updateComments/${id}`, {
            method: "PUT",
            headers: {
                'content-type': 'application/json',
                // 'authorization': `Bearer ${localStorage.getItem('accessToken')}`
            },

        })
            // .then(res=>res.json())
            .then(data => {
                console.log(data);
            })
            .catch(err => {
                console.log(err);
            })

    }
   
    return (
        <div>
            <div style={{ height: "200px", width: "200px", margin: "20px auto" }}>
                <p>{imageNo} no image </p>
                {
                    images[imageNo] ? <img src={images[imageNo].link} alt="" /> : <p>Loading</p>
                }

            </div>
            <div>
                <button onClick={decrease}>Previous</button>
                <button onClick={increase}>Next</button>

            </div>
            <div>
                <input type="text" placeholder='comment' name="" id="" /> <br />
                <button onClick={() => submitComment(images[imageNo]._id)}>submit comment</button>

            </div>

            <div style={{ fontWeight: "700", fontSize: "3rem" }}>
                <Countdown
                    date={Date.now() + 180000}
                    renderer={renderer}
                />
            </div>

            {/* modal  */}
            {/* The button to open modal  */}
            <label for="my-modal-5" class="btn modal-button">open modal</label>

            {/* Put this part before </body> tag  */}

            <input type="checkbox" id="my-modal-5" class="modal-toggle" />
            <div class="modal">
                {
                    <Keyboard KeyboardId={"my-modal-5"} ></Keyboard>
                }
                {/* <div class="modal-box w-11/12 max-w-5xl">
                    <h3 class="font-bold text-lg">Congratulations random Internet user!</h3>
                    <p class="py-4">You've been selected for a chance to get one year of subscription to use Wikipedia for free!</p>
                    <div class="modal-action">
                        <label for="my-modal-5" class="btn">Yay!</label>
                    </div>
                </div> */}
            </div>

            <div>
                <div className='check'> somethong</div>
                {images.map(e => {
                    return (
                        <div>
                            <p>name:{e.name}</p>
                            <img src={e.link} alt="" />
                        </div>
                    )
                })}
            </div>

        </div >

    );
};

export default Home;