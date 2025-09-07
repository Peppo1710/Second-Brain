# Authentication Setup

This document explains the authentication system implementation for the SecondBrain frontend.

## Features Implemented

### 1. Backend API Integration
- **Login API**: `/api/user/login` - Authenticates users with username/password
- **Register API**: `/api/user/register` - Creates new user accounts
- **Session Verification**: `/api/user/verify` - Validates existing sessions

### 2. Session Management
- **Cookie-based sessions**: Uses `session_token` cookie for secure session management
- **Automatic session verification**: Checks session validity on app load
- **Session persistence**: Maintains login state across browser sessions

### 3. Authentication Flow
- **Login Component**: Updated with backend API integration, loading states, and error handling
- **Signup Component**: Updated with backend API integration, form validation, and error handling
- **App Component**: Enhanced with session management and loading states

## Environment Configuration

### .env File
Create a `.env` file in the root directory with your backend URL:

```env
VITE_BACKEND_URL=https://your-railway-backend-url.railway.app
```

Replace `https://your-railway-backend-url.railway.app` with your actual Railway backend URL.

## API Endpoints Expected

Your backend should implement these endpoints:

### POST /api/user/login
```json
{
  "username": "string",
  "password": "string"
}
```

Response:
```json
{
  "success": true,
  "token": "jwt_token_here",
  "user": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "avatar": null
  }
}
```

### POST /api/user/register
```json
{
  "username": "string",
  "firstName": "string",
  "lastName": "string",
  "age": 25,
  "phone": "string",
  "password": "string"
}
```

Response:
```json
{
  "success": true,
  "token": "jwt_token_here",
  "user": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "avatar": null
  }
}
```

### GET /api/user/verify
Headers:
```
Authorization: Bearer <token>
```

Response:
```json
{
  "success": true,
  "user": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "avatar": null
  }
}
```

## Navbar Behavior

The navbar automatically adapts based on authentication state:

- **Logged Out**: Shows "Login" and "Sign Up" buttons
- **Logged In**: Shows user avatar with dropdown menu containing:
  - My Account
  - My Notebooks
  - My Plan
  - Sign Out

## Security Features

- **Secure cookies**: Session tokens are stored in HTTP-only cookies
- **Automatic cleanup**: Invalid sessions are automatically cleared
- **Error handling**: Comprehensive error handling for network issues
- **Loading states**: User feedback during authentication operations

## Usage

1. Update the `.env` file with your backend URL
2. Ensure your backend implements the required API endpoints
3. The authentication system will automatically handle:
   - User login/logout
   - Session persistence
   - Navbar state management
   - Error handling and user feedback

## Testing

To test the authentication flow:

1. Start the development server: `npm run dev`
2. Navigate to `/signup` to create a new account
3. Navigate to `/login` to sign in
4. Verify that the navbar shows the user avatar when logged in
5. Test logout functionality through the avatar dropdown
