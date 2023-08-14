import React,{useState,useEffect} from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
import reactRouterDom from 'react-router-dom';
import Error from '../component/error';
import Success from '../component/success';

export default function Register() {
  const [name, setname]=useState();
  const[email,setemail]=useState();
  const[password, setpassword]=useState();
  const [confirmpassword,setconfirmpassword]=useState();
  const [loading, setloading] = useState(false); // Initialize with `false`
  const [errors, seterrors] = useState(); // Initialize with `false`
  const [success, setsuccess] = useState();

async function register(){
 if(password==confirmpassword){
  const user={
    name,
    email,
    password,
    confirmpassword
      }
  try {
     setloading(true)
    const result = (await axios.post('https://cloudy-sock-goat.cyclic.app/users/register',user)).data
    setloading(false)
    setsuccess(true)
    setname('')
    setemail('')
    setpassword('')
    setconfirmpassword('')
  //  console.log(user)
  } catch (error) {
    console.log(error)
    setloading(false)
    seterrors(true)
  }
    }
    else alert("password not matched")
 }


  return (
    <div>
      {loading && <p>Loading...</p>}
      {errors && <Error/>}
  
      <div className='row justify-content-center mt-5'>
        <div className="col-md-5">
          <div className='bs'>
            <center><h1>Register</h1></center>
          <input type="text" className='form-control mt-4' placeholder='Name' 
          value={name} onChange={(e)=>{setname(e.target.value)  }} />
          <input type="text" className='form-control mt-2' placeholder='Email' 
          value={email} onChange={(e)=>{setemail(e.target.value)  }} />
          <input type="text" className='form-control mt-2' placeholder='Password'
          value={password} onChange={(e)=>{setpassword(e.target.value)  }}/>
          <input type="text" className='form-control mt-2' placeholder='Confirm Password' 
           value={confirmpassword} onChange={(e)=>{setconfirmpassword(e.target.value)  }}/>

           <center><button className='btn btn-primary m-3' onClick={register}>Register</button><br />
           <Link to="/login" >Click me to login</Link></center>
          </div>


        </div>
      </div>

    </div>
  )
}
