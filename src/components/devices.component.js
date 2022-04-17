import React, { Component } from 'react';
import axios from 'axios'

export default class Devices extends Component {
    constructor(props) {
        super(props)
        this.state = {
            devices:[]
        }
    }

    componentDidMount() {
        axios.get('/admin/devices')
            .then(res => {
                this.setState({ devices: res.data });
                console.log(res.data)
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    render() {
        return (
            <div>
            <p><b>List of All Devices</b></p>
            {(this.state.devices.length === 0) ? (
              <p>NO USERS</p>
            ) : (
              this.state.devices.map((data,i) => (
                <p key={i}>{data.deviceid}</p>
              ))
            )}
          </div>
        )
    }
}