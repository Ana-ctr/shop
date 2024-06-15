import React, { useEffect, useState } from "react";
import axios from 'axios';
import Header from "./header";
import { useParams } from "react-router-dom";


function Store3() {
    const [cat, setCat] = useState([]);
    const param = useParams();
    const [theme, setTheme] = useState(localStorage.getItem('theme') !== null ? localStorage.getItem('theme') : 'light');

    const Categori = async () => {
        try {
            const Product = await axios.get(`https://api.escuelajs.co/api/v1/categories/${param.id}/products`);
            if (Product.status === 200) {
                setCat(Product.data);
            } else {
                setCat([]);
            }
        } catch (error) {
            console.error("Error fetching products:", error);
            setCat([]);
        }
    };

    const addToCart = (product) => {
        console.log("Product added to cart:", product);
    };

    useEffect(() => {
        Categori();
    }, [param.id]);

    return (
        <>
            <header>
                <Header />
            </header>
            <div className="container mt-5">
                <div className="row">
                    {cat.length > 0 ? (
                        cat.map((i) => (
                            <div key={i.id} className={`col-6 col-md-4 col-lg-3 product-card ${theme === 'light' ? 'bg-light' : 'bg-dark text-white'}`}>
                                <img className="product-image img-fluid o" src={i.images[0]} alt={i.title} />
                                <div className="product-details">
                                    <a className="product-title" href={`/product/${i.id}`}>{i.title}</a>
                                    <p className="product-price">${i.price}</p>
                                    <p className="product-description">{i.description}</p>
                                    <button onClick={() => addToCart(i)} className="btn btn-primary add-to-cart-button">
                                        Add to <i className="fa-solid fa-cart-shopping"></i>
                                    </button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="col-12 text-center">Loading...</div>
                    )}
                </div>
            </div>
        </>
    );
}

export default Store3;
