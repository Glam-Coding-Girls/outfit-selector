import React, { Component } from 'react';
import './bottom.css';


export class Bottom extends Component {
    constructor(props) {
        super(props);
        this.state = {
          currentPic: 0,
        }
    }
    clickLeft = () => {
      let moveleftArr = [...this.props.imgs]
      const lastIndex = moveleftArr.length - 1;
      const { currentPic } = this.state;
      const shouldResetIndex = currentPic === 0;
      const index =  shouldResetIndex ? lastIndex : currentPic - 1;
    
      this.setState({
        currentPic: index
      });
    }
    
    clickRight = () => {
      let moverightArr = [...this.props.imgs]
      const lastIndex = moverightArr.length - 1;
      const { currentPic } = this.state;
      const shouldResetIndex = currentPic === lastIndex;
      const index =  shouldResetIndex ? 0 : currentPic + 1;
      this.setState({
        currentPic: index
      });
    }
   


    displayCarousal = () => {
      if(this.props.imgs){
        return (
<div className="card-wrapper">
<div className="card-prev">
              <img  src={this.state.currentPic > 0 ? this.props.imgs[this.state.currentPic - 1].image : this.props.imgs[this.props.imgs.length - 1].image}  alt="carousel" />
            </div>
              <div className="carousel">
                 <button className="leftbutton" onClick={this.clickLeft}><i className="arrow left"></i></button>
                 <a href={this.props.imgs[this.state.currentPic].href} target="_blank">
                  <div className="content-overlay"></div>
                  <img src={this.props.imgs[this.state.currentPic].image} alt="carousel" />
                  <div className="content-details fadeIn-bottom">
                    <h3 className="content-title">Click to see details</h3>
                  </div>
                  </a>
                 <button className="rightbutton" onClick={this.clickRight}><i className="arrow right"></i></button>
              </div>
              <div className="card-next">
                <img  src={this.state.currentPic < this.props.imgs.length -1 ? this.props.imgs[this.state.currentPic + 1].image : this.props.imgs[0].image}  alt="carousel" />
              </div>
          </div>
        )
      } else {
        return(
          <div>
            Loading ....
          </div>
        )
      }
    }
    render() {
  
   
      // setInterval(() => {
      //   let st = this.state.currentPic;
      //   setTimeout(()=>{
      //     st++;
      //     this.setState({
      //       currentPic:st
      //     })
      //   }, 1000)
        
        
      // },2000);
        return (
          <>
           {this.displayCarousal()}
          </>
      )
      }
   
    
}

export default Bottom
