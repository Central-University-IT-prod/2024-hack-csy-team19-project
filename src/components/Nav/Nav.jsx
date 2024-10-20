import "./Nav.css"
import {Link} from "react-router-dom";

export default function Nav() {
    return (
        <nav className="Nav">
            <Link className="Nav-said_i" to="/choice_product">Choice new product</Link>
            <Link className="Nav-said_i" to="/recepts">Recepts</Link>
            <Link className="Nav-said_i" to="/wish_goods">Wish goods</Link>
        </nav>
    )
}