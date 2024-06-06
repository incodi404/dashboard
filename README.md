# Data Visualization Dashboard

![Dashboard Screenshot](/dashboard.png)

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)

## Introduction

Welcome to the Data Visualization Dashboard! This project is built using the MERN Stack (MongoDB, Express.js, React.js, Node.js) and Chart.js. It provides an interactive interface to visualize data using various chart types.

## Features

- **Three different charts:** 
  - Bar Chart
  - Line Chart
  - Pie Chart
- **Two different chart types:**
  - Dynamic and interactive
  - Responsive design for various devices
- **Data filteration:**
  - User can filter data based on parameters
  - User can view filtered data in charts
- **User-friendly interface**
- **Backend data management with MongoDB**

## Technologies Used

- **Frontend:**
  - React.js
  - Chart.js
- **Backend:**
  - Node.js
  - Express.js
- **Database:**
  - MongoDB

## Installation

### Prerequisites

- Node.js and npm installed
- MongoDB installed and running

### Steps

1. **Upload data to database**
   ```
   Download MongoDB Compass
   Upload the jsondata.json to MongoDB

2. **Make .env file with .env.sample**
   ```
   Make a .env file in root. Copy .env.sample file's content and paste it in .env file and change values according to you. 

2. **Clone the repository**
   ```bash
   git clone https://github.com/incodi404/dashboard.git
   cd dashboard

3. **Install packages**
   ```
   cd client
   npm i

   cd server
   npm i

4. **Run**
   ```
   cd server
   npm run dev

   cd client
   npm run dev