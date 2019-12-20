import React, { Component } from 'react';
import Bottom from '../Bottom/Bottom';
import './homepage.css';

import SlideMenu from '../SlideMenu';
// import Select from 'react-select';


// const options = [
//   { value: 'Dress', label: 'One piece' },
//   { value: 'twoPiece', label: 'Two piece' },
// ];

export class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      // selectedOption: {},
      // isClearable: true,
      // isDisabled: false,
      // isLoading: false,
      // isRtl: false,
      // isSearchable: false,
    }
    this._menuToggle = this._menuToggle.bind(this);
    this._handleDocumentClick = this._handleDocumentClick.bind(this);
  }
  componentDidMount() {
    document.addEventListener('click', this._handleDocumentClick, false);
  }
  componentWillUnmount() {
    document.removeEventListener('click', this._handleDocumentClick, false);
  }
 
showTops = () =>{
  if(this.props.topImages){
    let tops = [...this.props.topImages];
    let selectOption = this.props.catSelection;
    if(tops.length > 0){
      return (
        <Bottom updateIndex={this.props.setTopIndex} imgs={tops} optionSelected={selectOption} />
        )
    }
    
  } 
}
showBottoms = () =>{
 if(this.props.bottomImages){
  let bottoms = [...this.props.bottomImages]
    if(bottoms.length > 0 ){
      return (
        <Bottom updateIndex={this.props.setBottomIndex} imgs={bottoms} />
        )
    } 
 }
}
showDefault = () =>{
   return (
     <>
      {this.showTops()}
      {this.showBottoms()}
      </>
   )
 }
 savePics = () => {
  //  so now just make an axios call here and send these 2 things
  if(!this.props.currentlyLoggedInUser){
    this.props.history.push('/login');
  } else{
  
    if(this.props.catSelection === 'Dress'){
    
      this.props.saveOutfit([this.props.topImages[this.props.currentTopIndex]]);
    } else {
    //  console.log(this.props.currentTopIndex,this.props.currentBottomIndex)
      this.props.saveOutfit([this.props.topImages[this.props.currentTopIndex],this.props.bottomImages[this.props.currentBottomIndex]]);
    }
  }
 }
 _handleDocumentClick(e) {
  if (!this.refs.rootmenu.contains(e.target) && this.state.isOpen === true && !e.target.classList.contains("showLeft")) {
    this.setState({
    isOpen: false
  });
  };
  // Detect all clicks on the document
    // If the click happened inside the modal, do nothing
  //   if (e.target.classList[0] && !e.target.closest('#menu') &&  !e.target.classList[0].includes('css'))  {
  //   this.setState({
  //     isOpen: false
  //   });
  // }
    // Otherwise, close any open modal windows
    // You would add the code for that here...
  
}
// clickedSelect = (e) => {
//   console.log(e)
//   this.setState({
//     //isOpen: !this.state.isOpen
//   });
// }
_menuToggle(e) {
  console.log(e)
  e.stopPropagation();
  this.setState({
    isOpen: !this.state.isOpen
  });
}
// handleChange = selectedOption => {
//   this.setState(
//     { selectedOption },
//     () => console.log(`Option selected:`, this.state.selectedOption)
//   );
//   this.props.setCatSelection(selectedOption)
// };
displayTopOptions = () => {
  return this.props.categoryTop.map((cat,ind)=>{
    return (
      <option value={cat}>{cat}</option>
    )
  })
}
displayBottomOptions = () => {
  return this.props.categoryBottom.map((cat,ind)=>{
    return (
      <option value={cat}>{cat}</option>
    )
  })
}

  render() {
    // const { selectedOption } = this.state;
    let menuStatus = this.state.isOpen ? 'isopen' : '';
   // this.props.checkMyOutfits(this.props.topImages[this.props.currentTopIndex],this.props.bottomImages[this.props.currentBottomIndex])
      return (
        <div className="outfitpanel">
          <div ref="rootmenu" className="sidebtn-options">
            <button id="button" className={menuStatus + " hambclicker"} onClick={ this._menuToggle }><span></span></button>
          </div>

          <SlideMenu menuStatus={ menuStatus }>
            <div className="innerfiltermenu">
            <div className="piecesoptionbtn showLeft">
              <select className="showLeft" name = "catTopSelection" value = {this.props.catTopSelection} onChange={this.props.setCatSelection}>
                 {this.displayTopOptions()}
            </select>
            </div>
            <div className="topmenu">
            <select className="showLeft" name = "catBottomSelection" value = {this.props.catBottomSelection} onChange={this.props.setCatSelection}>
                 {this.displayBottomOptions()}
            </select>
            </div>
            </div>
            </SlideMenu>
            <div className="home-wrapper">
        
          <div className="outfitsright"> 
            <div className="button-group">
            {/* <select name = "catTopSelection" value = {this.props.catTopSelection} onChange={this.props.setCatSelection}>
                 {this.displayTopOptions()}
            </select> */}
            <button className={this.props.isActive === "Women" ? "active btn btn-primary" : "btn btn-primary" } onClick={()=>this.props.setDefaultSelection('Women')}>Women</button>
            <button className={this.props.isActive === "Men" ? "active btn btn-primary" : "btn btn-primary" } onClick={()=>this.props.setDefaultSelection('Men')}>Men</button>
            {/* <select name = "catBottomSelection" value = {this.props.catBottomSelection} onChange={this.props.setCatSelection}>
                 {this.displayBottomOptions()}
            </select> */}
            </div>
           {this.showDefault()}
           {this.props.cannotSave  ? 
            <div className="saved-button-group">
             <button onClick={this.savePics} className="btn btn-primary" disabled>I am Disabled Save</button>
           </div>
           :
           <div className="saved-button-group">
             <button onClick={this.savePics} className="btn btn-primary">Save</button>
           </div>
           }
           {/* <div className="saved-button-group">
             <button onClick={this.savePics} className="btn btn-primary">Save</button>
           </div> */}
          </div>
          </div>
        
        </div>
      )

  
  }
}
export default HomePage