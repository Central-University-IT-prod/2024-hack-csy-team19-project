import "./Contain_goods.css"
import React from 'react';

const ProductCard = ({ imageSrc, name, expirationDate }) => {
    return (
        <div className="Product_card">
                <img src={imageSrc} className="product-image" alt=""/>
                <h3>{name}</h3>
                <p>Срок годности: {expirationDate}</p>
        </div>
    );
};

export default ProductCard;