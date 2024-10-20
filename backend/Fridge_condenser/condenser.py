from fastapi import FastAPI, HTTPException
import sqlite3
from pydantic import BaseModel, EmailStr
from typing import List
from datetime import date
from fastapi.middleware.cors import CORSMiddleware
# Создание базы данных и таблиц, если они не существуют
def init_db():
    conn = sqlite3.connect('United.db')
    cursor = conn.cursor()
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS standart_products(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            expiration_time INTEGER
        )
    ''')
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS fridges (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL
        )
    ''')
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT NOT NULL UNIQUE,
            email TEXT NOT NULL UNIQUE,
            FOREIGN KEY (fridge_id) REFERENCES fridges (id)
        )
    ''')
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS products (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            expiration_time INTEGER,
            purchase_date TEXT,
            FOREIGN KEY (fridge_id) REFERENCES fridges (id)
        )
    ''')
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS recipies (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            products TEXT
        )
    ''')
    conn.commit()
    conn.close()
def Dtime(P, C):
    return C-P


init_db()

app = FastAPI()
origins = ["*"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
# Pydantic модели для пользователей, продуктов и их стандартов и холодильников
class User(BaseModel):
    id: int = None
    username: str
    email: EmailStr
    fridge_id: int

class Product(BaseModel):
    id: int = None
    name: str
    expiration_time: int
    purchase_date: str
    fridge_id: int

class SProduct(BaseModel):
    id: int = None
    name: str
    expiration_time: int

class Fridge(BaseModel):
    id: int = None
    name: str

# Вспомогательная функция для подключения к базе данных
def get_db_connection():
    conn = sqlite3.connect('United.db')
    conn.row_factory = sqlite3.Row
    return conn


# API маршруты для пользователей
@app.post("/users/", response_model=User)
def create_user(user: User):
    conn = get_db_connection()
    cursor = conn.cursor()

    try:
        cursor.execute("INSERT INTO users (username, email, fridge_id) VALUES (?, ?, ?)", 
                       (user.username, user.email, user.fridge_id))
        conn.commit()
        user_id = cursor.lastrowid
        return {**user.dict(), "id": user_id}
    except sqlite3.IntegrityError:
        raise HTTPException(status_code=400, detail="Username or email already exists.")
    finally:
        conn.close()

@app.get("/users/", response_model=User)
def read_user(id: int):
    conn = get_db_connection()
    cursor = conn.cursor()

    cursor.execute("SELECT * FROM users WHERE id = ?", (id,))
    users = cursor.fetchall()
    return [dict(user) for user in users]        

@app.put("/users/{user_id}", response_model=User)
def update_user(user_id: int, user: User):
    conn = get_db_connection()
    cursor = conn.cursor()

    cursor.execute("UPDATE users SET username = ?, email = ?, fridge_id = ? WHERE id = ?",
                   (user.username, user.email, user.fridge_id, user_id))
    conn.commit()

    if cursor.rowcount == 0:
        raise HTTPException(status_code=404, detail="User not found.")

    return {**user.dict(), "id": user_id}

@app.delete("/users/{user_id}")
def delete_user(user_id: int):
    conn = get_db_connection()
    cursor = conn.cursor()

    cursor.execute("DELETE FROM users WHERE id = ?", (user_id,))
    conn.commit()

    if cursor.rowcount == 0:
        raise HTTPException(status_code=404, detail="User not found.")

    return {"detail": "User deleted."}

# API маршруты для продуктов
@app.post("/products/", response_model=Product)
def create_product(product: Product):
    conn = get_db_connection()
    cursor = conn.cursor()

    cursor.execute("INSERT INTO products (name, expiration_time, purchase_date, fridge_id) VALUES (?, ?, ?, ?)", 
                   (product.name, product.expiration_time, product.purchase_date, product.fridge_id))
    conn.commit()
    product_id = cursor.lastrowid
    return {**product.dict(), "id": product_id}
'''
@app.get("/products/")
def read_time(time: str = Depends(Dtime))
'''
@app.get("/products/", response_model=Product)
def read_product(id: int):
    conn = get_db_connection()
    cursor = conn.cursor()

    cursor.execute("SELECT * FROM products WHERE id = ?", (id,))
    products = cursor.fetchall()
    return [dict(product) for product in products]


@app.put("/products/{product_id}", response_model=Product)
def update_product(product_id: int, product: Product):
    conn = get_db_connection()
    cursor = conn.cursor()

    cursor.execute("UPDATE products SET name = ?, expiration_time = ?, purchase_date = ?, fridge_id = ? WHERE id = ?",
                   (product.name, product.expiration_time, product.purchase_date, product.fridge_id, product_id))
    conn.commit()

    if cursor.rowcount == 0:
        raise HTTPException(status_code=404, detail="Product not found.")

    return {**product.dict(), "id": product_id}

@app.delete("/products/{product_id}")
def delete_product(product_id: int):
    conn = get_db_connection()
    cursor = conn.cursor()

    cursor.execute("DELETE FROM products WHERE id = ?", (product_id,))
    conn.commit()

    if cursor.rowcount == 0:
        raise HTTPException(status_code=404, detail="Product not found.")

    return {"detail": "Product deleted."}
# API маршруты для стандартов продуктов
'''@app.post("/products/", response_model=Product)
def create_sproduct(product: Product):
    conn = get_db_connection()
    cursor = conn.cursor()

    cursor.execute("INSERT INTO standart_products (name, expiration_time) VALUES (?, ?)", 
                   (product.name, product.expiration_time))
    conn.commit()
    product_id = cursor.lastrowid
    return {**product.dict(), "id": product_id}
