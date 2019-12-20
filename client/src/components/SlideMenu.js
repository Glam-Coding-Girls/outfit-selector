import React, { Component } from 'react'

export class SlideMenu extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className={this.props.menuStatus} id="menu">
        {this.props.children}
       </div>
    )
  }
}

export default SlideMenu
