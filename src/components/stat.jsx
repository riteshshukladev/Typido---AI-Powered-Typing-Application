import React from 'react'
import { Link } from 'react-router-dom';

const Stat = ({ ...props }) => {
  return (
    <section className={props.className}>
      <div className='stat'>
        <div className='stat__item'>
          <p>{props.matrics.grossWPM}</p>
          <h3>WPM</h3>
        </div>
        <div className='stat__item'>
          <p>{props.matrics.accuracy}%</p>
          <h3>Accuracy</h3>
        </div>
        <div className='stat__item'>
          <p>{props.matrics.errorRate}%</p>
          <h3>Error Rate</h3>
        </div>
        <div className='stat__item'>
          <p>{ props.matrics.netWPM}</p>
          <h3>Net WPM</h3>
        </div>
      </div>

      <div className='detailedbtn'>
        <Link to='/detailed-stat'><button>Detailed Stat</button></Link>
        <span><img src="" alt="" /></span>
      </div>
    </section>
  )
}

export default Stat;