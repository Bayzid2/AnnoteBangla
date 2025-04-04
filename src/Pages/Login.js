import React from 'react';
import { useState } from 'react';
import { useAuthState, useCreateUserWithEmailAndPassword, useSendEmailVerification, useSignInWithEmailAndPassword, useSignInWithGoogle, useUpdateProfile } from 'react-firebase-hooks/auth';
import auth from '../Firebase.init';
import "./Login.css"
import { useNavigate } from 'react-router-dom';
import Loading from './Loading';
import { useEffect } from 'react';
import { async } from '@firebase/util';

const Login = () => {
    const [register, setRegister] = useState(false)
    const [user, loading, error] = useAuthState(auth)
    const [signInWithGoogle, gUser, gLoading, gError] = useSignInWithGoogle(auth);
    const [updateProfile, updating, updateError] = useUpdateProfile(auth);
    const [success, setSuccess] = useState("")
    const [err, setErr] = useState("")
    const navigate = useNavigate()
    const [users, setUsers] = useState([])
    const [loadUsers, setLoadUsers] = useState(false)
    const [createUserWithEmailAndPassword, eUser, eLoading, eError,] = useCreateUserWithEmailAndPassword(auth);
    const [signInWithEmailAndPassword, lUser, lLoading, lError,] = useSignInWithEmailAndPassword(auth);
    const [countdiv, setCountDiv] = useState(false)
    const [value1, setValue1] = useState(0)
    const [value2, setValue2] = useState(0)
    const [value3, setValue3] = useState(0)
    const [imageNo, setImageNo] = useState(0)
    const [random, setRandom] = useState([])
    const [commentError, setCommentError] = useState("")
    // const [isOpen, setIsOpen]=useState(true)
    const [inputState, setInputState] = useState(false)
    const [modalIsOpen, setIsOpen] = React.useState(false);
    const [inputValue, setInputValue] = useState("")
    const [comments, setComments] = useState([])
    const [defaultComm, setDefaultComm] = useState([])

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [cMatched, setCMatched] = useState(0)
    // const [matchedComment, setMatchedComment]=useState(true)

    useEffect(() => {
        fetch("https://piccomment.onrender.com/signimages")
            .then(res => res.json())
            .then(data => {
                // function getMultipleRandom(arr, num) {
                //     const shuffled = [...arr].sort(() => 0.5 - Math.random());

                //     return shuffled.slice(0, num);
                // }

                // setRandom(getMultipleRandom(data, 5))
                setRandom(data)

            })
    }, [])
    // console.log(random);

    // useEffect(() => {
    //     setDefaultComm(pre=>[...pre, random.map(r=>{"_id":r._id,"comment": r.comment
    //     })])
    // }, [random])

    // console.log("default is", defaultComm);



    useEffect(() => {
        if (error || gError || updateError || eError || lError) {
            setErr(error ? error.message : gError ? gError.message : updateError ? updateError.message : eError ? eError.message : lError ? lError.message : "")

            return;
        }
    }, [error, gError, updateError, eError, lError])

    // let matched = 0
    useEffect(() => {
        comments.map(c => {
            let having = random.find(d => d._id == c._id && d.comment == c.comment)

            if (having) {
                // matched=matched+1
                setCMatched(Number(cMatched) + 1)
            }
        })
    }, [random, comments])

    useEffect(() => {
        if (cMatched >= 3) {
            // setMatchedComment(false)
            document.querySelector("#signUpBtn").style.display = "inline-block"


        }
    }, [cMatched])
    //   console.log(cMatched);

    // keyboard 
    function openModal() {
        setIsOpen(true);
    }


    function closeModal() {
        setIsOpen(false);
    }


    // keyboard 

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


    if (loading || gLoading || eLoading || lLoading) {
        return <Loading />
    }
    if (user) {
        navigate("/")
    }
    const arr = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', "0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]

    const increase = e => {
        // setSuccess("")
        setErr("")
        setCommentError("")
        // e.preventDefault()
        if (imageNo == parseInt(random.length) - 1) {
            setImageNo(0)
        }
        else {
            setImageNo(parseInt(imageNo) + 1)
        }

    }

    const inputValueIs = (e) => {
        setInputValue(e.target.value)


    }
    const submitComment = async (id) => {

        const commentText = inputValue ? inputValue : document.querySelector("#display")?.innerText

        if (!commentText) {
            setErr("No input found!")
            return;
        }


        const commentArr = commentText.split("")
        const isEnglish = await commentArr.find(d => {
            if (arr.includes(d)) {

                return true



            }


        })
        if (isEnglish) {
            setErr("English not allowed")
            return;
        }
        // console.log("comm is", commentText);
        if (comments.length === 5) {
            setErr("Sorry!Your input are mostly incorrect.Please back to step 1/1")
            // navigate("/")
            return;
        }
        const newComment = {
            _id: id,
            comment: commentText
        }

        setComments([...comments, newComment])
        // setSuccess("Successfully commented")
        setInterval(function () {
            setSuccess("")
        }, 1000);
        let field = document.querySelector("#display");
        if (field) {
            field.innerText = ""

        }
        let inp = document.querySelector("#inputText2")
        if (inp) {
            document.querySelector("#inputText2").value = "";
        }


        increase();






    }


    const signupSubmit = async () => {
        // let matched = 0
        // await comments.map(c => {
        //     let having=random.find(d=>d._id==c._id && d.comment==c.comment)
        //     console.log(having);
        //     if(having){
        //         matched=matched+1
        //     }
        // })
        if (cMatched >= 3) {
            await createUserWithEmailAndPassword(email, password);
            await updateProfile({ displayName: name });
            const userData = {
                name: name,
                email: email,
                password: password,
                role: "user"
            }
            await fetch("https://piccomment.onrender.com/users", {
                method: "POST",
                headers: {
                    'content-type': 'application/json',
                    // 'authorization': `Bearer ${localStorage.getItem('accessToken')}`
                },
                body: JSON.stringify(userData)
            })
                .then(data => {
                    if (user) {
                        navigate("/")
                    }


                })
                .catch(err => {
                    console.log(err);
                    setErr(err.message)

                })



        }
        else {
            setErr("comments not matched")
            return ("/login")
        }

    }

    const countDiv = () => {
        setErr("")
        setValue1(Math.floor(Math.random() * 10))
        setValue2(Math.floor(Math.random() * 10))
        setCountDiv(true)

    }
    const countValue = (e) => {
        setValue3(e.target.value)

    }

    const login = async (e) => {
        e.preventDefault();
        if ((value1 + value2) != value3) {
            setErr("please give correct value in addition")
            return;
        }
        const email = e.target.email.value;
        const password = e.target.password.value;
        await signInWithEmailAndPassword(email, password);
        // setSuccess("Successfully logged in");

    }

    const signUp = async (e) => {
        e.preventDefault();
        const name = e.target.name.value;
        const email = e.target.email.value;
        const password = e.target.password.value;
        const rePassword = e.target.repassword.value;


        if (password !== rePassword) {
            setErr("password not matched")
            return;
        }

        if (password.length < 6) {
            setErr("Your password must be at least 6 characters");
            return;
        }
        if (password.search(/[a-z]/i) < 0) {
            setErr("Your password must contain at least one letter.");
            return;
        }
        if (password.search(/[0-9]/) < 0) {
            setErr("Your password must contain at least one digit.");
            return;
        }



        if ((value1 + value2) != value3) {
            setErr("please give correct value in addition")
            return;
        }
        setName(name)
        setEmail(email)
        setPassword(password)
        setErr("")
        setSuccess("")
        document.querySelector(".modalButton").click()




    }


    const decrease = e => {
        setSuccess("")
        setErr("")
        setCommentError("")
        e.preventDefault()
        if (imageNo == 0) {
            setImageNo(parseInt(random.length) - 1)
        }
        else {
            setImageNo(parseInt(imageNo) - 1)
        }
    }


    const googleLogin = async () => {
        await signInWithGoogle();
    }


    return (
        <div className='loginSection'>

            {/* modal  */}


            <label htmlFor="my-modal" className="btn modal-button modalButton ">open modal</label>

            {/* <!-- Put this part before </body> tag --> */}
            <input type="checkbox" id="my-modal" className="modal-toggle" />
            <div className="modal ">
                <div className="  modalDiv">

                    <div>
                        <div class="   shadow-md relative">
                            <label htmlFor="my-modal" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                            <br /> <span className='font-bold text-blue-400'>SignUp-Step 2/2</span>
                            <div class=" flex justify-evenly items-center gap-10">
                                <div>

                                    {
                                        random[imageNo] ? <div>
                                            {/* <div>
                                                <button disabled={random.length < 2} className='bg-[#C8CACD] py-2 px-4 rounded-md block' onClick={decrease}>Previous</button>
                                            </div> */}
                                            <div>
                                                {/* <p className='font-bold my-2'>{random[imageNo].name} </p> */}
                                                <img className='h-[320px] w-[300px] mx-auto' src={random[imageNo].link} alt="" />

                                                <p className='my-2'>Image <span className="font-bold">{imageNo + 1}</span> / <span className="font-bold">{random.length}</span> </p>
                                                <div className='text-center mx-auto'>
                                                    <button disabled={random.length < 2} className='bg-[#C8CACD] py-2 px-4 rounded-md mb-4 ' onClick={increase}>Skip</button>
                                                </div>
                                            </div>
                                            {/* <div>
                                                <button disabled={random.length < 2} className='bg-[#C8CACD] py-2 px-4 rounded-md block' onClick={increase}>Next</button>
                                            </div> */}
                                        </div> : "loading..."
                                    }
                                </div>
                                <div class="text-center lg:text-left w-[300px]">
                                    <h1 class="text-3xl font-bold mb-10 mt-10 lg:mt-0 text-black">Annotate Here</h1>
                                    <div className='flex items-center'>
                                        {!inputState ? <input type="text" name="" id="inputText2" className='py-4 px-6 bg-slate-300' onChange={inputValueIs} /> :
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

                                        }
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
                                        <button className='bg-[#3274D6] text-white my-4 mr-4 mt-6 py-3 px-10 font-semibold text-lg rounded-md' onClick={() => submitComment(random[imageNo]._id)}>Submit</button>
                                        {
                                            <button className='bg-red-500 text-white my-4 mt-6 py-3 px-10 font-semibold text-lg rounded-md hidden'
                                                //  disabled={()=>{
                                                //     if(!matchedComment){
                                                //         return false
                                                //     }
                                                //     else{
                                                //         return true
                                                //     }
                                                // }}
                                                id="signUpBtn"
                                                onClick={signupSubmit}>Sign Up</button>}
                                    </div>



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
                    {/* <div className="modal-action">
                        <label htmlFor="my-modal" className="btn">Yay!</label>
                    </div> */}
                </div>
            </div>




            {
                !register &&
                <>
                    <div class="login">
                        <h1>Login</h1>
                        <form onSubmit={login}>
                            <label for="email">
                                <i class="fas fa-user"></i>
                            </label>
                            <input type="email" name="email" placeholder="Email" id="email" required />
                            <label for="password">
                                <i class="fas fa-lock"></i>
                            </label>
                            <input type="password" name="password" placeholder="Password" id="password" onChange={countDiv} required /> <br />

                            {
                                countdiv &&
                                <p className='font-bold'>{value1} + {value2} = <input onChange={countValue} type="text" name="" id="" className='countInp' /> </p>
                            }
                            <button className=' break-all block w-full'>
                                {/* <p className='text-primary font-semibold'>{success}</p> */}
                                <p className='text-red-400 font-semibold'>{err}</p>

                            </button>
                            <input type="submit" value="Login" />
                        </form>

                    </div>
                    <div className='mt-8 text-white w-[400px] mx-auto text-left'>
                        <p>Don't have account ? <button onClick={() => setRegister(true)} className='font-bold'>Sign up</button></p>
                    </div>
                </>
            }

            {
                register &&
                <>
                    <div class="login">
                        <h1>Sign Up <br /> <span className='font-bold text-blue-400'>SignUp-Step 1/2</span></h1>

                        <form
                            onSubmit={signUp}
                        >
                            <label for="name">
                                <i class="fas fa-user"></i>
                            </label>
                            <input type="text" name="name" placeholder="Name" id="name"
                                //  onChange={countDiv}
                                required />
                            <label for="email">
                                <i class="fas fa-user"></i>
                            </label>
                            <input type="email" name="email" placeholder="Email" id="email"
                                //  onChange={countDiv}
                                required />
                            <label for="password">
                                <i class="fas fa-user"></i>
                            </label>
                            <input type="password" name="password" placeholder="Password" id="password"
                                //  onChange={countDiv}
                                required />
                            <label for="repassword">
                                <i class="fas fa-user"></i>
                            </label>
                            <input type="password" name="repassword" placeholder="Repeat Password" id="repassword" onChange={countDiv} required />



                            {
                                countdiv &&
                                <p className='font-bold'>{value1} + {value2} = <input onChange={countValue} type="text" name="" id="" className='countInp' /></p>
                            }
                            <button className=' break-all block w-full'>
                                {/* <p className='text-primary font-semibold'>{success}</p> */}
                                <p className='text-red-400 font-semibold'>{err}</p>

                            </button>
                            {/* <label htmlFor="my-modal" className="btn modal-button">open modal</label> */}

                            <input type="submit" value="Sign up" />
                        </form>
                    </div>
                    <div className='mt-8 text-white w-[400px] mx-auto text-left'>
                        <p>Already have account ? <button onClick={() => setRegister(false)} className='font-bold'>Login</button></p>
                    </div>
                </>
            }
            {/* <div className='mt-4 text-white w-[400px] mx-auto text-left'>
                <div class="divider mt-2 ">OR</div>
                <button onClick={googleLogin} className='googleLogin'>Sign up with google</button>
            </div> */}

        </div >
    );
};

export default Login;