import React from "react"

const OutlineButton = ({ className, children, variant = "default", ...props }) => {
  const variants = {
    default: "border-gray-300 text-gray-700 hover:bg-gray-50",
    green: "border-green-500 text-green-500 hover:bg-green-50",
  }

  return (
    <button
      className={`inline-flex items-center justify-center rounded-full font-medium 
      transition-all duration-200 ease-in-out
      bg-white border-2
      px-6 py-2 hover:-translate-y-0.5 hover:shadow-sm
      ${variants[variant]}
      ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}

export { OutlineButton }
