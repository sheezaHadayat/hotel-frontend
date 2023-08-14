//home screen
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Room from '../component/Room';
import moment from "moment";
// import 'antd/dist/antd.css';
import { DatePicker, Space } from 'antd';
const { RangePicker } = DatePicker;


export default function HomeScreen() {

  const [rooms, setrooms] = useState([]);
  const [loading, setloading] = useState(false); // Initialize with `false`
  const [errors, seterrors] = useState(false); // Initialize with `false`
  const [fromdate, setfromdate] = useState('')
  const [todate, settodate] = useState('')
  const [duplicaterooms, setduplicaterooms] = useState([])
  const[searchkey,setsearchkey]=useState('')
  const[type,settype]=useState('all')


  useEffect(() => {
    const fetchRooms = async () => {
      try {
        setloading(true);

        const data = (await axios.get('https://cloudy-sock-goat.cyclic.app/rooms/getallrooms')).data

        setrooms(data);
        setduplicaterooms(data)
        setloading(false);
      } catch (error) {
        seterrors(true);
        console.log(error);
        setloading(false);
      }
    };

    fetchRooms(); // Call the async function inside useEffect
  }, []);
  // function filterByDate(dates) {
  //   if (!Array.isArray(dates) || dates.length < 2) {
  //     console.error('Invalid dates array');
  //     return;
  //   }
  //   // console.log(dates)
  //     setfromdate(moment(dates[0]).format('DD-MM-YYYY'))
  //     settodate(moment(dates[1]).format('DD-MM-YYYY'))
  //   // console.log(moment(dates[0]).format('DD-MM-YYYY'));
  //   // console.log(moment(dates[1]).format('DD-MM-YYYY'));
  // }

  function filterByDate(dates) {

    setfromdate(moment(dates[0]).format('DD-MM-YYYY'))
    settodate(moment(dates[1]).format('DD-MM-YYYY'))


    var temproom = []
    var availability = false
    for (const room of duplicaterooms) {
      if (room.currentbookings.length > 0) {
        for (const booking of room.currentbookings) {
          if (
            !moment(moment(dates[0]).format('DD-MM-YYYY')).isBetween(booking.fromdate, booking.todate)
            && !moment(moment(dates[1]).format('DD-MM-YYYY')).isBetween(booking.fromdate, booking.todate)
          ) {

            if (moment(dates[0]).format('DD-MM-YYYY') !== booking.fromdate &&
              moment(dates[0]).format('DD-MM-YYYY') !== booking.todate &&
              moment(dates[1]).format('DD-MM-YYYY') !== booking.fromdate &&
              moment(dates[1]).format('DD-MM-YYYY') !== booking.todate


            ) {
              availability = true
            }

          }
        }
      }

      if (availability == true || room.currentbookings.length == 0) {
        temproom.push(room)

      }

      setrooms(temproom)
    }

  }
function filterBySearch(){
  const temprooms=duplicaterooms.filter(room=>room.name.toLowerCase().includes(searchkey.toLowerCase()))
  setrooms(temprooms)
}

function filterByType(e){
  settype(e)
  if(e!=='all'){
  const temprooms=duplicaterooms.filter(room=>room.type.toLowerCase()==e.toLowerCase())
  setrooms(temprooms)}
  else
  setrooms(duplicaterooms)
}

  return (
    <div className='container'>

      <div className='row mt-5 bs'>
        <div className="col-md-3">
          <RangePicker format="DD-MM-YYYY" onChange={filterByDate} />

        </div>
        <div className="col-md-5 " >
          <input type="text" placeholder='search rooms' className='form-control'
          value={searchkey} onChange={(e)=>(setsearchkey(e.target.value))} onKeyUp={filterBySearch}
          ></input>
          </div>
          <div className="col-md-3 " >
          <select className='formm-control' value={type} onChange={(e)=>(filterByType(e.target.value))}>
            <option value="all">All</option>
            <option value="single">Single</option>
            <option value="double">Double</option>
          </select>

          </div>
      </div>


      <div className="row justify-content-center mt-5 mt-2">
        {loading ? <h1>Loading....</h1>  :
          (rooms.map(room => {

            return <div className='col-md-9'>
              <Room room={room} fromdate={fromdate} todate={todate} />
            </div>
          }))}

      </div>
    </div>
  );
}
