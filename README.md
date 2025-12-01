# employee-manager-react-springboot

# Employee Manager (React + Spring Boot)

A full-stack Employee Management System built using **React**, **Spring Boot**, and **MySQL**.  
This application provides complete CRUD operations with a premium gold-gradient UI.

---

## 🚀 Features

### ⭐ Frontend (React)
- Premium **Gold Gradient UI**
- Employee List with:
  - Initial Avatar
  - Search filter
  - Edit & Delete actions
- Add Employee Form:
  - Full validation
  - Success modal popup
- Update Employee:
  - Auto-loaded form fields
  - Success modal
- Delete Employee:
  - Confirmation modal
- React Router Navigation
- Axios API Integration  
- Bootstrap 5 Responsive UI

---

## ⭐ Backend (Spring Boot)
- REST APIs for Employee CRUD
- MySQL Database Integration
- JPA/Hibernate ORM
- Global Exception Handling
- DTO + Entity Mapping (optional)

---

## 🏗️ Tech Stack

### **Frontend**
- React  
- React Router DOM  
- Axios  
- Bootstrap 5  
- React Icons  

### **Backend**
- Java 17  
- Spring Boot  
- Spring Web  
- Spring Data JPA  
- MySQL  
- Maven  

---

## 📂 Frontend Structure

src/
 ├── components/
 │    ├── Header.jsx
 │    ├── Footer.jsx
 │    ├── ListEmployee.jsx
 │    └── AddEmployee.jsx
 │
 ├── services/
 │    └── EmployeeService.js
 │
 ├── App.js
 └── index.js


---

## 📂 Backend Structure

src/
 ├── controller/
 ├── service/
 ├── repository/
 ├── entity/
 └── EMSApplication.java


---

## 🔗 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET    | `/api/employees`          | Get all employees |
| POST   | `/api/employees`          | Add new employee |
| GET    | `/api/employees/{id}`     | Get employee by ID |
| PUT    | `/api/employees/{id}`     | Update employee |
| DELETE | `/api/employees/{id}`     | Delete employee |

---

## 🛠️ How to Run

### **Backend (Spring Boot)**

1. Create database:

2. Configure database in `application.properties`:
spring.datasource.url=jdbc:mysql://localhost:3306/ems
spring.datasource.username=root
spring.datasource.password=yourpassword
spring.jpa.hibernate.ddl-auto=update

3. Run the backend:

---

### **Frontend (React)**

Install dependencies:

Start application:

---

## 📌 Future Enhancements
- Login / JWT Authentication
- Pagination
- Export to Excel / PDF
- Dark Mode UI
- Employee Salary & Role Module

---

## 👨‍💻 Author
**Saurabh Keshri**  
Full Stack Developer (React + Spring Boot)

