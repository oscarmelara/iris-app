import React, { Component } from 'react';
import axios  from 'axios';
import moment from 'moment';
import 'moment/locale/es';
import '../Assets/ComponentesCSS/Cards.css';


import Modals from './modals';
/*Imagenes*/
import agregar from '../Assets/Iconos/Agregar_icon.png';

import divierte from '../Assets/Iconos/reacciones/divierte.png';
import love from '../Assets/Iconos/reacciones/love.png';
import wow from '../Assets/Iconos/reacciones/wow.png';
import retweet from '../Assets/Iconos/retweet@2x.png';
import share from '../Assets/Iconos/share.png';

import likefb from '../Assets/Iconos/likefb.png';
import tw from '../Assets/Iconos/twitterlogo-color.png';
import favorite from '../Assets/Iconos/like@2x.png';
import post1 from '../Assets/Iconos/place_holder.jpg';
import arrow from '../Assets/Iconos/arrow.png';
import fb from '../Assets/Iconos/fb.png';

var numeral = require('numeral');
/*Conexion de api*/
var id = 'ProgramadoresAndanDiciendo';
let imgval;



class Cards extends Component {

  constructor(props){
    super(props);
    this.state = {
      posts:[],
       data:[],
       users:[],
       
    }
  }

  componentDidMount(){
    const {user} = this.props;
    const {socialNetwork} = this.props;
    let APIDa=[];
    let posts=[];
    let value;

    for(var j=0; j<user.length; j++ ){
      if(socialNetwork[j]=="Facebook"){
        APIDa[j] = 'https://api-inxights-staging.herokuapp.com/public/v1/facebook/posts?api_token=14c261ec0de964822a4fb1a18538b26a2ed4b661130babda14504db0eb084dde&username='+user[j];
      }
      else if(socialNetwork[j]=="twitter"){
        APIDa[j] = 'https://api-inxights-staging.herokuapp.com/public/v1/twitter/posts?api_token=14c261ec0de964822a4fb1a18538b26a2ed4b661130babda14504db0eb084dde&username='+user[j];
      }
    }
      let _this = this;
      axios.all(APIDa.map(l => axios.get(l)))
      .then(axios.spread((...res) => {
        for(var j=0; j<user.length; j++ ){
          // console.log({
          //   ...this.state.posts,
          //   ...res[j].data
          // });
          if(socialNetwork[j]=="Facebook"){

          this.setState({
            posts: [
              ...this.state.posts,
              ...res[j].data.data
            ]
          });
          }
          else if(socialNetwork[j]=="twitter"){
            this.setState({
            posts: [
              ...this.state.posts,
              ...res[j].data
            ]
          });
          }
        }
      }))
      .catch(function(e){
        console.log('ERROR ', e);
      })

      
  }

  render() {
    let renderPostsn;
    let self = this;
    const {user} = this.props;
    // for(var j=0; j<user.length; j++ ){
     let postsOrdenados = this.state.posts.sort((a, b) => new Date(...b.content.created_at.split('/').reverse()) - new Date(...a.content.created_at.split('/').reverse()) );
      
       renderPostsn = postsOrdenados.map(function(postsn, i){
        const DefaultPlaceholdeR = 
          function vavavav(){
            if(postsn.content.picture == null){
              return(<img src={post1}/>);
            } 
            else{
              return(<img src={postsn.content.picture}/>);
            }
          }
        var usernamevar=postsn.content.username;
        var usersplit = usernamevar.split("@");
        if(usersplit.length>1){
         return (
                 <div  className="col-md-3 col-lg-5 space ">
                   <div className="card" key={i}>
                  
              
                       <a className="img-card" >
                       <img src={post1} />
                       </a>
                  
                      
                       <div className="card-content">
                       <h4 className="card-title"><img style={{}} src={tw} />{postsn.content.username}</h4>
                      
                          <div className="texto-card">
                            <p className="card-text">
                            {postsn.content.message}
                          </p>
                          </div>

                           <div className="opciones">
                             <a className="float-opciona">{postsn.retweet} <img src={retweet} alt="share" /></a>
                             <a className="float-opciona iconshare">{postsn.favorite} <img src={favorite} alt="share" /></a>
                             
                             <a className="float-opcion">
                               {moment(postsn.content.created_at).format('Do MMMM YYYY, h:mm:ss a')}
                               </a>
                           </div>
                       </div>
                      
                   </div>
               </div>
                              
           );
        }
        else{
         return (
                 <div  className="col-md-3 col-lg-5 space ">
                    <div className="card" key={i}>
                        <a className="img-card">
                        <DefaultPlaceholdeR />
                      </a>
                      
                        <div className="card-content">
                         <h4 className="card-title"><img src={fb} alt="icon-fb" /> {postsn.content.username}</h4>
                          
                            <div className="texto-card">
                               <p className="card-text">
                               {postsn.content.message}
                                </p>
                               </div> 
                           
                          </div>
                      <div className="opciones">
                      
                                <a className="float-opciona">{numeral(postsn.reactions.like).format('0 a')} <img className="likefb" src={likefb} alt="share" /></a>
                                <a className="float-opciona icon">{numeral(postsn.reactions.love).format('0 a')} <img src={love} alt="share" /></a>
                                <a className="float-opciona icon2">{numeral(postsn.reactions.wow).format('0 a')} <img src={wow} alt="share" /></a>
                                <a className="float-opciona icon3">{numeral(postsn.shares).format('0 a')} <img src={share} alt="share"/></a>
                               <a className="float-opcion">
                                {moment(postsn.content.created_at).format('Do MMMM YYYY, h:mm:ss a')}
                                </a>
                      </div>
                   </div>
               </div>
                              
           );

        }
       });

    // }

  
    return (
    
      <div className="Cards">

                     <div align="center">
                        {renderPostsn}   
                    </div>  
       
      </div>
      
    );
  }
  
}

export default Cards;