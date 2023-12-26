import React from 'react';

export const ViedoSection = () => {
  return (
    <>
      <div className="flex flex-col justify-center items-center h-screen bg-cover bg-center">
        <video className="rounded-lg" autoPlay controls>
          <source src="https://docs.material-tailwind.com/demo.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </>
  );
}

 
