import React, { Component } from 'react';
import './Home.css';
import { types } from 'util';

export default class Home extends Component {
    
    dispNav = (navType) => {
       
        this.selectedType = navType;
      }
   
   
    displayClothes= () => {
        return this.props.clothes.map((clothe,index)=>{
            if(clothe.type === this.selectedType){
                return (
                    <div key={index}>
                        {/* <h4>{clothe.name}</h4> */}
                        <div className="image-section">
                          {this.displayImages(clothe.data.image)}
                        </div>
                    </div>
                )
            }
        })
    }


    displayImages = (imgArr) =>{
        
       return imgArr.map((img,ind)=>{
           return (
               <img key={ind} src={img['data-herosrc'] || img['src']} alt={img.title} />
           )
       })
    }
  
    render() {
        return (
            <div>
             <nav>
                 <button onClick={()=>this.dispNav('Men')}>Men</button>
                 <button onClick={()=>this.dispNav('Women')}>Women</button>
             </nav>
                {this.displayClothes()}
            </div>
        )
    }
}
