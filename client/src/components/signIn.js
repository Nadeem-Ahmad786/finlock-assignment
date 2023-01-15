import React,{useEffect, useState} from "react";
import {AiOutlineEyeInvisible, AiOutlineEye} from "react-icons/ai";
import {signin, isToken} from "../api/auth";

function SignIn(){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [hideShow, setHideShow] = useState(true);
    const [success, setSucess] = useState(false);
    const [userName, setUserName] = useState("");
    const [loader, setLoader] = useState("");
    useEffect(()=>{
        checkUserLogin()
    },[loader])
    const checkUserLogin=()=>{
        isToken()
        .then(response => {
            setSucess(true);
            setUserName(response.data.user.name);
        })
    }
    const handleEmailChange=(e)=>{
        setEmail(e.target.value)
    }
    const handlePasswordChange=(e)=>{
        setPassword(e.target.value)
    }    
    const handleShowHideChange=(e)=>{
        setHideShow(!hideShow)
        if (document.getElementById("password").getAttribute('type') === "text"){
            document.getElementById("password").setAttribute('type', "password");
        }
        else{
            document.getElementById("password").setAttribute('type', "text");
        }
    }
    const submit=()=>{
        const data = {email, password};
        signin(data)
            .then(response => {
                setSucess(true);
                setUserName(response.data.user.name);
            })
            .catch(err => {
                console.log("SignIn Error", err);
            })
    }

    return (
        <div className="login">
            <div className="img-div">
            <img className="user-image" src='images/ic_user.svg' alt="user icon" width="60%"/>
            </div>
            <h1 className="welcome">Welcome!{success ? ", "+ userName :  ""}</h1>
            {!success &&<><div className="intro">
                <p>Let's connect to your workspace.<br />Please enter your credentials to continue.</p>
            </div>
            <div className="form-control">
                <input type="email"  name="email" id="email" placeholder="Email Address" value={email} onChange={handleEmailChange} required />
                <input type="password"  name="password" id="password" placeholder="Password" value={password} onChange={handlePasswordChange} required />
                {hideShow ? <AiOutlineEyeInvisible className="eye" onClick={handleShowHideChange}/> :
                <AiOutlineEye className="eye" onClick={handleShowHideChange}/>
                }
                <div className="for-pass">
                    <a href="/">Forgot Password?</a>
                </div>
                <button type="button" className="button" onClick={submit}>Sign In</button>
            </div>
            </>}
        </div>
    )
}

export default SignIn;