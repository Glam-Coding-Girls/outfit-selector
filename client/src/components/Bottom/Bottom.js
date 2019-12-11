import React, { Component } from 'react';
import './bottom.css';

export class Bottom extends Component {
    constructor(props) {
        super(props);
        this.state = {
          currentPic: 0,
          slidesArr: this.props.images
          // list: Cardjson
        }
    }
    clickLeft = () => {
      let moveleftArr = [...this.state.slidesArr]
      const lastIndex = moveleftArr.length - 1;
      const { currentPic } = this.state;
      const shouldResetIndex = currentPic === 0;
      const index =  shouldResetIndex ? lastIndex : currentPic - 1;
    
      this.setState({
        currentPic: index
      });
    }
    
    clickRight = () => {
      let moverightArr = [...this.state.slidesArr]
      const lastIndex = moverightArr.length - 1;
      const { currentPic } = this.state;
      const shouldResetIndex = currentPic === lastIndex;
      const index =  shouldResetIndex ? 0 : currentPic + 1;
    
      this.setState({
        currentPic: index
      });
    }
    render() {
        return (
            <div className="card-wrapper">
                <div className="carousel">
                <button className="leftbutton" onClick={this.clickLeft}><i className="arrow left"></i></button>
                <img src={this.state.slidesArr[this.state.currentPic]}  alt="carousel" />
                <button className="rightbutton" onClick={this.clickRight}><i className="arrow right"></i></button>
                </div>
            </div>
        )
    }
}

export default Bottom
