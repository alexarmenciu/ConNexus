Stakeholders: For internal skateholders, we have the project team. For external skateholders, we have the users.


Architectural Design Decisions: 


Architectural Models: 


Important Scenarios: 
- New user gets to the login/register page and wants to create an account. User clicks on register and system brings them to the register page. User inputs username, password and email. User also needs to accept all privacy clauses. Then user clicks on "create" and system registers user if username is available, otherwise sends message saying it's unavailable. System also checks if password is acceptable, and returns an error if it isn't.

- User wants to view the privacy notice, they either click on the hyperlink at the bottom of the login/register page or in their profile once they're logged in. System brings them to the page with the privacy policy.

- User wants to create a new contact. User clicks on the add symbol next to the search bar. System pops up a window to add "name" field and they can create more fields like "phone number" and input the relevant information. After they're done, they can press "add" and the system will save that contact in the database and will show the user on their main page the new contact.

- User wants to edit information of one of their contacts. User clicks on the contact, and then clicks on "edit" of that contact page. System shows fields user can change and delete if they want. Then user clicks on "save" and system saves the changes in the DB and updates the information for the user to see.

- User wants to delete a contact. User clicks on the contact on the left side bar, then on the right side window they click on edit, then click on "delete contact". System then delets the contact from the DB and updates that information to the user.

- User wants to delete their account. User clicks on their profile, then clicks on "edit", and then clicks "delete account". System asks user to confirm if they wish to do so, upon clicking "yes", system deletes all contacts and the account object from the DB and updates user, who is then redirected the the login/register page.

- User wants to edit their account information like password. User clicks on their profile, then clicks on "edit". User clicks on "change password" which pops up a new window, where user enters their old password, and then their new password. Then User clicks "save" and system checks if it is a valid password, and updates the DB if it is, and then the user on the success of change. If it isn't, it updates user on it and doesn't do anything.
