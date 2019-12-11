import React, { Component } from 'react';
import Bottom from '../components/Bottom';

export default class Amazon extends Component {
    showSkirts = () =>{
        if(this.props.skirts.results){
           let allSkirts = this.props.skirts.results;
           // console.log(allSkirts)
          
        return allSkirts.map((eachSkirt,i)=>{
            return(
            <Bottom key={i} image={eachSkirt.image}/>
            )
        })
    } 
      }
      
      showWomenShorts = () =>{
        if(this.props.shorts.results){
           let allWomenShorts = this.props.shorts.results;
            //console.log(allWomenShorts)
          
        return allWomenShorts.map((eachShort,i)=>{
            return(
            <Bottom key={i} image={eachShort.image}/>
            )
        })
    }
      }
      
     
    render() {
      
        return (
            <div>
                {this.showSkirts()}
        {this.showWomenShorts()}
            </div>
        )
    }
}
