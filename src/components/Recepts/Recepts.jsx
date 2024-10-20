import React from "react";
import "./Recepts.css"
import Recepts_Item from "../Recepts_Item/Recepts_Item";
export default function Recepts(){
    return(
        <div className="Recepts_List">
            <h1 className="h1_name">Рецепты</h1>
            <Recepts_Item ingredients="kdnosv" instructions="edoferi" title="uniefvn"/>
        </div>
    )
}