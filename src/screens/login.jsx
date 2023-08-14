import React,{useState} from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import Error from '../component/error';

export default function Login() {

  const[email,setemail]=useState();
  const[password, setpassword]=useState();
  const [loading, setloading] = useState(false); // Initialize with `false`
  const [errors, seterrors] = useState(); // Initialize with `false`
  
 

async function login(){
 
  const user={
   
    email,
    password,
   
  
      }
  try {
    setloading(true)
    // console.log(user)
    const result = await axios.post('https://cloudy-sock-goat.cyclic.app/users/login',user)
    const response=result.data;
    setloading(false)
    
    if (response) {
      localStorage.setItem('currentUser', JSON.stringify(response));
      setloading(false);
      window.location.href = "/home"; // Redirect to home on successful login
  } else {
      
      seterrors(true);
  }
   
    
  } catch (error) {
    console.log(error)
    setloading(false)
    seterrors(true)
    
  }
      

  
 }

  return (
    <div>
       {loading && <p>Loading...</p>}
       {errors && <Error message='invalid credentionals'/>}
    <div className='row justify-content-center mt-5'>
        <div className="col-md-5">
      
    
          <div className='bs'>
            <center><h1>Login</h1></center>
         
          <input type="text" className='form-control mt-2' placeholder='Email' 
          value={email} onChange={(e)=>{setemail(e.target.value)  }} />
          <input type="text" className='form-control mt-2' placeholder='Password'
          value={password} onChange={(e)=>{setpassword(e.target.value)  }}/>
          

           <center><button className='btn btn-primary m-3' onClick={login}>Login</button><br />
           <Link to='/register' >Click here to Register</Link></center>
          </div>

        </div>
      </div>

    </div>
  )
}
