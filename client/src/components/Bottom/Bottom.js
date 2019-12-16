import React, { Component } from 'react';
import './bottom.css';

export class Bottom extends Component {
    constructor(props) {
        super(props);
        this.state = {
          currentPic: 0,
          currentImage: ""
        };
        this.clickRight = this.clickRight.bind(this);
        this.clickLeft = this.clickLeft.bind(this);
        this.changeCurrentImage = this.changeCurrentImage.bind(this);
    }
    
    clickLeft = () => {
      let moveleftArr = [...this.props.imgs]
      const lastIndex = moveleftArr.length - 1;
      const { currentPic } = this.state;
      const shouldResetIndex = currentPic === 0;
      const index =  shouldResetIndex ? lastIndex : currentPic - 1;

      this.props.updateIndex(index);
    
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

      this.props.updateIndex(index);
    
      this.setState({
        currentPic: index
      });
    }

    changeCurrentImage = (e) => {
      // console.log('=-=-=-=-')
      // console.log(e)
      this.setState({currentImage: this.props.imgs[e].image});
      // so you pass in all the images through props?
      //I was experiencing around, trying to find the right solution, either with currentindex or picture...
    }

    displayCarousal = () => {
      if(this.props.imgs){
        return (
          <div className="card-wrapper">
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
      // console.log("in bottomjs clothes",this.props.imgs)
      console.log("current array index on bottomjs",this.state.currentPic);
      
        return (
          // <div className="card-wrapper">
          //     <div className="carousel">
          //        <button className="leftbutton" onClick={this.clickLeft}><i className="arrow left"></i></button>
          //        <img src={this.props.imgs[this.state.currentPic]}  alt="carousel" />
          //        <button className="rightbutton" onClick={this.clickRight}><i className="arrow right"></i></button>
          //     </div>
          // </div>
          <>
           {this.displayCarousal()}
          </>
      )
      }
   
    
}

export default Bottom
