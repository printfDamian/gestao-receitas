# How to run the project

### Fill .env file
- PORT (default = 8800)
- DB_NAME
- DB_USER
- DB_PASSWORD
- FIREBASE_APIKEY

### Intall all npm packages
`npm install --save`

### Start the server
- Using nodemon *(for debug)*:
`nodemon app`
- Using node:
`node app`

Add `--sync` if you want a connection with the DB

# Recipe Management Web Server
The objective of this project is to give the possibility to someone to have their own Web Site that can manage a variaty of recipes.

### FRAMEWORKS / TECHNOLOGIES / TOOLS
We used **MySQL** and **Firebase** for the databases, **Node.js** as the faundation of the project, and **Express** to help us build the back-end more efficiently.

### FEATURES
1. #### Save recipes as favorite
Gives the possibility to the user of giving a star (mark as favorite) to a recipe.

2. #### Search

    - #### Filter

### AUTHORS
- *André Silva*
- *Gonçalo Ferreira*
- *Samuel Santos*

### Account
 **email:** admin@gmail.com
 **password**: Admin.123

## Code stuff

**show logout if logged in**:
<% if (user) { %>
<li><a href="/logout">Logout</a></li>
<% } %>   


## Api stuff
**Show categories**
www.themealdb.com/api/json/v1/1/categories.php
**filter by category**
www.themealdb.com/api/json/v1/1/filter.php?c=Seafood