import React from 'react'

const Loading = () => {
  return (
    <div className="flex gap-3 flex-col justify-center rounded-xl shadow-[0px_4px_12px_rgba(0,0,0,0.1)] p-5" >
          <h2>Uploading...</h2>
          <div className='h-2 w-[338px] rounded-full bg-gray-100 relative'> 
             <div className='absolute w-[80px] rounded-full bg-blue-500 h-full animate'></div>
          </div>
    </div>
  )
}

export default Loading