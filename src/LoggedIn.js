import React, {useState, useEffect} from 'react'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import {Routes, Route, Link } from "react-router-dom";
import CreateUser from "./components/create-user.component";
import Users from "./components/users.component";
import DeleteUser from './components/delete-user.component';
import Devices from './components/devices.component';
import ManageDevices from './components/manage-devices.component';


function LoggedIn() {
  return (
    <div className="LoggedIn">
      <header>
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
          <a className="navbar-brand">Hospital Application Admin Page!</a>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item active">
                <Link className="nav-link" to={"/create-user"}>Create User</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={"/users"}>Users List</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={"/delete-user"}>Delete User</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={"/devices"}>Devices</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={"/manage-devices"}>Manage Devices</Link>
              </li>
            </ul>
          </div>
        </nav>
      </header>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <Routes>
              <Route exact path='/' element={<CreateUser/>} />
              <Route path="/create-user" element={<CreateUser/>} />
              <Route path="/users" element={<Users/>} />
              <Route path="/delete-user" element={<DeleteUser/>} />
              <Route path="/devices" element={<Devices/>} />
              <Route path="/manage-devices" element={<ManageDevices/>} />
            </Routes>
          </div>
        </div>
      </div>
    </div>
  );
}
export default LoggedIn;