import React from 'react'
import "./style.css"

function index({label, state, setState, placeholder, type}) {
  return (
    <div className='input-wrapper'>
        <p className='label-input'>{label}</p>
        <input 
        className='custom-input'
        placeholder={placeholder}
        value={state}
        onChange={(e) => setState(e.target.value)}
        type={type}
        />
    </div>
  )
}

export default index