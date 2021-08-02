# Uber Eats Clone

The Backend of Uber Eats

## Tech used
<p>
  <img src="https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=Node.js&logoColor=white"/>
  <img src="https://img.shields.io/badge/NestJS-E0234E?style=flat-square&logo=NestJS&logoColor=white"/>
  <img src="https://img.shields.io/badge/PostgreSQL-4169E1?style=flat-square&logo=PostgreSQL&logoColor=white"/>
  <img src="https://img.shields.io/badge/Amazon%20AWS-232F3E?style=flat-square&logo=Amazon%20AWS&logoColor=white"/>
  <img src="https://img.shields.io/badge/GraphQL-E434AA?style=flat-square&logo=GraphQL&logoColor=white"/>
</p>

## User Model

- id
- createAt
- updateAt

- email
- password
- role(client|owner|delivery)

## User CRUD
- Create Account
- Log In
- See Profile
- Edit Profile
- Verify Email

## Restaurant Model

- name
- category
- address
- coverImage

## The Backend of Uber Eats

- See Categories
- See Restaurants by Catogory (pagination)
- See Restaurants (pagination)
- See Restaurant
- Search Restaurant
 
- Edit Restaurant
- Delete Restaurant

- Create Dish
- Edit Dish
- Delete Dish

- Orders CRUD
- Orders Subscription (Owner, Customer, Delivery):
    - pending Orders (owner)
    - Order status (customer, delivery, owner)
    - Pending pickUp (delivery)

- Payments (Paddle, CRON)
