import React, { useState } from 'react'

const SignupPage = () => {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [passwordConfirm, setPasswordConfirm] = useState('')
    const [signUpSuccess, setSignUpSuccess] = useState(false)

    const handleSignup = async () => {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "name": name,
            "email": email,
            "password": password,
            "passwordConfirm": passwordConfirm
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        if(password.length < 4){
            alert("Password must be atleast 4 char")
        } else {
            const response = await fetch("/api/users/signup/", requestOptions)
            const data = await response.json()
        
            if(data.msg === "exist"){
            alert("Account already exist")
            } else {
                if(password < 4){
                   alert("Password must be atleast 4 char")
                } else{ 
                    if(data.msg === "password-fail"){
                        alert("Make sure to write the same password")
                    }
                    else{
                        console.log("sign up success")
                        setSignUpSuccess(true)
                    }
                } 
            }
        }   
    }


  return (<>
    <div className="main-signup-container">
    <div className="login-info-container">
        <h2>Sign up for an account</h2>
        <p>Signing up for an account is free and easy. Fill out the form below to get started. JavaScript is required to to continue.</p>
    </div>
    
    <div className="email-pass-container">
    <div className='username-container'>
            <p>Username</p>
            <input type="text" onChange={(e) => setName(e.target.value)} value={name}/>
        </div>
        <div className='email-container'>
            <p>Email</p>
            <input type="email" onChange={(e) => setEmail(e.target.value)} value={email}/>
        </div>
        <div className='password-container'>
            <p>Password</p>
            <input type="password" onChange={(e) => setPassword(e.target.value)} value={password}/>
        </div>
        <div className='password-container'>
            <p>Password Confirm</p>
            <input type="password" onChange={(e) => setPasswordConfirm(e.target.value)} value={passwordConfirm}/>
        </div>
    </div>
    <div className='buttons-container'>
        <button onClick={handleSignup}>Sign Up</button>
        <a href='http://localhost:3000/?'>Cancel</a>
        
    </div>
    {signUpSuccess ? <div className='signup-success'>
        <div className='sginup-success-items'>
            <p>congratulations you have successfully Signed Up you can now enjoy with the benefits of having a prsonal movie email </p>
            <p>please go to Login Page to sign in</p>
            <a href='http://localhost:3000/?'> <div>go to login</div></a>
        </div>
        
    </div> : ""}
</div>
</>
  )
}

export default SignupPage
