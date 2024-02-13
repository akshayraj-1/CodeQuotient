# Ecommerce

This project is a simple commerce application that allows you to retrieve product details as a JSON response.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

To run this project, you need to have Node.js and npm installed on your machine. You can download Node.js from the [official website](https://nodejs.org/en/download/).

## API Endpoints

### Get Products

- **Endpoint:** `/`
- **Method:** GET
- **Description:** Retrieves a list of products as a JSON response.
- **Example:** `http://localhost:3000/`

### Get Category Filtered Products

- **Endpoint:** `/?category={yourcategory}`
- **Method:** GET
- **Description:** Retrieves a list of products filtered by category as a JSON response.
- **Example:** `http://localhost:3000/?category=electronics`

## Product Data

The product details are located in the `src/data` directory. Each file contains an array of product objects.

## Built With

- [Node.js](https://nodejs.org/) - JavaScript runtime built on Chrome's V8 JavaScript engine.
- [Express.js](https://expressjs.com/) - Web application framework for Node.js.
