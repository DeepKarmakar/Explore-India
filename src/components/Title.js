import React from 'react'

const Title = (props) => {
  return (
    <h1 className={props.type}>{props.text}</h1>
  )
}

export default Title