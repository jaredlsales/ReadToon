# ReadToon 📚

**ReadToon** is a modern, full-stack digital platform designed exclusively for reading South Korean webtoons (Manhwas). It combines a robust Node.js API with a highly responsive React interface to deliver a seamless, engaging experience for fans of the genre.

🌐 **Live Demo:** [readtoon.devjaredsales.com](https://readtoon.devjaredsales.com)

---

## 📸 Screenshots

<div align="center">

  <img width="1848" height="871" alt="home readtoon" src="https://github.com/user-attachments/assets/91d814c5-267f-4246-9d20-419f360ba573" />

  <img width="1828" height="842" alt="Manhwa" src="https://github.com/user-attachments/assets/14812c24-be2c-4587-9e80-438d0763794b" />

  <img width="1856" height="898" alt="chapter readtoon" src="https://github.com/user-attachments/assets/56a08a04-7eac-402b-8d4f-2c896b1870e1" />

  <img width="1865" height="902" alt="terms readtoon" src="https://github.com/user-attachments/assets/fce1d43d-99bb-49eb-ad0a-ea78a57337e9" />

  <img width="1843" height="898" alt="login readtoon" src="https://github.com/user-attachments/assets/5bbf4244-c8e1-4aaa-90a1-b5ac13c0bc92" />

  <img width="1846" height="910" alt="register readtoon" src="https://github.com/user-attachments/assets/99989cbe-75fc-4c86-b70c-51669834696c" />

  <img width="1820" height="897" alt="account readtoon" src="https://github.com/user-attachments/assets/3d1fe02a-747b-4880-b8cc-235c4ff39171" />

  <img width="1782" height="823" alt="security readtoon" src="https://github.com/user-attachments/assets/b53a5bdc-9ab2-443e-a642-859a22484a84" />

</div>



---



## 🛠️ Tech Stack



### **Backend (Node.js)**

* **Runtime:** Node.js with TypeScript

* **Framework:** Express

* **Database & ORM:** MySQL with Prisma ORM

* **Security:** JWT (JSON Web Tokens) & Bcryptjs

* **File Handling:** Multer for image uploads

* **Environment:** Dotenv for secure variable management



### **Frontend (React)**

* **Build Tool:** Vite

* **Styling:** Tailwind CSS

* **UI Components:** Radix UI (Lucide Icons)

* **Data Fetching:** Axios

---

## 🚀 How to Run the Entire Project

To get the project running locally, follow these steps for both the backend and frontend.

### 1. Clone the Repository
```bash
git clone [https://github.com/jaredlsales/ReadToon.git](https://github.com/jaredlsales/ReadToon.git)
cd READTOON
```
### 2. Configure & Run the Backend
Navigate to the backend directory and install dependencies:

```bash
cd BackEnd
npm install
```
Create a .env file inside the BackEnd folder with your credentials:

 Fragmento do código
```bash
DATABASE_URL="mysql://USER:PASSWORD@localhost:3306/readtoon"
JWT_SECRET="your_secret_key"
FRONTEND_URL="http://localhost:5173"
```
 Initialize the database schema and start the developer server:

```bash
npx prisma generate
npx prisma migrate dev
npm run dev
```
The API will be running at http://localhost:3333

### 3. Configure & Run the Frontend
 Open a new terminal and navigate to the frontend folder:

```bash
cd FrontEnd/front-end
npm install
npm run dev
```
 The application will be live at http://localhost:5173

### 📂 Project Structure

ReadToon/
├── BackEnd/                 # Node.js API
│   ├── prisma/              # Database schema and migrations
│   ├── src/
│   │   ├── controllers/     # Route handlers
│   │   ├── middlewares/     # Auth, error handling
│   │   ├── routes/          # API endpoints
│   │   └── server.ts        # App entry point
│   ├── tmp/                 # Uploaded images (covers, pages)
│   └── .env                 # Environment variables
├── FrontEnd/
│   └── front-end/           # React application
│       ├── public/          # Static assets
│       ├── src/
│       │   ├── components/  # Reusable UI components
│       │   ├── pages/       # Application pages
│       │   ├── services/    # API calls (Axios)
│       │   └── App.tsx
│       └── .env             # Frontend environment
└── README.md

### 📝 Key Features
* **✅ Manhwa Ecosystem:** Full management for titles, chapters, and image sequencing.

* **✅ Secure Auth:** Protected routes and encrypted user sessions via JWT.

* **✅ Premium Reader:** High-performance viewing experience optimized for webtoons.

* **✅ Global Error Handling:** Middleware-driven responses for a cleaner dev experience.

### 👨‍💻 Author
# Developed by Jared Sales.
