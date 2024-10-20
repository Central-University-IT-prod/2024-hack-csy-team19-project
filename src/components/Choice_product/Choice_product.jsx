import React, {useState} from 'react';
import {TextField, Autocomplete, Chip} from '@mui/material';
import "./Choice_product.css"

const foodItems = [
    {name: 'Булгур', price: 50, expirationDate: '30.11.2024'},
    {name: 'Картофель', price: 40, expirationDate: '05.02.2025'},
    {name: 'Салат', price: 60, expirationDate: '15.01.2025'},
    {name: 'Помидор', price: 35, expirationDate: '25.12.2024'},
    {name: 'Грибы', price: 45, expirationDate: '10.03.2025'},
];
export default function Food_Selector() {
    const [setSelectedItems] = useState([]);
    const [expirationDates, setExpirationDates] = useState({});

    const handleChange = (event, newValue) => {
        setSelectedItems(newValue);
        setExpirationDates(newValue.reduce((acc, item) => ({
            ...acc,
            [item.name]: item.expirationDate
        }), {}));
    };

    const handleExpirationChange = (name, newExpirationDate) => {
        setExpirationDates(prevState => ({
            ...prevState,
            [name]: newExpirationDate
        }));
    };

    return (
        <div className="food-selector-container">
            <h2 className="title">Выбор продуктов питания</h2>
            <div className="autocomplete-wrapper">
                <Autocomplete
                    multiple
                    options={foodItems}
                    getOptionLabel={(option) => option.name}
                    renderInput={(params) => (
                        <TextField {...params} label="Выберите продукты" className="input-field"/>
                    )}
                    renderTags={(value, getTagProps) =>
                        value.map((option, index) => (
                            <Chip
                                key={index}
                                label={`${option.name} (${expirationDates[option.name] || 'Нет'} )`}
                                {...getTagProps({index})}
                                className="chip"
                            />
                        ))
                    }
                    onChange={handleChange}
                />
                <div className="expiration-dates">
                    <h3>Сроки годностей:</h3>
                    {Object.entries(expirationDates).map(([name, date]) => (
                        <div key={name}>
                            <p>{name}: {date}</p>
                            <input
                                type="number"
                                min="0"
                                value={expirationDates[name]?.split('.').reduce((acc, day) => acc + parseInt(day), 0)}
                                onChange={(e) => handleExpirationChange(name, `${parseInt(e.target.value) + parseInt(expirationDates[name]?.split('.').reduce((acc, day) => acc + parseInt(day), 0))}.${expirationDates[name]?.split('.')[1]}`)}
                                className="expiration-input"
                            />
                        </div>
                    ))}
                </div>
                <button className="button">Добавить в корзину</button>
            </div>
        </div>
    );
}


