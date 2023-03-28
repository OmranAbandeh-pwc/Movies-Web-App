import '../style/loginpage.css'
import { useState } from "react";
import SignupPage from './SignupPage';
import Footer from '../components/Footer';
import NavBar from '../components/NavBar';

const LoginPage = () => {
  
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [registNavig, setRegistNavig] = useState(false)

    const handleLogin = async () => {
    
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      
      var raw = JSON.stringify({
        "email": email,
        "password": password
      });
      
      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
      };
      
      const response = await fetch("/api/users/login/", requestOptions)
      const data = await response.json()
      if(data.msg === 'success'){
        
        localStorage.setItem('usertoken', data.token)
        window.location.reload(false)
        console.log(localStorage.getItem('usertoken'))
      } else {
        alert('Wrong Email or Password ')
      }
  
       }

       const handleRegistNavig = () => {
        setRegistNavig(!registNavig)
       }

  return (

    <>
  <NavBar/>
   {registNavig ? <SignupPage/> : <div className="main-login-container">
        <div className="login-info-container">
            <h2>Login to your account</h2>
            <p>In order to use the editing and rating capabilities of TMDB, as well as get personal recommendations you will need to login to your account. If you do not have an account, registering for an account is free and simple. <span onClick={handleRegistNavig} href="/signuppage/">Click here</span> to get started.</p>
        </div>
        
        <div className="email-pass-container">
            <div className='email-container'>
                <p>Email</p>
                <input type="email" onChange={(e) => setEmail(e.target.value)} value={email}/>
            </div>
            <div className='password-container'>
                <p>Password</p>
                <input type="password" onChange={(e) => setPassword(e.target.value)}/>
            </div>
            <div className='buttons-container'>
              <button onClick={handleLogin}>Login</button>
              <a>Reset password</a>
            </div>
        </div>
          
    
    </div>}
    <Footer/>
    </>
  )
}

export default LoginPage
