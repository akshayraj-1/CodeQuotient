# Ecommerce Search

This project is a simple commerce application that allows you to retrieve product details as a JSON response.

### Preview: https://akshay-cq-ecommerce-search.glitch.me/

## API Endpoints

#### Get Products:

- **Endpoint:** `/`
- **Method:** GET
- **Description:** Retrieves a list of products as a JSON response.
- **Example:** `http://localhost:3000/products`

#### Get Category Filtered Products:

- **Endpoint:** `/products?category={yourcategory}`
- **Method:** GET
- **Description:** Retrieves a list of products filtered by category as a JSON response.
- **Example:** `http://localhost:3000/products?category=electronics`

#### Get Category & Price Filtered Products:

- **Endpoint:** `/filterproducts?category={yourcategory}&price={yourprice}`
- **Method:** GET
- **Description:** Retrieves a list of products filtered by category and price (>= given price) as a JSON response.
- **Example:** `http://localhost:3000/filterproducts?category=electronics&price=200`

## Product Data

The product details are located in the `src/data` directory. Each file contains an array of product objects.
<br>
Available Categories:
- food
- clothes
- electronics
- accessories
- shoes
- apparel
- eyewear
- snacks
- outwear
- footwear
