import React from 'react';
import "./keyboardStyle.css"

const Keyboard = (props) => {

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
		alert('Not inserted : Empty innerHTML');
		props.setComment(document.getElementById('display').innerHTML)
		props.closeModal()
	} else {
		props.setComment(document.getElementById('display').innerHTML)
		props.closeModal()

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
            <div class="container">
		<div class="Keyboard ! bg-[#E3E5E8] py-4">
			<div class="display ! text-blue-700 " id="display">

			</div>
			{/* <div>
				<button type="submit" id="sub-btn">Submit</button>
			</div>  */}
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
    );
};

export default Keyboard;