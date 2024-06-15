import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import Header from "./header";

function Store4() {
    const [single, setSingle] = useState()
    const [theme, setTheme] = useState(localStorage.getItem('theme')!==null?localStorage.getItem('theme'):'light');

    let param = useParams()


    let Product = async () => {
        let singleData = await axios({
            url: `https://api.escuelajs.co/api/v1/products/${param.id}`,
            method: "get"

        })

        console.log('single', singleData);

        setSingle(singleData.data)

    }
    useEffect(() => {

        Product()
    }, [])
    const addToCart = (product) => {
        // Implement your logic to add the product to the cart
        console.log("Product added to cart:", product);
    };
    return (
        <>
            <header>
                <Header />
            </header>
            <div class='row mt-5 '>{single != null ?

                <>
                    <div className="row">
                        <div className={"col-6 col-md-4 block p-2 mx-2 rounded-3 my-2 mt-3 ms-5 "+(theme=='light'?'bg-light':'bg-dark text-white')}>

                            <div id="carouselExample" class="carousel slide">
                                <div className="carousel-inner">
                                    {single.images.map(i =>
                                        <div className="carousel-item active  ">
                                            <img src={i} class="d-block" width="400 px" alt="..." />
                                        </div>)}


                                </div>

                            </div>
                            <button class="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
                                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                                <span class="visually-hidden">Previous</span>
                            </button>
                            <button class="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
                                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                                <span class="visually-hidden">Next</span>
                            </button>
                        </div>
                        <div className="product-details col-lg-6 mt-4">
                            <a href={"/two/" + single.id} className="category-link">
                                <h5 className="category-name">{single.category.name}</h5>
                            </a>
                            <div className="product-info">
                                <p className="product-title">{single.title}</p>
                                <p className="product-description mt-5">{single.description}</p>
                                <p className="product-price">${single.price}</p>
                            </div>
                            <button onClick={() => addToCart()} className="add-to-cart-button mt-5">
                                Add to <i class="fa-solid fa-cart-shopping"></i>
                            </button>
                        </div>

                    </div>

                </>

                : <>loading</>}

            </div>

        </ >

    )
}



export default Store4