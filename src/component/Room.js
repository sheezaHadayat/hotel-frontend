import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import {Modal, Carousel} from 'react-bootstrap';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';


export default function Room({ room,fromdate,todate }) {

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);



  return (
    <div>
      <div className="row bs">
        <div className='col-md-4'>
          {/* {room.images && room.images.map((image, index) => (
            <img  src={image} alt={`Image ${index}`} className='smallimg'/>
            ))} */}
          <img src={room.imageurls[0]} className='smallimg' />
        </div>
      
      <div className='col-md-7'>
        <h2>{room.name}</h2>
        <p>Type: {room.type}</p>
        <p>Rent per Day: PKR {room.rentperday}</p>
        <p>Phone Number: {room.phonenumber}</p>
        <p>Max Count: {room.maxcount}</p>
        <div style={{ float: "right" }}>



          {(fromdate && todate) &&(
            <Link to={`/book/${room._id}/${fromdate}/${todate}`}>
            <Button className='btn btn-primary' style={{margin:"5px"}}>Book Now</Button>
            </Link>
          )}
          
          <Button className='btn btn-primary' onClick={handleShow}>View Details</Button>
        </div>
        </div>
        </div>
        
         

      <Modal show={show} onHide={handleClose} size='lg'>
        <Modal.Header closeButton>
          <Modal.Title>{room.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Carousel>
          {room.imageurls.map(url=>{
            return <Carousel.Item>
              <img className='d-block w-100 bigimg'
              src={url}
              alt="first slide"/>
              </Carousel.Item>
          })}
    </Carousel>
    <p>{room.description}</p>
    
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          {/* <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button> */}
        </Modal.Footer>
      </Modal>

      
    </div>
  )
}
// }