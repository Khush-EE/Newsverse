import React from 'react'
import "../stylesheets/error.css"

let style = {
  color: "white",
  position: "absolute",
  left: "37%",
  top: "40%"
}

export default function ErrorPage() {
  return (
    <div className='error'>
      <h1 style={style}>Sorry Some Error Occured</h1>
    </div>
  )
}
