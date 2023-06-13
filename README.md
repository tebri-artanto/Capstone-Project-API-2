# Description

for the backend API, we use **express.js** to make the endpoint. We deployed API in **GCP** using **app engine**, and the configure in [app.yaml](app.yaml). Beside that we also deploy the machine learning in **cloud run**. When user using the feature predict in Android, the images/pictures taken by users will store in **cloud storage**. For database we used **mongoDB Atlas** to store data like users, pengepuls, and articles.
 
# Documentation
## Sign Up
* Method : POST
* URL : https://capstone-project-387217.et.r.appspot.com/signup
<pre>
```
{
 "username":"String",
 "email":"String",
 "password":"String"
}
```
</pre>
