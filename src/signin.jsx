import React, { useState } from "react";
import axios from "axios";
import Password from "antd/es/input/Password";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState(null);
  const [avatar, setAvatar] = useState();
  const [check, setCheck] = useState(false);
  const [theme, setTheme] = useState(localStorage.getItem('theme') !== null ? localStorage.getItem('theme') : 'light');

  const handleSignUp = async () => {
    try {
      const response = await axios.post("https://api.escuelajs.co/api/v1/users/", {
        email,
        password,
        name,
        avatar,
      });
      // Handle successful sign-up, e.g., redirect to login page
      console.log("Sign-up successful:", response.data);
    } catch (error) {
      setError(error.response.data.message);
    }
  };
  let Signup1 = async () => {
    let form = new FormData();
    form.append('email', email)
    form.append('name', name)
    form.append('password', password)
    form.append('avatar', avatar)
    let data = await axios({
      url: `https://api.escuelajs.co/api/v1/users/`,
      method: "post",
      data: form,
      headers: {
        'Content-Type': 'application/json'
      }


    });

    console.log('data', data);
    if (data.status == 201) {
      alert('Registered!');

    } else {
      alert('login or password is wrong!,5');
    }
  }
  let Checkemail = async () => {

    let form = new FormData();
    form.append('email', email)

    let data = await axios({


      url: `https://api.escuelajs.co/api/v1/users/is-available`,
      method: 'post',
      data: form,
      headers: {
        'Content-Type': 'application/json'
      }
    })
    console.log('check', data)
    if (data.data.isAvailable == false) {
      setCheck(true)
    }
    else {
      alert('This account exists!')
    }
  }
  return (
    <div className={"container-fluid p-0" + (theme == 'light' ? 'bg-light' : 'bg-dark text-white')}>
      <div className="row justify-content-center align-items-center" style={{ minHeight: '90vh' }}>
        <div className="col-md-6 "><i class="fa-brands fa-3x fa-mixcloud"></i> <i><big>S H O P</big></i>
          <div className="card a mt-4">
            <div className="card-body ">
              <h2 className="text-center mb-4">Sign Up</h2>
              <div className="form-group">
                <label htmlFor="email">Email address</label>
                <input
                  type="email"
                  className="form-control"
                  id="email"

                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter email"
                />
              </div>

              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="name"
                  className="form-control"
                  id="name"

                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter name"
                />
              </div>

              <div className="form-group">
                <label htmlFor="Password">Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="Password"

                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="password"
                />
              </div>
              <div className="form-group">
                <label htmlFor="Avatar">Avatar</label>
                <input
                  type="text"
                  className="form-control"
                  id="avatar"

                  onChange={(e) => setAvatar(e.target.value)}
                  placeholder="avatar"
                />
              </div>

              {error && <p className="text-danger">{error}</p>}

              <button
                type="button"
                className="btn btn-secondary btn-block mb-4 mt-2"
                onClick={Signup1}
              >
                Sign Up
              </button>

              <div className="text-center">
                <p>
                  Already have an account? <a href="#!">Sign In</a>
                </p>
                <p>or sign up with:</p>
                <div className="btn-group" role="group" aria-label="Social login buttons">
                  <button type="button" className="btn btn-link btn-floating mx-1">
                    <i className="fab fa-facebook-f"></i>
                  </button>

                  <button type="button" className="btn btn-link btn-floating mx-1">
                    <i className="fab fa-google"></i>
                  </button>

                  <button type="button" className="btn btn-link btn-floating mx-1">
                    <i className="fab fa-twitter"></i>
                  </button>

                  <button type="button" className="btn btn-link btn-floating mx-1">
                    <i className="fab fa-github"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      :
      <div className="form-group">
        <label htmlFor="password">Email</label>
        <input
          type="email"
          className="form-control"
          id="email"

          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter email"
          required
        />
      </div>

      <button
        type="button"
        className="btn btn-secondary btn-block mt-2"
        onClick={Checkemail}
      >
        Checkemail
      </button>

    </div>
  );
};

export default SignUp;
