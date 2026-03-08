#Ticket Handling Application

A full-stack ticket handling system built with React, Node.js, TypeScript, PostgreSQL, and Docker.

##Features:

###User:

Users can:
• create new tickets
• view their own tickets
• edit open tickets
•see ticket status updates

###Handler:

Handlers can:
• view all tickets in the system
• close tickets
• add a closing comment

###Authentication
• JWT-based authentication
• secure password hashing with bcrypt
• role-based access control

###Roles:
• USER
• HANDLER

###Tech Stack
Frontend
• React
• TypeScript
• Vite
Axios
• React Router

Backend
• Node.js
• Express
• TypeScript
• Prisma ORM
• JWT Authentication
0149 bcrypt password hashing

Database
• PostgreSQL
• Prisma managment

Build 
• Docker
• Docker Compose

##Starting the Project
###Prerequisites:
Install
• Node.js
• Docker

###Start Backend and Databse
From project root 
```
docker compose up -- build
```

backend API will run on [http://localhost:5000]

###Start FrontEnd
Navigate to frontend folder
```
npm install
npm run dev 
```

frontend will run on [http://localhost:5173]

There are two predifined test accounts, vissible on the log in page.
