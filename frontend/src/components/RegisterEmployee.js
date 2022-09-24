import React, { useState } from 'react'
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const RegisterEmployee = () => {
    const [empid, setEmpid] = useState('');
    const [email, setEmail] = useState('');
    const [Fname, setFName] = useState('');
    const [Lname, setLName] = useState('');
    const [address, setAddress] = useState('');
    const [DOB, setDOB] = useState('');
    const [Mobile, setMobile] = useState('');
    const [City, setCity] = useState('');
    const [msg, setMsg] = useState('');
    const navigate = useNavigate();

    const RegisterEmployee = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/employees', {
                empid: empid,
                email: email,
                Fname: Fname,
                Lname: Lname,
                address: address,
                DOB: DOB,
                Mobile: Mobile,
                City: City
            });
            navigate("/dashboard");
        } catch (error) {
            if (error.response) {
                setMsg(error.response.data.msg);
            }
        }
    }
    // const naviagteLogin = () =>{
    //     navigate('/');
    // }

    return (
        <form onSubmit={RegisterEmployee} className="box">
            <h1 style={{ textAlign: "center" }}>Add Employee</h1>
            <p className="has-text-centered">{msg}</p>
            <div className="field mt-5">
                <label className="label">Employee Id</label>
                <div className="controls">
                    <input type="text" className="input" placeholder="EmpId"
                        value={empid} onChange={(e) => setEmpid(e.target.value)} />
                </div>
            </div>
            <div className="field mt-5">
                <label className="label">Email</label>
                <div className="controls">
                    <input type="text" className="input" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
            </div>
            <div className="field mt-5">
                <label className="label">Fname</label>
                <div className="controls">
                    <input type="text" className="input" placeholder="Fname" value={Fname} onChange={(e) => setFName(e.target.value)} />
                </div>
            </div>
            <div className="field mt-5">
                <label className="label">Lname</label>
                <div className="controls">
                    <input type="text" className="input" placeholder="Lname" value={Lname} onChange={(e) => setLName(e.target.value)} />
                </div>
            </div>
            <div className="field mt-5">
                <label className="label">Address</label>
                <div className="controls">
                    <input type="text" className="input" placeholder="Address" value={address} onChange={(e) => setAddress(e.target.value)} />
                </div>
            </div>
            <div className="field mt-5">
                <label className="label">DOB</label>
                <div className="controls">
                    <input type="text" className="input" placeholder="DOB" value={DOB} onChange={(e) => setDOB(e.target.value)} />
                </div>
            </div>
            <div className="field mt-5">
                <label className="label">Mobile</label>
                <div className="controls">
                    <input type="text" className="input" placeholder="Mobile" value={Mobile} onChange={(e) => setMobile(e.target.value)} />
                </div>
            </div>
            <div className="field mt-5">
                <label className="label">City</label>
                <div className="controls">
                    <input type="text" className="input" placeholder="City" value={City} onChange={(e) => setCity(e.target.value)} />
                </div>
            </div>
            <div className="field mt-5">
                <button className="button is-success is-fullwidth"  data-bs-dismiss="modal">Add Employee</button>
            </div>
        </form>

    )
}

export default RegisterEmployee;