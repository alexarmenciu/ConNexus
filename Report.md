# Report on the ConNexus System

## Overview of the System

ConNexus exists to fill a gap in the current ecosystem of on-device contact managers. Because on-device contact managers are built to have integration with exclusively system apps, they do not have features to support contact information of third party applications (ie. Signal, WhatsApp, etc.), which are increasingly adopted over traditional text messaging, with a study finding over 65% of older adults adopted the technologies[^1], a figure likely significantly higher among young adults.

As such, ConNexus is a web-based contact manager, which allows users to store contact information for third party applications, as well as traditional text messaging. The system is designed to be as simple and intuitive as possible, with a focus on a user's privacy, customizability, and accessibility. To this end, ConNexus uses a simple username-based login system, requiring merely a username and a password for account creation and signup. A user adds contacts by a name field, and then can add any number of user-defined fields to the contact.

All data the user provides the system with is accessible (with the exception of the user's password, to protect against physical attacks, ie leaving one's account open in public, and having someone hijack the account), and editable by the user to give them ultimate control over their data. All data is deletable, with the delete user account feature deleting all data associated with the user's account (this feature requires a re-entry of the user's username and password for confirmation due to the finality of the operation). To not allow any lingering data, an auto deletion happens after 150 days of user inactivity. Therefore if anyone forgets their password or forgets to delete their account, they can be assured that all data related to them will be permanently deleted after 150 days.

We target adult users, with a significant social network with a requirement for varied messaging technologies for communication with their circles as our primary user base. We would open source the software, as we believe that the software is a valuable tool for the community, and any improvements the public could make to the software would be more valuable than any monetization techniques we could implement would be valuable to us.

The ConNexus system collects no intrinsic PII (we define this as any information which the user cannot easily de-link from themselves, ie name, address, etc) for usage of the system. The system collects a username and password for account creation, and whatever information a user chooses to input into the contact manager for contacts. A required field on each contact is "Name", however, there is no check on this, so a user can enter whatever value they choose for this field as long as they are able to recall who the contact is associated with.

Further, all data is encrypted in storage on the server, so any PII that a user enters into a contact is not visible to administrators of the system.

The system follows the seven principles of privacy by design, and is GDPR and PIPEDA compliant as described in the requirements document[^2].

## Design and Implementation

### Technologies and Discussions

All technologies we worked with (barring the database, mongoDB Atlas), were open source. This was a deliberate design decision with the user in mind, to ensure that the user has the ability to audit the code and ensure that the system is not doing anything malicious with their data, from the bottom (our technologies used), to the top (our code which the user interacts with). Open source technologies also allow for the user to contribute to the project, and improve the system for themselves and others, a stance explained in the _Overview of the System_ section of this report.

#### On the Choice of React for Frontend Development

We chose React for our frontend development because it is a popular and well-supported framework (in fact the most popular frontend web framework, see section 2 of the linked paper[^3]), and as such, our two designated frontend members Leo and Dijian were already comfortable with the technology, having done internships working on projects using the React framework. We also chose React because it is a component-based framework, which lends itself well to the modular design of our system (namely, the way we model the user and the contact separately), and allows for easy development of new features. Finally, since our web application is a contact manager, it would be meaningful to make a mobile version of it, which could be done easily by switching to React Native.

#### On the Choice of Node.js for Backend Development

Similarly to the choice of React, we chose Node.js for our backend development due to its popularity and the fact that Wassim had experience with the technology before the project, and so our two backend members Wassim and Alex were able to quickly implement essential features on the backend. It also allowed us to use the Mongoose modelling tool, which provides interfacing between Node.js and our mongoDB database. Finally, the Node.js and React duo makes a very effictive pair of frontend and backend technologies. A few reasons for why it's so good[^8] are: real-time data, high server load and JSON APIs, which is especially useful as mongoDB stores JSON-like objects.

#### On the Choice of mongoDB for Database Storage

We chose mongoDB for our database due to it being an object database rather than a traditional relational database. This allows variance in the data stored in the database, which is important for our system, as we allow users to add any number of fields to a contact. We chose to model the custom fields as a map between two strings in our contact model, an intuitive design, however, this would not translate well to implementation in a relational database as it is bad form to increase the width of a field to store heavy objects. As an example with the most basic functionality of account creation, whenever a user registers an account, an object would be created in the DB for them. Then, everything related to the user and their contacts is within that "user" object and "contacts" objects that are linked to this user. This makes deletion very simple, as all that needs to be done is to delete the "user" object and its related "contacts", leaving no trace behind. Furthermore, mongoDB Atlas comes with buil-in security[^9] like network isolation and end-to-end encryption. For further information on their built-in security, visit their website[^9].

### Data Models

![User and Contact Model](/images/ER%20schema.png)
Figure 1: The User and Contact Models

#### User Model

Users are the primary object in our system. we chose to model the user as a simple object with a username and password field, as we do not need to store any other information about the user. <br>
Additionally, we decided not to link users to each other, or create a social network aspect to the system, in order to keep the most possible amount of privacy for the user. <br>

#### Contact Model

Each user has a list of contacts, which are simple objects with a name field, and a map of custom fields. The custom fields are stored as a map between two strings, where the first string is the name of the field, and the second string is the value of the field. This allows for a flexible amount of fields to be added to a contact, and allows for the user to add any number of fields to a contact. <br>
To make sure the user's data is secure, we encrypt the contact data before storing it in the database, and decrypt it before sending it to the user. <br>
All encryption is done in the backend, and the encryption key is stored in the environment variables, which are not accessible to the user. <br>
For additional security, the app should be used over https, to encrypt the data in transit. <br>

