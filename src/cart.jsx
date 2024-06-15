import { useState, useEffect } from "react";
import Header from "./header";
import { message } from "antd";
import Footer from "./footer";



const Cart = () => {
    const [cart, setCart] = useState([]);
    const [theme, setTheme] = useState(localStorage.getItem('theme')!==null?localStorage.getItem('theme'):'light');

 
    useEffect(() => {
        const initialCart = JSON.parse(localStorage.getItem('cart')) || [];
        setCart(initialCart);
    }, []);

    const updateCart = (updatedCart) => {
        setCart(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
    };

    const removeFromCart = (id) => {
        const updatedCart = cart.filter(item => item.id !== id);
        updateCart(updatedCart); message.error('deleted!')
    };


   

    return (
        <div className="cart-container">
            <header>
                <Header />
            </header>
            <div className="row mt-5">
                {cart.length > 0 ? (
                    <div className="cart-items">
                        {cart.map(item => (
                            <div key={item.id} className={"cart-item "+(theme=='light'?'bg-light':'bg-dark text-white')}>
                                <span>{item.title}</span>
                                
                                <button 
                                    className="remove-button" 
                                    onClick={() => removeFromCart(item.id)}
                                >
                                    Remove
                                </button>
                            
                            
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="empty-cart a ">Cart is empty</div>
                )}
            </div>
            <footer>
        <Footer />
      </footer>
    
        </div>
    );
};

export default Cart;
