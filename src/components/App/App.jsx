import './App.css';
import Nav from "../Nav/Nav";
import Header from "../Header/Header";
import Home from "../Home/Home";
import Food_Selector from "../Choice_product/Choice_product";
import Recepts from "../Recepts/Recepts";
import WishList from "../Wish_goods/Wish_goods";
import {Route, Routes} from "react-router-dom";


function App(props) {
    return (
        <div className="App">
            <Header/>
            <Nav/>
            {/*<Home />*/}
            <main className="Main">
                <Routes>
                    <Route path="home" element={<Home/>}/>
                    <Route path="choice_product" element={<Food_Selector/>}/>
                    <Route path="recepts" element={<Recepts/>}/>
                    <Route path="wish_goods" element={<WishList/>}/>

                </Routes>
            </main>
        </div>
    );
}

export default App;
