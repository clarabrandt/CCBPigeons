import React, { Component } from 'react';
import './Content.css';
import Videos from './Videos.js';
import Youtube from './Youtube.js'


export default class Content extends Component {
  
  render() {
    
    return (
      <div className='content--grid'>
        <div className='content--left'>
        <div className='news'>
          <h3>Notícias</h3>
          <h4>>> 11/01/2019 Prêmio melhor pombo do ano CCB Pigeons</h4>
          <h4>>> 05/01/2019 Peça seu catálogo para o próximo leilão da CCB Pigeons</h4>
        </div>
        </div>
        <div className='content--main'>
        <h1>CCB Pigeons</h1>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
            sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris 
            nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in 
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia 
            deserunt mollit anim id est laborum.</p>
        </div>
        <div className='content--right'>
         <div className='videos'>
          <Videos videoId='OShgy4uv894'/>
         </div>
        <div className='canal-youtube--text'>Para mais vídeos, acesse: </div>
        <div className='canal-youtube'>
          <Youtube /> 
          <div className='canal-youtube--text'> Otávio Riberio Júnior</div>
         </div>
        </div>
      </div>
    )
  }
}

