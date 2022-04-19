import React, { Component } from 'react';
import axios from 'axios'

var role_key = {
  0:'patient', //: 0, 
  1:'doctor',//: 1,
  2:'administrator'//:2
}

export default class Users extends Component {
    constructor(props) {
        super(props)
        this.state = {
            usernames:[]
        }
    }

    componentDidMount() {
        axios.get('/admin/people')
            .then(res => {
                this.setState({ usernames: res.data });
                console.log(res.data)
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    render() {
        return (
            <div>
            <p><b>List of All Users</b></p>
            <p>ID Name Email Role</p>
            {(this.state.usernames.length === 0) ? (
              <p>NO USERS</p>
            ) : (
              this.state.usernames.map((data,i) => (
                <p key={i}>{data.userid} {data.username} {data.email} {role_key[data.role]}</p>
              ))
            )}
          </div>
        )
    }
}