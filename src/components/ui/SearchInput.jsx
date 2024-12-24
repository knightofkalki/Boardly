import React from 'react'
import { BiSearch } from 'react-icons/bi'
const Search = (props) => {
  return (
    <div className="relative my-2 mx-4">
            <BiSearch 
              className="absolute left-4 top-1/2 transform -translate-y-1/2" 
              size={20} 
            />
            <input 
              type="text" 
              placeholder={props.placeholdertext} 
              value={props.value}
              onChange={props.onChange}
              className="bg-white p-2 pl-12 rounded-xl border border-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400"
            />
    </div>
  )
}

export default Search