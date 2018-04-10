import React, { Component } from 'react';

import '../Assets/ComponentesCSS/modals.css';

import facebook from '../Assets/Iconos/fb.png';
import AlertValidation from './alerts/alertValidation';
import AlertAdd from './alerts/alertAdd';
import AlertValidationSn from './alerts/alertValidationSn';
import AlertAddSn from './alerts/alertAddSn';
import tw from '../Assets/Iconos/twitterlogo-color.png';
import layout from '../Assets/Iconos/layout.png';
import layout1 from '../Assets/Iconos/layout1.png';
import publico from '../Assets/Iconos/publico.png';
import privado from '../Assets/Iconos/privado.png';
import * as firebase from 'firebase';
import {config} from '../Assets/js/cons.js';
import{app,createDashboard, createSocialNetwork, } from '../Assets/js/script.js';


class Modals extends Component {
    constructor(props) {
    super(props);

    this.state = {
      msg: null,
      sn: null,
      users: [],
      homeLink:"XD"
    };
    this.signInGoo = this.signInGoo.bind(this);
    this.createsn = this.createsn.bind(this);
  }
  signInGoo() {
    const goo = createDashboard();

    goo.then((resp) => {

      if (resp.status === true) {
        //const {name, email, uid} = resp;
        this.setState({msg: <AlertAdd />});

        //checkIfUserExists(name, email, uid);
      } else {
        this.setState({msg: <AlertValidation />});
        
        //extermin();
      }

      console.log({then: resp});
    }).catch((resp) => {
      if (resp.status === false) {
        this.setState({msg: <AlertValidation />});
      }

      // console.log({catch: resp});
    });
  }
  createsn() {
    const goo = createSocialNetwork();

    goo.then((resp) => {
      if (resp.status === true) {
        //const {name, email, uid} = resp;
        this.setState({sn: <AlertAddSn />});

        //checkIfUserExists(name, email, uid);
      } else {
        this.setState({sn: <AlertValidationSn />});
        
        //extermin();
      }

      console.log({then: resp});
    }).catch((resp) => {
      if (resp.status === false) {
        this.setState({sn: <alertValidationSn />});
      }

      // console.log({catch: resp});
    });
  }
componentDidMount(){
     const self = this;
            const rootRef = app.database().ref().child('users');
            const userRef = rootRef.child('vavava');
            
            firebase.auth().onAuthStateChanged(function(user) {
              rootRef.once('value', function(snapshot){
                snapshot.forEach(function(childSnapshot){
            if (user) {
              var uskey = childSnapshot.key;
              var useremail = childSnapshot.child("email").val();
              var namelog = firebase.auth().currentUser;
                if (namelog.email == useremail) {
                  var dashdirection=app.database().ref("users/"+uskey+"/Dashboard/");
                    dashdirection.once("value").then(function(snapshot) {
                      snapshot.forEach(function(childSnapshot) {
                         var url = window.location.href;
                          var id = url.substring(url.lastIndexOf('/') + 1 );
                          var dashid = childSnapshot.child("did").val();
                          if(dashid == id){
                            var dashkey = childSnapshot.key
                            var sNetworkDir=app.database().ref("users/"+uskey+"/Dashboard/"+dashkey+"/SocialNetwork");
                            sNetworkDir.once("value").then(function(snapshot) {
                              snapshot.forEach(function(childSnapshot) {
                                self.setState({
                                  users: self.state.users.concat(childSnapshot.val())
                                });
                              });
                            });
                          }
                        /**/
                      });
                    });
                }  
            }
              else{
                    var uskey = childSnapshot.key;
                    var key2 = childSnapshot.child("email").val();         
                    var dashdirection = app.database().ref("users/"+uskey+"/Dashboard/");

                     dashdirection.once("value").then(function(snapshot) {
                      snapshot.forEach(function(childSnapshot) {
                             var url = window.location.href;
                              var id = url.substring(url.lastIndexOf('/') + 1 );
                              var dashid = childSnapshot.child("did").val();
                              if(dashid == id){
                                var keydashboard = childSnapshot.key;
                                var design=app.database().ref("users/"+uskey+"/Dashboard/"+dashkey+"/Design");
                                design.once("value").then(function(snapshot) {
                                  snapshot.forEach(function(childSnapshot) {
                                      var columnss = childSnapshot.child("columns").val();
                                      if (columnss == true) {
                                        self.setState({
                                          design: "columns"
                                        });
                                      }
                                      else{
                                          self.setState({
                                            design: "cards"
                                          });
                                      }
                                  });
                                });
                                var dashkey = childSnapshot.key
                                var sNetworkDir=app.database().ref("users/"+uskey+"/Dashboard/"+dashkey+"/SocialNetwork");
                                sNetworkDir.once("value").then(function(snapshot) {
                                  snapshot.forEach(function(childSnapshot) {
                                    self.setState({
                                      users: self.state.users.concat(childSnapshot.val())
                                    });
                                  });
                                });
                              }
                            /**/
                          });
                      });
                  // Cancel enumeration

              }
               });
              });
            });
}
 onDeleteData(data) {
          let self = this;

          var usersInic = this.state.users;
          
          for (var i = 0; i < usersInic.length; i++) {
            console.log(usersInic[i].user, data.user);
              if (usersInic[i].user === data.user) {
                  usersInic.splice(i, 1);
              }
          }
          if (usersInic.length === 0) {
              this.setState({
                  evaluate: "vacio"
              });
          }
          this.setState({
              users: usersInic
          });

          var query = firebase.database().ref("users");
          firebase.auth().onAuthStateChanged(function(user) {
              query.once("value").then(function(snapshot) {
                  snapshot.forEach(function(childSnapshot) {
                      var namelog = firebase.auth().currentUser;
                      var key2 = childSnapshot.child("email").val();
                      if (namelog.email == key2) {
                          var keys = childSnapshot.key;
                          var dashdirection = app.database().ref("users/" + keys + "/Dashboard/");
                          dashdirection.once("value").then(function(snapshot) {
                              snapshot.forEach(function(childSnapshot) {
                                  var dashboardid = childSnapshot.child("did").val();
                                  var url = window.location.href;
                                  var id = url.substring(url.lastIndexOf('/') + 1 );
                                  if (id == dashboardid) {
                                      var keydashboard = childSnapshot.key;
                                      var socialNetwork = app.database().ref("users/"+keys+"/Dashboard/"+keydashboard+"/SocialNetwork/");
                                      socialNetwork.once("value").then(function(snapshot) {
                                          snapshot.forEach(function(childSnapshot){
                                                if(data.user === childSnapshot.child("user").val()){
                                                  var userkey = childSnapshot.key;
                                                  var userSn = app.database().ref("users/"+keys+"/Dashboard/"+keydashboard+"/SocialNetwork/"+userkey);
                                                  userSn.remove();
                                                }
                                          });
                                      });
                                  }
                              });
                          });
                      }
                  });
              });
          });
          this.props.changeContent(this.state.users);
}
  render() {
 const List = (props) => {                 
        
            return(<div className="row">
            {this.state.users.map((item,i) => {
                if(item.facebook===true){
                return( 
                    
                        <div key={i} className="col-md-12">
                            <div className="account">
                            <div className="col-md-3">
                             <img src={facebook} alt="logo-fb"/>  
                            </div>
                            <div className="col-md-6">
                                <span className="name">{item.user}</span>
                                <span className="username">@{item.user}</span>
                            </div>
                            <div className="col-md-3">
                           <a onClick={this.onDeleteData.bind(this, item)}><span className="glyphicon glyphicon-remove" aria-hidden="true"></span></a>
                            </div>
                            </div>
                        </div> 
                    
                );
            }
            else{
                return(
                
                    <div key={i} className="col-md-12">
                        <div className="account">
                        <div className="col-md-3">
                         <img src={tw} alt="logo-fb"/>  
                        </div>
                        <div className="col-md-6">
                            <span className="name">{item.user}</span>
                            <span className="username">{item.user}</span>
                        </div>
                        <div className="col-md-3">
                       <a onClick={this.onDeleteData.bind(this, item)}><span className="glyphicon glyphicon-remove" aria-hidden="true"></span></a>
                        </div>
                        </div>
                    </div> 
                

                );
            }
        })}
            </div>);
        }
    return (
      <div className="Modals">
        <div id="modal-account" className="modal modal5 fade" role="dialog" >
              <div className="modal-dialog modal-dialog1 ">
                <div className="modal-content modal-content1">
                 {this.state.sn}
                  <div className="modal-body modal-body5">
                    <div className="account-header">
                    <h2>Edita tus cuentas</h2>
                    <p>Selecciona las cuentas que desees eliminar en tu dashboard</p>
                    </div>
                        <List users = { this.state.users } /> 
                  </div>
                </div>
              </div>
            </div>
      		<div id="myModal" className="modal modal1 fade" role="dialog">
			  <div className="modal-dialog modal-dialog1 ">

			  
			    <div className="modal-content modal-content1">
			     {this.state.sn}  
			      <div className="modal-body modal-body1">
			      
			        <h2>Seleccione una red social</h2>
			        <p>Agregar una cuenta a tu dashboard y revisa constantemente su contenido</p>

			        <div className="redes">
    			     <input type="radio" className="radio_item" value="" name="item" id="radio1"/>
                     <label className="label_item" htmlFor="radio1"> <img src={facebook} /> </label>
                     <input type="radio" className="radio_item" value="" name="item" id="radio2"/>
                     <label className="label_item" htmlFor="radio2"> <img src={tw} /> </label>
			     </div>

			     <form>
			     	<div className="form-group" align="center">
					   
					    <input type="email" className="form-control input-color-blue" id="usname"/>
					  </div>
			     </form>
			      <a onClick={this.createsn} className="btn bt-primary btnAgregar adddash">Agregar cuenta</a>
			      </div>

			      
			    </div>

			   

			  </div>
			</div>
        	



        	<div className="modal modal2 fade" id="myModal2" role="dialog">
			    <div className="modal-dialog modal-dialog2 ">

			      <div className="modal-content modal-content2">
			         {this.state.msg}  
			        <div className="modal-body modal-body2">
			        	<div className="row">
			         	 <form>
			                  <h4 id="modalActionVal">Nuevo Dashboard</h4>
			                  <div className="form-group">
			                  	<input className="form-control input-noborder" id="dname" placeholder="Nombre del dashboard" style={{border:"none", boxShadow: "none"}} required/>
                                <br/>
                                <textarea className="form-control input-noborder ddescription" id="ddescription" placeholder="Description del dashboard " style={{resize: "none", border:"none", boxShadow: "none"}} required></textarea>
                                <br/>
			                  </div>
                		</form>

                		<div className="seleccion-col">
                			<h4>Diseño</h4>

                			<div className="row">
                				<div className="col-md-4">
	                				<div className="radio radio-danger">
									  <label><input type="radio" name="optradio" id="columns"/>Columnas</label>
									</div>
                				</div>
                				<div className="col-md-8 layout" align="left">
	                				<img src={layout} alt="radio-opcion" />
	                				<p>Visualiza distintas cuentas en forma de columnas</p>
                				</div>
                			</div>

                			<br />

                			<div className="row">
                				<div className="col-md-4">
	                				<div className="radio radio-danger">
									  <label><input type="radio" name="optradio" id="cards" />Cards</label>
									</div>
                				</div>


                				<div className="col-md-8 layout" align="left">
                				<img src={layout1} alt="radio-opcion2" />
                				<p>Visualiza distintas cuentas en forma de tarjetas</p>
                				</div>
                			</div>
                		</div>
                		<form>
                		<div className="seleccion-col">
                			<h4>Privacidad</h4>

                			<div className="row">
                				<div className="col-md-6 privacy">
	                				<div>
                                        <img src={publico} alt="opcion2.2" with="10"/>
                                        <label className="switch">
                                            <input type="checkbox" id="check"/>
                                            <span className="slider"></span>
                                        </label>
                                        <img src={privado} alt="privado" with="10"/>
                                    </div>

                				</div>
                				
                			</div>

                			<br />

                			
                		</div>

                		<div className="btn-right">
                		<a onClick={this.signInGoo} className="btn btn-primary btn-green adddash" id="adddashbutt" >Crear dashboard</a>
                		</div>
                		</form>

                	</div>

			        </div>
			        
			      </div>
			    </div>
			  </div>

			  <div className="modal modal2 fade" id="myModal3" role="dialog">
			    <div className="modal-dialog modal-dialog2 ">
			      <div className="modal-content modal-content2">
			        
			        <div className="modal-body modal-body2">
			        	<div className="row">
			         	 <form >
			                  <h4>Actualizar Dashboard</h4>
			                  <div className="form-group">
			                  	<input required className="form-control input-noborder" placeholder="Nombre de dashboard" id="dashnameUpd" />
                                <br/>
                                <textarea className="form-control input-noborder" id="descriptionUpd" placeholder="Dashboard description" required></textarea>
			                  </div>
                		</form>

                		<div className="seleccion-col">
                			<h4>Diseño</h4>

                			<div className="row">
                				<div className="col-md-4">
	                				<div className="radio radio-danger">
									  <label><input id="colUpd" type="radio" name="optradio" />Columnas</label>
									</div>
                				</div>
                				<div className="col-md-8 layout" align="left">
	                				<img src={layout} alt="radio-opcion3" />
	                				<p>Lorem ipsum</p>
                				</div>
                			</div>

                			<br />

                			<div className="row">
                				<div className="col-md-4">
	                				<div className="radio radio-danger">
									  <label><input type="radio" id="cardUpd" name="optradio" />Cards</label>
									</div>
                				</div>


                				<div className="col-md-8 layout" align="left">
                				<img src={layout1} alt="radio-opcion4"/>
                				<p>Lorem ipsum</p>
                				</div>
                			</div>
                		</div>
                		<form>
                		<div className="seleccion-col">
                			<h4>Privacidad</h4>

                			<div className="row">
                				<div className="col-md-4">
	                				<div className="radio radio-danger">
									  <label><input type="radio" id="publiUpd" name="optradio" /><img src={publico} alt="public2" /></label>
									</div>
                				</div>
                				<div className="col-md-8 layout" align="left">
	                				
	                				<p>Publico para todos los usuarios</p>
                				</div>
                			</div>

                			<br />

                			<div className="row">
                				<div className="col-md-4">
	                				<div className="radio radio-danger">
									  <label><input type="radio" id="privateUpd" name="optradio" /><img src={privado} alt="privated" /></label>
									</div>
                				</div>


                				<div className="col-md-8 layout" align="left">
                				
                				<p>Privado</p>
                				</div>
                			</div>
                		</div>

                		<div className="btn-right">
                		<a onClick={this.signInGoo} className="btn btn-primary btn-green">Actualizar dashboard</a>
                		</div>
                		</form>

                	</div>

			        </div>
			        
			      </div>
			    </div>
			  </div>


			  
			  
      </div>


    );
  }
}

export default Modals;