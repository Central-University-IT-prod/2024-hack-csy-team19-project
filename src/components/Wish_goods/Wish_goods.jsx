import React, { useState } from 'react';
import Select from 'react-select';
import './Wish_goods.css';

const options = [
    { value: 'apple', label: 'Яблок' },
    { value: 'banana', label: 'Банан' },
    { value: 'orange', label: 'Апельсин' },
    { value: 'grape', label: 'Виноград' },
];

export default function WishList() {
    const [wishItems, setWishItems] = useState([]);
    const [selectedOption, setSelectedOption] = useState(null);

    // Функция для добавления товара в список желаний
    const addToWishList = () => {
        if (selectedOption) {
            setWishItems([...wishItems, selectedOption.value]);
            setSelectedOption(null);
        }
    };

    // Функция для удаления товара из списка желаний
    const removeFromWishList = (index) => {
        setWishItems(wishItems.filter((_, i) => i !== index));
    };

    return (
        <div className="wish-list">
            <h2>Мой список желаний</h2>
            <Select
                options={options}
                value={selectedOption}
                onChange={(option) => setSelectedOption(option)}
                placeholder="Выберите товар"
                className="select"
            />
            <button onClick={addToWishList} className="custom-button">Добавить в список</button>
            <ul>
                {wishItems.map((item, index) => (
                    <li key={index}>
                        {item}
                        <button onClick={() => removeFromWishList(index)} className="remove-item-button">Удалить</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

