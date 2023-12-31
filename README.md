# Online OZ-Products Store

## Overview
This project is an online store specializing in the sale of iPhones, MacBooks, and insurance for these products. It features a sleek, user-friendly interface built with React, and a robust, secure back-end powered by Django REST Framework. The store is hosted using Render.com services, with the front-end deployed at [GitHub Pages](https://spycdog.github.io/3RD---Final-Python-project/).

## Features

### User Authentication
- **Register**: New users can sign up for an account.
- **Login**: Existing users can log in to access more features. (user='SD', password='88')

### Shopping Cart
- **Add to Cart**: Logged-in users can add items to their shopping cart.
- **Delete All Items**: Users can clear their cart from the cart screen.
- **Delete Specific Item**: Users can remove specific items from their cart.
- **Increase Item Quantity**: Users can increase the quantity of an item in their cart.
- **Decrease Item Quantity**: Users can decrease the quantity of an item in their cart.

### User Interface
- The application includes several animations for an enhanced user experience.

## Technologies Used
- **Front-end**: React.js
- **Back-end**: Django REST Framework
- **Hosting**: Render.com for back-end, GitHub Pages for front-end

## Local Development
To set up this project locally, follow these steps:

1. **Clone the repository**:
 - git clone https://github.com/SpyCDog/3RD---Final-Python-project.git

 
2. **Front-end Setup**:
- Navigate to the front-end directory:
  ```
  cd <react-oz-product>
  ```
- Install dependencies:
  ```
  npm install
  ```
- Start the React development server:
  ```
  npm start
  ```

3. **Back-end Setup**:
- Navigate to the back-end directory:
  ```
  cd <drf_oz_product>
  ```
- Set up a Python virtual environment and activate it.
- Install dependencies:
  ```
  pip install -r requirements.txt
  ```
- Start the Django server:
  ```
  python manage.py runserver
  ```

## Contributing
Contributions to this project are welcome. Please fork the repository and submit a pull request with your proposed changes.


