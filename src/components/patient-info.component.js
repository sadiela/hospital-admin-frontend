// Dropdown to choose patient
// Submit to render patient info

import React, { Component } from 'react';
import axios from 'axios'


export default class PatientInfo extends Component {
    constructor(props) {
        super(props)
        this.onSelect = this.onSelect.bind(this);
        this.state = {
            selectedUser: '',
            selectedUserData: '',
            userData: [],
        }
    }

    componentDidMount() {
        axios.get('/admin/people/0')
            .then(res => {
                this.setState({ userData: res.data });
                this.setState({ selectedUserData: res.data[0]});
                console.log(res.data)
            })
            .catch(function (error) {
                console.log(error);
            })
    }
      
    onSelect(e) {
        this.setState({selectedUser: parseInt(e.target.value)})
        console.log("SELECTED NEW VALUE")
        console.log(e.target.value)
        var curuser = this.state.userData.find(element => element.userid === parseInt(e.target.value))
        console.log(curuser)
        this.setState({ selectedUserData: curuser})
    }

    render() {
        return (
            <div className="wrapper">
                <div>
                    <h2>Patient Information</h2>
                    <h4>Choose Patient</h4>
                    <select
                        value={this.state.selectedUser}
                        onChange={this.onSelect}
                    >
                        {this.state.userData.map(data => {
                            return (
                                <option key={data.userid} value={data.userid}> {data.username} </option>
                            )
                            })}
                    </select>
                </div>
                {(this.state.selectedUserData) ? (
                <div>
                    <p><strong>ID:</strong> {this.state.selectedUserData.userid}</p>
                    <p><strong>Name:</strong> {this.state.selectedUserData.username}</p>
                    <p><strong>Email:</strong> {this.state.selectedUserData.email}</p>
                    <p><strong>Devices:</strong></p>
                    {(this.state.selectedUserData.devices) ? (
                        this.state.selectedUserData.devices.map((item, index) => (
                            <p key={index}> {item} </p>)
                        )) : (
                        <p>NO DEVICES ASSIGNED </p>
                    )}
                    <p><strong>Doctors:</strong></p>
                    {(this.state.selectedUserData.doctors) ? (
                        this.state.selectedUserData.doctors.map((item, index) => (
                            <p key={index}> {item} </p>)
                        )) : (
                        <p>NO DOCTORS ASSIGNED </p>
                    )}
                </div>
                ) : (
                <p></p>
                )}
            </div>
        )
}
}

