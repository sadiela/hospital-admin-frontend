import React, { Component } from 'react';
import axios from 'axios'

export default class ManageDevices extends Component {
    constructor(props) {
        super(props)
        this.onChangeDeviceId = this.onChangeDeviceId.bind(this);
        this.onSelectDeviceAssign = this.onSelectDeviceAssign.bind(this);
        this.onSelectPatientAssign = this.onSelectPatientAssign.bind(this);
        this.onSelectDeviceDelete = this.onSelectDeviceDelete.bind(this);
        
        this.onSubmitAdd = this.onSubmitAdd.bind(this);
        this.onSubmitAssign = this.onSubmitAssign.bind(this);
        this.onSubmitDelete = this.onSubmitDelete.bind(this);
        this.state = {
            deviceid:'',
            devices:[],
            patients:[],
            selected_patient: '',
            selected_device: '',
            delete_device: '',
        }
    }

    componentDidMount() {
        Promise.all([
          axios.get('/admin/people/0'), // i.e. axios.get(something)
          axios.get('/admin/devices')
        ]).then(([result1, result2]) => {
          // call setState here
          this.setState({ patients: result1.data });
          this.setState({ devices: result2.data });
          //this.setState({deviceid: result2.data[0].deviceid})
          this.setState({selected_patient: result1.data[0].userid})
          this.setState({selected_device: result2.data[0].deviceid})
        })
        .catch(function (error) {
            console.log(error);
        })
      }

    onChangeDeviceId(e) {
        this.setState({ deviceid: e.target.value })
    }

    onSelectDeviceAssign(e) {
        this.setState({selected_device: e.target.value})
    }

    onSelectPatientAssign(e) {
        this.setState({selected_patient: e.target.value})
    }

    onSelectDeviceDelete(e) {
        this.setState({delete_device: e.target.value})
    }

    onSubmitAdd(e) {
        e.preventDefault()
        const deviceObject = {
            deviceid: this.state.deviceid,
        };
        axios.post('/device/add-device', deviceObject)
            .then((res) => {
                console.log(res.data)
            }).catch((error) => {
                console.log(error)
            });
        this.componentDidMount()
        this.setState({ deviceid: ''})
    }

    onSubmitAssign(e) {
        e.preventDefault()
        axios.post('/admin/assign-device/' + this.state.selected_device +'/' + this.state.selected_patient)
            .then((res) => {
                console.log(res.data)
            }).catch((error) => {
                console.log(error)
            });
    }

    onSubmitDelete(e) {
        e.preventDefault()     
        console.log(this.state.delete_device)
        var poststr = '/device/delete-device/' + this.state.delete_device
        console.log(poststr)
        axios.post(poststr)
            .then((res) => {
                console.log(res.data)
            }).catch((error) => {
                console.log(error)
            });
        this.componentDidMount()
        this.setState({ delete_device: this.state.devices[0].deviceid})
    }

    render() {
        return (
            <div className="wrapper">
                <form onSubmit={this.onSubmitAdd}>
                    <div className="form-group">
                        <label>Add Device ID  </label>
                        <input type="text" value={this.state.deviceid} onChange={this.onChangeDeviceId} className="form-control" />
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Create Device" className="btn btn-success btn-block" />
                    </div>
                </form>
                <form onSubmit={this.onSubmitAssign}>
                    <div className="form-group">
                        <label>Choose Device  </label>
                        <select
                            value={this.state.selected_device}
                            onChange={this.onSelectDeviceAssign}
                        >
                            {this.state.devices.map(data => {
                                return (
                                    <option key={data.deviceid} value={data.deviceid}> {data.deviceid} </option>
                                )
                                })}
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Choose Patient  </label>
                        <select
                            value={this.state.selected_patient}
                            onChange={this.onSelectPatientAssign}
                        >
                            {this.state.patients.map(data => {
                                return (
                                    <option key={data.username} value={data.userid}> {data.username} {data.userid} </option>
                                )
                                })}
                        </select>
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Assign Device" className="btn btn-success btn-block" />
                    </div>
                </form>
                <form onSubmit={this.onSubmitDelete}>
                    <div className="form-group">
                        <label>Choose Device  </label>
                        <select
                            value={this.state.delete_device}
                            onChange={this.onSelectDeviceDelete}
                        >
                            {this.state.devices.map(data => {
                                return (
                                    <option key={data.deviceid} value={data.deviceid}> {data.deviceid} </option>
                                )
                                })}
                        </select>
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Delete Device" className="btn btn-success btn-block" />
                    </div>
                </form>
            </div>
        )
    }
}

// create
// assign
// delete