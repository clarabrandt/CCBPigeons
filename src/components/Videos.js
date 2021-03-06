import React, { Component } from 'react';
import YouTube from 'react-youtube';
import './Video.css'

export default class Videos extends Component {
  videoOnReady (event) {
    event.target.pauseVideo(0)
  }
  render() {
    const opts = {
      height: '200',
      width: '250',
    }
    const {videoId} = this.props
    return (
      <div className='video'>
        <YouTube
          videoId={videoId}
          opts={opts}
          onReady={this.videoOnReady}
        />
      </div>
      );
    
  }
}
