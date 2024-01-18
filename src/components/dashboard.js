import React from 'react'
import Stack from "../assets/Frame 322.png"

const dashboard = () => {
  return (
    <div >
        <div className="cards">
            <div className="card">
                 <img src={Stack} alt="" />
                 <div className="texts">
                    <h1>$13,804.000</h1>
                    <p>Total Revanue</p>
                 </div>
            </div>
            <div className="card">
                 <img src={Stack} alt="" />
                 <div className="texts">
                    <h1>$13,804.000</h1>
                    <p>Total Revanue</p>
                 </div>
            </div>
            <div className="card">
                 <img src={Stack} alt="" />
                 <div className="texts">
                    <h1>$13,804.000</h1>
                    <p>Total Revanue</p>
                 </div>
            </div><div className="card">
                 <img src={Stack} alt="" />
                 <div className="texts">
                    <h1>$13,804.000</h1>
                    <p>Total Revanue</p>
                 </div>
            </div>
            
        </div>
    </div>
  )
}

export default dashboard