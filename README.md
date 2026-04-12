# 🍽️ Food Ordering System

A full-stack food ordering web application built with **Django REST Framework** (backend) and **React.js** (frontend). It supports customer-facing features like browsing food items, searching, user registration/login, and cart management — along with a dedicated admin panel for managing categories and food items.

---

## 🚀 Tech Stack

### Backend
- **Python** with **Django 6.x**
- **Django REST Framework** – RESTful API
- **django-cors-headers** – Cross-Origin Resource Sharing
- **SQLite** – Default database (development)
- **Pillow** – Image handling for food item photos

### Frontend
- **React.js 19** – UI library
- **React Router DOM v7** – Client-side routing
- **React Icons** – Icon library
- **React Toastify** – Toast notifications
- **React CSV** – CSV export support
- **React Zoom Pan Pinch** – Image zoom support

---

## 📁 Project Structure

```
FoodOrderingSystemDjangoReact/
├── backend/                    # Django project root
│   ├── backend/                # Django settings & config
│   │   ├── settings.py
│   │   ├── urls.py
│   │   └── wsgi.py
│   ├── foodOrdering/           # Main Django app
│   │   ├── models.py           # Database models
│   │   ├── views.py            # API view functions
│   │   ├── serializers.py      # DRF serializers
│   │   ├── urls.py             # App-level URL routing
│   │   └── admin.py
│   ├── media/                  # Uploaded food images
│   ├── db.sqlite3              # SQLite database
│   └── manage.py
├── frontend/                   # React app
│   ├── public/
│   └── src/
│       ├── pages/              # Full page components
│       │   ├── Home.jsx
│       │   ├── Admin_login.jsx
│       │   ├── AdminDashboard.jsx
│       │   ├── AddCategory.jsx
│       │   ├── ManageCategory.jsx
│       │   ├── Add_food.jsx
│       │   ├── ManageFood.jsx
│       │   ├── SearchPages.jsx
│       │   └── Cart.jsx
│       ├── Component/          # Reusable UI components
│       │   ├── AdminHeader.jsx
│       │   ├── AdminSidebar.jsx
│       │   ├── AdminLayout.jsx
│       │   ├── PublicLayout.jsx
│       │   ├── Registration.jsx
│       │   ├── Login.jsx
│       │   └── FoodDetails.jsx
│       └── App.jsx             # Routes definition
├── demo_img/                   # Sample food images
├── venv/                       # Python virtual environment
└── README.md
```

---

## 📦 Database Models

| Model      | Fields |
|------------|--------|
| `User`     | first_name, last_name, email, mobile, password, register_date |
| `Category` | category_name, creation_date |
| `Food`     | category (FK), item_name, item_price, item_description, image, item_quantity, is_available |
| `Order`    | user (FK), food (FK), quantity, is_order_placed, order_number |

---

## 🔌 API Endpoints

All endpoints are prefixed under `/api/` (configured via the main `urls.py`).

| Method | Endpoint              | Description                        |
|--------|-----------------------|------------------------------------|
| POST   | `admin-login/`        | Admin login via Django auth        |
| POST   | `add-category/`       | Add a new food category            |
| GET    | `categories/`         | List all categories                |
| POST   | `add-food-item/`      | Add a new food item (with image)   |
| GET    | `manage-food/`        | List all food items (admin)        |
| GET    | `food_search/?q=`     | Search food items by name          |
| GET    | `random_foods/`       | Fetch 9 random food items          |
| POST   | `register/`           | Register a new user                |
| POST   | `login/`              | Login user (email or mobile)       |
| GET    | `foods/<int:id>/`     | Get food item details by ID        |
| POST   | `cart/add/`           | Add food item to cart              |
| GET    | `cart/<int:user_id>/` | Get user's cart items              |
| PUT    | `cart/update_quantity`| Update quantity of cart item       |
| DELETE | `cart/delete/<id>/`   | Remove item from cart              |

---

## ⚙️ Getting Started

### Prerequisites

- Python 3.10+
- Node.js 18+
- npm

---

### 🖥️ Backend Setup

1. **Navigate to the backend directory:**
   ```bash
   cd backend
   ```

2. **Activate the virtual environment:**
   ```bash
   # Windows
   ..\venv\Scripts\activate

   # macOS/Linux
   source ../venv/bin/activate
   ```

3. **Install Python dependencies:**
   ```bash
   pip install django djangorestframework django-cors-headers pillow
   ```

4. **Apply database migrations:**
   ```bash
   python manage.py makemigrations
   python manage.py migrate
   ```

5. **Create a Django superuser (for admin panel access):**
   ```bash
   python manage.py createsuperuser
   ```

6. **Start the Django development server:**
   ```bash
   python manage.py runserver
   ```

   The backend will be available at: [http://localhost:8000](http://localhost:8000)

---

### 🌐 Frontend Setup

1. **Navigate to the frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install Node.js dependencies:**
   ```bash
   npm install
   ```

3. **Start the React development server:**
   ```bash
   npm start
   ```

   The frontend will be available at: [http://localhost:3000](http://localhost:3000)

---

## 🗺️ Frontend Routes

| Route               | Component         | Description                    |
|---------------------|-------------------|--------------------------------|
| `/`                 | `Home`            | Public home page with food listings |
| `/search-food`      | `SearchPages`     | Search food items              |
| `/food/:id`         | `FoodDetails`     | Food item detail page          |
| `/registration`     | `Registration`    | User registration page         |
| `/login`            | `Login`           | User login page                |
| `/admin-login`      | `Admin_login`     | Admin login page               |
| `/admin-dashboard`  | `AdminDashboard`  | Admin dashboard                |
| `/add-category`     | `AddCategory`     | Add a new food category        |
| `/manage-category`  | `ManageCategory`  | Manage existing categories     |
| `/add-food`         | `Add_food`        | Add a new food item            |
| `/manage-food`      | `ManageFood`      | Manage existing food items     |
| `/cart`             | `Cart`            | User's shopping cart page      |

---

## ✨ Features

### Customer Features
- 🏠 Browse food items on the home page (9 random items displayed)
- 🔍 Search food by name
- 📄 View detailed food item information
- 🛒 Add food items to cart
- ➕ Update food quantities or remove items from cart
- 📝 User registration (name, email, mobile, password)
- 🔐 User login (via email or mobile number)

### Admin Features
- 🔑 Secure admin login using Django's authentication system
- 📂 Add & manage food categories
- 🍕 Add food items with images, price, description, and availability
- 📋 View and manage all food listings

---

## 🔧 Configuration Notes

- **CORS**: The backend is configured to allow requests only from `http://localhost:3000` (React dev server).
- **Media Files**: Uploaded food images are stored in the `backend/media/food_image/` directory. Make sure `MEDIA_URL` and `MEDIA_ROOT` are correctly configured in `settings.py`.
- **Database**: SQLite is used by default for development. You can switch to PostgreSQL or MySQL for production.

---

## 🛠️ Available Frontend Scripts

From the `frontend/` directory:

| Command           | Description                                      |
|-------------------|--------------------------------------------------|
| `npm start`       | Run the app in development mode (localhost:3000) |
| `npm test`        | Launch the test runner                           |
| `npm run build`   | Build the app for production                     |
| `npm run eject`   | Eject from Create React App (irreversible)       |

---

## 📌 Notes

- This project is for **learning and development purposes**.
- Do **not** use the default `SECRET_KEY` in production — generate a new one.
- Set `DEBUG = False` and configure `ALLOWED_HOSTS` before deploying to production.

---

## 📜 License

This project is open-source and free to use for educational purposes.
