import React from 'react'

const PaperButton = (props) => {
    let styleSelector ="border-blue-400 text-blue-500 hover:bg-blue-400"
    let textSelector = "Upload"
    switch(props.status){
        case "":
            styleSelector ="border-blue-400 text-blue-500 hover:bg-blue-400"
            textSelector = "Upload"
            break
        case "loading":
            styleSelector ="border-gray-400 text-gray-500 disabled"
            textSelector = "Loading..."
            break
        case "completed":
            styleSelector ="border-green-400 text-green-500 hover:bg-green-400"
            textSelector = "Result"
            break
        case "failed":
            styleSelector ="border-red-400 text-red-500 hover:bg-red-400"
            textSelector = "Reupload"
            break

    }
  return (
    <button className={`border ${styleSelector} rounded-lg px-4 py-2 hover:text-white duration-100`} onClick={props.onClick}>{textSelector}</button>
  )
}

export default PaperButton