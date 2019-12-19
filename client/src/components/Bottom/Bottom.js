import React, { Component } from 'react';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import './bottom.css';


export class Bottom extends Component {
    constructor(props) {
        super(props);
        this.state = {
          currentPic: 0
        };
        this.clickRight = this.clickRight.bind(this);
        this.clickLeft = this.clickLeft.bind(this);
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
   

    displayCarousal = () => {
      if(this.props.imgs){
        return (
              <div className={this.props.optionSelected === "Dress" ? "carousel dresses-option" : "carousel"}>
                 <button className="leftbutton" onClick={this.clickLeft}>
                 <div className="arrow-overlay"></div>
                      <img  src={this.state.currentPic > 0 ? this.props.imgs[this.state.currentPic - 1].image : this.props.imgs[this.props.imgs.length - 1].image}  alt="carousel" />
                    <div className="bkgd-overlay">
                      <i className="fas fa-chevron-circle-left"></i>
                    </div>
                  </button>
                  <div className="carouselbox">
                 {/* <a href={this.props.imgs[this.state.currentPic].href} target="_blank"> */}
                  <div className="content-overlay"></div>
                  <TransformWrapper>
                    {({ zoomIn, zoomOut, resetTransform, ...rest }) => (
                      <React.Fragment>
                      <div className="tools">
                        <button onClick={zoomIn}>+</button>
                        <button onClick={zoomOut}>-</button>
                        <button onClick={resetTransform}>x</button>
                      </div>
                        <TransformComponent>
                          <img src={this.props.imgs[this.state.currentPic].image} alt='carousel' />
                        </TransformComponent>
                        </React.Fragment>
                    )}
                  </TransformWrapper>
                  <a href={this.props.imgs[this.state.currentPic].href} target="_blank">
                  <div className="content-details fadeIn-bottom">
                    <h3 className="content-title">Click to see details</h3>
                  </div>
                  </a>
                  </div>
                 <button className="rightbutton" onClick={this.clickRight}>
                    <div className="arrow-overlay"></div>
                    <img  src={this.state.currentPic < this.props.imgs.length -1 ? this.props.imgs[this.state.currentPic + 1].image : this.props.imgs[0].image}  alt="carousel" />
                    <div className="bkgd-overlay">
                      <i className="fas fa-chevron-circle-right"></i>
                    </div>
                  </button>
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
        return (
          <div className="card-wrapper">
           {this.displayCarousal()}
          </div>
      )
      }
   
    
}

export default Bottom
