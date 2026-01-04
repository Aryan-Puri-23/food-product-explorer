# Food Product Explorer

## About the Project
This is a web application built using React that allows users to explore food products using the OpenFoodFacts API.  
The app lets users search products by name or barcode, filter them by category, sort them, and view detailed information about each product.

---

## Features Implemented

### Homepage
- Displays a list of food products fetched from OpenFoodFacts API
- Each product shows:
  - Product name
  - Product image
  - Categories
  - Nutrition grade
- Load More button for pagination

### Search
- Search products by name
- Search products by barcode
- If no product is found:
  - A message is shown
  - The product list automatically resets after a few seconds

### Category Filter
- Categories are fetched directly from the OpenFoodFacts API
- Users can filter products by selecting a category
- Option to reset back to all categories

### Sort
- Sort products by:
  - Name (A–Z, Z–A)
  - Nutrition Grade (A–E, E–A)

### Product Details Page
- Displays detailed information for a selected product:
  - Product image
  - Full ingredients list
  - Nutrition values (energy, fat, carbs, protein)
  - Labels (if available)
- If an invalid barcode is entered:
  - An error message is shown
  - User is automatically redirected back after a few seconds

### Responsive Design
- Fully responsive for mobile, tablet, and desktop screens
- Built using Tailwind CSS

---

## Tech Stack Used
- React.js
- React Router
- Axios
- Tailwind CSS
- OpenFoodFacts API

---

## API Used
- Base URL: https://world.openfoodfacts.org/
- Product search
- Category listing
- Barcode-based product details

---

## Time Taken
Approximately 3 days.

---