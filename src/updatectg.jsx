import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { message } from "antd";
const Updatectg = () => {

  const [image, setImage] = useState('');

  const [name, setName] = useState('');

  let params = useParams();
  const [theme, setTheme] = useState(localStorage.getItem('theme')!==null?localStorage.getItem('theme'):'light');


  const handlePutRequest = async () => {


    const response = await axios({
      method: 'put', url: 'https://api.escuelajs.co/api/v1/categories/' + params.id,
      data:
      {
        "name": name
      },
      headers: {
        'Content-Type': 'application/json'
      }
    });
    console.log(response);

    if (response.status === 200) {
      message.success('Changed!');
      setName('');
      setImage('');


    } else {
      message.success('Error!');
    }

  };
  if (localStorage.getItem('token') == null) {
    window.location.href = '/adminlog';
}
const Logout = () => {
  localStorage.removeItem('token')
  localStorage.removeItem('refresh')
  
};

  return (
    <div className="form">
      <div className={"form-group"+(theme=='light'?'bg-light':'bg-dark text-white')}>
        <label htmlFor="title"> Name</label>
        <input
          type="text"
          className="form-control"
          id="name"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter Name"
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="image">Image URL</label>
        <input
          type="text"
          className="form-control"
          id="image"
          name="images"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          placeholder="Enter Image URL"
          required
        />
      </div>
      <div className="col-2">
        <button className="btn btn-primary" onClick={handlePutRequest}>Update Category</button>
      </div>
      <div><a href="/adminlog" onClick={Logout}>Logout</a></div>

    </div>

  );
};

export default Updatectg;
