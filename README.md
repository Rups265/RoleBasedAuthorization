Assignment: Role-Based Access Control (RBAC)

how to approch project 
env :
PORT=
Authkey = 
DB_NAME = 
MONGO_URI=
JWT_SECRET=
NODE_ENV= 
ADMIN_EMAIL=
ADMIN_PASSWORD=
API_MESSAGE="VRV"
#authentication
API_KEY=
API_MESSAGE =
CLOUDINARY_NAME=
CLOUDINARY_URL=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=

steps:
1:run admin seeder
2:run role seeder
3:get hash from database from user and then make key called authKey for in header to procced

Project Report: Role-Based Access Control System
Project Overview
This project implements a robust Role-Based Access Control (RBAC) system for managing permissions and access to different modules and actions in a Node.js-based application. It ensures secure access to resources by enforcing role-specific permissions and provides flexibility to handle both public and restricted routes.

Features Implemented
User Authentication and Authorization:

Securely identify users with userId extracted from request headers or tokens.
Authenticate users for restricted routes.
Authorize users based on their roles and assigned permissions.
Role-Based Middleware:

Centralized roleBasedAccess middleware to enforce permissions.
Supports specific modules (Blog, Role, etc.) and actions (create, read, update, delete).
Flexible Route Access:

Allows public access (unauthenticated users) to specified routes.
Restricts access to specific roles for sensitive routes (e.g., Admin, Moderator).
Modular and Extensible Design:

Utilized DAOs (Data Access Objects) for database interactions.
Role and permission data fetched dynamically, ensuring flexibility in role management.
Default Authentication Behavior:

Public routes (isAuthenticationRequired = false) skip authentication by default.
Secure routes (isAuthenticationRequired = true) enforce authentication checks.
