import React from 'react'
import { Alert } from 'react-bootstrap'

const Message = (props) => {
  return (
    <Alert  className='m-4' variant={props.variant || 'info'}>{props.children}</Alert>
  )
};

export default Message;