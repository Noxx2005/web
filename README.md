# Insighta Web Portal

Web interface for Insighta Labs+ - Profile Intelligence System.

## Features

- GitHub OAuth authentication
- HTTP-only cookies for token storage
- CSRF protection
- Dashboard with metrics
- Profile listing with filters and pagination
- Natural language search
- Profile detail view
- Account management

## Installation

```bash
npm install
```

## Configuration

Create `.env` file:
```
VITE_API_URL=http://localhost:8000
```

## Development

```bash
npm run dev
```

## Build

```bash
npm run build
```

## Authentication

The web portal uses HTTP-only cookies set by the backend:
- Tokens are not accessible via JavaScript
- Automatic token refresh handled by backend
- CSRF tokens required for state-changing operations

## Pages

- `/login` - GitHub OAuth login
- `/callback` - OAuth callback handler
- `/` - Dashboard
- `/profiles` - Profile list with filters
- `/profiles/:id` - Profile detail
- `/search` - Natural language search
- `/account` - User account info

## Tech Stack

- React 18
- React Router 6
- React Query
- Tailwind CSS
- Vite

## License

MIT
