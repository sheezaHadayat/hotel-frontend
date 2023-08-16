import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import Error from '../component/error';                                                                                                                                         
import { Tabs } from 'antd';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function AdminScreen() {


    useEffect(()=>{
        if(!JSON.parse(localStorage.getItem("currentUser")).isAdmin){
        window.location.href='/home'
        }
        
    },[])

    return (
        <div className='mt-3 ml-3 mr-3 bs'>
            <h1 className='text-center'><b>Admin Panel</b></h1>
            <Tabs
                defaultActiveKey="1"
                items={[
                    {
                        label: 'Bookings',
                        key: '1',
                        children: <Bookings />,
                    },
                    {
                        label: 'Rooms',
                        key: '2',
                        children:  <Rooms />,
                        // disabled: true,
                    },
                    {
                        label: 'Add Rooms',
                        key: '3',
                        children: <Addroom/>,
                    },
                    {
                        label: 'Users',
                        key: '4',
                        children: <Users/>,
                    },
                ]}
            />

        </div>
    )
}


//Booking Component
export function Bookings() {

    const [bookings, setbookings] = useState([]);
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState();
    useEffect(() => {
        const fetchData = async () => {
            try {

                const data = await (await axios.get('http://localhost:5000/bookings/getallbookings')).data;
                setbookings(data);
                setLoading(false)
                // Do something with the fetched data
            } catch (error) {
                console.error('Error fetching data:', error);
                setLoading(false)
                setError(error)
            }
        };
        fetchData();

    }, [])

    return (
        <div className='row'>

            <div className='col-md-12'>

                <h1>Bookings</h1>
                {loading && (<h2>Loading...</h2>)}

                <table className='table table-bordered table-dark'>
                    <thead className='bs'>
                        <tr>
                            <th>Booking Id</th>
                            <th>User Id</th>
                            <th>Room</th>
                            <th>From</th>
                            <th>To</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>

                   
                {bookings.length && (bookings.map(booking => {

                    return <tr>
                        <td>{booking._id}  </td>
                        <td>{booking.userid}  </td>
                        <td>{booking.room}  </td>
                        <td>{booking.fromdate}  </td>
                        <td>{booking.todate}  </td>
                        <td>{booking.status}  </td>
                    </tr>

                }
                ))}
                 </tbody>
                </table>
            </div>
        </div>

    )


}

//room Component

export function Rooms() {

    const [rooms, setrooms] = useState([]);
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState();
    useEffect(() => {
        const fetchData = async () => {
            try {

                const data = await (await axios.get('http://localhost:5000/rooms/getallrooms')).data;
                setrooms(data);
                setLoading(false)
                // Do something with the fetched data
            } catch (error) {
                console.error('Error fetching data:', error);
                setLoading(false)
            }
        };
        fetchData();

    }, [])

    return (
        <div className='row'>

            <div className='col-md-12'>

                <h1>Rooms</h1>
                {loading && (<h2>Loading...</h2>)}

                <table className='table table-bordered table-dark'>
                    <thead className='bs'>
                        <tr>
                            <th>Room Id</th>
                            <th>Name</th>
                            <th>Type</th>
                            <th>Rent per day </th>
                            <th>Max Count</th>
                            {/* <th>Phone Number</th> */}
                        </tr>
                    </thead>
                    <tbody>

                {rooms.length && (rooms.map(room => {

                    return <tr>
                        <td>{room._id}  </td>
                        <td>{room.name}  </td>
                        <td>{room.type}   </td>
                        <td>{room.rentperday}   </td>
                        <td>{room.maxcount}   </td>
                        {/* <td>{room.phonenumber}   </td> */}
                    </tr>

                }
                ))}
                
                </tbody>
                </table>
            </div>
        </div>

    )


}




//User Component

export function Users() {

    const [users, setusers] = useState([]);
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState();
    useEffect(() => {
        const fetchData = async () => {
            try {

                const data = await (await axios.get('http://localhost:5000/users/getallusers')).data;
                setusers(data);
                setLoading(false)
                // Do something with the fetched data
            } catch (error) {
                console.error('Error fetching data:', error);
                setLoading(false)
            }
        };
        fetchData();

    }, [])

    return (
        <div className='row'>

            <div className='col-md-12'>

                <h1>Users</h1>
                {loading && (<h2>Loading...</h2>)}

                <table className='table table-bordered table-dark'>
                    <thead className='bs'>
                        <tr>
                            <th>User Id</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Is Admin</th>
                        </tr>
                    </thead>
                    <tbody>

                {users.length && (users.map(user => {

                    return <tr>
                        <td>{user._id}  </td>
                        <td>{user.name}  </td>
                        <td>{user.email}   </td>
                        <td>{user.isAdmin ? 'YES' : 'No'}   </td>
                       
                    </tr>

                }
                ))}
                
                </tbody>
                </table>
            </div>
        </div>

    )


}

//Add User
 
export function Addroom(){
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState();

    const [name, setname]=useState('')
    const[rentperday, setrentperday]=useState()
    const[maxcount, setmaxcount]=useState()
    const[description, setdescription]=useState()
    const[phonenumber, setphonenumber]=useState()
    const[type, settype]=useState()
    const[url1, seturl1]=useState()
    const[url2, seturl2]=useState()
    const[url3, seturl3]=useState()

    async function addRoom(){
        const newroom={
            name,
            rentperday,
            maxcount,
            description,
            phonenumber,
            type,
            imageurls: [ url1,
                url2,
                url3]
           
        }
        try {
            setLoading(true)
            const result= await (await axios.post('http://localhost:5000/rooms/addroom', newroom)).data;
            console.log(result)
            Swal.fire("congrats", "New room added successfully" , "suceess").then(result=>{
                window.location.href="/home"
            })
            setLoading(false)
        } catch (error) {
            console.log(error)
             Swal.fire("oops","something went wrong", "error")
            setLoading(false)
        }
    }

    return(
      
        <div className='row m-2'>
            <div className="col-md-6">
            {loading && <h2>Loading</h2>}
                <input type="text" className='form-control  mb-3' placeholder='room name' 
                value={name} onChange={(e)=>setname(e.target.value)}/>
                <input type="text" className='form-control  mb-3' placeholder='rent per day' 
                value={rentperday} onChange={(e)=>setrentperday(e.target.value)} />
                <input type="text" className='form-control  mb-3' placeholder='max count' 
                value={maxcount} onChange={(e)=>setmaxcount(e.target.value)}
                />
                <input type="text" className='form-control  mb-3' placeholder='description'
                value={description} onChange={(e)=>setdescription(e.target.value)}
                />
                <input type="text" className='form-control  mb-3' placeholder='phone number'
                value={phonenumber} onChange={(e)=>setphonenumber(e.target.value)}
                />

            </div>
            <div className="col-md-6">
            <input type="text" className='form-control mb-3' placeholder='type'
            value={type} onChange={(e)=>settype(e.target.value)} />
                <input type="text" className='form-control mb-3' placeholder='Image URL 1'
                 value={url1} onChange={(e)=>seturl1(e.target.value)}
                 />
                <input type="text" className='form-control  mb-3' placeholder='Image URL 2'
                value={url2} onChange={(e)=>seturl2(e.target.value)} />
                <input type="text" className='form-control  mb-3' placeholder='Image URL 3'
                value={url3} onChange={(e)=>seturl3(e.target.value)}
                 />

              
            </div>
            <div className='button'>
                <center><button className='btn btn-primary mt-5' onClick={addRoom}>Add Room</button></center>

              </div>
        </div>
    )
}