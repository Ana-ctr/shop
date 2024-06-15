import React, { useEffect, useState } from "react";
import axios from 'axios';
import Header from "./header";
import { Slider, Button, Pagination, message } from 'antd';
import Footer from "./footer";


const Store = () => {
  const [products, setProducts] = useState([]);
  const [mix, setMix] = useState('');
  const [min, setMin] = useState(0);
  const [max, setMax] = useState(100);
  const [ctg, setCtg] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
  const [cart, setCart] = useState(JSON.parse(localStorage.getItem('cart')) || []);
  const productsPerPage = 8;

  useEffect(() => {
    fetchProducts();
    setTheme(localStorage.getItem('theme') || 'light');
  }, [currentPage]);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const fetchProducts = async (category = '', priceMin = 0, priceMax = 100, offset = 0, limit = productsPerPage) => {
    try {
      const response = await axios.get(`https://api.escuelajs.co/api/v1/products`, {
        params: {
          title: mix,
          price_min: priceMin,
          price_max: priceMax,
          categoryId: category,
          offset,
          limit
        }
      });
      if (response.status === 200) {
        setProducts(response.data);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const onChangeSlider = (value) => {
    setMin(value[0]);
    setMax(value[1]);
  };

  const search = () => {
    setCurrentPage(1);  // Reset to first page on new search
    fetchProducts();
  };

  const addToCart = (product) => {
    setCart([...cart, product]);
    message.success('Added to cart!');
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    fetchProducts(ctg, min, max, (page - 1) * productsPerPage);
  };

  return (
    <>
      <header>
        <Header />
      </header>
      <div className="container">
        <div className="row">
          <div className="col-12 col-md-4 mt-3"></div>
          <div className="col-12 col-md-4 mt-2 ">
            <i className="fa-solid fa-hand-holding-dollar"></i> Price range
            <Slider range defaultValue={[20, 50]} onChange={onChangeSlider} />
          </div>
          <div className="col-12 col-md-4 mt-2" role="search">
            <input
              className="input w-100"
              type="search"
              placeholder="Give the name"
              aria-label="Give the Name"
              onChange={(e) => setMix(e.target.value)}
            />
            <Button className="btn btn-outline-secondary mt-1 w-100" type="submit" onClick={search}>
              Search
            </Button>
          </div>
        </div>
        <div className="row mt-5">
          {products.length > 0 ? (
            products.map((item, index) => (
              <div key={index} className={`col-6 col-md-3 mb-4 product-card ${theme === 'light' ? 'bg-light' : 'bg-dark text-white'}`}>
                <img className="product-image" src={item.images[0]} alt={item.title} />
                <div className={`product-details ${theme === 'light' ? 'bg-light' : 'bg-dark text-white'}`}>
                  <a href={`/two/${item.id}`} className="product-title-link">
                    <h5 className="product-title">{item.title}</h5>
                  </a>
                  <p className="product-price">${item.price}</p>
                  <p className="product-description">{item.description}</p>
                  <Button onClick={() => addToCart(item)} className="add-to-cart-button">
                    Add to <i className="fa-solid fa-cart-shopping"></i>
                  </Button>
                </div>
              </div>
            ))
          ) : (
            <>Loading...</>
          )}
        </div>
        <Pagination
          current={currentPage}
          total={products.length * productsPerPage} // Update to reflect the correct total number of products
          pageSize={productsPerPage}
          onChange={handlePageChange}
          className="pagination-custom"
        />
      </div>
      <footer>
        <Footer />
      </footer>
    </>
  );
};

export default Store;

