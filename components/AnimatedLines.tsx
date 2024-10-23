import React from 'react'

const AnimatedLines: React.FC = () => {
  return (
    <div className="lines absolute inset-0 w-[90vw] mx-auto pointer-events-none">
      <div className="line absolute h-full w-[1px] top-0 left-[25%] bg-green/10 overflow-hidden">
        <div className="line-inner absolute h-[15vh] w-full -top-1/2 left-0 animate-drop" style={{ animationDelay: '2s' }}></div>
      </div>
      <div className="line absolute h-full w-[1px] top-0 left-1/2 bg-green/10 overflow-hidden">
        <div className="line-inner absolute h-[15vh] w-full -top-1/2 left-0 animate-drop"></div>
      </div>
      <div className="line absolute h-full w-[1px] top-0 left-[75%] bg-green/10 overflow-hidden">
        <div className="line-inner absolute h-[15vh] w-full -top-1/2 left-0 animate-drop" style={{ animationDelay: '2.5s' }}></div>
      </div>
    </div>
  )
}

export default AnimatedLines