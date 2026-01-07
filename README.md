# IAM (Authentication) Microservice

A standalone authentication microservice that provides user registration and login functionality for multiple applications.

## Overview
This service is designed to be reused across different systems, acting as a centralized authentication provider.

## Key Features
- User registration and login
- Secure password hashing
- JWT-based authentication
- Stateless session management
- Easily pluggable into other services

## Technical Highlights
- **Bcrypt** for secure password hashing
- **JWT** for stateless authentication
- Clean separation between auth logic and consuming services
- Designed with microservice reuse in mind

## Tech Stack
- Node.js
- Express.js
- MongoDB
- Mongoose
- Bcrypt
- JSON Web Tokens (JWT)

## Getting Started
```bash
git clone https://github.com/Nngozii/iam-auth-microservice.git
cd iam-auth-microservice
npm install
npm start
