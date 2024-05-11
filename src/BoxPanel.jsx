import React from 'react'
import { Link } from 'react-router-dom'
const BoxPanel = ({children , routerLink}) => {
  return (
    <div>
        <span>
            {children}
        </span>
        <Link to ={routerLink}><button>click</button></Link>
    </div>
  )
}

export default BoxPanel;