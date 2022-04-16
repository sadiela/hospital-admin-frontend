import React, { Component } from 'react';
import axios from 'axios'

/*
class UserSchema(Schema):
    userid = fields.Int(required=True)
    username = fields.String(required=True)
    role = fields.Int(required=True)
    devices = fields.List(fields.String)
    doctors = fields.List(fields.Int()) # list of userids
    patients = fields.List(fields.Int()) # list of userids
*/

export default class CreateUser extends Component {
    constructor(props) {
        super(props)
        this.onChangeUserName = this.onChangeUserName.bind(this);
        this.onChangeUserEmail = this.onChangeUserEmail.bind(this);
        this.onChangeUserRole = this.onChangeUserRole.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.state = {
            userid:0,
            username: '',
            email:'',
            role: '',
            devices:[],
            doctors:[],
            patients:[]
        }
    }

    onChangeUserName(e) {
        this.setState({ username: e.target.value })
    }
    onChangeUserEmail(e) {
        this.setState({ email: e.target.value })
    }
    onChangeUserRole(e) {
        this.setState({ role: e.target.value })
    }
    onSubmit(e) {
        e.preventDefault()
        const userObject = {
            userid: this.state.userid,
            username: this.state.username,
            email:this.state.email,
            role: this.state.role,
            devices: this.state.devices,
            doctors: this.state.doctors,
            patients: this.state.patients
        };
        axios.post('/admin/add_user', userObject)
            .then((res) => {
                console.log(res.data)
            }).catch((error) => {
                console.log(error)
            });
        this.setState({ username: '', email:'', role: '' })
    }

    render() {
        return (
            <div className="wrapper">
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Add User Name</label>
                        <input type="text" value={this.state.username} onChange={this.onChangeUserName} className="form-control" />
                    </div>
                    <div className="form-group">
                        <label>Add User Email</label>
                        <input type="text" value={this.state.email} onChange={this.onChangeUserEmail} className="form-control" />
                    </div>
                    <div className="form-group">
                        <label>Add User Role</label>
                        <input type="number" id="role" min="0" max="2" value={this.state.role} onChange={this.onChangeUserRole} className="form-control" />
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Create User" className="btn btn-success btn-block" />
                    </div>
                </form>
            </div>
        )
    }
}