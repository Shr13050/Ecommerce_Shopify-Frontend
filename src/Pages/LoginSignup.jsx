import React, { useState } from 'react'
import './CSS/LoginSignup.css'

const LoginSignup = () => {

    const[state,setstate]= useState("Login")
    const[formData,setformData]=useState({
        username:"",
        password:"",
        email:""
    })

const login = async ()=>{
 console.log("Login Function Executed",formData);

 let responseData;
    await fetch('http://localhost:4000/login',{
        method:'POST',
        headers:{
            Accept:'application/form-data',
            'Content-Type':'application/json',

        },
        body:JSON.stringify(formData)
    }).then((response)=>response.json()).then((data)=>responseData=data)

    if(responseData.success){
        localStorage.setItem('auth-token',responseData.token);
     window.location.replace("/");  //redirect
    }else{
        alert(responseData.errors)
    }

}

const signup = async ()=>{
    console.log("Signup function executed",formData)
    let responseData;
    await fetch('http://localhost:4000/signup',{
        method:'POST',
        headers:{
            Accept:'application/form-data',
            'Content-Type':'application/json',

        },
        body:JSON.stringify(formData)
    }).then((response)=>response.json()).then((data)=>responseData=data)

    if(responseData.success){
        localStorage.setItem('auth-token',responseData.token);
     window.location.replace("/");
    }else{
        alert(responseData.errors)
    }
}
 const changeHandler=(e)=>{
    setformData({...formData,[e.target.name]:e.target.value})

 }

  return (
    <div className='loginsignup'>
        <div className="loginsignup-container">
            <h1>{state}</h1>
            <div className="loginsignup-fields">
            {state==="Sign Up"?<input  type="text" placeholder='Your Name' name="username"  value={formData.username} onChange={changeHandler} id="" />:<></>}
                <input type="email" placeholder='Your email' name="email" value={formData.email} onChange={changeHandler} id="" />
                <input type="password" placeholder='Your password' name="password" value={formData.password} onChange={changeHandler} id="" />
            </div>
            <button onClick={()=>{state==="Login"?login():signup()}}>Continue</button>
            {state==="Sign Up"?<p className="loginsignup-login">
                Already have an account <span onClick={()=>{setstate("Login")}}>Login here</span>
            </p>: <p className="loginsignup-login">
                Create an account<span onClick={()=>{setstate("Sign Up")}}>Click here</span></p>}
            
            <div className="loginsignup-agree">
                <input type="checkbox" name="" id="" />
                <p>By Continuing ,i agree to the terms of privacy policy</p>
            </div>

        </div>
      
    </div>
  )
}

export default LoginSignup
