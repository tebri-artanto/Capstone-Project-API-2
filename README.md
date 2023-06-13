# Description

for the backend API, we use **express.js** to make the endpoint. We deployed API in **GCP** using **app engine**, and the configure in [app.yaml](app.yaml). Beside that we also deploy the machine learning in **cloud run**. When user using the feature predict in Android, the images/pictures taken by users will store in **cloud storage**. For database we used **mongoDB Atlas** to store data like users, pengepuls, and articles.
 
# Documentation

# User
## Sign Up
* Method : POST
* URL : https://capstone-project-387217.et.r.appspot.com/signup
<pre>
{
 "username":"String",
 "email":"String",
 "password":"String"
}
</pre>

## Sign In/Login
* Method : POST
* URL : https://capstone-project-387217.et.r.appspot.com/login
<pre>
{
 "email":"String",
 "password":"String"
}
</pre>

# Predict
## Predict
* Method : POST
* Header : Bearer Token
* Body : form-data/multipart
* URL : https://capstone-project-387217.et.r.appspot.com/predictImage

# Pengepul
## Sign Up Pengepul
* Method : POST
* Header : Bearer Token
* URL : https://capstone-project-387217.et.r.appspot.com/pengepul/add
<pre>
{
 "contact":"String",
 "location":"String",
 "description":"String",
 "lat":"Number",
 "lon":"Number"
}
</pre>

## Update Pengepul
* Method : PUT
* Header : Bearer Token
* URL : https://capstone-project-387217.et.r.appspot.com/pengepul/update
<pre>
{
 "contact":"String",
 "location":"String",
 "description":"String",
 "lat":"Number",
 "lon":"Number"
}
</pre>

## Delete Pengepul
* Method : DELETE
* Header : Bearer Token
* URL : https://capstone-project-387217.et.r.appspot.com/pengepul/delete
<pre>
{
 "contact":"String",
 "location":"String",
 "description":"String",
 "lat":"Number",
 "lon":"Number"
}
</pre>
