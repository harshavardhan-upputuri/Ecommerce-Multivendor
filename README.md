# 🛒 Ecommerce Multi-Vendor Platform  

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB) 
![Spring Boot](https://img.shields.io/badge/SpringBoot-6DB33F?style=for-the-badge&logo=spring&logoColor=white) 
![MySQL](https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white) 
![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=JSON%20web%20tokens&logoColor=F7DF1E) 
![MIT License](https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge)  

A full-stack **multi-vendor e-commerce platform** built with **Spring Boot (Backend)** and **React (Frontend)**. Supports **role-based access (Admin, Seller, Customer)** with features like product management, cart, orders, payments, and analytics.  

## 🚀 Tech Stack  

### 🔹 Backend  
- Spring Boot  
- MySQL  
- Spring Security + JWT Authentication  
- Java Mail Sender (for notifications)  

### 🔹 Frontend  
- React  
- Redux Toolkit  
- MUI (Material UI) + Tailwind CSS  
- React Router DOM  
- Axios  
- Formik + Yup (forms & validation)  
   

### 🔹 Payments  
- Razorpay (India)  
- Stripe (International)  

## 👨‍💻 Features  

### 🛍 Customer Features  
- Product browsing with categories, filters, and detailed descriptions  
- Add, update, and remove products from cart  
- Apply coupons during checkout  
- Order history with cancellation option  
- Manage account and profile  
- Wishlist (save products for later)  
- Review & rating system  

### 🏬 Seller Features  
- Seller dashboard with earnings & sales reports  
- Create, update, and delete product listings  
- Manage customer orders & track status  
- Seller account management and storefront customization  

### 🔑 Admin Features  
- Admin dashboard with full control  
- Manage sellers (approve/suspend accounts)  
- Coupon management (create/edit/delete coupons)  
- Homepage content management  
- Deal management (create/update/delete promotional deals)  

## ⚙️ Installation  

### Backend Setup (Spring Boot)  
```bash
cd backend
# Configure MySQL in application.properties
spring.datasource.url=jdbc:mysql://localhost:3306/ecommerce
spring.datasource.username=root
spring.datasource.password=yourpassword
mvn spring-boot:run
```

### Frontend Setup (React)  
```bash
cd frontend
npm install
npm start
```

## 🔒 Roles & Access
* **Customer** → Browse, order, review, wishlist  
* **Seller** → Manage products, orders, storefront  
* **Admin** → Manage sellers, coupons, homepage, deals  

## 💳 Payments
* **Razorpay** → For Indian users  
* **Stripe** → For international payments  



## 📌 Future Enhancements
* Chatbot for customer support  
* Advanced analytics for admin & sellers  
* Multi-language support  

## 🤝 Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.  


