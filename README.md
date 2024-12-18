# Recomended Changes
### General Project Structure
- Make all the operations to the database more independent through an API
- Enforce MVC structure
- Make good quality and readable code
- Improve Error Handling across al controllers and routes
- Add Logging
- improve Security (optional)

### controllers\userController.js
##### register / login
Needs more data validation (i.e. check if the email has a good format)

##### line 26:27 / 56:57
Change session to cookie, since session is only used for temporary info (Sessions keep data on the server and are temporary, which means when the user closes the browser all data is deleted).

##### line 23:27
Delete line 27 "req.session.user = user;" because that info is already stored in the token.

##### line 50
Token is not used, maybe leave just the function without the var

##### line 23/53
Create another js file to handle all operations related to JWT including middlewares, signs, and check functions

### models\User.js
Review the General Project Structure comment

### routes
Try keeping the routes files with a similar structure between them

### routes\verifyToken.js
It's out of place, maybe put it in a folder named "utils"

### views
It's difficult to understand what is associated with what.
Make more folders and improve the general structure of this folder to increase readability

# How to run the project

### Fill .env file
- PORT (default = 8800)
- DB_NAME
- DB_USER
- DB_PASSWORD
- FIREBASE_APIKEY
- SECRETKEY

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

## content within content

content: ejs.renderFile(path.join(__dirname, "public\views\indexLoggedIn.ejs"), (err, str) => {
                    return str;
                }),