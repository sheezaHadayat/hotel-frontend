import React from 'react';

function Error({message}) {
  return (
    <div>
    <div className=" alert alert-error" role='alert'>
   <p> {message}</p>
    </div>
    </div>
  );
}

export default Error;
