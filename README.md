# HomeFinder 🏠✨

HomeFinder is a modern, high-performance real estate platform designed for seamless property discovery and management. Whether you're looking for a cozy rental or your dream home for sale, HomeFinder provides a premium experience with real-time data, interactive mapping, and advanced financial tools.

---

## 🚀 Key Features

### 🔐 Advanced Authentication
- **Secure JWT-based Auth**: Robust user registration and sign-in system.
- **Persistent Sessions**: Automated token management and state hydration using **Jotai**.
- **User Profiles**: Manage your personal information and view your active listings.

### 🏠 Property Management
- **Intuitive Creation Flow**: Granular address input (City, Street, No.) with automatic geocoding.
- **Dynamic Image Uploads**: Integrated image hosting for property galleries.
- **Dual Type Support**: List properties for **Rent** (per month) or **Sale** (total price).

### 🔍 Discovery & Visualization
- **Interactive Maps**: Powered by **Leaflet** and **OpenStreetMap** for precise property location viewing.
- **Listing Gallery**: Responsive cards with key property details (Rooms, Sqm, Amenities).
- **Detailed Views**: Comprehensive property pages with descriptions, full-size images, and map markers.

### 🏦 Financial Tools
- **Mortgage Calculator**: Real-time mortgage estimation for sale properties.
- **Dynamic Sliders**: Adjust down payments and loan terms (15-30 years) with a fixed 4.96% interest rate.

---

## 🛠 Tech Stack

### Frontend
- **Framework**: [React](https://reactjs.org/) + [Vite](https://vitejs.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **State Management**: [Jotai](https://jotai.org/)
- **Components**: [Shadcn UI](https://ui.shadcn.com/) (Lucide, Radix UI)
- **Maps**: [React-Leaflet](https://react-leaflet.js.org/)

### Backend
- **Framework**: [FastAPI](https://fastapi.tiangolo.com/) (Python 3.10+)
- **ORM**: [SQLAlchemy](https://www.sqlalchemy.org/)
- **Database**: [PostgreSQL](https://www.postgresql.org/)
- **Migrations**: [Alembic](https://alembic.sqlalchemy.org/)
- **Security**: [Passlib](https://passlib.readthedocs.io/) (bcrypt), [Jose](https://python-jose.readthedocs.io/) (JWT)

---

## 📁 Project Structure

```text
HomeFinder/
├── backend/            # FastAPI Application
│   ├── app/
│   │   ├── api/        # Endpoints (Auth, Users, Listings, Upload)
│   │   ├── models/     # SQLAlchemy Database Models
│   │   ├── schemas/    # Pydantic Data Schemas
│   │   └── core/       # Security & Config
│   ├── alembic/        # DB Migrations
│   └── uploads/        # Local Image Storage
└── frontend/           # React Application
    ├── src/
    │   ├── components/ # Atomic UI & Page Modules
    │   ├── lib/        # Atoms, Config & Utilities
    │   └── App.tsx     # Routing & Provider Logic
```

---

## 🚦 Getting Started

### Prerequisites
- Node.js & npm
- Python 3.10+
- PostgreSQL

### Backend Setup
1. Create a virtual environment:
   ```bash
   cd backend
   python -m venv venv
   source venv/bin/activate  # or venv\Scripts\activate
   pip install -r requirements.txt
   ```
2. Run migrations:
   ```bash
   alembic upgrade head
   ```
3. Start the server:
   ```bash
   ./start.sh
   ```

### Frontend Setup
1. Install dependencies:
   ```bash
   cd frontend
   npm install
   ```
2. Start development server:
   ```bash
   npm run dev
   ```

---

## 📄 License
This project is licensed under the [MIT License](LICENSE).
