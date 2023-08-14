import React from 'react';
import { Link } from 'react-router-dom';

export default function LandingScreen() {
  return (
    <div className='row landing my-auto justify-content-center' >
        <div className="col-md-9 my-auto text-center" style={{borderRight:'8px solid white'}}>
            <h2 style={{color:'white', fontSize:'100px', fontWeight:'regular' }}>Hotel Booking</h2>
            <h3 style={{color:'white', marginTop:'50px'}}>There is only one boss. </h3>
            <Link to ="/home">
            <button className='btn' style={{backgroundColor:'white', color:'black', marginTop:'20px'}}>Get Started </button> 
            </Link>
        </div>
      
    </div>
  )
}
