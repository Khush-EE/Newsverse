import React from 'react'
import spinner from '../assets/spinner.gif'

let style = {
    color: "white",
    position: "absolute",
    left: "50%",
    top: "40%",
    width: "5%"
}

export default function Loading() {
  return (
    <div style={style}>
      <img src={spinner}/>
    </div>
  )
}
