import React,{useState,useEffect} from 'react'
import { Tabs } from 'antd';
import axios from 'axios';
import swal from "sweetalert2";
import { Divider, Space, Tag } from 'antd';


export default function ProfileScreen() {
    
    const user= JSON.parse(localStorage.getItem("currentUser"))
    const [loading, setloading] = useState(false);

    useEffect(()=>{
        if (!user) {
            window.location.href="/home"
        }

    },[])

  return (
    <div className='mt-3 ml-3 mr-3 bs'>
       <Tabs
                defaultActiveKey="1"
                items={[
                    {
                        label: 'Profile',
                        key: '1',
                        children:  <div><h3>My Profile</h3>
                        <br />
                        <h4>Name: {user.name}</h4>
                        <h4>Email: {user.email}</h4>
                        <h4>isAdmin: {user.isAdmin ? "YES" :"No"}</h4></div> ,
                    },
                    {
                        label: 'Bookings',
                        key: '2',
                        children:  <MyBookings/>,
                        // disabled: true,
                    },
                  
                ]}
            />
    </div>
  )
}


export function MyBookings(){
    
    const[bookings,setbookings]=useState([]);
    const [loading, setloading] = useState(false);
    const user= JSON.parse(localStorage.getItem("currentUser"))

    useEffect(() => {
        async function fetchBookingData() {
          try {
            const rooms = await(await axios.post('https://cloudy-sock-goat.cyclic.app/bookings/getbookingbyuserid', { userid: user._id })).data;
           
            console.log(rooms);
            setbookings(rooms)
          } catch (error) {
            console.error('Error fetching booking data:', error);
          }
        }
    
        fetchBookingData();
      }, [user._id]);

      async function cancelBooking(bookingid, roomid){
        try {
            setloading(true)
            const result = await(await axios.post('https://cloudy-sock-goat.cyclic.app/bookings/cancelbooking', { bookingid: roomid })).data;
           console.log(result)
           setloading(false)
          swal.fire('Congrats', 'Your Booking has been Cancelled', 'success').then(result=>{
            window.location.reload()
          })
            
        } catch (error) {
            console.log(error)
            setloading(false)
            swal.fire("Oops", 'Something went wrong', 'error')
            
        }
      }



    return(
        <>
   

<div className="row">
    <div className="col-md-6">
        {loading && <h2>Loading...</h2>}
        {user.isAdmin && (
           window.location.href='/admin'
          
        // <a href="/admin">Go to Admin Panel</a>
      )}
        {bookings && (bookings.map(booking=>{
            return <div className='bs'>
               
                <h1>{booking.name}</h1>
                <p><b>BookingId</b>: {booking._id}</p>
                <p><b>CheckIn</b>: {booking.fromdate}</p>
                <p><b>Check Out</b>: {booking.todate}</p>
                <p><b>Amount</b>: {booking.totalamount}</p>
                <p><b>Status</b>: {" "}
                {booking.status=='cancelled'? ( <Tag color="red">CANCELLED</Tag>): (<Tag color="green">CONFIRMED</Tag>)}</p>
                {booking.status!=='cancelled' && (<div className='text-right'>
                    <button className='btn btn-primary' onClick={()=>{cancelBooking(booking._id,booking.roomid)}}>CANCEL BOOKING</button>

                </div>)}
               
            </div>

       })) }

    </div>
</div>
        </>
    )
}