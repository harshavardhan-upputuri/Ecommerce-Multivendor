# 🛒 Multi-Vendor eCommerce Platform  
A full-stack multi-vendor eCommerce web application built with **Spring Boot** and **React (JavaScript)**. This project supports customers, sellers, and admin roles with dashboards and full functionality.  
## ⚙️ Tech Stack  
**Backend:** Spring Boot, Java 17, Spring Security (JWT), MySQL, Java Mail Sender, Stripe, Razorpay  
**Frontend:** React (JavaScript), Redux Toolkit, Tailwind CSS, Axios, React Router DOM, Formik, Yup  
## 👥 Features by Role  
**👨‍🛍 Customer:**  
- Browse & filter products  
- Add/remove from cart or wishlist  
- Apply discount coupons  
- Checkout with Stripe or Razorpay  
- View & cancel orders  
- Manage account  
- Rate & review products  
**🛒 Seller:**  
- Dashboard with earnings & analytics  
- Add, update, or delete products  
- Manage stock and orders  
- Edit seller profile/store  
**🛠 Admin:**  
- Admin dashboard  
- Approve/suspend seller accounts  
- Manage homepage content  
- Create/edit/delete coupons  
- Manage users, deals, and platform settings  
## 🚀 Getting Started  
### 📁 Clone the Repository  
```bash  
git clone https://github.com/your-username/ecommerce-platform.git  
```  
## 🖥 Backend Setup (Spring Boot)  
```bash  
cd ecommerce-backend  
```  
**Create `application.properties`:**  
```properties  
spring.datasource.url=jdbc:mysql://localhost:3306/ecommerce  
spring.datasource.username=root  
spring.datasource.password=yourpassword  
spring.jpa.hibernate.ddl-auto=update  
jwt.secret=your_jwt_secret  
stripe.secret.key=sk_test_...  
```  
**Run the backend:**  
```bash  
./mvnw spring-boot:run  
```  
## 🌐 Frontend Setup (React JavaScript)  
```bash  
cd ecommerce-frontend  
```  

**Install dependencies:**  
```bash  
npm install  
```  
**Run the frontend:**  
```bash  
npm start  
```  
## 📦 Folder Structure  
```
ecommerce-platform/  
├── ecommerce-backend/  
│   └── src/main/java/com/...  
├── ecommerce-frontend/  
│   └── src/components/  
│   └── src/pages/  
│   └── src/redux/  
```  
## 💳 Payment Integration  
- Use **Stripe** for international payments  
- Use **Razorpay** for Indian payments  
- Replace test keys with live keys for production  
## 📝 License  
This project is licensed under the MIT License.  
## 🙋‍♂️ Author  
**Harsha Vardhan Upputuri**  
GitHub: [@harshavardhan-upputuri](https://github.com/harshavardhan-upputuri)  
