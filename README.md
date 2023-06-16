- For the main repository you can go to this [repository](https://github.com/ignatiusbarry69/ALL-TRASHOLUTION)
# Description

For the backend API, we use **express.js** to make the endpoint. We deployed API in **GCP** using **app engine**, and the configure in [app.yaml](app.yaml). Beside that we also deploy the machine learning in **cloud run**. When user using the feature predict in Android, the images/pictures taken by users will store in **cloud storage**. For database we used **mongoDB Atlas** to store data like users, pengepuls, and articles.
 
# Documentation

# User
## Sign Up
* Method : POST
* URL : https://capstone-project-387217.et.r.appspot.com/signup
<pre>
{
  "error": "boolean",
  "message": "string",
  "data": [
    {
       "username":"String",
       "email":"String",
       "password":"String"
    }
  ]
}
</pre>

## Sign In/Login
* Method : POST
* URL : https://capstone-project-387217.et.r.appspot.com/login
<pre>
{
  "error": "boolean",
  "message": "string",
  "data": [
    {
      "token":"String",
      "username":"String"
    }
  ]
}
</pre>

# Predict
## Predict
* Method : POST
* Header : Bearer Token
* Body : form-data/multipart
* URL : https://capstone-project-387217.et.r.appspot.com/predictImage
<pre>
{
  "error": "boolean",
  "message": "string",
  "data": "string"
}
</pre>

# Pengepul
## Get Pengepul
* Method : GET
* URL : https://capstone-project-387217.et.r.appspot.com/pengepul/
<pre>
{
  "error": "boolean",
  "message": "string",
  "data": [
    {
       "contact":"String",
       "location":"String",
       "description":"String",
       "lat":"Number",
       "lon":"Number"
     }
  ]
}
</pre>

## Sign Up Pengepul
* Method : POST
* Header : Bearer Token
* URL : https://capstone-project-387217.et.r.appspot.com/pengepul/add
<pre>
{
  "error": "boolean",
  "message": "string",
  "data": [
    {
       "contact":"String",
       "location":"String",
       "description":"String",
       "lat":"Number",
       "lon":"Number"
     }
  ]
}
</pre>

## Update Pengepul
* Method : PUT
* Header : Bearer Token
* URL : https://capstone-project-387217.et.r.appspot.com/pengepul/update
<pre>
{
  "error": "boolean",
  "message": "string",
  "data": [
    {
       "contact":"String",
       "location":"String",
       "description":"String",
       "lat":"Number",
       "lon":"Number"
     }
  ]
}
</pre>

## Delete Pengepul
* Method : DELETE
* Header : Bearer Token
* URL : https://capstone-project-387217.et.r.appspot.com/pengepul/delete
<pre>
{
  "error": "boolean",
  "message": "string",
  "data": [
    {
       "contact":"String",
       "location":"String",
       "description":"String",
       "lat":"Number",
       "lon":"Number"
    }
  ]
}
</pre>

# Artikel
## Get Artikel
* Method : GET
* URL : https://capstone-project-387217.et.r.appspot.com/artikel/
<pre>
{
  "error": "boolean",
  "message": "string",
  "data": [
    {
       "title":"String",
       "content":"String",
       "imgUrl":"String",
       "jenisSampah":"String",
       "username":"String"
    }
  ]
}
</pre>

## Add Artikel
* Method : POST
* Header : Bearer Token
* Body : form-data/multipart
* URL : https://capstone-project-387217.et.r.appspot.com/artikel/add/
<pre>
{
  "error": "boolean",
  "message": "string",
  "data": [
    {
       "title":"String",
       "content":"String",
       "jenisSampah":"String",
       "imgUrl":"String"
    }
  ]
}
</pre>