@app.get("/products/", response_model=Product)
def read_product(id: int):
    conn = get_db_connection()
    cursor = conn.cursor()

    cursor.execute("SELECT * FROM products WHERE id = ?", (id,))
    products = cursor.fetchall()
    return [dict(product) for product in products]


@app.put("/products/{product_id}", response_model=Product)
def update_product(product_id: int, product: Product):
    conn = get_db_connection()
    cursor = conn.cursor()

    cursor.execute("UPDATE products SET name = ?, expiration_time = ?, purchase_date = ?, fridge_id = ? WHERE id = ?",
                   (product.name, product.expiration_time, product.purchase_date, product.fridge_id, product_id))
    conn.commit()

    if cursor.rowcount == 0:
        raise HTTPException(status_code=404, detail="Product not found.")

    return {**product.dict(), "id": product_id}

@app.delete("/products/{product_id}")
def delete_product(product_id: int):
    conn = get_db_connection()
    cursor = conn.cursor()

    cursor.execute("DELETE FROM products WHERE id = ?", (product_id,))
    conn.commit()

    if cursor.rowcount == 0:
        raise HTTPException(status_code=404, detail="Product not found.")

    return {"detail": "Product deleted."}'''

# API маршруты для холодильников
@app.post("/fridges/", response_model=Fridge)
def create_fridge(fridge: Fridge):
    conn = get_db_connection()
    cursor = conn.cursor()

    cursor.execute("INSERT INTO fridges (name) VALUES (?)", (fridge.name,))
    conn.commit()
    fridge_id = cursor.lastrowid
    return {"id": fridge_id, **fridge.dict()}

@app.get("/fridges/{id}/products/", response_model=List[Product])
def read_productsf(fridge_id: int):
    conn = get_db_connection()
    cursor = conn.cursor()

    cursor.execute("SELECT * FROM products WHERE fridge_id = ?", (fridge_id,))
    products = cursor.fetchall()
    return [dict(product) for product in products]

@app.get("/fridges/{id}/users/", response_model=List[User])
def read_usersf(fridge_id: int):
    conn = get_db_connection()
    cursor = conn.cursor()

    cursor.execute("SELECT * FROM users WHERE fridge_id = ?", (fridge_id,))
    users = cursor.fetchall()
    return [dict(user) for user in users]

@app.put("/fridges/{fridge_id}", response_model=Fridge)
def update_fridge(fridge_id: int, fridge: Fridge):
    conn = get_db_connection()
    cursor = conn.cursor()

    cursor.execute("UPDATE fridges SET name = ? WHERE id = ?", (fridge.name, fridge_id))
    conn.commit()

    if cursor.rowcount == 0:
        raise HTTPException(status_code=404, detail="Fridge not found.")

    return {"id": fridge_id, **fridge.dict()}

@app.delete("/fridges/{fridge_id}")
def delete_fridge(fridge_id: int):
    conn = get_db_connection()
    cursor = conn.cursor()

    cursor.execute("DELETE FROM fridges WHERE id = ?", (fridge_id,))
    conn.commit()

    if cursor.rowcount == 0:
        raise HTTPException(status_code=404, detail="Fridge not found.")

    return {"detail": "Fridge deleted."}
