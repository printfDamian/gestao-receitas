# Recomended Changes
### General Project Structure
- Improve Error Handling across all controllers and routes
- Add Logging
- improve Security (optional)
- Use cookies instead of sessions (Sessions keep data on the server and are temporary, which means when the user closes the browser all data is deleted)
- Create a module to handle all operations related to JWT including middlewares, signs, and check functions

### controllers
Needs more data validation (i.e. check if the email has a good format) ||| ✓ Check email format done ✓

---

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

---

# Recipe Management Web Server
The objective of this project is to give the possibility to someone to have their own Web Site that can manage a variaty of recipes.

### FRAMEWORKS / TECHNOLOGIES / TOOLS
We used **MySQL** and **Firebase** for the databases, **Node.js** as the faundation of the project, and **Express** to help us build the back-end more efficiently.

Compreendido! Se toda a parte relacionada com receitas é gerida por uma API externa e não deve ser manipulada diretamente pela aplicação, ajustarei o mapa do website para refletir isso. Aqui está o novo mapa atualizado:

### Account (For debug/testing purpuse)
 **email:** admin@gmail.com
 **password**: Admin.123

---

### **Website Map - Recipe Management**

#### **Frontoffice (End Users)**
1. **Home Page**
   - Highlights: Popular or new recipes (retrieved via API).
   - Search: Search bar with filters (name, category, difficulty, etc.).

2. **Explore Recipes**
   - Recipe listing by category (starters, main courses, desserts, etc.).
   - Additional filters (preparation time, cost, difficulty).
   - Information is displayed from the API.

3. **Recipe Details**
   - Recipe name, image, author, ingredient list, preparation steps.
   - Additional information: time, cost, difficulty, category.
   - Buttons: Mark as favorite, add to a collection, share.
   - Data is exclusively retrieved via the API.

4. **Favorites and Collections**
   - List of favorite recipes (stored in the local database).
   - Manage personalized recipe collections.

5. **User Profile**
   - Personal information.
   - Manage preferences (e.g., favorite categories).
   - Logout.

#### **Backoffice (Administrators)**
1. **Dashboard**
   - Overview: Total users, favorite recipe categories, etc.

2. **Ingredient Management**
   - List, add, edit, and delete ingredients (local, used for personalized functionalities like favorite collections).

3. **Local Categories Management**
   - List, add, edit, and delete categories (to structure collections or preferences).

4. **User Management**
   - List, add, edit, delete users.
   - Manage permissions.

#### **Extra Features**
1. **Authentication**
   - Login/registration (including via Google).
   - Password recovery.

2. **External API Integration**
   - Import recipes and synchronize with the application.
   - The API is the sole source of recipe data.

3. **Advanced Search**
   - Detailed filters: Specific ingredients, preparation time, etc. (based on API capabilities).

---

# Design

### Logo

<img style="background-color: #f39342; width: 200px" src="imagesReadme/GR-Logo.png">

### Color

**Main color:** *#f39342* / *RGB 243, 147, 66*
![f39342 color](imagesReadme/f39342.png)

**Secondary color:** *#ffffff* / *RGB 255, 255, 255*

### Elements & Components

##### Example for the design of cards:
![Exemple cards design](imagesReadme/cards.png)

---

# Technical manual

### Code

**show logout if logged in**:
<% if (user) { %>
<li><a href="/logout">Logout</a></li>
<% } %>   

### Api
**Show categories**
www.themealdb.com/api/json/v1/1/categories.php
**filter by category**
www.themealdb.com/api/json/v1/1/filter.php?c=Seafood

### content within content

content: ejs.renderFile(path.join(__dirname, "public\views\indexLoggedIn.ejs"), (err, str) => {
                    return str;
                }),


### Models
mealModel
categoryModel

### Controller
mealController
categoryController

---

# AUTHORS
- *André Silva*
- *Gonçalo Ferreira*
- *Samuel Santos*
