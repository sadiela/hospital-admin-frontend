//import {useState, useEffect} from 'react';
//import './App.css';
import GoogleLogin from 'react-google-login'
import LoggedIn from './LoggedIn';
import axios from 'axios';
//import { renderMatches } from 'react-router-dom';
import React, { Component } from 'react';

export default class App extends Component  {

  constructor(props) {
    super(props)
    this.onHandleFailure = this.onHandleFailure.bind(this);
    this.onHandleLogin = this.onHandleLogin.bind(this);
    this.onHandleLogout = this.onHandleLogout.bind(this);

    this.state = {
      adminlist : [],
      loginData : ''
    }
  }

  componentDidMount() {
    axios.get('/admin/people/2')
        .then((res) => {
          console.log(res.data)
          var admin_from_api = res.data.map(d => d.email)
          console.log(admin_from_api)
          this.setState({adminList: admin_from_api})
      }).catch((error) => {
          console.log(error)
      });
  }

  onHandleFailure(e) {
    alert(e);
  }

  onHandleLogin(e) {
    console.log(e)
    console.log(this.state.adminList)
    console.log(e.Lu.tf, e.Lu.Bv)
    var google_login_data = {
      "username": e.Lu.tf,
      "user_email": e.Lu.Bv
    }
    this.setState({loginData:google_login_data})
    //setLoginData(google_login_data);
    //localStorage.setItem('loginData', JSON.stringify(google_login_data))
  }


  onHandleLogout(e) {
    this.setState({loginData:''})
    //localStorage.removeItem('loginData');
    //setLoginData(null)
  }

  //getAdminList()
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <div>
            {
              (this.state.loginData !== '' && this.state.adminList !== [] && this.state.adminList.includes(this.state.loginData.user_email)) ? (
                <div>
                  <LoggedIn/>
                  <button onClick={this.onHandleLogout}>Logout</button>
                </div>
              ):(
                <div>
                <h1>Login to Hospital Admin Page</h1>
                <GoogleLogin 
                clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
                buttonText="Log in with Google"
                onSuccess={this.onHandleLogin}
                onFailure={this.onHandleFailure}
                cookiePolicy={'single_host_origin'}
                ></GoogleLogin>
                </div>
              )
            }
          </div>
        </header>
      </div>
    );
  }
}