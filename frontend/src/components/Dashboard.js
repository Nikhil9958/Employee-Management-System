/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'
import axios from 'axios';
import jwt_decode from "jwt-decode";
// import styled from "styled-components";
import { useNavigate } from 'react-router-dom';
import RegisterEmployee from './RegisterEmployee';

const Dashboard = () => {
    const [name, setName] = useState('');
    const [token, setToken] = useState('');
    const [expire, setExpire] = useState('');
    // const [users, setUsers] = useState([]);
    const [employees, setEmployees] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        refreshToken();
        getEmployees();
    }, []);

    const refreshToken = async () => {
        try {
            const response = await axios.get('http://localhost:5000/token');
            setToken(response.data.accessToken);
            const decoded = jwt_decode(response.data.accessToken);
            setName(decoded.name);
            setExpire(decoded.exp);
        } catch (error) {
            if (error.response) {
                navigate("/");
            }
        }
    }

    const axiosJWT = axios.create();

    axiosJWT.interceptors.request.use(async (config) => {
        const currentDate = new Date();
        if (expire * 1000 < currentDate.getTime()) {
            const response = await axios.get('http://localhost:5000/token');
            config.headers.Authorization = `Bearer ${response.data.accessToken}`;
            setToken(response.data.accessToken);
            const decoded = jwt_decode(response.data.accessToken);
            setName(decoded.name);
            setExpire(decoded.exp);
        }
        return config;
    }, (error) => {
        return Promise.reject(error);
    });

    // const getUsers = async () => {
    //     const response = await axiosJWT.get('http://localhost:5000/users', {
    //         headers: {
    //             Authorization: `Bearer ${token}`
    //         }
    //     });
    //     setUsers(response.data);
    // }
    const getEmployees = async () => {
        const response = await axiosJWT.get('http://localhost:5000/employees', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        setEmployees(response.data);
    }




    return (
        // <div className="container mt-5">
        //     <h1>Welcome Back: {name}</h1>
        //     <table className="table is-striped is-fullwidth">
        //         <thead>
        //             <tr>
        //                 <th>No</th>
        //                 <th>Name</th>
        //                 <th>Email</th>
        //             </tr>
        //         </thead>
        //         <tbody>
        //             {users.map((user, index) => (
        //                 <tr key={user.id}>
        //                     <td>{index + 1}</td>
        //                     <td>{user.name}</td>
        //                     <td>{user.email}</td>
        //                 </tr>
        //             ))}

        //         </tbody>
        //     </table>
        // </div>
        <>

            <div className="container mt-5">
                {/* <!-- Button trigger modal --> */}
                <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" style={{"float": "right"}}>
                    Add Employee
                </button>

                {/* <!-- Modal --> */}
                <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true"   style={{"zIndex": 9999}}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                ...
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button type="button" className="btn btn-primary">Save changes</button>
                            </div>
                        </div>
                    </div>
                </div>

                <h1>Welcome Back: {name}</h1>
                <table className="table is-striped is-fullwidth">
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>EmpID</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Email</th>
                        </tr>
                    </thead>
                    <tbody>
                        {employees.map((employee, index) => (
                            <tr key={employee.id}>
                                <td>{index + 1}</td>
                                <td>{employee.empid}</td>
                                <td>{employee.Fname}</td>
                                <td>{employee.Lname}</td>
                                <td>{employee.email}</td>
                            </tr>
                        ))}

                    </tbody>
                </table>
            </div>
        </>
    )
}

export default Dashboard