import React, { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';
import StripeCheckout from 'react-stripe-checkout';


export default function BookingScreen({ match }) {

    const [room, setroom] = useState();
    const [loading, setloading] = useState(true); // Initialize with `false`
    const [error, seterror] = useState(false); // Initialize with `false`
    const roomid = match.params.roomid
    const fromdate = moment(match.params.fromdate, 'DD-MM-YYYY')
    const todate = moment(match.params.todate, 'DD-MM-YYYY')
    const totaldays = moment.duration(todate.diff(fromdate)).asDays() + 1
    const [totalamount, settotalamount] = useState()

if (!localStorage.getItem("currentUser")){
    window.location.reload="/login"
}

    useEffect(() => {
        const fetchRoom = async () => {
            try {
                setloading(true);

                const data = (await axios.post('http://localhost:5000/rooms/getroombyid', { roomid: match.params.roomid })).data
                settotalamount(data.rentperday * totaldays)
                // console.log(data)
                setroom(data);
                setloading(false);
            } catch (error) {
                seterror(true);

                setloading(false);
                // console.error(error);
            }
        };

        fetchRoom(); // Call the async function inside useEffect
    }, []);



    async function onToken(token) {
        console.log(token)
        const bookingDetails = {
            room,
            userid: JSON.parse(localStorage.getItem("currentUser"))._id,
            fromdate,
            todate,
            totalamount,
            totaldays,
            token
        };
        try {
            const result = await axios.post("http://localhost:5000/bookings/bookroom", bookingDetails)
        } catch (error) {

        }




    }

    return (
        <div>
            {/* <h2>Booking Screen</h2>
            <h2>{match.params.roomid}</h2> */}




            <div className="row justify-content-center mt-5 ">
                {loading ? <h1>Loading....</h1> : error ? <h1>Error</h1> :
                    (<div>
                        <div className='row m-1'>
                            <div className='col-md-5'>
                                <h2>{room.name}</h2>
                                <img src={room.imageurls[0]} className="bigimg" />

                            </div>
                            <div className='col-md-5 m-5'>
                                <div><h2>Booking Details</h2>
                                    <hr />
                                    <b><p>Name:{JSON.parse(localStorage.getItem('currentUser')).name}</p>
                                        <p>From Date:{match.params.fromdate} </p>
                                        <p>To Date: {match.params.todate}</p>
                                        <p>Max Count: {room.maxcount}</p></b></div>
                                <div >
                                    <b>
                                        <h2>Amount</h2>
                                        <hr />
                                        <p>Toal Days:{totaldays}</p>
                                        <p>Rent Per Day: {room.rentperday}</p>
                                        <p>Total Amount: {totalamount}</p>

                                    </b>

                                </div>
                                <div style={{ float: "right" }}>

                                    <StripeCheckout
                                        amount={totalamount * 100}
                                        token={onToken}
                                        currency='PKR'
                                        stripeKey="pk_test_51NeHo4IWQ9Gu2tLentu15AitAF0o1q1RlrYng4Pu6eXp1sqsrqal6n9YIYaiNrQqRYGakte5DbOLUEoZdycROcYf00hRPWxeJO"
                                    >

                                        <button className='btn btn-primary'>Pay Now</button>
                                    </StripeCheckout>

                                </div>


                            </div>
                        </div>


                    </div>
                    )}
            </div>
        </div>
    )
}
