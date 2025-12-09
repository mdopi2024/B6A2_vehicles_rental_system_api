# 🚗 Vehicle Rental System API

A simple backend API built with **Node.js, Express, TypeScript, and PostgreSQL** to manage users, vehicles, and bookings.

---

### Live Link : 
`https://your-deployment-url.com`

---

## ✨ Features
- User Registration & Login (JWT)
- Vehicle CRUD (Admin)
- Booking create, cancel, return
- Auto-update vehicle availability
- Role-based access control

---

## 🚀 Installation
 
### 1. Clone the repo:
```bash
git clone https://github.com/mdopi2024/B6A2_vehicles_rental_system_api
cd B6A2_vehicles_rental_system_api
```

### 2. Install Dependencies
```bash
npm install
```

**Main packages:**
- express
- pg
- jsonwebtoken
- bcrypt
- dotenv

### 3. Create `.env` file
```env
PORT=5000
DATABASE_URL=your_postgres_database_url
JWT_SECRET=your_secret_key
```

### 4. Setup Database
Run the SQL schema to create tables (see `database.sql`)

### 5. Run the server
```bash
npm run dev
```

---

## 🛠️ Technologies Used

- Node.js  
- Express.js  
- TypeScript  
- PostgreSQL  
- JWT Authentication  

---

## 📚 API Endpoints

### Authentication
- `POST /api/v1/auth/signup` - Register user
- `POST /api/v1/auth/signin` - Login user

### Vehicles
- `GET /api/v1/vehicles` - Get all vehicles
- `POST /api/v1/vehicles` - Create vehicle (Admin)
- `PUT /api/v1/vehicles/:id` - Update vehicle (Admin)
- `DELETE /api/v1/vehicles/:id` - Delete vehicle (Admin)

### Bookings
- `POST /api/v1/bookings` - Create booking
- `GET /api/v1/bookings` - Get bookings
- `PUT /api/v1/bookings/:id` - Update booking status
---

