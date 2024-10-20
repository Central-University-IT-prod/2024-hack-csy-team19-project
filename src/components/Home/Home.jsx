import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductCard from "../contain_goods/Contain_goods";
import './Home.css'; // Import the CSS file

export default function Home() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://89.169.154.115:8000/fridges/0/products', {
                    params: {
                        fridge_id: 0
                    }
                });
                setProducts(response.data);
            } catch (error) {
                console.error('Ошибка при загрузке продуктов:', error);
            }
        };

        fetchProducts();
    }, []);

    return (
        <section className="home-container">
            <h1 className="h1_name">Наличие продуктов в холодильнике</h1>
            <div className="product-grid">
                {products.map((product) => (
                    <ProductCard
                        key={product.id}
                        imageSrc={product.image || ''} // Add a default image if none is provided
                        name={product.name}
                        expirationDate={product.expiration_time}
                    />
                ))}
            </div>
        </section>
    );
}
