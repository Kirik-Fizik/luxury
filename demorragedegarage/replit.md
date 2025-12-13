# Startup Flow Platform

## Overview

Startup Flow is a platform that connects startup founders with potential customers and investors. The application allows entrepreneurs to publish their projects while users can discover innovative solutions, leave reviews, and support projects through donations and likes.

**Core Features:**
- Startup project feed with browsing capabilities
- Analytics dashboard with popularity charts (based on likes)
- Project publishing for authenticated users
- Like and review system (1-5 star ratings)
- Donation support for projects
- User authentication and profiles

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework:** React 19 with JavaScript (Create React App)
- **State Management:** MobX for reactive state management with stores pattern
- **Routing:** React Router v6 for client-side navigation
- **HTTP Client:** Axios configured with base URL and JSON headers
- **Styling:** Custom CSS with CSS variables for theming (dark theme with green accents)
- **Charts:** amCharts 5 for analytics visualizations

**Store Pattern:**
- `authStore` - Handles user authentication state, login, registration, and token management
- `projectStore` - Manages projects, likes, reviews, and analytics data

### Backend Architecture
- **Framework:** FastAPI (Python 3.11) with async support
- **ORM:** SQLAlchemy 2.0 with declarative models
- **Validation:** Pydantic 2 for request/response schemas
- **Database:** PostgreSQL
- **Authentication:** JWT tokens with Argon2 password hashing

**Module Structure:**
- `auth/` - User registration, login, JWT token management
- `projects/` - Project CRUD, likes, reviews, analytics endpoints
- `database/` - SQLAlchemy connection and session management

**API Design:**
- RESTful endpoints with `/auth/*` and `/projects/*` prefixes
- Token passed as query parameter for authenticated endpoints
- CORS enabled for all origins (development configuration)

### Data Models
- **User:** id, email, username, hashed_password, is_active, created_at
- **Project:** id, title, description, project_url, user_id, created_at
- **Like:** Links users to projects with unique constraint
- **Review:** Rating (1-5 stars) and comment text linked to project and user

### Authentication Flow
1. User registers with email, username, password
2. Password hashed with Argon2
3. Login returns JWT access token (30-minute expiry)
4. Token stored in localStorage on frontend
5. Token sent as query parameter for authenticated API calls

## External Dependencies

### Database
- **PostgreSQL** - Primary data store
- Connection configured via environment variables: `DATABASE_URL` or individual `PGHOST`, `PGPORT`, `PGDATABASE`, `PGUSER`, `PGPASSWORD`

### Third-Party Libraries

**Backend:**
- `python-jose[cryptography]` - JWT token encoding/decoding
- `passlib` with `argon2-cffi` - Password hashing
- `psycopg2-binary` - PostgreSQL driver
- `alembic` - Database migrations
- `email-validator` - Email validation for Pydantic

**Frontend:**
- `@amcharts/amcharts5` - Interactive charts for analytics
- `mobx` / `mobx-react-lite` - State management
- `axios` - HTTP client

### Environment Variables
- `DATABASE_URL` or `PGHOST/PGPORT/PGDATABASE/PGUSER/PGPASSWORD` - Database connection
- `SECRET_KEY` or `SESSION_SECRET` - JWT signing key
- `ALGORITHM` - JWT algorithm (default: HS256)
- `ACCESS_TOKEN_EXPIRE_MINUTES` - Token expiry (default: 30)
- `DEBUG` - Debug mode flag
- `REACT_APP_API_URL` - Frontend API base URL

### Infrastructure (Docker)
- Docker Compose for containerization
- Nginx for frontend serving in production
- Backend runs on port 8000, frontend on port 5000 (development)