import React from 'react';

function Success({ message }) {
  return (
    <div className="alert alert-success" role='alert'>
      <p>{message}</p>
    </div>
  );
}

export default Success;
