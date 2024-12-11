# Auth :

### Register :

url : http://localhost:5000/api/auth/register

> Method : POST

<pre>body : {
     name: "string", 
     email: "string", 
     password: "string", 
     photo : "string"
}</pre>

<br>

### Login :

url : http://localhost:5000/api/auth/login

> Method : POST

<pre>body : { 
     email: "string", 
     password: "string"
}</pre>

<br>

### Role Changes By Admin:

url : http://localhost:5000/api/auth/role?email=admin@example.com

> Method : PUT

> query : email=adminEmail

<pre>body : { 
     id: "string", 
     role: "string"
}</pre>

<br>

### Update Single User:

url : http://localhost:5000/api/auth/update

> Method : PUT

<pre>body : { 
     name: "string", 
     email: "string", 
     password: "string", 
     photo : "string"
}</pre>

<br>

### Get All User By Admin:

url : http://localhost:5000/api/auth/users?email=admin@example.com

> Method : GET

> query : email=adminEmail

<br>
