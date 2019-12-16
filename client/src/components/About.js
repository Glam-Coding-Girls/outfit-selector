import React, { Component } from 'react'

export default class About extends Component {
  render() {
    return (
      <div className="container innerpage">
        <h1>About</h1>
        <div className="aboutcontent">
        <p>Glam Closet is a virtual dressing room that helps you select your favorite outfit and save to your personal portfolio. We want you to get the most out of what you already have in your closet and to choose new pieces that will integrate well into your wardrobe as a whole.</p>
        <p>A little organization can go a long way when it comes to getting dressed. Mixing and matching what you own, comparing new purchases to what you have in your closet, planning the outfits you'll wear on vacation, and saving all your favorite style inspirations in one place will all help you develop your personal style. </p>
        <p>We have collections from different stores</p>
        <div className="stores">
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8-UaZxa61fC6Bt_Hx0VK5IICDKODdNvLp_YXWIxbXB7_yM1bAIg&s" alt="kohls" />
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSBXHIGYbk2eocdZEXZFvQYe4eZLmO97JC-fucmfC4qDS-KDYROpQ&s" alt="Macys" />
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTM-mZxd1z0cVKElx-qHhkrzprypKGkJp3sxiAvtQpgp_1eEvga&s" alt="Amazon" />
        </div>
       
        </div>
      </div>
    )
  }
}
