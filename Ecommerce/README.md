# Ecommerce

This project is a simple commerce application that allows you to retrieve product details as a JSON response.

### Preview : https://akshay-cq-ecommerce.glitch.me/

## API Endpoints

#### Get Products:

- **Endpoint:** `/`
- **Method:** GET
- **Description:** Retrieves a list of products as a JSON response.
- **Example:** `http://localhost:3001/`

#### Get Category Filtered Products:

- **Endpoint:** `/?category={yourcategory}`
- **Method:** GET
- **Description:** Retrieves a list of products filtered by category as a JSON response.
- **Example:** `http://localhost:3001/?category=food`

## Product Data

The product details are located in the `src/data` directory. Each file contains an array of product objects.
<br>
Available Categories:
- food
- others
