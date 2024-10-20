import "./Header.css"
import logo from './img/fridge.png';
import {Link} from "react-router-dom";

export default function Header() {
    return (<header className="Header">
            <Link to="" className="Header_link">
                <img height="80px" src={logo} alt=""/>
                <h1 className="Header_Name">IFridge</h1>

            </ Link>
        </header>
    )
}