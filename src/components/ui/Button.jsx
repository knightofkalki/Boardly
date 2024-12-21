import React from "react"

const Button = ({ className, children, ...props }) => {
  return (
    <button
      className={`inline-flex items-center justify-center rounded-full font-medium 
      transition-all duration-200 ease-in-out
      bg-[#F85B2C] hover:bg-[#e54e22] text-white
      px-6 py-2 hover:-translate-y-0.5 hover:shadow-md
      ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}

export { Button }
