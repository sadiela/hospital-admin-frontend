// Dropdown to choose patient
// Submit to render patient info
import React, { Component } from 'react';
import axios from 'axios'
//import CreateUser from './create-user.component';
//import AssignPatients from './assign-patients.component';
//import DeleteUser from './delete-user.component';


export default class ManageUsers extends Component {
    constructor(props) {
        super(props)
        this.onChangeUserName = this.onChangeUserName.bind(this);
        this.onChangeUserEmail = this.onChangeUserEmail.bind(this);
        this.onChangeUserRole = this.onChangeUserRole.bind(this);
        this.onSubmitNew = this.onSubmitNew.bind(this);

        this.onSelectDoctorAssign = this.onSelectDoctorAssign.bind(this);
        this.onSelectPatientAssign = this.onSelectPatientAssign.bind(this);
        this.onSubmitAssign = this.onSubmitAssign.bind(this);

        this.onSelectDelete = this.onSelectDelete.bind(this);
        this.onSubmitDelete = this.onSubmitDelete.bind(this);

        this.state = {
            newusername: '',
            newemail: '',
            newrole: '',

            doctors:[],
            patients:[],
            selected_patient: '',
            selected_doctor: '',

            users:[],
            selectedid:''
        }
    }

    onChangeUserName(e) {
        this.setState({ newusername: e.target.value })
    }
    onChangeUserEmail(e) {
        this.setState({ newemail: e.target.value })
    }
    onChangeUserRole(e) {
        this.setState({ newrole: e.target.value })
    }
    onSubmitNew(e) {
        e.preventDefault()
        const userObject = {
            userid: 0,
            username: this.state.newusername,
            email:this.state.newemail,
            role: parseInt(this.state.newrole),
        };
        axios.post('/admin/add_user', userObject)
            .then((res) => {
                console.log(res.data)
            }).catch((error) => {
                console.log(error)
            });
        this.setState({ newusername: '', newemail:'', newrole: '' })
    }

    componentDidMount() {
        Promise.all([
          axios.get('/admin/people/0'), // i.e. axios.get(something)
          axios.get('/admin/people/1'),
          axios.get('/admin/people')
        ]).then(([result1, result2, result3]) => {
          // call setState here
          this.setState({ patients: result1.data });
          this.setState({ doctors: result2.data });
          this.setState({ users: result3.data})
          //this.setState({deviceid: result2.data[0].deviceid})
          this.setState({selected_patient: result1.data[0].userid})
          this.setState({selected_doctor: result2.data[0].userid})
          this.setState({selectedid: result3.data[0].userid})

        })
        .catch(function (error) {
            console.log(error);
        })
      }

    onSelectDoctorAssign(e) {
        this.setState({selected_doctor: e.target.value})
    }

    onSelectPatientAssign(e) {
        this.setState({selected_patient: e.target.value})
    }

    onSubmitAssign(e) {
        e.preventDefault()
        axios.post('/admin/assign-patient/' + this.state.selected_doctor +'/' + this.state.selected_patient)
            .then((res) => {
                console.log(res.data)
            }).catch((error) => {
                console.log(error)
            });
    }

    onSelectDelete(e) {
        console.log(this.state.users)
        this.setState({ selectedid: e.target.value })
    }

    onSubmitDelete(e) {
        e.preventDefault()       
        console.log(this.state.selectedid)
        var poststr = '/admin/remove_user/' + this.state.selectedid
        console.log(poststr)
        axios.post(poststr)
            .then((res) => {
                console.log(res.data)
            }).catch((error) => {
                console.log(error)
            });
        this.componentDidMount()
        this.setState({ selectedid: this.state.users[0].userid})
    }


    render() {
        return (
            <div className="wrapper">
                <form onSubmit={this.onSubmitNew}>
                    <div className="form-group">
                        <label>Add User Name</label>
                        <input type="text" value={this.state.newusername} onChange={this.onChangeUserName} className="form-control" />
                    </div>
                    <div className="form-group">
                        <label>Add User Email</label>
                        <input type="text" value={this.state.newemail} onChange={this.onChangeUserEmail} className="form-control" />
                    </div>
                    <div className="form-group">
                        <label>Add User Role</label>
                        <input type="number" id="role" min="0" max="2" value={this.state.newrole} onChange={this.onChangeUserRole} className="form-control" />
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Create User" className="btn btn-success btn-block" />
                    </div>
                </form>
                <form onSubmit={this.onSubmitAssign}>
                    <div className="form-group">
                        <label>Choose Doctor </label>
                        <select
                            value={this.state.selected_doctor}
                            onChange={this.onSelectDoctorAssign}
                        >
                            {this.state.doctors.map(data => {
                                return (
                                    <option key={data.userid} value={data.userid}> {data.userid} {data.username} </option>
                                )
                                })}
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Choose Patient </label>
                        <select
                            value={this.state.selected_patient}
                            onChange={this.onSelectPatientAssign}
                        >
                            {this.state.patients.map(data => {
                                return (
                                    <option key={data.username} value={data.userid}> {data.userid} {data.username} </option>
                                )
                                })}
                        </select>
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Assign Patient" className="btn btn-success btn-block" />
                    </div>
                </form>
                <form onSubmit={this.onSubmitDelete}>
                    <div>
                        <select
                            value={this.state.selectedid}
                            onChange={this.onSelectDelete}
                        >
                            {this.state.users.map(data => {
                                return (
                                    <option key={data.userid} value={data.userid}> {data.userid} {data.username} </option>
                                )
                                })}
                        </select>
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Delete User" className="btn btn-success btn-block" />
                    </div>
                </form>
            </div>
        )
}
}

