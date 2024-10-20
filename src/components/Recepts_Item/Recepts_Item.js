import React, {useState} from 'react';
import "./Recepts_Item.css"
function RecipeList() {
    const [recipes, setRecipes] = useState([
        { id: 1, name: "Салат Цезарь", ingredients: ["Листья салата", "Курица", "Помидор"], instructions: "Приготовьте все ингредиенты и перемешайте." },
        { id: 2, name: "Бургер", ingredients: ["Хлеб", "Говядина", "Лук", "Соус"], instructions: "Обжарьте говядину, сложите остальные ингредиенты и подавайте." }
    ]);
    const [newRecipeName, setNewRecipeName] = useState("");
    const [newRecipeIngredients, setNewRecipeIngredients] = useState("");
    const [newRecipeInstructions, setNewRecipeInstructions] = useState("");

    // Функция для добавления нового рецептапш
    const addNewRecipe = () => {
        if (newRecipeName && newRecipeIngredients && newRecipeInstructions) {
            const newRecipe = {
                id: Date.now(),
                name: newRecipeName,
                ingredients: newRecipeIngredients.split(","),
                instructions: newRecipeInstructions
            };
            setRecipes([...recipes, newRecipe]);
            setNewRecipeName("");
            setNewRecipeIngredients("");
            setNewRecipeInstructions("");
        }
    };

    return (
        <div className="recipe-list">
            <h1>Рецепты</h1>
            <ul>
                {recipes.map(recipe => (
                    <li key={recipe.id}>
                        <h2>{recipe.name}</h2>
                        <p>Ингредиенты:</p>
                        <ul>
                            {recipe.ingredients.map((ingredient, index) => (
                                <li key={index}>{ingredient}</li>
                            ))}
                        </ul>
                        <p>Инструкции:</p>
                        <p>{recipe.instructions}</p>
                    </li>
                ))}
            </ul>
            <form onSubmit={(e) => {
                e.preventDefault();
                addNewRecipe();
            }}>
                <input
                    type="text"
                    placeholder="Название рецепта"
                    value={newRecipeName}
                    onChange={(e) => setNewRecipeName(e.target.value)}
                />
                <textarea
                    placeholder="Ингредиенты (через запятую)"
                    value={newRecipeIngredients}
                    onChange={(e) => setNewRecipeIngredients(e.target.value)}
                ></textarea>
                <textarea
                    placeholder="Инструкции"
                    value={newRecipeInstructions}
                    onChange={(e) => setNewRecipeInstructions(e.target.value)}
                ></textarea>
                <button type="submit">Добавить рецепт</button>
            </form>
        </div>
    );
}

export default RecipeList;