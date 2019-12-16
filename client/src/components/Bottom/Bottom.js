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
          {/* <div className="card-prev">
              <img  src={this.state.currentPic > 0 ? this.props.imgs[this.state.currentPic - 1].image : this.props.imgs[this.props.imgs.length - 1].image}  alt="carousel" />
            </div> */}
              <div className={this.props.optionSelected === "Dress" ? "carousel dresses-option" : "carousel"}>
                 <button className="leftbutton" onClick={this.clickLeft}>
                 <div className="arrow-overlay"></div>
                    {/* <div className="card-prev"> */}
                      <img  src={this.state.currentPic > 0 ? this.props.imgs[this.state.currentPic - 1].image : this.props.imgs[this.props.imgs.length - 1].image}  alt="carousel" />
                    {/* </div> */}
                    <div className="bkgd-overlay">
                      {/* <i className="arrow left"></i> */}
                      <i class="fas fa-chevron-circle-left"></i>
                    </div>
                  </button>
                 <a href={this.props.imgs[this.state.currentPic].href} target="_blank">
                  <div className="content-overlay"></div>
                  <img src={this.props.imgs[this.state.currentPic].image} alt="carousel" />
                  <div className="content-details fadeIn-bottom">
                    <h3 className="content-title">Click to see details</h3>
                  </div>
                  </a>
                 <button className="rightbutton" onClick={this.clickRight}>
                    <div className="arrow-overlay"></div>
                    <img  src={this.state.currentPic < this.props.imgs.length -1 ? this.props.imgs[this.state.currentPic + 1].image : this.props.imgs[0].image}  alt="carousel" />
                    <div className="bkgd-overlay">
                      <i class="fas fa-chevron-circle-right"></i>
                    </div>
                  </button>
              </div>
              {/* <div className="card-next">
                <img  src={this.state.currentPic < this.props.imgs.length -1 ? this.props.imgs[this.state.currentPic + 1].image : this.props.imgs[0].image}  alt="carousel" />
              </div> */}
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
