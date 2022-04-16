import React, { Component } from 'react';
import axios from 'axios'


export default class DeleteUser extends Component {
    constructor(props) {
        super(props)
        this.onSelect = this.onSelect.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.state = {
            usernames:[],
            selectedid:""
        }
    }

    componentDidMount() {
        axios.get('/admin/people')
            .then(res => {
                this.setState({ usernames: res.data });
                console.log(res.data)
                console.log(this.state.usernames)
                this.setState({selectedid: res.data[0].userid})
                console.log(this.state.selectedid)
            })
            .catch(function (error) {
                console.log(error);
            })
    }

      
    onSelect(e) {
        console.log(this.state.usernames)
        this.setState({ selectedid: e.target.value })
    }

    onSubmit(e) {
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
        this.setState({ selectedid: this.state.usernames[0].userid})
    }

    render() {
        return (
            <div className="wrapper">
                <form onSubmit={this.onSubmit}>
                    <div>
                        <select
                            value={this.state.selectedid}
                            onChange={this.onSelect}
                        >
                            {this.state.usernames.map(data => {
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

