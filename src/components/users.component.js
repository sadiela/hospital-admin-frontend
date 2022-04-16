import React, { Component } from 'react';
import axios from 'axios'


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
            {(this.state.usernames.length === 0) ? (
              <p>NO USERS</p>
            ) : (
              this.state.usernames.map((data,i) => (
                <p key={i}>{data.username} {data.email} {data.role}</p>
              ))
            )}
          </div>
        )
    }
}