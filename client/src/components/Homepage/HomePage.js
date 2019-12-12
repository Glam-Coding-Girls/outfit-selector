import React, { Component } from 'react';
// import {Link} from 'react-router-dom';
import Bottom from '../Bottom/Bottom';
import './homepage.css';

export class HomePage extends Component {
  constructor(props){
    super(props);
    this.state = {
        defaultTop: this.props.topDefault,
        defaultBottom: this.props.bottomDefault
    }
}

showSkirts = () =>{
  if(this.props.topImages){
    let tops = [...this.props.topImages];
    return (
    <Bottom imgs={tops} />
    )
  }
  
}
showShorts = () =>{
 if(this.props.bottomImages){
  let bottoms = [...this.props.bottomImages]
  return (
  <Bottom imgs={bottoms} />
  )
 }

}
clickMen = () => {
  if(this.props.selectMen) {
    let tempDefaultMenTop = [];
    let tempDefaultMenBottom = [];
    let newMenArr = [...this.props.selectMen];
    newMenArr.forEach(menitem => {
      if(menitem.name.includes('Shirts')) {
        menitem.data.image.forEach((img)=>{
          if(img['data-herosrc']){
            tempDefaultMenTop.push(img['data-herosrc'])
          } else if(img['src']){
            tempDefaultMenTop.push(img['src'])
          }
        })
      } else if (menitem.name.includes('Pants')){
        menitem.data.image.forEach((img)=>{
          if(img['data-herosrc']){
            tempDefaultMenBottom.push(img['data-herosrc'])
          } else if(img['src']){
            tempDefaultMenBottom.push(img['src'])
          }
        })
      }
    })
    this.setState({
      defaultTop: tempDefaultMenTop,
      defaultBottom: tempDefaultMenBottom
    })
  }
}

clickWomen = () => {
  if(this.props.selectWomen) {
    let tempDefaultWomenTop = [];
    let tempDefaultWomenBottom = [];
    let newWomenArr = [...this.props.selectWomen];
    newWomenArr.forEach(womenitem => {
      if(womenitem.name.includes('Tops')) {
        womenitem.data.image.forEach((img)=>{
          if(img['data-herosrc']){
            tempDefaultWomenTop.push(img['data-herosrc'])
          } else if(img['src']){
            tempDefaultWomenTop.push(img['src'])
          }
        })
      } else if (womenitem.name.includes('Pants & Leggings')){
        womenitem.data.image.forEach((img)=>{
          if(img['data-herosrc']){
            tempDefaultWomenBottom.push(img['data-herosrc'])
          } else if(img['src']){
            tempDefaultWomenBottom.push(img['src'])
          }
        })
      }
    })
    this.setState({
      defaultTop: tempDefaultWomenTop,
      defaultBottom: tempDefaultWomenBottom
    })
  }
}

showDefault = () =>{
  let defaultTopImages = [...this.state.defaultTop]
  let defaultBottomImages = [...this.state.defaultBottom]
   return (
     <div>
      <Bottom imgs={defaultTopImages} />
      <Bottom imgs={defaultBottomImages} />
    </div>
   )
 
 }

  render() {
    // console.log("this is men arrays in home page", this.props.selectMen);
    return (

      <div className="outfitpanel">
      <div className="outfitsleft">
        <div className="outfit-title">
        <h1>Select a category</h1>
        </div>
        <button onClick={this.clickWomen}>Women</button>
        <button onClick={this.clickMen}>Men</button>
      </div>
      <div className="outfitsright">
        <div className="outfit-title">
        <h1>Create your favorite Outfit!</h1>
        </div>
        {this.showDefault()}
      </div>
      </div>

    )
  }
}
export default HomePage