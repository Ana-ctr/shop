import React, { useState } from "react";
import axios from "axios";
import { theme } from "antd";

const Adminlog = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);


    const Login1 = async () => {
        try {
            const response = await axios.post("https://api.escuelajs.co/api/v1/auth/login", {
                email: "admin@mail.com",
                password: "admin123",
            });
            console.log(response)

            if (response.status === 201) {
                localStorage.setItem('token', response.data.access_token);
                localStorage.setItem('refresh', response.data.refresh_token);
                window.location.href = '/mypage';
            } else {
                alert('Login or password is wrong!');
            }
        } catch (error) {
            setError(error.response?.data?.message || "An error occurred. Please try again.");
        }

    };
    if (localStorage.getItem('token') !== null) {
        window.location.href = '/mypage';
    }

    return (
        <div className={"container-fluid p-0" + (theme == 'light' ? 'bg-light' : 'bg-dark text-white')}>
            <div className="row justify-content-center align-items-center" style={{ minHeight: '90vh' }}>
                <div className="col-md-4">
                    <i className="fa-brands fa-3x fa-mixcloud"></i> <i><big>S H O P</big></i>
                    <div className="card mt-4">
                        <div className="card-body">
                            <h2 className="text-center mb-4">Login</h2>
                            {error && <div className="alert alert-danger">{error}</div>}
                            <form>
                                <div className="form-group">
                                    <label htmlFor="email">Email address</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        id="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="Enter email"
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="password">Password</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        id="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="Enter password"
                                        required
                                    />
                                </div>
                                <button
                                    type="button"
                                    className="col-2 btn btn-secondary btn-block mt-2 mb-5"
                                    onClick={Login1}
                                >
                                    Login
                                </button>
                            </form>


                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
};

export default Adminlog;
