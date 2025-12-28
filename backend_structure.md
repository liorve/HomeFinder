# Backend Structure (FastAPI + PostgreSQL)

This document outlines the project structure for the backend API. It is designed to be simple and scalable, separating concerns into Routers, Schemas, and Models.

> **Note**: Database table creation and updates will be handled manually (without Alembic migrations) for simplicity during the initial development phase.

## Directory Tree

```text
backend/
├── app/
│   ├── __init__.py
│   ├── main.py              # 🚀 Application entry point (initializes FastAPI)
│   │
│   ├── api/                 # 🌐 API Routes
│   │   ├── __init__.py
│   │   └── v1/
│   │       ├── __init__.py
│   │       ├── api.py       # Aggregates all routers from endpoints/
│   │       └── endpoints/   # Actual endpoint logic
│   │           ├── __init__.py
│   │           ├── auth.py  # Login and Register endpoints
│   │           ├── users.py # User profile management
│   │           └── listings.py # Property CRUD operations
│   │
│   ├── core/                # ⚙️ Core Configuration
│   │   ├── __init__.py
│   │   ├── config.py        # Settings (DB URL, Secret Keys, etc.)
│   │   └── security.py      # JWT token handling and password hashing
│   │
│   ├── db/                  # 💾 Database Connectivity
│   │   ├── __init__.py
│   │   ├── session.py       # database session factory (SQLAlchemy)
│   │   └── base_class.py    # Custom SQLAlchemy Base class
│   │
│   ├── models/              # 🗄️ Database Tables (SQLAlchemy ORM)
│   │   ├── __init__.py
│   │   ├── user.py          # User DB table definition
│   │   └── listing.py       # Listing DB table definition
│   │
│   └── schemas/             # 🛡️ Data Validation (Pydantic Models)
│       ├── __init__.py
│       ├── user.py          # Schemas for User input/output
│       ├── listing.py       # Schemas for Listing input/output
│       └── token.py         # Schemas for Auth Tokens
│
├── .env                     # Environment variables (DB credentials, not committed)
└── requirements.txt         # Project dependencies
```

## Module Details

### `app/main.py`
The entry point. It initializes the `FastAPI` app, configures CORS (for the frontend), and includes the API router. Since we are not using migrations, code to create tables on startup (e.g., `Base.metadata.create_all(bind=engine)`) can be placed here or in a separate initialization script.

### `app/api/`
Contains the routing logic.
- **`endpoints/listings.py`**: Will handle `GET /listings`, `POST /listings`, etc.
- **`endpoints/auth.py`**: Will handle user registration and login, returning JWT tokens.

### `app/core/`
- **`config.py`**: Loads environment variables (like `DATABASE_URL`).
- **`security.py`**: Helper functions to hash passwords using `bcrypt` and generate `JWT` tokens.

### `app/db/`
- **`session.py`**: Creates the `engine` and `SessionLocal` class used to connect to PostgreSQL.
- **`base_class.py`**: An abstract base class for models (e.g., automatically generating table names).

### `app/models/`
The SQLAlchemy ORM models. These define the SQL table structure.
- **`listing.py`**: Matches the frontend data fields (`title`, `price`, `bedrooms`, `location`, `coordinates`, etc.).

### `app/schemas/`
Pydantic models for request/response validation.
- **`ListingCreate`**: Fields required when creating a listing.
- **`ListingResponse`**: Fields returned to the API client (might include calculated fields or exclude private IDs).
