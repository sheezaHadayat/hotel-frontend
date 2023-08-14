import React from 'react'

function Navbar() {
  const user = JSON.parse(localStorage.getItem("currentUser"))

  function logout() {
    localStorage.removeItem('currentUser');
    window.location.href = "/login";
}


  return (
    <div>
      <nav class="navbar navbar-expand-lg ">
        <div class="container-fluid">
          <a class="navbar-brand" href="/home" style={{ color: 'white' }}>Hotel</a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"><i class='fa fa-bars' style={{color:'white'}}> </i></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav ">

              {user ? (<>
                <div class="dropdown">
  <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
   <i className='fa fa-user'> </i> {user.name}
  </button>
  <ul class="dropdown-menu mr-4">
    <li><a class="dropdown-item" href="/profile">Profile</a></li>
    <li><a class="dropdown-item" href="#" onClick={logout}>Logout</a></li>
   
  </ul>
</div>
              </>)  : (<>
                <li class="nav-item">
                  <a class="btn" href="/login" style={{ backgroundColor: 'white', color: 'black', margin: '3px' }}>Login</a>
                </li>
                <li class="nav-item">
                  <a class=" btn" href="/register" style={{ backgroundColor: 'white', color: 'black', margin: '3px' }}>Register</a>
                </li>
              </>)}


            </ul>
          </div>
        </div>
      </nav>
    </div>
  )
}

export default Navbar
