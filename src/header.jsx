
import { Drawer, Button, Space, Radio } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from "react";


const Header = () => {
  const [open, setOpen] = useState(false);
  const [placement, setPlacement] = useState('right');
  const [user, setUser] = useState(null);
  const [theme, setTheme] = useState(localStorage.getItem('theme') !== null ? localStorage.getItem('theme') : 'light');
  const [category, setCategory] = useState([]);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const onChang = (e) => {
    setPlacement(e.target.value);
  };

  const Divide = async () => {
    try {
      const response = await axios.get(`https://api.escuelajs.co/api/v1/categories`);
      if (response.status === 200) {
        setCategory(response.data);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const Log = async () => {
    try {
      const response = await axios.get(`https://api.escuelajs.co/api/v1/auth/profile`, {
        headers: {
          "Authorization": `Bearer ${localStorage.getItem('token')}`
        }
      });
      if (response.status === 200) {
        setUser(response.data);
      } else {
        alert("Invalid access token");
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
  };

  const Logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('refresh');
    setUser(null);
  };

  useEffect(() => {
    Divide();
    if (localStorage.getItem('token') !== null) { Log(); }
  }, []);

  const SwitchTheme = () => {
    if (localStorage.getItem('theme') === 'dark') {
      setTheme('light');
      localStorage.setItem('theme', 'light');
      document.body.style.backgroundColor = 'white';
    } else {
      setTheme('dark');
      localStorage.setItem('theme', 'dark');
      document.body.style.backgroundColor = 'dark';
    }
  };

  useEffect(() => {
    document.body.style.backgroundColor = theme === 'light' ? 'white' : 'dark';
  }, [theme]);

  return (
    <div>
      <nav className={`navbar navbar-expand-lg ${theme === "light" ? "bg-body-tertiary" : "bg-dark"} `} data-bs-theme={theme !== 'light' ? "dark" : ''}>
        <div className="container-fluid border-bottom">
          <a className="navbar-brand" href="#"><i className="fa-brands fa-3x fa-mixcloud"></i></a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="/">Home</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/cart">Cart<i className="fa-solid fa-cart-shopping"></i></a>
              </li>
              <li>
                <Space>
                  <Radio.Group value={placement} onChange={onChang}></Radio.Group>
                  <a className='nav-link' type="secondary mt-1" onClick={showDrawer}>Shop</a>
                </Space>
                <Drawer
                  title="Categories"
                  placement={placement}
                  closable={false}
                  onClose={onClose}
                  visible={open}
                >
                  <div className='row mt-5'>
                    {category.length > 0 ? category.map(i => (
                      <div className="col-6 col-md-4" key={i.id}>
                        <img width={'80%'} height={'auto'} src={i.image} alt={i.name} />
                        <a href={`/component/${i.id}`}>{i.name}</a>
                      </div>
                    )) : <>loading</>}
                  </div>
                </Drawer>
              </li>
            </ul>
            {user == null ? (
              <div className="d-flex justify-content-around col-2">
                <a type="button" className="btn btn-dark m-1 p-0" href="/signin"><i className="fa-solid fa-user-plus"></i>Sign up</a>
                <a type="button" className="btn btn-primary m-1 p-0" href="/login"><i className="fa-solid fa-right-to-bracket"></i>Log in</a>
              </div>
            ) : (
              <div className="d-flex justify-content-around">
                <span>{user.email}</span>
                <a type="button" onClick={Logout} className="btn btn-dark m-1 p-0">Logout</a>
              </div>
            )}
            {theme === 'light' ? (
              <a className='nav-link' type="secondary mt-1" onClick={SwitchTheme}><i className="fa-regular fa-moon"></i></a>
            ) : (
              <a className='text-light' type="secondary mt-1" onClick={SwitchTheme}><i className="fa-solid fa-moon"></i></a>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;
