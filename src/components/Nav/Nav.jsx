import "./Nav.css"
import {Link} from "react-router-dom";

export default function Nav() {
    return (
        <nav className="Nav">
            <Link className="Nav-said_i" to="">Ваш Холодильник</Link>
            <Link className="Nav-said_i" to="/choice_product">Добавить продукты</Link>
            <Link className="Nav-said_i" to="/recepts">Рецепты</Link>
            <Link className="Nav-said_i" to="/wish_goods">Желаемые продукты</Link>
        </nav>
    )
}