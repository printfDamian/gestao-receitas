# Recomended Changes
### General Project Structure
- Improve Error Handling across all controllers and routes
- Add Logging
- improve Security (optional)
- Use cookies instead of sessions (Sessions keep data on the server and are temporary, which means when the user closes the browser all data is deleted)
- Create a module to handle all operations related to JWT including middlewares, signs, and check functions

### controllers
Needs more data validation (i.e. check if the email has a good format)

# How to run the project

### Fill .env file
- PORT (default = '8800')
- DB_HOST (default = 'localhost')
- DB_NAME
- DB_USER
- DB_PASSWORD
- DB_DATABASE (default = 'gestao_receitas')
- FIREBASE_APIKEY
- SECRETKEY

### Intall all npm packages
`npm install --save`

### Start the server
- Using nodemon *(for debug)*:
`nodemon app`
- Using node:
`node app`

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

## content within content

content: ejs.renderFile(path.join(__dirname, "public\views\indexLoggedIn.ejs"), (err, str) => {
                    return str;
                }),