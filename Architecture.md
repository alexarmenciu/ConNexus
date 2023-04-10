# Architecture

## Stakeholders:
For internal skateholders, we have the project team. For external skateholders, we have the users.

## Architectural Design Decisions:
We designed the software to be a web application that has three main modules:

| Module        | Description                                                                                            |
| ------------- | ------------------------------------------------------------------------------------------------------ |
| Authentication | The authentication module represents the basic setup for login and user session. The component includes signup, signin, and signup along with the security features necessary to protect the user account. |
| User          | The user module is based on the user model itself and the operations a user can execute on their account such as password/username change or account deletion. |
| Contact       | The contact module represents the main features of ConneXus and it includes all the contact operations such as add, modify, delete. The contact component is linked to the user component as each user has a list of contacts. |

Our software uses the model-view-controller architectural pattern which means our code is essentially separated into three components. 
Here's the code for the table:

| Component   | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| ----------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| View        | The view component of our application is implemented in the front-end and is responsible for the user interface and the data presentation. Our view component is implemented using HTML, CSS, Javascript with usage of the React framework and Bootstrap library.                                                                                                                                                                                                                             |
| Controller | The controller component is implemented in the back-end using Javascript and Node.js framework. The controller receives the user’s input and processes their requests in order to update the model and view. The back-end storage is hosted on MongoDB cloud servers.                                                                                                                                                                                                                                                  |
| Model       | The model component is implemented as the classes and data structures defined in both backend and frontend to encapsulate the data during transfer. In the backend, the data structures are represented by MongoDB schemas and are compatible to the data structures coming from the frontend.                                                                                                                                                                                                                                   |

The communication between components reflects the MVC design pattern: 
| Communication     | Description                                                                                                       |
|---|---|
| View->Controller  | Frontend sends REST APIs to communicate with the controller.                                            |
| Controller->Model | Controller updates the model after processing the user’s request. This operation is reflected on the cloud database. |
| Model->View       | REST API response is sent back once the database is updated and the view is updated.                    |



Notably, our design focuses on security to ensure privacy. We make use of encryption tools such as bcrypt for user passwords. We are also using an AES-256 master key to encrypt the rest of the data in the database. A futur improvement is to use a different key for each user, so that if a user's account is compromised, only their data is compromised. This however, required complex key management. However, MongoDB Entreprise has an encryption feature that can be used to further secure data. We also make use of Axios as a HTTP client to handle API requests and JSON Web Tokens to authenticate data transmission. 

Our design’s primary privacy benefits come from how our 3 main modules are designed. Authentication only requires username and password which means it does not collect PII. Users have full control over their accounts and can delete their accounts at any time. Lastly, the contact module is implemented such that each user can have their custom contact information fields which makes it untraceable even if a malicious attacker would gain access to the encrypted database



## Architectural Models:

Below is the Entity Relationship Diagram for our database. We have two models, User and Contact. Each user can create multiple contacts. A contact is linked to a single user in the database.
![ER Schema](images/ER%20schema.png) 

## Models
### User
The User model contains the following fields:
* `id` - The primary key of the user. This is auto-generated by mongoose.
* `username` - The username of the user. Multiple users can have the same username.
* `password` - The password of the user. This is hashed and salted using bcrypt.

We decided not to add an email field to the user model, as we felt that it was not necessary for the user to have an email to realize the full features of ConNexus, and we did not want to sacrifice the privacy of our users by requiring them to provide an email.

### Contact
The Contact model contains the following fields:
* `id` - The primary key of the contact. This is auto-generated by mongoose.
* `name` - The name of the contact.
* `additionalFields` - This is a Map of additional fields that the user can add to the contact. We support any custom fields that the user wants to add to the contact.

## Controllers
### User
We support the following endpoints for the user model:
* `GET /user/:id` - Returns the user with the given id.
* `PUT /user/:id` - Updates the user with the given id. This endpoint is used to update the username and/or password of the user. The body of the request should contain the username and password of the user.
* `DELETE /user/:id` - Deletes the user with the given id. <br>
**Note:** Deleting a user will also delete all the contacts associated with that user.


### Contact
We support the following endpoints for the contact model:
* `GET /user/:id/contacts` - Returns all the contacts for the user with the given id.
* `GET /user/:id/contacts/:id` - Returns the contact with the given id for the user with the given id.
* `POST /user/:id/contacts` - Creates a new contact for the user with the given id. The body of the request should contain the name and additionalFields of the contact. <br>
Example request body:
```json
{
  "name": "John Doe",
    "additionalFields": {
      "phone": "123-456-7890",
        "email": "john.doe@email.com"
    }
}
```
* `PUT /user/:id/contacts/:id` - Updates the contact with the given id for the user with the given id. The body of the request should contain the name and additionalFields of the contact, similar to the POST request.
* `DELETE /user/:id/contacts/:id` - Deletes the contact with the given id for the user with the given id.

### Authentication
This controller handles user signup, login, and logout. We support the following endpoints:
* `POST auth/signin` - Logs in the user. The body of the request should contain the username and password of the user. <br>
* `POST auth/signup` - Creates a new user. The body of the request should contain the username and password of the user. <br>
* `POST auth/singout` - Logs out the user. <br>

**Note:** All controller requests require a valid jwt token. Upon on successful login, the server will set the jwt token in a cookie, which is used for authentication of subsequent requests.
The authentication endpoints do not require a valid jwt token, as they are used to create a new jwt token for the user. <br>


## Important Scenarios: 
- New user gets to the login/register page and wants to create an account. User clicks on register and system brings them to the register page. User inputs username, password and email. User also needs to accept all privacy clauses. Then user clicks on "create" and system registers user if username is available, otherwise sends message saying it's unavailable. System also checks if password is acceptable, and returns an error if it isn't.

- User wants to view the privacy notice, they either click on the hyperlink at the bottom of the login/register page or in their profile once they're logged in. System brings them to the page with the privacy policy.

- User wants to create a new contact. User clicks on the add symbol next to the search bar. System pops up a window to add "name" field and they can create more fields like "phone number" and input the relevant information. After they're done, they can press "add" and the system will save that contact in the database and will show the user on their main page the new contact.

- User wants to edit information of one of their contacts. User clicks on the contact, and then clicks on "edit" of that contact page. System shows fields user can change and delete if they want. Then user clicks on "save" and system saves the changes in the DB and updates the information for the user to see.

- User wants to delete a contact. User clicks on the contact on the left side bar, then on the right side window they click on edit, then click on "delete contact". System then delets the contact from the DB and updates that information to the user.

- User wants to delete their account. User clicks on their profile, then clicks on "edit", and then clicks "delete account". System asks user to confirm if they wish to do so, upon clicking "yes", system deletes all contacts and the account object from the DB and updates user, who is then redirected the the login/register page.

- User wants to edit their account information like password. User clicks on their profile, then clicks on "edit". User clicks on "change password" which pops up a new window, where user enters their old password, and then their new password. Then User clicks "save" and system checks if it is a valid password, and updates the DB if it is, and then the user on the success of change. If it isn't, it updates user on it and doesn't do anything.

Below is a sequence diagram for creating/updating a contact, as well as retrieving a contact. This shows how we perform encryption and decryption on the contacts.
![Sequence Diagram](images/Sequence%20Diagram.png)
