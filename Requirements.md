# ConNexus Requirements

## System Purpose and Scope:

The target system is an internet based contact manager named ConNexus. Users do not have to register an email address or phone number to use the system, rather a username system is used to implement privacy by design. Each piece of data required for account creation (username, password) will have a detailed privacy policy linked, and require the user to check a box to confirm they have read the per-requirement policy.

Once a user's account is created, they can add contacts to their account, with the option to create custom fields (for example, if a contact _John_ has a phone number and an Instagram account, but no email address, a contact _John_ can be created with the fields _phone number_ and _Instagram_). Users will have access to a list of their contacts, and can search for contacts by name to return any of the associated user contact info.

## Sample Systems:

An analogue to this system is the Samsung "Contacts" app, which is a contact manager that is included with Samsung phones. This system requires users to register a Samsung account upon setup of the phone, and an email and password is required during this process. Further, Samsung collects the phone number of the user to complete cell phone funcitonality.

The home page of the Contacts presents the user's profile, followed by an alphabetically ordered list of contacts. The user can search for contacts by any of the stored fields, such as email, phone number, name, or more. Upon clicking on a contact, the user is redirected to a new screen with the contact's information. The user can edit the contact's information, delete the contact, however, the user cannot add custom fields to the contact as they can do with the Contact Manager system.

Taking a look at a comparison of the of the privacy features of the two systems:

|                                       | ConNexus | Samsung Contact Manager |
| ------------------------------------- | -------- | ----------------------- |
| No email required                     | &#9745;  | &#9744;                 |
| Simple and clear privacy policy       | &#9745;  | &#9744;                 |
| Can add custom fields                 | &#9745;  | &#9744;                 |
| Encrypts data on servers              | &#9745;  | &#9745;                 |
| No third parties                      | &#9745;  | Unknown                 |
| No usage of data beyond functionality | &#9745;  | &#9744;                 |

## Functional Requirements:

1. Contact Management

- When user clicks on "Add Contact" button, the system will create a new contact is created with the field "Name" and display a pop up menu with the option to add additional fields.
- When user enters a name into the search bar, the system will return any and all contacts that match the search query.
- When user clicks on a contact, the system will display the contact's information on the right-hand-side of the webpage.
- When the user clicks the edit button on a contact's information on the right-hand-side of the webpage, the system will transform the contact's information into editable fields.
- When the user clicks the finished editing button on a contact's information on the right-hand-side of the webpage, the system will remove the old record associated with the contact in the database, and replace it with the new record.
- When the user clicks the delete button on a contact's information on the right-hand-side of the webpage, the system will delete the contact and associated information from the user's contact list.

2. Personal User Management

- Upon a user going to their account page, all associated user information will be displayed, less their password.
- When the user clicks the edit button on their account information, the system will transform the user's information into editable fields.
- When the user clicks the finished editing button on their account information, the system will remove the old record associated with the user in the database, and replace it with the new record.
- When the user clicks the delete button on their account information, the system will delete the user and all contact records associated with their user from the database.

3. Account Creation and Login

- Upon a user going to the account creation page, the system will display a form with the fields "Username", "Password", and "Confirm Password". An overview of the privacy policy for each field will be displayed beside the field, with a clickable check box for each, stating that the user has read the policy for the field.
- Users will not have any way to recover their password, and will be required to create a new account if they forget their password to ensure that passwords are not passed to malicious privacy attackers.

## Privacy Requirements:

1. Privacy Policy Overview

- Upon data creation by the user (account creation, contact creation, contact editing, user editing), the system will display a privacy policy for the data being created, and require the user to check a box to confirm that they have read the policy.

2. Data Collection

- Upon account creation, the system will collect the user's username and password, and store it in the database in an encrypted format.
- Upon contact createion, the system will encrypt the contact's name and any additional fields, and store it in the database in an encrypted format.

3. Data Storage and Deletion

- All data will be stored on the database in an encrypted format
- Upon contact deletion by the user, the system will remove all records of the contact from the database.
- Upon user deletion by the user, the system will remove all records of the user from the database.

## Privacy by Design:

Our system's adherence to the principles of privacy by design[^1] is most clearly explained by a by-principle review of the system's privacy features:

#### 1. Proactive not Reactive; Preventative not Remedial

All functionality was designed on a privacy-first basis, to reduce and eliminate points of privacy attacks.

### 2. Privacy as the Default Setting

Users are not required to submit any PII on account creation or to use the system, rather any username+password combination is sufficient. Further, all data is encrypted on the server so privacy is maintained even the security of the data is compromised.

### 3. Privacy Embedded into Design

Upon user input of all and every piece of data, users are given a simple and thorough overview of the privacy allowances for the piece of data, with the option to opt out of submission of the data. No data can be collected without the user's complete and informed consent.

### 4. Full Functionality — Positive-Sum, not Zero-Sum

No functionality is sacrificed to maintain privacy. The system is secure as a means to guarantee privacy (in that user data cannot and will not be available to non-user entities), and private as a means to guarantee security (in that the reduction of PII available to potential threats reduces the attractiveness of the system as a target of malicious software attacks).

### 5. End-to-End Security — Full Lifecycle Protection

Data is never seen in an unencrypted form by the server. In this way, the PII is not compromised and remains completely private to the user. Further, the data is removed from the server after the user requests its deletion.

### 6. Visibility and Transparency — Keep it Open

All user data is visible on the user profile, and all saved contact data is available to the user on the contact list. No user data processing is performed on the server.

### 7. Respect for User Privacy — Keep it User-Centric

The system offers strong privacy by default, offers complete and exhaustive information on the privacy features afforded to the user, and gives control to the user over all of their data.

[^1]: [Privacy by Design: The 7 Foundational Principles](https://www.ipc.on.ca/wp-content/uploads/resources/7foundationalprinciples.pdf)
