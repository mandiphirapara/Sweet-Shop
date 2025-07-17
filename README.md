# 🍬 Sweet Shop Management System

A **full-stack Sweet Shop Management System** featuring backend logic built with **JavaScript** and a dynamic frontend built with **React** and **Bootstrap**.

This system allows for full CRUD operations, real-time searching, sorting, and inventory management through a clean, responsive, and interactive user interface. The backend logic was developed using a **Test-Driven Development (TDD)** approach with **Jest**.

---

## ✅ Features

* **Full CRUD Functionality**: Add, view, update, and delete sweets through an interactive modal UI.
* **Instant Search**: Filter the sweets list instantly by ID, Name, or Category.
* **Advanced Sorting**: Sort the list by Name (A-Z, Z-A) or Price (Low-High, High-Low) and clear the sort to return to the default order.
* **Interactive Inventory Management**:
    * **Purchase & Restock**: Use modals to specify the exact quantity to buy or restock.
    * **Safe Deletion**: A confirmation dialog prevents accidental deletions.
* **User-Friendly Feedback**: Toast notifications provide clear feedback for all actions.
* **Responsive Design**: The layout is fully responsive and works seamlessly on desktop, tablet, and mobile devices.

---

## 📂 Project Structure

Of course. Here is the complete code for your README.md file. Just copy everything inside the box below and paste it into your file.

Markdown

# 🍬 Sweet Shop Management System

A **full-stack Sweet Shop Management System** featuring backend logic built with **JavaScript** and a dynamic frontend built with **React** and **Bootstrap**.

This system allows for full CRUD operations, real-time searching, sorting, and inventory management through a clean, responsive, and interactive user interface. The backend logic was developed using a **Test-Driven Development (TDD)** approach with **Jest**.

---

## ✅ Features

* **Full CRUD Functionality**: Add, view, update, and delete sweets through an interactive modal UI.
* **Instant Search**: Filter the sweets list instantly by ID, Name, or Category.
* **Advanced Sorting**: Sort the list by Name (A-Z, Z-A) or Price (Low-High, High-Low) and clear the sort to return to the default order.
* **Interactive Inventory Management**:
    * **Purchase & Restock**: Use modals to specify the exact quantity to buy or restock.
    * **Safe Deletion**: A confirmation dialog prevents accidental deletions.
* **User-Friendly Feedback**: Toast notifications provide clear feedback for all actions.
* **Responsive Design**: The layout is fully responsive and works seamlessly on desktop, tablet, and mobile devices.

---

## 📂 Project Structure
```
Sweet-Shop/
└── frontend/
├── public/
├── src/
│   ├── components/  # Reusable React Components (Modals, Lists, etc.)
│   ├── logic/     # Business Logic (SweetShop class) and its tests
│   ├── App.js       # Main React App Component
│   └── ...
├── .gitignore
├── package.json
└── README.md
```
---

## 🚀 Technologies Used

### Frontend
* **React**
* **Bootstrap** & **react-bootstrap**
* **react-toastify** (for notifications)

### Backend Logic & Testing
* **JavaScript (ES6+)**
* **Jest** (Testing Framework)

### Mock API
* **JSON Server**

### Version Control
* **Git** & **GitHub**

---

## 🏁 Getting Started

### Prerequisites

Make sure you have Node.js and npm installed on your machine. You will also need to install JSON Server globally.
```bash
npm install -g json-server.
```

### Installation & Setup

1.  **Clone the Repository**
    ```bash
    git clone https://github.com/mandiphirapara/Sweet-Shop
    ```

2.  **Navigate to the Sweet-Shop Directory**
    ```bash
    cd Sweet-Shop
    ```

3.  **Install Dependencies**
    ```bash
    npm install
    ```

### Running the Application

You will need two separate terminals running at the same time.

### Terminal 1: Start the Mock API Server
Navigate to the root Sweet-Shop directory.
Run this command:
```
Bash
json-server --watch db.json --port 3001
```
Leave this terminal running. This is your backend.

### Terminal 2: Start the React Frontend
Open a new terminal window.
1.  From the `frontend` directory, start the development server:
    ```bash
    cd frontend
    npm start
    ```
2.  Open your browser and go to `http://localhost:3000`.

### Running Tests

1.  The tests for the `SweetShop` class logic are also located within the frontend project. From the `frontend` directory, run:
    ```bash
    npm test
    ```