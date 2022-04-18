import React, {useState, useEffect} from 'react'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import {Routes, Route, Link } from "react-router-dom";
import Users from "./components/users.component";
import Devices from './components/devices.component';
import ManageDevices from './components/manage-devices.component';
import PatientInfo from './components/patient-info.component';
import DoctorInfo from './components/doctor-info.component';
import ManageUsers from './components/manage-users.component';

function LoggedIn() {
  return (
    <div className="LoggedIn">
      <header>
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
          <a className="navbar-brand">Hospital Application Admin Page!</a>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item active">
                <Link className="nav-link" to={"/manage-users"}>Manage Users</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={"/users"}>Users List</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={"/devices"}>Devices</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={"/manage-devices"}>Manage Devices</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={"/patient-info"}>Patient Info</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={"/doctor-info"}>Doctor Info</Link>
              </li>
            </ul>
          </div>
        </nav>
      </header>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <Routes>
              <Route exact path='/' element={<ManageUsers/>} />
              <Route path="/manage-users" element={<ManageUsers/>} />
              <Route path="/users" element={<Users/>} />
              <Route path="/manage-devices" element={<ManageDevices/>} />
              <Route path="/devices" element={<Devices/>} />
              <Route path="/patient-info" element={<PatientInfo/>} />
              <Route path="/doctor-info" element={<DoctorInfo/>} />
            </Routes>
          </div>
        </div>
      </div>
    </div>
  );
}
export default LoggedIn;