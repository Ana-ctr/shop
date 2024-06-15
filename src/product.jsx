
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Slider, Button, Drawer, Radio, Space, Pagination, message } from 'antd';
import Header from "./header";


const Product = () => {
  const [error, setError] = useState(null);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [min, setMin] = useState('');
  const [max, setMax] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);
  const productsPerPage = 5;
  const [theme, setTheme] = useState(localStorage.getItem('theme') !== null ? localStorage.getItem('theme') : 'light');

  const fetchProducts = async (category = '', priceMin = '', priceMax = '', offset = 0, limit = productsPerPage) => {
    try {
      const response = await axios.get(`https://api.escuelajs.co/api/v1/products`, {
        params: {
          categoryId: category,
          price_min: priceMin,
          price_max: priceMax,
          offset: offset,
          limit: limit
        },
      });
      if (response.status === 200) {
        setProducts(response.data);

        // If the total count is not provided in headers, calculate it manually
        const totalCount = response.headers['x-total-count'];
        if (totalCount) {
          setTotalProducts(parseInt(totalCount, 10));
        } else {
          const allProductsResponse = await axios.get(`https://api.escuelajs.co/api/v1/products`);
          if (allProductsResponse.status === 200) {
            setTotalProducts(allProductsResponse.data.length);
          }
        }
      } else {
        setProducts([]);
      }
    } catch (error) {
      setError(error);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get('https://api.escuelajs.co/api/v1/categories');
      if (response.status === 200) {
        setCategories(response.data);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  let params = useParams();

  const handleDeleteRequest = async (id) => {
    try {
      const response = await axios.delete(`https://api.escuelajs.co/api/v1/products/${id}`);
      if (response.status === 200) {
        message.success('Deleted!');
        fetchProducts(selectedCategory, min, max, (currentPage - 1) * productsPerPage); // Refresh the product list
      } else {
        message.error('Error!');
      }
    } catch (error) {
      message.error('Error!');
    }
  };

  const onChangeSlider = (value) => {
    setMin(value[0]);
    setMax(value[1]);
    fetchProducts(selectedCategory, value[0], value[1], (currentPage - 1) * productsPerPage);
  };

  const handleCategoryChange = (event) => {
    const categoryId = event.target.value;
    setSelectedCategory(categoryId);
    fetchProducts(categoryId, min, max, (currentPage - 1) * productsPerPage);
  };

  const handleManageUsers = () => {
    console.log("Manage Users clicked");
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    fetchProducts(selectedCategory, min, max, (page - 1) * productsPerPage);
  };

  return (
    <>
      <header>
        <Header />
      </header>
      <div className={"container mt-5 " + (theme === 'light' ? 'bg-light' : 'bg-dark text-white')}>
        <h2 className="mb-4">Products</h2>
        <div className="row">
          <div className="col-12 col-md-4 mb-2">
            <select className="form-select" aria-label="Default select example" onChange={handleCategoryChange}>
              <option value="">All Categories</option>
              {categories.map(category => (
                <option key={category.id} value={category.id}>{category.name}</option>
              ))}
            </select>
          </div>
          {error && <p className="text-danger">Error fetching products: {error.message}</p>}
          <div className="col-12 col-md-4 mb-2 text-dark">
            <i className="fa-solid fa-hand-holding-dollar"></i> Price range
            <Slider range defaultValue={[20, 50]} onChange={onChangeSlider} max={20000} />
          </div>
          <div className="col-12 col-md-4 mb-3 text-md-end">
            <a href="/add" onClick={handleManageUsers} className="btn btn-primary">Add Product</a>
          </div>
        </div>
        <div className="row">
          {products.map((product) => (
            <div className="col-12 col-md-6 col-lg-4 mb-4" key={product.id}>
              <div className="card h-100">
                <img src={product.category.image} alt={product.title} className="card-img-top" />
                <div className="card-body">
                  <h5 className="card-title">{product.title}</h5>
                  <p className="card-text">Price: ${product.price}</p>
                  <p className="card-text">{product.description}</p>
                  <p className="card-text">Category: {product.category.name}</p>
                  <div id={`carouselExample-${product.id}`} className="carousel slide" data-bs-ride="carousel">
                    <div className="carousel-inner">
                      {product.images.map((img, index) => (
                        <div key={index} className={`carousel-item ${index === 0 ? 'active' : ''}`}>
                          <img src={img} alt={`product ${index}`} className="img-fluid" />
                        </div>
                      ))}
                    </div>
                    <button className="carousel-control-prev" type="button" data-bs-target={`#carouselExample-${product.id}`} data-bs-slide="prev">
                      <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                      <span className="visually-hidden">Previous</span>
                    </button>
                    <button className="carousel-control-next" type="button" data-bs-target={`#carouselExample-${product.id}`} data-bs-slide="next">
                      <span className="carousel-control-next-icon" aria-hidden="true"></span>
                      <span className="visually-hidden">Next</span>
                    </button>
                  </div>
                </div>
                <div className="card-footer d-flex justify-content-between">
                  <button className="btn btn-danger" onClick={() => handleDeleteRequest(product.id)}>Delete</button>
                  <a href={`/update/${product.id}`} className="btn btn-secondary">Update</a>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="d-flex justify-content-center mt-4">
          <Pagination
            current={currentPage}
            total={totalProducts}
            pageSize={productsPerPage}
            onChange={handlePageChange}
            showSizeChanger={false}
          />
        </div>
      </div>
    </>
  );
};

export default Product;
