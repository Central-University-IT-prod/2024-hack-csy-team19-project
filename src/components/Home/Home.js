import "./Home.css"
import React from "react";
import ProductCard from "../contain_goods/Contain_goods";

export default function Home() {
    return (

        <div>
            <h1 className="h1_name">Наличие продуктов в холодильнике</h1>
            <ProductCard imageSrc="" name="milk" expirationDate="1"/>
        </div>

)

}
