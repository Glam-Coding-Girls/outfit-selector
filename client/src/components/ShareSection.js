import React, { Component } from 'react'
import {FacebookShareButton,PinterestShareButton} from 'react-share';
import {FacebookIcon, PinterestIcon} from 'react-share';

export class ShareSection extends Component {
    render() {
        return (
            <>
              <div className={this.props.styleContainer}>
                  <div className="facebook-container">
                  <FacebookShareButton
                  url={this.props.fbUrl}
                  quote={this.props.fbQuote}
                  hashtag={this.props.hashtag}
                  className="share-button">
                  <FacebookIcon
                    size={52}
                    round />
                  </FacebookShareButton>
                  </div>

                  <div className="pinterest-container">
                  <PinterestShareButton
                    media={this.props.ptUrl}
                    description={this.props.ptDescription}>
                    <PinterestIcon size={52} round />
                  </PinterestShareButton>
                </div>


             </div>
                
            </>
        )
    }
}

export default ShareSection