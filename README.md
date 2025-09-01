# HomeFinder

HomeFinder is a modern, full-stack rental and apartment listing platform. Users can register, log in, create, and manage property listings, view properties on a map, and explore detailed listing pages with images. Built with **React + TypeScript**, **FastAPI**, and **PostgreSQL**, with a responsive, professional UI inspired by top rental platforms.

## Features

- User authentication (register/login)
- CRUD operations for apartment listings
- Map view of properties with coordinates
- Responsive design for desktop and mobile
- Search and filter functionality
- Mock data included; ready to connect to a real backend

## Tech Stack

- **Frontend:** React, TypeScript
- **Backend:** FastAPI, Python
- **Database:** PostgreSQL
- **Map Integration:** Leaflet / Mapbox
- **Containerization:** Docker (optional)

## Project Structure

```
HomeFinder/
├── client/      # React frontend
├── backend/     # FastAPI backend
```

## Getting Started

### Prerequisites

- Node.js & npm (for frontend)
- Python 3.10+ (for backend)
- PostgreSQL database
- Docker (optional)

### Run Frontend

```bash
cd client
npm install
npm start
```

### Run Backend

```bash
cd backend
pip install -r requirements.txt
uvicorn app.main:app --reload
```

## License

This project is licensed under the [MIT License](LICENSE).

