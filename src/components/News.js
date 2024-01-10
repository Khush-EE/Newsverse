import React from 'react'
import "../stylesheets/News.css"

export default function News(props) {
  return (
    <div className='card'>
      <div className='img'>
            <img src={props.urlToImage} alt=''/>
      </div>
      <h3>{props.title}</h3>
      <div className='content'>
      <p>{props.content}</p>
      <a href={props.url} target='_blank'>Read More...</a>
      </div>
    </div>
  )
}
