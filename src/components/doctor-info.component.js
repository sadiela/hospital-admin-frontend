// Dropdown to choose patient
// Submit to render patient info

import React, { Component } from 'react';
import axios from 'axios'


export default class DoctorInfo extends Component {
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
        axios.get('/admin/people/1')
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
                    <h2>Doctor Information</h2>
                    <h4>Choose Doctor</h4>
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
                    <p><strong>Patients:</strong> </p>
                    {(this.state.selectedUserData.patients) ? (
                        this.state.selectedUserData.patients.map((item, index) => (
                            <p key={index}> {item} </p>)
                        )) : (
                        <p>NO PATIENTS</p>
                    )}
                </div>
                ) : (
                <p></p>
                )}
            </div>
        )
}
}

