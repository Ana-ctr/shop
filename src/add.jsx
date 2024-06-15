import React, { useState } from 'react';
import axios from 'axios';
import { message } from "antd";

const AddProduct = () => {
    const [image, setImage] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [title, setTitle] = useState('');
    const [theme, setTheme] = useState(localStorage.getItem('theme')!==null?localStorage.getItem('theme'):'light');


    const handlePostRequest = async () => {
        

        

        const response = await axios({
            method:'post',url:'https://api.escuelajs.co/api/v1/products/',
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
            

            if (response.status === 201) {
                message.success('Added!') ;
                setTitle('');
                setImage('');
                setPrice('');
                setDescription('');
                setCategory('');
            } else {
                message.error('Error!')
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
        <div className="row">
        <li><a href="/adminlog" onClick={Logout}>Logout</a></li>
            <div className={"col-6 mt-5 container "+(theme=='light'?'bg-light':'bg-dark text-white')}>
                <div className="form-group">
                    
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
                        name="image" // This should be 'image' not 'images'
                        value={image}
                        onChange={(e) => setImage(e.target.value)}
                        placeholder="Enter Image URL"
                        required
                    />
                </div>
                </div>
            </div>
            <div className="row">
            <div className="col-5 "></div>
            <div className="col-1 ms-5 mt-3">
            <button className="btn btn-primary" onClick={handlePostRequest}>Add New Product</button>
            </div>
            </div>
        </>
    );
};

export default AddProduct;
