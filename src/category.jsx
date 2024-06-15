import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { message } from "antd";
import Header from "./header"

const CategoryComponent = () => {
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);
  const [image, setImage] = useState('');
  const [name, setName] = useState('');
  const [theme, setTheme] = useState(localStorage.getItem('theme')!==null?localStorage.getItem('theme'):'light');


  useEffect(() => {
    // GET request to fetch categories
    axios.get('https://api.escuelajs.co/api/v1/categories')
      .then(response => {
        setCategories(response.data);
      })
      .catch(error => {
        setError(error);
      });
  }, []);


  const handlePostRequest = async () => {



    const response = await axios({
      method: 'post', url: 'https://api.escuelajs.co/api/v1/categories/',
      data: {
        "name": name,
        "image": image
      },

      headers: {
        'Content-Type': 'application/json'
      }
    });

    console.log('data', response);
    if (response.status === 201) {
      message.success('Category Created!');
      // Optionally, update the categories list or clear the input fields

      setImage('');
      setCategories(categories.map(category => category.id === 3 ? response.data : category)); // Update category list
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
    <>
    <header>
      <Header />
    </header>
    <div className={"container"+(theme=='light'?'bg-light':'bg-dark text-white')}>
      <h2>Categories</h2>
     
      {error && <p style={{ color: 'red' }}>Error fetching categories: {error.message}</p>}
      <ul>
        {categories.map(category => (
          <li key={category.id}>{category.name}
            <div className="col-2">
              <a href={"/updatectg/" + category.id} className="btn btn-secondary">Update category</a>
            </div></li>
        ))}

      </ul>


      <div className="form-group">
        <input
          type="text"
          className="form-control"
          id="category"

          onChange={(e) => setName(e.target.value)}
          placeholder="Enter Category Name"
          required
        />
      </div>
      <div className="form-group mt-3">
        <input
          type="text"
          className="form-control"
          id="image"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          placeholder="Enter Image URL"
          required
        />
      </div>
      <div className="row ">
        <div className="col-3 ms-3">
          <button onClick={handlePostRequest} className="btn btn-secondary">Add New Category</button>
        </div></div>

    </div>
    </>
  );
};

export default CategoryComponent;
