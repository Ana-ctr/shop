import React, { useState } from "react";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [theme, setTheme] = useState(localStorage.getItem('theme')!==null?localStorage.getItem('theme'):'light');
  
  

  const handleLogin = async () => {
    try {
      const response = await axios.post("https://api.escuelajs.co/api/v1/users", { email, password });

      console.log("Login successful:", response.data);
    } catch (error) {
      setError(error.response.data.message);
    }
  };
  let Login1 = async () => {
    let data = await axios({
      url: `https://api.escuelajs.co/api/v1/auth/login`,
      method: "post",
      params: {
        email: email,
        password: password

      }
    });
    console.log('data', data);
    if (data.status == 201) {
      localStorage.setItem('token', data.data.access_token );
      localStorage.setItem('refresh', data.data.refresh_token );
      window.location.href = '/';
    } else {
      alert('login or password is wrong!,5');
    }}

    return (
      <div className={"container-fluid p-0 " + (theme=="light"?"bg-body-tertiary":"bg-dark ")} >
        <div className="row justify-content-center align-items-center" style={{ minHeight: '90vh' }}>
          <div className="col-md-6 "><i class="fa-brands fa-3x fa-mixcloud"></i> <i><big>S H O P</big></i>
            <div className="card mt-4 ">
              <div className="card-body ">
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
                    className="btn btn-secondary btn-block mt-2"
                    onClick={Login1}
                  >
                    Login
                  </button>
                </form>
                <div className="text-center mt-3">
                  <p>Not a member? <a href="#!">Register</a></p>
                  <p>or sign in with:</p>
                  <div className="btn-group" role="group" aria-label="Social login buttons">
                    <button type="button" className="btn btn-outline-primary">
                      <i className="fab fa-facebook-f"></i> Facebook
                    </button>
                    <button type="button" className="btn btn-outline-danger">
                      <i className="fab fa-google"></i> Google
                    </button>
                    <button type="button" className="btn btn-outline-info">
                      <i className="fab fa-twitter"></i> Twitter
                    </button>
                    <button type="button" className="btn btn-outline-info">
                      <i className="fab fa-github"></i> GitHub
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  export default Login;
