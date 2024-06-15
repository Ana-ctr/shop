import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { message } from "antd";

const Product = () => {
  const [error, setError] = useState(null);
  const [products, setProducts] = useState([]);
  const [image, setImage] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [title, setTitle] = useState('');
  const [theme, setTheme] = useState(localStorage.getItem('theme')!==null?localStorage.getItem('theme'):'light');


  let params = useParams();

  const handlePutRequest = async () => {
    
    
    const response = await axios({
      method:'put',url:'https://api.escuelajs.co/api/v1/products/' + params.id,
      data:
      {
        "title": title,
        "price": price,
        "description": description,
        "categoryId": category,
        "images": [image]
      },
      headers: {
        'Content-Type': 'application/json'
      }
    });
    console.log(response);

    if (response.status === 200) {
      message.success('Changed!');
      setTitle('');
      setImage('');
      setPrice('');
      setDescription('');
      setCategory('');

    } else {
      message.error('Error!');
    }

  };
 
  return (
    <div className={"form"+(theme=='light'?'bg-light':'bg-dark text-white')}>
      <div className="form-group">
        <label htmlFor="title">Product Title</label>
        <input
          type="text"
          className="form-control"
          id="title"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter Product Title"
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="price">Price</label>
        <input
          type="number"
          className="form-control"
          id="price"
          name="price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="Enter Price"
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="description">Description</label>
        <input
          type="text"
          className="form-control"
          id="description"
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter Description"
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="category">Category ID</label>
        <input
          type="number"
          className="form-control"
          id="category"
          name="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          placeholder="Enter Category ID"
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
      <button className="btn btn-primary" onClick={handlePutRequest}>Update Product</button>
    </div>

  );
};

export default Product;