For more information on the data models, see the [Architecture Document](Architecture.md).

#### On the Criticism of bcrypt during Presentations

There are no known attacks on bcrypt, beyond brute force attacks which attempt to generate possible password strings then hash them and compare with known hashes. Also known as rainbow tables[^4], this attack is impractical and in fact what bcrypt excels at stopping. Compare this to a competitor algorithm, Argon2, which was presented by group 8 as an objectively better alternative to bcrypt. Argon2i has known attacks[^5], namely, it is practical to attack the algorithm as long as it uses 10 or less iterations in the code, where 3 is the default and likely the amount most services use. We feel confident our choice of bcrypt is the best choice for our system.

## Discussion

### On the Utility and Convenience of ConNexus

We identify the major technical advantage of ConNexus as having editable fields, so as much or as little information can be associated with a contact as the user desires. Another significant advantage that we attribute to ConNexus is that due to it being a web app, it is platform agnostic, whereas traditional contact managers are generally applications proprietary to cell phone manufacturers for their own devices.

However, we are not as hubristic as to think that ConNexus has no flaws. We believe that the biggest flaw of ConNexus is that it is not a native application. This means that it is not as convenient to use as a native application which can be launched and used from the home screen of one's phone. To mimic identical operation to a native application, the user would have to make a shortcut to the application from their home screen of their phone, something which is not as easy as simply downloading an application from the app store. A soluction would be convert the website to a Progressive Web App, which are web applications that can be downloaded to the home screen of a phone and behave like a native application[^6].

Another significant point of utility not implemented was the ability to recover one's password. This was not implemented due to our decision to not require an email for signup, as we felt that it was not necessary for the user to have an email to realize the full features of ConNexus. There is fairly recent literature on the topic of password recovery[^7] which suggests a new model for password recovery that would allow privacy to be maintained, but we considered this to be technically out of scope for a project of this size.

### On the Move to the User Sphere

An idea that we had and mentioned during our presentation was the introduction of a local mode to the system. This local mode would use local storage to host a mongoDB instance, and all data processing and transfer would occur on the user sphere, rather than on the joint and recipient spheres. This would completely null all discussions around privacy, as no data would escape to any computer network.

Realizing this, we see the end goal of any non-connected open source system as achieving independence from any server connection.

This leads us to envision new schools of thought on potential advances in the field of software privacy. Is there any way to pre-cache websites a user might choose to visit and mimic their behavior on device, so that a user doesn't have to produce a trail of crumbs everywhere they browse on the web? Is there any way to provide an on-device system which provides arbitrary data to cloud services, but maps them to local data so that the user experience is exactly the same, whereas transmitted data is void of any PII? These are questions which we end the project with, and we believe the tools learned in the course will allow us to find our way to the answers.

## References

[^1]: [Yu, R.P., 2020. Use of messaging apps and social network sites among older adults: A mixed-method study. International Journal of Communication, 14, p.21.](https://ijoc.org/index.php/ijoc/article/view/14435/3194)
[^2]: [ConNexus Requirements Document](/Requirements.md)
[^3]: [Saks, E., 2019. JavaScript Frameworks: Angular vs React vs Vue.](https://www.theseus.fi/bitstream/handle/10024/261970/Thesis-Elar-Saks.pdf)
[^4]: [Eric Conrad, Seth Misenar, Joshua Feldman, Chapter 6 - Domain 5: Cryptography; Rainbow Tables, Editor(s): Eric Conrad, Seth Misenar, Joshua Feldman, CISSP Study Guide (Second Edition), Syngress, 2012, Pages 213-255, ISBN 9781597499613, https://doi.org/10.1016/B978-1-59749-961-3.00006-6.](https://www.sciencedirect.com/science/article/pii/B9781597499613000066)
[^5]: [J. Alwen and J. Blocki, "Towards Practical Attacks on Argon2i and Balloon Hashing," 2017 IEEE European Symposium on Security and Privacy (EuroS&P), Paris, France, 2017, pp. 142-157, doi: 10.1109/EuroSP.2017.47.](https://eprint.iacr.org/2016/759.pdf)
[^6]: [B. Frankston, "Progressive Web Apps [Bits Versus Electrons]," in IEEE Consumer Electronics Magazine, vol. 7, no. 2, pp. 106-117, March 2018, doi: 10.1109/MCE.2017.2776463.](https://ieeexplore.ieee.org/abstract/document/8287006)
[^7]: [Maqbali, F.A., Mitchell, C.J. 2019. Web Password Recovery: A Necessary Evil?. In: Arai, K., Bhatia, R., Kapoor, S. (eds) Proceedings of the Future Technologies Conference (FTC) 2018. FTC 2018. Advances in Intelligent Systems and Computing, vol 881. Springer, Cham. https://doi.org/10.1007/978-3-030-02683-7_23](https://link.springer.com/chapter/10.1007/978-3-030-02683-7_23#Abs1)
[^8]: [Tushar. (2021, July 20). Reasons to use react with node JS for web development. Programmers.io. Retrieved April 9, 2023, from https://programmers.io/web-development-using-reactjs-with-nodejs/](https://programmers.io/web-development-using-reactjs-with-nodejs/)
[^9]: [MongoDB Atlas Security. MongoDB. (n.d.). Retrieved April 9, 2023, from https://www.mongodb.com/cloud/atlas/security](https://www.mongodb.com/cloud/atlas/security)
