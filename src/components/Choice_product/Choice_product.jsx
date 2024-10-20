import React, { useState } from 'react';
import { TextField, Autocomplete, Chip } from '@mui/material';
import "./Choice_product.css";
import { useContext } from 'react';

const foodItems = [
    {name: 'Сыр', price: 50, expirationDate: '200'},
    {name: 'Картофель', price: 40, expirationDate: '350'},
    {name: 'Салат', price: 60, expirationDate: '15'},
    {name: 'Помидор', price: 35, expirationDate: '7'},
    {name: 'Грибы', price: 45, expirationDate: '15'},
];

export default function Food_Selector() {
    const [selectedItems, setSelectedItems] = useState([]);
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

    const handleSubmit = async () => {
        try {
            const newProduct = {
                id: 0,
                name: selectedItems[0].name,
                expiration_time:  parseInt(new Date().toISOString()),
                purchase_date: new Date().toISOString(),
                fridge_id: 0
            };

            const response = await fetch('http://89.169.154.115:8000/products/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newProduct)
            });

            if (!response.ok) {
                throw new Error('Ошибка при добавлении продукта');
            }

            const data = await response.json();
            alert('Продукт успешно добавлен!');
        } catch (error) {
            console.error('Ошибка при добавлении продукта:', error);
            alert('Не удалось добавить продукт. Попробуйте еще раз.');
        }
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
                    <h3>Сроки годностей(днях):</h3>
                    {Object.entries(expirationDates).map(([name, date]) => (
                        <div key={name}>
                            <p>{name}: {date}</p>
                            <input
                                type="number"
                                min="0"
                                value={expirationDates[name]?.split('.').reduce((acc, day) => acc + parseInt(day), 0)}
                                onChange={(e) => handleExpirationChange(name, `${parseInt(e.target.value) + parseInt(expirationDates[name]?.split('.').reduce((acc, day) => acc + parseInt(day), 0))}.${expirationDates[name]?.split('.')[1]}`)
                                }
                                />
                        </div>
                    ))}
                </div>
                <button onClick={handleSubmit} className="custom-button">Добавить в корзину</button>
            </div>
        </div>
    );
}
