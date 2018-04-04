import React, { Component } from 'react';
import axios from 'axios';
import moment from 'moment';

import '../Assets/ComponentesCSS/columns.css';
import Modals from './modals';

/*Imagenes*/

import megusta from '../Assets/Iconos/icon-fb/like@2x.png';
import amor from '../Assets/Iconos/icon-fb/encanta@2x.png';
import asombra from '../Assets/Iconos/icon-fb/asombra@2x.png';
import triste from '../Assets/Iconos/icon-fb/triste@2x.png';
import enojo from '../Assets/Iconos/icon-fb/enoja@2x.png';
import comentario from '../Assets/Iconos/icon-fb/comentarios@2x.png';

import agregar from '../Assets/Iconos/Agregar_icon.png';
import likefb from '../Assets/Iconos/likefb.png';
import love from '../Assets/Iconos/reacciones/love.png';
import wow from '../Assets/Iconos/reacciones/wow.png';
import share from '../Assets/Iconos/share.png';
import retweet from '../Assets/Iconos/retweet@2x.png';
import favorite from '../Assets/Iconos/like@2x.png';
import sha from '../Assets/Iconos/sha.png';
import views from '../Assets/Iconos/views.png';

import logo from '../Assets/img/mara/logo.png';
import tw from '../Assets/Iconos/twitterlogo-color.png';
import fb from '../Assets/Iconos/fb2.png';
import post1 from '../Assets/Iconos/place_holder.jpg';
import{deprueba} from '../Assets/js/script.js';
import * as firebase from 'firebase';
import {config} from '../Assets/js/cons.js';
import {app, verifyDashboards2} from '../Assets/js/script.js';


var numeral = require('numeral');
var id = 'ProgramadoresAndanDiciendo';
var url = window.location.href;
var id1 = url.substring(url.lastIndexOf('/') + 1 );
var API_fb= "";
/*declaramos como constantes a las APIS*/

class Columns extends Component {
/*declaramos el constructor*/ 
constructor(props){
  super(props);
  this.state = {
    posts:[],
    data:[],

  }
}

componentDidMount(){
  const {user} = this.props;

  API_fb = 'https://api-inxights-staging.herokuapp.com/public/v1/facebook/posts?api_token=14c261ec0de964822a4fb1a18538b26a2ed4b661130babda14504db0eb084dde&username='+user;
     axios.get(API_fb)
    .then((res) => {
      console.log(res.config.url)

      this.setState({
        data: res.data.data
      });
    })
    .catch(function(e){
      console.log('ERROR', e);
    })

  // console.log(user);
 
}
  render() {

    const renderPostfb = this.state.data.map(function(postfb, i){
     if(postfb.content.type == "video"){
       return(
                       <div key={i} className="thumbnail card-column" style={{marginLeft:"10px"}}>
                                  <div className="caption">
                                  <p className="date">
                                        {moment(postfb.content.created_at).format('Do MMMM YYYY, h:mm:ss a')}
                                        </p>

                                      <p>{postfb.content.message}</p>
                                      <a className="link" href={postfb.permalink} target="_blank">Ver post</a>
                                    </div>

                                    <video height="300" controls>
                                      <source src={postfb.content.source}/>
                                    </video>
                                  
                                   <div className="opciones2">
                                         <a className="btn"> <img src={megusta} alt="share" /> {numeral(postfb.reactions.like).format('0 a')}</a>&nbsp;
                                        <a>{numeral(postfb.reactions.love).format('0 a')} <img src={amor} alt="share" /></a>&nbsp;
                                        <a>{numeral(postfb.reactions.wow).format('0 a')} <img src={asombra} alt="share" /></a>&nbsp;
                                        <a>{numeral(postfb.reactions.SAD).format('0 a')}<img src={triste} alt="icon-fb" /></a>
                                      
                                        
                              </div>
                               
                         </div> 

        );
     }
     else {
         return(
                       <div key={i} className="thumbnail card-column" style={{marginLeft:"10px"}}>
                                  <div className="caption">
                                  <p className="date">
                                        {moment(postfb.content.created_at).format('Do MMMM YYYY, h:mm:ss a')}
                                        </p>

                                      <p>{postfb.content.message}</p>
                                      <a className="link" href={postfb.permalink} target="_blank">Ver post</a>
                                    </div>

                                  <img src={postfb.content.picture} />

                                   <div className="opciones2">
                                        <a className="icon">{numeral(postfb.reactions.like).format('0 a')} <img src={megusta} alt="share" /></a>&nbsp;
                                        <a>{numeral(postfb.reactions.love).format('0 a')} <img src={amor} alt="share" /></a>&nbsp;
                                        <a>{numeral(postfb.reactions.wow).format('0 a')} <img src={asombra} alt="share" /></a>&nbsp;
                                        <a>{numeral(postfb.reactions.SAD).format('0 a')}<img src={triste} alt="icon-fb" /></a>&nbsp;
                                        <a>{numeral(postfb.reactions.ANGRY).format('0 a')}<img src={enojo} alt="icon-fb" /></a>&nbsp;
                                        
                              </div>
                               
                         </div> 

        );
     }
    });
    
    
   
    return (
                <div className="columns-post">
                    {renderPostfb}
                  </div>
    );
  }
}

export default Columns;